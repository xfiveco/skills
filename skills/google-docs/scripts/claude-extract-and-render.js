// Claude in Chrome — extract DOCS_modelChunk JSON from inline scripts on the
// open Google Doc, render Markdown, and stash the result on window.__doc_md.
//
// Usage: pass the entire contents of this file as the `text` argument to a
// single mcp__Claude_in_Chrome__javascript_tool call. The IIFE returns metadata
// only ({ modelCount, bytes, chars, preview }); the full Markdown is on
// window.__doc_md and is read back through chunked browser_batch slices.
//
// To get unaccepted document text instead of the suggestions-applied view,
// change the last call from renderMarkdown(models, "accepted") to
// renderMarkdown(models, "current").

(() => {
  const MODEL_START = "DOCS_modelChunk = ";
  const MODEL_END = "; DOCS_modelChunkLoadStart";
  const CHIP = "";
  const TABLE_START = "";
  const TABLE_END = "";
  const TABLE_ROW = "";
  const TABLE_CELL = "";
  const PLAIN = "";
  const INTERNAL_HIGHLIGHT = "#ffff00";

  // Scan every inline <script> for DOCS_modelChunk JSON arrays.
  const scripts = document.querySelectorAll("script");
  const models = [];
  for (const s of scripts) {
    const source = s.textContent || "";
    let from = 0;
    while (from < source.length) {
      const start = source.indexOf(MODEL_START, from);
      if (start < 0) break;
      const jsonStart = start + MODEL_START.length;
      const jsonEnd = source.indexOf(MODEL_END, jsonStart);
      if (jsonEnd < 0) break;
      try {
        models.push(JSON.parse(source.slice(jsonStart, jsonEnd)));
      } catch (e) {
        /* skip malformed chunks */
      }
      from = jsonEnd + MODEL_END.length;
    }
  }

  function embeddedLabel(item) {
    if (item?.et === "placeholder") return `[${item.epm?.phe_dt || "placeholder"}]`;
    if (item?.et === "inline") return `[Image alt: ${item.epm?.ee_eo?.eo_ad || "inline object"}]`;
    return `[${item?.et || "embedded item"}]`;
  }
  const isInternalHighlight = (s) => s?.ts_bgc2?.hclr_color === INTERNAL_HIGHLIGHT;

  function buildText(chunks, suggestionMode) {
    const applySuggestions = suggestionMode === "accepted";
    const textLikeChunks = chunks
      .filter(
        (c) =>
          (c.ty === "is" || c.ty === "iss") &&
          typeof c.ibi === "number" &&
          typeof c.s === "string"
      )
      .sort((a, b) => a.ibi - b.ibi);
    const textChunks = textLikeChunks.filter(
      (c) => c.ty === "is" || (applySuggestions && c.ty === "iss")
    );
    const deletions = applySuggestions
      ? chunks.filter(
          (c) =>
            c.ty === "msfd" && typeof c.si === "number" && typeof c.ei === "number"
        )
      : [];
    const absoluteLength = [
      textLikeChunks.reduce((m, c) => Math.max(m, c.ibi - 1 + c.s.length), 0),
      deletions.reduce((m, c) => Math.max(m, c.ei), 0),
    ].reduce((m, v) => Math.max(m, v), 0);
    const absToIndex = Array(absoluteLength + 2).fill(-1);
    const chars = [];
    const deleted = Array(absoluteLength + 2).fill(false);
    for (const c of deletions) for (let a = c.si; a <= c.ei; a += 1) deleted[a] = true;
    for (const c of textChunks) {
      for (let i = 0; i < c.s.length; i += 1) {
        const abs = c.ibi + i;
        if (c.ty === "is" && deleted[abs]) continue;
        absToIndex[abs] = chars.length;
        chars.push(c.s[i]);
      }
    }
    const boundary = Array(absoluteLength + 3).fill(chars.length);
    let compact = 0;
    for (let abs = 1; abs < boundary.length; abs += 1) {
      boundary[abs] = compact;
      if (absToIndex[abs] >= 0) compact = absToIndex[abs] + 1;
    }
    return { text: chars.join(""), positions: { absToIndex, boundary } };
  }

  function buildModelHelpers(chunks, text, positions, suggestionMode) {
    const embedded = new Map(chunks.filter((c) => c.ty === "ae").map((c) => [c.id, c]));
    const replacements = new Map();
    const styles = Array(text.length).fill(PLAIN);
    const paragraphs = [];
    const styleTypes = suggestionMode === "accepted" ? new Set(["as", "sas"]) : new Set(["as"]);
    const compactIndex = (abs) => positions?.absToIndex?.[abs] ?? abs - 1;
    const compactBoundary = (abs) => {
      if (!positions?.boundary) return Math.max(0, abs - 1);
      const safeAbs = Math.max(1, Math.min(abs, positions.boundary.length - 1));
      return positions.boundary[safeAbs];
    };
    for (const c of chunks) {
      if (c.ty === "te" && typeof c.spi === "number") {
        const pos = compactIndex(c.spi);
        const item = embedded.get(c.id);
        if (
          pos >= 0 &&
          (text[pos] === CHIP || (item?.et === "inline" && text[pos] === "*"))
        ) {
          replacements.set(pos, embeddedLabel(item));
        }
        continue;
      }
      if (!styleTypes.has(c.ty) || typeof c.si !== "number" || !c.sm) continue;
      if (c.st === "paragraph") {
        paragraphs.push({
          end: compactBoundary(c.si),
          next: compactBoundary(c.si + 1),
          style: c.sm,
        });
        continue;
      }
      if (c.st !== "text" || typeof c.ei !== "number") continue;
      const bold = c.sm.ts_bd && !isInternalHighlight(c.sm);
      const markers = [
        c.sm.ts_st && "~~",
        bold && c.sm.ts_it ? "***" : bold ? "**" : c.sm.ts_it ? "*" : "",
      ]
        .filter(Boolean)
        .join("");
      if (!markers || c.si <= 0) continue;
      for (let abs = c.si; abs <= c.ei; abs += 1) {
        const i = compactIndex(abs);
        if (i >= 0 && i < text.length) styles[i] = markers;
      }
    }
    paragraphs.sort((a, b) => a.end - b.end);
    return { replacements, styles, paragraphs };
  }

  const closeMarkers = (m) => m.split(/(?=\*\*\*|\*\*|\*|~~)/).reverse().join("");
  function wrapRun(text, markers) {
    if (!markers || !text.trim()) return text;
    const leading = text.match(/^\s*/)[0];
    const trailing = text.match(/\s*$/)[0];
    const core = text.slice(leading.length, text.length - trailing.length);
    return core ? `${leading}${markers}${core}${closeMarkers(markers)}${trailing}` : text;
  }
  function renderCharacter(v) {
    if (v === "") return "";
    if (v === "" || v === "\f") return "\n";
    if (v === CHIP) return "";
    return v;
  }
  function renderInline(text, helpers, start, end) {
    let output = "",
      run = "",
      runStyle = null;
    const flush = () => {
      output += wrapRun(run, runStyle);
      run = "";
    };
    for (let i = start; i < end; i += 1) {
      const value = helpers.replacements.get(i) || renderCharacter(text[i]);
      const style = helpers.replacements.has(i) ? PLAIN : helpers.styles[i];
      if (runStyle === null) runStyle = style;
      if (style !== runStyle) {
        flush();
        runStyle = style;
      }
      run += value;
    }
    flush();
    return output;
  }
  function paragraphPrefix(style) {
    if (style.ps_hd === 100) return "# ";
    if (style.ps_hd >= 1 && style.ps_hd <= 5) return `${"#".repeat(style.ps_hd + 1)} `;
    if (style.ps_il_i === false && style.ps_il > 0) return "- ";
    return "";
  }
  function joinBlocks(blocks) {
    return blocks.reduce((out, block, i) => {
      if (!block.value) return out;
      if (!out) return block.value;
      return `${out}${
        block.type === "list" && blocks[i - 1]?.type === "list" ? "\n" : "\n\n"
      }${block.value}`;
    }, "");
  }
  function renderParagraphs(text, helpers, start, end) {
    const blocks = [];
    let pos = start;
    for (const para of helpers.paragraphs) {
      if (para.end < start || para.end > end || para.end < pos) continue;
      const body = renderInline(text, helpers, pos, para.end).trim();
      if (body) {
        const prefix = paragraphPrefix(para.style);
        blocks.push({
          type: prefix === "- " ? "list" : "paragraph",
          value: `${prefix}${body}`,
        });
      }
      pos = Math.max(pos, para.next);
    }
    const tail = renderInline(text, helpers, pos, end).trim();
    if (tail) blocks.push({ type: "paragraph", value: tail });
    return joinBlocks(blocks);
  }
  function renderTable(text, helpers, start, end) {
    const rows = [];
    let row = [],
      cellStart = null;
    const closeCell = (pos) => {
      if (cellStart === null) return;
      while (cellStart < pos && /\s/.test(text[cellStart])) cellStart += 1;
      while (pos > cellStart && /\s/.test(text[pos - 1])) pos -= 1;
      row.push(
        renderInline(text, helpers, cellStart, pos)
          .trim()
          .replace(/\|/g, "\\|")
          .replace(/\n+/g, "<br>")
      );
      cellStart = null;
    };
    for (let i = start + 1; i < end; i += 1) {
      if (text[i] === TABLE_CELL) {
        closeCell(i);
        cellStart = i + 1;
      } else if (text[i] === TABLE_ROW) {
        closeCell(i);
        if (row.length) rows.push(row);
        row = [];
      }
    }
    closeCell(end);
    if (row.length) rows.push(row);
    if (!rows.length) return "";
    const width = Math.max(...rows.map((r) => r.length));
    const normalized = rows.map((r) => [...r, ...Array(width - r.length).fill("")]);
    return [
      `| ${normalized[0].join(" | ")} |`,
      `| ${Array(width).fill("---").join(" | ")} |`,
      ...normalized.slice(1).map((r) => `| ${r.join(" | ")} |`),
    ].join("\n");
  }
  function renderMarkdown(model, suggestionMode) {
    const chunks = Array.isArray(model)
      ? model.flatMap((m) => m.chunk || [])
      : model.chunk || [];
    const { text, positions } = buildText(chunks, suggestionMode);
    if (!text) throw new Error("no text");
    const helpers = buildModelHelpers(chunks, text, positions, suggestionMode);
    const blocks = [];
    let pos = 0;
    while (pos < text.length) {
      const tableStart = text.indexOf(TABLE_START, pos);
      if (tableStart < 0) {
        blocks.push(renderParagraphs(text, helpers, pos, text.length));
        break;
      }
      blocks.push(renderParagraphs(text, helpers, pos, tableStart));
      const tableEnd = text.indexOf(TABLE_END, tableStart);
      if (tableEnd < 0) {
        pos = tableStart + 1;
        continue;
      }
      blocks.push(renderTable(text, helpers, tableStart, tableEnd));
      pos = tableEnd + 1;
    }
    return `${blocks
      .map((b) => b.trim())
      .filter(Boolean)
      .join("\n\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()}\n`;
  }

  if (!models.length) {
    return { error: "No DOCS_modelChunk found. Wait longer or re-navigate." };
  }

  const md = renderMarkdown(models, "accepted");
  window.__doc_md = md;
  return {
    modelCount: models.length,
    bytes: new Blob([md]).size,
    chars: md.length,
    preview: md.slice(0, 600),
  };
})();

# Applying Suggestions — Claude in Chrome

Add typo / grammar / wording fixes as Google Docs *suggestions* with one-sentence rationale comments. The unit of work is **one correction = one `browser_batch`**.

## Goal and ownership

Suggestions live on the cloud document until a reviewer accepts them. You add the suggestion + comment in Suggesting mode; the user (or another reviewer) accepts. Comments matter — non-native English reviewers often need to see *why* a change was proposed, not just what.

## Pre-flight

### Confirm the mode

If the doc isn't in Suggesting mode, ask the user before switching. To check the current mode via JS:

```js
[...document.querySelectorAll('[aria-label="Editing mode"], [aria-label="Suggesting mode"], [aria-label="Viewing mode"]')]
  .filter(b => b.getBoundingClientRect().width > 0)
  .map(b => b.getAttribute('aria-label'))
```

The visible-only filter matters: Google Docs keeps hidden mode buttons in the DOM that don't reflect the active state.

If the user agrees, toggle with **Cmd+Alt+Shift+X** (Mac). The keyboard shortcut is more reliable than clicking the dropdown — the menuitemradio inside the dropdown sometimes ignores synthetic clicks. Pressing it twice may be needed since the shortcut cycles through modes.

When you finish, switch the mode back to where it was. Mention this in your wrap-up so the user can verify.

### Pre-check uniqueness with grep

Each Find phrase must match exactly once. The cheapest pre-check is `grep` against a local Markdown extract of the doc (see `reading-claude.md`):

```bash
for q in "<find string 1>" "<find string 2>"; do
  printf "%-55s -> " "$q"
  grep -c -F -- "$q" doc.md
done
```

A count of 1 means safe. If the count is 0 or >1, narrow or expand the phrase until it's unique. Doing this up front lets you skip per-correction validation in the browser.

If you can't pre-check (e.g., no local extract), keep the in-batch `findCount()` validation step (below) — it'll catch the failure, just one round-trip later.

### Install JS helpers (once per session)

```js
window.__h = {
  findCount: () => {
    const els = [...document.querySelectorAll('*')]
      .filter(e => e.children.length === 0 && /^\d+ of \d+$/.test((e.textContent || '').trim()));
    return els.length ? els[0].textContent.trim() : null;
  },
  focusLatestReply: () => {
    const fields = [...document.querySelectorAll('[placeholder="Reply or add others with @"], [aria-label="Reply or add others with @"]')]
      .filter(f => f.getBoundingClientRect().width > 0);
    const last = fields[fields.length - 1];
    if (!last) return { ok: false };
    last.scrollIntoView({ block: 'center' });
    last.click();
    last.focus();
    return { ok: true };
  },
};
```

Two helpers, no third — the "submit" step uses `Cmd+Return`, not a JS click. Google Docs' "Reply to comment" button doesn't fire on synthetic `.click()`, presumably because it requires real pointer events. `Cmd+Return` while focus is in the reply input submits cleanly every time.

## One-batch correction pattern

A complete correction in a single `browser_batch`:

```ts
mcp__Claude_in_Chrome__browser_batch({
  actions: [
    // 1. Focus the doc body so Cmd+F doesn't route to a stray comment field
    { name: "computer", input: { action: "left_click", coordinate: [600, 400], tabId } },

    // 2. Open Find, clear the input, type the unique phrase
    { name: "computer", input: { action: "key", text: "cmd+f", tabId } },
    { name: "computer", input: { action: "wait", duration: 1, tabId } },
    { name: "computer", input: { action: "key", text: "cmd+a", tabId } },
    { name: "computer", input: { action: "type", text: "<find phrase>", tabId } },
    { name: "computer", input: { action: "wait", duration: 1, tabId } },

    // 3. Validate "1 of 1" — safety net even if you pre-checked uniqueness
    { name: "javascript_tool", input: { action: "javascript_exec", tabId, text: "window.__h.findCount()" } },

    // 4. Close Find — the matched span stays selected
    { name: "computer", input: { action: "key", text: "Escape", tabId } },
    { name: "computer", input: { action: "wait", duration: 1, tabId } },

    // 5. Type the replacement; Suggesting mode wraps it as a Suggestion
    { name: "computer", input: { action: "type", text: "<replacement>", tabId } },
    { name: "computer", input: { action: "wait", duration: 2, tabId } },

    // 6. Focus the latest suggestion's reply field
    { name: "javascript_tool", input: { action: "javascript_exec", tabId, text: "window.__h.focusLatestReply()" } },
    { name: "computer", input: { action: "wait", duration: 1, tabId } },

    // 7. Type the comment
    { name: "computer", input: { action: "type", text: "<one-sentence rationale>", tabId } },
    { name: "computer", input: { action: "wait", duration: 1, tabId } },

    // 8. Submit with Cmd+Return — JS click on Reply doesn't work
    { name: "computer", input: { action: "key", text: "cmd+Return", tabId } },
  ],
});
```

After the batch, the response stream will include the `findCount()` result inline; check it shows `"1 of 1"`. If it doesn't, undo with `Cmd+Z` and re-do that correction with a narrower phrase.

## Why each step exists

- **Focus click in doc body** — defensive. If focus is in a previously-opened comment input, `Cmd+F` types into the comment instead of opening Find.
- **`Cmd+A` before typing the find phrase** — clears any stale text from a previous Find session.
- **`Escape` after typing the find phrase** — closes the Find toolbar but preserves the document selection on the matched span. The next typed text overwrites the selection.
- **Two-second wait after typing the replacement** — Suggesting mode renders the new card asynchronously, and `focusLatestReply` needs the card in the DOM before it can find it.
- **`Cmd+Return` to submit** — the only reliable submit signal that doesn't require an MCP-driven mouse click. JS `.click()` on the visible Reply button is a no-op (Google Docs ignores synthetic events on it).

## Rules

- **Replacements stay minimal.** Replace the word, punctuation, or short phrase that's wrong, not the whole sentence. The suggestion card highlights only what changed.
- **Skip whitespace-only changes** unless the user explicitly asks. Google Docs normalizes whitespace, and the suggestion will look like a no-op.
- **Don't accept your own suggestions.** Even when they're obviously correct.
- **Comments are one sentence.** Explain the spelling, grammar, punctuation, or wording reason. No more.
- **Find ignores smart vs straight quotes.** `'` in your Find phrase matches both. Your typed replacement may end up as straight; that's usually fine.

## Fixing a misplaced suggestion

If a suggestion lands on the wrong text, undo immediately:

```ts
{ name: "computer", input: { action: "key", text: "cmd+z", tabId } }
```

If the bad suggestion is already visible in the right-side panel, find its "Reject suggestion" control via the `find` MCP tool and click it via `computer` action `left_click` with the returned ref:

```ts
mcp__Claude_in_Chrome__find({ query: "Reject suggestion button on the latest card", tabId })
mcp__Claude_in_Chrome__computer({ action: "left_click", ref: "ref_…", tabId })
```

## Verifying after a run

`document.body.innerText` only contains comments visible in the viewport (Google Docs virtualizes them), so don't rely on a single string-search to confirm all comments posted. Either:

- Trust the `Cmd+Return` step ran and assume success after a final `findCount()` call returned `"1 of 1"` for the prior step.
- Scroll to the last edit area and screenshot once at the end as a final sanity check.

# Applying Suggestions — Codex (Playwright)

Add typo / grammar / wording fixes as Google Docs *suggestions* with one-sentence rationale comments. If the user asks to "comment on" language issues, this suggestion + comment flow is the default unless they explicitly ask for comment-only review.

## Goal and ownership

Suggestions live on the cloud document until a reviewer accepts them. You add the suggestion + comment in Suggesting mode; the user (or another reviewer) accepts. Comments matter — non-native English reviewers often need to see *why* a change was proposed, not just what.

## Process

1. Prepare corrections from a clean Markdown export (use `scripts/extract-open-google-doc-markdown.mjs` per `reading-codex.md`).
2. Skip whitespace-only changes unless the user asks for them.
3. Open the doc in the in-app browser.
4. Confirm the toolbar shows `Suggesting` or `Suggesting mode`. If not already in Suggesting mode, switch only with user confirmation.
5. For each correction: find the smallest exact source phrase that uniquely identifies the issue, validate `1 of 1`, replace minimally, add the comment.
6. Visually confirm each suggestion landed in the right place.
7. Undo or reject any suggestion that targeted the wrong text.

## Prepare corrections

Keep corrections small, exact, and easy to review.

```js
const corrections = [
  {
    find: "Scenerio",
    replace: "Scenario",
    comment: "Corrects the spelling of \"Scenario\".",
  },
  {
    find: "automatized",
    replace: "automated",
    comment: "Uses the more natural English term in this context.",
  },
  {
    find: "sign-up/in",
    replace: "sign up or sign in",
    comment: "Expands the slash form into clearer wording.",
  },
];
```

Avoid broad phrases. If a phrase has multiple matches, make it just specific enough to be unique, or navigate to the relevant section first.

## Find-and-replace helper

The validation step happens before closing the Find box. It prevents the common failure mode where Google Docs keeps an old selection when the new search text is missing or matches multiple places.

```js
async function validateFindState(findText) {
  const snap = await tab.playwright.domSnapshot();
  const hasQuery =
    snap.includes(`searchbox "Find in document" [active]: "${findText}"`) ||
    snap.includes(`searchbox "Find in document": "${findText}"`) ||
    snap.includes(`searchbox "Find in document" [active]: ${findText}`) ||
    snap.includes(`searchbox "Find in document": ${findText}`);
  const hasOneMatch =
    /row "Find in document 1 of 1"|cell "1 of 1"|region: 1 of 1/i.test(snap);

  if (!hasQuery || !hasOneMatch) {
    throw new Error(
      `Find validation failed for: ${findText}; hasQuery=${hasQuery}; hasOneMatch=${hasOneMatch}`
    );
  }
}

globalThis.findAndReplace = async function (findText, replaceText) {
  await tab.cua.keypress({ keys: ["ControlOrMeta", "F"] });
  await tab.cua.keypress({ keys: ["ControlOrMeta", "A"] });
  await tab.cua.type({ text: findText });
  await validateFindState(findText);
  await tab.cua.keypress({ keys: ["Escape"] });
  await tab.cua.type({ text: replaceText });
};
```

Don't rely on `getAttribute("value")` from `.docs-findinput-container` unless you've verified it in the current browser session — observed runs show the DOM snapshot reflects the query correctly even when scoped attributes don't. The query may appear quoted or unquoted in the snapshot, especially with punctuation.

## Comment helper

```js
async function addCommentToVisibleSuggestion(commentText) {
  const replyField = tab.playwright
    .locator(
      '[placeholder="Reply or add others with @"], [aria-label="Reply or add others with @"]'
    )
    .filter({ visible: true });

  const fieldCount = await replyField.count();
  if (fieldCount !== 1) {
    throw new Error(`Expected one visible reply field, got ${fieldCount}`);
  }

  await replyField.click({});
  await replyField.type(commentText, {});

  const submit = tab.playwright
    .getByRole("button", { name: "Reply to comment", exact: true })
    .filter({ visible: true });

  const submitCount = await submit.count();
  if (submitCount !== 1) {
    throw new Error(`Expected one Reply to comment button, got ${submitCount}`);
  }

  await submit.click({});

  const snap = await tab.playwright.domSnapshot();
  if (!snap.includes(commentText)) {
    throw new Error(`Comment text not visible after posting: ${commentText}`);
  }
}

async function suggestAndComment({ find, replace, comment }) {
  if (find.replace(/\s+/g, "") === replace.replace(/\s+/g, "")) {
    console.log(`SKIPPED whitespace-only change: ${find}`);
    return;
  }

  await globalThis.findAndReplace(find, replace);
  await addCommentToVisibleSuggestion(comment);
}

for (const correction of corrections) {
  await suggestAndComment(correction);
}
```

## Useful validation signals

```text
row "Find in document 1 of 1"
searchbox "Find in document": It's purpose
cell "1 of 1"
```

After each replacement, the suggestion card should show a summary like:

```text
Replace: "It's purpose" with "Its purpose"
```

## Batching

Keep batches moderate. Start with 5-10 corrections; after several clean `1 of 1` validations in the current doc, 10-20 is reasonable. Use smaller batches after any failed validation or when phrases are broad/fragile.

For lower sections, click the outline entry first so the relevant text is on screen, then run replacements.

## Fixing a misplaced suggestion

```js
await tab.cua.keypress({ keys: ["ControlOrMeta", "Z"] });
```

If the bad suggestion is already in the right-side panel, inspect the visible DOM for its `Reject suggestion` control and click that node:

```js
const dom = await tab.dom_cua.get_visible_dom();
console.log(JSON.stringify(dom));
await tab.dom_cua.click({ node_id: "<REJECT_SUGGESTION_NODE_ID>" });
```

Then redo the intended correction more narrowly.

## Rules

- **Don't accept suggestions** unless the user explicitly asks.
- **Avoid broad document text extraction** from Google Docs while applying changes. Use the Markdown export for review and the browser only for applying changes.
- **Verify applied suggestions in the Docs UI.** A second `DOCS_modelChunk` extraction may reflect boot-time state unless the page is reloaded.
- Ignore browser telemetry/network noise when the Google Docs operation itself reports success.
- **Keep comments short and practical:** explain the spelling, grammar, punctuation, or wording reason in one sentence.
- **Keep replacements minimal.** Large suggestions are harder to review and can hide the actual fix.

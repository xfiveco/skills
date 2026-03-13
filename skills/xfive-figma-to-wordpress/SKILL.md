---
name: xfive-figma-to-wordpress
description: Implement Figma designs. Create WordPress pages from Figma designs. Create WordPress components from Figma designs. Compliment Figma MCP server.
---

# Instructions

## Procedure overview
1. First you will analyze the design and create guidelines for yourself.
2. Then you will proceed with converting Figma design to WordPress code and content according to the guidelines you created in step 1.
3. Then you will create a summary.
4. Finally you will create an assessment of success, comparing guidelines agains the summary and pointing out what was accomplished and what requires human developer assistance.

## 1. Guidelines
1. Split the Figma design into functional components.
2. Always assume the content has to by dynamic.
3. Always favour block based approach over static template approach.
4. For each component you distinguished implement the routine from [ITERATION](references/ITERATION.md) file but DO NOT CREATE OR UPDATE FILES yet but CREATE GUIDELINES of what you will do.
5. Save the guidelines to /agent_guidelines/wordpress_from_figma_{time_indicator}.md file. Use `YYYYMMDD_HHMM` format for `{time_indicator}` (e.g. `20260310_0850`).

## 2. Execution
1. Read the guidelines file you created.
2. For each component, execute the full ITERATION routine sequentially (theme.json → block → content → styles/scripts) before moving to the next component.

## 3. Summary
Append a summary section to the same /agent_guidelines/wordpress_from_figma_{time_indicator}.md file you created in step 1. Describe what was actually done for each component.

## 4. Assessment
1. Compare your guidelines to the actual result. Assess success ratio.
2. Append your suggestions directly to the same /agent_guidelines/wordpress_from_figma_{time_indicator}.md file under an "## Assessment" heading, and also present them in the chat so the developer can act on them immediately.
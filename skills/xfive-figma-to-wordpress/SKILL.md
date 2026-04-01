---
name: xfive-figma-to-wordpress
description: Implement Figma designs. Use when an AI agent needs to (1) Create WordPress pages from Figma designs, (2) Create WordPress components from Figma designs, (3) Create WordPress blocks from Figma designs, (3) Populate WordPress pages with content taken from Figma designs.
---

# Instructions

## Procedure overview
1. First you will check if you can read the Figma design from the URL address provided. You will use Figma's MCP server or API access
2. Then you will analyze the design and create plans for yourself.
3. Then you will proceed with converting Figma design to WordPress code and content according to the plans you created in step 1.
4. Then you will create a summary.
5. Finally you will create an assessment of success, comparing plans agains the summary and pointing out what was accomplished and what requires human developer assistance.

## 1. Prerequisites
1. Verify Figma URL is accessible
2. Check if Figma MCP server or API access is available
3. Extract design frames/components from Figma
4. Download design assets (images, icons) to temporary folder

### Error handling
- If Figma URL is inaccessible → inform user and request valid URL
- If MCP server unavailable → break and provide feedback for the user

## 2. Plan
1. Analyze the Figma design structure and identify distinct sections/components
2. For each component, determine its functional purpose (hero, gallery, form, etc.)
3. Split the design into reusable components following WordPress block philosophy
4. Always assume the content has to by dynamic and editable in WordPress admin panel. Avoid hardcoded content as much as possible.
5. Always favour block based approach over static template approach.
6. For each component you distinguished (reading from the top to the bottom of the design) read the routine from [ITERATION](references/ITERATION.md) file. DO NOT CREATE OR UPDATE FILES yet. Instead CREATE A PLAN of what you will do.
7. Save the plans to `/agent_plans/wordpress_from_figma_{time_indicator}.md` file in the root folder of the project. Use `YYYYMMDD_HHMM` format for `{time_indicator}` (e.g. `20260310_0850`).

### Error handling
- If component too complex → flag for human review in plan

## 3. Execution
1. Read the plans file you created.
2. Ask for user explicit approval before proceeding with the implementation. Continue only if user approves the plan.
3. For each component, execute the full ITERATION routine sequentially (theme.json → block → content → styles/scripts) before moving to the next component.

### Error handling
- If block creation fails → retry twice, then document in summary and continue with next component

## 4. Summary
Append a summary section to the same /agent_plans/wordpress_from_figma_{time_indicator}.md file you created in step 1. Describe what was actually done for each component.

## 5. Assessment
1. Compare your plans to the actual result. Assess success ratio.
2. Append your suggestions directly to the same /agent_plans/wordpress_from_figma_{time_indicator}.md file under an "## Assessment" heading, and also present them in the chat so the developer can act on them immediately.
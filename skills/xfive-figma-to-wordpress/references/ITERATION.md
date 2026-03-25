# Iteration

## Update theme.json
Perform the following routine to: fonts, font sizes, colors, spacings. The routine refers to them as "objects". The `theme.json` file is located in the active theme's root directory (e.g. `wp-content/themes/{theme-name}/theme.json`).

1. Get objects from the design
2. Check if you have those objects defined in theme.json
3. Add objects' definitions if they are missing

## Download images
Download all images into a temporary folder: `/tmp/figma_assets_{YYYYMMDD_HHMM}/`
Example: `/tmp/figma_assets_20260325_1237/`

## Create blocks
1. Determine if the design can be implemented with WordPress native blocks. Here you can find a list of [blocks](https://wordpress.org/documentation/article/blocks-list/). Often designs can be implemented with groupped blocks. See common patterns of design implementations with groupped blocks: [EXAMPLES](EXAMPLES.md)

Native blocks are sufficient when:
- Layout uses standard grid/flex patterns
- No custom interactions beyond basic links/buttons
- No complex animations or state management
- Content structure matches available block types

Custom block needed when:
- Repeater structures
- Custom data relationships
- Advanced interactions (sliders, accordions, tabs)
- Unique layout patterns not achievable with Group/Cover/Columns

2. If the design can be implemented with WordPress native blocks, proceed straight to [update](#update-content) and do not execute further steps of [create](#create-blocks)
3. Decide if an ACF block or a React-based Gutenberg block better fits your needs. Use the following criteria:
   - **React-based Gutenberg block**: the component requires no custom PHP logic and does not need editable fields beyond what the WordPress [Block API](https://developer.wordpress.org/block-editor/reference-guides/block-api/) provides natively.
   - **ACF block**: the component requires custom, named editable fields (e.g. a repeater, relationship) or complex layout) or PHP rendering logic that Block API does not provide.
4. Create the necessary block:
   - If block is an ACF block and theme is a Chisel theme then invoke `xfive-chisel-acf-blocks` skill.
   - If block is a native Gutenberg block then invoke `wp-block-development` skill.

## Update content
Implement the content from the design. Use the Xfive MCP server if the user explicitly asked for it; otherwise fall back to WP-CLI. Use the blocks. Use the images downloaded in the previous step.

## Remove images
After successful content updating remove images from the temporary folder.

## Update styles and scripts
1. Create necessary SCSS styles to implement the design.
2. Create necessary JavaScript to implement the design.
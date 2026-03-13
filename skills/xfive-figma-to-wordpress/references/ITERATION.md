# Iteration

## Update theme.json
Perform the following routine to: fonts, font sizes, colors, spacings. The routine refers to them as "objects". The `theme.json` file is located in the active theme root directory (e.g. `wp-content/themes/{theme-name}/theme.json`).

1. Get objects from the design
2. Check if you have those objects defined in theme.json
3. Add objects' definitions if they are missing

## Download images
Download all images into a temporary folder.

## Create blocks
1. Determine if the design can be implemented with one of WordPress native blocks. Here you can find a list of [blocks](https://wordpress.org/documentation/article/blocks-list/)
2. If the design can be implemented with one of WordPress native blocks, proceed straight to [update](#update-content) and do not execute further steps of [create](#create-blocks)
3. Decide if an ACF block or a native Gutenberg block better fits your needs. Use the following criteria:
   - **Native Gutenberg block**: the component maps closely to an existing core block pattern, requires no custom PHP logic, and does not need editable fields beyond what the block editor provides natively.
   - **ACF block**: the component requires custom, named editable fields (e.g. a repeater, relationship, or complex layout), needs PHP rendering logic, or the content editor should not interact with raw block markup.
4. Create the necessary block:
   - If block is an ACF block and theme is a Chisel theme then invoke `xfive-chisel-acf-blocks` skill.
   - If block is a native Gutenberg block then invoke `wp-block-development` skill.

## Update content
Implement the content from the design. Use the Xfive MCP server if the user explicitly asked for it; otherwise fall back to WP-CLI if available. Use the blocks. Use the images downloaded in the previous step.

## Remove images
After successful content updating remove images from the temporary folder.

## Update styles and scripts
1. Create necessary SCSS styles to implement the design.
2. Create necessary JavaScript to implement the design.
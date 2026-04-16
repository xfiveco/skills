# Chisel Building Playbook

This is the practical guide for building a site with Chisel, using the framework conventions from the official docs and the typical file structure present in Chisel projects.

## 1. Start With The Platform, Not The Page

Before building a page, decide four things:

1. Is the content editor-managed, code-managed, or mixed?
2. Is the section reusable across multiple pages?
3. Is the content static, relational, or query-driven?
4. Does the feature need custom interaction or AJAX?

Those answers determine where the work belongs.

## 2. Choose The Right Chisel Layer

### Use `theme.json` and `src/design/` when

- you are defining site-wide colors, font families, spacing, radii, shadows, layout widths, or editor-facing tokens
- you want both editor UI and frontend styles to share the same tokens

Relevant files:

- `theme.json`
- `src/design/tools/_theme.scss`
- `src/design/settings/`

### Use `views/` and `custom/views/` when

- you are building or overriding page, archive, single, component, or partial templates
- the output is better expressed as Twig than as a block

Relevant directories:

- `views/`
- `views/components/`
- `views/partials/`
- `custom/views/`

### Use `src/blocks/` when

- you need a reusable native Gutenberg block
- the block should use block editor conventions and JS-driven edit/save behavior

### Use `src/blocks-acf/` when

- the block is best configured with ACF fields
- the rendering is primarily Twig/PHP driven

### Use `patterns/` when

- you need reusable page sections that editors can insert and customize
- the structure is mostly static and does not justify a custom block

### Use `custom/app/WP/` when

- you are registering or extending assets, Twig, site class maps, CPTs, taxonomies, ACF options, or AJAX routes

### Use `custom/app/Timber/` when

- a post type or term needs richer methods in Twig

## 3. Recommended Page-Building Workflow

### Marketing or content-heavy page

Recommended flow:

1. Define the design tokens in `theme.json` if the page introduces new reusable design decisions.
2. Add reusable page sections as patterns or blocks.
3. Use existing components from `views/components/` wherever possible.
4. Add page-specific styling in the appropriate ITCSS layer under `src/styles/`.
5. Keep page assembly editor-friendly where it makes sense.

Good fits:

- landing pages
- home pages
- about pages
- service pages

### Data-driven listing or detail page

Recommended flow:

1. Define the data model:
   - CPT
   - taxonomies
   - ACF fields
   - ACF options if needed
2. Add or adjust the Timber class map if the post type needs domain-specific methods.
3. Build archive and single Twig templates.
4. Add reusable components for cards, hero sections, metadata rows, filters, or related items.
5. Add assets and interactions only after the rendering model is stable.

Good fits:

- resource libraries
- team members
- case studies
- product-like custom content

## 4. A Good Default Sequence For New Features

1. Design tokens
   - update `theme.json` and `src/design/` if new tokens are required
2. Content model
   - CPTs, taxonomies, fields, options pages
3. View model
   - Timber class and Twig context additions
4. Templates
   - page, archive, single, components, partials
5. Editor experience
   - blocks or patterns
6. Styling
   - SCSS in the right ITCSS layer
7. Behavior
   - JS modules, sliders, filters, AJAX
8. Build and QA
   - `npm run build`

This order prevents a lot of rework.

## 5. Practical Patterns From The Official Tutorial

The Coffee Shop tutorial demonstrates Chisel's intended workflow clearly and can be applied to any Chisel project.

### Pattern: Home page built from custom ACF blocks

Source:

- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-3-home-page/`

Takeaway:

- for homepage sections that editors should reorder or configure, ACF blocks are often the best fit
- let the editor assemble the page, but keep rendering and styling in code

Relevant directories in a Chisel project:

- `src/blocks-acf/`
- `views/components/`
- `theme.json`

### Pattern: Custom post type plus custom Timber class

Source:

- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-4-custom-post-type/`

Takeaway:

- register the CPT in the WP extension layer
- add a project Timber class if templates need richer methods than raw meta access
- map that class in `custom/app/WP/Site.php`

Relevant files in a Chisel project:

- `custom/app/WP/CustomPostTypes.php`
- `custom/app/WP/Site.php`
- `custom/app/Timber/`

### Pattern: Taxonomy-driven relationships and filters

Source:

- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-5-custom-taxonomies/`

Takeaway:

- use custom taxonomies for structured classification
- surface those terms in Twig and archive logic
- keep taxonomy registration in the project WP layer, not scattered around the theme

### Pattern: AJAX filters

Source:

- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-6-custom-ajax-filters/`

Takeaway:

- filters are usually a three-layer feature:
  - Twig markup and data attributes
  - JS module
  - REST endpoint and query logic
- helper classes keep the query-building logic out of templates

Implementation in a Chisel project:

- `views/components/` for filter UI
- `src/scripts/modules/` for filter behavior
- `custom/app/WP/Ajax.php` plus `custom/app/Ajax/` for the route and handler

## 6. How To Decide Between Blocks, Twig Templates, And Patterns

### Prefer a block when

- editors need to reuse the section across many pages
- the section has meaningful configuration
- the section belongs in the editor toolbox

### Prefer a pattern when

- the structure is mostly fixed
- the editor should start from a predefined layout
- you want a reusable composition, not a new block type

### Prefer a Twig template when

- the output is tied to WordPress template hierarchy
- the content is data-driven
- the section is better treated as a framework component than as editor content

## 7. Where Page-Specific Work Usually Lands

### New page template

Relevant files:

- root PHP template entrypoint if needed
- `views/<template>.twig`
- `views/components/` for extracted sections

Scaffolding helper:

- Chisel projects include `npm run add-page` for scaffolding new page templates
- Run it without parameters to use the interactive prompts

### New reusable section

Choose one of these directories:

- `patterns/`
- `src/blocks/`
- `src/blocks-acf/`

### New shared UI primitive

Relevant locations:

- `views/components/`
- corresponding SCSS in `src/styles/components/`
- optional JS module in `src/scripts/modules/`

### New relational content type

Relevant files:

- `custom/app/WP/CustomPostTypes.php`
- `custom/app/WP/Acf.php`
- `custom/app/WP/Site.php`
- `custom/app/Timber/`
- `views/archive*.twig`
- `views/single*.twig`

## 8. Asset And Interaction Workflow

When adding behavior:

1. put JS modules in `src/scripts/modules/`
2. import them from the correct entrypoint
3. if the feature needs data from PHP, localize it through the asset config layer
4. if the feature needs server interaction, use the REST/AJAX system already present

When adding styles:

1. choose the right ITCSS layer
2. use `theme.json` token helpers instead of ad hoc hardcoded values where practical
3. keep block styles close to blocks when the styling is block-specific

## 9. Update And Maintenance Rules

- never treat `core/` as the normal customization layer
- use `npm run check-update` before framework updates
- remember that `npm run update-chisel` overwrites `core/`
- keep ACF JSON versioned
- keep custom routes, CPTs, and Twig helpers in the project extension layer

## 10. Fast Checklist Before You Start A New Feature

- Is the design token layer up to date?
- Does the feature belong to editor content, template logic, or both?
- Can an existing component or helper be reused?
- Should this be a block, pattern, component, template, or CPT?
- Does the feature need a custom route?
- Does it belong in `custom/app/` rather than `core/`?

If you can answer those six questions first, the rest of the Chisel workflow is usually straightforward.

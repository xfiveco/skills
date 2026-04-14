---
name: xfive-chisel-development
description: Instructions and knowledge base about developing WordPress with Chisel development framework. Use when building a WordPress site with Chisel development framework.
---

To perform a task related to WordPress and [Chisel](https://www.getchisel.co/) development framework, read the following knowledge base before planning any implementation.

# How to develop with Chisel

Chisel is a custom WordPress development framework. It uses **Timber/Twig** for templating, **Webpack** for asset bundling, and **ITCSS** for CSS architecture. PHP, Node.js.

Detailed Chisel documentation is in [References](references/) — consult it for deep dives on architecture, features, hooks, and building patterns.

## Commands

### Development

- `npm run dev` / `npm run start` — Start dev server with Fast Refresh
- `npm run build` — Full build (scripts + lint + phpcs + twigcs + check-update)
- `npm run build-scripts` — Build assets only (no linting)

### Linting & Formatting

- `npm run lint` — Run both ESLint and Stylelint with auto-fix
- `npm run lint:script` — ESLint only (JS/TS/JSX/TSX)
- `npm run lint:style` — Stylelint only (CSS/SCSS)
- `npm run phpcs` — PHP CodeSniffer (WordPress coding standards)
- `npm run phpcbf` — PHP auto-fix
- `npm run twigcs` — Twig template linting
- `npm run format` — Prettier formatting
- `npm run format-and-lint` — Prettier then linters

### Scaffolding

- `npm run add-page` — Add a new page template
- `npm run create-block` — Create a new Gutenberg block (namespace: `chisel`, category: `chisel-blocks`)

### Chisel Updates

- `npm run check-update` — Check for Chisel framework updates
- `npm run update-chisel` — Update core files (overwrites `core/` folder)

## Architecture

### Boot Order

`functions.php` is the runtime entry point. It loads in this order:

1. Composer autoload
2. Chisel autoloader registers both `core/` and `custom/app/`
3. Timber initialization
4. Core singletons boot (AJAX, blocks, ACF, assets, comments, site, sidebars, theme, CPTs, taxonomies, Twig, plugin integrations, cache)
5. `custom/functions.php` boots project-specific singletons from `custom/app/WP/`

### Core vs Custom (Critical Pattern)

**Never modify files in `core/`** — they are managed by Chisel and overwritten on update. Instead, create corresponding files in `custom/app/`:

| Core file                       | Custom override                       |
| ------------------------------- | ------------------------------------- |
| `core/WP/Site.php`              | `custom/app/WP/Site.php`              |
| `core/Timber/ChiselPost.php`    | `custom/app/Timber/ChiselPost.php`    |
| `core/Helpers/ImageHelpers.php` | `custom/app/Helpers/ImageHelpers.php` |

A pre-commit hook blocks modifications to `core/` files. The autoloader in `functions.php` loads from both `core/` and `custom/app/` under the `Chisel\` namespace.

### Namespace And Autoloader Detail

- Classes are namespaced under `Chisel\`
- The custom layer uses namespaces like `Chisel\WP\Custom\Assets`
- **IMPORTANT:** The autoloader strips the `Custom` segment when resolving files inside `custom/app/`. The `Custom` segment is a namespace marker only, not a directory name.
- So `Chisel\WP\Custom\Assets` → `custom/app/WP/Assets.php`, `Chisel\Timber\Custom\ChiselPost` → `custom/app/Timber/ChiselPost.php`

### PHP Architecture

- **Namespace:** `Chisel\` — autoloaded from `core/` and `custom/app/`
- **Templating:** Timber v2 + Twig — PHP template files (e.g., `page.php`) call `Timber::render()` with `.twig` templates from `views/`
- **Singleton pattern:** Core classes use `get_instance()` — initialized in `functions.php`
- **Key directories:**
  - `core/WP/` — WordPress integration (assets, blocks, ACF, menus, sidebars, custom post types)
  - `core/Timber/` — Extended Timber classes (ChiselPost, ChiselImage, Components)
  - `core/Controllers/` — AJAX controller
  - `custom/app/` — Project-specific overrides and extensions
  - `custom/functions.php` — Project-specific initialization

### Twig Views

- `views/` — Main templates (base.twig, page.twig, single.twig, archive.twig, etc.)
- `views/components/` — Reusable component partials
- `views/partials/` — Template partials
- `custom/views/` — Override any view by mirroring the path from `views/`

### Frontend / Assets

- **Entry points:** `src/scripts/app.js`, `src/scripts/admin.js`, `src/scripts/editor.js`, `src/scripts/login.js`
- **SCSS (ITCSS layers):** `src/styles/main.scss` imports: generic → elements → vendor → objects → components → blocks → widgets → utilities
- **Design tokens:** `src/design/` — SCSS tools/mixins (breakpoints, colors, layout, typography via `_theme.scss`)
- **Blocks:**
  - `src/blocks/` — Native Gutenberg blocks (React JSX — edit.js/save.js/view.js + block.json)
  - `src/blocks-acf/` — ACF blocks (Twig templates + block.json)
- **Webpack:** Extends `@wordpress/scripts` config via `chisel-scripts`
- **Block build dependency:** Blocks register from compiled `build/blocks/` and `build/blocks-acf/` output, not from source. If the build output doesn't exist, blocks won't register. **Required workflow:** Run `npm run dev` or `npm run build-scripts` after creating or modifying any block files to compile them before they can be registered and used.

### WordPress Block Patterns

- `patterns/` — PHP-based block patterns (hero, features, CTA, comments)

### Design Tokens (theme.json)

`theme.json` defines colors, typography, spacing, and layout. Use `var(--wp--preset--*)` and `var(--wp--custom--*)` CSS custom properties in SCSS. SCSS tools in `src/design/tools/` provide mixins for breakpoints, colors, and layout.

Design system flow: define tokens in `theme.json` → consume via SCSS helpers like `get-color()` and `get-font-size()` in `src/design/tools/_theme.scss` → use in component and block styles organized by ITCSS layers in `src/styles/main.scss`.

## Where To Add New Code

### PHP and WordPress behavior

- Custom post types: `custom/app/WP/CustomPostTypes.php` via `chisel_custom_post_types` filter
- Custom taxonomies: `custom/app/WP/CustomPostTypes.php` via `chisel_custom_taxonomies` filter
- ACF options pages: `custom/app/WP/Acf.php`
- AJAX routes: `custom/app/WP/Ajax.php`
- Custom AJAX handlers: `custom/app/Ajax/`
- Custom Twig functions and filters: `custom/app/WP/Twig.php`
- Custom Timber post/term class mapping: `custom/app/WP/Site.php`
- Custom Timber classes: `custom/app/Timber/`
- Project-specific assets: `custom/app/WP/Assets.php`

### Templates and UI

- Reusable Twig components: `views/components/`
- Template overrides: `custom/views/` (same file name/path wins over `views/`)
- Template partials: `views/partials/`
- Page/archive/single Twig templates: `views/`
- WooCommerce Twig templates: `views/woocommerce/`

### Frontend assets

- App JS modules: `src/scripts/modules/`
- Editor JS: `src/scripts/editor/`
- SCSS: `src/styles/` (choose the right ITCSS layer)
- Design helpers and token functions: `src/design/`
- Static design files: `assets/`

### Editor-driven content

- Native blocks: `src/blocks/`
- ACF blocks: `src/blocks-acf/`
- Block patterns: `patterns/`
- Global ACF field groups: `acf-json/`
- Block-local ACF field groups: `src/blocks-acf/<block>/acf-json/`

## Choosing Between Blocks, Templates, and Patterns

- **Block** — editors reuse it across many pages, it has meaningful configuration, belongs in the editor toolbox
- **Pattern** — structure is mostly fixed, editors start from a predefined layout, it's a reusable composition not a new block type
- **Twig template** — output is tied to WordPress template hierarchy, content is data-driven, better as a framework component than editor content

## Recommended Feature-Building Sequence

1. **Design tokens** — update `theme.json` and `src/design/` if new tokens are required
2. **Content model** — CPTs, taxonomies, fields, options pages
3. **View model** — Timber class and Twig context additions
4. **Templates** — page, archive, single, components, partials
5. **Editor experience** — blocks or patterns
6. **Styling** — SCSS in the right ITCSS layer
7. **Behavior** — JS modules, sliders, filters, AJAX
8. **Build and QA** — `npm run build`

## Extension Hooks

Chisel exposes hook families for assets, Twig, blocks, AJAX, CPTs, taxonomies, ACF, theme, sidebars, comments, and cache. Use hooks to change behavior instead of editing `core/`. See `references/chisel-hooks-reference.md` for the complete list.

Key hook families:

- **Assets:** `chisel_frontend_styles`, `chisel_frontend_scripts`, `chisel_admin_*`, `chisel_editor_*`, `chisel_login_*` (registration, pre-enqueue, per-asset)
- **Twig:** `chisel_twig_register_functions`, `chisel_twig_register_filters`, `chisel_twig_register_tests`
- **Blocks:** `chisel_timber_acf_blocks_data`, `chisel_timber_acf_blocks_data_{$block_slug}`
- **AJAX:** `chisel_ajax_routes`, `chisel_ajax_permissions_check`
- **CPTs/Taxonomies:** `chisel_custom_post_types`, `chisel_custom_taxonomies`
- **ACF:** `chisel_acf_options_pages`, `chisel_acf_options_sub_pages`

## Code Style

- **PHP:** WordPress coding standards (tabs, WordPress-Core rules). No Yoda conditions. See `phpcs.xml` for rule details.
- **JS/JSX:** ESLint recommended + React plugin + Xfive Prettier config
- **SCSS:** Stylelint with standard-scss, recess property order, BEM or camelCase selectors
- **Twig:** Linted with twigcs (Official ruleset)
- **Indentation:** 2 spaces (JS/SCSS/JSON/Twig), tabs (PHP)

## Git Hooks

Pre-commit runs lint-staged (ESLint, Stylelint, Prettier, PHPCS, twigcs) and blocks modifications to `core/` files. Run `npm run prepare` to set up hooks after cloning.

## Important Notes

- When working with `npm run create-block` or `npm run add-page`, always run these commands without any params and let the interactive prompts guide you. This ensures proper configuration and prevents errors.
- `cheerio` is available and may be helpful when fetching online resources.
- **Always read [References](references/) before planning any work.** Use this guide:
  - For architecture questions or file structure → read `chisel-architecture-and-files.md`
  - For feature implementation workflow → read `chisel-building-playbook.md`
  - For available hooks and extension points → read `chisel-hooks-reference.md`
  - For specific features (Timber, Twig, blocks, AJAX) → read `chisel-features-reference.md`
  - For quick file location lookup → read `chisel-source-map.md`
- Before building a new header, nav, pagination, or slider, inspect the existing component layer in `views/components/` and `core/Timber/Components.php`.
- Check `core/Helpers/` before reinventing a utility — helpers exist for images, data, cache, AJAX, blocks, ACF, comments, Yoast, WooCommerce, and Gravity Forms.
- Do not style across component boundaries; if a shared component needs a variant, add an explicit modifier or API within that component instead.
- Register project assets via the provided hooks in `custom/app/WP/Assets.php` instead of calling `wp_enqueue_*` directly.
- Register CPTs and taxonomies via filters, not ad hoc `register_post_type()` calls.
- When creating markdown tables, add `<!-- prettier-ignore -->` on top of them.
- Use imperative, sentence-case commit messages without prefixes, for example `Implement redesigned site header`.
- When asked to prepare a plan, write it to a `plans/` directory in the project root (create if it doesn't exist). Use descriptive filenames like `plans/feature-name.md`. Do not start implementation until the plan is explicitly approved by the user.

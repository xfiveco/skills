# Chisel Features Reference

This file mirrors the public `Docs > Features` section, explaining how each feature applies to Chisel projects.

## Build System And Environment

### Modern Webpack Setup

Official page:

- `https://getchisel.co/docs/features/modern-webpack-setup/`

What it means:

- Chisel uses `chisel-scripts` to wrap the WordPress scripts toolchain.
- JS, SCSS, and blocks are built from `src/` into `build/`.
- fast refresh is part of the default workflow.
- the build system also understands modern WordPress block tooling and the Interactivity API.

Relevant files in a Chisel project:

- `package.json`
- `webpack.config.js`
- `src/scripts/app.js`
- `src/scripts/admin.js`
- `src/scripts/editor.js`
- `src/scripts/login.js`
- `src/styles/main.scss`
- `src/design/`
- `src/blocks/`
- `src/blocks-acf/`
- `build/`

Practical takeaways:

- run `npm run dev` while building anything substantial
- block work depends on compiled `build/` output
- `runtime.js` exists only for fast refresh mode
- the optional icons module is gated by `CHISEL_USE_ICONS_MODULE`

### Preconfigured Docker Dev Environment

Official page:

- `https://getchisel.co/docs/features/preconfigured-docker-dev-environment/`

What it means:

- Chisel can scaffold a devcontainer-based environment
- the public docs describe setup, startup, local server access, terminal access, and configuration changes

Relevant files in a Chisel project:

- `.devcontainer` support is exposed through the package scripts
- `package.json` includes:
  - `npm run devcontainer:up`
  - `npm run devcontainer:enter`
  - `npm run devcontainer:start`

Practical takeaways:

- if local machine setup is painful, the Docker path is a first-class Chisel workflow
- if you use the local non-Docker setup, the wildcard `.test` domain approach from the install docs is still relevant

### Strict Coding Standards And Conventions

Official page:

- `https://getchisel.co/docs/features/strict-coding-standards-and-conventions/`

What it means:

- Chisel expects PHP, Twig, JS, and SCSS quality gates to run as part of the normal workflow
- Git hooks are part of the default developer experience

Relevant files in a Chisel project:

- `phpcs.xml`
- `twig_cs.php`
- `eslint.config.mjs`
- `stylelint.config.mjs`
- `prettier.config.mjs`
- `.husky/`
- `lint-staged.config.mjs`

Practical takeaways:

- `npm run build` is not only a compile step; it also runs linting, PHPCS, Twig CS, and Chisel update checks
- the pre-commit flow is intentionally opinionated
- `core/` is protected both culturally and by tooling

### Theme.json Configuration With Modern Sass

Official page:

- `https://getchisel.co/docs/features/theme-json-configuration-with-modern-sass-scss-features-use-forward/`

What it means:

- `theme.json` is the canonical token layer
- SCSS should consume those tokens through helpers instead of hardcoding duplicate values
- Sass modules with `@use` and `@forward` are part of the intended architecture

Relevant files in a Chisel project:

- `theme.json`
- `src/design/_index.scss`
- `src/design/settings/_index.scss`
- `src/design/tools/_theme.scss`

Practical takeaways:

- add or change palette, typography, spacing, or layout primitives in `theme.json` first
- read those values in SCSS through token helpers
- keep the design layer consistent so editor and frontend stay aligned

## Content Rendering And UI

### Native And ACF Block Support With Auto-Registration

Official page:

- `https://getchisel.co/docs/features/native-and-acf-block-support-with-auto%E2%80%91registration/`

What it means:

- native Gutenberg blocks and ACF blocks are both first-class citizens
- blocks are discovered automatically from the expected folders
- block registration can use custom script/style handles
- block-local ACF JSON is supported

Relevant files in a Chisel project:

- `core/WP/Blocks.php`
- `core/WP/AcfBlocks.php`
- `core/Factories/RegisterBlocks.php`
- `src/blocks/`
- `src/blocks-acf/`

Practical takeaways:

- native blocks belong in `src/blocks/`
- ACF blocks belong in `src/blocks-acf/`
- block registration happens from compiled output, so broken builds mean missing blocks
- in Chisel projects, `npm run create-block` should be run without extra params and answered interactively
- when creating an ACF block `xfive-chisel-acf-blocks` skill can be invoked to streamline the development

### Twig Templating Support With Timber

Official page:

- `https://getchisel.co/docs/features/twig-templating-support-with-timber-timber-cache-integration/`

What it means:

- page rendering flows through Timber and Twig
- Chisel adds custom Timber classes and global context
- custom Twig functions, filters, and tests are expected extension points
- view overrides are a normal part of the architecture

Relevant files in a Chisel project:

- `core/WP/Site.php`
- `core/WP/Twig.php`
- `core/Timber/`
- `views/`
- `custom/views/`
- `custom/app/WP/Twig.php`
- `custom/app/WP/Site.php`

Practical takeaways:

- use Twig for the bulk of the view layer
- extend global context, class maps, and Twig helpers instead of stuffing logic into templates
- use `custom/views/` when overriding framework-provided templates

### Ready-Made Components

Official page:

- `https://getchisel.co/docs/features/ready%E2%80%91made-components/`

What it means:

- Chisel ships with reusable header/footer/navigation/pagination/search/icon/slider style components
- components are available through Twig templates and helper methods
- the docs also treat some blocks as reusable "components"

Relevant files in a Chisel project:

- `core/Timber/Components.php`
- `views/components/`
- `views/objects/icon.twig`
- `views/components/slider.twig`
- `src/scripts/modules/slider.js`
- `src/blocks/accordion/`
- `src/blocks-acf/slider/`

Practical takeaways:

- before building a new header, nav, pagination, or slider from scratch, inspect the existing component layer
- Chisel's component helpers are already wired into the global Twig context
- the slider pattern spans Twig, block markup, styles, and JS modules

### Utility And Helper Functions

Official page:

- `https://getchisel.co/docs/features/utility-and-helper-functions/`

What it means:

- helper classes exist across PHP, Twig, images, data, cache, AJAX, blocks, WooCommerce, and Gravity Forms
- a lightweight JS helper layer exists for common frontend tasks

Relevant files in a Chisel project:

- `core/Helpers/ThemeHelpers.php`
- `core/Helpers/AssetsHelpers.php`
- `core/Helpers/ImageHelpers.php`
- `core/Helpers/CacheHelpers.php`
- `core/Helpers/DataHelpers.php`
- `core/Helpers/AjaxHelpers.php`
- `core/Helpers/BlocksHelpers.php`
- `core/Helpers/AcfHelpers.php`
- `core/Helpers/CommentsHelpers.php`
- `core/Helpers/YoastHelpers.php`
- `core/Helpers/WoocommerceHelpers.php`
- `core/Helpers/GravityFormsHelpers.php`
- `src/scripts/modules/utils.js`

Practical takeaways:

- check helpers before reinventing a utility in the project layer
- the helper layer is one of the fastest ways to learn "the Chisel way" of doing routine work

## Data, Assets, And Extension API

### Automated Custom Post Type And ACF Options Pages Registration

Official page:

- `https://getchisel.co/docs/features/automated-custom-post-type-and-acf-options-pages-registration/`

What it means:

- Chisel expects CPTs, taxonomies, and ACF options pages to be declared through filters and factory classes
- defaults exist for supports, rewrite args, and capabilities

Relevant files in a Chisel project:

- `core/WP/CustomPostTypes.php`
- `core/WP/CustomTaxonomies.php`
- `core/WP/Acf.php`
- `core/Factories/RegisterCustomPostType.php`
- `core/Factories/RegisterCustomTaxonomy.php`
- `core/Factories/RegisterAcfOptionsPage.php`
- `custom/app/WP/CustomPostTypes.php`
- `custom/app/WP/Acf.php`

Practical takeaways:

- register project data models through the provided filters, not ad hoc `register_post_type()` calls scattered across the codebase
- if you need custom post classes in Twig, pair the CPT with a Timber class map change in `custom/app/WP/Site.php`

### Sync Watcher For ACF

Official page:

- `https://getchisel.co/docs/features/sync-watcher-for-acf-a-custom-plugin/`

What it means:

- Chisel expects ACF JSON to be part of the developer workflow
- field group sync is treated as an implementation detail that should be automated as much as possible

Relevant locations in a Chisel project:

- global field groups live in `acf-json/`
- block-local field groups can live under `src/blocks-acf/<block>/acf-json/`

Practical takeaways:

- keep ACF field definitions versioned
- block-local ACF JSON is useful when the field group belongs tightly to one block
- global JSON is better for site-wide or shared field groups

### REST API Endpoints For AJAX Requests

Official page:

- `https://getchisel.co/docs/features/rest-api-endpoints-for-ajax-requests/`

What it means:

- Chisel routes AJAX through the WordPress REST API
- custom routes are registered through a filter
- nonce handling and permission hooks are already part of the framework

Relevant files in a Chisel project:

- `core/Controllers/AjaxController.php`
- `core/Interfaces/AjaxEndpointInterface.php`
- `core/Ajax/LoadMoreEndpoint.php`
- `custom/app/WP/Ajax.php`
- `src/scripts/modules/load-more.js`

Practical takeaways:

- register routes in `custom/app/WP/Ajax.php`
- implement handlers under `custom/app/Ajax/`
- frontend code should consume the localized AJAX config already registered by the asset system
- the public docs use AJAX, but the actual transport is REST

### Automated Assets Registration And Enqueueing

Official page:

- `https://getchisel.co/docs/features/automated-assets-registration-and-enqueueing/`

What it means:

- assets are grouped by context: frontend, admin, editor, login, footer
- registration and enqueue are separate phases
- many filters exist for asset customization and conditional loading

Relevant files in a Chisel project:

- `core/WP/Assets.php`
- `core/Helpers/AssetsHelpers.php`
- `custom/app/WP/Assets.php`

Practical takeaways:

- add project-specific assets via the provided filters instead of directly calling `wp_enqueue_*` in random files
- the asset layer already handles localization, conditions, strategy, async/defer, and preloading
- login, admin, and editor assets are treated as first-class contexts, not afterthoughts

### Custom Action And Filter Hooks

Official page:

- `https://getchisel.co/docs/features/custom-action-and-filter-hooks/`

What it means:

- hooks are the main public extension API of Chisel
- asset registration, Twig extension, blocks, AJAX, CPTs, taxonomies, ACF, theme settings, caching, and integrations all expose hook families

Relevant files in a Chisel project:

- throughout `core/`
- documented in Chisel's hooks reference

Practical takeaways:

- when you need to change behavior, look for a hook before subclassing or editing core
- most project extension work in Chisel is hook-driven

## Integrations

### WooCommerce Support

Official page:

- `https://getchisel.co/docs/features/woocommerce-support/`

What it means:

- Chisel adds WooCommerce-aware helpers, custom Timber classes, templates, asset loading, sidebars, and load-more behavior

Relevant files in a Chisel project:

- `core/Plugins/Woocommerce/Woocommerce.php`
- `core/Timber/ChiselProduct.php`
- `core/Timber/ChiselProductCategory.php`
- `core/Helpers/WoocommerceHelpers.php`
- `views/woocommerce/`
- `views/sidebar-woocommerce.twig`
- `src/styles/woocommerce.scss`
- `src/styles/woo/`

Practical takeaways:

- WooCommerce support is not just stylesheet-level; it is built into the rendering model
- product and taxonomy data can arrive in Twig as custom Timber classes
- sidebars and archive behavior are already accounted for

### Gravity Forms Support

Official page:

- `https://getchisel.co/docs/features/gravity-forms-support/`

What it means:

- Chisel adds helper methods, conditional plugin checks, frontend styling, and rendering guidance for Gravity Forms

Relevant files in a Chisel project:

- `core/Plugins/GravityForms/GravityForms.php`
- `core/Helpers/GravityFormsHelpers.php`
- `src/styles/gravity-forms.scss`
- `src/styles/wp-admin/_acf.scss`

Practical takeaways:

- always guard GF-specific logic with an availability check
- treat form styling as part of the theme layer, not a plugin-only concern

## Feature-Level Conclusion

The public Features section describes Chisel as an integrated system, not a bag of utilities. In any Chisel project, this system is visible in the code:

- build pipeline in `package.json`, `src/`, and `build/`
- data model registration in `core/WP/*` plus `custom/app/WP/*`
- Twig and Timber integration in `core/WP/Site.php`, `core/WP/Twig.php`, `views/`, and `custom/views/`
- extension by hooks instead of core edits

That is the central Chisel rule to keep in mind while building with Chisel.

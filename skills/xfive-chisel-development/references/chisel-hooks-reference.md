# Chisel Hooks Reference

The public docs describe hooks as one of Chisel's main extension layers. This file lists the hook families available in Chisel projects.

## How To Read This File

- "registration" hooks usually let you add or alter config arrays
- "pre-enqueue" hooks let you edit the asset bucket before items are enqueued
- "per-asset" hooks decide whether a single asset should enqueue
- when possible, prefer these hooks over editing `core/`

## Asset Hooks

Defined mainly in `core/WP/Assets.php`.

### Registration hooks

- `chisel_frontend_styles`
- `chisel_frontend_footer_styles`
- `chisel_frontend_scripts`
- `chisel_admin_styles`
- `chisel_admin_scripts`
- `chisel_editor_styles`
- `chisel_editor_scripts`
- `chisel_login_styles`
- `chisel_login_scripts`

Typical use in a Chisel project:

- register project-specific styles and scripts from `custom/app/WP/Assets.php`

### Pre-enqueue hooks

- `chisel_pre_enqueue_frontend_styles`
- `chisel_pre_enqueue_frontend_scripts`
- `chisel_pre_enqueue_frontend_footer_styles`
- `chisel_pre_enqueue_admin_styles`
- `chisel_pre_enqueue_admin_scripts`
- `chisel_pre_enqueue_editor_styles`
- `chisel_pre_enqueue_editor_scripts`
- `chisel_pre_enqueue_login_styles`
- `chisel_pre_enqueue_login_scripts`

Typical use:

- conditionally remove or alter items before enqueue happens

### Per-asset enqueue hooks

- `chisel_enqueue_frontend_style`
- `chisel_enqueue_frontend_script`
- `chisel_enqueue_frontend_footer_style`
- `chisel_enqueue_admin_style`
- `chisel_enqueue_admin_script`
- `chisel_enqueue_editor_style`
- `chisel_enqueue_editor_script`
- `chisel_enqueue_login_style`
- `chisel_enqueue_login_script`

Typical use:

- skip one asset in one context based on page conditions

### Loader behavior hooks

- `chisel_async_scripts`
- `chisel_defer_scripts`
- `chisel_preload_styles`
- `chisel_preload_styles_start_with`
- `chisel_preload_style`

Typical use:

- fine-tune performance behavior for handles or handle prefixes

## Twig Hooks

Defined mainly in `core/WP/Twig.php`.

- `chisel_twig_register_functions`
- `chisel_twig_register_filters`
- `chisel_twig_register_tests`

Typical use in a Chisel project:

- extend Twig from `custom/app/WP/Twig.php`

Related template actions exposed in Twig:

- `chisel_after_wp_head`
- `chisel_after_wp_footer`

These are used in `views/base.twig`.

## Block Hooks

Defined across `core/WP/Blocks.php`, `core/Factories/RegisterBlocks.php`, and `core/Helpers/BlocksHelpers.php`.

- `chisel_blocks_register_scripts`
- `chisel_block_register_script_args`
- `chisel_timber_acf_blocks_data`
- `chisel_timber_acf_blocks_data_{$block_slug}`
- `chisel_timber_acf_blocks_data_{$block_id}`
- `chisel_styles_inline_size_limit`
- `chisel_load_separate_core_block_assets`

Typical use:

- customize block registration
- alter script args
- add data to ACF block context before Twig render
- tune inline style behavior for blocks

## AJAX Hooks

Defined in `core/Controllers/AjaxController.php`.

- `chisel_ajax_routes`
- `chisel_ajax_permissions_check`

Typical use in a Chisel project:

- add custom REST-backed AJAX routes from `custom/app/WP/Ajax.php`
- override or harden permission logic

## Custom Post Type And Taxonomy Hooks

Defined in `core/WP/CustomPostTypes.php`, `core/WP/CustomTaxonomies.php`, and their factory classes.

### Registration hooks

- `chisel_custom_post_types`
- `chisel_custom_taxonomies`

Typical use in a Chisel project:

- declare project CPTs and taxonomies from `custom/app/WP/CustomPostTypes.php`

### Defaults hooks

- `chisel_default_post_type_supports`
- `chisel_default_post_type_supports_{$post_type}`
- `chisel_default_post_type_rewrite_args`
- `chisel_default_post_type_rewrite_args_{$post_type}`
- `chisel_default_taxonomy_capabilities`
- `chisel_default_taxonomy_capabilities_{$taxonomy}`
- `chisel_default_taxonomy_rewrite_args`
- `chisel_default_taxonomy_rewrite_args_{$taxonomy}`

Typical use:

- change default supports, rewrite args, or capabilities globally or per content type

## ACF Hooks

Defined mainly in `core/WP/Acf.php` and `core/Helpers/ThemeHelpers.php`.

- `chisel_acf_options_pages`
- `chisel_acf_options_sub_pages`
- `chisel_acf_colors_palette`
- `chisel_editor_colors_palette`

Typical use in a Chisel project:

- register options pages from `custom/app/WP/Acf.php`
- customize the palette used for ACF color pickers or editor contexts

## Theme And Navigation Hooks

Defined mainly in `core/WP/Theme.php`.

- `chisel_nav_menus`
- `chisel_post_thumbnails_post_types`

Typical use:

- add menus
- alter which post types support featured images

## Sidebar Hooks

Defined in `core/WP/Sidebars.php` and `core/Timber/Components.php`.

- `chisel_sidebars`
- `chisel_sidebar_content`

Typical use:

- register sidebars
- alter sidebar output before it reaches Twig

## Comments Hooks

Defined in `core/WP/Comments.php`.

- `chisel_disable_comments`
- `chisel_disable_comments_post_types`

Typical use:

- disable comments globally or for selected post types

## Cache Hooks

Defined in `core/Timber/Cache.php`.

- `chisel_cache_expiry`
- `chisel_cache_everything`
- `chisel_environment_cache`

Typical use:

- adjust Timber cache duration
- toggle aggressive or environment-based caching

## Integration Hooks In Use

A few integrations hook back into the main Chisel systems:

- WooCommerce uses `chisel_sidebars` and `chisel_frontend_styles`
- Gravity Forms uses `chisel_frontend_footer_styles` and `chisel_enqueue_frontend_footer_style`

You can see those integrations in:

- `core/Plugins/Woocommerce/Woocommerce.php`
- `core/Plugins/GravityForms/GravityForms.php`

## Project Extension Files To Reach For First

When you want to use hooks in a Chisel project, start with these files:

- `custom/app/WP/Assets.php`
- `custom/app/WP/Twig.php`
- `custom/app/WP/Ajax.php`
- `custom/app/WP/CustomPostTypes.php`
- `custom/app/WP/Acf.php`
- `custom/app/WP/Site.php`

These files are typically present in Chisel projects and are the intended "safe" layer above Chisel core.

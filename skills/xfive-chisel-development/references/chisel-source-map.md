# Chisel Official Source Map

## Scope

This snapshot is based on the public Chisel site at `https://getchisel.co/`, using:

- the public sitemap endpoints
- the WordPress REST API exposed by the site
- the rendered docs and tutorial pages

Focus areas for Chisel development:

- installation and update workflow
- files and folders structure
- every page under `Docs > Features`
- tutorial chapters that show real website-building patterns

Useful source endpoints discovered during research:

- `https://getchisel.co/sitemap_index.xml`
- `https://getchisel.co/doc-sitemap.xml`
- `https://getchisel.co/tutorial-sitemap.xml`
- `https://getchisel.co/wp-json/wp/v2/doc`
- `https://getchisel.co/wp-json/wp/v2/tutorial`

## Official Docs Tree

### Installation / Setup

- `https://getchisel.co/docs/installation-setup/`
- `https://getchisel.co/docs/installation-setup/updating-chisel/`
- `https://getchisel.co/docs/installation-setup/wildcard-virtual-hosts/`

Main topics:

- Node.js and PHP requirements
- generator-based project creation
- existing project onboarding
- `wp-config` generation
- build and dev commands
- updating the `core/` layer safely
- wildcard local domains

### Files and folders structure

- `https://getchisel.co/docs/files-and-folders-structure/`

Main topics:

- top-level files
- directory responsibilities
- where to add new code
- core vs custom override strategy

### Features

Index page:

- `https://getchisel.co/docs/features/`

Feature pages reviewed:

- `https://getchisel.co/docs/features/modern-webpack-setup/`
- `https://getchisel.co/docs/features/preconfigured-docker-dev-environment/`
- `https://getchisel.co/docs/features/strict-coding-standards-and-conventions/`
- `https://getchisel.co/docs/features/theme-json-configuration-with-modern-sass-scss-features-use-forward/`
- `https://getchisel.co/docs/features/native-and-acf-block-support-with-auto%E2%80%91registration/`
- `https://getchisel.co/docs/features/twig-templating-support-with-timber-timber-cache-integration/`
- `https://getchisel.co/docs/features/automated-custom-post-type-and-acf-options-pages-registration/`
- `https://getchisel.co/docs/features/sync-watcher-for-acf-a-custom-plugin/`
- `https://getchisel.co/docs/features/rest-api-endpoints-for-ajax-requests/`
- `https://getchisel.co/docs/features/automated-assets-registration-and-enqueueing/`
- `https://getchisel.co/docs/features/ready%E2%80%91made-components/`
- `https://getchisel.co/docs/features/utility-and-helper-functions/`
- `https://getchisel.co/docs/features/custom-action-and-filter-hooks/`
- `https://getchisel.co/docs/features/woocommerce-support/`
- `https://getchisel.co/docs/features/gravity-forms-support/`

### CI / CD

- `https://getchisel.co/docs/ci-cd/`
- `https://getchisel.co/docs/ci-cd/ci-cd-example/`

Main topics:

- GitLab pipeline examples
- build/deploy stages
- rsync-oriented deployment patterns

## Tutorial Tree

Tutorial index:

- `https://getchisel.co/tutorials/chisel-coffee-shop/`

Chapters reviewed:

- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-1-project-setup/`
- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-2-woocommerce-setup/`
- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-3-home-page/`
- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-4-custom-post-type/`
- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-5-custom-taxonomies/`
- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-6-custom-ajax-filters/`
- `https://getchisel.co/tutorials/chisel-coffee-shop/chapter-7-final-words/`

Most useful chapters for Chisel projects:

- Chapter 1: theme.json setup and design tokens
- Chapter 3: building a home page with custom ACF blocks
- Chapter 4: custom post type plus custom Timber class mapping
- Chapter 5: custom taxonomies and relationships
- Chapter 6: AJAX filters, helper classes, Twig components, and custom endpoints

## Notes About Coverage

- The public docs cover `create-block` well, but do not document the `npm run add-page` helper in the same depth.
- Chisel projects typically contain default custom extension stubs under `custom/app/WP/`, which shows the exact files Chisel expects you to extend.
- The public docs are a strong conceptual map; this reference translates that map into concrete guidance for Chisel development.

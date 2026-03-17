---
name: xfive-chisel-acf-blocks
description: Create custom ACF block in WordPress themes based on Chisel 2.0 starter theme. Use when an AI agent needs to create a custom ACF block in a project utilising Chisel 2.0 starter theme.
---

# Skill: Creating Custom ACF Blocks in Chisel WordPress Theme

## Overview
This skill provides a deterministic procedure for creating custom ACF (Advanced Custom Fields) blocks in the Chisel WordPress starter theme. ACF blocks in Chisel use Twig templates, SCSS for styling, and JSON for field definitions.

## When to Use This Skill
- Creating reusable custom Gutenberg blocks with ACF fields
- Building dynamic content blocks with editable fields in WordPress
- Implementing design components from Figma as ACF blocks
- Need full control over block markup, styling, and field structure

## Prerequisites
- Chisel WordPress theme installed and configured
- ACF Pro plugin active
- Node.js and npm installed
- Basic understanding of Twig templating, SCSS, and ACF field structure

## File Structure for ACF Blocks
```
src/blocks-acf/
└── {block-name}/
    ├── acf-json/
    │   └── group_{block_key}.json    # ACF field definitions
    ├── block.json                     # Block configuration
    ├── {block-name}.twig              # Template file
	├── script.js                      # JavaScript (optional; also serves as an import handle for styles.scss)
    └── style.scss                     # Block-specific styles (optional)
```

## Step-by-Step Procedure

### 1. Create Block Directory Structure

**Action:** Create the block directory and subdirectories
```bash
mkdir -p src/blocks-acf/{block-name}/acf-json
```

**Important:** Use kebab-case for block names (e.g., `custom-block`, not `CustomHeroBallerina`)

### 2. Create block.json Configuration

**File:** `src/blocks-acf/{block-name}/block.json`

**Required structure (example):**
```json
{
  "name": "chisel/{block-name}",
  "title": "Block Display Name",
  "description": "Block description",
  "category": "chisel-blocks",
  "icon": "cover-image",
  "apiVersion": 3,
  "keywords": ["keyword1", "keyword2"],
  "textdomain": "chisel",
  "acf": {
    "mode": "preview",
    "usePostMeta": false,
    "renderCallback": "\\Chisel\\Helpers\\BlocksHelpers::acf_block_render"
  },
  "supports": {
    "anchor": true,
    "align": ["wide", "full"],
    "alignWide": true,
    "alignContent": true,
    "className": true,
    "customClassName": true,
    "multiple": true,
    "reusable": true
  },
  "script": "file:./script.js",
  "style": ["file:./style-script.css"]
}
```

**Important notice:**
`style.scss` is imported in `script.js` for compilation. The compiled block uses `style-script.css` file into which the styles are compiled.

**Critical fields:**
- `name`: Must follow pattern `chisel/{block-name}` (kebab-case)
- `acf.renderCallback`: Must be exactly `\\Chisel\\Helpers\\BlocksHelpers::acf_block_render`
- `supports.align`: Include `["wide", "full"]` for full-width blocks

### 3. Create ACF Field Definitions

**File:** `src/blocks-acf/{block-name}/acf-json/group_{unique_key}.json`

**Structure (example):**
```json
{
  "key": "group_{unique_identifier}",
  "title": "ACF Block: {Block Display Name}",
  "fields": [
    {
      "key": "field_{unique_field_key}",
      "label": "Field Label",
      "name": "field_name",
      "type": "text|image|repeater|textarea|etc",
      "required": 1,
      "instructions": "Help text for editors",
      "wrapper": {"width": "", "class": "", "id": ""}
    }
  ],
  "location": [
    [
      {
        "param": "block",
        "operator": "==",
        "value": "chisel/{block-name}"
      }
    ]
  ],
  "menu_order": 0,
  "position": "normal",
  "style": "default",
  "label_placement": "top",
  "instruction_placement": "label",
  "active": true,
  "show_in_rest": 0
}
```

**Field types commonly used:**
- `image`: For images (use `return_format: "id"`)
- `text`: For single-line text
- `textarea`: For multi-line text
- `repeater`: For repeating field groups
- `accordion`: For organizing fields in UI

**For repeater fields:**
```json
{
  "type": "repeater",
  "name": "items",
  "sub_fields": [
    {
      "key": "field_sub_item",
      "name": "sub_field_name",
      "type": "text",
      "parent_repeater": "field_parent_key"
    }
  ]
}
```

### 4. Create Twig Template

**File:** `src/blocks-acf/{block-name}/{block-name}.twig`

**Required structure (example):**
```twig
<div {{ wrapper_attributes }} data-block-id="{{ block.id }}">
  <div class="b-{block-name}__inner">
    {% if fields.required_field %}

      {# Block content here #}

    {% else %}
      {% include 'partials/block-edit-button.twig' with {'block_name': 'Block Display Name'} %}
    {% endif %}
  </div>
</div>
```

**Critical requirements:**
- Use `{{ wrapper_attributes }}` on outer div
- Use `data-block-id="{{ block.id }}"` for unique identification
- Class naming: `b-{block-name}__element` (BEM methodology with `b-` prefix)
- Check for required fields before rendering content
- Include edit button fallback for empty blocks

**Accessing ACF fields:**
- Simple field: `{{ fields.field_name }}`
- Image field: `{{ get_responsive_image(fields.image_field, 'large', {fetchpriority: 'high'}) }}`
- Repeater: `{% for item in fields.repeater_name %} ... {% endfor %}`
- Check if not empty: `{% if fields.repeater_name is not empty %}`

**Image handling:**
```twig
{# For responsive images #}
{{ get_responsive_image(fields.image_field, (block.align == 'full' ? 'full' : 'large'), {fetchpriority: 'high'}) }}

{# For image with wrapper #}
<div class="b-{block-name}__image">
  {{ get_responsive_image(fields.image_field, 'full') }}
</div>
```

### 5. Create Block Scripts

**CRITICAL: `style.scss` must be imported in `script.js`, otherwise it will not be compiled!**

**File:** `src/blocks-acf/{block-name}/script.js`

**Structure (example):**
```js
import './style.scss';
```

### 6. Create Block Styles

**CRITICAL: `style.scss` must be imported in `script.js`, otherwise it will not be compiled!**

**File:** `src/blocks-acf/{block-name}/style.scss`

**Structure (example):**
```scss
@use '~design' as *;

.b-{block-name}__inner {
  // Container styles
}

.b-{block-name}__element {
  // Element styles
}
```

**Important styling notes:**
- Use BEM naming with `b-` prefix: `.b-{block-name}__element`
- Use design system functions: `px-rem()`, `get-color()`, `get-gap()`
- For full-width blocks, handle `.alignfull` class
- Use `position: relative; z-index: 2;` for content over background images
- Use `position: absolute; inset: 0;` for full-coverage background images

### 7. Build the Block

**Command:**
```bash
npm run build-scripts
```

**What happens:**
- Scripts and styles compiled
- Block files copied to `build/blocks-acf/{block-name}/`
- Twig template copied
- Block registered in WordPress

**Verify build output:**
- Check `build/blocks-acf/{block-name}/` contains `block.json`, `.twig` file, `script.js` file and `style-script.css` file
- No errors in compilation

### 8. Verify and Test

If user explicitly asked for using Xfive MCP server for fulfilling tasks, then follow MCP-based Verification and Testing Procedure. Otherwise fall back to Manual Verification and Testing Procedure.

#### MCP-based Verification and Testing Procedure
**Use Xfive MCP server:**
1. Add a test page
2. Use proper tools to add block
3. Save page
4. Check if rendered output matches expected result
5. Delete page

#### Manual Verification and Testing Procedure

**Ask user to perform the following tasks in WordPress admin:**
1. Refresh ACF field groups (Settings > Custom Fields)
2. Edit a page/post
3. Add block via block inserter (search for block name)
4. Configure ACF fields
5. Preview/publish to see styled output

#### Common issues:
- **Block not appearing:** Check `block.json` name matches ACF location value
- **Block not rendering:** Check `.twig` name matches the folder name exactly
- **Fields not showing:** Verify ACF JSON `location` matches block name exactly
- **Styles not applied:** Ensure `style.scss` is included in `script.js`

## Complete Example: Hero Block with Image, Navigation, and Text

**Directory structure:**
```
src/blocks-acf/custom-block/
├── acf-json/
│   └── group_custom_block.json
├── block.json
├── script.js
├── style.scss
└── custom-block.twig
```

**block.json:**
```json
{
  "name": "chisel/custom-block",
  "title": "Custom Block",
  "category": "chisel-blocks",
  "icon": "generic",
  "apiVersion": 3,
  "acf": {
    "mode": "preview",
    "usePostMeta": false,
    "renderCallback": "\\Chisel\\Helpers\\BlocksHelpers::acf_block_render"
  },
  "supports": {
    "align": ["wide", "full"]
  },
  "script": "file:./script.js",
  "style": ["file:./style-script.css"]
}
```

**ACF fields (simplified):**
```json
{
  "key": "group_custom_block",
  "fields": [
    {
      "key": "field_bg_image",
      "name": "background_image",
      "type": "image",
      "return_format": "id",
      "required": 1
    },
    {
      "key": "field_nav_items",
      "name": "navigation_items",
      "type": "repeater",
      "sub_fields": [
        {"key": "field_nav_label", "name": "label", "type": "text"},
        {"key": "field_nav_url", "name": "url", "type": "url"}
      ]
    },
    {
      "key": "field_heading",
      "name": "heading",
      "type": "text",
      "required": 1
    }
  ],
  "location": [[{"param": "block", "operator": "==", "value": "chisel/custom-block"}]]
}
```

**Twig template:**
```twig
<div {{ wrapper_attributes }} data-block-id="{{ block.id }}">
  <div class="b-custom-block">
    {% if fields.background_image and fields.heading %}

      <div class="b-custom-block__image">
        {{ get_responsive_image(fields.background_image, 'full', {fetchpriority: 'high'}) }}
      </div>

      {% if fields.navigation_items is not empty %}
        <nav class="b-custom-block__nav">
          {% for item in fields.navigation_items %}
            <a href="{{ item.url }}">{{ item.label }}</a>
          {% endfor %}
        </nav>
      {% endif %}

      <h1 class="b-custom-block__heading">{{ fields.heading }}</h1>

    {% else %}
      {% include 'partials/block-edit-button.twig' with {'block_name': 'Custom Hero'} %}
    {% endif %}
  </div>
</div>
```

**Scripts:**
```js
import './style.scss';
```

**Styles:**
```scss
@use '~design' as *;

.b-custom-block__inner {
  position: relative;
  min-height: 75vh;
  padding: px-rem(20);
}

.b-custom-block__image {
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.b-custom-block__nav {
  position: relative;
  z-index: 2;
}

.b-custom-block__heading {
  position: relative;
  z-index: 2;
  font-size: px-rem(48);
  color: #fff;
}
```

## Troubleshooting Checklist

- [ ] Block name in `block.json` matches ACF location value exactly
- [ ] ACF JSON file has unique `key` values for group and all fields
- [ ] Twig template uses `{{ wrapper_attributes }}` on outer div
- [ ] Styles are included in `script.js`
- [ ] Block uses BEM naming with `b-` prefix
- [ ] `npm run build-scripts` completed without errors

## Key Differences from Standard WordPress Blocks

1. **Twig instead of PHP** - Use Twig templating syntax, not PHP
2. **ACF JSON for fields** - Field definitions in JSON, not PHP code
3. **BEM with b- prefix** - Block classes use `.b-{name}__element` pattern

## Build Commands

- `npm run build-scripts` - Build blocks and compile assets
- `npm run build` - Full build including linting and validation
- `npm run dev` - Development mode with watch

---

**This skill ensures ACF blocks are created correctly the first time, avoiding common pitfalls with styling, field registration, and template structure in the Chisel WordPress theme.**
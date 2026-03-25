# Native WordPress Gutenberg Blocks Usage Examples
Properly groupped native blocks allow implementation of sophisticated designs without the neccesity of developing custom blocks. See the patterns below that illustrate the idea.

### Example Patterns

### Hero Section
Usage of Cover block with a set of inner blocks to implement a hero section design.

```
<!-- wp:cover {"overlayColor":"foreground","isUserOverlayColor":true,"metadata":{"categories":["chisel-patterns/hero"],"patternName":"chisel/hero-01","name":"Hero 01"},"disableBottomMargin":true,"align":"full","className":"u-no-margin-bottom","layout":{"type":"constrained","contentSize":"848px","wideSize":"1072px"}} -->
<div class="wp-block-cover alignfull u-no-margin-bottom"><span aria-hidden="true" class="wp-block-cover__background has-foreground-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:spacer {"height":"auto","className":"is-style-big"} -->
<div style="height:auto" aria-hidden="true" class="wp-block-spacer is-style-big"></div>
<!-- /wp:spacer -->

<!-- wp:spacer {"height":"auto","className":"is-style-large"} -->
<div style="height:auto" aria-hidden="true" class="wp-block-spacer is-style-large"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"center","level":1} -->
<h1 class="wp-block-heading has-text-align-center">A modern development framework for WordPress</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","placeholder":"Write title…","fontSize":"large"} -->
<p class="has-text-align-center has-large-font-size">Craft <strong>fast</strong> and <strong>easy to maintain</strong> WordPress websites. Use the <strong>power</strong> and <strong>simplicity</strong> of Timber and Twig. Make your CSS <strong>scalable</strong> and <strong>maintainable</strong> with ITCSS. Get rid of tedious manual tasks with Chisel's <strong>modern development workflow</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"auto","className":"is-style-large"} -->
<div style="height:auto" aria-hidden="true" class="wp-block-spacer is-style-large"></div>
<!-- /wp:spacer -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-primary has-icon has-icon-arrow-right","buttonIcon":"arrow-right"} -->
<div class="wp-block-button is-style-primary has-icon has-icon-arrow-right"><a class="wp-block-button__link wp-element-button" href="#">Get started</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"-right is-style-primary-outline"} -->
<div class="wp-block-button -right is-style-primary-outline"><a class="wp-block-button__link wp-element-button">Learn more</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->

<!-- wp:spacer {"height":"auto","className":"is-style-big"} -->
<div style="height:auto" aria-hidden="true" class="wp-block-spacer is-style-big"></div>
<!-- /wp:spacer --></div></div>
<!-- /wp:cover -->
```

### Featured Sections
Usage of Group blocks with attributes to implement featured sections design with images on the left or on the right.

```
<!-- wp:group {"metadata":{"name":"Feature with image on the left"},"disableBottomMargin":true,"align":"full","className":"u-no-margin-bottom","style":{"spacing":{"padding":{"top":"var:preset|spacing|100","bottom":"var:preset|spacing|100","right":"var:preset|spacing|100"}}},"backgroundColor":"primary","layout":{"type":"default"}} -->
<div class="wp-block-group alignfull u-no-margin-bottom has-primary-background-color has-background" style="padding-top:var(--wp--preset--spacing--100);padding-right:var(--wp--preset--spacing--100);padding-bottom:var(--wp--preset--spacing--100)"><!-- wp:media-text {"mediaId":217,"mediaLink":"http://chisel-sandbox.test/product-potty/","mediaType":"image","mediaSizeSlug":"large","disableBottomMargin":true,"className":"u-no-margin-bottom"} -->
<div class="wp-block-media-text is-stacked-on-mobile u-no-margin-bottom"><figure class="wp-block-media-text__media"><img src="http://chisel-sandbox.test/wp-content/uploads/2026/03/product-potty-1024x768.jpg" alt="" class="wp-image-217 size-large"/></figure><div class="wp-block-media-text__content"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Feature 1</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Feature description</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:media-text --></div>
<!-- /wp:group -->
```
```
<!-- wp:group {"metadata":{"name":"Feature with image on the left"},"align":"full","className":"","style":{"spacing":{"padding":{"top":"var:preset|spacing|100","bottom":"var:preset|spacing|100","left":"var:preset|spacing|100"}}},"backgroundColor":"gray-5","layout":{"type":"default"}} -->
<div class="wp-block-group alignfull has-gray-5-background-color has-background" style="padding-top:var(--wp--preset--spacing--100);padding-bottom:var(--wp--preset--spacing--100);padding-left:var(--wp--preset--spacing--100)"><!-- wp:media-text {"mediaPosition":"right","mediaId":216,"mediaLink":"http://chisel-sandbox.test/product-pingky/","mediaType":"image","mediaSizeSlug":"large","disableBottomMargin":true,"className":"u-no-margin-bottom"} -->
<div class="wp-block-media-text has-media-on-the-right is-stacked-on-mobile u-no-margin-bottom"><div class="wp-block-media-text__content"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Feature 1</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Feature description</p>
<!-- /wp:paragraph --></div><figure class="wp-block-media-text__media"><img src="http://chisel-sandbox.test/wp-content/uploads/2026/03/product-pingky-1024x684.jpg" alt="" class="wp-image-216 size-large"/></figure></div>
<!-- /wp:media-text --></div>
<!-- /wp:group -->
```

### Images Sections
Usage of Group block with Row template to implement images section.

Images with headings below:
```
<!-- wp:group {"metadata":{"name":"Images in a row with heading below"},"layout":{"type":"default"}} -->
<div class="wp-block-group"><!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:image {"id":222,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="http://chisel-sandbox.test/wp-content/uploads/2026/03/rooms-slide3-682x1024.png" alt="" class="wp-image-222"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"textAlign":"center","level":4} -->
<h4 class="wp-block-heading has-text-align-center">Image 1</h4>
<!-- /wp:heading --></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"default"}} -->
<div class="wp-block-group"><!-- wp:image {"id":221,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="http://chisel-sandbox.test/wp-content/uploads/2026/03/rooms-slide2-693x1024.png" alt="" class="wp-image-221"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"textAlign":"center","level":4} -->
<h4 class="wp-block-heading has-text-align-center">Image 2</h4>
<!-- /wp:heading --></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"default"}} -->
<div class="wp-block-group"><!-- wp:image {"id":220,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="http://chisel-sandbox.test/wp-content/uploads/2026/03/rooms-slide1-682x1024.png" alt="" class="wp-image-220"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"textAlign":"center","level":4} -->
<h4 class="wp-block-heading has-text-align-center">Image 3</h4>
<!-- /wp:heading --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:separator {"className":"is-style-wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|100","bottom":"var:preset|spacing|100"}}},"backgroundColor":"primary"} -->
<hr class="wp-block-separator has-text-color has-primary-color has-alpha-channel-opacity has-primary-background-color has-background is-style-wide" style="margin-top:var(--wp--preset--spacing--100);margin-bottom:var(--wp--preset--spacing--100)"/>
<!-- /wp:separator --></div>
<!-- /wp:group -->
```

Images with captions on the overlay:
```
<!-- wp:group {"metadata":{"name":"Images in a row with heading on image"},"layout":{"type":"default"}} -->
<div class="wp-block-group"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"33.34%"} -->
<div class="wp-block-column" style="flex-basis:33.34%"><!-- wp:cover {"url":"http://chisel-sandbox.test/wp-content/uploads/2026/03/rooms-slide3-682x1024.png","id":222,"dimRatio":50,"minHeight":550,"layout":{"type":"default"}} -->
<div class="wp-block-cover" style="min-height:550px"><img class="wp-block-cover__image-background wp-image-222" alt="" src="http://chisel-sandbox.test/wp-content/uploads/2026/03/rooms-slide3-682x1024.png" data-object-fit="cover"/><span aria-hidden="true" class="wp-block-cover__background has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:paragraph {"align":"center","fontSize":"large"} -->
<p class="has-text-align-center has-large-font-size">Image 1</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:cover --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"33.34%"} -->
<div class="wp-block-column" style="flex-basis:33.34%"><!-- wp:cover {"url":"http://chisel-sandbox.test/wp-content/uploads/2026/03/rooms-slide2-693x1024.png","id":221,"dimRatio":50,"minHeight":550} -->
<div class="wp-block-cover" style="min-height:550px"><img class="wp-block-cover__image-background wp-image-221" alt="" src="http://chisel-sandbox.test/wp-content/uploads/2026/03/rooms-slide2-693x1024.png" data-object-fit="cover"/><span aria-hidden="true" class="wp-block-cover__background has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:paragraph {"align":"center","placeholder":"Write title…","fontSize":"large"} -->
<p class="has-text-align-center has-large-font-size">Image 2</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:cover --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:cover {"url":"http://chisel-sandbox.test/wp-content/uploads/2026/03/rooms-slide1-682x1024.png","id":220,"dimRatio":50,"minHeight":550} -->
<div class="wp-block-cover" style="min-height:550px"><img class="wp-block-cover__image-background wp-image-220" alt="" src="http://chisel-sandbox.test/wp-content/uploads/2026/03/rooms-slide1-682x1024.png" data-object-fit="cover"/><span aria-hidden="true" class="wp-block-cover__background has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:paragraph {"align":"center","fontSize":"large"} -->
<p class="has-text-align-center has-large-font-size">Image 3</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:cover --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:separator {"className":"is-style-wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|100","bottom":"var:preset|spacing|100"}}},"backgroundColor":"primary"} -->
<hr class="wp-block-separator has-text-color has-primary-color has-alpha-channel-opacity has-primary-background-color has-background is-style-wide" style="margin-top:var(--wp--preset--spacing--100);margin-bottom:var(--wp--preset--spacing--100)"/>
<!-- /wp:separator --></div>
<!-- /wp:group -->
```

### Section With Dynamic Content
Usage of Group block with Stack template and nested Query Loop block to implement a design with dynamic content like blog.

```
<!-- wp:group {"metadata":{"name":"Section with dynamic content"},"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|100","bottom":"var:preset|spacing|100"}}},"backgroundColor":"light-bg","layout":{"type":"flex","orientation":"vertical","justifyContent":"center","flexWrap":"wrap"}} -->
<div class="wp-block-group alignfull has-light-bg-background-color has-background" style="padding-top:var(--wp--preset--spacing--100);padding-bottom:var(--wp--preset--spacing--100)"><!-- wp:heading {"textAlign":"left"} -->
<h2 class="wp-block-heading has-text-align-left">Blog</h2>
<!-- /wp:heading -->

<!-- wp:query {"queryId":3,"query":{"perPage":3,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"taxQuery":null,"parents":[],"format":[]}} -->
<div class="wp-block-query"><!-- wp:post-template {"layout":{"type":"grid","columnCount":3,"minimumColumnWidth":null}} -->
<!-- wp:post-featured-image /-->

<!-- wp:post-date {"metadata":{"bindings":{"datetime":{"source":"core/post-data","args":{"field":"date"}}}}} /-->

<!-- wp:post-title /-->
<!-- /wp:post-template -->

<!-- wp:query-pagination -->
<!-- wp:query-pagination-previous /-->

<!-- wp:query-pagination-numbers /-->

<!-- wp:query-pagination-next /-->
<!-- /wp:query-pagination -->

<!-- wp:query-no-results -->
<!-- wp:paragraph {"placeholder":"Add text or blocks that will display when a query returns no results."} -->
<p></p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results --></div>
<!-- /wp:query --></div>
<!-- /wp:group -->
```

## `theme.json` Setup
**Important:**
Some settings of blocks (like spacings for example) may be unavailable in a given WordPress implementation because of `theme.json` settinigs. To enable them you need to edit `theme.json`.
# NanJu Intelligence — NJ monogram

Approved direction: **A / Interwoven NJ**, selected by the owner on 2026-11-22. This directory is the reusable brand source for the current portfolio and future Version 2. It is committed to Git independently of either website's layout.

The N and J share an upright and a diagonal. The return of the J adds a curved base to the geometric letterform. The production drawing refines the approved study with thicker stems, balanced margins and a centered silhouette.

## Assets

| File | Use |
|---|---|
| [mark.svg](mark.svg) | Primary dark green mark on a light background; transparent canvas |
| [mark-reversed.svg](mark-reversed.svg) | Warm white mark on a dark background; transparent canvas |
| [favicon.svg](favicon.svg) | Warm white mark on a dark green rounded tile; suitable for browser tabs |
| [preview.html](preview.html) | Standalone, offline reference showing color variants, actual sizes and name lockups |

All three SVGs contain the same outlined path. No fonts, JavaScript, images or network requests are required. The master canvas is 64 × 64. The glyph fits within x=10…54 and y=8…56, leaving built-in clear space. Colors are dark green `#203c35` and warm white `#f7f5ef`.

Use the supplied square canvas without stretching, rotating or cropping. Use the primary/reversed symbol at 28px or larger in navigation, and the tile variant at 16px or 32px for favicons. Larger uses scale directly from the vectors. Keep the mark subordinate to the displayed name NanJu Wu; NanJu Intelligence is the supporting brand.

## Reuse in Version 2

Copy the appropriate SVGs into Version 2's asset directory. Use `mark.svg` for a light header or `mark-reversed.svg` for a dark header, and use `favicon.svg` for the browser icon. Keep the path geometry unchanged; palette changes can be made through the path's `fill` if the Version 2 design requires them. The logo does not require a particular layout or frontend framework.

Example markup, with paths adjusted to the destination:

```html
<a href="#home" aria-label="NanJu Wu, back to top">
  <img src="./assets/brand/mark.svg" width="38" height="38" alt="">
  <span>NanJu Wu</span>
</a>
<link rel="icon" type="image/svg+xml" href="./assets/brand/favicon.svg">
```

In Version 1, the master `mark.svg` is copied to `site/assets/v1/mark.svg`, and the master `favicon.svg` to `site/assets/v1/favicon.svg`. The header references a versioned URL to refresh previously cached copies of the old mark. When changing a master asset, update its deployed copy as well.

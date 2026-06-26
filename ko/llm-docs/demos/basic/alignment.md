# Alignment

The [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align) option controls the alignment position of panels within the viewport. It determines whether panels are positioned at the left, center, or right.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align) | `"prev" \| "center" \| "next" \| number \| string` | `"center"` | Panel alignment position |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `"prev"` | Current panel aligns to the left (or top in vertical) of the viewport | Galleries, list-style UI |
| `"center"` | Current panel aligns to the center of the viewport | Spotlight, product showcase |
| `"next"` | Current panel aligns to the right (or bottom in vertical) of the viewport | RTL interfaces, special layouts |
| Number/String | Aligns to a specified position (`0.25`, `"100px"`, `"50% - 25px"`) | Precise custom positioning |

## Details

### "prev" in Detail
The start point (left or top) of the panel aligns to the start point of the viewport. This creates a natural flow as if flipping through a list. Most intuitive in LTR (left-to-right) interfaces.

### "center" in Detail
The center of the panel aligns to the center of the viewport. This draws visual focus to the current panel and can create an effect where previous/next panels are slightly visible on either side.

### "next" in Detail
The end point (right or bottom) of the panel aligns to the end point of the viewport. Used for RTL (right-to-left) language interfaces or special design requirements.

### Number/String Values in Detail
- `0` to `1` number: Ratio of viewport width (0=left, 0.5=center, 1=right)
- `"100px"`: 100px from the left of the viewport
- `"50% - 25px"`: Expression calculation supported

### Related Options
- **Relationship with panelsPerView**: When `panelsPerView` is set, the alignment reference point becomes the center of the visible panel group rather than individual panels
- **Relationship with circular**: The combination of `circular: true` and `align: "center"` is the most common carousel pattern

### Use Cases

> **Info: When to use?**
- **"prev"**: Image galleries, article lists, thumbnail navigation
- **"center"**: Product details, hero sliders, card carousels
- **"next"**: Arabic/Hebrew UI, reverse timelines

### Notes

> **Warning: Caution**
- When using `panelsPerView`, the alignment behavior changes. Alignment is based on panel groups, not individual panels.
- If the panel size is larger than the viewport, it may not appear as expected.

## Related Links

### Related Options
- [`panelsPerView`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview): Number of panels per screen (affects alignment calculation)
- [`circular`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular): Circular mode

### Related Demos
- [Circular](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/circular.md): Circular mode with alignment combination
- [Panels Per View](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/panels-per-view.md): Multi-panel display with alignment

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* align: "prev" - panels aligned to the left */}
      <div className="demo-container">
        <div className="demo-label">align: "prev"</div>
        <Flicking align="prev">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* align: "center" - panels aligned to the center */}
      <div className="demo-container">
        <div className="demo-label">align: "center"</div>
        <Flicking align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* align: "next" - panels aligned to the right */}
      <div className="demo-container">
        <div className="demo-label">align: "next"</div>
        <Flicking align="next">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <!-- align: "prev" - panels aligned to the left -->
    <div class="demo-container">
      <div class="demo-label">align: "prev"</div>
      <Flicking :options="{ align: 'prev' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- align: "center" - panels aligned to the center -->
    <div class="demo-container">
      <div class="demo-label">align: "center"</div>
      <Flicking :options="{ align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- align: "next" - panels aligned to the right -->
    <div class="demo-container">
      <div class="demo-label">align: "next"</div>
      <Flicking :options="{ align: 'next' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// align: "prev"
new Flicking("#flick-prev", { align: "prev" });

// align: "center"
new Flicking("#flick-center", { align: "center" });

// align: "next"
new Flicking("#flick-next", { align: "next" });
```

### HTML (for vanilla JS)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <!-- align: "prev" -->
  <div class="demo-container">
    <div class="demo-label">align: "prev"</div>
    <div id="flick-prev" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- align: "center" -->
  <div class="demo-container">
    <div class="demo-label">align: "center"</div>
    <div id="flick-center" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- align: "next" -->
  <div class="demo-container">
    <div class="demo-label">align: "next"</div>
    <div id="flick-next" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 40%;
  height: 120px;
}
```

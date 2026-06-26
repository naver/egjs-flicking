# Panels Per View

The [`panelsPerView`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview) option specifies the number of panels to simultaneously display in the viewport. When a positive value is set, panel sizes are automatically adjusted.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`panelsPerView`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview) | `number` | `-1` | Number of panels to display in viewport (-1: no auto-calculation) |
| [`noPanelStyleOverride`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nopanelstyleoverride) | `boolean` | `false` | Disable automatic panel size adjustment |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `-1` | Does not change panel size. Must be set manually via CSS | Panels of varying sizes, custom layouts |
| `1` | Panel fills the entire viewport | Fullscreen sliders, hero banners |
| `3` | Resizes so exactly 3 panels are visible | Product cards, thumbnail galleries |
| `n` | Resizes so exactly n panels are visible | Responsive grid carousels |

## Details

### panelsPerView: -1 in Detail
This is the default. Panel sizes are not changed, and you must specify panel sizes directly in CSS. Use when mixing panels of various sizes or when a custom layout is needed.

```css
/* Required when panelsPerView: -1 */
.flicking-panel {
  width: 150px; /* Manual specification */
}
```

### panelsPerView: Positive Value in Detail
Panel sizes are automatically adjusted so the specified number of panels are visible in the viewport. There is no need to specify panel width in CSS.

```javascript
// Display exactly 3 panels in the viewport
new Flicking("#el", { panelsPerView: 3 });
```

### noPanelStyleOverride in Detail
Prevents width/height style modification of panels when `panelsPerView` is active. Used for performance optimization when managing all panel sizes manually.

### Related Options
- **Relationship with align**: When used with panelsPerView, `align: "prev"` is common. Left alignment shows panels sequentially.
- **Relationship with virtual**: The `virtual` option requires `panelsPerView > 0`. If -1, virtual is ignored.
- **Relationship with circular**: The panelsPerView setting can affect the circular activation condition (total panel size >= viewport).

### Use Cases

> **Info: When to use?**
- **panelsPerView: -1**: Cards of varying sizes, tag lists, custom layouts
- **panelsPerView: 1**: Hero banners, fullscreen onboarding, image viewers
- **panelsPerView: 3-5**: Product carousels, thumbnail galleries, team member introductions

### Notes

> **Warning: CSS conflict caution**
When setting a positive value for `panelsPerView`, Flicking automatically calculates the panel width. Specifying width separately in CSS may cause conflicts.

> **Warning: Required for virtual**
To use the `virtual` option, you must set `panelsPerView > 0`. Virtual does not work with -1.

## Related Links

### Related Options
- [`noPanelStyleOverride`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nopanelstyleoverride): Prevent automatic panel style modification
- [`virtual`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#virtual): Virtual scrolling (requires panelsPerView)
- [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align): Panel alignment method

### Related Demos
- [Virtual Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/virtual-scroll.md): Large panel optimization (requires panelsPerView)
- [Alignment](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/alignment.md): Alignment options

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* panelsPerView: -1 (default, manual sizing) */}
      <div className="demo-container">
        <div className="demo-label">panelsPerView: -1 (default, manual panel sizing)</div>
        <Flicking className="manual-size" panelsPerView={-1} align="prev">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* panelsPerView: 3 */}
      <div className="demo-container">
        <div className="demo-label">panelsPerView: 3 (auto-sized to show 3 panels)</div>
        <Flicking panelsPerView={3} align="prev">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* panelsPerView: 1 */}
      <div className="demo-container">
        <div className="demo-label">panelsPerView: 1 (fullscreen slider)</div>
        <Flicking panelsPerView={1} align="center">
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
    <!-- panelsPerView: -1 (default, manual sizing) -->
    <div class="demo-container">
      <div class="demo-label">panelsPerView: -1 (default, manual panel sizing)</div>
      <Flicking class="manual-size" :options="{ panelsPerView: -1, align: 'prev' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- panelsPerView: 3 -->
    <div class="demo-container">
      <div class="demo-label">panelsPerView: 3 (auto-sized to show 3 panels)</div>
      <Flicking :options="{ panelsPerView: 3, align: 'prev' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- panelsPerView: 1 -->
    <div class="demo-container">
      <div class="demo-label">panelsPerView: 1 (fullscreen slider)</div>
      <Flicking :options="{ panelsPerView: 1, align: 'center' }">
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

// panelsPerView: -1 (default)
new Flicking("#flick-manual", {
  panelsPerView: -1,
  align: "prev"
});

// panelsPerView: 3
new Flicking("#flick-three", {
  panelsPerView: 3,
  align: "prev"
});

// panelsPerView: 1
new Flicking("#flick-one", {
  panelsPerView: 1,
  align: "center"
});
```

### HTML (for vanilla JS)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <!-- panelsPerView: -1 (default) -->
  <div class="demo-container">
    <div class="demo-label">panelsPerView: -1 (default, manual panel sizing)</div>
    <div id="flick-manual" class="flicking-viewport manual-size">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- panelsPerView: 3 -->
  <div class="demo-container">
    <div class="demo-label">panelsPerView: 3 (auto-sized to show 3 panels)</div>
    <div id="flick-three" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- panelsPerView: 1 -->
  <div class="demo-container">
    <div class="demo-label">panelsPerView: 1 (fullscreen slider)</div>
    <div id="flick-one" class="flicking-viewport">
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
  height: 120px;
  margin-right: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}
/* panelsPerView: -1, manual panel sizing */
.manual-size .flicking-panel {
  width: 150px;
}
```

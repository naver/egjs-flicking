# Adaptive

The [`adaptive`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#adaptive) option automatically adjusts the viewport height to match the active panel's height after a panel transition. This is useful for carousels with content of varying heights.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`adaptive`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#adaptive) | `boolean` | `false` | Automatically adjust viewport height to match the active panel |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `false` | Viewport height stays fixed (default) | Panels with the same height, fixed layouts |
| `true` | Viewport height adjusts to match the active panel | Cards with varying heights, variable content |

## Details

### How Adaptive Works
When `adaptive: true`, the viewport height is updated to match the current active panel's height each time a panel transition occurs.

```css
/* CSS for smooth height transitions */
.flicking-viewport {
  transition: height 0.3s;
}
```

### Related Options
- **Relationship with horizontal**: `adaptive` only works with `horizontal: true` (horizontal mode). It has no effect in vertical mode.

### Use Cases

> **Info: When to use?**
- **adaptive: false**: Image galleries, cards of the same size
- **adaptive: true**: Text cards of varying lengths, product descriptions, FAQ accordion style

### Notes

> **Warning: Horizontal mode only**
`adaptive` only works when `horizontal: true`. It has no effect when `horizontal: false` (vertical mode).

> **Warning: Layout shift**
If heights vary significantly, layout shift may occur as content below gets pushed. It is recommended to handle this smoothly with CSS transitions or set a minimum height.

## Related Links

### Related Options
- [`horizontal`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal): Horizontal/vertical direction (adaptive is horizontal only)

### Related Demos
- [Vertical](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/vertical.md): Vertical mode (adaptive not supported)

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* adaptive: false (default) */}
      <div className="demo-container">
        <div className="demo-label">adaptive: false (default, fixed height)</div>
        <Flicking adaptive={false} align="center">
          <div className="flicking-panel panel-1">Height 80px</div>
          <div className="flicking-panel panel-2">Height 150px</div>
          <div className="flicking-panel panel-3">Height 100px</div>
          <div className="flicking-panel panel-4">Height 200px</div>
          <div className="flicking-panel panel-5">Height 120px</div>
        </Flicking>
      </div>

      {/* adaptive: true */}
      <div className="demo-container">
        <div className="demo-label">adaptive: true (viewport adjusts to panel height)</div>
        <Flicking adaptive={true} align="center">
          <div className="flicking-panel panel-1">Height 80px</div>
          <div className="flicking-panel panel-2">Height 150px</div>
          <div className="flicking-panel panel-3">Height 100px</div>
          <div className="flicking-panel panel-4">Height 200px</div>
          <div className="flicking-panel panel-5">Height 120px</div>
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
    <!-- adaptive: false (default) -->
    <div class="demo-container">
      <div class="demo-label">adaptive: false (default, fixed height)</div>
      <Flicking :options="{ adaptive: false, align: 'center' }">
        <div class="flicking-panel panel-1">Height 80px</div>
        <div class="flicking-panel panel-2">Height 150px</div>
        <div class="flicking-panel panel-3">Height 100px</div>
        <div class="flicking-panel panel-4">Height 200px</div>
        <div class="flicking-panel panel-5">Height 120px</div>
      </Flicking>
    </div>

    <!-- adaptive: true -->
    <div class="demo-container">
      <div class="demo-label">adaptive: true (viewport adjusts to panel height)</div>
      <Flicking :options="{ adaptive: true, align: 'center' }">
        <div class="flicking-panel panel-1">Height 80px</div>
        <div class="flicking-panel panel-2">Height 150px</div>
        <div class="flicking-panel panel-3">Height 100px</div>
        <div class="flicking-panel panel-4">Height 200px</div>
        <div class="flicking-panel panel-5">Height 120px</div>
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

// adaptive: false (default)
new Flicking("#flick-fixed", {
  adaptive: false,
  align: "center"
});

// adaptive: true
new Flicking("#flick-adaptive", {
  adaptive: true,
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
  <!-- adaptive: false (default) -->
  <div class="demo-container">
    <div class="demo-label">adaptive: false (default, fixed height)</div>
    <div id="flick-fixed" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">Height 80px</div>
        <div class="flicking-panel panel-2">Height 150px</div>
        <div class="flicking-panel panel-3">Height 100px</div>
        <div class="flicking-panel panel-4">Height 200px</div>
        <div class="flicking-panel panel-5">Height 120px</div>
      </div>
    </div>
  </div>

  <!-- adaptive: true -->
  <div class="demo-container">
    <div class="demo-label">adaptive: true (viewport adjusts to panel height)</div>
    <div id="flick-adaptive" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">Height 80px</div>
        <div class="flicking-panel panel-2">Height 150px</div>
        <div class="flicking-panel panel-3">Height 100px</div>
        <div class="flicking-panel panel-4">Height 200px</div>
        <div class="flicking-panel panel-5">Height 120px</div>
      </div>
    </div>
  </div>

</body>
</html>
```

### CSS
```css
.flicking-viewport {
  border: 2px solid #ddd;
  transition: height 0.3s;
}
.flicking-panel {
  width: 80%;
}
/* each panel has a different height */
.panel-1 {
  background: #3e8ed0;
  height: 80px;
}
.panel-2 {
  background: #00d1b2;
  height: 150px;
}
.panel-3 {
  background: #f14668;
  height: 100px;
}
.panel-4 {
  background: #ffe08a;
  color: #333;
  height: 200px;
}
.panel-5 {
  background: #48c78e;
  height: 120px;
}
```

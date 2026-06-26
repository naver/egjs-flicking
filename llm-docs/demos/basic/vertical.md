# Vertical

The [`horizontal`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal) option sets the direction of panel movement. When `true`, panels move horizontally (left/right); when `false`, panels move vertically (up/down).



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`horizontal`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal) | `boolean` | `true` | Panel movement direction (`true`: horizontal, `false`: vertical) |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `true` | Drag left/right to move panels | General carousels, image galleries, banner sliders |
| `false` | Drag up/down to move panels | Vertical card stacks, story viewers, vertical onboarding |

## Details

### horizontal: true in Detail
This is the default. Panels are arranged horizontally, and users move panels by dragging left/right. Used in most carousel UIs.

### horizontal: false in Detail
Panels are arranged vertically, and users move panels by dragging up/down. Suitable for vertical scroll UIs or fullscreen story viewers.

**Important**: In vertical mode, a **fixed height** must be set on the viewport. Without a height, panels will not be visible.

```css
.flicking-viewport {
  height: 300px; /* Required in vertical mode */
}
```

**Vanilla JS only**: You must manually add the `vertical` class to the viewport element. React and Vue wrappers add this class automatically.

```html
<!-- Vanilla JS: "vertical" class is required -->
<div id="my-flicking" class="flicking-viewport vertical">
  <div class="flicking-camera">
    <div class="panel">1
    <div class="panel">2
  

```

This class changes the camera's `flex-direction` to `column`, enabling vertical panel layout.

### Related Options
- **Relationship with adaptive**: The `adaptive` option only works when `horizontal: true`. It has no effect in vertical mode.
- **Relationship with nested**: If parent and child Flicking have different horizontal values, it works naturally without the `nested` option.
- **Relationship with inputType**: The default inputType `["mouse", "touch"]` supports both horizontal and vertical.

### Use Cases

> **Info: When to use?**
- **horizontal: true**: Image galleries, product sliders, banners, tab-style UI
- **horizontal: false**: TikTok/Instagram Stories style, vertical card stacks, fullscreen onboarding

### Notes

> **Warning: Viewport height required in vertical mode**
When setting `horizontal: false`, panels will not be displayed if a fixed height is not set on the viewport. Make sure to set a `height` value in CSS.

> **Warning: Scroll conflict on touch devices**
In vertical mode, up/down dragging may conflict with page scrolling. If necessary, review the `preventDefaultOnDrag` option or CSS `touch-action` settings.

## Related Links

### Related Options
- [`adaptive`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#adaptive): Adjust viewport to panel height (horizontal: true only)
- [`nested`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nested): Nested Flicking behavior
- [`inputType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#inputtype): Input type settings

### Related Demos
- [Nested](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/nested.md): Nested Flicking (nested not needed for different directions)
- [Adaptive](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/adaptive.md): Panel height adaptation

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];

export default function App() {
  return (
    <div>
      <div className="demo-container">
        <div className="demo-label">horizontal: true (default)</div>
        <Flicking horizontal={true} align="prev" bound={true}>
          {COLORS.map((color, i) => (
            <div key={i} className="flicking-panel" style={{ background: color }}>
              {i + 1}
            </div>
          ))}
        </Flicking>
      </div>

      <div className="demo-container">
        <div className="demo-label">horizontal: false (vertical)</div>
        <Flicking horizontal={false} align="prev" bound={true}>
          {COLORS.map((color, i) => (
            <div key={i} className="flicking-panel" style={{ background: color }}>
              {i + 1}
            </div>
          ))}
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
    <div class="demo-container">
      <div class="demo-label">horizontal: true (default)</div>
      <Flicking :options="{ horizontal: true, align: 'prev', bound: true }">
        <div
          v-for="(color, i) in colors"
          :key="'h-' + i"
          class="flicking-panel"
          :style="{ background: color }"
        >
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>

    <div class="demo-container">
      <div class="demo-label">horizontal: false (vertical)</div>
      <Flicking :options="{ horizontal: false, align: 'prev', bound: true }">
        <div
          v-for="(color, i) in colors"
          :key="'v-' + i"
          class="flicking-panel"
          :style="{ background: color }"
        >
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const colors = ref(["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"]);
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// horizontal: true (default)
new Flicking("#flick-horizontal", {
  horizontal: true,
  align: "prev",
  bound: true
});

// horizontal: false (vertical)
// In vanilla JS, you must add the "vertical" class
// to the flicking-viewport element manually.
// React and Vue wrappers add it automatically.
new Flicking("#flick-vertical", {
  horizontal: false,
  align: "prev",
  bound: true
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
  <div class="demo-container">
    <div class="demo-label">horizontal: true (default)</div>
    <div id="flick-horizontal" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel" style="background: #e74c3c">1</div>
        <div class="flicking-panel" style="background: #3498db">2</div>
        <div class="flicking-panel" style="background: #2ecc71">3</div>
        <div class="flicking-panel" style="background: #f39c12">4</div>
        <div class="flicking-panel" style="background: #9b59b6">5</div>
      </div>
    </div>
  </div>

  <div class="demo-container">
    <div class="demo-label">horizontal: false (vertical)</div>
    <!-- Vanilla JS requires the "vertical" class manually -->
    <div id="flick-vertical" class="flicking-viewport vertical">
      <div class="flicking-camera">
        <div class="flicking-panel" style="background: #e74c3c">1</div>
        <div class="flicking-panel" style="background: #3498db">2</div>
        <div class="flicking-panel" style="background: #2ecc71">3</div>
        <div class="flicking-panel" style="background: #f39c12">4</div>
        <div class="flicking-panel" style="background: #9b59b6">5</div>
      </div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-viewport {
  height: 200px;
}

.flicking-panel {
  width: 100%;
  height: 100%;
  margin-right: 0;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.demo-container {
  margin-bottom: 24px;
}

.demo-label {
  font-weight: bold;
  margin-bottom: 8px;
}
```

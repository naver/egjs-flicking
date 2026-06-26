# Pagination

Adds page indicators to show the current panel position. Supports three types: bullet, fraction, and scroll.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `"bullet" \| "fraction" \| "scroll"` | `"bullet"` | Indicator display style |
| `parentEl` | `HTMLElement` | - | Parent element for the indicator. By default, uses the `.flicking-pagination` element |

### Required CSS

```js
import "@egjs/flicking-plugins/dist/pagination.css";
```

## Details

### Behavior by Type

| Type | Description |
|------|-------------|
| `bullet` | Displays dots corresponding to each panel. Click to move to that panel |
| `fraction` | Displays numbers in `current/total` format (e.g., `1/5`) |
| `scroll` | Displays a scrollbar-style indicator |

### HTML Structure

The pagination element must be placed inside the viewport.

```html
<div class="flicking-viewport">
  <div class="flicking-camera">
    <!-- Panels -->
  
  <div class="flicking-pagination">

```

### Framework-specific Usage

**React** — Use `ViewportSlot`:
```jsx
<Flicking plugins={plugins}>
  {/* Panels */}
  <ViewportSlot>
    
  </ViewportSlot>
</Flicking>
```

**Vue** — Use the `#viewport` slot:
```html
<Flicking :plugins="plugins">
  <!-- Panels -->
  <template #viewport>
    <div class="flicking-pagination">
  </template>
</Flicking>
```

### Notes

> **Warning: Caution**
- You must import `@egjs/flicking-plugins/dist/pagination.css` for the indicator to display correctly.
- With the `bullet` type, having too many panels can result in too many dots. In that case, consider using the `fraction` or `scroll` type.

## Related Links

### Related Demos
- [Arrow](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/arrow.md): Arrow navigation
- [Pagination (Reactive API)](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/pagination.md): Custom pagination based on Reactive API

## Code

### React
```jsx
import { Pagination } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const plugins = [new Pagination({ type: "bullet" })];

export default function App() {
  return (
    <Flicking circular={true} plugins={plugins}>
      {COLORS.map((color, i) => (
        <div className="flicking-panel" key={i} style={{ background: color }}>
          {i + 1}
        </div>
      ))}
      <ViewportSlot>
        <div className="flicking-pagination"></div>
      </ViewportSlot>
    </Flicking>
  );
}
```

### Vue3
```vue
<template>
  <Flicking :options="{ circular: true }" :plugins="plugins">
    <div v-for="(color, i) in COLORS" :key="i"
         class="flicking-panel"
         :style="{ background: color }">
      {{ i + 1 }}
    </div>
    <template #viewport>
      <div class="flicking-pagination"></div>
    </template>
  </Flicking>
</template>

<script setup>
import { Pagination } from "@egjs/flicking-plugins";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/pagination.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const plugins = [new Pagination({ type: "bullet" })];
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];

const camera = document.querySelector(".flicking-camera");
COLORS.forEach((color, i) => {
  const panel = document.createElement("div");
  panel.className = "flicking-panel";
  panel.style.background = color;
  panel.textContent = i + 1;
  camera.appendChild(panel);
});

const flicking = new Flicking("#flick", {
  circular: true
});

flicking.addPlugins(new Pagination({ type: "bullet" }));
```

### HTML (for vanilla JS)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div id="app">
    <div id="flick" class="flicking-viewport">
      <div class="flicking-camera"></div>
      <div class="flicking-pagination"></div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 50%;
  height: 200px;
  margin: 0 5px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.flicking-viewport {
  padding-bottom: 40px;
}
```

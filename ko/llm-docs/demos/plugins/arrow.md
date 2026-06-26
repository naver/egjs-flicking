# Arrow

Adds arrow navigation buttons to move to the previous/next panel.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `parentEl` | `HTMLElement` | - | Parent element for the arrow buttons. By default, placed inside the viewport |

### Required CSS

```js
import "@egjs/flicking-plugins/dist/arrow.css";
```

## Details

### How It Works

The Arrow plugin finds elements with the `.flicking-arrow-prev` and `.flicking-arrow-next` classes and binds click events to move to the previous/next panel.

### HTML Structure

Arrow elements must be placed inside the viewport.

```html
<div class="flicking-viewport">
  <div class="flicking-camera">
    <!-- Panels -->
  
  <span class="flicking-arrow-prev"></span>
  <span class="flicking-arrow-next"></span>

```

### Framework-specific Usage

**React** — Use `ViewportSlot` to place arrows inside the viewport:
```jsx
<Flicking plugins={plugins}>
  {/* Panels */}
  <ViewportSlot>
    <span className="flicking-arrow-prev"></span>
    <span className="flicking-arrow-next"></span>
  </ViewportSlot>
</Flicking>
```

**Vue** — Use the `#viewport` slot:
```html
<Flicking :plugins="plugins">
  <!-- Panels -->
  <template #viewport>
    <span class="flicking-arrow-prev"></span>
    <span class="flicking-arrow-next"></span>
  </template>
</Flicking>
```

### Notes

> **Warning: Caution**
- You must import `@egjs/flicking-plugins/dist/arrow.css` for the arrows to display correctly.
- Arrow elements must be located inside `.flicking-viewport`.

## Related Links

### Related Demos
- [Pagination](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/pagination.md): Page indicator
- [Prev/Next](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/prev-next.md): Custom navigation

## Code

### React
```jsx
import { Arrow } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const plugins = [new Arrow()];

export default function App() {
  return (
    <Flicking circular={true} plugins={plugins}>
      {COLORS.map((color, i) => (
        <div className="flicking-panel" key={i} style={{ background: color }}>
          {i + 1}
        </div>
      ))}
      <ViewportSlot>
        <span className="flicking-arrow-prev"></span>
        <span className="flicking-arrow-next"></span>
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
      <span class="flicking-arrow-prev"></span>
      <span class="flicking-arrow-next"></span>
    </template>
  </Flicking>
</template>

<script setup>
import { Arrow } from "@egjs/flicking-plugins";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const plugins = [new Arrow()];
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import { Arrow } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";
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

flicking.addPlugins(new Arrow());
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
      <span class="flicking-arrow-prev"></span>
      <span class="flicking-arrow-next"></span>
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
  padding: 0 40px;
}
```

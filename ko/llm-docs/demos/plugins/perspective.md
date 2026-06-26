# Perspective

Applies 3D perspective rotation and scale transformation effects based on panel position.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rotate` | `number` | `1` | Rotation intensity. Positive values rotate right panels inward, negative values rotate outward |
| `scale` | `number` | `2` | Scale transformation intensity |
| `perspective` | `number` | `1000` | CSS perspective value (px). Smaller values produce stronger distortion |

## Details

### How It Works

The Perspective plugin automatically applies `rotateY` and `scale` transformations based on each panel's visible ratio. Panels closer to the center face forward, while panels farther away appear rotated.

### Usage

```js
import { Perspective } from "@egjs/flicking-plugins";

// Basic usage
flicking.addPlugins(new Perspective({ rotate: 1, perspective: 1000 }));

// Strong distortion
flicking.addPlugins(new Perspective({ rotate: -1, scale: 2, perspective: 600 }));
```

### Notes

> **Warning: Caution**
- Using with `circular: true` enables a seamless 3D rotation effect.
- If there are too few panels, empty spaces may appear during circulation. At least 4-5 panels are recommended.

## Related Links

### Related Demos
- [Coverflow](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/coverflow.md): 3D effect based on Reactive API
- [Parallax](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/parallax.md): Parallax scroll effect

## Code

### React
```jsx
import { Perspective } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const plugins = [new Perspective({ rotate: 1, perspective: 1000 })];

export default function App() {
  return (
    <Flicking circular={true} plugins={plugins} align="center">
      {COLORS.map((color, i) => (
        <div className="flicking-panel" key={i} style={{ background: color }}>
          {i + 1}
        </div>
      ))}
    </Flicking>
  );
}
```

### Vue3
```vue
<template>
  <Flicking :options="{ circular: true, align: 'center' }" :plugins="plugins">
    <div v-for="(color, i) in COLORS" :key="i"
         class="flicking-panel"
         :style="{ background: color }">
      {{ i + 1 }}
    </div>
  </Flicking>
</template>

<script setup>
import { Perspective } from "@egjs/flicking-plugins";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const plugins = [new Perspective({ rotate: 1, perspective: 1000 })];
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";
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
  circular: true,
  align: "center"
});

flicking.addPlugins(new Perspective({ rotate: 1, perspective: 1000 }));
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
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 200px;
  height: 150px;
  margin-right: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}
```

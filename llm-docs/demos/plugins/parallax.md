# Parallax

Applies parallax scroll effects to elements inside panels. Horizontally translates the target element based on the panel's `outsetProgress` to create a sense of depth.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `selector` | `string` | `""` | CSS selector for the element to apply the effect to (uses `querySelector`) |
| `scale` | `number` | `1` | Parallax movement intensity multiplier |

### Movement Formula

```
position = ((parentWidth - elemWidth) / 2) * outsetProgress * scale
transform: translate(-50%) translate(${position}px)
```

| Condition | Movement Direction | Description |
|-----------|-------------------|-------------|
| Element > Parent | Opposite to scroll | Content moves slower than the panel (image parallax) |
| Element < Parent | Same as scroll | Content moves faster than the panel (depth effect) |

## Details

### How It Works

The plugin applies `translate(-50%) translate(${position}px)` to the target element. Since `translate(-50%)` is always included, the target element must be positioned with `position: absolute; left: 50%` for proper centering.

- **`parentWidth - elemWidth`**: The width difference between parent and element determines the movement range
- **`outsetProgress`**: How far the panel has moved from its aligned position (center = 0, left exit = -1, right exit = 1)
- **`scale`**: Amplifies the movement amount

### Usage

Uses `querySelector` to target **only the first matching element per panel**. To apply different parallax effects to multiple elements, **use separate instances**.

```js
import { Parallax } from "@egjs/flicking-plugins";

// Single target: parallax effect on images inside panels
flicking.addPlugins(new Parallax("img"));

// Multiple targets: individual control with unique selectors per element
flicking.addPlugins(
  new Parallax(".bar-0", 2),
  new Parallax(".bar-1", 2),
  new Parallax(".bar-2", 2)
);
```

### CSS Setup

```css
/* Panel: overflow: hidden + position: relative required */
.flicking-panel {
  position: relative;
  overflow: hidden;
}

/* Target element: position: absolute + left: 50% required */
/* translate(-50%) is always applied, so this combination ensures center alignment */
.parallax-target {
  position: absolute;
  left: 50%;
}
```

> **Warning: Caution**
- Without `position: absolute; left: 50%` on the target element, `translate(-50%)` will break the layout.
- If the element width equals the parent width, the movement amount becomes 0 and no effect is visible.
- If `selector` is left as an empty string, the effect is applied to the panel itself.

## Related Links

### Related Demos
- [Parallax (Reactive API)](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/parallax.md): Parallax using `indexProgress` (includes opacity effect)
- [Fade](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/fade.md): Fade effect
- [Perspective](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/perspective.md): 3D perspective effect

## Code

### React
```jsx
import { Parallax } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const plugins = [
  new Parallax(".bar-0", 2),
  new Parallax(".bar-1", 2),
  new Parallax(".bar-2", 2),
  new Parallax(".bar-3", 2),
  new Parallax(".bar-4", 2)
];

export default function App() {
  return (
    <Flicking plugins={plugins}>
      {[0, 1, 2, 3, 4].map(i => (
        <div className="skeleton-panel" key={i}>
          <span className="skeleton-bar bar-0" />
          <span className="skeleton-bar bar-1" />
          <span className="skeleton-bar bar-2" />
          <span className="skeleton-bar bar-3" />
          <span className="skeleton-bar bar-4" />
        </div>
      ))}
    </Flicking>
  );
}
```

### Vue3
```vue
<script setup>
import { Parallax } from "@egjs/flicking-plugins";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const plugins = [
  new Parallax(".bar-0", 2),
  new Parallax(".bar-1", 2),
  new Parallax(".bar-2", 2),
  new Parallax(".bar-3", 2),
  new Parallax(".bar-4", 2)
];
</script>

<template>
  <Flicking :plugins="plugins">
    <div v-for="i in 5" :key="i" class="skeleton-panel">
      <span class="skeleton-bar bar-0" />
      <span class="skeleton-bar bar-1" />
      <span class="skeleton-bar bar-2" />
      <span class="skeleton-bar bar-3" />
      <span class="skeleton-bar bar-4" />
    </div>
  </Flicking>
</template>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import { Parallax } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const flicking = new Flicking("#flick");

flicking.addPlugins(
  new Parallax(".bar-0", 2),
  new Parallax(".bar-1", 2),
  new Parallax(".bar-2", 2),
  new Parallax(".bar-3", 2),
  new Parallax(".bar-4", 2)
);
```

### HTML (for vanilla JS)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div id="flick" class="flicking-viewport">
    <div class="flicking-camera">
      <div class="skeleton-panel">
        <span class="skeleton-bar bar-0"></span>
        <span class="skeleton-bar bar-1"></span>
        <span class="skeleton-bar bar-2"></span>
        <span class="skeleton-bar bar-3"></span>
        <span class="skeleton-bar bar-4"></span>
      </div>
      <div class="skeleton-panel">
        <span class="skeleton-bar bar-0"></span>
        <span class="skeleton-bar bar-1"></span>
        <span class="skeleton-bar bar-2"></span>
        <span class="skeleton-bar bar-3"></span>
        <span class="skeleton-bar bar-4"></span>
      </div>
      <div class="skeleton-panel">
        <span class="skeleton-bar bar-0"></span>
        <span class="skeleton-bar bar-1"></span>
        <span class="skeleton-bar bar-2"></span>
        <span class="skeleton-bar bar-3"></span>
        <span class="skeleton-bar bar-4"></span>
      </div>
      <div class="skeleton-panel">
        <span class="skeleton-bar bar-0"></span>
        <span class="skeleton-bar bar-1"></span>
        <span class="skeleton-bar bar-2"></span>
        <span class="skeleton-bar bar-3"></span>
        <span class="skeleton-bar bar-4"></span>
      </div>
      <div class="skeleton-panel">
        <span class="skeleton-bar bar-0"></span>
        <span class="skeleton-bar bar-1"></span>
        <span class="skeleton-bar bar-2"></span>
        <span class="skeleton-bar bar-3"></span>
        <span class="skeleton-bar bar-4"></span>
      </div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.skeleton-panel {
  width: 280px;
  height: 180px;
  margin-right: 10px;
  border-radius: 12px;
  background: #3498db;
  position: relative;
  overflow: hidden;
}

.skeleton-bar {
  position: absolute;
  left: 50%;
  height: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
}

.bar-0 {
  top: 44px;
  width: 240px;
}
.bar-1 {
  top: 64px;
  width: 95px;
}
.bar-2 {
  top: 84px;
  width: 190px;
}
.bar-3 {
  top: 104px;
  width: 140px;
}
.bar-4 {
  top: 124px;
  width: 190px;
}
```

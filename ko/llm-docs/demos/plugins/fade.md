# Fade

Applies fade in/out effects by adjusting opacity during panel transitions.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `selector` | `string` | `""` | CSS selector for the element to apply the effect to. If empty, the effect is applied to the panel itself |
| `scale` | `number` | `1` | Effect intensity multiplier |

## Details

### How It Works

The Fade plugin automatically adjusts `opacity` based on each panel's visible ratio. The currently visible panel becomes opaque, while panels moving out of view become transparent.

### Usage

```js
import { Fade } from "@egjs/flicking-plugins";

// Basic usage
flicking.addPlugins(new Fade());

// Apply to a specific element only
flicking.addPlugins(new Fade("img"));

// Adjust effect intensity
flicking.addPlugins(new Fade("", 2));
```

### Notes

> **Warning: Caution**
- Using with `circular: true` enables a seamless fade effect.
- If the panel background is transparent, panels behind may show through. It is recommended to use an opaque background color or image.

## Related Links

### Related Demos
- [Parallax](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/parallax.md): Parallax scroll effect
- [AutoPlay](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/autoplay.md): Use with autoplay

## Code

### React
```jsx
import { Fade } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const plugins = [new Fade()];

export default function App() {
  return (
    <Flicking circular={true} plugins={plugins} preventDefaultOnDrag={true}>
      <div className="flicking-panel">
        <img className="panel-image" src="https://picsum.photos/seed/fade1/600/300" />
      </div>
      <div className="flicking-panel">
        <img className="panel-image" src="https://picsum.photos/seed/fade2/600/300" />
      </div>
      <div className="flicking-panel">
        <img className="panel-image" src="https://picsum.photos/seed/fade3/600/300" />
      </div>
    </Flicking>
  );
}
```

### Vue3
```vue
<template>
  <Flicking :options="{ circular: true, preventDefaultOnDrag: true }" :plugins="plugins">
    <div class="flicking-panel">
      <img class="panel-image" src="https://picsum.photos/seed/fade1/600/300" />
    </div>
    <div class="flicking-panel">
      <img class="panel-image" src="https://picsum.photos/seed/fade2/600/300" />
    </div>
    <div class="flicking-panel">
      <img class="panel-image" src="https://picsum.photos/seed/fade3/600/300" />
    </div>
  </Flicking>
</template>

<script setup>
import { Fade } from "@egjs/flicking-plugins";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const plugins = [new Fade()];
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import { Fade } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const flicking = new Flicking("#flick", {
  circular: true,
  preventDefaultOnDrag: true
});

flicking.addPlugins(new Fade());
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
      <div class="flicking-camera">
        <div class="flicking-panel">
          <img class="panel-image" src="https://picsum.photos/seed/fade1/600/300" />
        </div>
        <div class="flicking-panel">
          <img class="panel-image" src="https://picsum.photos/seed/fade2/600/300" />
        </div>
        <div class="flicking-panel">
          <img class="panel-image" src="https://picsum.photos/seed/fade3/600/300" />
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-panel {
  position: relative;
  border-radius: 5px;
  width: 80%;
  margin-right: 10px;
  height: 200px;
  overflow: hidden;
}

.panel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

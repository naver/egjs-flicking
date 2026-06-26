# Parallax

Use `indexProgress` from the Reactive API to create a parallax effect where inner elements move at different speeds based on the panel's distance from the camera center.



## Summary

### Key API

| Property | Type | Description |
|----------|------|-------------|
| [`indexProgress`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#indexprogress) | `number` | Camera position as a fractional panel index |

### Effect Mapping

| Panel Position | translateX | Opacity |
|---------------|------------|---------|
| Current (childProgress = 0) | 0px | 1.0 |
| Adjacent (childProgress = ±1) | ±offset | 0.0 |

## Details

### How It Works

Each panel contains skeleton bar elements. The `childProgress` for each panel is calculated as `panelIndex - indexProgress`. This value drives two visual effects:

1. **Horizontal offset**: Each bar translates by `childProgress * offset`, where different bars have different offset values (100-180px), creating a layered depth effect.
2. **Opacity**: Fades from 1 (current panel) to 0 (adjacent panels) based on `|childProgress|`.

The varying offsets per bar create the signature parallax look: elements closer to the "camera" appear to move faster than those further away.

### Related Options

- **`moveType: "freeScroll"`**: Produces smoother continuous parallax as the user scrolls freely.
- **Default `moveType` (snap)**: Parallax still works but snaps between discrete panel positions.

### Use Cases

> **Info: When to use**
- Card-based content with layered elements
- Storytelling / editorial carousels
- Product showcase with depth effect

## Related Links

### Related API
- [`indexProgress`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#indexprogress): Fractional panel index progress

### Related Demos
- [Coverflow](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/coverflow.md): 3D rotation effect using indexProgress
- [Progress Bar](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/progress-bar.md): Scroll progress indicator

## Code

### React
```jsx
import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import React from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const OFFSETS = [180, 160, 140, 120, 100];
const SIZES = ["size4", "size1", "size3", "size2", "size3"];

export default function App() {
  const flickingRef = React.useRef(null);
  const { indexProgress } = useFlickingReactiveAPI(flickingRef);

  return (
    <Flicking ref={flickingRef}>
      {[0, 1, 2, 3, 4].map(panelIndex => {
        const childProgress = panelIndex - indexProgress;
        const opacity = Math.min(Math.max(1 - Math.abs(childProgress), 0), 1);

        return (
          <div key={panelIndex} className="skeleton-panel">
            {SIZES.map((size, i) => (
              <span
                key={i}
                className={`skeleton-bar skeleton-bar-${size}`}
                style={{
                  transform: `translateX(${childProgress * OFFSETS[i]}px)`,
                  opacity
                }}
              />
            ))}
          </div>
        );
      })}
    </Flicking>
  );
}
```

### Vue3
```vue
<script setup>
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const OFFSETS = [180, 160, 140, 120, 100];
const SIZES = ["size4", "size1", "size3", "size2", "size3"];

const flickingRef = ref(null);
const { indexProgress } = useFlickingReactiveAPI(flickingRef);

const getBarStyle = (panelIndex, barIndex) => {
  const childProgress = panelIndex - indexProgress.value;
  const opacity = Math.min(Math.max(1 - Math.abs(childProgress), 0), 1);
  return {
    transform: `translateX(${childProgress * OFFSETS[barIndex]}px)`,
    opacity
  };
};
</script>

<template>
  <Flicking ref="flickingRef">
    <div v-for="panelIndex in 5" :key="panelIndex - 1" class="skeleton-panel">
      <span
        v-for="(size, i) in SIZES"
        :key="i"
        :class="'skeleton-bar skeleton-bar-' + size"
        :style="getBarStyle(panelIndex - 1, i)"
      />
    </div>
  </Flicking>
</template>
```

### JavaScript
```js
import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const OFFSETS = [180, 160, 140, 120, 100];

const flicking = new Flicking("#flick");
const reactiveAPI = connectFlickingReactiveAPI(flicking);

const panels = document.querySelectorAll(".skeleton-panel");

const update = value => {
  panels.forEach((panel, index) => {
    const childProgress = index - value;
    const opacity = Math.min(Math.max(1 - Math.abs(childProgress), 0), 1);

    const bars = panel.querySelectorAll(".skeleton-bar");
    bars.forEach((bar, i) => {
      bar.style.transform = `translateX(${childProgress * OFFSETS[i]}px)`;
      bar.style.opacity = opacity;
    });
  });
};

// Apply initial state and subscribe to changes
update(reactiveAPI.indexProgress);
reactiveAPI.subscribe("indexProgress", update);
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
        <span class="skeleton-bar skeleton-bar-size4"></span>
        <span class="skeleton-bar skeleton-bar-size1"></span>
        <span class="skeleton-bar skeleton-bar-size3"></span>
        <span class="skeleton-bar skeleton-bar-size2"></span>
        <span class="skeleton-bar skeleton-bar-size3"></span>
      </div>
      <div class="skeleton-panel">
        <span class="skeleton-bar skeleton-bar-size4"></span>
        <span class="skeleton-bar skeleton-bar-size1"></span>
        <span class="skeleton-bar skeleton-bar-size3"></span>
        <span class="skeleton-bar skeleton-bar-size2"></span>
        <span class="skeleton-bar skeleton-bar-size3"></span>
      </div>
      <div class="skeleton-panel">
        <span class="skeleton-bar skeleton-bar-size4"></span>
        <span class="skeleton-bar skeleton-bar-size1"></span>
        <span class="skeleton-bar skeleton-bar-size3"></span>
        <span class="skeleton-bar skeleton-bar-size2"></span>
        <span class="skeleton-bar skeleton-bar-size3"></span>
      </div>
      <div class="skeleton-panel">
        <span class="skeleton-bar skeleton-bar-size4"></span>
        <span class="skeleton-bar skeleton-bar-size1"></span>
        <span class="skeleton-bar skeleton-bar-size3"></span>
        <span class="skeleton-bar skeleton-bar-size2"></span>
        <span class="skeleton-bar skeleton-bar-size3"></span>
      </div>
      <div class="skeleton-panel">
        <span class="skeleton-bar skeleton-bar-size4"></span>
        <span class="skeleton-bar skeleton-bar-size1"></span>
        <span class="skeleton-bar skeleton-bar-size3"></span>
        <span class="skeleton-bar skeleton-bar-size2"></span>
        <span class="skeleton-bar skeleton-bar-size3"></span>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  gap: 8px;
  overflow: hidden;
}

.skeleton-bar {
  height: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
}

.skeleton-bar-size1 {
  width: 40%;
}
.skeleton-bar-size2 {
  width: 60%;
}
.skeleton-bar-size3 {
  width: 80%;
}
.skeleton-bar-size4 {
  width: 100%;
}
```

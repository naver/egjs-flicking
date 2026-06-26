# Coverflow

Use `indexProgress` from the Reactive API to apply 3D rotation and scaling effects that create an album-art style coverflow interface.



## Summary

### Key API

| Property | Type | Description |
|----------|------|-------------|
| [`indexProgress`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#indexprogress) | `number` | Camera position as a fractional panel index |
| [`useFlickingReactiveAPI`](https://naver.github.io/egjs-flicking/llm-docs/api/types/FlickingReactiveObject.md) | Hook (React) | Subscribe to reactive state in React |
| [`connectFlickingReactiveAPI`](https://naver.github.io/egjs-flicking/llm-docs/api/functions/connectFlickingReactiveAPI.md) | Function (Vanilla) | Subscribe to reactive state in Vanilla JS |

### Effect Mapping

| Panel Position | rotateY | scale | transformOrigin |
|---------------|---------|-------|-----------------|
| Current (childProgress ~ 0) | 0deg | 0.9 | 50% 50% |
| Adjacent (childProgress ~ +/-1) | -/+50deg | 0.7 | shifted toward center |
| Far (childProgress ~ +/-2) | -/+100deg | 0.5 | shifted toward center |

## Details

### What is indexProgress?

`indexProgress` represents the current camera position as a fractional panel index. For example, `2.5` means the camera is exactly halfway between panel 2 and panel 3. It updates in real-time during drag, enabling smooth visual transitions.

### How It Works

For circular mode, each panel's `childProgress` is calculated with wrapping:

```js
const childProgress = (index - indexProgress + length * 1.5) % length - length * 0.5;
```

This value drives three CSS transform properties:
- **`rotateY`**: Panels rotate around the Y-axis, angling away from center
- **`scale`**: Panels shrink as they move further from center
- **`transformOrigin`**: Shifts to create a natural perspective pivot point

### Related Options

- **`circular: true`**: Essential for seamless coverflow looping without dead ends.
- **`align: "center"`**: Places the active panel at the visual center of the coverflow.

### Use Cases

> **Info: When to use**
- Album / portfolio gallery
- Product showcase
- Media player UI

### Important Notes

> **Warning: Note**
- Set CSS `perspective` on the viewport and `transform-style: preserve-3d` on the camera for 3D effects to render.
- Use at least 5 panels to avoid gaps when using circular mode.

## Related Links

### Related API
- [`indexProgress`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#indexprogress): Fractional panel index progress
- [`connectFlickingReactiveAPI`](https://naver.github.io/egjs-flicking/llm-docs/api/functions/connectFlickingReactiveAPI.md): Connect Flicking to Reactive API

### Related Demos
- [Parallax](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/parallax.md): Parallax scrolling effect using indexProgress
- [Progress Bar](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/progress-bar.md): Scroll progress indicator

## Code

### React
```jsx
import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import React from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];
const LENGTH = 5;

export default function App() {
  const flickingRef = React.useRef(null);
  const { indexProgress } = useFlickingReactiveAPI(flickingRef);

  return (
    <Flicking ref={flickingRef} circular={true} align="center" className="flicking-coverflow">
      {[0, 1, 2, 3, 4].map(index => {
        const childProgress = ((index - indexProgress + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;
        const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);

        return (
          <div
            key={index}
            className="flicking-panel"
            style={{
              backgroundColor: COLORS[index % COLORS.length],
              transformOrigin: `${50 - childProgress * 50}% 50%`,
              transform: `rotateY(${-childProgress * 50}deg) scale(${scale})`
            }}
          >
            {index + 1}
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

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];
const LENGTH = 5;

const flickingRef = ref(null);
const { indexProgress } = useFlickingReactiveAPI(flickingRef);

const getStyle = index => {
  const childProgress = ((index - indexProgress.value + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;
  const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);

  return {
    backgroundColor: COLORS[index % COLORS.length],
    transformOrigin: `${50 - childProgress * 50}% 50%`,
    transform: `rotateY(${-childProgress * 50}deg) scale(${scale})`
  };
};
</script>

<template>
  <Flicking
    ref="flickingRef"
    :options="{ circular: true, align: 'center' }"
    class="flicking-coverflow"
  >
    <div
      v-for="index in 5"
      :key="index - 1"
      class="flicking-panel"
      :style="getStyle(index - 1)"
    >
      {{ index }}
    </div>
  </Flicking>
</template>
```

### JavaScript
```js
import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// Capture panel references BEFORE Flicking init (circular mode may modify DOM)
const panels = document.querySelectorAll(".flicking-panel");
const LENGTH = 5;

const flicking = new Flicking("#flick", {
  circular: true,
  align: "center"
});
const reactiveAPI = connectFlickingReactiveAPI(flicking);

const update = value => {
  panels.forEach((panel, index) => {
    const childProgress = ((index - value + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;
    const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);

    panel.style.transformOrigin = `${50 - childProgress * 50}% 50%`;
    panel.style.transform = `rotateY(${-childProgress * 50}deg) scale(${scale})`;
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
  <div id="flick" class="flicking-viewport flicking-coverflow">
    <div class="flicking-camera">
      <div class="flicking-panel" style="background: #3498db">1</div>
      <div class="flicking-panel" style="background: #e74c3c">2</div>
      <div class="flicking-panel" style="background: #2ecc71">3</div>
      <div class="flicking-panel" style="background: #9b59b6">4</div>
      <div class="flicking-panel" style="background: #f39c12">5</div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-coverflow {
  perspective: 800px;
}

.flicking-coverflow .flicking-camera {
  transform-style: preserve-3d;
}

.flicking-panel {
  width: 150px;
  height: 200px;
  margin: 0 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: white;
  backface-visibility: hidden;
}
```

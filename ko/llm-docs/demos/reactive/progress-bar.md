# Progress Bar

Use the `progress` property from the Reactive API to display a visual scroll progress indicator that updates in real-time.



## Summary

### Key API

| Property | Type | Description |
|----------|------|-------------|
| [`progress`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#progress) | `number` | Overall scroll progress percentage (0-100) |

### Behavior

| Position | progress | Bar Width |
|----------|----------|-----------|
| Start | 0 | 0% |
| Middle | ~50 | ~50% |
| End | 100 | 100% |

## Details

### What is progress?

`progress` represents the current camera position as a percentage of the total scrollable range. Combining it with `moveType: "freeScroll"` allows continuous (non-snapping) progress updates, making it ideal for smooth progress bar animations.

### Related Options

- **`moveType: "freeScroll"`**: Enables continuous progress changes without snapping to panel boundaries.
- **`bound: true`**: Ensures progress reaches exactly 0 at the start and 100 at the end.

### Use Cases

> **Info: When to use**
- Image gallery scroll progress
- Onboarding step indicator
- Content reading progress

## Related Links

### Related API
- [`progress`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#progress): Scroll progress percentage
- [`connectFlickingReactiveAPI`](https://naver.github.io/egjs-flicking/llm-docs/api/functions/connectFlickingReactiveAPI.md): Connect Flicking to Reactive API

### Related Demos
- [Pagination](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/pagination.md): Dot pagination navigation
- [Prev / Next](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/prev-next.md): Previous/Next button navigation

## Code

### React
```jsx
import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import React from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];

export default function App() {
  const flickingRef = React.useRef(null);
  const { progress } = useFlickingReactiveAPI(flickingRef);

  return (
    <div style={{ width: "100%" }}>
      <Flicking ref={flickingRef} moveType="freeScroll">
        {[0, 1, 2, 3, 4].map(index => (
          <div key={index} className="flicking-panel" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
            {index + 1}
          </div>
        ))}
      </Flicking>

      <div className="progress-container">
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">Progress: {progress.toFixed(1)}%</div>
      </div>
    </div>
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

const flickingRef = ref(null);
const { progress } = useFlickingReactiveAPI(flickingRef);
</script>

<template>
  <div style="width: 100%">
    <Flicking
      ref="flickingRef"
      :options="{ moveType: 'freeScroll' }"
    >
      <div
        v-for="index in 5"
        :key="index - 1"
        class="flicking-panel"
        :style="{ backgroundColor: COLORS[(index - 1) % COLORS.length] }"
      >
        {{ index }}
      </div>
    </Flicking>

    <div class="progress-container">
      <div class="progress-track">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-text">
        Progress: {{ progress.toFixed(1) }}%
      </div>
    </div>
  </div>
</template>
```

### JavaScript
```js
import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const flicking = new Flicking("#flick", {
  moveType: "freeScroll"
});
const reactiveAPI = connectFlickingReactiveAPI(flicking);

const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

reactiveAPI.subscribe("progress", value => {
  progressBar.style.width = `${value}%`;
  progressText.textContent = `Progress: ${value.toFixed(1)}%`;
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
  <div style="width: 100%">
    <div id="flick" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel" style="background: #3498db">1</div>
        <div class="flicking-panel" style="background: #e74c3c">2</div>
        <div class="flicking-panel" style="background: #2ecc71">3</div>
        <div class="flicking-panel" style="background: #9b59b6">4</div>
        <div class="flicking-panel" style="background: #f39c12">5</div>
      </div>
    </div>
    <div class="progress-container">
      <div class="progress-track">
        <div class="progress-bar" style="width: 0%"></div>
      </div>
      <div class="progress-text">Progress: 0%</div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 150px;
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

.progress-container {
  margin-top: 20px;
  width: 100%;
}

.progress-track {
  width: 100%;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 4px;
}

.progress-text {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #7f8c8d;
}
```

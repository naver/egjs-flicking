# Pagination

Use `currentPanelIndex`, `totalPanelCount`, and `moveTo` from the Reactive API to build a dot pagination UI that stays in sync with the carousel.



## Summary

### Key API

| Property / Method | Type | Description |
|-------------------|------|-------------|
| [`currentPanelIndex`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#currentpanelindex) | `number` | Currently active panel index |
| [`totalPanelCount`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#totalpanelcount) | `number` | Total number of panels |
| [`moveTo`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveMethod.md#moveto) | `(i: number) => Promise` | Move to a specific panel |

### Behavior

| State | Dot Style |
|-------|-----------|
| Current panel | Active (highlighted) |
| Other panels | Default, click to navigate |

## Details

### How It Works

1. Render dot buttons based on `totalPanelCount`
2. Highlight the dot matching `currentPanelIndex`
3. On dot click, call `moveTo(index)` to navigate
4. When the user drags to a new panel, `currentPanelIndex` updates automatically and the dots re-sync

### Related Options

- **`align: "center"`**: Center alignment makes pagination feel most intuitive.
- **`circular: true`**: In circular mode, dots cycle seamlessly as the first and last panels connect.

### Use Cases

> **Info: When to use**
- Banner / hero slider position indicator
- Image gallery page indicator
- Mobile onboarding step dots

## Related Links

### Related API
- [`currentPanelIndex`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#currentpanelindex): Active panel index
- [`moveTo`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveMethod.md#moveto): Navigate to panel

### Related Demos
- [Prev / Next](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/prev-next.md): Previous/Next button navigation
- [Progress Bar](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/progress-bar.md): Scroll progress indicator

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
  const { currentPanelIndex, totalPanelCount, moveTo } = useFlickingReactiveAPI(flickingRef);

  return (
    <div>
      <Flicking ref={flickingRef}>
        {[0, 1, 2, 3, 4].map(index => (
          <div key={index} className="flicking-panel" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
            {index + 1}
          </div>
        ))}
      </Flicking>

      <div className="pagination">
        {Array.from({ length: totalPanelCount }, (_, i) => (
          <button
            key={i}
            className={`pagination-btn ${currentPanelIndex === i ? "active" : ""}`}
            onClick={() => moveTo(i)}
          >
            {i + 1}
          </button>
        ))}
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
const { currentPanelIndex, totalPanelCount, moveTo } = useFlickingReactiveAPI(flickingRef);
</script>

<template>
  <div>
    <Flicking ref="flickingRef">
      <div
        v-for="index in 5"
        :key="index - 1"
        class="flicking-panel"
        :style="{ backgroundColor: COLORS[(index - 1) % COLORS.length] }"
      >
        {{ index }}
      </div>
    </Flicking>

    <div class="pagination">
      <button
        v-for="i in totalPanelCount"
        :key="i - 1"
        :class="['pagination-btn', { active: currentPanelIndex === i - 1 }]"
        @click="moveTo(i - 1)"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>
```

### JavaScript
```js
import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const flicking = new Flicking("#flick");
const reactiveAPI = connectFlickingReactiveAPI(flicking);

// Create pagination buttons
const pagination = document.querySelector(".pagination");
const buttons = [];

for (let i = 0; i < reactiveAPI.totalPanelCount; i++) {
  const btn = document.createElement("button");
  btn.className = `pagination-btn${i === 0 ? " active" : ""}`;
  btn.textContent = i + 1;
  btn.addEventListener("click", () => reactiveAPI.moveTo(i));
  buttons.push(btn);
  pagination.appendChild(btn);
}

// Update active button on index change
reactiveAPI.subscribe("currentPanelIndex", index => {
  buttons.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
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
  <div id="flick" class="flicking-viewport">
    <div class="flicking-camera">
      <div class="flicking-panel" style="background: #3498db">1</div>
      <div class="flicking-panel" style="background: #e74c3c">2</div>
      <div class="flicking-panel" style="background: #2ecc71">3</div>
      <div class="flicking-panel" style="background: #9b59b6">4</div>
      <div class="flicking-panel" style="background: #f39c12">5</div>
    </div>
  </div>
  <div class="pagination"></div>
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

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  border: 2px solid #3498db;
  background: transparent;
  color: #3498db;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s;
}

.pagination-btn:hover {
  background: #3498db;
  color: white;
}

.pagination-btn.active {
  background: #3498db;
  color: white;
}
```

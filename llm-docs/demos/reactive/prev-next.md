# Prev / Next

Use `isReachStart`, `isReachEnd`, and `moveTo` from the Reactive API to build navigation buttons that automatically disable at the carousel boundaries.



## Summary

### Key API

| Property / Method | Type | Description |
|-------------------|------|-------------|
| [`isReachStart`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#isreachstart) | `boolean` | Whether the first panel is active |
| [`isReachEnd`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#isreachend) | `boolean` | Whether the last panel is active |
| [`currentPanelIndex`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#currentpanelindex) | `number` | Currently active panel index |
| [`moveTo`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveMethod.md#moveto) | `(i: number) => Promise` | Move to a specific panel |

### Button States

| Position | Prev Button | Next Button |
|----------|-------------|-------------|
| First panel (`isReachStart`) | disabled | enabled |
| Middle panel | enabled | enabled |
| Last panel (`isReachEnd`) | enabled | disabled |

## Details

### How It Works

- Disable the Prev button when `isReachStart` is `true`
- Disable the Next button when `isReachEnd` is `true`
- Prev click: `moveTo(currentPanelIndex - 1)`
- Next click: `moveTo(currentPanelIndex + 1)`
- Button states auto-sync when the user drags to a new panel

### Related Options

- **`circular: true`**: In circular mode, `isReachStart` and `isReachEnd` are always `false`, so both buttons remain enabled at all times.

### Use Cases

> **Info: When to use**
- Desktop carousels where drag is less discoverable
- Accessibility (a11y) keyboard/button navigation
- Touch-disabled environments

## Related Links

### Related API
- [`isReachStart`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#isreachstart): Start boundary flag
- [`isReachEnd`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#isreachend): End boundary flag

### Related Demos
- [Pagination](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/pagination.md): Dot pagination
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
  const { currentPanelIndex, isReachStart, isReachEnd, moveTo } = useFlickingReactiveAPI(flickingRef);

  const handlePrev = () => {
    if (!isReachStart) {
      moveTo(currentPanelIndex - 1);
    }
  };

  const handleNext = () => {
    if (!isReachEnd) {
      moveTo(currentPanelIndex + 1);
    }
  };

  return (
    <div>
      <Flicking ref={flickingRef}>
        {[0, 1, 2, 3, 4].map(index => (
          <div key={index} className="flicking-panel" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
            {index + 1}
          </div>
        ))}
      </Flicking>

      <div className="controls">
        <button className="nav-btn" onClick={handlePrev} disabled={isReachStart}>
          Prev
        </button>
        <button className="nav-btn" onClick={handleNext} disabled={isReachEnd}>
          Next
        </button>
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
const { currentPanelIndex, isReachStart, isReachEnd, moveTo } = useFlickingReactiveAPI(flickingRef);

const handlePrev = () => {
  if (!isReachStart.value) {
    moveTo(currentPanelIndex.value - 1);
  }
};

const handleNext = () => {
  if (!isReachEnd.value) {
    moveTo(currentPanelIndex.value + 1);
  }
};
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

    <div class="controls">
      <button
        class="nav-btn"
        :disabled="isReachStart"
        @click="handlePrev"
      >
        Prev
      </button>
      <button
        class="nav-btn"
        :disabled="isReachEnd"
        @click="handleNext"
      >
        Next
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

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

prevBtn.addEventListener("click", () => {
  if (!reactiveAPI.isReachStart) {
    reactiveAPI.moveTo(flicking.index - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (!reactiveAPI.isReachEnd) {
    reactiveAPI.moveTo(flicking.index + 1);
  }
});

// Update button state
reactiveAPI.subscribe("isReachStart", value => {
  prevBtn.disabled = value;
});

reactiveAPI.subscribe("isReachEnd", value => {
  nextBtn.disabled = value;
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
  <div class="controls">
    <button id="prev-btn" class="nav-btn" disabled>Prev</button>
    <button id="next-btn" class="nav-btn">Next</button>
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

.controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.nav-btn {
  padding: 10px 24px;
  border: none;
  background: #3498db;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background: #2980b9;
}

.nav-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}
```

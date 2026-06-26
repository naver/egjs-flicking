# Animation Threshold

Use the [`animationThreshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#animationthreshold) option to set the minimum movement distance (px) to trigger an animation. If the movement distance is less than this value, the panel moves instantly without animation.

Try moving panels with the Prev/Next buttons and compare the event logs and animation behavior.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`animationThreshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#animationthreshold) | `number` | `0.5` | Minimum movement distance to trigger animation (px) |

### Value Comparison

| Value | Behavior |
|-------|----------|
| `0` | Always run animation (including 0px movement) |
| `0.5` | Movements under 0.5px are processed instantly (default) |
| Large value (e.g., `300`) | All movements under the specified distance are processed instantly |

## Details

### How animationThreshold Works

When Flicking moves via `moveTo()`, `next()`, `prev()`, etc., **if the distance to the target position is less than `animationThreshold`, the `duration` is set to 0 for instant movement**.

The main purpose of the default value `0.5` is to prevent the animation duration from becoming abnormally long due to floating-point calculation errors or micro-distances (less than 1px).

```javascript
// Default: movements under 0.5px are instant
const flicking = new Flicking("#el", {
  animationThreshold: 0.5
});

// Always animate (including floating-point errors)
const flicking = new Flicking("#el", {
  animationThreshold: 0
});

// Movements under 300px are processed instantly
const flicking = new Flicking("#el", {
  animationThreshold: 300,
  duration: 1000
});
```

### Use Cases

> **Info: When should you change the default?**
- **Set to `0`**: When you need to precisely receive `willChange`/`moveEnd` events even for micro-movements
- **Set to a large value**: When immediate response is needed for movements between adjacent panels (e.g., UIs with heavy programmatic control)
- **Keep the default**: The default value is sufficient for typical carousels

> **Warning: willChange Event Firing**
If animation is skipped due to `animationThreshold`, the `willChange` event may not fire. Consider this if you have event-based logic.

## Related Links

### Related Options
- [`duration`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration): Animation duration
- [`easing`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#easing): Animation easing curve

### Related Demos
- [Duration](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/duration.md): Animation duration setting
- [Interruptable](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/interruptable.md): Input handling during animation

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

function FlickingDemo({ label, animationThreshold, duration }) {
  const ref = useRef(null);
  const [log, setLog] = useState("—");

  const addLog = msg => setLog(msg);

  return (
    <div className="demo-container">
      <div className="demo-label">{label}</div>
      <Flicking
        ref={ref}
        duration={duration}
        animationThreshold={animationThreshold}
        align="center"
        onWillChange={() => addLog("▶ Animation started")}
        onMoveEnd={() => addLog("✓ Move complete")}
      >
        <div className="flicking-panel panel-1">1</div>
        <div className="flicking-panel panel-2">2</div>
        <div className="flicking-panel panel-3">3</div>
        <div className="flicking-panel panel-4">4</div>
        <div className="flicking-panel panel-5">5</div>
      </Flicking>
      <div className="controls">
        <button onClick={() => ref.current?.prev().catch(() => {})}>Prev</button>
        <button onClick={() => ref.current?.next().catch(() => {})}>Next</button>
        <span className="event-log">{log}</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <FlickingDemo
        label="animationThreshold: 0.5 (default) — normal animation"
        animationThreshold={0.5}
        duration={1000}
      />
      <FlickingDemo
        label="animationThreshold: 300 — moves under 300px are instant (no animation)"
        animationThreshold={300}
        duration={1000}
      />
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <!-- animationThreshold: 0.5 (default) -->
    <div class="demo-container">
      <div class="demo-label">animationThreshold: 0.5 (default) — normal animation</div>
      <Flicking
        ref="flick1"
        :options="{ duration: 1000, animationThreshold: 0.5, align: 'center' }"
        @willChange="log1 = '▶ Animation started'"
        @moveEnd="log1 = '✓ Move complete'"
      >
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="flick1.prev().catch(() => {})">Prev</button>
        <button @click="flick1.next().catch(() => {})">Next</button>
        <span class="event-log">{{ log1 || '—' }}</span>
      </div>
    </div>

    <!-- animationThreshold: 300 -->
    <div class="demo-container">
      <div class="demo-label">animationThreshold: 300 — moves under 300px are instant (no animation)</div>
      <Flicking
        ref="flick2"
        :options="{ duration: 1000, animationThreshold: 300, align: 'center' }"
        @willChange="log2 = '▶ Animation started'"
        @moveEnd="log2 = '✓ Move complete'"
      >
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="flick2.prev().catch(() => {})">Prev</button>
        <button @click="flick2.next().catch(() => {})">Next</button>
        <span class="event-log">{{ log2 || '—' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const flick1 = ref(null);
const flick2 = ref(null);
const log1 = ref("");
const log2 = ref("");
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// animationThreshold: 0.5 (default)
const flick1 = new Flicking("#flick-default", {
  duration: 1000,
  animationThreshold: 0.5,
  align: "center"
});

flick1.on("willChange", () => {
  document.getElementById("log1").textContent = "▶ Animation started";
});
flick1.on("moveEnd", () => {
  document.getElementById("log1").textContent = "✓ Move complete";
});

document.getElementById("prev1").addEventListener("click", () => flick1.prev().catch(() => {}));
document.getElementById("next1").addEventListener("click", () => flick1.next().catch(() => {}));

// animationThreshold: 300
const flick2 = new Flicking("#flick-threshold", {
  duration: 1000,
  animationThreshold: 300,
  align: "center"
});

flick2.on("willChange", () => {
  document.getElementById("log2").textContent = "▶ Animation started";
});
flick2.on("moveEnd", () => {
  document.getElementById("log2").textContent = "✓ Move complete";
});

document.getElementById("prev2").addEventListener("click", () => flick2.prev().catch(() => {}));
document.getElementById("next2").addEventListener("click", () => flick2.next().catch(() => {}));
```

### HTML (for vanilla JS)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <!-- animationThreshold: 0.5 (default) -->
  <div class="demo-container">
    <div class="demo-label">animationThreshold: 0.5 (default) — normal animation</div>
    <div id="flick-default" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
    <div class="controls">
      <button id="prev1">Prev</button>
      <button id="next1">Next</button>
      <span class="event-log" id="log1">—</span>
    </div>
  </div>

  <!-- animationThreshold: 300 -->
  <div class="demo-container">
    <div class="demo-label">animationThreshold: 300 — moves under 300px are instant (no animation)</div>
    <div id="flick-threshold" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
    <div class="controls">
      <button id="prev2">Prev</button>
      <button id="next2">Next</button>
      <span class="event-log" id="log2">—</span>
    </div>
  </div>

</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 50%;
  height: 120px;
}

.controls {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.controls button {
  padding: 6px 12px;
  cursor: pointer;
}
.event-log {
  margin-top: 6px;
  font-size: 13px;
  color: #555;
  min-height: 20px;
}
```

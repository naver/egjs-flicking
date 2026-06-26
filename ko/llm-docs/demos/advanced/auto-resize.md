# Auto Resize

Control how viewport size changes are detected using the [`autoResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize) and [`useResizeObserver`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#useresizeobserver) options.

Try changing the container width with the slider and compare the resize response difference between the two carousels.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`autoResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize) | `boolean` | `true` | Automatically call `resize()` when viewport size changes |
| [`useResizeObserver`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#useresizeobserver) | `boolean` | `true` | Whether to use ResizeObserver (falls back to window resize if false) |

### Option Combination Comparison

| Combination | Behavior | Best For |
|-------------|----------|----------|
| `autoResize: true` + `useResizeObserver: true` | Immediately detects element size changes | General use (default) |
| `autoResize: true` + `useResizeObserver: false` | Only detects window resize | Element size is fixed, only window size changes |
| `autoResize: false` | Manual `resize()` call required | When you want to control the resize timing yourself |

## Details

### autoResize

When `autoResize: true` (default), Flicking automatically calls the `resize()` method when the viewport size changes. Setting it to `false` requires the developer to manually call `flicking.resize()`.

### useResizeObserver

When `useResizeObserver: true` (default), the `ResizeObserver` API is used to detect element-level size changes. When `false`, only the `window`'s `resize` event is detected, which means changes to the parent element size may not be detected.

### Use Cases

> **Info: When should you use this?**
- **Responsive layouts**: Use the defaults as-is (autoResize + ResizeObserver)
- **Tab switching UI**: Set `autoResize: false` and manually resize only when the tab is activated
- **Performance-sensitive environments**: Set `useResizeObserver: false` to only detect window resize

### Notes

> **Warning: Caution**
- When `autoResize: false` is set, you must call `resize()` after the viewport size changes
- When `useResizeObserver: false`, size changes caused by CSS layout changes (flex, grid, etc.) are not detected

## Related Links

### Related Options
- [`autoResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize): Auto resize
- [`useResizeObserver`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#useresizeobserver): Use ResizeObserver

### Related Demos
- [Resize Debounce](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/resize-debounce.md): Control resize call frequency
- [Optimize Size Update](https://naver.github.io/egjs-flicking/docs/optimize-size-update): Skip unnecessary axis changes
- [Observe Panel Resize](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/observe-panel-resize.md): Detect panel size changes

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useCallback, useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

function FlickingDemo({ label, hint, width, useResizeObserver, autoResize }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  const onAfterResize = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div className="demo-section">
      <div className="demo-label">{label}</div>
      <div style={{ width }}>
        <Flicking
          ref={ref}
          key={`${autoResize}-${useResizeObserver}`}
          autoResize={autoResize}
          useResizeObserver={useResizeObserver}
          onAfterResize={onAfterResize}
        >
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div className="resize-count">Resize count: {count}</div>
      <div className="resize-count" style={{ color: "#aaa" }}>
        {hint}
      </div>
      {!autoResize && (
        <button className="button" style={{ marginTop: 6 }} onClick={() => ref.current?.resize()}>
          Manual resize()
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [width, setWidth] = useState(100);
  const [autoResize, setAutoResize] = useState(true);

  return (
    <div>
      <div className="slider-row">
        <span>Container width</span>
        <input type="range" min={30} max={100} value={width} onChange={e => setWidth(Number(e.target.value))} />
        <span className="value-label">{width}%</span>
      </div>

      <FlickingDemo
        label="useResizeObserver: true"
        hint="Responds immediately when width is changed via slider"
        width={`${width}%`}
        useResizeObserver={true}
        autoResize={autoResize}
      />
      <FlickingDemo
        label="useResizeObserver: false"
        hint="Does not detect element size changes (only detects window resize)"
        width={`${width}%`}
        useResizeObserver={false}
        autoResize={autoResize}
      />

      <div className="toggle-row">
        <button className={`button ${autoResize ? "active" : ""}`} onClick={() => setAutoResize(v => !v)}>
          autoResize: {autoResize ? "true" : "false"}
        </button>
        <span style={{ fontSize: 13, color: "#888" }}>
          {autoResize ? "Auto resize enabled" : "Auto resize disabled — use the Manual resize() button"}
        </span>
      </div>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <div class="slider-row">
      <span>Container width</span>
      <input type="range" :min="30" :max="100" v-model.number="width" />
      <span class="value-label">{{ width }}%</span>
    </div>

    <div class="demo-section">
      <div class="demo-label">useResizeObserver: true</div>
      <div :style="{ width: width + '%' }">
        <Flicking
          :key="'a-' + autoResize"
          :options="{ autoResize, useResizeObserver: true }"
          @afterResize="countA++"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="resize-count">Resize count: {{ countA }}</div>
      <div class="resize-count" style="color: #aaa">Responds immediately when width is changed via slider</div>
    </div>

    <div class="demo-section">
      <div class="demo-label">useResizeObserver: false</div>
      <div :style="{ width: width + '%' }">
        <Flicking
          ref="flickB"
          :key="'b-' + autoResize"
          :options="{ autoResize, useResizeObserver: false }"
          @afterResize="countB++"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="resize-count">Resize count: {{ countB }}</div>
      <div class="resize-count" style="color: #aaa">Does not detect element size changes (only detects window resize)</div>
      <button v-if="!autoResize" class="button" style="margin-top: 6px"
        @click="flickB?.resize()">
        Manual resize()
      </button>
    </div>

    <div class="toggle-row">
      <button :class="['button', autoResize && 'active']"
        @click="autoResize = !autoResize; countA = 0; countB = 0">
        autoResize: {{ autoResize }}
      </button>
      <span style="font-size: 13px; color: #888">
        {{ autoResize ? 'Auto resize enabled' : 'Auto resize disabled — use the Manual resize() button' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const flickB = ref(null);
const width = ref(100);
const autoResize = ref(true);
const countA = ref(0);
const countB = ref(0);
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// useResizeObserver: true (default)
const flickA = new Flicking("#flick-observer", {
  autoResize: true,
  useResizeObserver: true
});

// useResizeObserver: false
const flickB = new Flicking("#flick-window", {
  autoResize: true,
  useResizeObserver: false
});

let countA = 0;
let countB = 0;
const countElA = document.getElementById("count-a");
const countElB = document.getElementById("count-b");

flickA.on("afterResize", () => {
  countElA.textContent = ++countA;
});
flickB.on("afterResize", () => {
  countElB.textContent = ++countB;
});

// Change container width via slider
const slider = document.getElementById("width-slider");
const valueLabel = document.getElementById("width-value");
const wrapA = document.getElementById("wrap-a");
const wrapB = document.getElementById("wrap-b");

slider.addEventListener("input", () => {
  const w = `${slider.value}%`;
  wrapA.style.width = w;
  wrapB.style.width = w;
  valueLabel.textContent = `${slider.value}%`;
});

// Toggle autoResize
const toggleBtn = document.getElementById("btn-toggle");
let autoResizeOn = true;
toggleBtn.addEventListener("click", () => {
  autoResizeOn = !autoResizeOn;
  flickA.autoResize = autoResizeOn;
  flickB.autoResize = autoResizeOn;
  toggleBtn.textContent = `autoResize: ${autoResizeOn}`;
  toggleBtn.classList.toggle("active", autoResizeOn);

  document.getElementById("manual-btn").style.display = autoResizeOn ? "none" : "inline-block";
});

document.getElementById("manual-btn").addEventListener("click", () => {
  flickA.resize();
  flickB.resize();
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
  <div class="slider-row">
    <span>Container width</span>
    <input type="range" id="width-slider" min="30" max="100" value="100" />
    <span class="value-label" id="width-value">100%</span>
  </div>

  <div class="demo-section">
    <div class="demo-label">useResizeObserver: true</div>
    <div id="wrap-a" style="width: 100%">
      <div id="flick-observer" class="flicking-viewport">
        <div class="flicking-camera">
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </div>
      </div>
    </div>
    <div class="resize-count">Resize count: <span id="count-a">0</span></div>
  </div>

  <div class="demo-section">
    <div class="demo-label">useResizeObserver: false</div>
    <div id="wrap-b" style="width: 100%">
      <div id="flick-window" class="flicking-viewport">
        <div class="flicking-camera">
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </div>
      </div>
    </div>
    <div class="resize-count">Resize count: <span id="count-b">0</span></div>
  </div>

  <div class="toggle-row">
    <button class="button active" id="btn-toggle">autoResize: true</button>
    <button class="button" id="manual-btn" style="display: none">Manual resize()</button>
  </div>
</body>
</html>
```

### CSS
```css
.slider-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.slider-row input[type="range"] {
  flex: 1;
}

.slider-row .value-label {
  font-size: 13px;
  color: #666;
  min-width: 50px;
  text-align: right;
}

.demo-section {
  margin-bottom: 20px;
}

.demo-section .demo-label {
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 14px;
}

.resize-count {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.toggle-row .button {
  font-size: 13px;
  padding: 6px 12px;
}

.toggle-row .button.active {
  background: #3498db;
  color: white;
}
```

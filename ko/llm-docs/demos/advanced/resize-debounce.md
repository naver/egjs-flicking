# Resize Debounce

Control the resize call frequency using the [`resizeDebounce`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizedebounce) and [`maxResizeDebounce`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#maxresizedebounce) options.

Try dragging the bottom-right corner of the container and compare the resize call frequency between the two carousels.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`resizeDebounce`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizedebounce) | `number` | `0` | Resize call debounce delay (ms) |
| [`maxResizeDebounce`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#maxresizedebounce) | `number` | `100` | Maximum debounce delay guarantee (ms) |

### Behavior Comparison

| Setting | Behavior | Best For |
|---------|----------|----------|
| `resizeDebounce: 0` | Resize called immediately on size change | General use (default) |
| `resizeDebounce: 300` | Called after 300ms of no changes | Performance optimization during frequent size changes |
| `resizeDebounce: 300` + `maxResizeDebounce: 800` | 300ms debounce + guaranteed every 800ms max | Periodic updates needed even during continuous changes |

## Details

### resizeDebounce

`resizeDebounce` delays the resize call by the specified time. If the size changes again during the delay, the timer is reset.

### maxResizeDebounce

`maxResizeDebounce` guarantees a maximum delay for debouncing. Even if `resizeDebounce` is set and continuous size changes occur, resize is executed at least once every `maxResizeDebounce` milliseconds.

### Use Cases

> **Info: When should you use this?**
- **Chat/live feeds**: Reduce frequent resize calls with `resizeDebounce`
- **Draggable layouts**: Guarantee intermediate updates with `resizeDebounce` + `maxResizeDebounce`
- **Typical responsive**: Respond immediately with the default (`resizeDebounce: 0`)

### Notes

> **Warning: Caution**
- If the `resizeDebounce` value is too large, users may see panels repositioning late after a size change
- `maxResizeDebounce` is only meaningful when `resizeDebounce` is greater than 0

## Related Links

### Related Options
- [`resizeDebounce`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizedebounce): Resize debounce
- [`maxResizeDebounce`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#maxresizedebounce): Maximum debounce

### Related Demos
- [Auto Resize](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/auto-resize.md): Resize detection method settings
- [Optimize Size Update](https://naver.github.io/egjs-flicking/docs/optimize-size-update): Skip unnecessary axis changes

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useCallback, useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

function formatTime() {
  return new Date().toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3
  });
}

function FlickingDemo({ label, config, width }) {
  const [logs, setLogs] = useState([]);

  const onAfterResize = useCallback(() => {
    setLogs(prev => [`[${formatTime()}] resize()`, ...prev].slice(0, 30));
  }, []);

  return (
    <div className="demo-section">
      <div className="demo-label">{label}</div>
      <div style={{ width }}>
        <Flicking
          resizeDebounce={config.resizeDebounce}
          maxResizeDebounce={config.maxResizeDebounce}
          onAfterResize={onAfterResize}
        >
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div className="log-header">
        <span>Resize log</span>
        <span className="count-badge">{logs.length}x</span>
      </div>
      <div className="log-area">
        {logs.length === 0 ? "Move the slider to see resize logs..." : logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
    </div>
  );
}

export default function App() {
  const [width, setWidth] = useState(100);

  return (
    <div>
      <div className="demo-hint">
        Change the width using the slider and compare the resize call frequency between the two carousels.
      </div>

      <div className="slider-row">
        <span>Container width</span>
        <input type="range" min={30} max={100} value={width} onChange={e => setWidth(Number(e.target.value))} />
        <span className="value-label">{width}%</span>
      </div>

      <FlickingDemo
        label="resizeDebounce: 0 (default)"
        config={{ resizeDebounce: 0, maxResizeDebounce: 100 }}
        width={`${width}%`}
      />
      <FlickingDemo
        label="resizeDebounce: 300ms / maxResizeDebounce: 800ms"
        config={{ resizeDebounce: 300, maxResizeDebounce: 800 }}
        width={`${width}%`}
      />
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <div class="demo-hint">
      Change the width using the slider and compare the resize call frequency between the two carousels.
    </div>

    <div class="slider-row">
      <span>Container width</span>
      <input type="range" :min="30" :max="100" v-model.number="width" />
      <span class="value-label">{{ width }}%</span>
    </div>

    <!-- debounce: 0 -->
    <div class="demo-section">
      <div class="demo-label">resizeDebounce: 0 (default)</div>
      <div :style="{ width: width + '%' }">
        <Flicking
          :options="{ resizeDebounce: 0, maxResizeDebounce: 100 }"
          @afterResize="addLogA"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="log-header">
        <span>Resize log</span>
        <span class="count-badge">{{ logsA.length }}x</span>
      </div>
      <div class="log-area">
        <template v-if="logsA.length === 0">
          Move the slider to see resize logs...
        </template>
        <div v-for="(log, i) in logsA" :key="i">{{ log }}</div>
      </div>
    </div>

    <!-- debounce: 300ms -->
    <div class="demo-section">
      <div class="demo-label">resizeDebounce: 300ms / maxResizeDebounce: 800ms</div>
      <div :style="{ width: width + '%' }">
        <Flicking
          :options="{ resizeDebounce: 300, maxResizeDebounce: 800 }"
          @afterResize="addLogB"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="log-header">
        <span>Resize log</span>
        <span class="count-badge">{{ logsB.length }}x</span>
      </div>
      <div class="log-area">
        <template v-if="logsB.length === 0">
          Move the slider to see resize logs...
        </template>
        <div v-for="(log, i) in logsB" :key="i">{{ log }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

function formatTime() {
  return new Date().toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3
  });
}

const width = ref(100);
const logsA = ref([]);
const logsB = ref([]);

const addLogA = () => {
  logsA.value = [`[${formatTime()}] resize()`, ...logsA.value].slice(0, 30);
};
const addLogB = () => {
  logsB.value = [`[${formatTime()}] resize()`, ...logsB.value].slice(0, 30);
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

function formatTime() {
  return new Date().toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3
  });
}

// debounce: 0 (default)
const flickA = new Flicking("#flick-a", {
  resizeDebounce: 0,
  maxResizeDebounce: 100
});

// debounce: 300ms / maxDebounce: 800ms
const flickB = new Flicking("#flick-b", {
  resizeDebounce: 300,
  maxResizeDebounce: 800
});

const logElA = document.getElementById("log-a");
const logElB = document.getElementById("log-b");
const countElA = document.getElementById("count-a");
const countElB = document.getElementById("count-b");
const logsA = [];
const logsB = [];

function addLog(logs, logEl, countEl) {
  logs.unshift(`[${formatTime()}] resize()`);
  if (logs.length > 30) logs.pop();
  logEl.innerHTML = logs.map(l => `<div>${l}</div>`).join("");
  countEl.textContent = `${logs.length}x`;
}

flickA.on("afterResize", () => addLog(logsA, logElA, countElA));
flickB.on("afterResize", () => addLog(logsB, logElB, countElB));

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
```

### HTML (for vanilla JS)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div class="demo-hint">
    Change the width using the slider and compare the resize call frequency between the two carousels.
  </div>

  <div class="slider-row">
    <span>Container width</span>
    <input type="range" id="width-slider" min="30" max="100" value="100" />
    <span class="value-label" id="width-value">100%</span>
  </div>

  <div class="demo-section">
    <div class="demo-label">resizeDebounce: 0 (default)</div>
    <div id="wrap-a" style="width: 100%">
      <div id="flick-a" class="flicking-viewport">
        <div class="flicking-camera">
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </div>
      </div>
    </div>
    <div class="log-header">
      <span>Resize log</span>
      <span class="count-badge" id="count-a">0x</span>
    </div>
    <div class="log-area" id="log-a">
      Move the slider to see resize logs...
    </div>
  </div>

  <div class="demo-section">
    <div class="demo-label">resizeDebounce: 300ms / maxResizeDebounce: 800ms</div>
    <div id="wrap-b" style="width: 100%">
      <div id="flick-b" class="flicking-viewport">
        <div class="flicking-camera">
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </div>
      </div>
    </div>
    <div class="log-header">
      <span>Resize log</span>
      <span class="count-badge" id="count-b">0x</span>
    </div>
    <div class="log-area" id="log-b">
      Move the slider to see resize logs...
    </div>
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
  margin-bottom: 16px;
}

.demo-section .demo-label {
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 14px;
}

.demo-hint {
  font-size: 13px;
  color: #888;
  margin-bottom: 12px;
}

.log-area {
  margin-top: 6px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
  color: #333;
  max-height: 100px;
  overflow-y: auto;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.log-header span {
  font-size: 13px;
  color: #888;
}

.count-badge {
  font-size: 13px;
  font-weight: bold;
  color: #3498db;
}
```

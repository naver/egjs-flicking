# Infinite Scroll

Implement infinite scroll using the [`needPanelThreshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#needpanelthreshold) option and the `needPanel` event.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`needPanelThreshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#needpanelthreshold) | `number` | `0` | Threshold for triggering the needPanel event (px) |

### Related Events

| Event | Description |
|-------|-------------|
| [`needPanel`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/NeedPanelEvent.md) | Fired when empty space is visible at the viewport edge |

### Threshold Comparison

| needPanelThreshold | Behavior |
|--------------------|----------|
| `0` (default) | Event fires only when the end is fully reached |
| `100` | Event fires 100px before the end (preloading) |
| `200` | Event fires 200px before the end |

## Details

### How It Works

1. Scroll approaches the viewport edge
2. When within the `needPanelThreshold` distance, the `needPanel` event fires
3. Add new panels in the event handler
4. Scrolling can continue

```tsx
<Flicking
  needPanelThreshold={100}
  onNeedPanel={(e) => {
    if (e.direction === "NEXT") {
      // Append panels
      setPanels(prev => [...prev, newPanel]);
    }
  }}
>
  {panels.map(p => <Panel key={p.id} />)}
</Flicking>
```

### needPanel Event

```typescript
interface NeedPanelEvent {
  direction: "PREV" | "NEXT";
}
```

- Use `direction` to determine which direction needs panels
- `"PREV"`: Panels needed at the front (prepend)
- `"NEXT"`: Panels needed at the end (append)

### Adding Panels in Vanilla JS

```javascript
flicking.on("needPanel", (e) => {
  if (e.direction === "NEXT") {
    const newPanel = document.createElement("div");
    newPanel.className = "flicking-panel";
    newPanel.textContent = "New Panel";
    flicking.append(newPanel);
  }
});
```

### Use Cases

> **Info: When should you use needPanelThreshold?**

**Recommended:**
- Infinite scroll implementation
- Pagination (load next page when reaching the end)
- Progressive loading of large datasets

**Appropriate threshold values:**
- `0`: When the end must be exactly reached
- `100~200`: Typical preloading
- Viewport width or more: Very aggressive preloading

### Notes

> **Warning: Duplicate Event Firing**
The needPanel event may fire again while panels are being added. Manage loading state to prevent duplicate requests.

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleNeedPanel = async (e) => {
  if (isLoading) return; // Prevent duplicates
  setIsLoading(true);

  await loadMorePanels();

  setIsLoading(false);
};
```

## Related Links

### Related Events
- [`needPanel`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/NeedPanelEvent.md): Panel needed event

### Related Methods
- [`append`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#append): Add panels at the end
- [`prepend`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#prepend): Add panels at the front

### Related Demos
- [Virtual Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/virtual-scroll.md): Virtual rendering of large numbers of panels

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

export default function App() {
  const flickingRef = useRef(null);
  const [panels, setPanels] = useState([0, 1, 2, 3, 4]);
  const [logs, setLogs] = useState([]);
  const nextId = useRef(5);

  const addLog = message => {
    setLogs(prev => [...prev.slice(-4), message]);
  };

  const handleNeedPanel = e => {
    addLog(`needPanel: direction=${e.direction}`);

    if (e.direction === "NEXT") {
      // NEXT: append panels
      const newPanels = [nextId.current, nextId.current + 1, nextId.current + 2];
      nextId.current += 3;
      setPanels(prev => [...prev, ...newPanels]);
      addLog(`Added: Panel ${newPanels.join(", ")}`);
    }
  };

  return (
    <div>
      <div className="demo-container">
        <div className="demo-label">needPanelThreshold: 100</div>
        <div className="demo-info">needPanel event fires 100px before the end → panels are added automatically</div>
        <Flicking ref={flickingRef} align="prev" needPanelThreshold={100} onNeedPanel={handleNeedPanel}>
          {panels.map(id => (
            <div key={id} className="flicking-panel" style={{ background: COLORS[id % COLORS.length] }}>
              Panel {id + 1}
            </div>
          ))}
        </Flicking>
        <div className="panel-counter">
          Current panel count: <strong>{panels.length}</strong> (auto-appends on scroll to end)
        </div>
        <div className="event-log">
          {logs.length === 0 ? "Event log..." : logs.map((log, i) => <div key={i}>{log}</div>)}
        </div>
      </div>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <div class="demo-container">
      <div class="demo-label">needPanelThreshold: 100</div>
      <div class="demo-info">needPanel event fires 100px before the end → panels are added automatically</div>
      <Flicking
        ref="flicking"
        align="prev"
        :needPanelThreshold="100"
        @need-panel="handleNeedPanel"
      >
        <div
          v-for="id in panels"
          :key="id"
          class="flicking-panel"
          :style="{ background: colors[id % colors.length] }"
        >
          Panel {{ id + 1 }}
        </div>
      </Flicking>
      <div class="panel-counter">
        Current panel count: <strong>{{ panels.length }}</strong> (auto-appends on scroll to end)
      </div>
      <div class="event-log">
        <div v-if="logs.length === 0">Event log...</div>
        <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const colors = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];
const panels = ref([0, 1, 2, 3, 4]);
const logs = ref([]);
let nextId = 5;

const addLog = message => {
  logs.value = [...logs.value.slice(-4), message];
};
const handleNeedPanel = e => {
  addLog(`needPanel: direction=${e.direction}`);

  if (e.direction === "NEXT") {
    // NEXT: append panels
    const newPanels = [nextId, nextId + 1, nextId + 2];
    nextId += 3;
    panels.value = [...panels.value, ...newPanels];
    addLog(`Added: Panel ${newPanels.map(p => p + 1).join(", ")}`);
  }
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];
let nextId = 5;

const flicking = new Flicking("#flick", {
  align: "prev",
  needPanelThreshold: 100
});

function addLog(message) {
  const logEl = document.getElementById("event-log");
  const div = document.createElement("div");
  div.textContent = message;
  logEl.appendChild(div);
  // Keep only last 5 entries
  while (logEl.children.length > 5) {
    logEl.removeChild(logEl.firstChild);
  }
}

function updateCounter() {
  const count = flicking.panelCount;
  document.getElementById("panel-count").textContent = count;
}

flicking.on("needPanel", e => {
  addLog(`needPanel: direction=${e.direction}`);

  if (e.direction === "NEXT") {
    // NEXT: append panels
    const newPanels = [];
    for (let i = 0; i < 3; i++) {
      const panel = document.createElement("div");
      panel.className = "flicking-panel";
      panel.style.background = COLORS[nextId % COLORS.length];
      panel.textContent = `Panel ${nextId + 1}`;
      newPanels.push(panel);
      nextId++;
    }
    flicking.append(newPanels);
    addLog(`Added: Panel ${nextId - 3}, ${nextId - 2}, ${nextId - 1}`);
    updateCounter();
  }
});

flicking.on("ready", updateCounter);
```

### HTML (for vanilla JS)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div class="demo-container">
    <div class="demo-label">needPanelThreshold: 100</div>
    <div class="demo-info">needPanel event fires 100px before the end → panels are added automatically</div>
    <div id="flick" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel" style="background: #3e8ed0">Panel 1</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 2</div>
        <div class="flicking-panel" style="background: #f14668">Panel 3</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 4</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 5</div>
      </div>
    </div>
    <div class="panel-counter">
      Current panel count: <strong id="panel-count">5</strong> (auto-appends on scroll to end)
    </div>
    <div id="event-log" class="event-log">
      Event log...
    </div>
  </div>

</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 200px;
  height: 120px;
  margin-right: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.demo-container {
  margin-bottom: 32px;
}

.demo-info {
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
}
.panel-counter {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
.panel-counter strong {
  color: #3e8ed0;
}
.event-log {
  margin-top: 8px;
  padding: 8px 12px;
  background: #e8f4f8;
  border-radius: 4px;
  font-size: 13px;
  color: #333;
  font-family: monospace;
  max-height: 80px;
  overflow-y: auto;
}
```

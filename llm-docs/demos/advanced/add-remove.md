# Add / Remove

Dynamically add or remove panels using the `prepend()`, `append()`, and `remove()` API methods.



## Summary

### Key API Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| [`append`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#append) | `append(element): Panel[]` | Add after the last panel |
| [`prepend`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#prepend) | `prepend(element): Panel[]` | Add before the first panel |
| [`remove`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#remove) | `remove(index, count?): Panel[]` | Remove panel at specified index |

### Behavior Comparison

| Method | Index Change | Best For |
|--------|-------------|----------|
| `prepend` | Existing panel indices increase by +1 | Adding latest items to the front |
| `append` | Existing panel indices unchanged | Adding new items to the end of a feed |
| `remove` | Indices after removed panel decrease by -1 | Deleting items |

## Details

### Framework-Specific Patterns

**React / Vue**: Manipulate the panel array through the framework's state management. Flicking detects state changes and automatically updates panels.

**Vanilla JS**: Directly call the `prepend()`, `append()`, `remove()` methods on the Flicking instance. You can pass an HTMLElement or an outerHTML string as the `element` parameter.

### Related Options

- **Relationship with `renderOnlyVisible`**: When there are many panels, using `renderOnlyVisible: true` together maintains performance even with dynamic additions
- **Relationship with `needPanelThreshold`**: Can be combined with the `needPanel` event to implement an infinite scroll pattern

### Use Cases

> **Info: When should you use this?**
- Social media feeds: `prepend` new posts to the front, `append` older posts to the back
- E-commerce product lists: Remove/add panels based on filtering
- Dashboard widgets: Add/remove widgets

### Notes

> **Warning: Caution**
- When using `prepend`, all existing panel indices increase by 1. Be careful if you have logic that depends on indices.
- If the currently visible panel is removed after a `remove`, it automatically moves to an adjacent panel.
- In React/Vue, each panel must have a unique `key` to work properly.

## Related Links

### Related API
- [`append`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#append): Add after panels
- [`prepend`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#prepend): Add before panels
- [`remove`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#remove): Remove panels

### Related Demos
- [Infinite Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/infinite-scroll.md): Automatic panel addition with the `needPanel` event
- [Lazy Load](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/lazy-load.md): Optimization pattern used with `renderOnlyVisible`

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";
import { useState } from "react";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];

export default function App() {
  const [panels, setPanels] = useState([0, 1, 2, 3, 4]);
  const [counter, setCounter] = useState(5);

  const handlePrepend = () => {
    setPanels(prev => [counter, ...prev]);
    setCounter(c => c + 1);
  };

  const handleAppend = () => {
    setPanels(prev => [...prev, counter]);
    setCounter(c => c + 1);
  };

  const handleRemoveFirst = () => {
    if (panels.length > 1) {
      setPanels(prev => prev.slice(1));
    }
  };

  const handleRemoveLast = () => {
    if (panels.length > 1) {
      setPanels(prev => prev.slice(0, -1));
    }
  };

  return (
    <div>
      <Flicking renderOnlyVisible={true} align="prev" bound={true}>
        {panels.map(i => (
          <div className="flicking-panel" key={i} style={{ background: COLORS[i % COLORS.length] }}>
            {i}
          </div>
        ))}
      </Flicking>
      <div className="controls">
        <button className="button" onClick={handlePrepend}>
          Prepend
        </button>
        <button className="button" onClick={handleAppend}>
          Append
        </button>
        <button className="button danger" onClick={handleRemoveFirst}>
          Remove First
        </button>
        <button className="button danger" onClick={handleRemoveLast}>
          Remove Last
        </button>
      </div>
      <div className="info-bar">Panel count: {panels.length}</div>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <Flicking
      :options="{ renderOnlyVisible: true, align: 'prev', bound: true }"
    >
      <div v-for="i in panels" :key="i"
           class="flicking-panel"
           :style="{ background: COLORS[i % COLORS.length] }">
        {{ i }}
      </div>
    </Flicking>
    <div class="controls">
      <button class="button" @click="prepend">Prepend</button>
      <button class="button" @click="append">Append</button>
      <button class="button danger" @click="removeFirst">Remove First</button>
      <button class="button danger" @click="removeLast">Remove Last</button>
    </div>
    <div class="info-bar">Panel count: {{ panels.length }}</div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const panels = ref([0, 1, 2, 3, 4]);
let counter = 5;

const prepend = () => {
  panels.value = [counter++, ...panels.value];
};
const append = () => {
  panels.value = [...panels.value, counter++];
};
const removeFirst = () => {
  if (panels.value.length > 1) panels.value = panels.value.slice(1);
};
const removeLast = () => {
  if (panels.value.length > 1) panels.value = panels.value.slice(0, -1);
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
let counter = 5;

const camera = document.querySelector(".flicking-camera");
for (let i = 0; i < 5; i++) {
  const panel = document.createElement("div");
  panel.className = "flicking-panel";
  panel.style.background = COLORS[i % COLORS.length];
  panel.textContent = i;
  camera.appendChild(panel);
}

const flicking = new Flicking("#flick", {
  renderOnlyVisible: true,
  align: "prev",
  bound: true
});

const infoBar = document.querySelector(".info-bar");
const updateInfo = () => {
  infoBar.textContent = `Panel count: ${flicking.panelCount}`;
};

document.getElementById("btn-prepend").addEventListener("click", () => {
  flicking.prepend(
    `<div class="flicking-panel" style="background:${COLORS[counter % COLORS.length]}">${counter}</div>`
  );
  counter++;
  updateInfo();
});

document.getElementById("btn-append").addEventListener("click", () => {
  flicking.append(`<div class="flicking-panel" style="background:${COLORS[counter % COLORS.length]}">${counter}</div>`);
  counter++;
  updateInfo();
});

document.getElementById("btn-remove-first").addEventListener("click", () => {
  if (flicking.panelCount > 1) {
    flicking.remove(0);
    updateInfo();
  }
});

document.getElementById("btn-remove-last").addEventListener("click", () => {
  if (flicking.panelCount > 1) {
    flicking.remove(flicking.panelCount - 1);
    updateInfo();
  }
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
  <div id="app">
    <div id="flick" class="flicking-viewport">
      <div class="flicking-camera"></div>
    </div>
    <div class="controls">
      <button class="button" id="btn-prepend">Prepend</button>
      <button class="button" id="btn-append">Append</button>
      <button class="button danger" id="btn-remove-first">Remove First</button>
      <button class="button danger" id="btn-remove-last">Remove Last</button>
    </div>
    <div class="info-bar">Panel count: 5</div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 200px;
  height: 150px;
  margin-right: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 8px;
  flex-wrap: wrap;
}

.button {
  padding: 8px 16px;
  border: 2px solid #3498db;
  background: transparent;
  color: #3498db;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background: #3498db;
  color: white;
}

.button.danger {
  border-color: #e74c3c;
  color: #e74c3c;
}

.button.danger:hover {
  background: #e74c3c;
  color: white;
}

.info-bar {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  text-align: center;
}
```

# Render Only Visible

Use the [`renderOnlyVisible`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#renderonlyvisible) option to keep only visible panels in the DOM, improving performance.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`renderOnlyVisible`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#renderonlyvisible) | `boolean` | `false` | Keep only visible panels in the DOM |

### Mode Comparison

| Setting | DOM Panel Count | On Scroll | Memory |
|---------|----------------|-----------|--------|
| `false` (default) | All panels | No change | High |
| `true` | Only visible panels | DOM add/remove occurs | Low |

## Details

### How It Works

Setting `renderOnlyVisible: true` **removes DOM elements of non-visible panels from the camera container**.
When scrolling brings a new panel into view, it is added to the DOM, and panels that leave the viewport are removed from the DOM.

```js
// Vanilla JS
const flicking = new Flicking("#flick", {
  renderOnlyVisible: true
});
```

```tsx
// React
<Flicking renderOnlyVisible={true}>
  {panels.map(p => <Panel key={p.id} />)}
</Flicking>
```

### Difference Between Vanilla JS and Frameworks

This option **works in both Vanilla JS and frameworks**.

| Environment | Behavior | Effect |
|-------------|----------|--------|
| Vanilla JS | DOM removal/addition via `removeChild`/`appendChild` | Reduced DOM node count |
| React / Vue | DOM removal/addition via framework render cycle + component skip rendering | Reduced DOM node count + reduced rendering cost |

In frameworks, the component rendering cost itself is also reduced, resulting in a greater effect.

### Difference from the virtual Option

| Feature | `renderOnlyVisible` | `virtual` |
|---------|---------------------|-----------|
| DOM element count | Only visible panels (gradually added/removed) | `panelsPerView` + buffer (fixed) |
| Applicable environment | All environments | All environments |
| Panel content | No restrictions | Only innerHTML strings from `renderPanel` callback |
| Configuration complexity | Simple (`boolean`) | Complex (`renderPanel` callback required) |

### Use Cases

> **Info: When should you use renderOnlyVisible?**

**Recommended:**
- When there are many panels and you want to reduce DOM nodes
- When panel components are complex in frameworks
- When you want to avoid the complexity of virtual

**virtual is more suitable when:**
- There are very many panels (100+)
- Memory usage needs to be minimized
- Panel content is simple

## Related Links

### Related Options
- [`virtual`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#virtual): Virtualization that limits DOM elements themselves

### Related Demos
- [Virtual Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/virtual-scroll.md): Virtualization using the virtual option
- [Lazy Load](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/lazy-load.md): Lazy loading combined with renderOnlyVisible

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useCallback, useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const TOTAL = 20;
const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

export default function App() {
  const visibleRef = useRef(null);
  const normalRef = useRef(null);
  const [visibleDomCount, setVisibleDomCount] = useState(0);
  const [normalDomCount, setNormalDomCount] = useState(0);

  const updateCounts = useCallback(() => {
    if (visibleRef.current) {
      setVisibleDomCount(visibleRef.current.camera.element.children.length);
    }
    if (normalRef.current) {
      setNormalDomCount(normalRef.current.camera.element.children.length);
    }
  }, []);

  const panels = Array.from({ length: TOTAL }, (_, i) => (
    <div key={i} className="flicking-panel" style={{ background: COLORS[i % COLORS.length] }}>
      Panel {i + 1}
    </div>
  ));

  return (
    <div>
      {/* renderOnlyVisible: true */}
      <div className="demo-container">
        <div className="demo-label">renderOnlyVisible: true</div>
        <div className="demo-info">Non-visible panels are removed from the DOM. Try scrolling.</div>
        <Flicking
          ref={visibleRef}
          align="prev"
          renderOnlyVisible={true}
          onReady={updateCounts}
          onVisibleChange={updateCounts}
        >
          {panels}
        </Flicking>
        <div className="dom-counter">
          DOM panel count: <strong>{visibleDomCount}</strong> / {TOTAL} panels
        </div>
      </div>

      {/* renderOnlyVisible: false */}
      <div className="demo-container">
        <div className="demo-label">renderOnlyVisible: false (default)</div>
        <div className="demo-info">All panels are always present in the DOM.</div>
        <Flicking ref={normalRef} align="prev" renderOnlyVisible={false} onReady={updateCounts}>
          {panels}
        </Flicking>
        <div className="dom-counter">
          DOM panel count: <strong>{normalDomCount}</strong> / {TOTAL} panels
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
    <!-- renderOnlyVisible: true -->
    <div class="demo-container">
      <div class="demo-label">renderOnlyVisible: true</div>
      <div class="demo-info">Non-visible panels are removed from the DOM. Try scrolling.</div>
      <Flicking
        ref="visibleFlicking"
        :options="{ align: 'prev', renderOnlyVisible: true }"
        @ready="updateCounts"
        @visible-change="updateCounts"
      >
        <div
          v-for="i in 20"
          :key="'v-' + i"
          class="flicking-panel"
          :style="{ background: COLORS[(i - 1) % COLORS.length] }"
        >
          Panel {{ i }}
        </div>
      </Flicking>
      <div class="dom-counter">
        DOM panel count: <strong>{{ visibleDomCount }}</strong> / 20 panels
      </div>
    </div>

    <!-- renderOnlyVisible: false -->
    <div class="demo-container">
      <div class="demo-label">renderOnlyVisible: false (default)</div>
      <div class="demo-info">All panels are always present in the DOM.</div>
      <Flicking
        ref="normalFlicking"
        :options="{ align: 'prev' }"
        @ready="updateCounts"
      >
        <div
          v-for="i in 20"
          :key="'n-' + i"
          class="flicking-panel"
          :style="{ background: COLORS[(i - 1) % COLORS.length] }"
        >
          Panel {{ i }}
        </div>
      </Flicking>
      <div class="dom-counter">
        DOM panel count: <strong>{{ normalDomCount }}</strong> / 20 panels
      </div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { nextTick, ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];
const visibleFlicking = ref(null);
const normalFlicking = ref(null);
const visibleDomCount = ref(0);
const normalDomCount = ref(0);

const updateCounts = () => {
  nextTick(() => {
    if (visibleFlicking.value) {
      const el = visibleFlicking.value.$el;
      const camera = el.querySelector(".flicking-camera");
      if (camera) visibleDomCount.value = camera.children.length;
    }
    if (normalFlicking.value) {
      const el = normalFlicking.value.$el;
      const camera = el.querySelector(".flicking-camera");
      if (camera) normalDomCount.value = camera.children.length;
    }
  });
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const TOTAL = 20;
const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

// Create panels
function createPanels(cameraSelector) {
  const camera = document.querySelector(cameraSelector);
  for (let i = 0; i < TOTAL; i++) {
    const panel = document.createElement("div");
    panel.className = "flicking-panel";
    panel.style.background = COLORS[i % COLORS.length];
    panel.textContent = `Panel ${i + 1}`;
    camera.appendChild(panel);
  }
}

createPanels("#flick-visible .flicking-camera");
createPanels("#flick-normal .flicking-camera");

const visibleCountEl = document.getElementById("visible-count");
const normalCountEl = document.getElementById("normal-count");

function updateCounts() {
  visibleCountEl.textContent = document.querySelectorAll("#flick-visible .flicking-camera > .flicking-panel").length;
  normalCountEl.textContent = document.querySelectorAll("#flick-normal .flicking-camera > .flicking-panel").length;
}

// renderOnlyVisible: true
const visibleFlicking = new Flicking("#flick-visible", {
  align: "prev",
  renderOnlyVisible: true
});

visibleFlicking.on("ready", updateCounts);
visibleFlicking.on("visibleChange", updateCounts);

// renderOnlyVisible: false (default)
const normalFlicking = new Flicking("#flick-normal", {
  align: "prev"
});

normalFlicking.on("ready", updateCounts);
```

### HTML (for vanilla JS)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <!-- renderOnlyVisible: true -->
  <div class="demo-container">
    <div class="demo-label">renderOnlyVisible: true</div>
    <div class="demo-info">Non-visible panels are removed from the DOM. Try scrolling.</div>
    <div id="flick-visible" class="flicking-viewport">
      <div class="flicking-camera"></div>
    </div>
    <div class="dom-counter">
      DOM panel count: <strong id="visible-count">0</strong> / 20 panels
    </div>
  </div>

  <!-- renderOnlyVisible: false -->
  <div class="demo-container">
    <div class="demo-label">renderOnlyVisible: false (default)</div>
    <div class="demo-info">All panels are always present in the DOM.</div>
    <div id="flick-normal" class="flicking-viewport">
      <div class="flicking-camera"></div>
    </div>
    <div class="dom-counter">
      DOM panel count: <strong id="normal-count">0</strong> / 20 panels
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
.dom-counter {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
.dom-counter strong {
  color: #3e8ed0;
}
```

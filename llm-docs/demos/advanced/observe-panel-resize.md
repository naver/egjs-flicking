# Observe Panel Resize

Use the [`observePanelResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#observepanelresize) option to attach a `ResizeObserver` to each panel element, so that Flicking automatically recalculates the layout when a panel's size changes.

Try clicking the "Expand" button inside a panel to see the difference between the two carousels.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`observePanelResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#observepanelresize) | `boolean` | `false` | Detect panel element size changes via ResizeObserver |

### Dependent Option

`observePanelResize` only works when [`useResizeObserver`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#useresizeobserver) is `true`. Since the default value of `useResizeObserver` is `true`, it can be used without additional configuration.

### Value Comparison

| Value | Behavior | Best For |
|-------|----------|----------|
| `false` | Only detects viewport size changes (default) | Typical carousels with fixed panel sizes |
| `true` | Also detects per-panel size changes, auto-recalculates | Dynamic content, image loading, accordion panels |

## Details

### How observePanelResize Works

By default, Flicking's `autoResize` only detects size changes on the **viewport (container) element**. Even if the content inside a panel changes and the panel itself resizes, Flicking is unaware of it.

Setting `observePanelResize: true` attaches a `ResizeObserver` to each panel element. As soon as a panel's size changes, `beforeResize` / `afterResize` events are fired and the layout is recalculated.

```javascript
const flicking = new Flicking("#el", {
  observePanelResize: true
  // useResizeObserver: true (default, can be omitted)
});
```

### Use Cases

> **Info: When should you use this?**
- **Panels with images**: When panels grow to their actual size after image load completes
- **Accordion/toggle panels**: When panel height changes due to user interaction
- **Dynamic content**: When content is added to panels after an API response, changing their size
- **With `adaptive: true`**: When viewport height adapts to the active panel height and panel content changes dynamically

> **Warning: Performance Consideration**
`observePanelResize: true` attaches a ResizeObserver to every panel, which can introduce some overhead when there are many panels. For typical carousels with fixed panel sizes, keep the default (`false`).

> **Warning: Difference from resizeOnContentsReady**
[`resizeOnContentsReady`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizeoncontentsready) is an option that waits once for image/media load completion during initialization. `observePanelResize` continuously monitors panel sizes even after initialization. Choose based on your use case as they serve different purposes.

## Related Links

### Related Options
- [`useResizeObserver`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#useresizeobserver): Whether to use ResizeObserver (dependent option)
- [`autoResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize): Auto recalculate on viewport size change
- [`resizeOnContentsReady`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizeoncontentsready): Resize after initial content load completes
- [`adaptive`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#adaptive): Auto-adjust viewport height

### Related Demos
- [Adaptive](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/adaptive.md): Auto-adjust viewport height
- [Auto Resize](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/auto-resize.md): Resize detection method settings
- [Resize Debounce](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/resize-debounce.md): Control resize call frequency

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useRef } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

function setupButtons(flicking) {
  flicking.panels.forEach(panel => {
    const btn = panel.element.querySelector(".expand-btn");
    if (!btn) return;
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const isWide = panel.element.style.width === "70%";
      panel.element.style.width = isWide ? "40%" : "70%";
      btn.textContent = isWide ? "Expand" : "Shrink";
    });
  });
}

function FlickingDemo({ label, observePanelResize, hint }) {
  const ref = useRef(null);
  return (
    <div className="demo-container">
      <div className="demo-label">{label}</div>
      <Flicking
        ref={ref}
        align="center"
        observePanelResize={observePanelResize}
        onReady={() => setupButtons(ref.current)}
      >
        <div className="flicking-panel panel-1" style={{ width: "40%" }}>
          <div className="panel-inner">
            <span>Panel 1</span>
            <button className="expand-btn">Expand</button>
          </div>
        </div>
        <div className="flicking-panel panel-2" style={{ width: "40%" }}>
          <div className="panel-inner">
            <span>Panel 2</span>
            <button className="expand-btn">Expand</button>
          </div>
        </div>
        <div className="flicking-panel panel-3" style={{ width: "40%" }}>
          <div className="panel-inner">
            <span>Panel 3</span>
            <button className="expand-btn">Expand</button>
          </div>
        </div>
        <div className="flicking-panel panel-4" style={{ width: "40%" }}>
          <div className="panel-inner">
            <span>Panel 4</span>
            <button className="expand-btn">Expand</button>
          </div>
        </div>
        <div className="flicking-panel panel-5" style={{ width: "40%" }}>
          <div className="panel-inner">
            <span>Panel 5</span>
            <button className="expand-btn">Expand</button>
          </div>
        </div>
      </Flicking>
      <div className="demo-hint">{hint}</div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <FlickingDemo
        label="observePanelResize: false (default)"
        observePanelResize={false}
        hint="Flicking does not detect panel resizing, causing misaligned layout"
      />
      <FlickingDemo
        label="observePanelResize: true"
        observePanelResize={true}
        hint="Flicking automatically recalculates layout when panels are resized"
      />
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <!-- observePanelResize: false (default) -->
    <div class="demo-container">
      <div class="demo-label">observePanelResize: false (default)</div>
      <Flicking :options="{ align: 'center', observePanelResize: false }">
        <div
          v-for="(panel, i) in panels"
          :key="i"
          class="flicking-panel"
          :class="panel.bg"
          :style="{ width: panel.wide ? '70%' : '40%' }"
        >
          <div class="panel-inner">
            <span>Panel {{ i + 1 }}</span>
            <button @click.stop="panel.wide = !panel.wide">
              {{ panel.wide ? 'Shrink' : 'Expand' }}
            </button>
          </div>
        </div>
      </Flicking>
      <div class="demo-hint">Flicking does not detect panel resizing, causing misaligned layout</div>
    </div>

    <!-- observePanelResize: true -->
    <div class="demo-container">
      <div class="demo-label">observePanelResize: true</div>
      <Flicking :options="{ align: 'center', observePanelResize: true }">
        <div
          v-for="(panel, i) in panels2"
          :key="i"
          class="flicking-panel"
          :class="panel.bg"
          :style="{ width: panel.wide ? '70%' : '40%' }"
        >
          <div class="panel-inner">
            <span>Panel {{ i + 1 }}</span>
            <button @click.stop="panel.wide = !panel.wide">
              {{ panel.wide ? 'Shrink' : 'Expand' }}
            </button>
          </div>
        </div>
      </Flicking>
      <div class="demo-hint">Flicking automatically recalculates layout when panels are resized</div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const bgs = ["panel-1", "panel-2", "panel-3", "panel-4", "panel-5"];
const makePanels = () => bgs.map(bg => ({ bg, wide: false }));

const panels = ref(makePanels());
const panels2 = ref(makePanels());
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// observePanelResize: false (default)
const _flick1 = new Flicking("#flick-default", {
  align: "center",
  observePanelResize: false
});

// observePanelResize: true
const _flick2 = new Flicking("#flick-observe", {
  align: "center",
  observePanelResize: true
});

// Toggle panel width on button click
document.querySelectorAll(".expand-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const panel = btn.closest(".flicking-panel");
    const isWide = panel.style.width === "70%";
    panel.style.width = isWide ? "40%" : "70%";
    btn.textContent = isWide ? "Expand" : "Shrink";
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
  <!-- observePanelResize: false (default) -->
  <div class="demo-container">
    <div class="demo-label">observePanelResize: false (default)</div>
    <div id="flick-default" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1" style="width:40%">
          <div class="panel-inner"><span>Panel 1</span><button class="expand-btn">Expand</button></div>
        </div>
        <div class="flicking-panel panel-2" style="width:40%">
          <div class="panel-inner"><span>Panel 2</span><button class="expand-btn">Expand</button></div>
        </div>
        <div class="flicking-panel panel-3" style="width:40%">
          <div class="panel-inner"><span>Panel 3</span><button class="expand-btn">Expand</button></div>
        </div>
        <div class="flicking-panel panel-4" style="width:40%">
          <div class="panel-inner"><span>Panel 4</span><button class="expand-btn">Expand</button></div>
        </div>
        <div class="flicking-panel panel-5" style="width:40%">
          <div class="panel-inner"><span>Panel 5</span><button class="expand-btn">Expand</button></div>
        </div>
      </div>
    </div>
    <div class="demo-hint">Flicking does not detect panel resizing, causing misaligned layout</div>
  </div>

  <!-- observePanelResize: true -->
  <div class="demo-container">
    <div class="demo-label">observePanelResize: true</div>
    <div id="flick-observe" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1" style="width:40%">
          <div class="panel-inner"><span>Panel 1</span><button class="expand-btn">Expand</button></div>
        </div>
        <div class="flicking-panel panel-2" style="width:40%">
          <div class="panel-inner"><span>Panel 2</span><button class="expand-btn">Expand</button></div>
        </div>
        <div class="flicking-panel panel-3" style="width:40%">
          <div class="panel-inner"><span>Panel 3</span><button class="expand-btn">Expand</button></div>
        </div>
        <div class="flicking-panel panel-4" style="width:40%">
          <div class="panel-inner"><span>Panel 4</span><button class="expand-btn">Expand</button></div>
        </div>
        <div class="flicking-panel panel-5" style="width:40%">
          <div class="panel-inner"><span>Panel 5</span><button class="expand-btn">Expand</button></div>
        </div>
      </div>
    </div>
    <div class="demo-hint">Flicking automatically recalculates layout when panels are resized</div>
  </div>

</body>
</html>
```

### CSS
```css
.flicking-panel {
  height: 120px;
  transition: width 0.3s;
}

.panel-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 8px;
}
.panel-inner button {
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: inherit;
  border-radius: 4px;
}

.demo-hint {
  margin-top: 6px;
  font-size: 13px;
  color: #888;
}
```

# Percentage Position

Apply the camera element's `transform` position as a percentage value (`%`) instead of `px` using the [`usePercentagePos`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#usepercentagepos) option.

The demo below disables [`autoResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize) to simulate the moment before [`resize()`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#resize) is applied. Toggle the container width and compare the two carousels — the px-positioned one gets misaligned until `resize()` is called, while the %-positioned one keeps its relative position.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`usePercentagePos`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#usepercentagepos) | `boolean` | `false` | Apply the camera position as a percentage value (`%`) instead of `px` |

### Behavior Comparison

| Setting | Camera transform | On viewport size change (before resize) |
|---------|------------------|------------------------------------------|
| `usePercentagePos: false` | `translate(-832px)` | Camera stays at the same px position, so panels get misaligned |
| `usePercentagePos: true` | `translate(-104%)` | Camera keeps its relative position, so panels stay in place |

## Details

### How It Works

When enabled, Flicking calculates the camera position as a percentage relative to the viewport size and applies it as `transform: translate(-104%)` instead of `translate(-832px)`.

Since a percentage position scales together with the viewport, the camera keeps its relative position even before the internal sizes are recalculated by [`resize()`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#resize). When the panels are also sized with relative units (`%`-based widths and margins like this demo), the whole layout stays visually aligned during viewport size changes.

### Related Options

- **Relationship with `autoResize`**: In real-world usage you'd keep [`autoResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize) enabled. `usePercentagePos` prevents the temporary misalignment between the moment the layout changes and the moment the (possibly debounced) resize call is applied. This demo disables it only to make that in-between moment observable.
- **Relationship with `resizeDebounce`**: With a large [`resizeDebounce`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizedebounce) value, the gap until resize is applied gets longer. `usePercentagePos` keeps panels in place during that gap.

### Use Cases

> **Info: When should you use this?**
- **Responsive (%-based) layouts**: Panels keep their position while the container size changes, such as during window resizes or CSS transitions
- **Debounced resize**: Prevents visible misalignment during the debounce delay when using `resizeDebounce`

### Notes

> **Warning: Caution**
- The percentage position keeps panels visually aligned only when the panel sizes are also relative to the viewport (e.g., `%`-based widths). Panels with fixed px sizes will still be misaligned until `resize()` is called.
- This option only changes how the camera position is *applied*. The internal sizes are not updated automatically — `resize()` still has to be called (or `autoResize` kept enabled) to update the input areas and movement boundaries.

## Related Links

### Related Options
- [`autoResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize): Automatic resize detection
- [`resizeDebounce`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizedebounce): Resize call debounce
- [`useFractionalSize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#usefractionalsize): CSS-computed fractional sizes

### Related Methods
- [`resize`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#resize): Recalculate the internal sizes

### Related Demos
- [Resize Debounce](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/resize-debounce.md): Control resize call frequency
- [Auto Resize](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/auto-resize.md): Resize detection method settings

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const PANELS = [1, 2, 3, 4, 5];

function DemoSection({ label, usePercentagePos, width, flickingRef }) {
  const [transform, setTransform] = useState("");

  const updateTransform = e => {
    setTransform(e.currentTarget.camera.element.style.transform);
  };

  return (
    <div className="demo-section">
      <div className="demo-label">{label}</div>
      <div style={{ width }}>
        {/* autoResize is disabled to simulate the moment before resize() is applied */}
        <Flicking
          ref={flickingRef}
          usePercentagePos={usePercentagePos}
          autoResize={false}
          defaultIndex={2}
          onReady={updateTransform}
          onMove={updateTransform}
          onAfterResize={updateTransform}
        >
          {PANELS.map(num => (
            <div key={num} className={`flicking-panel panel-${num}`}>
              {num}
            </div>
          ))}
        </Flicking>
      </div>
      <div className="transform-bar">
        transform: <span>{transform}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [narrow, setNarrow] = useState(false);
  const flickingPx = useRef(null);
  const flickingPercent = useRef(null);
  const width = narrow ? "60%" : "100%";

  const callResize = () => {
    flickingPx.current?.resize();
    flickingPercent.current?.resize();
  };

  return (
    <div>
      <div className="demo-hint">
        1. Toggle the container width — the px-positioned carousel gets misaligned, while the %-positioned one keeps its
        place.
        <br />
        2. Call resize() to recalculate the internal sizes and fix the misalignment.
      </div>

      <div className="controls">
        <button className="button" onClick={() => setNarrow(!narrow)}>
          Toggle width
        </button>
        <button className="button" onClick={callResize}>
          Call resize()
        </button>
        <span className="value-label">width: {width}</span>
      </div>

      <DemoSection
        label="usePercentagePos: false (default)"
        usePercentagePos={false}
        width={width}
        flickingRef={flickingPx}
      />
      <DemoSection label="usePercentagePos: true" usePercentagePos={true} width={width} flickingRef={flickingPercent} />
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <div class="demo-hint">
      1. Toggle the container width — the px-positioned carousel gets misaligned, while the %-positioned one keeps its place.<br />
      2. Call resize() to recalculate the internal sizes and fix the misalignment.
    </div>

    <div class="controls">
      <button class="button" @click="toggleWidth">Toggle width</button>
      <button class="button" @click="callResize">Call resize()</button>
      <span class="value-label">width: {{ width }}</span>
    </div>

    <!-- autoResize is disabled to simulate the moment before resize() is applied -->
    <div class="demo-section">
      <div class="demo-label">usePercentagePos: false (default)</div>
      <div :style="{ width }">
        <Flicking
          ref="flickingPx"
          :options="{ usePercentagePos: false, autoResize: false, defaultIndex: 2 }"
          @ready="updateTransformPx"
          @move="updateTransformPx"
          @after-resize="updateTransformPx"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="transform-bar">transform: <span>{{ transformPx }}</span></div>
    </div>

    <div class="demo-section">
      <div class="demo-label">usePercentagePos: true</div>
      <div :style="{ width }">
        <Flicking
          ref="flickingPercent"
          :options="{ usePercentagePos: true, autoResize: false, defaultIndex: 2 }"
          @ready="updateTransformPercent"
          @move="updateTransformPercent"
          @after-resize="updateTransformPercent"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="transform-bar">transform: <span>{{ transformPercent }}</span></div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const width = ref("100%");
const transformPx = ref("");
const transformPercent = ref("");
const flickingPx = ref(null);
const flickingPercent = ref(null);

const updateTransformPx = e => {
  transformPx.value = e.currentTarget.camera.element.style.transform;
};
const updateTransformPercent = e => {
  transformPercent.value = e.currentTarget.camera.element.style.transform;
};

const toggleWidth = () => {
  width.value = width.value === "100%" ? "60%" : "100%";
};

const callResize = () => {
  flickingPx.value.resize();
  flickingPercent.value.resize();
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// autoResize is disabled to simulate the moment before resize() is applied
const flickingPx = new Flicking("#flick-px", {
  usePercentagePos: false,
  autoResize: false,
  defaultIndex: 2
});

const flickingPercent = new Flicking("#flick-percent", {
  usePercentagePos: true,
  autoResize: false,
  defaultIndex: 2
});

const transformElPx = document.getElementById("transform-px");
const transformElPercent = document.getElementById("transform-percent");

function updateTransform(flicking, el) {
  el.textContent = flicking.camera.element.style.transform;
}

flickingPx.on("move", () => updateTransform(flickingPx, transformElPx));
flickingPx.on("afterResize", () => updateTransform(flickingPx, transformElPx));
flickingPercent.on("move", () => updateTransform(flickingPercent, transformElPercent));
flickingPercent.on("afterResize", () => updateTransform(flickingPercent, transformElPercent));

updateTransform(flickingPx, transformElPx);
updateTransform(flickingPercent, transformElPercent);

// Toggle the container width (100% ↔ 60%)
const wraps = [document.getElementById("wrap-px"), document.getElementById("wrap-percent")];
const widthLabel = document.getElementById("width-value");
let narrow = false;

document.getElementById("toggle-width").addEventListener("click", () => {
  narrow = !narrow;
  const width = narrow ? "60%" : "100%";
  wraps.forEach(wrap => {
    wrap.style.width = width;
  });
  widthLabel.textContent = width;
});

// Recalculate the internal sizes manually
document.getElementById("call-resize").addEventListener("click", () => {
  flickingPx.resize();
  flickingPercent.resize();
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
    1. Toggle the container width — the px-positioned carousel gets misaligned, while the %-positioned one keeps its place.<br />
    2. Call resize() to recalculate the internal sizes and fix the misalignment.
  </div>

  <div class="controls">
    <button id="toggle-width" class="button">Toggle width</button>
    <button id="call-resize" class="button">Call resize()</button>
    <span class="value-label">width: <span id="width-value">100%</span></span>
  </div>

  <div class="demo-section">
    <div class="demo-label">usePercentagePos: false (default)</div>
    <div id="wrap-px" style="width: 100%">
      <div id="flick-px" class="flicking-viewport">
        <div class="flicking-camera">
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </div>
      </div>
    </div>
    <div class="transform-bar">transform: <span id="transform-px"></span></div>
  </div>

  <div class="demo-section">
    <div class="demo-label">usePercentagePos: true</div>
    <div id="wrap-percent" style="width: 100%">
      <div id="flick-percent" class="flicking-viewport">
        <div class="flicking-camera">
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </div>
      </div>
    </div>
    <div class="transform-bar">transform: <span id="transform-percent"></span></div>
  </div>
</body>
</html>
```

### CSS
```css
/* %-based panel sizes so panels scale together with the viewport */
.flicking-panel {
  width: 60%;
  height: 120px;
  margin-right: 2%;
}

.controls {
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 16px;
}

.controls .value-label {
  margin-left: auto;
  font-size: 13px;
  color: #666;
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

.transform-bar {
  margin-top: 6px;
  padding: 6px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
  color: #333;
}
```

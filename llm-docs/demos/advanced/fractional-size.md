# Fractional Size

Use the [`useFractionalSize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#usefractionalsize) option to prevent 1px misalignment errors in panels with fractional sizes.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`useFractionalSize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#usefractionalsize) | `boolean` | `false` | Calculate sizes with fractional precision |

### Mode Comparison

| Setting | Size Measurement Method | Precision | Performance |
|---------|------------------------|-----------|-------------|
| `false` (default) | `offsetWidth` / `clientWidth` | Integer (rounded) | Fast |
| `true` | `parseFloat(computedStyle.width)` | Fractional | Slightly slower |

## Details

### The 1px Misalignment Problem

When panel width is fractional (e.g., `199.5px` in a `200px` viewport), `offsetWidth` rounds it to `200px`.
Flicking uses that rounded value for snap position calculations, so panels gradually drift from their actual CSS position.

```
Viewport: 200px, Panel: 199.5px, defaultIndex: 2

offsetWidth (integer):
  Panel size = 200px (rounded from 199.5)
  Panel 2 position = 2 × 200 = 400px   ← 1px off from actual 399px

computedStyle (fractional):
  Panel size = 199.5px (precise)
  Panel 2 position = 2 × 199.5 = 399px ← correct
```

The error grows with index: panel 4 is off by 2px, panel 6 by 3px, and so on.

### How It Works

```javascript
// false (default): uses offsetWidth (integer)
const width = panel.offsetWidth; // 200 (rounded from 199.5)

// true: uses parseFloat(computedStyle.width) (fractional)
const width = parseFloat(getComputedStyle(panel).width); // 199.5 (precise)
```

Setting `useFractionalSize: true` makes Flicking internally calculate sizes with fractional precision.

### Use Cases

> **Info: When should you use useFractionalSize?**

**Recommended:**
- When panel width is set in % units (33.33%, 16.66%, etc.)
- When panel alignment is slightly off
- When precise rendering is needed on high-resolution displays

**Not necessary:**
- When panel width is an integer px (200px, 300px, etc.)
- When minor alignment errors are not a concern
- When performance is a priority

### Notes

> **Warning: Performance Consideration**
`parseFloat(computedStyle.width)` is slightly slower than `offsetWidth`. Consider the performance impact when there are many panels or frequent resizes occur.

## Related Links

### Related Options
- [`autoResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize): Auto resize
- [`useResizeObserver`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#useresizeobserver): Whether to use ResizeObserver

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#48c78e", "#f14668", "#ffe08a"];

export default function App() {
  return (
    <div>
      <div className="demo-container">
        <div className="demo-label">useFractionalSize: false (default)</div>
        <Flicking useFractionalSize={false} defaultIndex={2} style={{ width: "200px" }}>
          {COLORS.map((color, i) => (
            <div key={i} className="flicking-panel" style={{ width: "199.5px", height: "200px", background: color }}>
              {i + 1}
            </div>
          ))}
        </Flicking>
      </div>

      <div className="demo-container">
        <div className="demo-label">useFractionalSize: true</div>
        <Flicking useFractionalSize={true} defaultIndex={2} style={{ width: "200px" }}>
          {COLORS.map((color, i) => (
            <div key={i} className="flicking-panel" style={{ width: "199.5px", height: "200px", background: color }}>
              {i + 1}
            </div>
          ))}
        </Flicking>
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
      <div class="demo-label">useFractionalSize: false (default)</div>
      <Flicking :options="{ useFractionalSize: false, defaultIndex: 2 }" :style="{ width: '200px' }">
        <div
          v-for="(color, i) in colors"
          :key="'false-' + i"
          class="flicking-panel"
          :style="{ width: '199.5px', height: '200px', background: color }"
        >
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>

    <div class="demo-container">
      <div class="demo-label">useFractionalSize: true</div>
      <Flicking :options="{ useFractionalSize: true, defaultIndex: 2 }" :style="{ width: '200px' }">
        <div
          v-for="(color, i) in colors"
          :key="'true-' + i"
          class="flicking-panel"
          :style="{ width: '199.5px', height: '200px', background: color }"
        >
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const colors = ref(["#3e8ed0", "#00d1b2", "#48c78e", "#f14668", "#ffe08a"]);
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

new Flicking("#flick-false", {
  defaultIndex: 2,
  useFractionalSize: false
});

new Flicking("#flick-true", {
  defaultIndex: 2,
  useFractionalSize: true
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
  <div class="demo-container">
    <div class="demo-label">useFractionalSize: false (default)</div>
    <div id="flick-false" class="flicking-viewport" style="width: 200px">
      <div class="flicking-camera">
        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #3e8ed0">1</div>
        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #00d1b2">2</div>
        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #48c78e">3</div>
        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #f14668">4</div>
        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #ffe08a">5</div>
      </div>
    </div>
  </div>

  <div class="demo-container">
    <div class="demo-label">useFractionalSize: true</div>
    <div id="flick-true" class="flicking-viewport" style="width: 200px">
      <div class="flicking-camera">
        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #3e8ed0">1</div>
        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #00d1b2">2</div>
        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #48c78e">3</div>
        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #f14668">4</div>
        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #ffe08a">5</div>
      </div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-viewport {
  margin: 0 auto 8px;
}

.flicking-panel {
  margin-right: 0;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.demo-container {
  margin-bottom: 24px;
}

.demo-label {
  font-weight: bold;
  margin-bottom: 8px;
}
```

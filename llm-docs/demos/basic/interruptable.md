# Interruptable

The [`interruptable`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#interruptable) option controls whether user drag input is allowed while a panel animation is in progress.

Press the button to start a 2-second animation, then try dragging during it to see the difference.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`interruptable`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#interruptable) | `boolean` | `true` | Allow user input during animation |
| [`changeOnHold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#changeonhold) | `boolean` | `false` | Whether to immediately update the panel index during drag |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `true` | Responds immediately to drag during animation (default) | General carousels, fast browsing |
| `false` | Ignores drag until animation completes | Presentations, ensuring complete animation playback |

## Details

### How Interruptable Works

When `interruptable: true` (default), Flicking accepts user input during animation and immediately transitions to a new drag. If a user drags while a panel is being moved by a button, the new drag starts from the current position at that moment.

When `interruptable: false`, it waits until the animation is fully complete before accepting the next input. Useful for slideshows or presentations where each transition effect needs to be shown completely.

```javascript
// Default: drag is possible during animation
const flicking = new Flicking("#el", {
  interruptable: true
});

// Allow input only after animation completes
const flicking = new Flicking("#el", {
  interruptable: false,
  duration: 1000
});
```

### changeOnHold

The `changeOnHold` option determines whether to immediately update the current panel index when a user pauses during a drag and "holds" a panel. With the default `false`, the index changes when the snap completes after release.

### Use Cases

> **Info: When to use?**
- **interruptable: true** (default): General image galleries, product lists, and other carousels where users freely browse
- **interruptable: false**: Presentation slides, onboarding screens where each slide transition animation must be shown completely

> **Warning: Caution**
When `interruptable: false` with a long `duration`, users may feel frustrated waiting for input. Use only when necessary.

## Related Links

### Related Options
- [`duration`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration): Animation duration
- [`changeOnHold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#changeonhold): Immediately update panel index during drag

### Related Demos
- [Duration](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/duration.md): Setting animation duration
- [Easing](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/easing.md): Animation acceleration curve

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useRef } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  return (
    <div>
      {/* interruptable: true (default) */}
      <div className="demo-container">
        <div className="demo-label">interruptable: true (default — drag during animation)</div>
        <Flicking ref={ref1} duration={2000} align="center" interruptable={true}>
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
        <div className="controls">
          <button onClick={() => ref1.current?.next().catch(() => {})}>Next (start 2s animation)</button>
        </div>
        <div className="demo-hint">Drag during animation to interrupt it immediately</div>
      </div>

      {/* interruptable: false */}
      <div className="demo-container">
        <div className="demo-label">interruptable: false (ignores drag until animation ends)</div>
        <Flicking ref={ref2} duration={2000} align="center" interruptable={false}>
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
        <div className="controls">
          <button onClick={() => ref2.current?.next().catch(() => {})}>Next (start 2s animation)</button>
        </div>
        <div className="demo-hint">Drag is ignored until the animation completes</div>
      </div>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <!-- interruptable: true (default) -->
    <div class="demo-container">
      <div class="demo-label">interruptable: true (default — drag during animation)</div>
      <Flicking ref="flick1" :options="{ duration: 2000, align: 'center', interruptable: true }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="next1">Next (start 2s animation)</button>
      </div>
      <div class="demo-hint">Drag during animation to interrupt it immediately</div>
    </div>

    <!-- interruptable: false -->
    <div class="demo-container">
      <div class="demo-label">interruptable: false (ignores drag until animation ends)</div>
      <Flicking ref="flick2" :options="{ duration: 2000, align: 'center', interruptable: false }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="next2">Next (start 2s animation)</button>
      </div>
      <div class="demo-hint">Drag is ignored until the animation completes</div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const flick1 = ref(null);
const flick2 = ref(null);

const next1 = () => {
  flick1.value.next().catch(() => {});
};
const next2 = () => {
  flick2.value.next().catch(() => {});
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// interruptable: true (default)
const flick1 = new Flicking("#flick-interruptable", {
  duration: 2000,
  align: "center",
  interruptable: true
});

document.getElementById("btn1").addEventListener("click", () => {
  flick1.next().catch(() => {});
});

// interruptable: false
const flick2 = new Flicking("#flick-not-interruptable", {
  duration: 2000,
  align: "center",
  interruptable: false
});

document.getElementById("btn2").addEventListener("click", () => {
  flick2.next().catch(() => {});
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
  <!-- interruptable: true (default) -->
  <div class="demo-container">
    <div class="demo-label">interruptable: true (default — drag during animation)</div>
    <div id="flick-interruptable" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
    <div class="controls">
      <button id="btn1">Next (start 2s animation)</button>
    </div>
    <div class="demo-hint">Drag during animation to interrupt it immediately</div>
  </div>

  <!-- interruptable: false -->
  <div class="demo-container">
    <div class="demo-label">interruptable: false (ignores drag until animation ends)</div>
    <div id="flick-not-interruptable" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
    <div class="controls">
      <button id="btn2">Next (start 2s animation)</button>
    </div>
    <div class="demo-hint">Drag is ignored until the animation completes</div>
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
}
.controls button {
  margin-right: 8px;
  padding: 6px 12px;
  cursor: pointer;
}
.demo-hint {
  margin-top: 6px;
  font-size: 13px;
  color: #888;
}
```

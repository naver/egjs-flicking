# Auto Init

The [`autoInit`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoinit) option controls whether `init()` is automatically called when a Flicking instance is created. Set it to `false` when deferred initialization is needed.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`autoInit`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoinit) | `boolean` | `true` | Automatically call init() on creation |
| [`preventEventsBeforeInit`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#preventeventsbeforeinit) | `boolean` | `true` | Prevent events from firing before init() is called |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `true` | Initializes immediately on instance creation (default) | General usage |
| `false` | Requires manual init() call | Deferred initialization, initializing after dynamically adding panels |

## Details

### How autoInit Works
When `autoInit: true`, `init()` is automatically executed when `new Flicking()` is called. `init()` performs panel size calculation, event binding, initial position setup, and more.

```javascript
// Automatic initialization (default)
const flicking = new Flicking("#el", { autoInit: true });
// Already initialized, ready to use

// Manual initialization
const flicking = new Flicking("#el", { autoInit: false });
// Not yet initialized, dragging disabled
flicking.init(); // Now initialized
```

### State Before Initialization
When created with `autoInit: false`, until `init()` is called:
- Drag/touch input is ignored
- Panel positions are not calculated
- Event listeners are not bound

### preventEventsBeforeInit

This option is relevant when using deferred initialization with `autoInit: false`. When set to the default `true`, Flicking events such as `ready`, `willChange`, and `changed` will not fire until `init()` is called. This prevents event handlers from being unintentionally triggered before initialization.

If set to `false`, some events may fire before initialization, so it is recommended to keep the default unless there is a specific reason.

```javascript
const flicking = new Flicking("#el", {
  autoInit: false,
  preventEventsBeforeInit: true // Default: prevent events before init()
});

flicking.on("ready", () => {
  console.log("Only runs after init() is called");
});

flicking.init(); // Events start being received from here
```

### Use Cases

> **Info: When to use?**
- **autoInit: true**: Regular carousels, static panels
- **autoInit: false**:
  - Creating panels after loading data from an API
  - Hidden Flicking inside tabs/modals
  - When initialization is needed after DOM dimensions are finalized

### Notes

> **Warning: Calling methods before initialization**
Calling `moveTo()`, `prev()`, etc. while `autoInit: false` may cause errors. Make sure to call `init()` first.

> **Warning: Initializing hidden elements**
Initializing while in `display: none` state may cause incorrect size calculations. Either call `init()` when the element is visible, or call `resize()` after it becomes visible.

## Related Links

### Related Options
- [`defaultIndex`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#defaultindex): Initial panel index
- [`preventEventsBeforeInit`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#preventeventsbeforeinit): Prevent events before init()

### Related Demos
- [Default Index](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/default-index.md): Initial panel setup

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  const flickingRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleInit = () => {
    if (flickingRef.current && !isInitialized) {
      flickingRef.current.init();
      setIsInitialized(true);
    }
  };

  return (
    <div>
      {/* autoInit: true (default) */}
      <div className="demo-container">
        <div className="demo-label">autoInit: true (default, initializes immediately)</div>
        <Flicking autoInit={true} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* autoInit: false (manual init) */}
      <div className="demo-container">
        <div className="demo-label">autoInit: false (initialize on button click)</div>
        <Flicking ref={flickingRef} autoInit={false} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
        <div className="controls">
          <button onClick={handleInit} disabled={isInitialized}>
            {isInitialized ? "Initialized" : "Call init()"}
          </button>
        </div>
        <div className="status">
          Status: {isInitialized ? "initialized - drag enabled" : "not initialized - drag disabled"}
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
    <!-- autoInit: true (default) -->
    <div class="demo-container">
      <div class="demo-label">autoInit: true (default, initializes immediately)</div>
      <Flicking :options="{ autoInit: true, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- autoInit: false (manual init) -->
    <div class="demo-container">
      <div class="demo-label">autoInit: false (initialize on button click)</div>
      <Flicking ref="flicking" :options="{ autoInit: false, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="handleInit" :disabled="isInitialized">
          {{ isInitialized ? "Initialized" : "Call init()" }}
        </button>
      </div>
      <div class="status">
        Status: {{ isInitialized ? "initialized - drag enabled" : "not initialized - drag disabled" }}
      </div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const flicking = ref(null);
const isInitialized = ref(false);

const handleInit = () => {
  if (!isInitialized.value) {
    flicking.value.init();
    isInitialized.value = true;
  }
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// autoInit: true (default)
new Flicking("#flick-auto", {
  autoInit: true,
  align: "center"
});

// autoInit: false (manual init)
const flickingManual = new Flicking("#flick-manual", {
  autoInit: false,
  align: "center"
});

let isInitialized = false;
const button = document.getElementById("init-btn");
const status = document.getElementById("init-status");

button.addEventListener("click", () => {
  if (!isInitialized) {
    flickingManual.init();
    isInitialized = true;
    button.textContent = "Initialized";
    button.disabled = true;
    status.textContent = "Status: initialized - drag enabled";
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
  <!-- autoInit: true (default) -->
  <div class="demo-container">
    <div class="demo-label">autoInit: true (default, initializes immediately)</div>
    <div id="flick-auto" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- autoInit: false (manual init) -->
  <div class="demo-container">
    <div class="demo-label">autoInit: false (initialize on button click)</div>
    <div id="flick-manual" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
    <div class="controls">
      <button id="init-btn">Call init()</button>
    </div>
    <div class="status" id="init-status">Status: not initialized - drag disabled</div>
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
.status {
  margin-top: 4px;
  font-size: 14px;
  color: #888;
}
```

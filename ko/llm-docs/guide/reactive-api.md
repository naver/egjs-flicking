# Reactive API

The Reactive API provides automatically synchronized state properties for Flicking, eliminating the need for manual event listeners and state management boilerplate.

---

## Overview

When building carousel UIs, you often need to reflect Flicking's internal state in surrounding elements like pagination dots, progress bars, or navigation buttons. The traditional approach requires listening to multiple events and manually keeping your UI in sync.

The Reactive API solves this by exposing **reactive state properties** that update automatically whenever Flicking's state changes.

### Traditional Approach vs Reactive API

  
**JavaScript:**

**Traditional (event-based):**
```js
const flicking = new Flicking("#el");

let progress = 0;
let isReachStart = true;
let isReachEnd = false;

flicking.on("move", () => {
  const cam = flicking.camera;
  progress = ((cam.position - cam.range.min) / (cam.range.max - cam.range.min)) * 100;
  updateProgressBar(progress);
});

flicking.on("changed", () => {
  isReachStart = flicking.index === 0;
  isReachEnd = flicking.index === flicking.panelCount - 1;
  updateButtons(isReachStart, isReachEnd);
});
```

**Reactive API:**
```js
const flicking = new Flicking("#el");
const reactive = connectFlickingReactiveAPI(flicking);

reactive.subscribe("progress", (value) => updateProgressBar(value));
reactive.subscribe("isReachStart", (value) => updateButtons(value, reactive.isReachEnd));
reactive.subscribe("isReachEnd", (value) => updateButtons(reactive.isReachStart, value));
```

  
  
**React:**

**Traditional (event-based):**
```jsx
function App() {
  const flickingRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isReachStart, setIsReachStart] = useState(true);
  const [isReachEnd, setIsReachEnd] = useState(false);

  useEffect(() => {
    const flicking = flickingRef.current;
    if (!flicking) return;

    const onMove = () => {
      const cam = flicking.camera;
      const ratio = (cam.position - cam.range.min) / (cam.range.max - cam.range.min);
      setProgress(ratio * 100);
    };
    const onChanged = () => {
      setIsReachStart(flicking.index === 0);
      setIsReachEnd(flicking.index === flicking.panelCount - 1);
    };

    flicking.on("move", onMove);
    flicking.on("changed", onChanged);
    return () => {
      flicking.off("move", onMove);
      flicking.off("changed", onChanged);
    };
  }, []);

  return (/* ... */);
}
```

**Reactive API:**
```jsx
function App() {
  const flickingRef = useRef(null);
  const { progress, isReachStart, isReachEnd } = useFlickingReactiveAPI(flickingRef);

  return (/* ... */);
}
```

  
  
**Vue3:**

**Traditional (event-based):**
```vue
<script setup>
const flickingRef = ref(null);
const progress = ref(0);
const isReachStart = ref(true);
const isReachEnd = ref(false);

const onMove = (e) => {
  const cam = e.currentTarget.camera;
  const ratio = (cam.position - cam.range.min) / (cam.range.max - cam.range.min);
  progress.value = ratio * 100;
};

const onChanged = (e) => {
  const flicking = e.currentTarget;
  isReachStart.value = flicking.index === 0;
  isReachEnd.value = flicking.index === flicking.panelCount - 1;
};
</script>

<template>
  <Flicking ref="flickingRef" @move="onMove" @changed="onChanged">
    <!-- panels -->
  </Flicking>
</template>
```

**Reactive API:**
```vue
<script setup>
const flickingRef = ref(null);
const { progress, isReachStart, isReachEnd } = useFlickingReactiveAPI(flickingRef);
</script>

<template>
  <Flicking ref="flickingRef">
    <!-- panels -->
  </Flicking>
</template>
```

  

---

## Key Benefits

1. **Less boilerplate**: No manual event listeners, `useState`, or `useEffect` to keep UI in sync.
2. **Framework-native**: Returns React state / Vue3 reactive refs that integrate naturally with your components and any UI libraries you use.
3. **Auto-sync**: State updates are never missed. Drag, programmatic moves, and panel additions all trigger updates automatically.
4. **SSR-ready**: Pre-set initial values to match server-rendered markup and avoid hydration flicker.

---

## Getting Started

  
**JavaScript:**

```js
import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";

const flicking = new Flicking("#el");
const reactive = connectFlickingReactiveAPI(flicking);

// Read current values
console.log(reactive.currentPanelIndex);
console.log(reactive.progress);

// Subscribe to changes
reactive.subscribe("currentPanelIndex", (value) => {
  console.log("Panel changed to:", value);
});

// Use methods
reactive.moveTo(2);
```

`connectFlickingReactiveAPI` returns a reactive object. Use `.subscribe()` to listen for state changes.

  
  
**React:**

```jsx
import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";

function App() {
  const flickingRef = useRef(null);
  const {
    currentPanelIndex,
    totalPanelCount,
    progress,
    indexProgress,
    isReachStart,
    isReachEnd,
    moveTo
  } = useFlickingReactiveAPI(flickingRef);

  return (
    <Flicking ref={flickingRef}>
      <div>Panel 1
      <div>Panel 2
      <div>Panel 3
    </Flicking>
  );
}
```

`useFlickingReactiveAPI` is a React hook that returns reactive state values. When state changes, the component re-renders automatically.

  
  
**Vue3:**

```vue
<script setup>
import { ref } from "vue";
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";

const flickingRef = ref(null);
const {
  currentPanelIndex,
  totalPanelCount,
  progress,
  indexProgress,
  isReachStart,
  isReachEnd,
  moveTo
} = useFlickingReactiveAPI(flickingRef);
</script>

<template>
  <Flicking ref="flickingRef">
    <div>Panel 1
    <div>Panel 2
    <div>Panel 3
  </Flicking>
</template>
```

`useFlickingReactiveAPI` is a Vue3 composable that returns reactive refs. Templates update automatically when state changes.

  

---

## Reactive State

| Property | Type | Description |
|----------|------|-------------|
| [`currentPanelIndex`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#currentpanelindex) | `number` | Index of the currently active panel |
| [`totalPanelCount`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#totalpanelcount) | `number` | Total number of panels |
| [`progress`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#progress) | `number` | Overall scroll progress as a percentage (0-100) |
| [`indexProgress`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#indexprogress) | `number` | Camera position as a fractional panel index (e.g., `2.5` means halfway between panel 2 and 3) |
| [`isReachStart`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#isreachstart) | `boolean` | Whether the first panel is currently active |
| [`isReachEnd`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md#isreachend) | `boolean` | Whether the last panel is currently active |

> **Tip: progress vs indexProgress**
- **`progress`** is best for continuous indicators like progress bars. It ranges from 0 to 100 and works well with `moveType: "freeScroll"`.
- **`indexProgress`** is best for per-panel visual effects like parallax or coverflow. It provides fractional values between panel indices and updates in real-time during drag.

## Reactive Methods

| Method | Type | Description |
|--------|------|-------------|
| [`moveTo`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveMethod.md#moveto) | `(index: number) => Promise<void>` | Move to a specific panel by index. Ignores calls while animating. |

---

## SSR Optimization

When using SSR (Server-Side Rendering), you can provide initial values to prevent layout shifts during hydration:

  
**JavaScript:**

```js
const reactive = connectFlickingReactiveAPI(flicking, {
  defaultIndex: 2,
  totalPanelCount: 10
});
```

  
  
**React:**

```jsx
const { currentPanelIndex } = useFlickingReactiveAPI(flickingRef, {
  defaultIndex: 2,       // Start at panel 2
  totalPanelCount: 10    // Pre-set panel count
});
```

  
  
**Vue3:**

```js
const { currentPanelIndex } = useFlickingReactiveAPI(flickingRef, {
  defaultIndex: 2,
  totalPanelCount: 10
});
```

  

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`defaultIndex`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveAPIOptions.md#defaultindex) | `number` | `0` | Initial panel index. Also affects `isReachStart`, `isReachEnd`, and `indexProgress` initial values. |
| [`totalPanelCount`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveAPIOptions.md#totalpanelcount) | `number` | `0` | Initial panel count. Prevents layout shifts when pagination UI depends on this value. |

---

## Next Steps

- **[Demos](https://naver.github.io/egjs-flicking/llm-docs/demos/reactive/progress-bar.md)**: See Reactive API in action with interactive examples
- **[API Reference](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingReactiveState.md)**: Full type definitions and property details

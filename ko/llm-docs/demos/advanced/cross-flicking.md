# Cross Flicking

[`CrossFlicking`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/CrossFlicking.md) is a preset class that combines a horizontal and vertical `Flicking` into a single 2D carousel. Swipe **horizontally** to switch between groups and **vertically** to browse items within a group.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`sideOptions`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/CrossFlickingOptions.md#sideoptions) | `Partial<FlickingOptions>` | `{}` | Options applied to the auto-created vertical (side) Flicking instances |
| [`preserveIndex`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/CrossFlickingOptions.md#preserveindex) | `boolean` | `true` | Keep each group's own side index when switching groups |
| [`disableSlideOnHold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/CrossFlickingOptions.md#disableslideonhold) | `boolean` | `true` | Lock the perpendicular axis while dragging one direction |
| [`disableIndexSync`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/CrossFlickingOptions.md#disableindexsync) | `boolean` | `false` | Disable automatic index synchronization between main/side |

`CrossFlicking` also accepts every [`FlickingOptions`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md) (e.g. `moveType`, `bound`) which apply to the horizontal main axis.

### Structure

| Level | Direction | Role |
|-------|-----------|------|
| Main Flicking (`CrossFlicking`) | Horizontal (↔) | Navigation between groups |
| Side Flicking (auto-created) | Vertical (↕) | Navigation within a group |

Each **group** is a direct child of the camera — a wrapper `<div>` whose children become the vertical side panels.

## Details

### How CrossFlicking Works

`CrossFlicking` reads the group structure from the DOM at initialization, then rebuilds each group into an independent vertical `Flicking`. The outer instance handles horizontal movement between groups, while each group manages its own vertical movement — producing a grid-like 2D navigation from a single class.

### Authoring per Framework

Across all frameworks the demo drives the core `CrossFlicking` class imperatively: group the panels with a wrapper `<div>` and pass the viewport element to the constructor.

```js
import { CrossFlicking } from "@egjs/flicking"; // or "@egjs/vue3-flicking"

new CrossFlicking("#cross", {
  align: "prev",
  moveType: "strict",
  bound: true,
  sideOptions: { moveType: "strict", bound: true }
});
```

```html
<div id="cross" class="flicking-viewport">
  <div class="flicking-camera">
    <div><!-- group: Nature -->
      <div class="cross-panel">Forest
      <div class="cross-panel">Meadow
    
    <div><!-- group: Ocean -->
      <div class="cross-panel">Reef
      <div class="cross-panel">Wave
    
  

```

> **Warning: React / Vue**
`@egjs/react-flicking` also exports `CrossFlicking`/`CrossGroup` components, but they currently break under React StrictMode (the instance is destroyed before its async init completes). Until that is fixed, drive the core class from `useEffect`/`onMounted` as this demo does. Vue3 has no dedicated wrapper, so the core class is the only option there.

### Events

Main-axis events (`changed`, `willChange`) carry an extra `sideIndex` field pointing to the active group's side index. Side-axis events are prefixed with `side` and carry `mainIndex` to identify which group moved.

| Event | Payload | Description |
|-------|---------|-------------|
| [`changed`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingEvents.md#changed) | `{ index, sideIndex }` | The horizontal (group) index changed |
| `sideChanged` | `{ index, mainIndex }` | A group's vertical (item) index changed |
| `sideWillChange` | `{ index, mainIndex }` | A group's vertical index is about to change |

### Related Options

- **Combination with `moveType: "strict"`**: Moves exactly one group/item per swipe for clear grid navigation.
- **Combination with `bound: true`**: Prevents empty space at the edges of both axes.
- **`sideOptions`**: Configure the vertical instances independently from the horizontal one.

### Use Cases

> **Info: When should you use this?**
- Category-based galleries (horizontal for categories, vertical for items)
- Story/reel viewers (horizontal for authors, vertical for posts)
- Dashboards (horizontal for sections, vertical for cards)

### Notes

> **Warning: Caution**
- Give the viewport an explicit height, since the vertical side instances need a fixed layout height.
- `CrossFlicking` rebuilds the group DOM on initialization; author groups as wrapper elements rather than expecting the original markup to remain unchanged.
- Vue has no `CrossFlicking`/`CrossGroup` component wrapper — use the core class through `ref` + `onMounted`, and call `destroy()` on unmount.

## Related Links

### Related APIs
- [`CrossFlicking`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/CrossFlicking.md): 2D cross-directional carousel preset class
- [`CrossFlickingOptions`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/CrossFlickingOptions.md): CrossFlicking configuration

### Related Demos
- [Nested](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/nested.md): On/off comparison of the `nested` option for same-direction nesting
- [Fullpage Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/fullpage-scroll.md): Vertical fullpage pattern

## Code

### React
```jsx
import { CrossFlicking } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";
import { useEffect, useRef } from "react";

// The panel structure is declared in JSX; the core CrossFlicking class is attached to it on mount.
// react-flicking's CrossFlicking/CrossGroup components are avoided for now because they break
// under React StrictMode (destroyed before their async init completes).
const CATEGORIES = [
  {
    name: "Nature",
    items: [
      { title: "Forest", gradient: "linear-gradient(135deg, #0f9b70, #1e5631)" },
      { title: "Meadow", gradient: "linear-gradient(135deg, #56ab2f, #a8e063)" },
      { title: "Canyon", gradient: "linear-gradient(135deg, #3ca55c, #b5ac49)" }
    ]
  },
  {
    name: "Ocean",
    items: [
      { title: "Reef", gradient: "linear-gradient(135deg, #2193b0, #6dd5ed)" },
      { title: "Wave", gradient: "linear-gradient(135deg, #1a2980, #26d0ce)" },
      { title: "Deep", gradient: "linear-gradient(135deg, #000046, #1cb5e0)" }
    ]
  },
  {
    name: "Sunset",
    items: [
      { title: "Dawn", gradient: "linear-gradient(135deg, #ff9966, #ff5e62)" },
      { title: "Dusk", gradient: "linear-gradient(135deg, #f7971e, #ffd200)" },
      { title: "Ember", gradient: "linear-gradient(135deg, #cb2d3e, #ef473a)" }
    ]
  },
  {
    name: "Space",
    items: [
      { title: "Nebula", gradient: "linear-gradient(135deg, #654ea3, #eaafc8)" },
      { title: "Aurora", gradient: "linear-gradient(135deg, #4776e6, #8e54e9)" },
      { title: "Cosmos", gradient: "linear-gradient(135deg, #200122, #6f0000)" }
    ]
  }
];

export default function App() {
  const viewportRef = useRef(null);
  const flickingRef = useRef(null);

  useEffect(() => {
    // The ref keeps a single instance across StrictMode's double-invoke.
    if (flickingRef.current) return;
    flickingRef.current = new CrossFlicking(viewportRef.current, {
      align: "prev",
      moveType: "strict",
      bound: true,
      sideOptions: { moveType: "strict", bound: true }
    });
  }, []);

  return (
    <div ref={viewportRef} className="cross-viewport flicking-viewport">
      <div className="flicking-camera">
        {CATEGORIES.map((category, ci) => (
          <div className="cross-group" key={ci}>
            {category.items.map((it, ii) => (
              <div className="cross-panel" key={ii} style={{ background: it.gradient }}>
                <span className="panel-category">{category.name}</span>
                <span className="panel-title">{it.title}</span>
                <span className="panel-hint">↕ browse items · ↔ switch category</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div ref="viewport" class="cross-viewport flicking-viewport">
    <div class="flicking-camera">
      <div v-for="(category, ci) in CATEGORIES" :key="ci" class="cross-group">
        <div v-for="(it, ii) in category.items" :key="ii"
             class="cross-panel" :style="{ background: it.gradient }">
          <span class="panel-category">{{ category.name }}</span>
          <span class="panel-title">{{ it.title }}</span>
          <span class="panel-hint">↕ browse items · ↔ switch category</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CrossFlicking } from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { onBeforeUnmount, onMounted, ref } from "vue";

// Vue3 has no dedicated CrossFlicking wrapper, so the core class is used imperatively.
const CATEGORIES = [
  {
    name: "Nature",
    items: [
      { title: "Forest", gradient: "linear-gradient(135deg, #0f9b70, #1e5631)" },
      { title: "Meadow", gradient: "linear-gradient(135deg, #56ab2f, #a8e063)" },
      { title: "Canyon", gradient: "linear-gradient(135deg, #3ca55c, #b5ac49)" }
    ]
  },
  {
    name: "Ocean",
    items: [
      { title: "Reef", gradient: "linear-gradient(135deg, #2193b0, #6dd5ed)" },
      { title: "Wave", gradient: "linear-gradient(135deg, #1a2980, #26d0ce)" },
      { title: "Deep", gradient: "linear-gradient(135deg, #000046, #1cb5e0)" }
    ]
  },
  {
    name: "Sunset",
    items: [
      { title: "Dawn", gradient: "linear-gradient(135deg, #ff9966, #ff5e62)" },
      { title: "Dusk", gradient: "linear-gradient(135deg, #f7971e, #ffd200)" },
      { title: "Ember", gradient: "linear-gradient(135deg, #cb2d3e, #ef473a)" }
    ]
  },
  {
    name: "Space",
    items: [
      { title: "Nebula", gradient: "linear-gradient(135deg, #654ea3, #eaafc8)" },
      { title: "Aurora", gradient: "linear-gradient(135deg, #4776e6, #8e54e9)" },
      { title: "Cosmos", gradient: "linear-gradient(135deg, #200122, #6f0000)" }
    ]
  }
];

const viewport = ref(null);
let flicking = null;

onMounted(() => {
  flicking = new CrossFlicking(viewport.value, {
    align: "prev",
    moveType: "strict",
    bound: true,
    sideOptions: { moveType: "strict", bound: true }
  });
});

onBeforeUnmount(() => {
  if (flicking) flicking.destroy();
});
</script>
```

### JavaScript
```js
import { CrossFlicking } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// The panel structure lives in index.html; attaching CrossFlicking is all that's needed.
new CrossFlicking("#cross", {
  align: "prev",
  moveType: "strict",
  bound: true,
  sideOptions: { moveType: "strict", bound: true }
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
    <!--
      Structure: viewport > camera > group > panel
      Each direct child of the camera is a group (a vertical column of panels).
      Swipe horizontally to switch groups, vertically to move within a group.
    -->
    <div id="cross" class="cross-viewport flicking-viewport">
      <div class="flicking-camera">
        <div class="cross-group">
          <div class="cross-panel" style="background: linear-gradient(135deg, #0f9b70, #1e5631)">
            <span class="panel-category">Nature</span>
            <span class="panel-title">Forest</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
          <div class="cross-panel" style="background: linear-gradient(135deg, #56ab2f, #a8e063)">
            <span class="panel-category">Nature</span>
            <span class="panel-title">Meadow</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
          <div class="cross-panel" style="background: linear-gradient(135deg, #3ca55c, #b5ac49)">
            <span class="panel-category">Nature</span>
            <span class="panel-title">Canyon</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
        </div>
        <div class="cross-group">
          <div class="cross-panel" style="background: linear-gradient(135deg, #2193b0, #6dd5ed)">
            <span class="panel-category">Ocean</span>
            <span class="panel-title">Reef</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
          <div class="cross-panel" style="background: linear-gradient(135deg, #1a2980, #26d0ce)">
            <span class="panel-category">Ocean</span>
            <span class="panel-title">Wave</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
          <div class="cross-panel" style="background: linear-gradient(135deg, #000046, #1cb5e0)">
            <span class="panel-category">Ocean</span>
            <span class="panel-title">Deep</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
        </div>
        <div class="cross-group">
          <div class="cross-panel" style="background: linear-gradient(135deg, #ff9966, #ff5e62)">
            <span class="panel-category">Sunset</span>
            <span class="panel-title">Dawn</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
          <div class="cross-panel" style="background: linear-gradient(135deg, #f7971e, #ffd200)">
            <span class="panel-category">Sunset</span>
            <span class="panel-title">Dusk</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
          <div class="cross-panel" style="background: linear-gradient(135deg, #cb2d3e, #ef473a)">
            <span class="panel-category">Sunset</span>
            <span class="panel-title">Ember</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
        </div>
        <div class="cross-group">
          <div class="cross-panel" style="background: linear-gradient(135deg, #654ea3, #eaafc8)">
            <span class="panel-category">Space</span>
            <span class="panel-title">Nebula</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
          <div class="cross-panel" style="background: linear-gradient(135deg, #4776e6, #8e54e9)">
            <span class="panel-category">Space</span>
            <span class="panel-title">Aurora</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
          <div class="cross-panel" style="background: linear-gradient(135deg, #200122, #6f0000)">
            <span class="panel-category">Space</span>
            <span class="panel-title">Cosmos</span>
            <span class="panel-hint">↕ browse items · ↔ switch category</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.cross-viewport {
  width: 100%;
  max-width: 360px;
  height: 320px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
}

/* Each main panel doubles as a vertical side viewport (built by CrossFlicking). */
.cross-viewport > .flicking-camera > .flicking-panel {
  width: 100%;
  height: 320px;
  margin: 0;
}

.cross-viewport .cross-panel {
  width: 100%;
  height: 320px;
  margin: 0;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  text-align: center;
}

.cross-viewport .panel-category {
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.85;
}

.cross-viewport .panel-title {
  font-size: 28px;
  font-weight: 700;
}

.cross-viewport .panel-hint {
  margin-top: 12px;
  font-size: 12px;
  font-weight: 400;
  opacity: 0.8;
}
```

# Movement Types

The [`moveType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype) option controls panel movement and snap behavior. Three modes are available: snap, freeScroll, and strict.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`moveType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype) | `"snap" \| "freeScroll" \| "strict" \| object` | `"snap"` | Movement behavior mode |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `"snap"` | Snaps by panel unit. Can skip multiple panels depending on drag distance | General carousels, image galleries |
| `"freeScroll"` | Free scrolling without snapping. Inertia applied | Horizontal scroll lists, tab bars |
| `"strict"` | Moves exactly one panel at a time | Onboarding, step-by-step guides, fullscreen sliders |

## Details

### "snap" in Detail
This is the default. After dragging, it snaps to the nearest panel when released. Multiple panels can be skipped depending on drag speed and distance.

**snap with count**: You can limit the number of panels to move at once.
```javascript
moveType: { type: "snap", count: 2 }  // Move up to 2 panels at a time
```

### "freeScroll" in Detail
Moves freely like native scrolling without snapping to panels. Inertia based on drag speed is applied. The current panel index is determined by the panel closest to the center of the screen.

**stopAtEdge option**: Sets whether to stop at the boundary.
```javascript
moveType: ["freeScroll", { stopAtEdge: true }]
```

### "strict" in Detail
Moves exactly one panel per flick. No matter how fast you drag, only one panel moves at a time. Use when you need to prevent users from skipping content.

### Related Options
- **Relationship with bound**: In freeScroll mode, it is recommended to use `bound: true` together. Otherwise, it may scroll beyond the boundaries.
- **Relationship with threshold**: `threshold` is the minimum drag distance required for panel transition. Particularly important in `strict` mode.
- **Relationship with duration**: Controls the duration of the snap animation.

### Use Cases

> **Info: When to use?**
- **"snap"**: General carousels, image galleries, product sliders
- **"freeScroll"**: Horizontal scroll menus, tab bars, tag lists, UI that needs a native scroll feel
- **"strict"**: Onboarding screens, tutorials, step-by-step guides, preventing content skipping

### Notes

> **Warning: When using freeScroll**
`freeScroll` mode scrolls beyond boundaries by default. Set `bound: true` together to restrict the boundaries.

> **Warning: strict mode**
`strict` mode restricts user freedom. Use only when sequential navigation is required, such as onboarding.

## Related Links

### Related Options
- [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound): Boundary restriction (recommended with freeScroll)
- [`threshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#threshold): Minimum drag distance for panel transition
- [`duration`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration): Animation duration

### Related Demos
- [Alignment](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/alignment.md): Panel alignment
- [Bound](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/bound.md): Boundary restriction mode
- [Threshold](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/threshold.md): Drag threshold

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* moveType: "snap" (default) */}
      <div className="demo-container">
        <div className="demo-label">moveType: "snap" (default)</div>
        <Flicking moveType="snap" align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* moveType: "freeScroll" */}
      <div className="demo-container">
        <div className="demo-label">moveType: "freeScroll" (free scroll)</div>
        <Flicking moveType="freeScroll" align="center" bound={true}>
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* moveType: "strict" */}
      <div className="demo-container">
        <div className="demo-label">moveType: "strict" (one panel at a time)</div>
        <Flicking moveType="strict" align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
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
    <!-- moveType: "snap" (default) -->
    <div class="demo-container">
      <div class="demo-label">moveType: "snap" (default)</div>
      <Flicking :options="{ moveType: 'snap', align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- moveType: "freeScroll" -->
    <div class="demo-container">
      <div class="demo-label">moveType: "freeScroll" (free scroll)</div>
      <Flicking :options="{ moveType: 'freeScroll', align: 'center', bound: true }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- moveType: "strict" -->
    <div class="demo-container">
      <div class="demo-label">moveType: "strict" (one panel at a time)</div>
      <Flicking :options="{ moveType: 'strict', align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// moveType: "snap" (default)
new Flicking("#flick-snap", {
  moveType: "snap",
  align: "center"
});

// moveType: "freeScroll"
new Flicking("#flick-free", {
  moveType: "freeScroll",
  align: "center",
  bound: true
});

// moveType: "strict"
new Flicking("#flick-strict", {
  moveType: "strict",
  align: "center"
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
  <!-- moveType: "snap" (default) -->
  <div class="demo-container">
    <div class="demo-label">moveType: "snap" (default)</div>
    <div id="flick-snap" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- moveType: "freeScroll" -->
  <div class="demo-container">
    <div class="demo-label">moveType: "freeScroll" (free scroll)</div>
    <div id="flick-free" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- moveType: "strict" -->
  <div class="demo-container">
    <div class="demo-label">moveType: "strict" (one panel at a time)</div>
    <div id="flick-strict" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
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
```

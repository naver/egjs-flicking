# Deceleration

The [`deceleration`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#deceleration) option sets the deceleration rate of inertial movement after a user flick. Higher values cause it to stop faster, while lower values make it travel farther.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`deceleration`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#deceleration) | `number` | `0.0075` | Inertial movement deceleration rate |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `0.001` | Slow deceleration, travels far | Fast browsing of long lists, freeScroll |
| `0.0075` | Moderate deceleration (default) | General carousels |
| `0.05` | Fast deceleration, stops nearby | Precise control, one panel at a time |

## Details

### How Deceleration Works
When a user releases after dragging, inertial movement occurs based on the flick speed. `deceleration` determines the deceleration rate of this inertia.

```javascript
// Low value: inertia lasts longer, travels far
deceleration: 0.001

// Default: moderate inertia
deceleration: 0.0075

// High value: stops quickly
deceleration: 0.05
```

### Physical Meaning
`deceleration` is similar to a friction coefficient. The larger the value, the stronger the friction causing it to stop quickly; the smaller the value, the farther it slides.

### Related Options
- **Relationship with moveType**: The deceleration effect is more pronounced with `moveType: "freeScroll"`. In "snap" mode, the difference may be less noticeable since it moves to a snap position.
- **Relationship with duration**: deceleration determines the inertial movement distance, while duration determines the snap animation time.

### Use Cases

> **Info: When to use?**
- **Low value (0.001-0.005)**: Fast scrolling through long lists, freeScroll mode
- **Default (0.0075)**: General carousels, image galleries
- **High value (0.01-0.05)**: When precise control is needed, one panel at a time

### Notes

> **Warning: Extreme values caution**
Very low values (close to 0) give a feeling of endless scrolling, while very high values may make it feel like flick gestures are being ignored.

## Related Links

### Related Options
- [`moveType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype): Movement behavior mode (effect is more pronounced with freeScroll)
- [`duration`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration): Snap animation time

### Related Demos
- [Movement Types](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/movement-types.md): freeScroll mode
- [Duration](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/duration.md): Animation time

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* deceleration: 0.001 (long inertia) */}
      <div className="demo-container">
        <div className="demo-label">deceleration: 0.001 (long inertia, travels far)</div>
        <Flicking deceleration={0.001} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* deceleration: 0.0075 (default) */}
      <div className="demo-container">
        <div className="demo-label">deceleration: 0.0075 (default)</div>
        <Flicking deceleration={0.0075} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* deceleration: 0.05 (short inertia) */}
      <div className="demo-container">
        <div className="demo-label">deceleration: 0.05 (short inertia, stops quickly)</div>
        <Flicking deceleration={0.05} align="center">
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
    <!-- deceleration: 0.001 (long inertia) -->
    <div class="demo-container">
      <div class="demo-label">deceleration: 0.001 (long inertia, travels far)</div>
      <Flicking :options="{ deceleration: 0.001, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- deceleration: 0.0075 (default) -->
    <div class="demo-container">
      <div class="demo-label">deceleration: 0.0075 (default)</div>
      <Flicking :options="{ deceleration: 0.0075, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- deceleration: 0.05 (short inertia) -->
    <div class="demo-container">
      <div class="demo-label">deceleration: 0.05 (short inertia, stops quickly)</div>
      <Flicking :options="{ deceleration: 0.05, align: 'center' }">
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

// deceleration: 0.001 (long inertia)
new Flicking("#flick-low", {
  deceleration: 0.001,
  align: "center"
});

// deceleration: 0.0075 (default)
new Flicking("#flick-default", {
  deceleration: 0.0075,
  align: "center"
});

// deceleration: 0.05 (short inertia)
new Flicking("#flick-high", {
  deceleration: 0.05,
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
  <!-- deceleration: 0.001 (long inertia) -->
  <div class="demo-container">
    <div class="demo-label">deceleration: 0.001 (long inertia, travels far)</div>
    <div id="flick-low" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- deceleration: 0.0075 (default) -->
  <div class="demo-container">
    <div class="demo-label">deceleration: 0.0075 (default)</div>
    <div id="flick-default" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- deceleration: 0.05 (short inertia) -->
  <div class="demo-container">
    <div class="demo-label">deceleration: 0.05 (short inertia, stops quickly)</div>
    <div id="flick-high" class="flicking-viewport">
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

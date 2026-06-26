# Easing

The [`easing`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#easing) option sets the animation curve for panel movement. Specified as a function that takes a progress value (0-1) and returns the actual movement ratio.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`easing`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#easing) | `(x: number) => number` | `easeOutCubic` | Animation curve function |

### Comparison by Value

| Function | Behavior | Suitable For |
|----------|----------|--------------|
| `linear` | Moves at constant speed | Mechanical feel, progress indicators |
| `easeOutCubic` | Starts fast, ends slow | Natural deceleration, general UI |
| `easeInOutQuad` | Slow, fast, then slow | Smooth transitions, presentations |

## Details

### Easing Function Format
An easing function takes a progress value between 0 and 1 and returns the actual movement ratio.

```javascript
// linear: constant speed
const linear = x => x;

// easeOutCubic: starts fast, ends slow (default)
const easeOutCubic = x => 1 - Math.pow(1 - x, 3);

// easeInOutQuad: accelerates then decelerates
const easeInOutQuad = x => x < 0.5
  ? 2 * x * x
  : 1 - Math.pow(-2 * x + 2, 2) / 2;
```

### Key Easing Patterns
- **linear**: Input = output. Moves at constant speed
- **easeOut**: Fast at the beginning, slow at the end (deceleration). Natural stopping
- **easeIn**: Slow at the beginning, fast at the end (acceleration). Emphasizes the start
- **easeInOut**: Accelerates then decelerates. Smooth transitions

### Related Options
- **Relationship with duration**: `duration` determines the animation time, while `easing` determines the velocity change pattern during that time. Combine both to create various effects.

### Use Cases

> **Info: When to use?**
- **linear**: Loading progress indicators, mechanical UI
- **easeOut (default)**: General carousels, natural snapping
- **easeInOut**: Presentations, onboarding, emphasizing smooth transitions

### Notes

> **Warning: Easing function rules**
The easing function must satisfy `f(0) = 0` and `f(1) = 1`. Breaking this rule will cause the animation to malfunction.

## Related Links

### External References
- [Easing Functions Cheat Sheet](https://easings.net/) - Visualization of various easing functions

### Related Options
- [`duration`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration): Animation duration

### Related Demos
- [Duration](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/duration.md): Adjusting animation time

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

// Easing functions
const linear = x => x;
const easeOutCubic = x => 1 - (1 - x) ** 3;
const easeInOutQuad = x => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

export default function App() {
  return (
    <div>
      {/* linear */}
      <div className="demo-container">
        <div className="demo-label">easing: linear (constant speed)</div>
        <Flicking easing={linear} duration={800} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* easeOutCubic (default) */}
      <div className="demo-container">
        <div className="demo-label">easing: easeOutCubic (default, fast start → slow end)</div>
        <Flicking easing={easeOutCubic} duration={800} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* easeInOutQuad */}
      <div className="demo-container">
        <div className="demo-label">easing: easeInOutQuad (slow start → fast → slow end)</div>
        <Flicking easing={easeInOutQuad} duration={800} align="center">
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
    <!-- linear -->
    <div class="demo-container">
      <div class="demo-label">easing: linear (constant speed)</div>
      <Flicking :options="{ easing: linear, duration: 800, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- easeOutCubic (default) -->
    <div class="demo-container">
      <div class="demo-label">easing: easeOutCubic (default, fast start → slow end)</div>
      <Flicking :options="{ easing: easeOutCubic, duration: 800, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- easeInOutQuad -->
    <div class="demo-container">
      <div class="demo-label">easing: easeInOutQuad (slow start → fast → slow end)</div>
      <Flicking :options="{ easing: easeInOutQuad, duration: 800, align: 'center' }">
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

const linear = x => x;
const easeOutCubic = x => 1 - (1 - x) ** 3;
const easeInOutQuad = x => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// Easing functions
const linear = x => x;
const easeOutCubic = x => 1 - (1 - x) ** 3;
const easeInOutQuad = x => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

// linear
new Flicking("#flick-linear", {
  easing: linear,
  duration: 800,
  align: "center"
});

// easeOutCubic (default)
new Flicking("#flick-ease-out", {
  easing: easeOutCubic,
  duration: 800,
  align: "center"
});

// easeInOutQuad
new Flicking("#flick-ease-in-out", {
  easing: easeInOutQuad,
  duration: 800,
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
  <!-- linear -->
  <div class="demo-container">
    <div class="demo-label">easing: linear (constant speed)</div>
    <div id="flick-linear" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- easeOutCubic (default) -->
  <div class="demo-container">
    <div class="demo-label">easing: easeOutCubic (default, fast start → slow end)</div>
    <div id="flick-ease-out" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- easeInOutQuad -->
  <div class="demo-container">
    <div class="demo-label">easing: easeInOutQuad (slow start → fast → slow end)</div>
    <div id="flick-ease-in-out" class="flicking-viewport">
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

# Duration

The [`duration`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration) option sets the duration of the panel snap animation in milliseconds.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`duration`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration) | `number` | `500` | Animation duration (ms) |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `100` or less | Near-instant snap | UI requiring fast response, games |
| `300-500` | Natural speed | General carousels, image galleries |
| `1000` or more | Slow transition | Presentations, emphasis effects |

## Details

### How Duration Works
After finishing a drag and releasing, the panel snaps to the target position. `duration` is the time it takes for this snap animation to complete.

```javascript
// Various duration values
duration: 100   // Fast snap (0.1s)
duration: 500   // Default (0.5s)
duration: 1500  // Slow snap (1.5s)
duration: 0     // Move instantly without animation
```

### Related Options
- **Relationship with easing**: `duration` determines the animation time, while `easing` determines the animation curve. Combine both to create various transition effects.
- **Relationship with moveType**: With `moveType: "freeScroll"`, inertial scrolling is applied and may behave differently from duration.

### Use Cases

> **Info: When to use?**
- **Short duration (100-300ms)**: UI where fast response matters, tab switching, game interfaces
- **Default duration (400-600ms)**: General carousels, image galleries
- **Long duration (800ms+)**: Presentations, onboarding, emphasizing transition effects

### Notes

> **Warning: Using duration: 0**
Setting `duration: 0` causes instant movement without animation. Be cautious as the lack of visual feedback may confuse users.

> **Warning: Too long duration**
A duration over 1 second may make users feel like they are waiting. Unless intentional, around 500ms is recommended.

## Related Links

### Related Options
- [`easing`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#easing): Animation curve
- [`moveType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype): Movement behavior mode

### Related Demos
- [Easing](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/easing.md): Adjusting the animation curve
- [Movement Types](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/movement-types.md): Movement behavior modes

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* duration: 100 (fast) */}
      <div className="demo-container">
        <div className="demo-label">duration: 100 (fast animation)</div>
        <Flicking duration={100} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* duration: 500 (default) */}
      <div className="demo-container">
        <div className="demo-label">duration: 500 (default)</div>
        <Flicking duration={500} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* duration: 1500 (slow) */}
      <div className="demo-container">
        <div className="demo-label">duration: 1500 (slow animation)</div>
        <Flicking duration={1500} align="center">
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
    <!-- duration: 100 (fast) -->
    <div class="demo-container">
      <div class="demo-label">duration: 100 (fast animation)</div>
      <Flicking :options="{ duration: 100, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- duration: 500 (default) -->
    <div class="demo-container">
      <div class="demo-label">duration: 500 (default)</div>
      <Flicking :options="{ duration: 500, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- duration: 1500 (slow) -->
    <div class="demo-container">
      <div class="demo-label">duration: 1500 (slow animation)</div>
      <Flicking :options="{ duration: 1500, align: 'center' }">
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

// duration: 100 (fast)
new Flicking("#flick-fast", {
  duration: 100,
  align: "center"
});

// duration: 500 (default)
new Flicking("#flick-default", {
  duration: 500,
  align: "center"
});

// duration: 1500 (slow)
new Flicking("#flick-slow", {
  duration: 1500,
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
  <!-- duration: 100 (fast) -->
  <div class="demo-container">
    <div class="demo-label">duration: 100 (fast animation)</div>
    <div id="flick-fast" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- duration: 500 (default) -->
  <div class="demo-container">
    <div class="demo-label">duration: 500 (default)</div>
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

  <!-- duration: 1500 (slow) -->
  <div class="demo-container">
    <div class="demo-label">duration: 1500 (slow animation)</div>
    <div id="flick-slow" class="flicking-viewport">
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

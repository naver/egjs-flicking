# Threshold

The [`threshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#threshold) option sets the minimum drag distance in pixels required for panel transition. Dragging less than this value will return to the original panel.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`threshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#threshold) | `number` | `40` | Minimum drag distance for panel transition (px) |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `10` | Easy transition with short drag | Fast browsing, when sensitive response is needed |
| `40` | Moderate drag required (default) | General carousels |
| `100` | Long drag required, short drags return to original | Preventing accidental transitions, when careful transitions are needed |

## Details

### How Threshold Works
When a user releases after dragging, if the movement distance is greater than the threshold, the panel transitions to the next/previous panel; if less, it returns to the original panel.

```javascript
// Low value: sensitive transition
threshold: 10  // Transitions when dragged 10px or more

// Default
threshold: 40  // Transitions when dragged 40px or more

// High value: careful transition
threshold: 100  // Transitions when dragged 100px or more
```

### Related Options
- **Relationship with moveType: "strict"**: In "strict" mode, threshold is particularly important in determining whether to transition one panel.
- **Difference from dragThreshold**: `dragThreshold` is the minimum distance for drag recognition, while `threshold` is the minimum distance for panel transition.

### Use Cases

> **Info: When to use?**
- **Low value (10-20px)**: Fast content browsing, when you want to increase swipe sensitivity
- **Default (40px)**: General carousels, image galleries
- **High value (80-100px)**: Preventing accidental transitions, when showing important content

### Notes

> **Warning: Too low threshold**
If the threshold is too low, unintended panel transitions may occur. On touch devices in particular, scrolling and swiping may be confused.

> **Warning: Too high threshold**
If the threshold is too high, users may feel that swiping is not working. Generally, around 10-20% of the panel width is appropriate.

## Related Links

### Related Options
- [`moveType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype): Movement behavior mode (important when used with strict)
- [`dragThreshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#dragthreshold): Minimum distance for drag recognition

### Related Demos
- [Movement Types](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/movement-types.md): Using threshold in strict mode

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* threshold: 10 (sensitive) */}
      <div className="demo-container">
        <div className="demo-label">threshold: 10 (short drag changes panel)</div>
        <Flicking threshold={10} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* threshold: 40 (default) */}
      <div className="demo-container">
        <div className="demo-label">threshold: 40 (default)</div>
        <Flicking threshold={40} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* threshold: 100 (insensitive) */}
      <div className="demo-container">
        <div className="demo-label">threshold: 100 (requires long drag)</div>
        <Flicking threshold={100} align="center">
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
    <!-- threshold: 10 (sensitive) -->
    <div class="demo-container">
      <div class="demo-label">threshold: 10 (short drag changes panel)</div>
      <Flicking :options="{ threshold: 10, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- threshold: 40 (default) -->
    <div class="demo-container">
      <div class="demo-label">threshold: 40 (default)</div>
      <Flicking :options="{ threshold: 40, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- threshold: 100 (insensitive) -->
    <div class="demo-container">
      <div class="demo-label">threshold: 100 (requires long drag)</div>
      <Flicking :options="{ threshold: 100, align: 'center' }">
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

// threshold: 10 (sensitive)
new Flicking("#flick-low", {
  threshold: 10,
  align: "center"
});

// threshold: 40 (default)
new Flicking("#flick-default", {
  threshold: 40,
  align: "center"
});

// threshold: 100 (insensitive)
new Flicking("#flick-high", {
  threshold: 100,
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
  <!-- threshold: 10 (sensitive) -->
  <div class="demo-container">
    <div class="demo-label">threshold: 10 (short drag changes panel)</div>
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

  <!-- threshold: 40 (default) -->
  <div class="demo-container">
    <div class="demo-label">threshold: 40 (default)</div>
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

  <!-- threshold: 100 (insensitive) -->
  <div class="demo-container">
    <div class="demo-label">threshold: 100 (requires long drag)</div>
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

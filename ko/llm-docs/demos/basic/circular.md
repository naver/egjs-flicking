# Circular

The [`circular`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) option connects the first and last panels to enable infinite loop navigation. Moving next from the last panel goes to the first panel, and moving previous from the first panel goes to the last panel.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`circular`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) | `boolean` | `false` | Enable infinite loop mode |
| [`circularFallback`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circularfallback) | `"linear" \| "bound"` | `"linear"` | Fallback behavior when circular cannot be activated |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `false` | Cannot move beyond the first/last panel | Finite content, UI with clear start/end |
| `true` | First and last panels are connected for infinite navigation | Carousels, galleries, continuous browsing |

## Details

### circular: false in Detail
This is the default. You cannot move previous from the first panel or next from the last panel. Suitable for displaying finite content.

### circular: true in Detail
The first and last panels are internally connected. Users can scroll continuously in either direction. Panels are not duplicated; instead, their positions are recalculated to create a seamless connection.

### circularFallback in Detail
Specifies the fallback behavior when `circular: true` but the activation conditions are not met:
- `"linear"`: Operates in normal mode (stops at first/last)
- `"bound"`: Operates in bound mode (bounces at boundaries)

### Related Options
- **Relationship with bound**: When `circular: true` and `bound: true` are set together, circular takes priority. bound is ignored.
- **Relationship with align**: The combination of `circular: true` + `align: "center"` is the most common carousel pattern.
- **Relationship with panelsPerView**: Setting `panelsPerView` affects the total panel size calculation, which can influence the circular activation condition.

### Use Cases

> **Info: When to use?**
- **circular: true**: Image galleries, product carousels, banner sliders, seamless browsing
- **circular: false**: Onboarding screens, step-by-step wizards, content with clear start/end

### Notes

> **Warning: Activation condition**
Circular mode is only activated when **total panel size >= viewport size**. If the condition is not met, it automatically falls back to the mode specified in `circularFallback`.

> **Warning: Cannot be used with bound**
`circular: true` and `bound: true` are mutually exclusive. If both are true, circular takes priority and bound is ignored.

## Related Links

### Related Options
- [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound): Boundary restriction mode (mutually exclusive with circular)
- [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align): Panel alignment method

### Related Demos
- [Alignment](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/alignment.md): Alignment options with circular combination
- [Bound](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/bound.md): Boundary restriction mode

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* circular: false (default) */}
      <div className="demo-container">
        <div className="demo-label">circular: false (default)</div>
        <Flicking circular={false} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* circular: true - infinite loop */}
      <div className="demo-container">
        <div className="demo-label">circular: true (infinite loop)</div>
        <Flicking circular={true} align="center">
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
    <!-- circular: false (default) -->
    <div class="demo-container">
      <div class="demo-label">circular: false (default)</div>
      <Flicking :options="{ circular: false, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- circular: true - infinite loop -->
    <div class="demo-container">
      <div class="demo-label">circular: true (infinite loop)</div>
      <Flicking :options="{ circular: true, align: 'center' }">
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

// circular: false (default)
new Flicking("#flick-normal", {
  circular: false,
  align: "center"
});

// circular: true (infinite loop)
new Flicking("#flick-circular", {
  circular: true,
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
  <!-- circular: false (default) -->
  <div class="demo-container">
    <div class="demo-label">circular: false (default)</div>
    <div id="flick-normal" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- circular: true (infinite loop) -->
  <div class="demo-container">
    <div class="demo-label">circular: true (infinite loop)</div>
    <div id="flick-circular" class="flicking-viewport">
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
  width: 60%;
  height: 120px;
}
```

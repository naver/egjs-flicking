# Bound

The [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound) option restricts the camera from going beyond the first and last panel boundaries. It can be used together with the [`bounce`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bounce) option to control the elastic effect at the boundaries.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound) | `boolean` | `false` | Enable boundary restriction |
| [`bounce`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bounce) | `number \| string \| [number \| string, number \| string]` | `"20%"` | Bounce area size |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `bound: false` | Can drag into empty space beyond first/last panel | Infinite scroll feel, free exploration |
| `bound: true` | Stops at first/last panel boundary with bounce effect | Finite content, clear start/end indication |

## Details

### bound: false in Detail
This is the default. You can continue to drag beyond the last panel, and empty space will be visible. When you release, it snaps to the nearest panel.

### bound: true in Detail
The camera cannot go beyond the start of the first panel or the end of the last panel. When reaching the boundary, a bounce effect is displayed to indicate to the user that the end has been reached.

### bounce in Detail
The size of the elastic area displayed at the boundary. Larger values give more of a pull feel.

```javascript
// Various bounce values
bounce: "20%"      // Default, 20% of viewport
bounce: "50%"      // Larger bounce
bounce: "100px"    // Fixed pixel value
bounce: 0          // No bounce
bounce: ["10%", "30%"]  // Different values for start/end
```

### Related Options
- **Relationship with circular**: `circular: true` and `bound: true` are mutually exclusive. If both are true, circular takes priority and bound is ignored.
- **Relationship with moveType: "freeScroll"**: Using `bound: true` together with freeScroll mode prevents scrolling beyond the boundaries.

### Use Cases

> **Info: When to use?**
- **bound: false**: When you want an infinite scroll feel, when not using circular
- **bound: true**: When you want to clearly indicate the start and end of content, when boundary restriction is needed in freeScroll mode

### Notes

> **Warning: Cannot be used with circular**
When `circular: true` and `bound: true` are set simultaneously, circular takes priority. Set `circular: false` if you want the bound effect.

> **Warning: Bounce value caution**
If the bounce value is too large, users may be confused about whether they have reached the end. Generally, around 20-30% is appropriate.

## Related Links

### Related Options
- [`circular`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular): Infinite loop mode (mutually exclusive with bound)
- [`moveType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype): Movement behavior mode (freeScroll + bound combination recommended)

### Related Demos
- [Circular](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/circular.md): Infinite loop mode
- [Movement Types](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/movement-types.md): freeScroll + bound combination

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* bound: false (default) */}
      <div className="demo-container">
        <div className="demo-label">bound: false (default, no boundary constraint)</div>
        <Flicking bound={false} align="prev">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* bound: true */}
      <div className="demo-container">
        <div className="demo-label">bound: true (bounded at first/last panel)</div>
        <Flicking bound={true} align="prev">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* bound: true + custom bounce */}
      <div className="demo-container">
        <div className="demo-label">bound: true + bounce: "50%" (larger bounce)</div>
        <Flicking bound={true} bounce="50%" align="prev">
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
    <!-- bound: false (default) -->
    <div class="demo-container">
      <div class="demo-label">bound: false (default, no boundary constraint)</div>
      <Flicking :options="{ bound: false, align: 'prev' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- bound: true -->
    <div class="demo-container">
      <div class="demo-label">bound: true (bounded at first/last panel)</div>
      <Flicking :options="{ bound: true, align: 'prev' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- bound: true + custom bounce -->
    <div class="demo-container">
      <div class="demo-label">bound: true + bounce: "50%" (larger bounce)</div>
      <Flicking :options="{ bound: true, bounce: '50%', align: 'prev' }">
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

// bound: false (default)
new Flicking("#flick-unbound", {
  bound: false,
  align: "prev"
});

// bound: true
new Flicking("#flick-bound", {
  bound: true,
  align: "prev"
});

// bound: true + bounce: "50%"
new Flicking("#flick-bounce", {
  bound: true,
  bounce: "50%",
  align: "prev"
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
  <!-- bound: false (default) -->
  <div class="demo-container">
    <div class="demo-label">bound: false (default, no boundary constraint)</div>
    <div id="flick-unbound" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- bound: true -->
  <div class="demo-container">
    <div class="demo-label">bound: true (bounded at first/last panel)</div>
    <div id="flick-bound" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- bound: true + bounce: "50%" -->
  <div class="demo-container">
    <div class="demo-label">bound: true + bounce: "50%" (larger bounce)</div>
    <div id="flick-bounce" class="flicking-viewport">
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
  width: 40%;
  height: 120px;
}
```

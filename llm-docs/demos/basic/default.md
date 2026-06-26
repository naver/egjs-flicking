# Default

The most basic usage of Flicking. You can check the required HTML structure, CSS, and default option values.



## Summary

### Default Option Values

When created without any options, the following defaults are applied:

| Option | Default | Description |
|--------|---------|-------------|
| [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align) | `"center"` | Panel alignment position |
| [`horizontal`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal) | `true` | Horizontal movement |
| [`circular`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) | `false` | Circular mode disabled |
| [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound) | `false` | No boundary restriction |
| [`duration`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration) | `500` | Animation 500ms |
| [`moveType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype) | `"snap"` | Snap movement type |

### Required Elements

| Element | Required | Description |
|---------|----------|-------------|
| `.flicking-viewport` | Required | The viewport element to which the Flicking instance is attached |
| `.flicking-camera` | Required | The container that holds the panels. The element that actually moves |
| Panel elements | Required | Direct children of `.flicking-camera` |
| `flicking.css` | Required | Base stylesheet |

## Details

### HTML Structure
Flicking requires the following structure:

```html
<div class="flicking-viewport">
  <div class="flicking-camera">
    <div class="panel">Panel 1
    <div class="panel">Panel 2
    <div class="panel">Panel 3
  

```

- **flicking-viewport**: Defines the visible area. `overflow: hidden` is applied.
- **flicking-camera**: Wraps the panels and moves during drag/animation.
- **Panels**: Each slide's content. Must be direct children of the camera.

### CSS Import
You must import the Flicking CSS:

```javascript
// JavaScript
import "@egjs/flicking/dist/flicking.css";

// React
import "@egjs/react-flicking/dist/flicking.css";

// Vue
import "@egjs/vue3-flicking/dist/flicking.css";
```

### Notes

> **Warning: Required**
If you do not import `flicking.css`, panels will not be positioned correctly. It contains the default styles for the viewport and camera.

> **Warning: Structure caution**
Panel elements must be **direct children** of `.flicking-camera`. It will not work if there are other wrapper elements in between.

## Related Links

### Related Demos
- [Alignment](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/alignment.md): Panel alignment options
- [Circular](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/circular.md): Circular mode
- [Movement Types](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/movement-types.md): Movement types

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <Flicking align="center">
      <div className="flicking-panel panel-1">1</div>
      <div className="flicking-panel panel-2">2</div>
      <div className="flicking-panel panel-3">3</div>
      <div className="flicking-panel panel-4">4</div>
      <div className="flicking-panel panel-5">5</div>
    </Flicking>
  );
}
```

### Vue3
```vue
<template>
  <Flicking :options="{ align: 'center' }">
    <div class="flicking-panel panel-1">1</div>
    <div class="flicking-panel panel-2">2</div>
    <div class="flicking-panel panel-3">3</div>
    <div class="flicking-panel panel-4">4</div>
    <div class="flicking-panel panel-5">5</div>
  </Flicking>
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

const _flicking = new Flicking("#flick", {
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
  <div id="flick" class="flicking-viewport">
    <div class="flicking-camera">
      <div class="flicking-panel panel-1">1</div>
      <div class="flicking-panel panel-2">2</div>
      <div class="flicking-panel panel-3">3</div>
      <div class="flicking-panel panel-4">4</div>
      <div class="flicking-panel panel-5">5</div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 100%;
}
```

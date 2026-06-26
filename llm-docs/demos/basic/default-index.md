# Default Index

The [`defaultIndex`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#defaultindex) option sets the index of the panel to display on initialization. Specified as a 0-based index.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`defaultIndex`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#defaultindex) | `number` | `0` | Initial active panel index (0-based) |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `0` | Starts at the first panel (default) | General carousels |
| `n` | Starts at the (n+1)th panel | Navigating directly to a specific panel, deep linking |
| `last index` | Starts at the last panel | Reverse browsing, showing newest items first |

## Details

### How defaultIndex Works
When Flicking is initialized (`init()`), it moves to the panel at the specified index. The panel is displayed immediately without animation.

```javascript
// Start at the first panel (default)
defaultIndex: 0

// Start at the third panel
defaultIndex: 2

// Start at the last panel (when there are 5 panels)
defaultIndex: 4
```

### Related Options
- **Relationship with circular**: defaultIndex works correctly even with `circular: true`. The specified panel becomes the initial active panel.
- **Relationship with align**: When used with `align: "center"`, the initial panel is positioned at the center.

### Use Cases

> **Info: When to use?**
- **defaultIndex: 0**: General sequential browsing carousels
- **Specific index**: Sharing a specific slide via URL parameters (deep linking), restoring previous state
- **Last index**: UI that shows the newest items first, chat/feed

### Notes

> **Warning: Index range**
If you specify an index larger than the number of panels, it moves to the last panel. Negative indices may be treated as the first panel.

## Related Links

### Related Options
- [`circular`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular): Infinite loop mode
- [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align): Panel alignment

### Related Demos
- [Circular](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/circular.md): Infinite loop mode
- [Alignment](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/alignment.md): Panel alignment

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* defaultIndex: 0 (default) */}
      <div className="demo-container">
        <div className="demo-label">defaultIndex: 0 (default, first panel)</div>
        <Flicking defaultIndex={0} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* defaultIndex: 2 */}
      <div className="demo-container">
        <div className="demo-label">defaultIndex: 2 (starts at 3rd panel)</div>
        <Flicking defaultIndex={2} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* defaultIndex: 4 (last) */}
      <div className="demo-container">
        <div className="demo-label">defaultIndex: 4 (starts at last panel)</div>
        <Flicking defaultIndex={4} align="center">
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
    <!-- defaultIndex: 0 (default) -->
    <div class="demo-container">
      <div class="demo-label">defaultIndex: 0 (default, first panel)</div>
      <Flicking :options="{ defaultIndex: 0, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- defaultIndex: 2 -->
    <div class="demo-container">
      <div class="demo-label">defaultIndex: 2 (starts at 3rd panel)</div>
      <Flicking :options="{ defaultIndex: 2, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- defaultIndex: 4 (last) -->
    <div class="demo-container">
      <div class="demo-label">defaultIndex: 4 (starts at last panel)</div>
      <Flicking :options="{ defaultIndex: 4, align: 'center' }">
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

// defaultIndex: 0 (default)
new Flicking("#flick-first", {
  defaultIndex: 0,
  align: "center"
});

// defaultIndex: 2
new Flicking("#flick-middle", {
  defaultIndex: 2,
  align: "center"
});

// defaultIndex: 4 (last)
new Flicking("#flick-last", {
  defaultIndex: 4,
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
  <!-- defaultIndex: 0 (default) -->
  <div class="demo-container">
    <div class="demo-label">defaultIndex: 0 (default, first panel)</div>
    <div id="flick-first" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- defaultIndex: 2 -->
  <div class="demo-container">
    <div class="demo-label">defaultIndex: 2 (starts at 3rd panel)</div>
    <div id="flick-middle" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- defaultIndex: 4 (last) -->
  <div class="demo-container">
    <div class="demo-label">defaultIndex: 4 (starts at last panel)</div>
    <div id="flick-last" class="flicking-viewport">
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

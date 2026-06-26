# Input Type

The [`inputType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#inputtype) option sets the input device types to enable as an array. You can allow or restrict specific input devices.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`inputType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#inputtype) | `string[]` | `["touch", "mouse"]` | Input device types to enable |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `["touch", "mouse"]` | Both touch and mouse allowed (default) | General usage, cross-platform |
| `["touch"]` | Touch only, mouse drag ignored | Touch-only UI, preventing mouse drag |
| `["mouse"]` | Mouse only, touch ignored | Desktop-only UI |

## Details

### How inputType Works
Only the input types included in the array are used for Flicking interaction. Input types not included are ignored.

```javascript
// Allow all input (default)
inputType: ["touch", "mouse"]

// Touch only
inputType: ["touch"]

// Mouse only
inputType: ["mouse"]

// Disable all input
inputType: []
```

### Supported Input Types
- `"touch"`: Touchscreen input (smartphones, tablets)
- `"mouse"`: Mouse drag input (desktop)

### iOSEdgeSwipeThreshold

In iOS Safari, swiping from the edge of the screen triggers the browser's back/forward navigation gesture. The [`iOSEdgeSwipeThreshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#iosedgeswipethreshold) option specifies the width (px) of this area, so touches starting within that range are passed to the browser instead of being handled by Flicking.

```javascript
const flicking = new Flicking("#el", {
  inputType: ["touch", "mouse"],
  iOSEdgeSwipeThreshold: 30 // Default: 30px area on each side is deferred to browser gestures
});
```

> **Info: Only applies on iOS**
`iOSEdgeSwipeThreshold` only works on iOS devices. The default value (30px) is generally sufficient. For full-screen horizontal sliders where edge panels are frequently dragged, you can reduce the value or set it to `0`.

### Related Options
- **Relationship with disableOnInit**: `disableOnInit: true` disables all input, and `inputType: []` has the same effect. The difference is that disableOnInit can be later activated with `enable()`.

### Use Cases

> **Info: When to use?**
- **["touch", "mouse"]**: General web apps, supporting various devices
- **["touch"]**: Mobile-only UI, when you want only button/arrow control on desktop
- **["mouse"]**: Desktop-only apps, when touch input is used for other purposes

### Notes

> **Warning: Provide alternatives when restricting input**
Restricting certain input types means users on those devices cannot interact. Provide alternatives such as navigation buttons or keyboard controls.

> **Warning: Accessibility considerations**
Generally, using the default `["touch", "mouse"]` is recommended from an accessibility standpoint. Do not restrict input types without a specific reason.

## Related Links

### Related Options
- [`disableOnInit`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#disableoninit): Disable input on initialization
- [`iOSEdgeSwipeThreshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#iosedgeswipethreshold): iOS edge swipe exclusion area width

### Related Demos
- [Disable Input](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/disable-input.md): Disabling input

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* inputType: ["touch", "mouse"] (default) */}
      <div className="demo-container">
        <div className="demo-label">inputType: ["touch", "mouse"] (default)</div>
        <Flicking inputType={["touch", "mouse"]} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* inputType: ["touch"] */}
      <div className="demo-container">
        <div className="demo-label">inputType: ["touch"] (touch only, no mouse drag)</div>
        <Flicking inputType={["touch"]} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* inputType: ["mouse"] */}
      <div className="demo-container">
        <div className="demo-label">inputType: ["mouse"] (mouse only, no touch)</div>
        <Flicking inputType={["mouse"]} align="center">
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
    <!-- inputType: ["touch", "mouse"] (default) -->
    <div class="demo-container">
      <div class="demo-label">inputType: ["touch", "mouse"] (default)</div>
      <Flicking :options="{ inputType: ['touch', 'mouse'], align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- inputType: ["touch"] -->
    <div class="demo-container">
      <div class="demo-label">inputType: ["touch"] (touch only, no mouse drag)</div>
      <Flicking :options="{ inputType: ['touch'], align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- inputType: ["mouse"] -->
    <div class="demo-container">
      <div class="demo-label">inputType: ["mouse"] (mouse only, no touch)</div>
      <Flicking :options="{ inputType: ['mouse'], align: 'center' }">
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

// inputType: ["touch", "mouse"] (default)
new Flicking("#flick-both", {
  inputType: ["touch", "mouse"],
  align: "center"
});

// inputType: ["touch"]
new Flicking("#flick-touch", {
  inputType: ["touch"],
  align: "center"
});

// inputType: ["mouse"]
new Flicking("#flick-mouse", {
  inputType: ["mouse"],
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
  <!-- inputType: ["touch", "mouse"] (default) -->
  <div class="demo-container">
    <div class="demo-label">inputType: ["touch", "mouse"] (default)</div>
    <div id="flick-both" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- inputType: ["touch"] -->
  <div class="demo-container">
    <div class="demo-label">inputType: ["touch"] (touch only, no mouse drag)</div>
    <div id="flick-touch" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- inputType: ["mouse"] -->
  <div class="demo-container">
    <div class="demo-label">inputType: ["mouse"] (mouse only, no touch)</div>
    <div id="flick-mouse" class="flicking-viewport">
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

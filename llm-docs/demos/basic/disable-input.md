# Disable Input

The [`disableOnInit`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#disableoninit) option disables user input (drag) on initialization. Useful for carousels controlled only by buttons or the API.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`disableOnInit`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#disableoninit) | `boolean` | `false` | Disable input on initialization |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `false` | Panels can be moved by dragging (default) | General carousels |
| `true` | Drag is ignored, only API control available | Auto-play sliders, button-only control |

## Details

### How disableOnInit Works
When `disableOnInit: true` is set, the `disableInput()` method is automatically called on initialization. After this, user drag input is ignored, but programmatic controls such as `moveTo()`, `prev()`, and `next()` work normally.

### Dynamic Control Methods
You can change the input enabled state at runtime.

```javascript
const flicking = new Flicking("#el");

// Disable input
flicking.disableInput();

// Enable input
flicking.enableInput();
```

### Related Options
- **Relationship with inputType**: `inputType: []` also disables input, but `disableOnInit` allows later activation with `enableInput()`.

### Use Cases

> **Info: When to use?**
- **disableOnInit: true**: Auto-play carousels, UI controlled only by buttons/arrows, presentations requiring touch prevention
- **Dynamic toggle**: Allow drag only under certain conditions, disable background carousel when a modal is open

### Notes

> **Warning: Provide alternative controls**
When `disableOnInit: true` is set, dragging is not possible. Be sure to provide alternatives such as navigation buttons, arrows, or keyboard controls.

## Related Links

### Related Options
- [`inputType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#inputtype): Input device type restriction

### Related Demos
- [Input Type](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/input-type.md): Input device type settings

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  const flickingRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleInput = () => {
    if (flickingRef.current) {
      if (isDisabled) {
        flickingRef.current.enableInput();
      } else {
        flickingRef.current.disableInput();
      }
      setIsDisabled(!isDisabled);
    }
  };

  return (
    <div>
      {/* disableOnInit: false (default) */}
      <div className="demo-container">
        <div className="demo-label">disableOnInit: false (default, drag enabled)</div>
        <Flicking disableOnInit={false} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* disableOnInit: true */}
      <div className="demo-container">
        <div className="demo-label">disableOnInit: true (drag disabled, button control only)</div>
        <Flicking disableOnInit={true} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* dynamic toggle */}
      <div className="demo-container">
        <div className="demo-label">Dynamic toggle: {isDisabled ? "disabled" : "enabled"}</div>
        <Flicking ref={flickingRef} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
        <div className="controls">
          <button onClick={toggleInput}>{isDisabled ? "Enable input" : "Disable input"}</button>
        </div>
      </div>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <!-- disableOnInit: false (default) -->
    <div class="demo-container">
      <div class="demo-label">disableOnInit: false (default, drag enabled)</div>
      <Flicking :options="{ disableOnInit: false, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- disableOnInit: true -->
    <div class="demo-container">
      <div class="demo-label">disableOnInit: true (drag disabled, button control only)</div>
      <Flicking :options="{ disableOnInit: true, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- dynamic toggle -->
    <div class="demo-container">
      <div class="demo-label">Dynamic toggle: {{ isDisabled ? "disabled" : "enabled" }}</div>
      <Flicking ref="flicking" :options="{ align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="toggleInput">
          {{ isDisabled ? "Enable input" : "Disable input" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const flicking = ref(null);
const isDisabled = ref(false);

const toggleInput = () => {
  const flickingInstance = flicking.value;
  if (isDisabled.value) {
    flickingInstance.enableInput();
  } else {
    flickingInstance.disableInput();
  }
  isDisabled.value = !isDisabled.value;
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// disableOnInit: false (default)
new Flicking("#flick-enabled", {
  disableOnInit: false,
  align: "center"
});

// disableOnInit: true
new Flicking("#flick-disabled", {
  disableOnInit: true,
  align: "center"
});

// dynamic toggle
const flickingToggle = new Flicking("#flick-toggle", {
  align: "center"
});

let isDisabled = false;
const button = document.getElementById("toggle-btn");
const label = document.getElementById("toggle-label");

button.addEventListener("click", () => {
  if (isDisabled) {
    flickingToggle.enableInput();
    button.textContent = "Disable input";
    label.textContent = "Dynamic toggle: enabled";
  } else {
    flickingToggle.disableInput();
    button.textContent = "Enable input";
    label.textContent = "Dynamic toggle: disabled";
  }
  isDisabled = !isDisabled;
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
  <!-- disableOnInit: false (default) -->
  <div class="demo-container">
    <div class="demo-label">disableOnInit: false (default, drag enabled)</div>
    <div id="flick-enabled" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- disableOnInit: true -->
  <div class="demo-container">
    <div class="demo-label">disableOnInit: true (drag disabled, button control only)</div>
    <div id="flick-disabled" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
  </div>

  <!-- dynamic toggle -->
  <div class="demo-container">
    <div class="demo-label" id="toggle-label">Dynamic toggle: enabled</div>
    <div id="flick-toggle" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </div>
    </div>
    <div class="controls">
      <button id="toggle-btn">Disable input</button>
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

.controls {
  margin-top: 8px;
}
.controls button {
  margin-right: 8px;
  padding: 6px 12px;
  cursor: pointer;
}
```

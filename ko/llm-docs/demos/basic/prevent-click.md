# Prevent Click

The [`preventClickOnDrag`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#preventclickondrag) option prevents unintended click events that occur after dragging. This is especially important when panels contain links or buttons.

Try dragging a panel and releasing to see the difference in click handling.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`preventClickOnDrag`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#preventclickondrag) | `boolean` | `true` | Prevent click events after drag |
| [`preventDefaultOnDrag`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#preventdefaultondrag) | `boolean` | `false` | Prevent browser default behavior during drag |

### Comparison by Value

| Option | Value | Behavior | Suitable For |
|--------|-------|----------|--------------|
| `preventClickOnDrag` | `true` | Ignores click events after drag (default) | General carousels with links/buttons in panels |
| `preventClickOnDrag` | `false` | Click events fire even after drag | When managing click events manually |
| `preventDefaultOnDrag` | `true` | Prevents default behavior like text selection during drag | When text selection prevention is needed |
| `preventDefaultOnDrag` | `false` | Allows default behavior (default) | Most general carousels |

## Details

### How preventClickOnDrag Works

When a touch/mouse drag ends, the browser naturally fires a `click` event. When lifting your finger after dragging the carousel to flip panels, links or buttons inside the panel may be clicked unintentionally.

With `preventClickOnDrag: true` (default), click events from interactions involving a drag are ignored. Simple taps/clicks (without drag) work normally.

```javascript
// Default: prevent click after drag (recommended)
const flicking = new Flicking("#el", {
  preventClickOnDrag: true
});

// Allow click even after drag
const flicking = new Flicking("#el", {
  preventClickOnDrag: false
});
```

### preventDefaultOnDrag

Calls `preventDefault()` during drag to prevent browser default behavior (text selection, image dragging, etc.).

```javascript
const flicking = new Flicking("#el", {
  preventDefaultOnDrag: true  // Text selection disabled during drag
});
```

### Use Cases

> **Info: When to use?**
- **When panels contain links/buttons**: Set `preventClickOnDrag: true` to prevent unintended navigation after drag.
- **Text-heavy panels**: Set `preventDefaultOnDrag: true` to prevent text selection during drag for better usability.

> **Warning: Using preventClickOnDrag: false**
Since clicks fire even after drag, short drags may trigger unintended link navigation or button clicks. Use only when managing click events manually (e.g., measuring drag distance to determine click intent).

## Related Links

### Related Options
- [`inputType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#inputtype): Input device type settings
- [`threshold`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#threshold): Minimum drag distance for panel transition

### Related Demos
- [Input Type](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/input-type.md): Input device type restriction
- [Threshold](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/threshold.md): Panel transition threshold settings

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div>
      {/* preventClickOnDrag: true (default) */}
      <div className="demo-container">
        <div className="demo-label">preventClickOnDrag: true (default)</div>
        <Flicking align="center" preventClickOnDrag={true}>
          <div className="flicking-panel panel-1" onClick={() => setCount1(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-2" onClick={() => setCount1(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-3" onClick={() => setCount1(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-4" onClick={() => setCount1(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-5" onClick={() => setCount1(c => c + 1)}>
            click
          </div>
        </Flicking>
        <div className="click-count">Click count: {count1}</div>
        <div className="demo-hint">Click after drag is ignored. Count increases only on pure tap/click.</div>
      </div>

      {/* preventClickOnDrag: false */}
      <div className="demo-container">
        <div className="demo-label">preventClickOnDrag: false</div>
        <Flicking align="center" preventClickOnDrag={false}>
          <div className="flicking-panel panel-1" onClick={() => setCount2(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-2" onClick={() => setCount2(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-3" onClick={() => setCount2(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-4" onClick={() => setCount2(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-5" onClick={() => setCount2(c => c + 1)}>
            click
          </div>
        </Flicking>
        <div className="click-count">Click count: {count2}</div>
        <div className="demo-hint">Click event fires even after drag release.</div>
      </div>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <!-- preventClickOnDrag: true (default) -->
    <div class="demo-container">
      <div class="demo-label">preventClickOnDrag: true (default)</div>
      <Flicking :options="{ align: 'center', preventClickOnDrag: true }">
        <div :key="0" class="flicking-panel panel-1" @click="count1++">click</div>
        <div :key="1" class="flicking-panel panel-2" @click="count1++">click</div>
        <div :key="2" class="flicking-panel panel-3" @click="count1++">click</div>
        <div :key="3" class="flicking-panel panel-4" @click="count1++">click</div>
        <div :key="4" class="flicking-panel panel-5" @click="count1++">click</div>
      </Flicking>
      <div class="click-count">Click count: {{ count1 }}</div>
      <div class="demo-hint">Click after drag is ignored. Count increases only on pure tap/click.</div>
    </div>

    <!-- preventClickOnDrag: false -->
    <div class="demo-container">
      <div class="demo-label">preventClickOnDrag: false</div>
      <Flicking :options="{ align: 'center', preventClickOnDrag: false }">
        <div :key="0" class="flicking-panel panel-1" @click="count2++">click</div>
        <div :key="1" class="flicking-panel panel-2" @click="count2++">click</div>
        <div :key="2" class="flicking-panel panel-3" @click="count2++">click</div>
        <div :key="3" class="flicking-panel panel-4" @click="count2++">click</div>
        <div :key="4" class="flicking-panel panel-5" @click="count2++">click</div>
      </Flicking>
      <div class="click-count">Click count: {{ count2 }}</div>
      <div class="demo-hint">Click event fires even after drag release.</div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const count1 = ref(0);
const count2 = ref(0);
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// preventClickOnDrag: true (default)
const _flick1 = new Flicking("#flick-prevent", {
  align: "center",
  preventClickOnDrag: true
});

let count1 = 0;
document.querySelectorAll("#flick-prevent .flicking-panel").forEach(el => {
  el.addEventListener("click", () => {
    count1++;
    document.getElementById("count1").textContent = `Click count: ${count1}`;
  });
});

// preventClickOnDrag: false
const _flick2 = new Flicking("#flick-no-prevent", {
  align: "center",
  preventClickOnDrag: false
});

let count2 = 0;
document.querySelectorAll("#flick-no-prevent .flicking-panel").forEach(el => {
  el.addEventListener("click", () => {
    count2++;
    document.getElementById("count2").textContent = `Click count: ${count2}`;
  });
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
  <!-- preventClickOnDrag: true (default) -->
  <div class="demo-container">
    <div class="demo-label">preventClickOnDrag: true (default)</div>
    <div id="flick-prevent" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">click</div>
        <div class="flicking-panel panel-2">click</div>
        <div class="flicking-panel panel-3">click</div>
        <div class="flicking-panel panel-4">click</div>
        <div class="flicking-panel panel-5">click</div>
      </div>
    </div>
    <div class="click-count" id="count1">Click count: 0</div>
    <div class="demo-hint">Click after drag is ignored. Count increases only on pure tap/click.</div>
  </div>

  <!-- preventClickOnDrag: false -->
  <div class="demo-container">
    <div class="demo-label">preventClickOnDrag: false</div>
    <div id="flick-no-prevent" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1">click</div>
        <div class="flicking-panel panel-2">click</div>
        <div class="flicking-panel panel-3">click</div>
        <div class="flicking-panel panel-4">click</div>
        <div class="flicking-panel panel-5">click</div>
      </div>
    </div>
    <div class="click-count" id="count2">Click count: 0</div>
    <div class="demo-hint">Click event fires even after drag release.</div>
  </div>

</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 50%;
  height: 120px;
  cursor: pointer;
  user-select: none;
}

.click-count {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}
.demo-hint {
  margin-top: 4px;
  font-size: 13px;
  color: #888;
}
```

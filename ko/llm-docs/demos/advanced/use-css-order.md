# CSS Order

Use the [`useCSSOrder`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#usecssorder) option to control how panel visual order is managed in `circular` mode. The default (`false`) directly changes the DOM node order, while setting it to `true` uses the CSS `order` property to keep DOM order unchanged.

After cycling through panels, check how the "DOM Order" display below differs.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`useCSSOrder`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#usecssorder) | `boolean` | `false` | Manage panel order via CSS order property |

### Value Comparison

| Value | Behavior | Best For |
|-------|----------|----------|
| `false` | Directly rearranges DOM nodes during circular cycling (default) | Typical carousels |
| `true` | Keeps DOM order fixed, adjusts visual order via CSS `order` property | Panels with iframe, video, or state that needs to be preserved |

## Details

### How useCSSOrder Works

A Flicking with `circular: true` rearranges panels to create the looping effect.

**`useCSSOrder: false` (default)**: Physically moves panel DOM nodes to change their order. This is fine for simple div panels, but panels containing elements like `<iframe>` or `<video>` that reload on DOM movement will have their content reset on every cycle.

**`useCSSOrder: true`**: Keeps DOM nodes in their original position and only changes the visual order using the CSS flexbox `order` property. Since there is no DOM rearrangement, iframes and videos are not reloaded.

```javascript
// Circular carousel with iframe panels
const flicking = new Flicking("#el", {
  circular: true,
  useCSSOrder: true  // Manage via CSS order without DOM rearrangement
});
```

> **Info: Svelte always uses useCSSOrder**
When using the Svelte binding, `useCSSOrder: true` is always applied internally. This is because Svelte's rendering approach conflicts with DOM rearrangement.

### Notes

> **Warning: CSS order and flexbox**
`useCSSOrder: true` works under the assumption that Flicking's camera element (`flicking-camera`) uses a flexbox layout. If you remove flexbox with custom CSS, the order may not be applied correctly.

> **Warning: When not circular**
If `circular: false`, panel rearrangement does not occur, so the `useCSSOrder` option has no effect.

## Related Links

### Related Options
- [`circular`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular): Circular mode setting
- [`circularFallback`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circularfallback): Fallback behavior when circular is not possible

### Related Demos
- [Circular](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/circular.md): Basic circular mode usage

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

function FlickingDemo({ label, useCSSOrder }) {
  const ref = useRef(null);
  const [domOrder, setDomOrder] = useState("—");

  const updateDomOrder = () => {
    const camera = ref.current?.camera?.element;
    if (!camera) return;
    const ids = [...camera.children].map(el => el.dataset.id).join(" → ");
    setDomOrder(ids);
  };

  return (
    <div className="demo-container">
      <div className="demo-label">{label}</div>
      <Flicking
        ref={ref}
        circular={true}
        useCSSOrder={useCSSOrder}
        align="center"
        onMoveEnd={updateDomOrder}
        onReady={updateDomOrder}
      >
        <div className="flicking-panel panel-1" data-id="1">
          Panel 1
        </div>
        <div className="flicking-panel panel-2" data-id="2">
          Panel 2
        </div>
        <div className="flicking-panel panel-3" data-id="3">
          Panel 3
        </div>
        <div className="flicking-panel panel-4" data-id="4">
          Panel 4
        </div>
        <div className="flicking-panel panel-5" data-id="5">
          Panel 5
        </div>
      </Flicking>
      <div className="controls">
        <button onClick={() => ref.current?.prev().catch(() => {})}>Prev</button>
        <button onClick={() => ref.current?.next().catch(() => {})}>Next</button>
      </div>
      <div className="dom-order-display">DOM order: {domOrder}</div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <FlickingDemo
        label="useCSSOrder: false (default) — DOM node order changes in circular mode"
        useCSSOrder={false}
      />
      <FlickingDemo
        label="useCSSOrder: true — preserves DOM order, uses CSS order property for visual ordering"
        useCSSOrder={true}
      />
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <!-- useCSSOrder: false (default) -->
    <div class="demo-container">
      <div class="demo-label">useCSSOrder: false (default) — DOM node order changes in circular mode</div>
      <Flicking
        ref="flick1"
        :options="{ circular: true, useCSSOrder: false, align: 'center' }"
        @moveEnd="updateDomOrder(1)"
        @ready="updateDomOrder(1)"
      >
        <div class="flicking-panel panel-1" data-id="1">Panel 1</div>
        <div class="flicking-panel panel-2" data-id="2">Panel 2</div>
        <div class="flicking-panel panel-3" data-id="3">Panel 3</div>
        <div class="flicking-panel panel-4" data-id="4">Panel 4</div>
        <div class="flicking-panel panel-5" data-id="5">Panel 5</div>
      </Flicking>
      <div class="controls">
        <button @click="flick1.prev().catch(() => {})">Prev</button>
        <button @click="flick1.next().catch(() => {})">Next</button>
      </div>
      <div class="dom-order-display">DOM order: {{ domOrder1 }}</div>
    </div>

    <!-- useCSSOrder: true -->
    <div class="demo-container">
      <div class="demo-label">useCSSOrder: true — preserves DOM order, uses CSS order property for visual ordering</div>
      <Flicking
        ref="flick2"
        :options="{ circular: true, useCSSOrder: true, align: 'center' }"
        @moveEnd="updateDomOrder(2)"
        @ready="updateDomOrder(2)"
      >
        <div class="flicking-panel panel-1" data-id="1">Panel 1</div>
        <div class="flicking-panel panel-2" data-id="2">Panel 2</div>
        <div class="flicking-panel panel-3" data-id="3">Panel 3</div>
        <div class="flicking-panel panel-4" data-id="4">Panel 4</div>
        <div class="flicking-panel panel-5" data-id="5">Panel 5</div>
      </Flicking>
      <div class="controls">
        <button @click="flick2.prev().catch(() => {})">Prev</button>
        <button @click="flick2.next().catch(() => {})">Next</button>
      </div>
      <div class="dom-order-display">DOM order: {{ domOrder2 }}</div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const flick1 = ref(null);
const flick2 = ref(null);
const domOrder1 = ref("1 2 3 4 5");
const domOrder2 = ref("1 2 3 4 5");

const updateDomOrder = n => {
  const flickRef = n === 1 ? flick1.value : flick2.value;
  if (!flickRef) return;
  const camera = flickRef.$el?.querySelector(".flicking-camera");
  if (!camera) return;
  const ids = [...camera.children].map(el => el.dataset.id).join(" → ");
  if (n === 1) {
    domOrder1.value = ids;
  } else {
    domOrder2.value = ids;
  }
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

function updateDomOrder(flicking, labelEl) {
  const camera = flicking.camera.element;
  const ids = [...camera.children].map(el => el.dataset.id).join(" → ");
  labelEl.textContent = `DOM order: ${ids}`;
}

// useCSSOrder: false (default)
const flick1 = new Flicking("#flick-default", {
  circular: true,
  useCSSOrder: false,
  align: "center"
});

const log1 = document.getElementById("log1");
const update1 = () => updateDomOrder(flick1, log1);
flick1.on("ready", update1);
flick1.on("moveEnd", update1);

document.getElementById("prev1").addEventListener("click", () => flick1.prev().catch(() => {}));
document.getElementById("next1").addEventListener("click", () => flick1.next().catch(() => {}));

// useCSSOrder: true
const flick2 = new Flicking("#flick-cssorder", {
  circular: true,
  useCSSOrder: true,
  align: "center"
});

const log2 = document.getElementById("log2");
const update2 = () => updateDomOrder(flick2, log2);
flick2.on("ready", update2);
flick2.on("moveEnd", update2);

document.getElementById("prev2").addEventListener("click", () => flick2.prev().catch(() => {}));
document.getElementById("next2").addEventListener("click", () => flick2.next().catch(() => {}));
```

### HTML (for vanilla JS)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <!-- useCSSOrder: false (default) -->
  <div class="demo-container">
    <div class="demo-label">useCSSOrder: false (default) — DOM node order changes in circular mode</div>
    <div id="flick-default" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1" data-id="1">Panel 1</div>
        <div class="flicking-panel panel-2" data-id="2">Panel 2</div>
        <div class="flicking-panel panel-3" data-id="3">Panel 3</div>
        <div class="flicking-panel panel-4" data-id="4">Panel 4</div>
        <div class="flicking-panel panel-5" data-id="5">Panel 5</div>
      </div>
    </div>
    <div class="controls">
      <button id="prev1">Prev</button>
      <button id="next1">Next</button>
    </div>
    <div class="dom-order-display" id="log1">DOM order: —</div>
  </div>

  <!-- useCSSOrder: true -->
  <div class="demo-container">
    <div class="demo-label">useCSSOrder: true — preserves DOM order, uses CSS order property for visual ordering</div>
    <div id="flick-cssorder" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel panel-1" data-id="1">Panel 1</div>
        <div class="flicking-panel panel-2" data-id="2">Panel 2</div>
        <div class="flicking-panel panel-3" data-id="3">Panel 3</div>
        <div class="flicking-panel panel-4" data-id="4">Panel 4</div>
        <div class="flicking-panel panel-5" data-id="5">Panel 5</div>
      </div>
    </div>
    <div class="controls">
      <button id="prev2">Prev</button>
      <button id="next2">Next</button>
    </div>
    <div class="dom-order-display" id="log2">DOM order: —</div>
  </div>

</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 40%;
  height: 140px;
}

.dom-order-display {
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-family: monospace;
}
.controls {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}
.controls button {
  padding: 6px 12px;
  cursor: pointer;
}
```

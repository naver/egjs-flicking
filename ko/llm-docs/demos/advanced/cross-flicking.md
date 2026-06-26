# Cross Flicking

Use the [`nested`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nested) option to create a 2D cross-navigation by nesting an inner (horizontal) Flicking inside an outer (vertical) Flicking.



## Summary

### Key Options

| Option | Scope | Value | Role |
|--------|-------|-------|------|
| [`horizontal`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal) | Outer | `false` | Vertical direction (navigation between groups) |
| [`nested`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nested) | Inner | `true` | Propagate events to outer when end is reached |
| [`moveType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype) | Both | `"strict"` | Move exactly one unit at a time |

### Structure

| Component | Direction | Role |
|-----------|-----------|------|
| Outer Flicking | Vertical (↕) | Navigation between groups |
| Inner Flicking | Horizontal (↔) | Navigation within a group |

## Details

### Role of the nested Option

When `nested: true` is set on the inner Flicking, swiping in the same direction after reaching the end of the inner Flicking propagates the event to the outer Flicking. In this demo, the outer and inner directions are different (vertical/horizontal), so input is naturally separated.

### Direction Separation

Horizontal swipes are handled by the inner Flicking, and vertical swipes are handled by the outer Flicking. For same-direction nesting (e.g., horizontal inside horizontal), `nested: true` manages event propagation.

### Related Options

- **Relationship between `nested` and `horizontal`**: Different directions work without conflict; for the same direction, `nested: true` controls propagation
- **Combination with `moveType: "strict"`**: Makes group/panel unit navigation clear
- **Combination with `bound: true`**: Prevents empty space at each level

### Use Cases

> **Info: When should you use this?**
- Category-based content (vertical for categories, horizontal for items)
- Photo albums (vertical for albums, horizontal for photos)
- Dashboards (vertical for sections, horizontal for cards)

### Notes

> **Warning: Caution**
- When the outer Flicking is vertical (`horizontal: false`), you must specify a height on the viewport.
- If `nested: true` is not set on the inner Flicking, events are consumed internally and not propagated to the outer Flicking.
- When nesting in the same direction, it may be difficult to distinguish swipe gestures.

## Related Links

### Related Options
- [`nested`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nested): Nested Flicking event propagation
- [`horizontal`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal): Scroll direction

### Related Demos
- [Nested](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/nested.md): On/off comparison of the nested option itself
- [Fullpage Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/fullpage-scroll.md): Vertical fullpage pattern

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";
import { useState } from "react";

const GROUPS = [
  { name: "Group A", colors: ["#e74c3c", "#c0392b", "#e67e22"] },
  { name: "Group B", colors: ["#3498db", "#2980b9", "#1abc9c"] },
  { name: "Group C", colors: ["#2ecc71", "#27ae60", "#16a085"] }
];

export default function App() {
  const [outerIndex, setOuterIndex] = useState(0);

  return (
    <div>
      <Flicking
        horizontal={false}
        moveType="strict"
        bound={true}
        align="prev"
        onChanged={e => setOuterIndex(e.index)}
        className="outer-viewport"
      >
        {GROUPS.map((group, gi) => (
          <div className="outer-panel" key={gi}>
            <div className="group-label">{group.name} (swipe vertically to switch groups)</div>
            <Flicking nested={true} moveType="strict" bound={true} align="prev">
              {group.colors.map((color, pi) => (
                <div className="inner-panel" key={pi} style={{ background: color }}>
                  <span>
                    {group.name}-{pi + 1}
                  </span>
                  <span className="panel-subtitle">swipe horizontally</span>
                </div>
              ))}
            </Flicking>
          </div>
        ))}
      </Flicking>
      <div className="info-bar">
        Current group: {GROUPS[outerIndex]?.name || "?"} (vertical: switch groups / horizontal: navigate within group)
      </div>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <Flicking
      :options="{
        horizontal: false,
        moveType: 'strict',
        bound: true,
        align: 'prev'
      }"
      class="outer-viewport"
      @changed="onOuterChanged"
    >
      <div v-for="(group, gi) in GROUPS" :key="gi" class="outer-panel">
        <div class="group-label">{{ group.name }} (swipe vertically to switch groups)</div>
        <Flicking :options="{ nested: true, moveType: 'strict', bound: true, align: 'prev' }">
          <div v-for="(color, pi) in group.colors" :key="pi"
               class="inner-panel" :style="{ background: color }">
            <span>{{ group.name }}-{{ pi + 1 }}</span>
            <span class="panel-subtitle">swipe horizontally</span>
          </div>
        </Flicking>
      </div>
    </Flicking>
    <div class="info-bar">
      Current group: {{ GROUPS[outerIndex]?.name }} (vertical: switch groups / horizontal: navigate within group)
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const GROUPS = [
  { name: "Group A", colors: ["#e74c3c", "#c0392b", "#e67e22"] },
  { name: "Group B", colors: ["#3498db", "#2980b9", "#1abc9c"] },
  { name: "Group C", colors: ["#2ecc71", "#27ae60", "#16a085"] }
];

const outerIndex = ref(0);
const onOuterChanged = e => {
  outerIndex.value = e.index;
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const GROUPS = [
  { name: "Group A", colors: ["#e74c3c", "#c0392b", "#e67e22"] },
  { name: "Group B", colors: ["#3498db", "#2980b9", "#1abc9c"] },
  { name: "Group C", colors: ["#2ecc71", "#27ae60", "#16a085"] }
];

const outerCamera = document.querySelector("#outer .flicking-camera");

GROUPS.forEach((group, gi) => {
  const outerPanel = document.createElement("div");
  outerPanel.className = "outer-panel";

  const label = document.createElement("div");
  label.className = "group-label";
  label.textContent = `${group.name} (swipe vertically to switch groups)`;
  outerPanel.appendChild(label);

  const innerViewport = document.createElement("div");
  innerViewport.className = "flicking-viewport";
  innerViewport.id = `inner-${gi}`;
  const innerCamera = document.createElement("div");
  innerCamera.className = "flicking-camera";
  innerViewport.appendChild(innerCamera);

  group.colors.forEach((color, pi) => {
    const panel = document.createElement("div");
    panel.className = "inner-panel";
    panel.style.background = color;
    panel.innerHTML = `<span>${group.name}-${pi + 1}</span><span class="panel-subtitle">swipe horizontally</span>`;
    innerCamera.appendChild(panel);
  });

  outerPanel.appendChild(innerViewport);
  outerCamera.appendChild(outerPanel);
});

const outerFlicking = new Flicking("#outer", {
  horizontal: false,
  moveType: "strict",
  bound: true,
  align: "prev"
});

GROUPS.forEach((_, gi) => {
  new Flicking(`#inner-${gi}`, {
    nested: true,
    moveType: "strict",
    bound: true,
    align: "prev"
  });
});

const infoBar = document.querySelector(".info-bar");
outerFlicking.on("changed", e => {
  infoBar.textContent = `Current group: ${GROUPS[e.index].name} (vertical: switch groups / horizontal: navigate within group)`;
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
  <div id="app">
    <div id="outer" class="flicking-viewport vertical outer-viewport">
      <div class="flicking-camera"></div>
    </div>
    <div class="info-bar">Current group: Group A (vertical: switch groups / horizontal: navigate within group)</div>
  </div>
</body>
</html>
```

### CSS
```css
.outer-viewport {
  height: 250px;
}

.outer-panel {
  width: 100%;
  height: 250px;
}

.inner-panel {
  width: 200px;
  height: 200px;
  margin: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
  flex-direction: column;
  gap: 4px;
}

.inner-panel .panel-subtitle {
  font-size: 12px;
  font-weight: normal;
  opacity: 0.8;
}

.group-label {
  text-align: center;
  font-size: 14px;
  color: #666;
  padding: 8px 0;
  font-weight: bold;
}

.info-bar {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 13px;
  color: #333;
  text-align: center;
}
```

# Carousel

Combine the [`circular`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular), [`panelsPerView`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview), and [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align) options to build various carousel UIs.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`circular`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) | `boolean` | `false` | Circular mode |
| [`panelsPerView`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview) | `number` | `-1` | Number of panels per view (-1 to disable) |
| [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align) | `string \| number` | `"center"` | Panel alignment position |

### Combination Comparison

| Combination | Behavior | Best For |
|-------------|----------|----------|
| `circular + panelsPerView: 3 + align: "prev"` | Infinite loop showing 3 panels | Product lists, card carousels |
| `circular + panelsPerView: 1 + align: "center"` | Infinite loop with 1 center-aligned panel | Hero sliders, banners |
| `circular: false + panelsPerView: 3 + bound` | 3-column slider with end boundaries | Finite lists, galleries |

## Details

### circular + panelsPerView Combination

When using `circular: true` together with `panelsPerView`, the specified number of panels are visible on screen while looping infinitely. Panel width is automatically calculated as `100% / panelsPerView`.

### Role of align

- `"prev"`: Panels are left-aligned — suitable for list-type carousels
- `"center"`: Current panel is centered — suitable for spotlight-type carousels

### Non-Circular Slider

Setting `circular: false` + `bound: true` creates a regular slider that stops without empty space at the end.

### Related Options

- **Relationship with `circularFallback`**: Sets fallback behavior when there are not enough panels for circular mode
- **Relationship with `bound`**: Use `bound: true` with `circular: false` to prevent empty space
- **Relationship with `noPanelStyleOverride`**: When using `panelsPerView`, you can disable automatic panel width setting and control it directly with CSS

### Use Cases

> **Info: When should you use this?**
- **Product carousel**: `circular + panelsPerView: 3~5` combination
- **Hero banner**: `circular + panelsPerView: 1 + align: "center"` combination
- **Image gallery**: `circular: false + panelsPerView: 3 + bound` combination

### Notes

> **Warning: Caution**
- For `circular: true` to work, the total panel width must be larger than the viewport. If there are not enough panels, check the `circularFallback` setting.
- When `panelsPerView` is set, the panel's CSS width is automatically overridden. Setting a separate width in CSS may cause conflicts.

## Related Links

### Related Options
- [`circular`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular): Circular mode
- [`panelsPerView`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview): Number of panels per view
- [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align): Panel alignment
- [`circularFallback`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circularfallback): Fallback behavior when circular is not possible
- [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound): Boundary restriction

### Related Demos
- [Circular](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/circular.md): On/off comparison of the circular option itself
- [Panels Per View](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/panels-per-view.md): Detailed panelsPerView option
- [Fullpage Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/fullpage-scroll.md): Other option combination patterns

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#2980b9"];

export default function App() {
  const panels = COLORS.map((color, i) => (
    <div className="flicking-panel" key={i} style={{ background: color }}>
      {i + 1}
    </div>
  ));

  return (
    <div>
      <div className="demo-section">
        <div className="demo-label">circular + panelsPerView: 3 + align: "prev"</div>
        <Flicking circular={true} panelsPerView={3} align="prev">
          {panels}
        </Flicking>
      </div>

      <div className="demo-section">
        <div className="demo-label">circular + panelsPerView: 1 + align: "center"</div>
        <Flicking circular={true} panelsPerView={1} align="center">
          {COLORS.map((color, i) => (
            <div className="flicking-panel" key={i} style={{ background: color }}>
              {i + 1}
            </div>
          ))}
        </Flicking>
      </div>

      <div className="demo-section">
        <div className="demo-label">circular: false + panelsPerView: 3 (bounded slider)</div>
        <Flicking circular={false} panelsPerView={3} align="prev" bound={true}>
          {COLORS.map((color, i) => (
            <div className="flicking-panel" key={i} style={{ background: color }}>
              {i + 1}
            </div>
          ))}
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
    <div class="demo-section">
      <div class="demo-label">
        circular + panelsPerView: 3 + align: "prev"
      </div>
      <Flicking :options="{ circular: true, panelsPerView: 3, align: 'prev' }">
        <div v-for="(color, i) in COLORS" :key="i"
             class="flicking-panel" :style="{ background: color }">
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>

    <div class="demo-section">
      <div class="demo-label">
        circular + panelsPerView: 1 + align: "center"
      </div>
      <Flicking :options="{ circular: true, panelsPerView: 1, align: 'center' }">
        <div v-for="(color, i) in COLORS" :key="'b' + i"
             class="flicking-panel" :style="{ background: color }">
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>

    <div class="demo-section">
      <div class="demo-label">
        circular: false + panelsPerView: 3 (bounded slider)
      </div>
      <Flicking :options="{ circular: false, panelsPerView: 3, align: 'prev', bound: true }">
        <div v-for="(color, i) in COLORS" :key="'c' + i"
             class="flicking-panel" :style="{ background: color }">
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#2980b9"];
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#2980b9"];

function createPanels(containerId) {
  const camera = document.querySelector(`#${containerId} .flicking-camera`);
  COLORS.forEach((color, i) => {
    const panel = document.createElement("div");
    panel.className = "flicking-panel";
    panel.style.background = color;
    panel.textContent = i + 1;
    camera.appendChild(panel);
  });
}

createPanels("flick1");
createPanels("flick2");
createPanels("flick3");

new Flicking("#flick1", {
  circular: true,
  panelsPerView: 3,
  align: "prev"
});

new Flicking("#flick2", {
  circular: true,
  panelsPerView: 1,
  align: "center"
});

new Flicking("#flick3", {
  circular: false,
  panelsPerView: 3,
  align: "prev",
  bound: true
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
    <div class="demo-section">
      <div class="demo-label">circular + panelsPerView: 3 + align: "prev"</div>
      <div id="flick1" class="flicking-viewport">
        <div class="flicking-camera"></div>
      </div>
    </div>
    <div class="demo-section">
      <div class="demo-label">circular + panelsPerView: 1 + align: "center"</div>
      <div id="flick2" class="flicking-viewport">
        <div class="flicking-camera"></div>
      </div>
    </div>
    <div class="demo-section">
      <div class="demo-label">circular: false + panelsPerView: 3 (bounded slider)</div>
      <div id="flick3" class="flicking-viewport">
        <div class="flicking-camera"></div>
      </div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-panel {
  height: 200px;
  margin-right: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.demo-section {
  margin-bottom: 24px;
}

.demo-label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
  font-size: 14px;
}
```

# Fullpage Scroll

Combine the [`moveType: "strict"`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype), [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound), and [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align) options to build a fullpage scroll UI.



## Summary

### Key Options

| Option | Type | Value | Role |
|--------|------|-------|------|
| [`moveType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype) | `string` | `"strict"` | Move only one page at a time |
| [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound) | `boolean` | `true` | Prevent empty space at both ends |
| [`align`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align) | `string` | `"prev"` | Align pages to the viewport start |
| [`horizontal`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal) | `boolean` | `false` | Vertical scrolling |

### Direction Comparison

| Direction | horizontal | Result | Required Setting |
|-----------|-----------|--------|------------------|
| Vertical (Fullpage) | `false` | Swipe up/down | Height must be set on viewport |
| Horizontal (Slider) | `true` | Swipe left/right | Default behavior |

## Details

### Role of moveType: "strict"

`moveType: "strict"` ensures that no matter how hard you swipe, only exactly one panel (one page) moves at a time. This is the key to fullpage scroll — `"snap"` (the default) can skip multiple panels depending on swipe strength, making it unsuitable for fullpage.

### Vertical Direction Setup

Setting `horizontal: false` enables vertical scrolling. In this case, you must specify a height (`height`) on the viewport element. Use `100vh` for fullscreen, or a fixed height for a specific area.

### Related Options

- **`moveType` is the key**: Only `"strict"` guarantees exactly 1-page movement
- **Combination with `bound`**: Prevents empty space from showing on the last page
- **Combination with `align: "prev"`**: Aligns each page flush with the viewport start

### Use Cases

> **Info: When should you use this?**
- Landing pages: Fullpage transitions between sections
- Presentation views: Slide navigation
- Mobile app onboarding: Step-by-step introduction screens

### Notes

> **Warning: Caution**
- For vertical direction (`horizontal: false`), `height` must be set on the viewport. Without it, the height becomes 0 and nothing will be visible.
- Vertical scrolling may conflict with the browser's default scroll. Using `preventDefaultOnDrag: true` together resolves this.

## Related Links

### Related Options
- [`moveType`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype): Movement type
- [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound): Boundary restriction
- [`horizontal`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal): Scroll direction
- [`preventDefaultOnDrag`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#preventdefaultondrag): Prevent default behavior on drag

### Related Demos
- [Movement Types](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/movement-types.md): Detailed comparison of moveType options
- [Carousel](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/carousel.md): Other option combination patterns

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";
import { useState } from "react";

const PAGES = [
  { title: "Page 1", subtitle: "Welcome", color: "#e74c3c" },
  { title: "Page 2", subtitle: "Features", color: "#3498db" },
  { title: "Page 3", subtitle: "Pricing", color: "#2ecc71" },
  { title: "Page 4", subtitle: "Contact", color: "#f39c12" },
  { title: "Page 5", subtitle: "About", color: "#9b59b6" }
];

export default function App() {
  const [isVertical, setIsVertical] = useState(true);

  return (
    <div>
      <div className="controls">
        <button className={`button ${isVertical ? "active" : ""}`} onClick={() => setIsVertical(true)}>
          Vertical (Fullpage)
        </button>
        <button className={`button ${!isVertical ? "active" : ""}`} onClick={() => setIsVertical(false)}>
          Horizontal (Slider)
        </button>
      </div>
      <Flicking key={isVertical ? "v" : "h"} horizontal={!isVertical} moveType="strict" bound={true} align="prev">
        {PAGES.map((page, i) => (
          <div className="page-panel" key={i} style={{ background: page.color }}>
            <span>{page.title}</span>
            <span className="page-subtitle">{page.subtitle}</span>
          </div>
        ))}
      </Flicking>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <div class="controls">
      <button :class="['button', isVertical && 'active']"
              @click="isVertical = true">
        Vertical (Fullpage)
      </button>
      <button :class="['button', !isVertical && 'active']"
              @click="isVertical = false">
        Horizontal (Slider)
      </button>
    </div>
    <Flicking
      :key="isVertical ? 'v' : 'h'"
      :options="{
        horizontal: !isVertical,
        moveType: 'strict',
        bound: true,
        align: 'prev'
      }"
    >
      <div v-for="(page, i) in PAGES" :key="i"
           class="page-panel" :style="{ background: page.color }">
        <span>{{ page.title }}</span>
        <span class="page-subtitle">{{ page.subtitle }}</span>
      </div>
    </Flicking>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const isVertical = ref(true);
const PAGES = [
  { title: "Page 1", subtitle: "Welcome", color: "#e74c3c" },
  { title: "Page 2", subtitle: "Features", color: "#3498db" },
  { title: "Page 3", subtitle: "Pricing", color: "#2ecc71" },
  { title: "Page 4", subtitle: "Contact", color: "#f39c12" },
  { title: "Page 5", subtitle: "About", color: "#9b59b6" }
];
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const PAGES = [
  { title: "Page 1", subtitle: "Welcome", color: "#e74c3c" },
  { title: "Page 2", subtitle: "Features", color: "#3498db" },
  { title: "Page 3", subtitle: "Pricing", color: "#2ecc71" },
  { title: "Page 4", subtitle: "Contact", color: "#f39c12" },
  { title: "Page 5", subtitle: "About", color: "#9b59b6" }
];

const camera = document.querySelector(".flicking-camera");
PAGES.forEach(page => {
  const panel = document.createElement("div");
  panel.className = "page-panel";
  panel.style.background = page.color;
  panel.innerHTML = `<span>${page.title}</span><span class="page-subtitle">${page.subtitle}</span>`;
  camera.appendChild(panel);
});

const viewport = document.getElementById("flick");
const btnVertical = document.getElementById("btn-vertical");
const btnHorizontal = document.getElementById("btn-horizontal");

let flicking = new Flicking("#flick", {
  horizontal: false,
  moveType: "strict",
  bound: true,
  align: "prev"
});

btnVertical.addEventListener("click", () => {
  flicking.destroy();
  viewport.classList.add("vertical");
  btnVertical.classList.add("active");
  btnHorizontal.classList.remove("active");
  flicking = new Flicking("#flick", {
    horizontal: false,
    moveType: "strict",
    bound: true,
    align: "prev"
  });
});

btnHorizontal.addEventListener("click", () => {
  flicking.destroy();
  viewport.classList.remove("vertical");
  btnHorizontal.classList.add("active");
  btnVertical.classList.remove("active");
  flicking = new Flicking("#flick", {
    horizontal: true,
    moveType: "strict",
    bound: true,
    align: "prev"
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
  <div id="app">
    <div class="controls">
      <button class="button active" id="btn-vertical">Vertical (Fullpage)</button>
      <button class="button" id="btn-horizontal">Horizontal (Slider)</button>
    </div>
    <div id="flick" class="flicking-viewport vertical">
      <div class="flicking-camera"></div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.page-panel {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: white;
  flex-direction: column;
  gap: 8px;
}

.page-panel .page-subtitle {
  font-size: 14px;
  font-weight: normal;
  opacity: 0.8;
}

.flicking-viewport {
  height: 300px;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 8px;
}

.button {
  padding: 8px 16px;
  border: 2px solid #3498db;
  background: transparent;
  color: #3498db;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background: #3498db;
  color: white;
}

.button.active {
  background: #3498db;
  color: white;
}
```

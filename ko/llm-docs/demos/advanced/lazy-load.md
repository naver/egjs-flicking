# Lazy Load

A performance optimization pattern that loads images only for visible panels by combining the [`renderOnlyVisible`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#renderonlyvisible) option with the `visibleChange` event.



## Summary

### Key Options/Events

| Item | Type | Default | Description |
|------|------|---------|-------------|
| [`renderOnlyVisible`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#renderonlyvisible) | `boolean` | `false` | Render only visible panels |
| [`visibleChange`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingEvents.md#visiblechange) | `VisibleChangeEvent` | - | Fired when the visible panels change |

### Event Properties

| Property | Type | Description |
|----------|------|-------------|
| `added` | `Panel[]` | Panels that newly entered the viewport |
| `removed` | `Panel[]` | Panels that left the viewport |
| `visiblePanels` | `Panel[]` | All currently visible panels |

### Behavior Comparison

| Method | Image Load Timing | Best For |
|--------|-------------------|----------|
| Normal loading | All panels loaded at once | Few panels (10 or less) |
| Lazy loading | Loaded when entering the viewport | Many panels (tens to hundreds) |

## Details

### How It Works

1. `renderOnlyVisible: true` renders only visible panels
2. Detect newly visible panels from the `added` array in the `visibleChange` event
3. Load images for those panels and record the load status
4. Images that have already been loaded are not loaded again (tracked with a Set)

### Initial Load

Since `visibleChange` has not fired yet right after Flicking initialization, you need to load images for the initially visible panels in the `ready` event.

### Related Options

- **Relationship with `renderOnlyVisible`**: This option is the core. It reduces DOM overhead by skipping rendering of non-visible panels
- **Relationship with `bound`**: Using `bound: true` together provides smooth scrolling without empty space at the end
- **Relationship with `align`**: `align: "prev"` is suitable for list-type layouts

### Use Cases

> **Info: When should you use this?**
- Galleries with many images (50+)
- Image optimization in infinite scroll feeds
- Reducing network load in mobile environments

### Notes

> **Warning: Caution**
- `renderOnlyVisible` is recommended for use in framework (React, Vue) environments
- Panels in the `added` array of the `visibleChange` event are `Panel` objects and can be identified by their `index` property
- During initial load, you need to separately handle visible panels in the `ready` event

## Related Links

### Related Options
- [`renderOnlyVisible`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#renderonlyvisible): Render only visible panels
- [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound): Boundary restriction

### Related Demos
- [Render Only Visible](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/render-only-visible.md): On/off comparison of the renderOnlyVisible option
- [Virtual Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/virtual-scroll.md): Handling large numbers of panels with virtual mode

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";
import { useCallback, useState } from "react";

const TOTAL = 100;
const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const getImageUrl = i => `https://picsum.photos/seed/${i}/250/180`;

export default function App() {
  const [loadedSet, setLoadedSet] = useState(new Set());
  const [loadedCount, setLoadedCount] = useState(0);

  const handleVisibleChange = useCallback(e => {
    setLoadedSet(prev => {
      const next = new Set(prev);
      e.added.forEach(panel => next.add(panel.index));
      const newCount = next.size;
      setLoadedCount(newCount);
      return next;
    });
  }, []);

  const handleReady = useCallback(e => {
    const visiblePanels = e.currentTarget.visiblePanels;
    setLoadedSet(prev => {
      const next = new Set(prev);
      visiblePanels.forEach(panel => next.add(panel.index));
      setLoadedCount(next.size);
      return next;
    });
  }, []);

  return (
    <div>
      <Flicking
        renderOnlyVisible={true}
        align="prev"
        bound={true}
        preventDefaultOnDrag={true}
        onReady={handleReady}
        onVisibleChange={handleVisibleChange}
      >
        {Array.from({ length: TOTAL }, (_, i) => (
          <div className="flicking-panel" key={i} style={{ background: COLORS[i % COLORS.length] }}>
            {loadedSet.has(i) ? (
              <img src={getImageUrl(i)} alt={`Panel ${i}`} />
            ) : (
              <div className="placeholder">Panel {i}</div>
            )}
          </div>
        ))}
      </Flicking>
      <div className="info-bar">
        Images loaded: {loadedCount} / {TOTAL}
        (only visible panels are loaded)
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
      :options="{ renderOnlyVisible: true, align: 'prev', bound: true, preventDefaultOnDrag: true }"
      @ready="onReady"
      @visible-change="onVisibleChange"
    >
      <div
        v-for="i in TOTAL"
        :key="i - 1"
        class="flicking-panel"
        :style="{ background: COLORS[(i - 1) % COLORS.length] }"
      >
        <img
          v-if="loadedSet.has(i - 1)"
          :src="getImageUrl(i - 1)"
          :alt="'Panel ' + (i - 1)"
        />
        <div v-else class="placeholder">Panel {{ i - 1 }}</div>
      </div>
    </Flicking>
    <div class="info-bar">
      Images loaded: {{ loadedCount }} / {{ TOTAL }}
      (only visible panels are loaded)
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const TOTAL = 100;
const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const getImageUrl = i => `https://picsum.photos/seed/${i}/250/180`;

const loadedSet = ref(new Set());
const loadedCount = ref(0);

const onReady = e => {
  e.currentTarget.visiblePanels.forEach(panel => {
    loadedSet.value.add(panel.index);
  });
  loadedCount.value = loadedSet.value.size;
};

const onVisibleChange = e => {
  e.added.forEach(panel => {
    loadedSet.value.add(panel.index);
  });
  loadedCount.value = loadedSet.value.size;
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const TOTAL = 100;
const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const getImageUrl = i => `https://picsum.photos/seed/${i}/250/180`;

const camera = document.querySelector(".flicking-camera");
for (let i = 0; i < TOTAL; i++) {
  const panel = document.createElement("div");
  panel.className = "flicking-panel";
  panel.style.background = COLORS[i % COLORS.length];
  panel.innerHTML = `<div class="placeholder">Panel ${i}</div>`;
  camera.appendChild(panel);
}

const loadedSet = new Set();
const infoBar = document.querySelector(".info-bar");

const updateInfo = () => {
  infoBar.textContent = `Images loaded: ${loadedSet.size} / ${TOTAL} (only visible panels are loaded)`;
};

const loadImage = panel => {
  const idx = panel.index;
  if (loadedSet.has(idx)) return;
  loadedSet.add(idx);
  panel.element.innerHTML = `<img src="${getImageUrl(idx)}" alt="Panel ${idx}" />`;
  updateInfo();
};

const flicking = new Flicking("#flick", {
  renderOnlyVisible: true,
  align: "prev",
  bound: true,
  preventDefaultOnDrag: true
});

flicking.on("ready", e => {
  e.currentTarget.visiblePanels.forEach(loadImage);
});

flicking.on("visibleChange", e => {
  e.added.forEach(loadImage);
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
    <div id="flick" class="flicking-viewport">
      <div class="flicking-camera"></div>
    </div>
    <div class="info-bar">Images loaded: 0 / 100 (only visible panels are loaded)</div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 250px;
  height: 180px;
  margin-right: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
  position: relative;
  overflow: hidden;
}

.flicking-panel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flicking-panel .placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #ddd;
  color: #999;
  font-size: 14px;
}

.info-bar {
  margin-top: 12px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
```

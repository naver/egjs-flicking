# Resize On Contents Ready

Use the [`resizeOnContentsReady`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizeoncontentsready) option to automatically recalculate panel size and position after images/videos have loaded.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`resizeOnContentsReady`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizeoncontentsready) | `boolean` | `false` | Automatically recalculate panel size when content loads |

### Mode Comparison

| resizeOnContentsReady | Behavior After Image Load |
|----------------------|---------------------------|
| `false` | Flicking's internal panel size stays as it was at initialization — scroll range and snap positions become misaligned |
| `true` | Panel size is recalculated — scroll range and snap positions are correct |

## Details

### How It Works

1. Panel sizes are calculated at Flicking initialization
2. Images/videos have not loaded yet, so sizes are 0 or placeholder size
3. After image load completes, the actual size changes
4. With `resizeOnContentsReady: true`, panel sizes are automatically recalculated and positions updated via [`@egjs/imready`](https://github.com/nicegist/egjs-imready)

```tsx
<Flicking
  resizeOnContentsReady={true}
>
  
    <img src="image.jpg" /> {/* Panel size automatically recalculated when load completes */}
  
</Flicking>
```

### What Gets Recalculated

When `resizeOnContentsReady` detects image/video load, the following are updated:

- **Panel size** (`panel.resize()`)
- **Subsequent panel positions** (`updatePosition()`)
- **Camera scroll range** (`camera.updateRange()`)
- **Snap points** (`camera.updateAnchors()`)

### Detected Content Types

Load events are detected for the following elements within panels:

- `<img>` images
- `<video>` videos

### Use Cases

> **Info: When should you use resizeOnContentsReady?**

**Recommended:**
- When panel size depends on images/videos
- When panel size is not pre-fixed with CSS
- When loading images from the network

**Not necessary:**
- When panel size is pre-fixed with CSS (e.g., `width: 200px`)
- Text-only panels
- When images are included as base64 inline

### Manual resize Alternative

When `resizeOnContentsReady: false`, you can manually call resize:

```javascript
// Manual resize after image load completes
img.addEventListener("load", () => {
  flicking.resize();
});
```

## Related Links

### Related Options
- [`adaptive`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#adaptive): Auto-adjust viewport height
- [`autoResize`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize): Auto resize on window resize

### Related Methods
- [`resize`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#resize): Manual layout recalculation

### Related Demos
- [Adaptive](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/adaptive.md): Adaptive option demo

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

// Use various widths so panel size depends on images
// Cache-busting to load new images each time (no difference when cached)
const t = Date.now();
const IMAGES = [
  `https://picsum.photos/300/150?t=${t}&r=1`,
  `https://picsum.photos/200/150?t=${t}&r=2`,
  `https://picsum.photos/400/150?t=${t}&r=3`,
  `https://picsum.photos/250/150?t=${t}&r=4`
];

export default function App() {
  const autoRef = useRef(null);
  const manualRef = useRef(null);
  const [autoSizes, setAutoSizes] = useState("-");
  const [manualSizes, setManualSizes] = useState("-");

  const updateSizes = () => {
    setTimeout(() => {
      try {
        if (autoRef.current) {
          setAutoSizes(autoRef.current.panels.map(p => Math.round(p.size)).join(", "));
        }
        if (manualRef.current) {
          setManualSizes(manualRef.current.panels.map(p => Math.round(p.size)).join(", "));
        }
      } catch (_e) {
        /* ignore */
      }
    }, 500);
  };

  const moveToPanel = index => {
    if (autoRef.current) autoRef.current.moveTo(index, 500).catch(() => {});
    if (manualRef.current) manualRef.current.moveTo(index, 500).catch(() => {});
  };

  return (
    <div>
      <div className="demo-container">
        <div className="demo-label">resizeOnContentsReady: true</div>
        <div className="demo-info">Auto-recalculates panel size & position after image load → correct scrolling</div>
        <Flicking
          ref={autoRef}
          align="prev"
          resizeOnContentsReady={true}
          preventDefaultOnDrag={true}
          bound={true}
          onReady={() => updateSizes()}
        >
          {IMAGES.map((src, i) => (
            <div key={i} className="flicking-panel">
              <img src={src} alt={`Panel ${i + 1}`} onLoad={() => updateSizes()} />
              <div className="panel-label">Panel {i + 1}</div>
            </div>
          ))}
        </Flicking>
        <div className="status-display">
          Flicking internal panel widths: <strong>[{autoSizes}]</strong>
        </div>
      </div>

      <div className="demo-container">
        <div className="demo-label">resizeOnContentsReady: false (default)</div>
        <div className="demo-info">Panel sizes not recalculated → size mismatch, incorrect scroll position</div>
        <Flicking
          ref={manualRef}
          align="prev"
          resizeOnContentsReady={false}
          preventDefaultOnDrag={true}
          bound={true}
          onReady={() => updateSizes()}
        >
          {IMAGES.map((src, i) => (
            <div key={i} className="flicking-panel">
              <img src={src} alt={`Panel ${i + 1}`} onLoad={() => updateSizes()} />
              <div className="panel-label">Panel {i + 1}</div>
            </div>
          ))}
        </Flicking>
        <div className="status-display">
          Flicking internal panel widths: <strong>[{manualSizes}]</strong>
        </div>
      </div>

      <div className="controls">
        <button className="button" onClick={() => moveToPanel(0)}>
          Panel 1
        </button>
        <button className="button" onClick={() => moveToPanel(1)}>
          Panel 2
        </button>
        <button className="button" onClick={() => moveToPanel(2)}>
          Panel 3
        </button>
        <button className="button" onClick={() => moveToPanel(3)}>
          Panel 4
        </button>
      </div>
    </div>
  );
}
```

### Vue3
```vue
<template>
  <div>
    <div class="demo-container">
      <div class="demo-label">resizeOnContentsReady: true</div>
      <div class="demo-info">Auto-recalculates panel size & position after image load → correct scrolling</div>
      <Flicking
        ref="autoFlicking"
        :options="{ align: 'prev', resizeOnContentsReady: true, preventDefaultOnDrag: true, bound: true }"
        @ready="updateSizes"
      >
        <div v-for="(src, i) in images" :key="'auto-' + i" class="flicking-panel">
          <img :src="src" :alt="'Panel ' + (i + 1)" @load="updateSizes" />
          <div class="panel-label">Panel {{ i + 1 }}</div>
        </div>
      </Flicking>
      <div class="status-display">
        Flicking internal panel widths: <strong>[{{ autoSizes }}]</strong>
      </div>
    </div>

    <div class="demo-container">
      <div class="demo-label">resizeOnContentsReady: false (default)</div>
      <div class="demo-info">Panel sizes not recalculated → size mismatch, incorrect scroll position</div>
      <Flicking
        ref="manualFlicking"
        :options="{ align: 'prev', resizeOnContentsReady: false, preventDefaultOnDrag: true, bound: true }"
        @ready="updateSizes"
      >
        <div v-for="(src, i) in images" :key="'manual-' + i" class="flicking-panel">
          <img :src="src" :alt="'Panel ' + (i + 1)" @load="updateSizes" />
          <div class="panel-label">Panel {{ i + 1 }}</div>
        </div>
      </Flicking>
      <div class="status-display">
        Flicking internal panel widths: <strong>[{{ manualSizes }}]</strong>
      </div>
    </div>

    <div class="controls">
      <button class="button" @click="moveToPanel(0)">Panel 1</button>
      <button class="button" @click="moveToPanel(1)">Panel 2</button>
      <button class="button" @click="moveToPanel(2)">Panel 3</button>
      <button class="button" @click="moveToPanel(3)">Panel 4</button>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const t = Date.now();

const images = [
  `https://picsum.photos/300/150?t=${t}&r=1`,
  `https://picsum.photos/200/150?t=${t}&r=2`,
  `https://picsum.photos/400/150?t=${t}&r=3`,
  `https://picsum.photos/250/150?t=${t}&r=4`
];
const autoFlicking = ref(null);
const manualFlicking = ref(null);
const autoSizes = ref("-");
const manualSizes = ref("-");

const updateSizes = () => {
  setTimeout(() => {
    try {
      if (autoFlicking.value) {
        autoSizes.value = autoFlicking.value.panels.map(p => Math.round(p.size)).join(", ");
      }
      if (manualFlicking.value) {
        manualSizes.value = manualFlicking.value.panels.map(p => Math.round(p.size)).join(", ");
      }
    } catch (e) {
      /* ignore */
    }
  }, 500);
};
const moveToPanel = index => {
  if (autoFlicking.value) autoFlicking.value.moveTo(index, 500).catch(() => {});
  if (manualFlicking.value) manualFlicking.value.moveTo(index, 500).catch(() => {});
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const t = Date.now();
const HEIGHTS_WIDTHS = [
  [300, 150],
  [200, 150],
  [400, 150],
  [250, 150]
];

// Set image src before Flicking init, so resizeOnContentsReady can detect them
document.querySelectorAll("#flick-auto .flicking-panel img").forEach((img, i) => {
  img.src = `https://picsum.photos/${HEIGHTS_WIDTHS[i][0]}/${HEIGHTS_WIDTHS[i][1]}?t=${t}&r=${i + 1}`;
});
document.querySelectorAll("#flick-manual .flicking-panel img").forEach((img, i) => {
  img.src = `https://picsum.photos/${HEIGHTS_WIDTHS[i][0]}/${HEIGHTS_WIDTHS[i][1]}?t=${t}&r=${i + 5}`;
});

const autoFlicking = new Flicking("#flick-auto", {
  align: "prev",
  resizeOnContentsReady: true,
  preventDefaultOnDrag: true,
  bound: true
});

const manualFlicking = new Flicking("#flick-manual", {
  align: "prev",
  resizeOnContentsReady: false,
  preventDefaultOnDrag: true,
  bound: true
});

function updateSizes() {
  setTimeout(() => {
    try {
      document.getElementById("auto-sizes").textContent = autoFlicking.panels.map(p => Math.round(p.size)).join(", ");
      document.getElementById("manual-sizes").textContent = manualFlicking.panels
        .map(p => Math.round(p.size))
        .join(", ");
    } catch (_e) {
      /* ignore */
    }
  }, 500);
}

autoFlicking.on("ready", updateSizes);
manualFlicking.on("ready", updateSizes);

document.querySelectorAll("#flick-auto img").forEach(img => {
  img.addEventListener("load", updateSizes);
});
document.querySelectorAll("#flick-manual img").forEach(img => {
  img.addEventListener("load", updateSizes);
});

document.querySelectorAll(".move-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const idx = parseInt(btn.dataset.index, 10);
    autoFlicking.moveTo(idx, 500).catch(() => {});
    manualFlicking.moveTo(idx, 500).catch(() => {});
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
  <div class="demo-container">
    <div class="demo-label">resizeOnContentsReady: true</div>
    <div class="demo-info">Auto-recalculates panel size & position after image load → correct scrolling</div>
    <div id="flick-auto" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel"><img alt="Panel 1" /><div class="panel-label">Panel 1</div></div>
        <div class="flicking-panel"><img alt="Panel 2" /><div class="panel-label">Panel 2</div></div>
        <div class="flicking-panel"><img alt="Panel 3" /><div class="panel-label">Panel 3</div></div>
        <div class="flicking-panel"><img alt="Panel 4" /><div class="panel-label">Panel 4</div></div>
      </div>
    </div>
    <div class="status-display">
      Flicking internal panel widths: <strong id="auto-sizes">-</strong>
    </div>
  </div>

  <div class="demo-container">
    <div class="demo-label">resizeOnContentsReady: false (default)</div>
    <div class="demo-info">Panel sizes not recalculated → size mismatch, incorrect scroll position</div>
    <div id="flick-manual" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel"><img alt="Panel 1" /><div class="panel-label">Panel 1</div></div>
        <div class="flicking-panel"><img alt="Panel 2" /><div class="panel-label">Panel 2</div></div>
        <div class="flicking-panel"><img alt="Panel 3" /><div class="panel-label">Panel 3</div></div>
        <div class="flicking-panel"><img alt="Panel 4" /><div class="panel-label">Panel 4</div></div>
      </div>
    </div>
    <div class="status-display">
      Flicking internal panel widths: <strong id="manual-sizes">-</strong>
    </div>
  </div>

  <div class="controls">
    <button class="move-btn button" data-index="0">Panel 1</button>
    <button class="move-btn button" data-index="1">Panel 2</button>
    <button class="move-btn button" data-index="2">Panel 3</button>
    <button class="move-btn button" data-index="3">Panel 4</button>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: auto;
  height: auto;
  margin-right: 10px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.flicking-panel img {
  height: 150px;
  width: auto;
  display: block;
}

.panel-label {
  padding: 4px 8px;
  text-align: center;
  font-size: 12px;
  color: #333;
  background: #e0e0e0;
  white-space: nowrap;
}

.demo-container {
  margin-bottom: 32px;
}

.demo-info {
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
}
.status-display {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
.status-display strong {
  color: #3e8ed0;
}
```

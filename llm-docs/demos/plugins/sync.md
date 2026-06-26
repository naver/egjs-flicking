# Sync

Synchronizes multiple Flicking instances. Commonly used to link a main image with a thumbnail gallery.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `"camera" \| "index"` | `"camera"` | Synchronization mode. `camera` syncs camera position, `index` syncs by panel index |
| `synchronizedFlickingOptions` | `SyncOption[]` | `[]` | List of Flicking instances and options to synchronize |

### SyncOption

| Option | Type | Description |
|--------|------|-------------|
| `flicking` | `Flicking` | Flicking instance to synchronize |
| `isSlidable` | `boolean` | Whether dragging to slide is enabled |
| `isClickable` | `boolean` | Whether clicking to move to that panel is enabled |
| `activeClass` | `string` | CSS class to add to the active panel |

## Details

### Synchronization Types

| Type | Description | Use Case |
|------|-------------|----------|
| `camera` | Moves the camera position of all Flickings simultaneously | Displaying the same content in different views |
| `index` | When a panel is changed in one Flicking, the other Flickings move to the same index | Main image + thumbnail |

### Framework-specific Usage

**React** — Access instances using `useRef` and `useEffect`:
```jsx
const mainRef = useRef(null);
const thumbRef = useRef(null);
const [plugins, setPlugins] = useState([]);

useEffect(() => {
  setPlugins([new Sync({
    type: "index",
    synchronizedFlickingOptions: [
      { flicking: mainRef.current, isSlidable: true },
      { flicking: thumbRef.current, isClickable: true, activeClass: "active" }
    ]
  })]);
}, []);
```

**Vue** — Access instances using `ref()` and `onMounted`:
```js
const mainRef = ref(null);
const thumbRef = ref(null);
const plugins = ref([]);

onMounted(() => {
  plugins.value = [new Sync({
    type: "index",
    synchronizedFlickingOptions: [
      { flicking: mainRef.value, isSlidable: true },
      { flicking: thumbRef.value, isClickable: true, activeClass: "active" }
    ]
  })];
});
```

### Notes

> **Warning: Caution**
- The Sync plugin must be created after the Flicking instances are mounted. In React, use `useEffect`; in Vue, use `onMounted`.
- For the `index` type, the synchronized Flickings must have the same number of panels to work correctly.
- The plugin only needs to be added (`addPlugins`) to one of the synchronized Flickings.

## Related Links

### Related Demos
- [Arrow](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/arrow.md): Use with arrow navigation
- [Pagination](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/pagination.md): Use with page indicator

## Code

### React
```jsx
import { Sync } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import { useEffect, useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const IMAGES = [
  "https://picsum.photos/seed/sync1/600/300",
  "https://picsum.photos/seed/sync2/600/300",
  "https://picsum.photos/seed/sync3/600/300",
  "https://picsum.photos/seed/sync4/600/300",
  "https://picsum.photos/seed/sync5/600/300",
  "https://picsum.photos/seed/sync6/600/300"
];

export default function App() {
  const mainRef = useRef(null);
  const thumbRef = useRef(null);
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    if (mainRef.current && thumbRef.current) {
      setPlugins([
        new Sync({
          type: "index",
          synchronizedFlickingOptions: [
            { flicking: mainRef.current, isSlidable: true },
            { flicking: thumbRef.current, isClickable: true, activeClass: "active" }
          ]
        })
      ]);
    }
  }, []);

  return (
    <div>
      <Flicking ref={mainRef} plugins={plugins} bounce={30} preventDefaultOnDrag={true}>
        {IMAGES.map((src, i) => (
          <div className="main-panel" key={i}>
            <img src={src} />
          </div>
        ))}
      </Flicking>
      <Flicking
        ref={thumbRef}
        className="thumb-flicking"
        bound={true}
        bounce={30}
        moveType="freeScroll"
        preventDefaultOnDrag={true}
      >
        {IMAGES.map((src, i) => (
          <div className="thumb-panel" key={i}>
            <img src={src} />
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
    <Flicking ref="mainRef" :options="{ bounce: 30, preventDefaultOnDrag: true }" :plugins="plugins">
      <div v-for="(src, i) in IMAGES" :key="i" class="main-panel">
        <img :src="src" />
      </div>
    </Flicking>
    <Flicking ref="thumbRef" class="thumb-flicking"
              :options="{ bound: true, bounce: 30, moveType: 'freeScroll', preventDefaultOnDrag: true }">
      <div v-for="(src, i) in IMAGES" :key="i" class="thumb-panel">
        <img :src="src" />
      </div>
    </Flicking>
  </div>
</template>

<script setup>
import { Sync } from "@egjs/flicking-plugins";
import Flicking from "@egjs/vue3-flicking";
import { onMounted, ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const IMAGES = [
  "https://picsum.photos/seed/sync1/600/300",
  "https://picsum.photos/seed/sync2/600/300",
  "https://picsum.photos/seed/sync3/600/300",
  "https://picsum.photos/seed/sync4/600/300",
  "https://picsum.photos/seed/sync5/600/300",
  "https://picsum.photos/seed/sync6/600/300"
];

const mainRef = ref(null);
const thumbRef = ref(null);
const plugins = ref([]);

onMounted(() => {
  plugins.value = [
    new Sync({
      type: "index",
      synchronizedFlickingOptions: [
        { flicking: mainRef.value, isSlidable: true },
        { flicking: thumbRef.value, isClickable: true, activeClass: "active" }
      ]
    })
  ];
});
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import { Sync } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const IMAGES = [
  "https://picsum.photos/seed/sync1/600/300",
  "https://picsum.photos/seed/sync2/600/300",
  "https://picsum.photos/seed/sync3/600/300",
  "https://picsum.photos/seed/sync4/600/300",
  "https://picsum.photos/seed/sync5/600/300",
  "https://picsum.photos/seed/sync6/600/300"
];

const mainCamera = document.querySelector("#main .flicking-camera");
const thumbCamera = document.querySelector("#thumb .flicking-camera");

IMAGES.forEach(src => {
  const mainPanel = document.createElement("div");
  mainPanel.className = "main-panel";
  mainPanel.innerHTML = `<img src="${src}" />`;
  mainCamera.appendChild(mainPanel);

  const thumbPanel = document.createElement("div");
  thumbPanel.className = "thumb-panel";
  thumbPanel.innerHTML = `<img src="${src}" />`;
  thumbCamera.appendChild(thumbPanel);
});

const mainFlicking = new Flicking("#main", { bounce: 30, preventDefaultOnDrag: true });
const thumbFlicking = new Flicking("#thumb", {
  bound: true,
  bounce: 30,
  moveType: "freeScroll",
  preventDefaultOnDrag: true
});

mainFlicking.addPlugins(
  new Sync({
    type: "index",
    synchronizedFlickingOptions: [
      { flicking: mainFlicking, isSlidable: true },
      { flicking: thumbFlicking, isClickable: true, activeClass: "active" }
    ]
  })
);
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
    <div id="main" class="flicking-viewport">
      <div class="flicking-camera"></div>
    </div>
    <div id="thumb" class="flicking-viewport thumb-flicking">
      <div class="flicking-camera"></div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.main-panel {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.main-panel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-panel {
  width: 80px;
  height: 60px;
  margin-right: 5px;
  overflow: hidden;
  opacity: 0.5;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition:
    opacity 0.3s,
    border-color 0.3s;
}

.thumb-panel.active {
  opacity: 1;
  border-color: #3498db;
}

.thumb-panel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-flicking {
  margin-top: 10px;
}
```

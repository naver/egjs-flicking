# Virtual Scroll

Use the [`virtual`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#virtual) option to virtually render a large number of panels and significantly reduce memory usage.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`virtual`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#virtual) | `VirtualOptions \| null` | `null` | Virtual rendering settings |
| [`panelsPerView`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview) | `number` | `-1` | Number of panels visible in the viewport (required when using virtual) |

### VirtualOptions Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `renderPanel` | `(panel, index) => string` | - | Function that returns panel innerHTML |
| `initialPanelCount` | `number` | `-1` | Initial virtual panel count |
| `cache` | `boolean` | `false` | Whether to cache rendering results |
| `panelClass` | `string` | `"flicking-panel"` | Panel element class name |

### Mode Comparison

| Mode | DOM Elements with 1000 panels | Memory Usage | Initial Rendering |
|------|-------------------------------|--------------|-------------------|
| Normal mode | 1000 | High | Slow |
| Virtual mode | ~4 (`panelsPerView + 1`) | Low | Fast |

## Details

### Virtual Rendering Principle

Virtual mode keeps only the visible panels + buffer in the actual DOM:

```javascript
// 1000 logical panels, only 4 actual DOM elements
const flicking = new Flicking("#el", {
  panelsPerView: 3,  // Required: number of visible panels
  virtual: {
    renderPanel: (panel, index) => `Panel ${index + 1}`,
    initialPanelCount: 1000,
    cache: true  // Prevent re-rendering of the same panel
  }
});
```

During scrolling, DOM elements are recycled and replaced with new panel content. This approach can handle 1,000, 10,000 or more panels with constant memory usage.

### Required Setting: panelsPerView

> **Warning: panelsPerView Required**
To use the `virtual` option, you must set `panelsPerView` to a positive number.
If `panelsPerView: -1` (auto), virtual is ignored.

```javascript
// Correct setting
{ panelsPerView: 3, virtual: { ... } }  // Works

// Incorrect setting
{ panelsPerView: -1, virtual: { ... } }  // virtual is ignored
```

### renderPanel Callback

`renderPanel` is called whenever a panel appears on screen and returns its innerHTML:

```javascript
virtual: {
  renderPanel: (panel, index) => {
    // index: 0-based panel index
    return `
      <img src="/images/item-${index}.jpg" />
      <span>Item ${index + 1}</span>
    `;
  },
  initialPanelCount: 1000
}
```

### cache Option

```javascript
// cache: true (recommended for static content)
virtual: {
  renderPanel: (panel, index) => `Panel ${index}`,
  cache: true  // Reuse previously rendered panel content
}

// cache: false (for dynamic content)
virtual: {
  renderPanel: (panel, index) => `Panel ${index}: ${Date.now()}`,
  cache: false  // Re-render every time
}
```

### VirtualManager Methods

You can add/remove virtual panels at runtime:

```javascript
// Add panels
flicking.virtual.append(100);     // Append 100 to the end
flicking.virtual.prepend(50);     // Prepend 50 to the front
flicking.virtual.insert(10, 20);  // Insert 20 at index 10

// Remove panels
flicking.virtual.remove(0, 10);   // Remove 10 starting from index 0
```

## Use Cases

> **Info: When should you use virtual?**

**Recommended:**
- When there are many panels (50+)
- Image galleries, product lists, and other large datasets
- Infinite scroll implementation
- Mobile environments with memory constraints

**Not necessary:**
- When there are few panels (less than 10)
- When complex panel interactions are needed
- When panel content is highly dynamic

### Notes

> **Warning: Framework Differences**
In React and Vue, `renderPanel` returns an HTML string. If you need component rendering, consider the [`renderOnlyVisible`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#renderonlyvisible) option instead.

> **Warning: renderPanel Performance**
`renderPanel` is called frequently during scrolling. Avoid complex computations or DOM manipulations, and leverage `cache: true`.

## Related Links

### Related Options
- [`panelsPerView`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview): Number of panels visible in the viewport
- [`renderOnlyVisible`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#renderonlyvisible): Render only visible panels in React/Vue

### Related Classes
- [`VirtualManager`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/VirtualManager.md): Virtual panel manager

### Related Demos
- [Render Only Visible](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/render-only-visible.md): Framework-optimized rendering
- [Infinite Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/infinite-scroll.md): Infinite scroll implementation

## Code

### React
```jsx
import Flicking, { VirtualPanel } from "@egjs/react-flicking";
import { useEffect, useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const TOTAL_PANELS = 1000;
const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

export default function App() {
  const normalFlickingRef = useRef(null);
  const virtualFlickingRef = useRef(null);
  const [normalDomCount, setNormalDomCount] = useState(0);
  const [virtualDomCount, setVirtualDomCount] = useState(0);

  // Update DOM element count
  const updateDomCounts = () => {
    if (normalFlickingRef.current) {
      const panels = normalFlickingRef.current.element.querySelectorAll(".flicking-panel");
      setNormalDomCount(panels.length);
    }
    if (virtualFlickingRef.current) {
      const panels = virtualFlickingRef.current.element.querySelectorAll(".flicking-panel");
      setVirtualDomCount(panels.length);
    }
  };

  useEffect(() => {
    updateDomCounts();
  }, [updateDomCounts]);

  // Normal mode panel array (100 only - 1000 causes memory issues)
  const normalPanels = Array.from({ length: 100 }, (_, i) => ({
    index: i,
    color: COLORS[i % COLORS.length]
  }));

  return (
    <div>
      {/* Virtual mode: 1000 panels */}
      <div className="demo-container">
        <div className="demo-label">virtual enabled (1000 panels)</div>
        <div className="demo-info">Only panelsPerView + 1 DOM elements are maintained</div>
        <Flicking
          ref={virtualFlickingRef}
          align="prev"
          panelsPerView={3}
          virtual={{
            renderPanel: (panel, index) => `<div class="panel-inner color-${index % 7}">Panel ${index + 1}</div>`,
            initialPanelCount: TOTAL_PANELS,
            cache: true,
            panelClass: "flicking-panel"
          }}
          onMove={() => updateDomCounts()}
        />
        <div className="dom-counter">
          Total <strong>{TOTAL_PANELS}</strong> panels, DOM elements: <strong>{virtualDomCount}</strong>
        </div>
      </div>

      {/* Normal mode: 100 panels (for comparison) */}
      <div className="demo-container">
        <div className="demo-label">virtual disabled (100 panels - for comparison)</div>
        <div className="demo-info">All panels exist in the DOM</div>
        <Flicking ref={normalFlickingRef} align="prev" onReady={() => updateDomCounts()}>
          {normalPanels.map(panel => (
            <div key={panel.index} className="flicking-panel" style={{ background: panel.color }}>
              Panel {panel.index + 1}
            </div>
          ))}
        </Flicking>
        <div className="dom-counter">
          Total <strong>{normalPanels.length}</strong> panels = DOM elements: <strong>{normalDomCount}</strong>
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
    <!-- Virtual mode: 1000 panels -->
    <div class="demo-container">
      <div class="demo-label">virtual enabled (1000 panels)</div>
      <div class="demo-info">Only panelsPerView + 1 DOM elements are maintained</div>
      <Flicking
        ref="virtualFlicking"
        :options="virtualOptions"
        @move="updateDomCounts"
        @ready="updateDomCounts"
      />
      <div class="dom-counter">
        Total <strong>1000</strong> panels, DOM elements: <strong>{{ virtualDomCount }}</strong>
      </div>
    </div>

    <!-- Normal mode: 100 panels (for comparison) -->
    <div class="demo-container">
      <div class="demo-label">virtual disabled (100 panels - for comparison)</div>
      <div class="demo-info">All panels exist in the DOM</div>
      <Flicking
        ref="normalFlicking"
        :options="{ align: 'prev' }"
        @ready="updateDomCounts"
      >
        <div
          v-for="panel in normalPanels"
          :key="panel.index"
          class="flicking-panel"
          :style="{ background: panel.color }"
        >
          Panel {{ panel.index + 1 }}
        </div>
      </Flicking>
      <div class="dom-counter">
        Total <strong>{{ normalPanels.length }}</strong> panels = DOM elements: <strong>{{ normalDomCount }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { nextTick, ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];
const normalFlicking = ref(null);
const virtualFlicking = ref(null);
const normalDomCount = ref(0);
const virtualDomCount = ref(0);
const normalPanels = Array.from({ length: 100 }, (_, i) => ({
  index: i,
  color: COLORS[i % COLORS.length]
}));
const virtualOptions = {
  align: "prev",
  panelsPerView: 3,
  virtual: {
    renderPanel: (panel, index) => {
      return `<div class="panel-inner color-${index % 7}">Panel ${index + 1}</div>`;
    },
    initialPanelCount: 1000,
    cache: true,
    panelClass: "flicking-panel"
  }
};

const updateDomCounts = () => {
  nextTick(() => {
    if (normalFlicking.value) {
      const panels = normalFlicking.value.$el.querySelectorAll(".flicking-panel");
      normalDomCount.value = panels.length;
    }
    if (virtualFlicking.value) {
      const panels = virtualFlicking.value.$el.querySelectorAll(".flicking-panel");
      virtualDomCount.value = panels.length;
    }
  });
};
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const TOTAL_PANELS = 1000;
const _COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

// Virtual mode: 1000 panels
const virtualFlicking = new Flicking("#flick-virtual", {
  align: "prev",
  panelsPerView: 3,
  virtual: {
    renderPanel: (panel, index) => `<div class="panel-inner color-${index % 7}">Panel ${index + 1}</div>`,
    initialPanelCount: TOTAL_PANELS,
    cache: true,
    panelClass: "flicking-panel"
  }
});

// Normal mode: 100 panels (for comparison)
// In normal mode, panels are created as HTML elements
const normalFlicking = new Flicking("#flick-normal", {
  align: "prev"
});

// Update DOM element count
function updateDomCounts() {
  const virtualCount = document.querySelectorAll("#flick-virtual .flicking-panel").length;
  const normalCount = document.querySelectorAll("#flick-normal .flicking-panel").length;

  document.getElementById("virtual-count").textContent = virtualCount;
  document.getElementById("normal-count").textContent = normalCount;
}

virtualFlicking.on("move", updateDomCounts);
virtualFlicking.on("ready", updateDomCounts);
normalFlicking.on("ready", updateDomCounts);

updateDomCounts();
```

### HTML (for vanilla JS)
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <!-- Virtual mode: 1000 panels -->
  <div class="demo-container">
    <div class="demo-label">virtual enabled (1000 panels)</div>
    <div class="demo-info">Only panelsPerView + 1 DOM elements are maintained</div>
    <div id="flick-virtual" class="flicking-viewport">
      <div class="flicking-camera">
        <!-- panels are auto-generated in virtual mode -->
      </div>
    </div>
    <div class="dom-counter">
      Total <strong>1000</strong> panels, DOM elements: <strong id="virtual-count">0</strong>
    </div>
  </div>

  <!-- Normal mode: 100 panels (for comparison) -->
  <div class="demo-container">
    <div class="demo-label">virtual disabled (100 panels - for comparison)</div>
    <div class="demo-info">All panels exist in the DOM</div>
    <div id="flick-normal" class="flicking-viewport">
      <div class="flicking-camera">
        
        <div class="flicking-panel" style="background: #3e8ed0">Panel 1</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 2</div>
        <div class="flicking-panel" style="background: #f14668">Panel 3</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 4</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 5</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 6</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 7</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 8</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 9</div>
        <div class="flicking-panel" style="background: #f14668">Panel 10</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 11</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 12</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 13</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 14</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 15</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 16</div>
        <div class="flicking-panel" style="background: #f14668">Panel 17</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 18</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 19</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 20</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 21</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 22</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 23</div>
        <div class="flicking-panel" style="background: #f14668">Panel 24</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 25</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 26</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 27</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 28</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 29</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 30</div>
        <div class="flicking-panel" style="background: #f14668">Panel 31</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 32</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 33</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 34</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 35</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 36</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 37</div>
        <div class="flicking-panel" style="background: #f14668">Panel 38</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 39</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 40</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 41</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 42</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 43</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 44</div>
        <div class="flicking-panel" style="background: #f14668">Panel 45</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 46</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 47</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 48</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 49</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 50</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 51</div>
        <div class="flicking-panel" style="background: #f14668">Panel 52</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 53</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 54</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 55</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 56</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 57</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 58</div>
        <div class="flicking-panel" style="background: #f14668">Panel 59</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 60</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 61</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 62</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 63</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 64</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 65</div>
        <div class="flicking-panel" style="background: #f14668">Panel 66</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 67</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 68</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 69</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 70</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 71</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 72</div>
        <div class="flicking-panel" style="background: #f14668">Panel 73</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 74</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 75</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 76</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 77</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 78</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 79</div>
        <div class="flicking-panel" style="background: #f14668">Panel 80</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 81</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 82</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 83</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 84</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 85</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 86</div>
        <div class="flicking-panel" style="background: #f14668">Panel 87</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 88</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 89</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 90</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 91</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 92</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 93</div>
        <div class="flicking-panel" style="background: #f14668">Panel 94</div>
        <div class="flicking-panel" style="background: #ffe08a">Panel 95</div>
        <div class="flicking-panel" style="background: #48c78e">Panel 96</div>
        <div class="flicking-panel" style="background: #9c27b0">Panel 97</div>
        <div class="flicking-panel" style="background: #ff5722">Panel 98</div>
        <div class="flicking-panel" style="background: #3e8ed0">Panel 99</div>
        <div class="flicking-panel" style="background: #00d1b2">Panel 100</div>
      </div>
    </div>
    <div class="dom-counter">
      Total <strong>100</strong> panels = DOM elements: <strong id="normal-count">0</strong>
    </div>
  </div>

</body>
</html>
```

### CSS
```css
.flicking-panel {
  width: 200px;
  height: 120px;
  margin-right: 10px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.panel-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
}

.color-0 {
  background: #3e8ed0;
}
.color-1 {
  background: #00d1b2;
}
.color-2 {
  background: #f14668;
}
.color-3 {
  background: #ffe08a;
  color: #333;
}
.color-4 {
  background: #48c78e;
}
.color-5 {
  background: #9c27b0;
}
.color-6 {
  background: #ff5722;
}

.demo-container {
  margin-bottom: 32px;
}

.demo-info {
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
}
.dom-counter {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
.dom-counter strong {
  color: #3e8ed0;
}
```

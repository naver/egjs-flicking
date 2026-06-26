# Nested

The [`nested`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nested) option transfers control to the parent Flicking when the child Flicking reaches its boundary. Provides a natural UX for same-direction nested Flicking instances.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`nested`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nested) | `boolean` | `false` | Transfer control to parent when reaching boundary |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `false` | Stops at inner boundary, parent does not move (default) | Independent inner carousels |
| `true` | Transfers control to parent after reaching inner boundary | Same-direction nested carousels |

## Details

### How Nested Works
When a child Flicking with `nested: true` reaches the first or last panel and the user continues to drag in the same direction, the parent Flicking moves instead.

```jsx
// Parent Flicking
<Flicking>
  
    {/* Child Flicking - nested enabled */}
    <Flicking nested={true} bound={true}>
      <div>Inner 1
      <div>Inner 2
    </Flicking>
  
</Flicking>
```

### When Is It Needed?
- **Needed**: When parent and child are in the **same direction** (both horizontal: true or both false)
- **Not needed**: When parent and child are in **different directions** (one horizontal, one vertical) - they are automatically distinguished

### Related Options
- **Relationship with bound**: Using `bound: true` together makes the inner boundary clearer, resulting in more natural nested behavior.
- **Relationship with horizontal**: If the parent/child have different horizontal values, it works naturally without the nested option.

### Use Cases

> **Info: When to use?**
- **nested: true**: Product carousels by category (outer: categories, inner: products)
- **nested: false**: Inner carousels that need to operate independently

### Notes

> **Warning: Set on the child Flicking**
The `nested` option is set on the child (inner) Flicking. There is no need to set it on the parent.

> **Warning: Not needed for different directions**
If the parent is horizontal and the child is vertical (or vice versa), it works naturally without the nested option.

## Related Links

### Related Options
- [`bound`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound): Boundary restriction (recommended with nested)
- [`horizontal`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal): Movement direction

### Related Demos
- [Bound](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/bound.md): Boundary restriction mode
- [Vertical](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/vertical.md): Vertical mode (different direction combination)

## Code

### React
```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* nested: false */}
      <div className="demo-container">
        <div className="demo-label">nested: false (parent does not move at inner boundary)</div>
        <div className="demo-hint">The outer Flicking does not move when the inner one reaches its end</div>
        <Flicking align="center">
          <div className="outer-panel outer-1">
            <Flicking className="inner-viewport" nested={false} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
          <div className="outer-panel outer-2">
            <Flicking className="inner-viewport" nested={false} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
          <div className="outer-panel outer-3">
            <Flicking className="inner-viewport" nested={false} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
        </Flicking>
      </div>

      {/* nested: true */}
      <div className="demo-container">
        <div className="demo-label">nested: true (propagates to parent at inner boundary)</div>
        <div className="demo-hint">The outer Flicking moves when the inner one reaches its end</div>
        <Flicking align="center">
          <div className="outer-panel outer-1">
            <Flicking className="inner-viewport" nested={true} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
          <div className="outer-panel outer-2">
            <Flicking className="inner-viewport" nested={true} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
          <div className="outer-panel outer-3">
            <Flicking className="inner-viewport" nested={true} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
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
    <!-- nested: false -->
    <div class="demo-container">
      <div class="demo-label">nested: false (parent does not move at inner boundary)</div>
      <div class="demo-hint">The outer Flicking does not move when the inner one reaches its end</div>
      <Flicking :options="{ align: 'center' }">
        <div :key="0" class="outer-panel outer-1">
          <Flicking class="inner-viewport" :options="{ nested: false, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
        <div :key="1" class="outer-panel outer-2">
          <Flicking class="inner-viewport" :options="{ nested: false, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
        <div :key="2" class="outer-panel outer-3">
          <Flicking class="inner-viewport" :options="{ nested: false, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
      </Flicking>
    </div>

    <!-- nested: true -->
    <div class="demo-container">
      <div class="demo-label">nested: true (propagates to parent at inner boundary)</div>
      <div class="demo-hint">The outer Flicking moves when the inner one reaches its end</div>
      <Flicking :options="{ align: 'center' }">
        <div :key="0" class="outer-panel outer-1">
          <Flicking class="inner-viewport" :options="{ nested: true, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
        <div :key="1" class="outer-panel outer-2">
          <Flicking class="inner-viewport" :options="{ nested: true, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
        <div :key="2" class="outer-panel outer-3">
          <Flicking class="inner-viewport" :options="{ nested: true, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
      </Flicking>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// nested: false
new Flicking("#outer-false", { align: "center" });
document.querySelectorAll("#outer-false .inner-viewport").forEach(el => {
  new Flicking(el, { nested: false, align: "center", bound: true });
});

// nested: true
new Flicking("#outer-true", { align: "center" });
document.querySelectorAll("#outer-true .inner-viewport").forEach(el => {
  new Flicking(el, { nested: true, align: "center", bound: true });
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
  <!-- nested: false -->
  <div class="demo-container">
    <div class="demo-label">nested: false (parent does not move at inner boundary)</div>
    <div class="demo-hint">The outer Flicking does not move when the inner one reaches its end</div>
    <div id="outer-false" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="outer-panel outer-1">
          <div class="flicking-viewport inner-viewport">
            <div class="flicking-camera">
              <div class="inner-panel">Inner 1</div>
              <div class="inner-panel">Inner 2</div>
              <div class="inner-panel">Inner 3</div>
            </div>
          </div>
        </div>
        <div class="outer-panel outer-2">
          <div class="flicking-viewport inner-viewport">
            <div class="flicking-camera">
              <div class="inner-panel">Inner 1</div>
              <div class="inner-panel">Inner 2</div>
              <div class="inner-panel">Inner 3</div>
            </div>
          </div>
        </div>
        <div class="outer-panel outer-3">
          <div class="flicking-viewport inner-viewport">
            <div class="flicking-camera">
              <div class="inner-panel">Inner 1</div>
              <div class="inner-panel">Inner 2</div>
              <div class="inner-panel">Inner 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- nested: true -->
  <div class="demo-container">
    <div class="demo-label">nested: true (propagates to parent at inner boundary)</div>
    <div class="demo-hint">The outer Flicking moves when the inner one reaches its end</div>
    <div id="outer-true" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="outer-panel outer-1">
          <div class="flicking-viewport inner-viewport">
            <div class="flicking-camera">
              <div class="inner-panel">Inner 1</div>
              <div class="inner-panel">Inner 2</div>
              <div class="inner-panel">Inner 3</div>
            </div>
          </div>
        </div>
        <div class="outer-panel outer-2">
          <div class="flicking-viewport inner-viewport">
            <div class="flicking-camera">
              <div class="inner-panel">Inner 1</div>
              <div class="inner-panel">Inner 2</div>
              <div class="inner-panel">Inner 3</div>
            </div>
          </div>
        </div>
        <div class="outer-panel outer-3">
          <div class="flicking-viewport inner-viewport">
            <div class="flicking-camera">
              <div class="inner-panel">Inner 1</div>
              <div class="inner-panel">Inner 2</div>
              <div class="inner-panel">Inner 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
```

### CSS
```css
.outer-panel {
  width: 80%;
  height: 180px;
  padding: 10px;
  box-sizing: border-box;
}
.outer-1 {
  background: #3e8ed0;
}
.outer-2 {
  background: #00d1b2;
}
.outer-3 {
  background: #f14668;
}

.inner-viewport {
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}
.inner-panel {
  width: 60%;
  height: 140px;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.demo-hint {
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
}
```

# AutoPlay

Automatically transitions panels at regular intervals. Supports pause on mouse hover.



## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | `number` | `2000` | Interval between panel transitions (ms) |
| `direction` | `"NEXT" \| "PREV"` | `"NEXT"` | Direction of automatic transition |
| `stopOnHover` | `boolean` | `false` | Pause autoplay on mouse hover |
| `animationDuration` | `number` | - | Duration of the panel transition animation (ms) |

## Details

### How It Works

The AutoPlay plugin automatically transitions panels in the specified direction at every `duration` interval. When the user drags, autoplay pauses and resumes after the drag ends.

### Usage

```js
import { AutoPlay } from "@egjs/flicking-plugins";

flicking.addPlugins(new AutoPlay({
  duration: 2000,
  direction: "NEXT",
  stopOnHover: true
}));
```

### Control Methods

| Method | Description |
|--------|-------------|
| `plugin.stop()` | Stop autoplay |
| `plugin.play()` | Start autoplay |

### Notes

> **Warning: Caution**
- For seamless autoplay, use it together with the `circular: true` option.
- When `stopOnHover: true` is set, it pauses on touch on mobile devices.

## Related Links

### Related Demos
- [Fade](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/fade.md): Use with fade effect
- [Pagination](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/pagination.md): Use with page indicator

## Code

### React
```jsx
import { AutoPlay } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const plugins = [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: true })];

export default function App() {
  return (
    <Flicking circular={true} plugins={plugins} preventDefaultOnDrag={true}>
      <div className="flicking-panel">
        <img className="panel-image" src="https://picsum.photos/seed/auto1/600/300" />
      </div>
      <div className="flicking-panel">
        <img className="panel-image" src="https://picsum.photos/seed/auto2/600/300" />
      </div>
      <div className="flicking-panel">
        <img className="panel-image" src="https://picsum.photos/seed/auto3/600/300" />
      </div>
      <div className="flicking-panel">
        <img className="panel-image" src="https://picsum.photos/seed/auto4/600/300" />
      </div>
    </Flicking>
  );
}
```

### Vue3
```vue
<template>
  <Flicking :options="{ circular: true, preventDefaultOnDrag: true }" :plugins="plugins">
    <div class="flicking-panel">
      <img class="panel-image" src="https://picsum.photos/seed/auto1/600/300" />
    </div>
    <div class="flicking-panel">
      <img class="panel-image" src="https://picsum.photos/seed/auto2/600/300" />
    </div>
    <div class="flicking-panel">
      <img class="panel-image" src="https://picsum.photos/seed/auto3/600/300" />
    </div>
    <div class="flicking-panel">
      <img class="panel-image" src="https://picsum.photos/seed/auto4/600/300" />
    </div>
  </Flicking>
</template>

<script setup>
import { AutoPlay } from "@egjs/flicking-plugins";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const plugins = [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: true })];
</script>
```

### JavaScript
```js
import Flicking from "@egjs/flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const flicking = new Flicking("#flick", {
  circular: true,
  preventDefaultOnDrag: true
});

flicking.addPlugins(
  new AutoPlay({
    duration: 2000,
    direction: "NEXT",
    stopOnHover: true
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
    <div id="flick" class="flicking-viewport">
      <div class="flicking-camera">
        <div class="flicking-panel">
          <img class="panel-image" src="https://picsum.photos/seed/auto1/600/300" />
        </div>
        <div class="flicking-panel">
          <img class="panel-image" src="https://picsum.photos/seed/auto2/600/300" />
        </div>
        <div class="flicking-panel">
          <img class="panel-image" src="https://picsum.photos/seed/auto3/600/300" />
        </div>
        <div class="flicking-panel">
          <img class="panel-image" src="https://picsum.photos/seed/auto4/600/300" />
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

### CSS
```css
.flicking-panel {
  position: relative;
  border-radius: 5px;
  width: 80%;
  margin-right: 10px;
  height: 200px;
  overflow: hidden;
}

.panel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

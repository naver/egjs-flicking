# Vue3 Guide

Learn about Vue3-specific features, event handling, and component usage for using Flicking in your Vue3 application.

> **Info: This guide is for Vue3 users. For React, see the [React Guide](https://naver.github.io/egjs-flicking/llm-docs/guide/react-guide.md). For vanilla JavaScript, see the [Quick Start](https://naver.github.io/egjs-flicking/llm-docs/guide/quickstart.md) guide.**

---

## Installation & Import

### Package Installation

```bash
npm install @egjs/vue3-flicking
# or
yarn add @egjs/vue3-flicking
```

### Local Import (Recommended)

Import the component in each file where you need it:

```vue
<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
</script>
```

### Global Registration

Register the component globally to use it throughout your application:

```javascript
// main.js or main.ts
import { createApp } from "vue";
import App from "./App.vue";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const app = createApp(App);

// Register globally
app.component("Flicking", Flicking);

app.mount("#app");
```

Now you can use `<Flicking>` in any component without importing:

```vue
<template>
  <Flicking>
    <div>Panel 1
    <div>Panel 2
  </Flicking>
</template>

<!-- No import needed! -->
```

> **Tip: Local vs Global**
**Local import** is recommended for better tree-shaking and explicit dependencies. Use **global registration** only if you use Flicking in many components.

> **Warning: Import Path**
Make sure to use the correct package:
- ✅ `@egjs/vue3-flicking` (Vue3)
- ❌ `@egjs/flicking` (Vanilla JS only)
- ❌ `@egjs/vue-flicking` (Vue 2 only)

---

## Event Handling

Event handlers in Vue3 use the `@` directive with kebab-case event names.

### Event Naming Pattern

**Format**: `@` + kebab-case event name

```vue
<Flicking
  @ready="handleReady"
  @changed="handleChanged"
  @will-change="handleWillChange"
  @will-restore="handleWillRestore"
  @restored="handleRestored"
  @move-start="handleMoveStart"
  @move="handleMove"
  @move-end="handleMoveEnd"
  @hold-start="handleHoldStart"
  @hold-end="handleHoldEnd"
  @select="handleSelect"
  @need-panel="handleNeedPanel"
  @visible-change="handleVisibleChange"
  @reach-edge="handleReachEdge">
  <!-- panels -->
</Flicking>
```

> **Tip: Vue3 Event Binding Pattern**
- Event name in camelCase: `changed`, `willChange`, `moveStart`
- Convert to kebab-case: `changed`, `will-change`, `move-start`
- Use `@` directive: `@changed`, `@will-change`, `@move-start`

### Common Event Handlers

```vue
<template>
  <Flicking
    @changed="handleChanged"
    @will-change="handleWillChange"
    @move-start="handleMoveStart">
    <!-- panels -->
  </Flicking>
</template>

<script setup>
// Fired AFTER panel change completes
const handleChanged = (e) => {
  console.log("New panel index:", e.index);
  console.log("Previous panel index:", e.prevIndex);
};

// Fired BEFORE panel change starts (cancellable)
const handleWillChange = (e) => {
  console.log("Will move to:", e.index);
  // Call e.stop() to prevent the change
  if (e.index === 5) {
    e.stop(); // Cancel navigation to panel 5
  }
};

// Fired when user starts dragging
const handleMoveStart = (e) => {
  console.log("User started moving");
};
</script>
```

**See Also:**
- [`ChangedEvent`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/ChangedEvent.md) - Fired AFTER panel change
- [`WillChangeEvent`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/WillChangeEvent.md) - Fired BEFORE panel change
- [All Event Interfaces](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/ChangedEvent.md)

---

## Using the Instance

Use `ref` to access the Flicking instance and control the carousel programmatically.

### Using ref

```vue
<template>
  <div>
    <Flicking ref="flickingRef">
      <div>Panel 1
      <div>Panel 2
      <div>Panel 3
      <div>Panel 4
    </Flicking>

    <button @click="handlePrev">Previous</button>
    <button @click="handleNext">Next</button>
    <button @click="handleMoveTo">Move to Panel 4</button>
  
</template>

<script setup>
import { ref } from "vue";
import Flicking from "@egjs/vue3-flicking";

const flickingRef = ref(null);

const handlePrev = () => {
  flickingRef.value?.prev();
};

const handleNext = () => {
  flickingRef.value?.next();
};

const handleMoveTo = () => {
  flickingRef.value?.moveTo(3);
};
</script>
```

> **Tip: Optional Chaining**
Use optional chaining (`?.`) when calling methods to avoid errors if the ref is not yet mounted:
```javascript
flickingRef.value?.moveTo(2);  // ✅ Safe
flickingRef.value.moveTo(2);   // ❌ May error if not mounted
```

**See Also:**
- [`moveTo()`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#moveto)
- [`prev()`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#prev)
- [`next()`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#next)
- [All Flicking Methods](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md)

---

## Passing Options

Pass options as a single object for easy management and reactivity.

### Options Object (Recommended)

```vue
<template>
  <Flicking :options="flickingOptions">
    <!-- panels -->
  </Flicking>
</template>

<script setup>
import { ref } from "vue";

const flickingOptions = ref({
  align: "center",
  circular: true,
  horizontal: true,
  bound: false,
  adaptive: false
});
</script>
```

**Advantages:**

✅ Easy to manage many options
✅ Can use reactive objects
✅ Convenient for dynamic options

### Individual Props (Alternative)

You can also pass options as individual props:

```vue
<Flicking
  align="center"
  :circular="true"
  :horizontal="true"
  :bound="false">
  <!-- panels -->
</Flicking>
```

---

## Styling

In Vue3, the `class` attribute you pass to the `<Flicking>` component is applied directly to the `.flicking-viewport` element:

```vue
<template>
  <!-- class goes on the Flicking component -->
  <Flicking class="my-carousel">
    <div class="panel">Panel 1
  </Flicking>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
</script>

<style scoped>
/* Your custom class is applied to .flicking-viewport */
.my-carousel {
  max-width: 1200px;
  margin: 0 auto;
}

.panel {
  width: 300px;
  height: 400px;
}
</style>
```

You can use any styling approach (scoped styles, CSS modules, inline styles, global styles, etc.) — the key point is that your class applies to the viewport.

> **Tip: Complete Styling Guide**
For detailed information about Flicking's HTML structure, required CSS, and comprehensive styling guidelines, see [HTML Structure & Styling](https://naver.github.io/egjs-flicking/llm-docs/guide/structure-and-styling.md).

---

## Vue3 Component Panels

When using Vue3 components as panels, there are specific requirements to ensure Flicking can properly manage them.

### Single Root Element Requirement

Vue3 components used as panels **must have a single root element**. This allows Flicking to access and manipulate the panel DOM elements correctly.

```vue
<!-- ✅ Correct - Single root element -->
<template>
  <Flicking>
    <PanelComponent />
    <PanelComponent />
    <PanelComponent />
  </Flicking>
</template>

<script setup>
// PanelComponent.vue
</script>

<template>
  <div class="panel">
    <h3>Panel Title</h3>
    <p>Panel content</p>
  
</template>
```

```vue
<!-- ❌ Wrong - Multiple root elements -->
<template>
  <h3>Panel Title</h3>
  <p>Panel content</p>
</template>
```

```vue
<!-- ❌ Wrong - Fragment root -->
<template>
  <>
    <div>Header
    <div>Content
  </>
</template>
```

> **Danger: Multiple Root Elements Not Supported**
Vue3 allows components with multiple root elements (fragments), but **Flicking cannot work with these**. Always ensure your panel components have exactly one root element.

### Workaround for Multi-Root Components

If you must use a component with multiple root elements, wrap it in a container:

```vue
<template>
  <Flicking>
    <!-- Wrap multi-root components in a div -->
    <div><MultiRootComponent />
    <div><MultiRootComponent />
    <div><MultiRootComponent />
  </Flicking>
</template>
```

---

## Common Pitfalls

### 1. Wrong Import Path

```vue
<!-- ❌ Wrong - This is vanilla JS -->
import Flicking from "@egjs/flicking";

<!-- ❌ Wrong - This is Vue 2 -->
import Flicking from "@egjs/vue-flicking";

<!-- ✅ Correct - Vue 3 wrapper -->
import Flicking from "@egjs/vue3-flicking";
```

### 2. Wrong Event Handler Names

```vue
<!-- ❌ Wrong - Using camelCase -->
<Flicking @changed="handler" />

<!-- ❌ Wrong - Using on prefix (React style) -->
<Flicking @onChanged="handler" />

<!-- ✅ Correct - @ directive with kebab-case -->
<Flicking @changed="handler" />
```

### 3. Forgetting CSS Import

```vue
<!-- ❌ Missing CSS - Panels won't display correctly -->
<script setup>
import Flicking from "@egjs/vue3-flicking";
</script>

<!-- ✅ Include CSS -->
<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
</script>
```

### 4. Accessing Methods Before Mount

```vue
<script setup>
const flickingRef = ref(null);

// ❌ Wrong - Ref is null during setup
flickingRef.value?.moveTo(2);

// ✅ Correct - Use in onMounted or event handler
onMounted(() => {
  flickingRef.value?.moveTo(2);
});
</script>
```

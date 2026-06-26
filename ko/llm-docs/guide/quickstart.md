# Quick Start

Get started with Flicking in 5 minutes. This guide covers installation and creating your first carousel for JavaScript, React, and Vue3.

## Installation

### Using Package Managers (Recommended)

Install Flicking using npm or yarn:

  
**JavaScript:**

```bash
npm install @egjs/flicking
# or
yarn add @egjs/flicking
```

  
  
**React:**

```bash
npm install @egjs/react-flicking
# or
yarn add @egjs/react-flicking
```

  
  
**Vue3:**

```bash
npm install @egjs/vue3-flicking
# or
yarn add @egjs/vue3-flicking
```

  

### Using CDN (JavaScript Only)

For quick prototyping or simple projects, you can use CDN links:

```html
<!-- JavaScript -->
<script src="https://unpkg.com/@egjs/flicking/dist/flicking.pkgd.min.js"></script>

<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/@egjs/flicking/dist/flicking.css" />
```

> **Info: CDN usage is convenient for testing, but using package managers is recommended for production.**

---

## Your First Carousel

### Basic Setup

  
**JavaScript:**

**HTML Structure:**
```html
<div id="carousel" class="flicking-viewport">
  <div class="flicking-camera">
    <div class="panel">Panel 1
    <div class="panel">Panel 2
    <div class="panel">Panel 3
  

```

**JavaScript:**
```javascript
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";

// Initialize Flicking
const flicking = new Flicking("#carousel", {
  align: "center",
  circular: true
});
```

> **Danger: Required**
- **Base CSS**: Must import `@egjs/flicking/dist/flicking.css`
- **HTML Structure**: `.flicking-viewport` and `.flicking-camera` wrapper divs are required
- **Fixed Class Names**: `.flicking-viewport` and `.flicking-camera` cannot be changed
- **Flexible Panel Class**: Panel class name is your choice (`.panel`, `.slide`, `.item`, etc.)
- **Panel Detection**: Direct children of `.flicking-camera` become panels

  
  
**React:**

```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

function App() {
  return (
    <Flicking align="center" circular={true}>
      Panel 1
      Panel 2
      Panel 3
    </Flicking>
  );
}

export default App;
```

> **Danger: Required**
- **Base CSS**: Must import `@egjs/react-flicking/dist/flicking.css`
- **Auto Structure**: The `<Flicking>` component creates required structure automatically
- **Panel Detection**: Direct children of `<Flicking>` become panels

  
  
**Vue3:**

```vue
<template>
  <Flicking :options="{ align: 'center', circular: true }">
    <div class="panel">Panel 1
    <div class="panel">Panel 2
    <div class="panel">Panel 3
  </Flicking>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
</script>
```

> **Danger: Required**
- **Base CSS**: Must import `@egjs/vue3-flicking/dist/flicking.css`
- **Auto Structure**: The `<Flicking>` component creates required structure automatically
- **Panel Detection**: Direct children of `<Flicking>` become panels

  

> **Tip: Want to style your carousel?**
Flicking provides minimal base styles to give you maximum styling freedom. The required base CSS handles only functionality, not design. Learn about [HTML Structure & Styling](https://naver.github.io/egjs-flicking/llm-docs/guide/structure-and-styling.md) to understand Flicking's architecture and how to style your carousel. This guide covers:
- How Flicking's 3-layer structure works
- Why the base CSS is required
- Common styling patterns and best practices

---

## Using Methods

You can control Flicking programmatically using methods:

  
**JavaScript:**

```javascript
const flicking = new Flicking("#carousel");

// Move to specific panel
flicking.moveTo(2);

// Move to next panel
flicking.next();

// Move to previous panel
flicking.prev();
```

  
  
**React:**

```jsx
import { useRef } from "react";
import Flicking from "@egjs/react-flicking";

function App() {
  const flickingRef = useRef(null);

  const handleClick = () => {
    // Access Flicking instance via ref
    flickingRef.current?.moveTo(2);
  };

  return (
    <>
      <Flicking ref={flickingRef}>
        <div>Panel 1
        <div>Panel 2
        <div>Panel 3
      </Flicking>
      <button onClick={handleClick}>Move to Panel 3</button>
    </>
  );
}
```

  
  
**Vue3:**

```vue
<template>
  <div>
    <Flicking ref="flickingRef">
      <div>Panel 1
      <div>Panel 2
      <div>Panel 3
    </Flicking>
    <button @click="handleClick">Move to Panel 3</button>
  
</template>

<script setup>
import { ref } from "vue";
import Flicking from "@egjs/vue3-flicking";

const flickingRef = ref(null);

const handleClick = () => {
  // Access Flicking instance via ref
  flickingRef.value?.moveTo(2);
};
</script>
```

  

See [Flicking Methods](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#methods) for all available methods.

---

## Listening to Events

Handle user interactions by listening to events:

  
**JavaScript:**

```javascript
const flicking = new Flicking("#carousel");

// Listen to changed event (fired AFTER panel change)
flicking.on("changed", (e) => {
  console.log("Current panel index:", e.index);
});

// Listen to willChange event (fired BEFORE panel change)
flicking.on("willChange", (e) => {
  console.log("Moving to panel:", e.index);
});
```

  
  
**React:**

```jsx
<Flicking
  onChanged={(e) => {
    console.log("Current panel index:", e.index);
  }}
  onWillChange={(e) => {
    console.log("Moving to panel:", e.index);
  }}>
  {/* panels */}
</Flicking>
```

> **Tip: Event Handler Props**
React event handlers use camelCase with `on` prefix: `onChanged`, `onWillChange`, etc.
See [React Guide](https://naver.github.io/egjs-flicking/llm-docs/guide/react-guide.md) for more details.

  
  
**Vue3:**

```vue
<Flicking
  @changed="handleChanged"
  @will-change="handleWillChange">
  <!-- panels -->
</Flicking>

<script setup>
const handleChanged = (e) => {
  console.log("Current panel index:", e.index);
};

const handleWillChange = (e) => {
  console.log("Moving to panel:", e.index);
};
</script>
```

> **Tip: Event Binding**
Vue3 uses `@` directive with kebab-case: `@changed`, `@will-change`, etc.
See [Vue3 Guide](https://naver.github.io/egjs-flicking/llm-docs/guide/vue3-guide.md) for more details.

  

See [Event Interfaces](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/ChangedEvent.md) for all available events.

---

## Next Steps

Now that you have a basic carousel working, explore more features:

- **[HTML Structure & Styling](https://naver.github.io/egjs-flicking/llm-docs/guide/structure-and-styling.md)**: Understand Flicking's architecture and customize your carousel
- **Framework Guides** ([React](https://naver.github.io/egjs-flicking/llm-docs/guide/react-guide.md) / [Vue3](https://naver.github.io/egjs-flicking/llm-docs/guide/vue3-guide.md)): Framework-specific features and best practices
- **[API Reference](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md)**: Complete API documentation
- **[Demos](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/circular.md)**: Interactive examples

---

## Troubleshooting

### Panels not displaying correctly?

Make sure you've imported the CSS file:

```javascript
import "@egjs/flicking/dist/flicking.css";  // JavaScript
import "@egjs/react-flicking/dist/flicking.css";  // React
import "@egjs/vue3-flicking/dist/flicking.css";  // Vue3
```

**Need more help?** Check [GitHub Issues](https://github.com/naver/egjs-flicking/issues) or read the [API documentation](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md)

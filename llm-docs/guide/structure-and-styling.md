# HTML Structure & Styling

Learn how Flicking's HTML structure works and how to customize your carousel's appearance across different frameworks.

---

## Understanding the HTML Structure

Flicking uses a three-layer structure that's essential for proper functionality:

### `.flicking-viewport` (Viewing Area)
The outermost container that defines the visible area of your carousel.
- This is what users see on the page
- Set **width and height** here to control the carousel's visible size
- Flicking automatically manages `overflow: hidden` internally

### `.flicking-camera` (Moving Container)
The middle layer that actually moves when users swipe or navigate.
- Contains all the panels and handles the sliding motion
- **⚠️ Do not style this directly** - Flicking manages its position and transform
- Modifying this element's styles can break carousel functionality

### `.panel` (Individual Slides)
Your actual content items - each one is a carousel slide.
- Style these freely to design your carousel items
- Control panel **width** to determine how many panels are visible at once
- Add spacing, backgrounds, borders, etc. as needed

> **Tip: JavaScript vs React/Vue3**
When using vanilla JavaScript, you need the `.flicking-viewport` and `.flicking-camera` wrapper divs in your HTML. React and Vue3 components create these automatically.

---

## Required Base CSS

Flicking requires importing its base CSS file for proper functionality. **This is not optional** - the carousel will not work correctly without it.

### Import the CSS

  
**JavaScript:**

```javascript
import "@egjs/flicking/dist/flicking.css";
```

  
  
**React:**

```javascript
import "@egjs/react-flicking/dist/flicking.css";
```

  
  
**Vue3:**

```javascript
import "@egjs/vue3-flicking/dist/flicking.css";
```

Or in the `<style>` section:

```css
@import url("@egjs/vue3-flicking/dist/flicking.css");
```

  

### What the Base CSS Does

The base CSS provides essential styles for Flicking to function:

#### 1. Viewport Management
```css
.flicking-viewport {
  position: relative;    /* Position context for camera */
  overflow: hidden;      /* Hide panels outside visible area */
}
```

Without `overflow: hidden`, all panels would be visible at once instead of showing only the active ones.

#### 2. Camera Layout
```css
.flicking-camera {
  display: flex;              /* Arrange panels horizontally */
  flex-direction: row;        /* Horizontal layout (vertical for vertical mode) */
  will-change: transform;     /* Performance optimization for animations */
}
```

The flexbox layout positions panels correctly and enables smooth sliding animations.

#### 3. Panel Sizing
```css
.flicking-camera > * {
  flex-shrink: 0;            /* Prevent panels from shrinking */
}
```

This ensures panels maintain their specified width instead of being compressed to fit.

> **Danger: Required for Functionality**
Without the base CSS, Flicking will not work properly:
- ❌ All panels visible at once (no overflow hiding)
- ❌ Incorrect panel layout
- ❌ Broken sliding animations
- ❌ Poor performance

**Always import the base CSS file!**

---

## Styling Guide

Flicking provides **minimal base styles** to maximize your styling freedom. There are no opinionated designs or restrictive layouts - you have complete control over how your carousel looks.

**The only rule:** Don't modify `.flicking-camera` styles (position, transform, width) as Flicking manages these internally.

**Everything else is yours to customize.** The examples below are reference patterns to help you get started, not requirements. Feel free to adapt them to your design needs.

---

### Viewport Styling (Control visible area)

**In JavaScript**, you style the HTML element with the `.flicking-viewport` class:

```html
<div id="carousel" class="flicking-viewport my-carousel">
  <div class="flicking-camera">
    <div class="panel">Panel 1
  

```

```css
.my-carousel {
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 8px;
}
```

**In React/Vue3**, the component itself renders as `.flicking-viewport`, so apply your custom class directly to the component:

  
**React:**

```jsx
{/* className goes on the Flicking component */}
<Flicking className="my-carousel">
  Panel 1
</Flicking>
```

```css
/* Styles your custom class, which is applied to .flicking-viewport */
.my-carousel {
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 8px;
}
```

  
  
**Vue3:**

```vue
<template>
  <!-- class goes on the Flicking component -->
  <Flicking class="my-carousel">
    <div class="panel">Panel 1
  </Flicking>
</template>

<style scoped>
/* Styles your custom class, which is applied to .flicking-viewport */
.my-carousel {
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
```

  

> **Tip: Key Difference**
- **JavaScript**: You create the `.flicking-viewport` element yourself and add custom classes to it
- **React/Vue3**: The component creates `.flicking-viewport` internally and applies your `className`/`class` to it

Result is the same: your custom styles apply to the viewport!

---

### Panel Styling (Design your slides)

```css
/* Full-width panels (one panel at a time) */
.panel {
  width: 100%;
  height: 400px;
  padding: 20px;
  background: #f9f9f9;
}

/* Fixed-width panels (multiple visible) */
.panel {
  width: 300px;        /* Fixed size */
  height: 400px;
  flex-shrink: 0;      /* Prevent shrinking */
}

/* Add spacing between panels */
.panel {
  margin-right: 20px;
}

/* Or use gap with flexbox (modern approach) */
.flicking-camera {
  gap: 20px;          /* Space between all panels */
}
```

---

### Common Patterns

#### Multiple panels per view
```css
.panel {
  width: calc((100% - 40px) / 3);  /* 3 panels with 20px gaps */
  flex-shrink: 0;
}
```

#### Responsive panels
```css
.panel {
  width: 100%;
  height: 400px;
}

@media (min-width: 768px) {
  .panel {
    width: 50%;      /* 2 panels on tablet */
  }
}

@media (min-width: 1024px) {
  .panel {
    width: 33.333%;  /* 3 panels on desktop */
  }
}
```

> **Warning: Don't Style `.flicking-camera`**
Avoid adding width, height, or transform styles to `.flicking-camera`. Flicking controls these properties internally. Only use it for spacing (like `gap`) if needed.

---

## Best Practices

### ✅ Do
- Import the base CSS file first
- Style `.flicking-viewport` and `.panel` freely
- Use custom class names for your styles
- Test responsive designs across different screen sizes
- Use `gap` on `.flicking-camera` for panel spacing (if needed)

### ❌ Don't
- Don't skip importing the base CSS
- Don't modify `.flicking-camera` position, transform, or width
- Don't use `!important` to override Flicking's internal styles
- Don't add margins directly to `.flicking-camera`

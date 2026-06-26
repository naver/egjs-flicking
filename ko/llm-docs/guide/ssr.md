# Server-Side Rendering (SSR)

Flicking works with SSR frameworks like [Next.js](https://nextjs.org/) and [Nuxt](https://nuxt.com/). However, since Flicking calculates panel positions based on DOM element sizes, panels may shift after hydration. This guide covers how to prevent that.

## The Problem

Flicking needs to measure the actual size of panel elements to position them correctly. During SSR, these measurements aren't available, so panels may appear in the wrong position until Flicking initializes on the client side.

This is especially noticeable when:
- Using `align: "center"` (the default) or other non-`"prev"` alignments
- Panels have different sizes

## Solution 1: `firstPanelSize`

If you know the size of the first panel, provide it via the `firstPanelSize` option. Flicking will use this to calculate the correct camera position before initialization.

  
**JavaScript:**

```html
<div id="flicking" class="flicking-viewport">
  <div class="flicking-camera">
    <div class="panel">1
    <div class="panel">2
    <div class="panel">3
  

```

```js
import Flicking from "@egjs/flicking";

const flicking = new Flicking("#flicking", {
  firstPanelSize: "200px"
});
```

  
  
**React:**

```jsx
import Flicking from "@egjs/react-flicking";

export default () => (
  <Flicking firstPanelSize="200px">
    1
    2
    3
  </Flicking>
);
```

  
  
**Vue3:**

```html
<template>
  <Flicking :options="{ firstPanelSize: '200px' }">
    <div class="panel">1
    <div class="panel">2
    <div class="panel">3
  </Flicking>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
</script>
```

  

You can use any CSS length value: `"200px"`, `"50%"`, etc.

:::caution
`firstPanelSize` does not work well with the `circular` option, because circular mode clones panels and their positions depend on actual DOM measurements.

## Solution 2: `hideBeforeInit`

If you don't know the panel size in advance, you can hide the panels until Flicking finishes initialization. This prevents layout shifts by showing nothing until the correct positions are calculated.

  
**JavaScript:**

```js
import Flicking from "@egjs/flicking";

const flicking = new Flicking("#flicking", {
  hideBeforeInit: true
});
```

  
  
**React:**

```jsx
import Flicking from "@egjs/react-flicking";

export default () => (
  <Flicking hideBeforeInit={true}>
    1
    2
    3
  </Flicking>
);
```

  
  
**Vue3:**

```html
<template>
  <Flicking :options="{ hideBeforeInit: true }">
    <div class="panel">1
    <div class="panel">2
    <div class="panel">3
  </Flicking>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
</script>
```

  

When `hideBeforeInit` is enabled, Flicking adds the `flicking-hidden` CSS class to the viewport, which sets `visibility: hidden` on all panel elements. The class is automatically removed once Flicking is ready.

> **Tip: You can combine both options. Use `firstPanelSize` for correct positioning and `hideBeforeInit` as a fallback for cases where the size estimate is inaccurate.**

## Which Option Should I Choose?

| | `firstPanelSize` | `hideBeforeInit` |
|---|---|---|
| **Behavior** | Positions panels using estimated size | Hides panels until ready |
| **Visual result** | Panels visible immediately, minimal shift | Empty space until initialization |
| **Best for** | Known, fixed panel sizes | Dynamic or unknown panel sizes |
| **Works with `circular`** | No | Yes |

## Reactive API and SSR

If you're using the [Reactive API](/docs/guide/reactive-api) to build UI components like pagination or navigation, you can provide initial values to prevent hydration mismatches:

  
**React:**

```jsx
const { currentPanelIndex, totalPanelCount } = useFlickingReactiveAPI(flickingRef, {
  defaultIndex: 0,
  totalPanelCount: 10
});
```

  
  
**Vue3:**

```js
const { currentPanelIndex, totalPanelCount } = useFlickingReactiveAPI(flickingRef, {
  defaultIndex: 0,
  totalPanelCount: 10
});
```

  

See the [Reactive API guide](/docs/guide/reactive-api#ssr-optimization) for details.

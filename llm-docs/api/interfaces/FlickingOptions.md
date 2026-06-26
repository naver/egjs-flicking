# FlickingOptions

> Options for the Flicking component

## Properties

### adaptive

**Type:** `boolean`

Update height of the viewport element after movement same to the height of the panel below.

**Default:** `false`

**Dependencies:**

- **Conditional**: Only works when [horizontal](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal) is true. When horizontal is false, this option has no effect.

**See Also:**

- [Demo: Adaptive](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/adaptive.md)

### align

**Type:** `LiteralUnion<ValueOf<typeof ALIGN>> | number | {
        panel: number | string;
        camera: number | string;
    }`

Align position of the panels within viewport. You can set different values each for the panel and camera.

**Default:** `"center"`

**Accepts:** [ALIGN](https://naver.github.io/egjs-flicking/llm-docs/api/variables/ALIGN.md) - `"prev"` | `"center"` | `"next"`

**Remarks:** Possible values include

- literal strings ("prev", "center", "next")

- percentage values ("0%", "25%")

- pixel values ("0px", "100px")

- arithmetic expressions ("50% - 25px")

- numbers

- an object with separate `panel` and `camera` alignment values

**Example:**

```typescript
const possibleOptions = [
  // Literal strings
  "prev", "center", "next",
  // % values, applied to both panel & camera
  "0%", "25%", "42%",
  // px values, arithmetic calculation with (+/-) is also allowed.
  "0px", "100px", "50% - 25px",
  // numbers, same to number + px ("0px", "100px")
  0, 100, 1000,
  // Setting a different value for panel & camera
  { panel: "10%", camera: "25%" }
];

possibleOptions.forEach(align => {
  new Flicking("#el", { align });
});
```

**See Also:**

- [Demo: Alignment](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/alignment.md)

### animationThreshold

since v4.15.0

**Type:** `number`

The minimum distance for animation to proceed.

**Default:** `0.5`

**Remarks:** If the distance to be moved is less than `animationThreshold`, the movement proceeds immediately without animation (duration: 0).

**See Also:**

- [Demo: Animation Threshold](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/animation-threshold.md)

### autoInit

**Type:** `boolean`

Call [init()](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#init) automatically when creating Flicking's instance.

**Default:** `true`

**See Also:**

- [Demo: Auto Init](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/auto-init.md)

### autoResize

**Type:** `boolean`

Whether to automatically call [resize()](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#resize) when the viewport element (.flicking-viewport) size is changed.

**Default:** `true`

**See Also:**

- [Demo: Auto Resize](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/auto-resize.md)

### bounce

**Type:** `number | string | [number | string, number | string]`

The size value of the bounce area.

**Default:** `"20%"`

**Dependencies:**

- **Conditional**: Only can be enabled when [circular](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) is false

- **Related**: Works with [bound](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound) to provide bounce effect at panel boundaries

**Example:**

```typescript
const possibleOptions = [
  "0%", "25%", "42%",           // % values
  "0px", "100px", "50% - 25px", // px values with arithmetic
  0, 100, 1000                  // numbers (same as px)
];
```

**See Also:**

- [Demo: Bound](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/bound.md)

### bound

**Type:** `boolean`

Prevent the view (camera element) from going out of the first/last panel.

**Default:** `false`

**Dependencies:**

- **Mutual Exclusive**: [circular](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular). When circular is true, this option is ignored.

- **Related**: Works with [bounce](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bounce) for bounce effect at boundaries

**See Also:**

- [Demo: Bound](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/bound.md)

### changeOnHold

since v4.8.0

**Type:** `boolean`

Change active panel index on mouse/touch hold while animating.

**Default:** `false`

**Remarks:** `index` of the `willChange`/`willRestore` event will be used as new index.

**See Also:**

- [Demo: Interruptable](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/interruptable.md)

### circular

**Type:** `boolean`

Enables circular (continuous loop) mode, which connects first/last panel for continuous scrolling.

**Default:** `false`

**Dependencies:**

- **Conditional**: Total panel size must be ≥ viewport size. If not met, automatically falls back to [circularFallback](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circularfallback) mode.

- **Mutual Exclusive**: [bound](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound). When both are true, circular takes precedence and bound will be ignored.

- **Related**: [circularFallback](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circularfallback) determines fallback behavior when circular cannot be enabled

**See Also:**

- [Demo: Circular](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/circular.md)

### circularFallback

since v4.5.0

**Type:** `LiteralUnion<ValueOf<typeof CIRCULAR_FALLBACK>>`

Set panel control mode for the case when circular cannot be enabled.

**Default:** `"linear"`

**Accepts:** [CIRCULAR_FALLBACK](https://naver.github.io/egjs-flicking/llm-docs/api/variables/CIRCULAR_FALLBACK.md) - `"linear"` | `"bound"`

**Dependencies:**

- **Requires**: Only takes effect when [circular](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) is true but activation requirements are not met (total panel size < viewport size)

**See Also:**

- [Demo: Circular](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/circular.md)

### deceleration

**Type:** `number`

Deceleration of panel movement animation with momentum applied by user interaction (input). Higher values result in a shorter animation duration.

**Default:** `0.0075`

**See Also:**

- [Demo: Deceleration](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/deceleration.md)

### defaultIndex

**Type:** `number`

Index of the panel to move when Flicking's [init()](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#init) is called. A zero-based integer.

**Default:** `0`

**See Also:**

- [Demo: Default Index](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/default-index.md)

### disableOnInit

**Type:** `boolean`

Automatically call [disableInput()](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#disableinput) during initialization.

**Default:** `false`

**See Also:**

- [Demo: Disable Input](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/disable-input.md)

### dragThreshold

**Type:** `number`

Minimum distance to recognize user input (unit: px). Panels will only move after scrolling beyond this value.

**Default:** `1`

**See Also:**

- [Demo: Threshold](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/threshold.md)

### duration

**Type:** `number`

Default duration of the animation in milliseconds.

**Default:** `500`

**See Also:**

- [Demo: Duration](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/duration.md)

### easing

**Type:** `(x: number) => number`

An easing function applied to the panel movement animation.

**Default:** `"easeOutCubic" (x => 1 - Math.pow(1 - x, 3))`

**See Also:**

- [Easing Functions Cheat Sheet](http://easings.net/)

- [Demo: Easing](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/easing.md)

### horizontal

**Type:** `boolean`

Direction of panel movement. `true` for horizontal, `false` for vertical.

**Default:** `true`

**Remarks:** In vanilla JS, you must manually add the `vertical` class to the viewport element when using vertical mode. React and Vue wrappers add this class automatically.

**Example:**

```typescript
// Vanilla JS: add "vertical" class to the viewport element
// <div class="flicking-viewport vertical">
//   <div class="flicking-camera">...
// 
const flicking = new Flicking("#my-flicking", {
  horizontal: false
});
```

**See Also:**

- [Demo: Vertical](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/vertical.md)

### inputType

**Type:** `string[]`

Types of input devices to enable.

**Default:** `["touch", "mouse"]`

**See Also:**

- [Demo: Input Type](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/input-type.md)

### interruptable

**Type:** `boolean`

Allows stopping animations with user click/touch input.

**Default:** `true`

**See Also:**

- [Demo: Interruptable](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/interruptable.md)

### iOSEdgeSwipeThreshold

**Type:** `number`

Size of the area from the right edge in iOS Safari (in px) that enables swipe-back or swipe-forward.

**Default:** `30`

**See Also:**

- [Demo: Input Type](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/input-type.md)

### maxResizeDebounce

since v4.6.0

**Type:** `number`

The maximum time for size recalculation delay when using `resizeDebounce`, in milliseconds.

**Default:** `100`

**Remarks:** This guarantees that size recalculation is performed at least once every (n)ms.

**See Also:**

- [Demo: Resize Debounce](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/resize-debounce.md)

### moveType

**Type:** `ValueOf<typeof MOVE_TYPE> | MoveTypeOptions<ValueOf<typeof MOVE_TYPE>>`

Movement style by user input. Determines the instance type of [control](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#control).

**Default:** `"snap"`

**Accepts:** [MOVE_TYPE](https://naver.github.io/egjs-flicking/llm-docs/api/variables/MOVE_TYPE.md) - `"snap"` | `"freeScroll"` | `"strict"`

**Remarks:** - "snap": Uses [SnapControl](https://naver.github.io/egjs-flicking/llm-docs/api/classes/SnapControl.md)

- "freeScroll": Uses [FreeControl](https://naver.github.io/egjs-flicking/llm-docs/api/classes/FreeControl.md) with [FreeControlOptions](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FreeControlOptions.md)

- "strict": Uses [StrictControl](https://naver.github.io/egjs-flicking/llm-docs/api/classes/StrictControl.md) with [StrictControlOptions](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/StrictControlOptions.md)

**Example:**

```typescript
import Flicking, { MOVE_TYPE } from "@egjs/flicking";

const flicking = new Flicking({
  moveType: MOVE_TYPE.SNAP
});

const flicking = new Flicking({
  // If you want more specific settings for the moveType
  // [moveType, options for that moveType]
  // In this case, it's ["freeScroll", FreeControlOptions]
  moveType: [MOVE_TYPE.FREE_SCROLL, { stopAtEdge: true }]
});
```

**See Also:**

- [Demo: Movement Types](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/movement-types.md)

### needPanelThreshold

**Type:** `number`

A threshold from the viewport edge to trigger the `needPanel` event.

**Default:** `0`

**See Also:**

- [Demo: Infinite Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/infinite-scroll.md)

### nested

since v4.7.0

**Type:** `boolean`

Enable nested Flicking mode to allow parent Flicking to move when reaching boundaries.

**Default:** `false`

**Remarks:** When Flicking is nested inside another Flicking, enabling this option allows the parent Flicking to move in the same direction after the nested Flicking reaches the first or last panel.

This option is not required if the parent and nested Flicking have different horizontal options.

**See Also:**

- [Demo: Nested](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/nested.md)

### noPanelStyleOverride

**Type:** `boolean`

When enabled, prevents modifying the panel's `width/height` styles when [panelsPerView](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#panelsperview) is enabled. Enabling this option can improve performance if you are manually managing all panel sizes.

**Default:** `false`

**See Also:**

- [Demo: Panels Per View](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/panels-per-view.md)

### observePanelResize

since v4.13.1

**Type:** `boolean`

Whether to use ResizeObserver to observe the size of the panel element.

**Default:** `false`

**Dependencies:**

- **Conditional**: Only available when [useResizeObserver](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#useresizeobserver) is enabled

**See Also:**

- [Demo: Observe Panel Resize](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/observe-panel-resize.md)

### panelsPerView

since v4.2.0

**Type:** `number`

A visible number of panels on viewport. Enabling this option will force the panel to resize.

**Default:** `-1`

**Dependencies:**

- **Related**: Affects how [align](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align) calculates panel positions

- **Related**: Works with [noPanelStyleOverride](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nopanelstyleoverride) to prevent style modifications

- **Requires**: Required for [virtual](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#virtual) to work (must be > 0)

**See Also:**

- [Demo: Panels Per View](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/panels-per-view.md)

### preventClickOnDrag

**Type:** `boolean`

Automatically cancels [click](https://developer.mozilla.org/ko/docs/Web/API/Element/click_event) events when the user drags the viewport by any amount.

**Default:** `true`

**See Also:**

- [Demo: Prevent Click](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/prevent-click.md)

### preventDefaultOnDrag

since v4.11.0

**Type:** `boolean`

Whether to use the [preventDefault](https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault) when the user starts dragging

**Default:** `false`

**See Also:**

- [Demo: Prevent Click](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/prevent-click.md)

### preventEventsBeforeInit

since v4.2.0

**Type:** `boolean`

When enabled, disables events before the `ready` event during initialization.

**Default:** `true`

**See Also:**

- [Demo: Auto Init](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/auto-init.md)

### renderExternal

**Type:** `{
        renderer: new (options: RendererOptions) => ExternalRenderer;
        rendererOptions: RendererOptions;
    } | null`

**⚠️ Deprecated:** Use externalRenderer instead

### renderOnlyVisible

**Type:** `boolean`

When enabled, only renders visible panels. Can significantly improve performance with many panels.

**Default:** `false`

**See Also:**

- [Demo: Render Only Visible](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/render-only-visible.md)

### resizeDebounce

since v4.6.0

**Type:** `number`

Delays size recalculation from `autoResize` by the given time in milliseconds.

**Default:** `0`

**Remarks:** If the size is changed again while being delayed, it cancels the previous one and delays from the beginning again. This can increase performance by preventing `resize` being called too often.

**See Also:**

- [Demo: Resize Debounce](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/resize-debounce.md)

### resizeOnContentsReady

since v4.3.0

**Type:** `boolean`

When enabled, automatically calls [resize](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#resize) when images/videos inside Flicking panels are loaded. This is useful when Flicking contains content that changes size before and after loading.

**Default:** `false`

**See Also:**

- [Demo: Resize On Contents Ready](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/resize-on-contents-ready.md)

### threshold

**Type:** `number`

Movement threshold to change panels (unit: px). Panels will only change after scrolling beyond this value.

**Default:** `40`

**See Also:**

- [Demo: Threshold](https://naver.github.io/egjs-flicking/llm-docs/demos/basic/threshold.md)

### useCSSOrder

since v4.15.0

**Type:** `boolean`

Using `useCSSOrder` does not change the DOM order, but the `order` CSS property changes the order on the screen.

**Default:** `false`

**Remarks:** When `circular` is used, the DOM order changes depending on the position. When using `iframe`, you can prevent reloading when the DOM order changes. In svelte, CSS order is always used.

**See Also:**

- [Demo: CSS Order](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/use-css-order.md)

### useFractionalSize

since v4.9.0

**Type:** `boolean`

By enabling this, Flicking will calculate all internal size with CSS width computed with getComputedStyle.

**Default:** `false`

**Remarks:** This can prevent 1px offset issue in some cases where panel size has the fractional part. All sizes will have the original size before CSS [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) is applied on the element.

**See Also:**

- [Demo: Fractional Size](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/fractional-size.md)

### useResizeObserver

since v4.4.0

**Type:** `boolean`

Whether to listen [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)'s event instead of Window's [resize](https://developer.mozilla.org/ko/docs/Web/API/Window/resize_event) event when using the `autoResize` option

**Default:** `true`

**See Also:**

- [Demo: Auto Resize](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/auto-resize.md)

### virtual

since v4.4.0

**Type:** `VirtualOptions | null`

When enabled, restricts the number of panel elements to `panelsPerView + 1` to reduce memory usage.

**Default:** `null`

**Dependencies:**

- **Requires**: Must be used with [panelsPerView](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview). When panelsPerView is -1 (auto), this option is ignored.

**Example:**

```typescript
import Flicking, { VirtualPanel } from "@egjs/flicking";

const flicking = new Flicking("#some_el", {
  panelsPerView: 3,
  virtual: {
    renderPanel: (panel: VirtualPanel, index: number) => `Panel ${index}`,
    initialPanelCount: 100
  }
});

// Add 100 virtual panels (at the end)
flicking.virtual.append(100);

// Remove 100 virtual panels from 0 to 100
flicking.virtual.remove(0, 100);
```

**See Also:**

- [Demo: Virtual Scroll](https://naver.github.io/egjs-flicking/llm-docs/demos/advanced/virtual-scroll.md)

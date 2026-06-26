# AfterResizeEvent

> Event that fires when Flicking's [resize](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#resize) is called, after updating the sizes of panels and viewport.

## Properties

### element

**Type:** `HTMLElement`

The viewport element

### height

**Type:** `number`

New height of the viewport

### prev

**Type:** `{
        width: number;
        height: number;
    }`

Previous size of the viewport

### sizeChanged

**Type:** `boolean`

A Boolean value indicating whether the width/height of the viewport element is changed

### width

**Type:** `number`

New width of the viewport

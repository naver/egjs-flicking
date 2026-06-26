# BeforeResizeEvent

> Event that fires when Flicking's [resize](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#resize) is called, before updating the sizes of panels and viewport.

## Description

You can update the sizes of panels and viewport with this event, and it'll be applied after [resize](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#resize) is finished.

## Properties

### element

**Type:** `HTMLElement`

The viewport element

### height

**Type:** `number`

Previous height of the viewport

### width

**Type:** `number`

Previous width of the viewport

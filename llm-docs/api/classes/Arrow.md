# Arrow

> A plugin to easily create prev/next arrow buttons for Flicking

**See Also:**

- [Demo: Arrow](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/arrow.md)

## Constructor

```typescript
constructor(options?: Partial<ArrowOptions>);
```

Constructs a new instance of the `Arrow` class

### Parameters

**`options`** (`Partial<ArrowOptions>`) - Options for the Arrow instance

### Examples

```typescript
flicking.addPlugins(new Arrow({ parentEl: null, prevElSelector: ".flicking-arrow-prev", nextElSelector: ".flicking-arrow-next" }));
```

## Options

### disabledClass

**Type:** `string`

CSS class added to an arrow element when it is disabled (at the start/end of non-circular Flicking)

**Default:** `"flicking-arrow-disabled"`

### moveByViewportSize

**Type:** `boolean`

Whether to move by viewport size instead of panel count

**Default:** `false`

### moveCount

**Type:** `number`

Number of panels to move when an arrow is clicked

**Default:** `1`

### nextElSelector

**Type:** `string`

CSS selector for the "next" arrow element

**Default:** `".flicking-arrow-next"`

### parentEl

**Type:** `HTMLElement | null`

The parent element to search for arrow elements. If `null`, the Flicking element is used

**Default:** `null`

### prevElSelector

**Type:** `string`

CSS selector for the "previous" arrow element

**Default:** `".flicking-arrow-prev"`

## Properties

### disabledClass

**Type:** `ArrowOptions["disabledClass"]`

Current value of the [disabledClass](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Arrow.md#disabledclass) option.

### moveByViewportSize

**Type:** `ArrowOptions["moveByViewportSize"]`

Current value of the [moveByViewportSize](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Arrow.md#movebyviewportsize) option.

### moveCount

**Type:** `ArrowOptions["moveCount"]`

Current value of the [moveCount](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Arrow.md#movecount) option.

### nextEl

**Type:** `HTMLElement`

The "next" arrow HTMLElement

*This property is read-only.*

### nextElSelector

**Type:** `ArrowOptions["nextElSelector"]`

Current value of the [nextElSelector](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Arrow.md#nextelselector) option.

### parentEl

**Type:** `ArrowOptions["parentEl"]`

Current value of the [parentEl](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Arrow.md#parentel) option.

### prevEl

**Type:** `HTMLElement`

The "previous" arrow HTMLElement

*This property is read-only.*

### prevElSelector

**Type:** `ArrowOptions["prevElSelector"]`

Current value of the [prevElSelector](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Arrow.md#prevelselector) option.

## Methods

### destroy

```typescript
destroy(): void
```

Destroy the plugin and remove all arrow event listeners.

### init

```typescript
init(flicking: Flicking): void
```

Initialize the plugin and attach arrow event listeners to the Flicking instance.

**Parameters:**

- `flicking` (`Flicking`) - The Flicking instance to attach this plugin to

### update

```typescript
update(): void
```

Update the arrow disabled/enabled state based on the current camera position.

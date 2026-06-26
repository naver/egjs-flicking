# Pagination

> A plugin to add pagination indicators (bullets, fractions, or scrollable bullets) to Flicking

**See Also:**

- [Demo: Pagination](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/pagination.md)

## Constructor

```typescript
constructor(options?: Partial<PaginationOptions>);
```

Constructs a new instance of the `Pagination` class

### Parameters

**`options`** (`Partial<PaginationOptions>`) - Options for the Pagination instance

### Examples

```typescript
flicking.addPlugins(new Pagination({ type: "bullet", selector: ".flicking-pagination" }));
```

## Options

### bulletCount

**Type:** `number`

Maximum number of bullet indicators displayed at once (only for `"scroll"` type)

**Default:** `5`

### classPrefix

**Type:** `string`

CSS class prefix for pagination elements

**Default:** `"flicking-pagination"`

### fractionCurrentFormat

**Type:** `(index: number) => string`

Format function for the current index in fraction type

### fractionTotalFormat

**Type:** `(total: number) => string`

Format function for the total count in fraction type

### parentEl

**Type:** `HTMLElement | null`

The parent element to search for the pagination wrapper. If `null`, the Flicking element is used

**Default:** `null`

### renderActiveBullet

**Type:** `((className: string, index: number) => string) | null`

Custom render function for the active bullet element. If `null`, the default bullet is used

**Default:** `null`

### renderBullet

**Type:** `(className: string, index: number) => string`

Custom render function for each bullet element

### renderFraction

**Type:** `(currentClass: string, totalClass: string) => string`

Custom render function for the fraction display

### scrollOnChange

**Type:** `(index: number, ctx: ScrollContext) => any`

Callback invoked when the scroll pagination index changes

### selector

**Type:** `string`

CSS selector for the pagination wrapper element

**Default:** `".flicking-pagination"`

### type

**Type:** `"bullet" | "fraction" | "scroll"`

Pagination display type

**Default:** `"bullet"`

## Properties

### bulletCount

**Type:** `PaginationOptions["bulletCount"]`

Current value of the [bulletCount](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#bulletcount) option.

### bulletWrapperclassPrefixClass

**Type:** `PaginationOptions["classPrefix"]`

Sets [classPrefix](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#classprefix).

### classPrefix

**Type:** `string`

Current value of the [classPrefix](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#classprefix) option.

*This property is read-only.*

### fractionCurrentFormat

**Type:** `PaginationOptions["fractionCurrentFormat"]`

Current value of the [fractionCurrentFormat](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#fractioncurrentformat) option.

### fractionTotalFormat

**Type:** `PaginationOptions["fractionTotalFormat"]`

Current value of the [fractionTotalFormat](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#fractiontotalformat) option.

### parentEl

**Type:** `PaginationOptions["parentEl"]`

Current value of the [parentEl](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#parentel) option.

### renderActiveBullet

**Type:** `PaginationOptions["renderActiveBullet"]`

Current value of the [renderActiveBullet](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#renderactivebullet) option.

### renderBullet

**Type:** `PaginationOptions["renderBullet"]`

Current value of the [renderBullet](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#renderbullet) option.

### renderFraction

**Type:** `PaginationOptions["renderFraction"]`

Current value of the [renderFraction](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#renderfraction) option.

### scrollOnChange

**Type:** `PaginationOptions["scrollOnChange"]`

Current value of the [scrollOnChange](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#scrollonchange) option.

### selector

**Type:** `PaginationOptions["selector"]`

Current value of the [selector](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Pagination.md#selector) option.

### type

**Type:** `PaginationOptions["type"]`

Current value of the PaginationOptions.type | type option.

### update

**Type:** `() => void`

Re-render the pagination indicators to reflect the current panel state.

## Methods

### destroy

```typescript
destroy(): void
```

Destroy the plugin, remove all event listeners, and clean up pagination DOM elements.

### init

```typescript
init(flicking: Flicking): void
```

Initialize the plugin, create the pagination renderer, and attach event listeners to the Flicking instance.

**Parameters:**

- `flicking` (`Flicking`) - The Flicking instance to attach this plugin to

# VirtualPanel

> A slide data component that holds information of a single HTMLElement

## Constructor

```typescript
constructor(options: VirtualPanelOptions);
```

Constructs a new instance of the `VirtualPanel` class

### Parameters

**`options`** (`VirtualPanelOptions`) - [VirtualPanelOptions](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/VirtualPanelOptions.md)

## Properties

### _cachedInnerHTML

**Type:** `string | null`

### _elProvider

**Type:** `VirtualElementProvider`

### cachedInnerHTML

**Type:** `string | null`

Cached innerHTML by the previous render function

*This property is read-only.*

### element

**Type:** `HTMLElement`

`HTMLElement` that panel's referencing

*This property is read-only.*

### elementIndex

**Type:** `number`

A number for indexing which element it will be rendered on

*This property is read-only.*

## Methods

### cacheRenderResult

```typescript
cacheRenderResult(result: string): void
```

### decreaseIndex

```typescript
decreaseIndex(val: number): this
```

### increaseIndex

```typescript
increaseIndex(val: number): this
```

### render

```typescript
render(): void
```

### uncacheRenderResult

```typescript
uncacheRenderResult(): void
```

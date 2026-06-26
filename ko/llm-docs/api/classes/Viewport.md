# Viewport

> A component that manages viewport size

## Constructor

```typescript
constructor(flicking: Flicking, el: HTMLElement);
```

Constructs a new instance of the `Viewport` class

### Parameters

**`flicking`** (`Flicking`) - Flicking instance

**`el`** (`HTMLElement`) - A viewport element

## Properties

### element

**Type:** `HTMLElement`

A viewport(root) element

*This property is read-only.*

### height

**Type:** `number`

Viewport height, without paddings

*This property is read-only.*

### padding

**Type:** `ViewportPadding`

Viewport paddings

*This property is read-only.*

### width

**Type:** `number`

Viewport width, without paddings

*This property is read-only.*

## Methods

### resize

```typescript
resize(): void
```

Update width/height to the current viewport element's size

### setSize

```typescript
setSize(size: SetSizeParams): void
```

Change viewport's size.

**Parameters:**

- `size` (`SetSizeParams`) - `SetSizeParams`

**Remarks:** This will change the actual size of `.flicking-viewport` element by changing its CSS width/height property

# Renderer

> A component that manages [Panel](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Panel.md) and its elements

## Constructor

```typescript
constructor(options: RendererOptions);
```

Constructs a new instance of the `Renderer` class

### Parameters

**`options`** (`RendererOptions`) - [RendererOptions](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/RendererOptions.md)

## Properties

### _align

**Type:** `NonNullable<RendererOptions["align"]>`

### _flicking

**Type:** `Flicking | null`

### _panels

**Type:** `Panel[]`

### _rendering

**Type:** `boolean`

### _strategy

**Type:** `RendererOptions["strategy"]`

### align

**Type:** `NonNullable<RendererOptions["align"]>`

A [Panel](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Panel.md)'s [align](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Panel.md#align) value that applied to all panels

### panelCount

**Type:** `number`

Count of panels

*This property is read-only.*

### panels

**Type:** `Panel[]`

Array of panels

**See Also:**

- Panel

*This property is read-only.*

## Methods

### batchInsert

```typescript
batchInsert(...items: BatchInsertParams[]): Panel[]
```

Insert new panels at given index

**Parameters:**

- `items` (`BatchInsertParams[]`) - An array of `BatchInsertParams`

**Returns:** An array of inserted panels

**Remarks:** This will increase index of panels after by the number of panels added.

**Throws:**

- [DOMManipulationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/DOMManipulationErrors.md)

### batchRemove

```typescript
batchRemove(...items: BatchRemoveParams[]): Panel[]
```

Remove the panel at the given index

**Parameters:**

- `items` (`BatchRemoveParams[]`) - An array of `BatchRemoveParams`

**Returns:** An array of removed panels

**Remarks:** This will decrease index of panels after by the number of panels removed.

**Throws:**

- [DOMManipulationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/DOMManipulationErrors.md)

### destroy

```typescript
destroy(): void
```

Destroy Renderer and return to initial state

**Remarks:** This method clears all panel references and resets the internal state.

### forceRenderAllPanels

```typescript
forceRenderAllPanels(): Promise<void>
```

### getPanel

```typescript
getPanel(index: number): Panel | null
```

Return the [Panel](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Panel.md) at the given index. `null` if it doesn't exist.

**Parameters:**

- `index` (`number`) - Index of the panel to get

**Returns:** Panel at the given index

**Remarks:** This is equivalent to accessing `Flicking.panels[index]`.

### getRenderedPanels

```typescript
getRenderedPanels(): Panel[]
```

Return Rendered Panels

**Returns:** Rendered Panels

### init

```typescript
init(flicking: Flicking): this
```

Initialize Renderer

**Parameters:**

- `flicking` (`Flicking`) - An instance of [Flicking](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md)

**Returns:** The current instance for method chaining

**Remarks:** This method is called automatically during [init](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#init). It collects existing panel elements.

### render

```typescript
abstract render(): Promise<void>
```

Render panel elements inside the camera element

**Returns:** A Promise that resolves when rendering is complete

**Remarks:** This method updates the DOM to reflect the current panel state.

### updatePanelSize

```typescript
updatePanelSize(): this
```

Update all panel sizes

**Returns:** The current instance for method chaining

# StrictControl

since v4.2.0

> A [Control](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Control.md) that allows you to select the maximum number of panels to move at a time

## Constructor

```typescript
constructor(options?: Partial<StrictControlOptions>);
```

Constructs a new instance of the `StrictControl` class

## Properties

### count

**Type:** `number`

Maximum number of panels that can be moved at a time

**Default:** `1`

### setActive

**Type:** `(newActivePanel: Panel, prevActivePanel: Panel | null, isTrusted: boolean) => void`

## Methods

### destroy

```typescript
destroy(): void
```

Destroy Control and return to initial state

**Remarks:** This method also resets the index range used for movement constraints.

### moveToPanel

```typescript
moveToPanel(panel: Panel, options: MoveToPanelParams): Promise<void>
```

### moveToPosition

```typescript
moveToPosition(position: number, duration: number, axesEvent?: OnRelease): Promise<void>
```

Move [Camera](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md) to the given position

**Parameters:**

- `position` (`number`) - The target position to move

- `duration` (`number`) - Duration of the panel movement animation (unit: ms)

- `axesEvent` (`OnRelease`) - [release](https://naver.github.io/egjs-axes/docs/api/Axes#event-release) event of [Axes](https://naver.github.io/egjs-axes/)

**Returns:** A Promise which will be resolved after reaching the target position

**Remarks:** StrictControl restricts movement to panels within the allowed index range based on the count option.

**Throws:**

- [MovementErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/MovementErrors.md)

**Fires:**

- [MovementEvents](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MovementEvents.md)

### updateInput

```typescript
updateInput(): this
```

Update [controller](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Control.md#controller)'s state

**Returns:** The current instance for method chaining

**Remarks:** StrictControl limits the movement range based on the [count](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/StrictControlOptions.md#count) option.

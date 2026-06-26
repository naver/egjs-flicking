# SnapControl

> A [Control](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Control.md) that uses a release momentum to choose destination panel

## Constructor

```typescript
constructor(options?: Partial<SnapControlOptions>);
```

Constructs a new instance of the `SnapControl` class

## Properties

### count

**Type:** `number`

Maximum number of panels can go after release

**Default:** `Infinity`

## Methods

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

**Remarks:** This method calculates the snap target based on the release momentum and threshold settings.

**Throws:**

- [MovementErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/MovementErrors.md)

**Fires:**

- [MovementEvents](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MovementEvents.md)

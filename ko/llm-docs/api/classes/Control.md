# Control

> A component that manages inputs and animation of Flicking

## Constructor

```typescript
constructor();
```

Constructs a new instance of the `Control` class

## Properties

### _activePanel

**Type:** `Panel | null`

### _controller

**Type:** `AxesController`

### _flicking

**Type:** `Flicking | null`

### _nextPanel

**Type:** `Panel | null`

### activeIndex

**Type:** `number`

Index number of the [currentPanel](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#currentpanel)

**Default:** `0`

*This property is read-only.*

### activePanel

**Type:** `Panel | null`

An active panel

*This property is read-only.*

### animating

**Type:** `boolean`

Whether Flicking's animating

*This property is read-only.*

### controller

**Type:** `AxesController`

A controller that handles the [@egjs/axes](https://naver.github.io/egjs-axes/) events

*This property is read-only.*

### holding

**Type:** `boolean`

Whether user is clicking or touching

*This property is read-only.*

## Methods

### destroy

```typescript
destroy(): void
```

Destroy Control and return to initial state

**Remarks:** This method destroys the internal controller and resets all internal values.

### disable

```typescript
disable(): this
```

Disable input from the user (mouse/touch)

**Returns:** The current instance for method chaining

**Remarks:** This is a shorthand for `Flicking.disableInput`.

### enable

```typescript
enable(): this
```

Enable input from the user (mouse/touch)

**Returns:** The current instance for method chaining

**Remarks:** This is a shorthand for `Flicking.enableInput`.

### init

```typescript
init(flicking: Flicking): this
```

Initialize Control

**Parameters:**

- `flicking` (`Flicking`) - An instance of [Flicking](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md)

**Returns:** The current instance for method chaining

**Remarks:** This method is called automatically during [init](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#init). It initializes the internal controller.

### moveToPanel

```typescript
moveToPanel(panel: Panel, { duration, direction, axesEvent }: MoveToPanelParams): Promise<void>
```

Move [Camera](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md) to the given panel

**Parameters:**

- `panel` (`Panel`) - The target panel to move

- `{ duration, direction, axesEvent }` (`MoveToPanelParams`) - 

**Returns:** A Promise which will be resolved after reaching the target panel

**Throws:**

- [MovementErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/MovementErrors.md)

**Fires:**

- [MovementEvents](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MovementEvents.md)

### moveToPosition

```typescript
abstract moveToPosition(position: number, duration: number, axesEvent?: OnRelease): Promise<void>
```

Move [Camera](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md) to the given position

**Parameters:**

- `position` (`number`) - The target position to move

- `duration` (`number`) - Duration of the panel movement animation (unit: ms)

- `axesEvent` (`OnRelease`) - [release](https://naver.github.io/egjs-axes/docs/api/Axes#event-release) event of [Axes](https://naver.github.io/egjs-axes/)

**Returns:** A Promise which will be resolved after reaching the target position

**Throws:**

- [MovementErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/MovementErrors.md)

**Fires:**

- [MovementEvents](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MovementEvents.md)

### release

```typescript
release(): this
```

Releases ongoing user input (mouse/touch)

**Returns:** The current instance for method chaining

**Remarks:** This method immediately releases the user's input, similar to the user lifting their finger.

### resetActive

```typescript
resetActive(): this
```

Reset [activePanel](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Control.md#activepanel) to `null`

**Returns:** The current instance for method chaining

**Remarks:** This method is called when the active panel is removed from the renderer.

### stopAnimation

```typescript
stopAnimation(): this
```

Stops the animation currently playing

**Returns:** The current instance for method chaining

**Remarks:** This method does nothing if no animation is currently playing.

### updateAnimation

```typescript
updateAnimation(panel: Panel, duration?: number, direction?: ValueOf<typeof DIRECTION>): this
```

Change the destination and duration of the animation currently playing

**Parameters:**

- `panel` (`Panel`) - The target panel to move

- `duration` (`number`) - Duration of the animation (unit: ms)

- `direction` (`ValueOf<typeof DIRECTION>`) - Direction to move, only available in the [circular](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#circular) mode

**Returns:** The current instance for method chaining

**Remarks:** This method does nothing if no animation is currently playing.

**Throws:**

- [AnimationUpdateErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/AnimationUpdateErrors.md)

### updateInput

```typescript
updateInput(): this
```

Update [controller](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Control.md#controller)'s state

**Returns:** The current instance for method chaining

**Remarks:** This method synchronizes the controller state with the current camera parameters.

### updatePosition

```typescript
updatePosition(progressInPanel: number): void
```

Update position after resizing

**Parameters:**

- `progressInPanel` (`number`) - Previous camera's progress in active panel before resize

**Remarks:** This method moves the camera to the active panel's position after a resize operation.

**Throws:**

- [InitializationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/InitializationErrors.md)

# Camera

> A component that manages actual movement inside the viewport

## Constructor

```typescript
constructor(flicking: Flicking, { align }?: Partial<CameraOptions>);
```

Creates a new Camera instance

### Parameters

**`flicking`** (`Flicking`) - An instance of [Flicking](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md)

**`{ align }`** (`Partial<CameraOptions>`) - 

## Properties

### align

**Type:** `FlickingOptions["align"]`

A value indicating where the [alignPosition](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md#alignposition) should be located at inside the viewport element

### alignPosition

**Type:** `number`

Align position inside the viewport where [Panel](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Panel.md)'s [alignPosition](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Panel.md#alignposition) should be located at

*This property is read-only.*

### anchorPoints

**Type:** `AnchorPoint[]`

An array of [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md)s that Camera can be stopped at

*This property is read-only.*

### atEdge

**Type:** `boolean`

A Boolean value indicating whether Camera's over the minimum or maximum position reachable

*This property is read-only.*

### children

**Type:** `HTMLElement[]`

An array of the child elements of the camera element(`.flicking-camera`)

*This property is read-only.*

### circularEnabled

**Type:** `boolean`

Whether the `circular` option is enabled.

**Remarks:** The [circular](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#circular) option can't be enabled when sum of the panel sizes are too small.

**Default:** `false`

*This property is read-only.*

### controlParams

**Type:** `{
        range: CameraRange;
        position: number;
        circular: boolean;
    }`

A current parameters of the Camera for updating `AxesController`

*This property is read-only.*

### element

**Type:** `HTMLElement`

The camera element(`.flicking-camera`)

*This property is read-only.*

### mode

**Type:** `CameraMode`

A current camera mode

*This property is read-only.*

### offset

**Type:** `number`

Position offset, used for the [renderOnlyVisible](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#renderonlyvisible) option

**Default:** `0`

*This property is read-only.*

### panelOrder

**Type:** `ValueOf<typeof ORDER>`

[direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction) CSS property applied to the camera element(`.flicking-camera`)

*This property is read-only.*

### position

**Type:** `number`

Current position of the camera

*This property is read-only.*

### progress

**Type:** `number`

Return the camera's position progress from the first panel to last panel

**Remarks:** Range is from 0 to last panel's index

*This property is read-only.*

### range

**Type:** `CameraRange`

A range that Camera's [position](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md#position) can reach

*This property is read-only.*

### rangeDiff

**Type:** `number`

A difference between Camera's minimum and maximum position that can reach

*This property is read-only.*

### size

**Type:** `number`

Return the size of the viewport

*This property is read-only.*

### visiblePanels

**Type:** `Panel[]`

An array of visible panels from the current position

*This property is read-only.*

### visibleRange

**Type:** `CameraRange`

A range of the visible area from the current position

*This property is read-only.*

## Methods

### applyTransform

```typescript
applyTransform(): this
```

Apply "transform" style with the current position to camera element

**Returns:** The current instance for method chaining

### canReach

```typescript
canReach(panel: Panel): boolean
```

Check whether the given panel is inside of the Camera's range

**Parameters:**

- `panel` (`Panel`) - An instance of [Panel](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Panel.md) to check

**Returns:** Whether the panel's inside Camera's range

### canSee

```typescript
canSee(panel: Panel): boolean
```

Check whether the given panel element is visible at the current position

**Parameters:**

- `panel` (`Panel`) - An instance of [Panel](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Panel.md) to check

**Returns:** Whether the panel element is visible at the current position

### clampToReachablePosition

```typescript
clampToReachablePosition(position: number): number
```

Clamp the given position between camera's range

**Parameters:**

- `position` (`number`) - A position to clamp

**Returns:** A clamped position

### destroy

```typescript
destroy(): this
```

Destroy Camera and return to initial state

**Returns:** The current instance for method chaining

**Remarks:** This method resets all internal values to their initial state.

### findActiveAnchor

```typescript
findActiveAnchor(): AnchorPoint | null
```

Return [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md) that matches [currentPanel](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#currentpanel)

**Returns:** The AnchorPoint that matches current panel

### findAnchorIncludePosition

```typescript
findAnchorIncludePosition(position: number): AnchorPoint | null
```

Return [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md) that includes given position

**Parameters:**

- `position` (`number`) - A position to check

**Returns:** The AnchorPoint that includes the given position

**Remarks:** If there's no [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md) that includes the given position, return `null` instead

### findNearestAnchor

```typescript
findNearestAnchor(position: number): AnchorPoint | null
```

Return [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md) nearest to given position

**Parameters:**

- `position` (`number`) - A position to check

**Returns:** The AnchorPoint nearest to the given position

**Remarks:** If there're no [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md)s, return `null` instead

### getNextAnchor

```typescript
getNextAnchor(anchor: AnchorPoint): AnchorPoint | null
```

Return a next [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md) of given [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md)

**Parameters:**

- `anchor` (`AnchorPoint`) - A reference [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md)

**Returns:** The next AnchorPoint

**Remarks:** If it does not exist, return `null` instead

### getPrevAnchor

```typescript
getPrevAnchor(anchor: AnchorPoint): AnchorPoint | null
```

Return a previous [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md) of given [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md)

**Parameters:**

- `anchor` (`AnchorPoint`) - A reference [AnchorPoint](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AnchorPoint.md)

**Returns:** The previous AnchorPoint

**Remarks:** If it does not exist, return `null` instead

### getProgressInPanel

```typescript
getProgressInPanel(panel: Panel): number
```

Return the camera's position progress in the panel below

**Parameters:**

- `panel` (`Panel`) - A panel to check

**Returns:** Progress value from 0 to 1 (or outside this range when in margin area)

**Remarks:** Value is from 0 to 1 when the camera's inside panel. Value can be lower than 0 or bigger than 1 when it's in the margin area

### init

```typescript
init(): this
```

Initialize Camera

**Returns:** The current instance for method chaining

**Remarks:** This method is called automatically during [init](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#init). It finds the camera element inside the viewport.

**Throws:**

- [InitializationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/InitializationErrors.md)

### lookAt

```typescript
lookAt(pos: number): void
```

Move to the given position and apply CSS transform

**Parameters:**

- `pos` (`number`) - A new position

**Remarks:** This method updates the camera position, toggles panels for circular mode, and refreshes visible panels.

**Throws:**

- [InitializationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/InitializationErrors.md)

### resetNeedPanelHistory

```typescript
resetNeedPanelHistory(): this
```

Reset the history of Flicking.event:needPanel | needPanel events so it can be triggered again

**Returns:** The current instance for method chaining

### updateAdaptiveHeight

```typescript
updateAdaptiveHeight(): void
```

Update Viewport's height to visible panel's max height

**Remarks:** This method only takes effect when [horizontal](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal) is `true` and [adaptive](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#adaptive) is enabled.

**Throws:**

- [InitializationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/InitializationErrors.md)

### updateAlignPos

```typescript
updateAlignPos(): this
```

Update Camera's [alignPosition](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md#alignposition)

**Returns:** The current instance for method chaining

### updateAnchors

```typescript
updateAnchors(): this
```

Update Camera's [anchorPoints](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md#anchorpoints)

**Returns:** The current instance for method chaining

**Remarks:** Anchor points are positions where the camera can stop. This method recalculates them based on the current mode.

**Throws:**

- [InitializationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/InitializationErrors.md)

### updateOffset

```typescript
updateOffset(): this
```

Update current offset of the camera

**Returns:** The current instance for method chaining

### updatePanelOrder

```typescript
updatePanelOrder(): this
```

Update [direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction) to match the direction CSS property applied to the camera element

**Returns:** The current instance for method chaining

### updateRange

```typescript
updateRange(): this
```

Update [range](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md#range) of Camera

**Returns:** The current instance for method chaining

**Remarks:** This method recalculates the camera range based on the current panel positions and circular mode settings.

**Throws:**

- [InitializationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/InitializationErrors.md)

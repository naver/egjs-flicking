# Flicking

## Constructor

```typescript
constructor(root: HTMLElement | string, options?: Partial<FlickingOptions>);
```

Creates a new Flicking instance

### Parameters

**`root`** (`HTMLElement | string`) - A root HTMLElement to initialize Flicking on it. When it's a typeof `string`, it should be a css selector string

**`options`** (`Partial<FlickingOptions>`) - A [FlickingOptions](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md) object

**Throws:**

- [InitializationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/InitializationErrors.md)

### Examples

```typescript
import Flicking from "@egjs/flicking";

// Creating new instance of Flicking with HTMLElement
const flicking = new Flicking(document.querySelector(".flicking-viewport"), { circular: true });

// Creating new instance of Flicking with CSS selector
const flicking2 = new Flicking(".flicking-viewport", { circular: true });
```

## Properties

### activePlugins

**Type:** `Plugin[]`

Array of currently activated plugins.

**Remarks:** Plugins are added via [addPlugins](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#addplugins) and removed via [removePlugins](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#removeplugins).

*This property is read-only.*

### adaptive

**Type:** `FlickingOptions["adaptive"]`

Current value of the [adaptive](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#adaptive) option.

### align

**Type:** `FlickingOptions["align"]`

Current value of the [align](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#align) option.

### animating

**Type:** `boolean`

Whether Flicking is currently animating.

**Remarks:** This is a shorthand for `Flicking.control.animating`.

*This property is read-only.*

### animationThreshold

since v4.15.0

**Type:** `FlickingOptions["animationThreshold"]`

Current value of the [animationThreshold](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#animationthreshold) option.

### autoInit

**Type:** `FlickingOptions["autoInit"]`

Current value of the [autoInit](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoinit) option.

*This property is read-only.*

### autoResize

**Type:** `FlickingOptions["autoResize"]`

Current value of the [autoResize](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize) option.

### autoResizer

**Type:** `AutoResizer`

`AutoResizer` instance that detects size changes and triggers resize when [autoResize](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoresize) option is enabled

*This property is read-only.*

### bounce

**Type:** `FlickingOptions["bounce"]`

Current value of the [bounce](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bounce) option.

### bound

**Type:** `FlickingOptions["bound"]`

Current value of the [bound](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound) option.

### camera

**Type:** `Camera`

[Camera](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md) instance that manages actual movement and positioning inside the viewport

**Remarks:** The concrete Camera implementation is selected based on [circular](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) and [bound](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#bound) options.

*This property is read-only.*

### changeOnHold

since v4.8.0

**Type:** `FlickingOptions["changeOnHold"]`

Current value of the [changeOnHold](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#changeonhold) option.

### circular

**Type:** `FlickingOptions["circular"]`

Current value of the [circular](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) option.

### circularEnabled

**Type:** `boolean`

Whether the circular mode is actually enabled.

**Remarks:** The [circular](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) option may not be enabled when the sum of panel sizes is too small. This property reflects the actual enabled state, which may differ from the [circular](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) option value.

**Default:** `false`

*This property is read-only.*

### circularFallback

since v4.5.0

**Type:** `FlickingOptions["circularFallback"]`

Current value of the [circularFallback](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circularfallback) option.

*This property is read-only.*

### control

**Type:** `Control`

[Control](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Control.md) instance that manages user input and panel movement animations

**Remarks:** The concrete Control implementation is selected based on [moveType](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype) option.

*This property is read-only.*

### currentPanel

**Type:** `Panel | null`

The currently active panel.

**Remarks:** Returns `null` when there is no active panel. This is a shorthand for `Flicking.control.activePanel`.

*This property is read-only.*

### deceleration

**Type:** `FlickingOptions["deceleration"]`

Current value of the [deceleration](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#deceleration) option.

### defaultIndex

**Type:** `FlickingOptions["defaultIndex"]`

Current value of the [defaultIndex](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#defaultindex) option.

### disableOnInit

**Type:** `FlickingOptions["disableOnInit"]`

Current value of the [disableOnInit](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#disableoninit) option.

### dragThreshold

**Type:** `FlickingOptions["dragThreshold"]`

Current value of the [dragThreshold](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#dragthreshold) option.

### duration

**Type:** `FlickingOptions["duration"]`

Current value of the [duration](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration) option.

### easing

**Type:** `FlickingOptions["easing"]`

Current value of the [easing](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#easing) option.

### element

**Type:** `HTMLElement`

The root viewport element (`.flicking-viewport`).

**Remarks:** This is the element passed to the Flicking constructor. It is a shorthand for `Flicking.viewport.element`.

*This property is read-only.*

### externalRenderer

**Type:** `FlickingOptions["externalRenderer"]`

Current value of the [externalRenderer](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#externalrenderer) option.

*This property is read-only.*

### holding

**Type:** `boolean`

Whether the user is currently clicking or touching the viewport.

**Remarks:** This is a shorthand for `Flicking.control.holding`.

*This property is read-only.*

### horizontal

**Type:** `FlickingOptions["horizontal"]`

Current value of the [horizontal](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#horizontal) option.

### index

**Type:** `number`

Index of the currently active panel.

**Remarks:** Returns -1 when there is no active panel. This is a shorthand for `Flicking.currentPanel.index`.

*This property is read-only.*

### initialized

**Type:** `boolean`

Whether Flicking's [init](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#init) is called.

**Remarks:** This is `true` when [init](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#init) is called, and is `false` after calling [destroy](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#destroy). Use this to check if Flicking is ready before calling certain methods that require initialization.

**Default:** `false`

*This property is read-only.*

### inputType

**Type:** `FlickingOptions["inputType"]`

Current value of the [inputType](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#inputtype) option.

### interruptable

**Type:** `FlickingOptions["interruptable"]`

Current value of the [interruptable](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#interruptable) option.

### iOSEdgeSwipeThreshold

**Type:** `FlickingOptions["iOSEdgeSwipeThreshold"]`

Current value of the [iOSEdgeSwipeThreshold](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#iosedgeswipethreshold) option.

### maxResizeDebounce

since v4.6.0

**Type:** `FlickingOptions["maxResizeDebounce"]`

Current value of the [maxResizeDebounce](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#maxresizedebounce) option.

*This property is read-only.*

### moveType

**Type:** `FlickingOptions["moveType"]`

Current value of the [moveType](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype) option.

### needPanelThreshold

**Type:** `FlickingOptions["needPanelThreshold"]`

Current value of the [needPanelThreshold](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#needpanelthreshold) option.

### nested

since v4.7.0

**Type:** `FlickingOptions["nested"]`

Current value of the [nested](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nested) option.

### noPanelStyleOverride

**Type:** `FlickingOptions["noPanelStyleOverride"]`

Current value of the [noPanelStyleOverride](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#nopanelstyleoverride) option.

### observePanelResize

since v4.13.1

**Type:** `FlickingOptions["observePanelResize"]`

Current value of the [observePanelResize](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#observepanelresize) option.

### panelCount

**Type:** `number`

Total number of panels.

**Remarks:** This is a shorthand for `Flicking.renderer.panelCount`.

*This property is read-only.*

### panels

**Type:** `Panel[]`

Array of all panels.

**Remarks:** This is a shorthand for `Flicking.renderer.panels`.

*This property is read-only.*

### panelsPerView

since v4.2.0

**Type:** `FlickingOptions["panelsPerView"]`

Current value of the [panelsPerView](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview) option.

### preventClickOnDrag

**Type:** `FlickingOptions["preventClickOnDrag"]`

Current value of the [preventClickOnDrag](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#preventclickondrag) option.

### preventDefaultOnDrag

since v4.11.0

**Type:** `FlickingOptions["preventDefaultOnDrag"]`

Current value of the [preventDefaultOnDrag](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#preventdefaultondrag) option.

### preventEventsBeforeInit

since v4.2.0

**Type:** `FlickingOptions["preventEventsBeforeInit"]`

Current value of the [preventEventsBeforeInit](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#preventeventsbeforeinit) option.

### renderer

**Type:** `Renderer`

[Renderer](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Renderer.md) instance that manages panels and their elements

**Remarks:** The concrete Renderer implementation is selected based on [externalRenderer](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#externalrenderer) and [virtual](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#virtual) options.

*This property is read-only.*

### renderExternal

**Type:** `FlickingOptions["renderExternal"]`

**⚠️ Deprecated:** Use externalRenderer instead. Current value of the renderExternal option.

*This property is read-only.*

### renderOnlyVisible

**Type:** `FlickingOptions["renderOnlyVisible"]`

Current value of the [renderOnlyVisible](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#renderonlyvisible) option.

### resizeDebounce

since v4.6.0

**Type:** `FlickingOptions["resizeDebounce"]`

Current value of the [resizeDebounce](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizedebounce) option.

*This property is read-only.*

### resizeOnContentsReady

since v4.3.0

**Type:** `FlickingOptions["resizeOnContentsReady"]`

Current value of the [resizeOnContentsReady](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#resizeoncontentsready) option.

### threshold

**Type:** `FlickingOptions["threshold"]`

Current value of the [threshold](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#threshold) option.

### useCSSOrder

since v4.15.0

**Type:** `FlickingOptions["useCSSOrder"]`

Current value of the [useCSSOrder](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#usecssorder) option.

### useFractionalSize

since v4.9.0

**Type:** `FlickingOptions["useFractionalSize"]`

Current value of the [useFractionalSize](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#usefractionalsize) option.

*This property is read-only.*

### useResizeObserver

since v4.4.0

**Type:** `FlickingOptions["useResizeObserver"]`

Current value of the [useResizeObserver](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#useresizeobserver) option.

### VERSION

**Type:** `string`

Version info string

*This property is read-only.*

### viewport

**Type:** `Viewport`

[Viewport](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Viewport.md) instance that manages viewport size and element

*This property is read-only.*

### virtual

**Type:** `VirtualManager`

[VirtualManager](https://naver.github.io/egjs-flicking/llm-docs/api/classes/VirtualManager.md) instance that manages virtual panels

*This property is read-only.*

### virtualEnabled

**Type:** `boolean`

Whether the virtual mode is actually enabled.

**Remarks:** The [virtual](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#virtual) option may not be enabled when [panelsPerView](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#panelsperview) is less than or equal to zero. This property reflects the actual enabled state, which may differ from the [virtual](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#virtual) option value.

**Default:** `false`

*This property is read-only.*

### visiblePanels

**Type:** `Panel[]`

Array of panels that are currently visible in the viewport.

**Remarks:** This is a shorthand for `Flicking.camera.visiblePanels`.

*This property is read-only.*

## Methods

### addPlugins

```typescript
addPlugins(...plugins: Plugin[]): this
```

Add plugins to Flicking.

**Parameters:**

- `plugins` (`Plugin[]`) - `Plugin`

**Returns:** The current instance for method chaining

**Remarks:** Plugins are automatically initialized if Flicking is already initialized.

### append

```typescript
append(element: ElementLike | ElementLike[]): Panel[]
```

Add new panels after the last panel.

**Parameters:**

- `element` (`ElementLike | ElementLike[]`) - A new HTMLElement, outerHTML string, or an array of both

**Returns:** Array of appended panels

**Throws:**

- [DOMManipulationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/DOMManipulationErrors.md)

### destroy

```typescript
destroy(): void
```

Destroy Flicking and remove all event handlers.

**Remarks:** This method cleans up all resources including event handlers, components, and plugins. After calling this method, [initialized](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#initialized) will be `false` and the instance should not be used.

### disableInput

```typescript
disableInput(): this
```

Disable user input (mouse/touch).

**Returns:** The current instance for method chaining

**Remarks:** This is a shorthand for `Flicking.control.disable`.

### enableInput

```typescript
enableInput(): this
```

Enable user input (mouse/touch).

**Returns:** The current instance for method chaining

**Remarks:** This is a shorthand for `Flicking.control.enable`.

### getPanel

```typescript
getPanel(index: number): Panel | null
```

Get the panel at the given index.

**Parameters:**

- `index` (`number`) - The index of the panel to get

**Returns:** The panel at the given index, or `null` if it doesn't exist. This is a shorthand for `Flicking.renderer.getPanel(index)`.

### getStatus

```typescript
getStatus(options?: GetStatusParams): Status
```

Get the current Flicking status.

**Parameters:**

- `options` (`GetStatusParams`) - [GetStatusParams](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/GetStatusParams.md)

**Returns:** Status object that can be used with setStatus to restore the state

### init

```typescript
init(): Promise<void>
```

Initialize Flicking and move to the default index.

**Returns:** Promise that resolves when initialization is complete

**Remarks:** This method is automatically called in the constructor when [autoInit](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#autoinit) is `true` (default). If Flicking is already initialized, this method returns immediately without doing anything.

**Fires:**

- [ReadyEvent](https://naver.github.io/egjs-flicking/llm-docs/api/types/ReadyEvent.md)

### insert

```typescript
insert(index: number, element: ElementLike | ElementLike[]): Panel[]
```

Insert new panels at the given index.

**Parameters:**

- `index` (`number`) - Index to insert new panels at

- `element` (`ElementLike | ElementLike[]`) - A new HTMLElement, outerHTML string, or an array of both

**Returns:** Array of inserted panels

**Remarks:** This will increase the index of panels at or after the given index by the number of panels added.

**Throws:**

- [DOMManipulationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/DOMManipulationErrors.md)

### moveTo

```typescript
moveTo(index: number, duration?: number, direction?: ValueOf<typeof DIRECTION>): Promise<void>
```

Move to the panel with the given index.

**Parameters:**

- `index` (`number`) - The index of the panel to move to

- `duration` (`number`) - Duration of the animation (unit: ms). Defaults to [duration](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration)

- `direction` (`ValueOf<typeof DIRECTION>`) - Direction to move (circular mode only). Defaults to `NONE`

**Returns:** Promise that resolves after reaching the target panel

**Throws:**

- [MovementErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/MovementErrors.md)

**Fires:**

- [MovementEvents](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MovementEvents.md)

### next

```typescript
next(duration?: number): Promise<void>
```

Move to the next panel (current index + 1).

**Parameters:**

- `duration` (`number`) - Duration of the panel movement animation (unit: ms). Defaults to [duration](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration)

**Returns:** Promise that resolves after reaching the next panel

**Throws:**

- [MovementErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/MovementErrors.md)

**Fires:**

- [MovementEvents](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MovementEvents.md)

### prepend

```typescript
prepend(element: ElementLike | ElementLike[]): Panel[]
```

Add new panels before the first panel.

**Parameters:**

- `element` (`ElementLike | ElementLike[]`) - A new HTMLElement, outerHTML string, or an array of both

**Returns:** Array of prepended panels

**Remarks:** This will increase the index of existing panels by the number of panels added.

**Throws:**

- [DOMManipulationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/DOMManipulationErrors.md)

### prev

```typescript
prev(duration?: number): Promise<void>
```

Move to the previous panel (current index - 1).

**Parameters:**

- `duration` (`number`) - Duration of the panel movement animation (unit: ms). Defaults to [duration](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#duration)

**Returns:** Promise that resolves after reaching the previous panel

**Throws:**

- [MovementErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/MovementErrors.md)

**Fires:**

- [MovementEvents](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MovementEvents.md)

### remove

```typescript
remove(index: number, deleteCount?: number): Panel[]
```

Remove panels starting from the given index.

**Parameters:**

- `index` (`number`) - Index of the first panel to remove

- `deleteCount` (`number`) - Number of panels to remove. Defaults to `1`

**Returns:** Array of removed panels

**Remarks:** This will decrease the index of panels after the removed ones by the number of panels removed.

**Throws:**

- [DOMManipulationErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/DOMManipulationErrors.md)

### removePlugins

```typescript
removePlugins(...plugins: Plugin[]): this
```

Remove plugins from Flicking.

**Parameters:**

- `plugins` (`Plugin[]`) - `Plugin`

**Returns:** The current instance for method chaining

### resize

```typescript
resize(): Promise<void>
```

Update viewport and panel sizes.

**Returns:** Promise that resolves when resize is complete

**Remarks:** This method does nothing if a resize is already in progress.

**Fires:**

- [ResizeEvents](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/ResizeEvents.md)

### setStatus

```typescript
setStatus(status: Status): void
```

Restore Flicking to the state of the given [Status](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/Status.md).

**Parameters:**

- `status` (`Status`) - [Status](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/Status.md)

**Throws:**

- [StatusRestoreErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/StatusRestoreErrors.md)

### stopAnimation

since v4.10.0

```typescript
stopAnimation(): void
```

Stop the animation currently playing.

**Remarks:** This method does nothing if no animation is currently playing.

**Fires:**

- [MoveEndEvent](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MoveEndEvent.md)

### updateAnimation

since v4.10.0

```typescript
updateAnimation(index: number, duration?: number, direction?: ValueOf<typeof DIRECTION>): void
```

Change the destination and duration of the animation currently playing.

**Parameters:**

- `index` (`number`) - The index of the panel to move to

- `duration` (`number`) - Duration of the animation (unit: ms)

- `direction` (`ValueOf<typeof DIRECTION>`) - Direction to move. Only available when [circular](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#circular) is enabled

**Remarks:** This method does nothing if no animation is currently playing.

**Throws:**

- [AnimationUpdateErrors](https://naver.github.io/egjs-flicking/llm-docs/api/types/AnimationUpdateErrors.md)

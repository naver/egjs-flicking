# FlickingErrors

> Documentation interface for Flicking error codes.

## Description

This interface provides detailed documentation for each error code. Each property represents an error code with its numeric value and message signature.

## Properties

### ANIMATION_ALREADY_PLAYING

**Type:** `{
        code: 10;
        message: string;
    }`

An animation is already playing.

**Remarks:** This error occurs when trying to start a new animation while another animation is currently in progress, and the new animation is not allowed to interrupt.

Common causes:

- Calling `moveTo()` rapidly in succession

- Using `interruptable: false` option

- Programmatic navigation during user-initiated animation

**Solution:** Wait for the current animation to finish, or allow interruption by not using `interruptable: false` option.

**Example:**

```typescript
// ❌ Wrong - trying to animate while animation is in progress
flicking.next({ interruptable: false });
flicking.prev();  // Throws ANIMATION_ALREADY_PLAYING

// ✅ Correct - wait for animation to finish
await flicking.next({ interruptable: false });
await flicking.prev();

// ✅ Or check if animating
if (!flicking.animating) {
  flicking.next();
}
```

**See Also:**

- [animating](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#animating)

### ANIMATION_INTERRUPTED

**Type:** `{
        code: 9;
        message: string;
    }`

The animation was interrupted by user input.

**Remarks:** This error occurs when an ongoing animation is interrupted by user interaction (mouse/touch input) or by calling another animation method.

Common causes:

- User starts dragging during animation

- Calling `moveTo()` while previous `moveTo()` is animating

- User clicks/touches the viewport during transition

**Solution:** This is normal behavior and usually doesn't need special handling. If you need to ensure animation completes, use `interruptable: false` option or prevent user input during animation.

**Example:**

```typescript
try {
  await flicking.next();
} catch (err) {
  if (err.code === ERROR_CODE.ANIMATION_INTERRUPTED) {
    console.log("Animation was interrupted");
  }
}

// Prevent interruption with interruptable option
flicking.next({ interruptable: false });
```

**See Also:**

- [next](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#next)

- [prev](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#prev)

- [moveTo](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#moveto)

### ELEMENT_NOT_FOUND

**Type:** `{
        code: 1;
        message: (selector: string) => string;
    }`

Element is not found inside page with the given CSS selector.

**Remarks:** This error occurs during initialization when Flicking cannot find the specified element in the DOM. Common causes include:

- CSS selector doesn't match any element

- Element hasn't been rendered yet (timing issue)

- Selector syntax error

- Script runs before DOM is ready

**Solution:** Ensure the target element exists in the DOM before creating a Flicking instance. Use `DOMContentLoaded` event or place your script at the end of the body.

**Example:**

```typescript
// ❌ Wrong - element doesn't exist
new Flicking("#non-existent");

// ✅ Correct - check element exists first
if (document.querySelector("#flicking")) {
  new Flicking("#flicking");
}

// ✅ Or wait for DOM ready
document.addEventListener("DOMContentLoaded", () => {
  new Flicking("#flicking");
});
```

**See Also:**

- Flicking.constructor

### INDEX_OUT_OF_RANGE

**Type:** `{
        code: 5;
        message: (val: number, min: number, max: number) => string;
    }`

The given index is out of possible range.

**Remarks:** This error occurs when trying to access a panel with an invalid index. Common causes include:

- Index is negative

- Index is greater than or equal to panel count

- Trying to access panels when there are none

**Solution:** Ensure the index is within the valid range [0, panelCount - 1]. Check `flicking.panelCount` before accessing panels by index.

**Example:**

```typescript
const flicking = new Flicking("#flicking");

// ❌ Wrong - negative index
flicking.moveTo(-1);

// ❌ Wrong - index too large
flicking.moveTo(999);

// ✅ Correct - check valid range first
const targetIndex = 5;
if (targetIndex >= 0 && targetIndex < flicking.panelCount) {
  flicking.moveTo(targetIndex);
}
```

**See Also:**

- [moveTo](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#moveto)

- [panelCount](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#panelcount)

### NO_ACTIVE

**Type:** `{
        code: 13;
        message: string;
    }`

There is no active panel.

**Remarks:** This error occurs when trying to access or operate on the active panel, but Flicking has no panels or hasn't selected an active panel yet.

Common causes:

- Initializing Flicking with an empty container

- Removing all panels at runtime

- Accessing `currentPanel` before initialization

**Solution:** Ensure Flicking has at least one panel, or check for the existence of an active panel before accessing it.

**Example:**

```typescript
// ❌ Wrong - no panels in container
const flicking = new Flicking("#empty-flicking");
console.log(flicking.currentPanel);  // Throws NO_ACTIVE

// ✅ Correct - check panel count first
if (flicking.panelCount > 0) {
  console.log(flicking.currentPanel);
}

// ✅ Or use optional chaining
const currentIndex = flicking.currentPanel?.index ?? -1;
```

**See Also:**

- [currentPanel](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#currentpanel)

- [panelCount](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#panelcount)

### NOT_ALLOWED_IN_FRAMEWORK

**Type:** `{
        code: 11;
        message: string;
    }`

The method is not allowed in framework components.

**Remarks:** This error occurs when calling methods that manipulate the DOM directly (like `insert`, `remove`, `replace`) from framework components (React, Vue, Angular). In frameworks, DOM manipulation should be handled by the framework itself.

**Solution:** Use the framework's built-in methods to manipulate the component tree. Let the framework handle panel additions/removals through its reactive system.

**Example:**

```typescript
// ❌ Wrong - in React component
flicking.append("<div>New Panel");

// ✅ Correct - use React state
const [panels, setPanels] = useState([...]);
setPanels([...panels, newPanel]);

// Render with framework
<Flicking>
  {panels.map(panel => <div key={panel.id}>{panel.content})}
</Flicking>
```

**See Also:**

- [insert](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#insert)

- [remove](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#remove)

- `replace`

### NOT_ALLOWED_IN_VIRTUAL

**Type:** `{
        code: 14;
        message: string;
    }`

The method is not allowed when the virtual option is enabled.

**Remarks:** This error occurs when calling DOM manipulation methods (`insert`, `remove`, `replace`) while the `virtual` option is enabled. Virtual mode manages panels differently, and direct DOM manipulation would break its internal state.

**Solution:** Use Flicking's `renderPanel` callback to manage panel content in virtual mode, or disable virtual mode if you need direct DOM manipulation.

**Example:**

```typescript
const flicking = new Flicking("#flicking", {
  virtual: true
});

// ❌ Wrong - DOM manipulation in virtual mode
flicking.append("<div>New Panel");

// ✅ Correct - use renderPanel callback
const flicking = new Flicking("#flicking", {
  virtual: {
    renderPanel: (panel, index) => {
      return `<div>Panel ${index}`;
    }
  }
});
```

**See Also:**

- [insert](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#insert)

- [VirtualManager](https://naver.github.io/egjs-flicking/llm-docs/api/classes/VirtualManager.md)

### NOT_ATTACHED_TO_FLICKING

**Type:** `{
        code: 3;
        message: string;
    }`

Component is not attached to the Flicking instance.

**Remarks:** This error occurs when trying to use a Flicking component (Camera, Control, Renderer, etc.) before it has been properly initialized and attached to a Flicking instance. This is typically an internal error.

**Solution:** Ensure the component's `init()` method has been called before using it. If you're creating custom components, make sure to call `init()` after instantiation.

**Example:**

```typescript
const camera = new Camera();
// ❌ Wrong - using camera before init
camera.updateRange();

// ✅ Correct - init first
camera.init(flicking);
camera.updateRange();
```

### NOT_INITIALIZED

**Type:** `{
        code: 12;
        message: string;
    }`

Flicking is not initialized yet.

**Remarks:** This error occurs when calling methods that require Flicking to be fully initialized, before `init()` has been called or completed.

Common causes:

- Calling methods immediately after `new Flicking()` without waiting

- Using methods before async initialization completes

- Accessing Flicking instance before mount in frameworks

**Solution:** Wait for the `ready` event or ensure `init()` has completed before calling other methods.

**Example:**

```typescript
const flicking = new Flicking("#flicking");

// ❌ Wrong - calling before initialization
flicking.next();

// ✅ Correct - wait for ready event
flicking.on("ready", () => {
  flicking.next();
});

// ✅ Or use async/await
await flicking.init();
flicking.next();
```

**See Also:**

- [init](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#init)

- [ReadyEvent](https://naver.github.io/egjs-flicking/llm-docs/api/types/ReadyEvent.md)

### POSITION_NOT_REACHABLE

**Type:** `{
        code: 6;
        message: (position: number) => string;
    }`

Position parameter is out of possible range.

**Remarks:** This error occurs when trying to move the camera to an unreachable position. The valid position range depends on:

- Number of panels

- Panel sizes

- Circular mode setting

- Bound setting

**Solution:** Use `camera.range` to check the valid position range before moving. Alternatively, use index-based methods like `moveTo()` instead of position-based methods.

**Example:**

```typescript
const flicking = new Flicking("#flicking");

// ❌ Wrong - position out of range
flicking.control.moveToPosition(99999, 0);

// ✅ Correct - check range first
const { min, max } = flicking.camera.range;
const targetPos = 500;
if (targetPos >= min && targetPos <= max) {
  flicking.control.moveToPosition(targetPos, 0);
}

// ✅ Or use index-based method
flicking.moveTo(2);
```

**See Also:**

- [moveToPosition](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Control.md#movetoposition)

- [range](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md#range)

### STOP_CALLED_BY_USER

**Type:** `{
        code: 8;
        message: string;
    }`

The event's `stop()` method was called by user.

**Remarks:** This is not an actual error, but a signal that the user intentionally stopped an operation by calling `event.stop()` in an event handler. This "error" is used to halt the operation flow.

Common scenarios:

- Preventing panel change in `willChange` event

- Canceling animation in `moveStart` event

- Conditional navigation based on validation

**Solution:** This is expected behavior. Catch this error if you need to handle user-initiated cancellations differently from actual errors.

**Example:**

```typescript
flicking.on("willChange", e => {
  if (!isValidTransition(e.index)) {
    e.stop();  // This throws STOP_CALLED_BY_USER error
  }
});

try {
  await flicking.next();
} catch (err) {
  if (err.code === ERROR_CODE.STOP_CALLED_BY_USER) {
    console.log("User prevented navigation");
  }
}
```

**See Also:**

- [WillChangeEvent](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/WillChangeEvent.md)

- [WillRestoreEvent](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/WillRestoreEvent.md)

### TRANSFORM_NOT_SUPPORTED

**Type:** `{
        code: 7;
        message: string;
    }`

CSS `transform` property is not available.

**Remarks:** This error occurs when initializing Flicking in a browser that doesn't support CSS transforms (IE8 and below). Flicking requires CSS transform support to function.

**Solution:** Use a modern browser or polyfill CSS transforms. Alternatively, display a fallback message for unsupported browsers.

**Example:**

```typescript
// Check transform support before initialization
const supportsTransform = 'transform' in document.createElement('div').style;

if (supportsTransform) {
  new Flicking("#flicking");
} else {
  console.error("Your browser doesn't support CSS transforms");
}
```

### VAL_MUST_NOT_NULL

**Type:** `{
        code: 2;
        message: (val: any, name: string) => string;
    }`

Expected non-null value, but given `null` or `undefined`.

**Remarks:** This error occurs when a required parameter or property is null or undefined. Common causes include:

- Passing null/undefined to a required parameter

- Accessing a property before initialization

- Using optional chaining incorrectly

**Solution:** Ensure all required parameters have valid values before calling the method.

**Example:**

```typescript
// ❌ Wrong - passing null to required parameter
flicking.prepend(null);

// ✅ Correct
const element = document.createElement("div");
flicking.prepend(element);
```

### WRONG_OPTION

**Type:** `{
        code: 4;
        message: (optionName: string, val: any) => string;
    }`

One of the options is wrong.

**Remarks:** This error occurs when initializing Flicking with invalid option values. Common causes include:

- Value is out of valid range

- Value doesn't match expected enum/literal type

- Invalid combination of options

**Solution:** Check the documentation for the specific option and ensure the value meets all requirements (type, range, valid values, etc.).

**Example:**

```typescript
// ❌ Wrong - invalid duration value
new Flicking("#flicking", { duration: -100 });

// ✅ Correct - positive duration
new Flicking("#flicking", { duration: 500 });

// ❌ Wrong - invalid moveType
new Flicking("#flicking", { moveType: "invalid" });

// ✅ Correct - use valid moveType
new Flicking("#flicking", { moveType: "snap" });
```

**See Also:**

- [FlickingOptions](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md)

### WRONG_TYPE

**Type:** `{
        code: 0;
        message: (wrongVal: any, correctTypes: string[]) => string;
    }`

Parameter type is wrong.

**Remarks:** This error occurs when a method receives a parameter with an incorrect type. Common causes include:

- Passing a number when a string is expected

- Passing null/undefined to a required parameter

- Passing a plain object when a specific instance is needed

**Solution:** Check the method signature in the documentation and ensure you're passing the correct type for each parameter.

**Example:**

```typescript
// ❌ Wrong - passing invalid type to align option
new Flicking("#flicking", { align: 123 });

// ✅ Correct
new Flicking("#flicking", { align: "center" });
```

## See Also

- `ERROR_CODE` for usage in error handling

# Controlling Flicking

Patterns and best practices for controlling Flicking programmatically, responding to events, and handling errors.

> **Info: Framework-Specific Guides**
For detailed information on accessing methods and handling events in your framework, see:
- [React Guide](https://naver.github.io/egjs-flicking/llm-docs/guide/react-guide.md) - Using `useRef` and event handlers
- [Vue3 Guide](https://naver.github.io/egjs-flicking/llm-docs/guide/vue3-guide.md) - Using `ref` and event bindings
- [Quick Start](https://naver.github.io/egjs-flicking/llm-docs/guide/quickstart.md) - Vanilla JavaScript usage

---

## Method Patterns

Common patterns for controlling Flicking programmatically. See the [Flicking API](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md) for complete method reference.

#### Sequential Navigation

```javascript
// Navigate through panels in sequence
async function autoNavigate() {
  for (let i = 0; i < flicking.panelCount; i++) {
    await flicking.moveTo(i, 1000);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}
```

#### Conditional Navigation

```javascript
// Only move if not already at the target
async function moveToIfNeeded(targetIndex) {
  if (flicking.index !== targetIndex) {
    await flicking.moveTo(targetIndex);
  }
}
```

#### Handling Interruptions

```javascript
// Handle animation interruptions gracefully
async function safeNext() {
  try {
    await flicking.next();
    console.log("Successfully moved to next panel");
  } catch (error) {
    if (error.code === ERROR_CODE.ANIMATION_ALREADY_PLAYING) {
      console.log("Animation already in progress, skipping");
    } else if (error.code === ERROR_CODE.ANIMATION_INTERRUPTED) {
      console.log("Animation interrupted by user");
    } else {
      throw error; // Re-throw unexpected errors
    }
  }
}
```

---

## Event Patterns

Understanding Flicking's event system. See [Event Interfaces](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/ChangedEvent.md) for complete event reference.

### Event Timeline

Understanding when events fire is crucial for building responsive UIs. Here's the complete timeline of events during user interaction:

```
User starts dragging
  ↓
[holdStart] ← Touch/mouse down
  ↓
[moveStart] ← Movement begins
  ↓
[move] ← Continuously fired during movement
  ↓
[willChange] ← BEFORE panel index changes (cancellable)
  ↓
[changed] ← AFTER panel index changes
  ↓
[moveEnd] ← Movement animation ends
  ↓
[holdEnd] ← Touch/mouse up
```

---

### Key Events

**Panel Change Events**
- [`willChange`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/WillChangeEvent.md) - Fired BEFORE panel changes (cancellable with `e.stop()`)
- [`changed`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/ChangedEvent.md) - Fired AFTER panel changes

**Movement Events**
- [`moveStart`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MoveStartEvent.md) - Animation starts
- [`move`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MoveEvent.md) - Continuously fired during movement
- [`moveEnd`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/MoveEndEvent.md) - Animation ends

**User Input Events**
- [`holdStart`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/HoldStartEvent.md) / [`holdEnd`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/HoldEndEvent.md) - Touch/click events
- [`select`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/SelectEvent.md) - Panel clicked/tapped

**Other Events**
- `ready` - Flicking initialized
- [`needPanel`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/NeedPanelEvent.md) - For lazy loading
- [`visibleChange`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/VisibleChangeEvent.md) - Visible panels changed

---

### Event Usage Patterns

#### Syncing Multiple Flicking Instances

```javascript
const flicking1 = new Flicking("#carousel1");
const flicking2 = new Flicking("#carousel2");

flicking1.on(EVENTS.CHANGED, (e) => {
  flicking2.moveTo(e.index);
});

flicking2.on(EVENTS.CHANGED, (e) => {
  flicking1.moveTo(e.index);
});
```

#### Progress Tracking

```javascript
let startPosition = 0;

flicking.on(EVENTS.MOVE_START, (e) => {
  startPosition = e.axesEvent.pos.flick;
});

flicking.on(EVENTS.MOVE, (e) => {
  const currentPosition = e.axesEvent.pos.flick;
  const distance = currentPosition - startPosition;
  console.log("Dragged distance:", distance);
});
```

#### Conditional Panel Change

```javascript
flicking.on(EVENTS.WILL_CHANGE, (e) => {
  // Require minimum drag distance
  if (Math.abs(e.axesEvent.delta.flick) < 50) {
    e.stop();
    console.log("Drag distance too small, preventing change");
  }
});
```

---

## Error Handling Patterns

Flicking throws [`FlickingError`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/FlickingError.md) instances with `ERROR_CODE` constants. See [FlickingError API](https://naver.github.io/egjs-flicking/llm-docs/api/classes/FlickingError.md) for complete error reference.

#### Graceful Degradation

```javascript
async function safeNavigation(targetIndex) {
  try {
    await flicking.moveTo(targetIndex);
    return true;
  } catch (err) {
    if (err instanceof FlickingError) {
      switch (err.code) {
        case ERROR_CODE.ANIMATION_ALREADY_PLAYING:
          // Queue the action for later
          setTimeout(() => safeNavigation(targetIndex), 300);
          return false;

        case ERROR_CODE.INDEX_OUT_OF_RANGE:
          console.warn("Invalid index, moving to first panel");
          await flicking.moveTo(0);
          return false;

        case ERROR_CODE.ANIMATION_INTERRUPTED:
          // User interrupted, that's okay
          return false;

        default:
          throw err;
      }
    }
    throw err;
  }
}
```

---

#### Debounced Navigation

```javascript
let navigationTimeout = null;

function debouncedNext() {
  if (navigationTimeout) {
    clearTimeout(navigationTimeout);
  }

  navigationTimeout = setTimeout(async () => {
    try {
      await flicking.next();
    } catch (err) {
      if (err instanceof FlickingError &&
          err.code === ERROR_CODE.ANIMATION_ALREADY_PLAYING) {
        // Retry after animation completes
        debouncedNext();
      }
    }
  }, 100);
}
```

---

#### User-Friendly Error Messages

```javascript
function getUserFriendlyMessage(error) {
  if (!(error instanceof FlickingError)) {
    return "An unexpected error occurred";
  }

  switch (error.code) {
    case ERROR_CODE.ANIMATION_ALREADY_PLAYING:
      return "Please wait for the current animation to complete";

    case ERROR_CODE.INDEX_OUT_OF_RANGE:
      return "The requested panel does not exist";

    case ERROR_CODE.ANIMATION_INTERRUPTED:
      return "Navigation was interrupted";

    case ERROR_CODE.NO_ACTIVE:
      return "No panels available";

    default:
      return error.message;
  }
}

// Usage
try {
  await flicking.moveTo(targetIndex);
} catch (err) {
  showToast(getUserFriendlyMessage(err));
}
```

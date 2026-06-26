# MovementErrors

> Error codes that may be thrown during panel movement operations.

## Description

These errors can occur when using navigation methods like [prev](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#prev), [next](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#next), or [moveTo](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#moveto).

Common scenarios:

- `NOT_INITIALIZED`: Attempting to navigate before Flicking is ready

- `INDEX_OUT_OF_RANGE`: Target panel index doesn't exist

- `POSITION_NOT_REACHABLE`: Target camera position is invalid

- `ANIMATION_INTERRUPTED`: User interaction during animation

- `ANIMATION_ALREADY_PLAYING`: Starting new animation while one is in progress

- `STOP_CALLED_BY_USER`: User prevented navigation via `event.stop()`

- `NO_ACTIVE`: No panels available to navigate

## Type

```typescript
type MovementErrors = typeof ERROR_CODE.NOT_INITIALIZED | typeof ERROR_CODE.INDEX_OUT_OF_RANGE | typeof ERROR_CODE.POSITION_NOT_REACHABLE | typeof ERROR_CODE.ANIMATION_INTERRUPTED | typeof ERROR_CODE.ANIMATION_ALREADY_PLAYING | typeof ERROR_CODE.STOP_CALLED_BY_USER | typeof ERROR_CODE.NO_ACTIVE
```

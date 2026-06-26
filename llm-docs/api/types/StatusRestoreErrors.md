# StatusRestoreErrors

> Error codes that may be thrown when restoring Flicking status.

## Description

These errors can occur when using [setStatus](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#setstatus) to restore a previously saved status (from [getStatus](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#getstatus)).

Common scenarios:

- `NOT_INITIALIZED`: Attempting to restore before initialization

- `INDEX_OUT_OF_RANGE`: Saved status references non-existent panel

- `POSITION_NOT_REACHABLE`: Saved position is no longer valid

## Type

```typescript
type StatusRestoreErrors = typeof ERROR_CODE.NOT_INITIALIZED | typeof ERROR_CODE.INDEX_OUT_OF_RANGE | typeof ERROR_CODE.POSITION_NOT_REACHABLE
```

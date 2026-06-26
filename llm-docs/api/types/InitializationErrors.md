# InitializationErrors

> Error codes that may be thrown during Flicking initialization.

## Description

These errors can occur when creating a new Flicking instance or calling [init](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#init).

Common scenarios:

- `ELEMENT_NOT_FOUND`: Viewport element doesn't exist in DOM

- `WRONG_OPTION`: Invalid configuration option value

- `TRANSFORM_NOT_SUPPORTED`: Browser doesn't support CSS transforms (IE8 and below)

## Type

```typescript
type InitializationErrors = typeof ERROR_CODE.ELEMENT_NOT_FOUND | typeof ERROR_CODE.WRONG_OPTION | typeof ERROR_CODE.TRANSFORM_NOT_SUPPORTED
```

# DOMManipulationErrors

> Error codes that may be thrown when manipulating the DOM.

## Description

These errors can occur when using DOM manipulation methods like [insert](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#insert), [append](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#append), [prepend](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#prepend), `replace`, or [remove](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#remove).

Common scenarios:

- `NOT_ATTACHED_TO_FLICKING`: Component not properly initialized

- `ELEMENT_NOT_FOUND`: Invalid CSS selector or element doesn't exist

- `VAL_MUST_NOT_NULL`: Required parameter is null/undefined

- `WRONG_TYPE`: Invalid parameter type

- `INDEX_OUT_OF_RANGE`: Target index doesn't exist

- `NOT_ALLOWED_IN_FRAMEWORK`: Using DOM methods in React/Vue/Angular

- `NOT_ALLOWED_IN_VIRTUAL`: Using DOM methods with virtual mode enabled

## Type

```typescript
type DOMManipulationErrors = typeof ERROR_CODE.NOT_ATTACHED_TO_FLICKING | typeof ERROR_CODE.ELEMENT_NOT_FOUND | typeof ERROR_CODE.VAL_MUST_NOT_NULL | typeof ERROR_CODE.WRONG_TYPE | typeof ERROR_CODE.INDEX_OUT_OF_RANGE | typeof ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK | typeof ERROR_CODE.NOT_ALLOWED_IN_VIRTUAL
```

# parseSanitizedElement

> Parse an HTML string into elements with sanitization, used by [setStatus](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#setstatus) to restore panels from a serialized `html` string. The string is parsed inside a `<template>` (an inert document, so no script runs and no resource loads), event-handler attributes and script-capable elements are stripped, and the result is imported — neutralizing a mutation-XSS payload revived by the `outerHTML`→`innerHTML` round-trip.

## Signature

```typescript
parseSanitizedElement: (html: string) => HTMLElement[]
```

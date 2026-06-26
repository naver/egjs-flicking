# FlickingError

> Special type of known error that [Flicking](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md) throws.

## Description

see [FlickingErrors](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingErrors.md) for possible error codes and explantaion

## Constructor

```typescript
constructor(message: string, code: number);
```

Constructs a new instance of the `FlickingError` class

### Parameters

**`message`** (`string`) - Error message

**`code`** (`number`) - Error code

## Properties

### code

**Type:** `number`

## Examples

```typescript
import Flicking, { FlickingError, ERROR_CODES } from "@egjs/flicking";
try {
  const flicking = new Flicking(".flicking-viewport")
} catch (e) {
  if (e instanceof FlickingError && e.code === ERROR_CODES.ELEMENT_NOT_FOUND) {
    console.error(e.message)
  }
}
```

# CODE

> Error codes of [FlickingError](https://naver.github.io/egjs-flicking/llm-docs/api/classes/FlickingError.md).

## Description

Each error code represents a specific error condition that can occur during Flicking's lifecycle. Use these codes to identify and handle errors programmatically.

For detailed documentation of each error code, see [FlickingErrors](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingErrors.md).

## Type

```typescript
{
    WRONG_TYPE: 0;
    ELEMENT_NOT_FOUND: 1;
    VAL_MUST_NOT_NULL: 2;
    NOT_ATTACHED_TO_FLICKING: 3;
    WRONG_OPTION: 4;
    INDEX_OUT_OF_RANGE: 5;
    POSITION_NOT_REACHABLE: 6;
    TRANSFORM_NOT_SUPPORTED: 7;
    STOP_CALLED_BY_USER: 8;
    ANIMATION_INTERRUPTED: 9;
    ANIMATION_ALREADY_PLAYING: 10;
    NOT_ALLOWED_IN_FRAMEWORK: 11;
    NOT_INITIALIZED: 12;
    NO_ACTIVE: 13;
    NOT_ALLOWED_IN_VIRTUAL: 14;
}
```

## Examples

```typescript
import {FlickingError, ERROR_CODE} from "@egjs/flicking";

try {
  flicking.moveTo(999);
} catch (err) {
  if (err instancof FlickingError && err.code === ERROR_CODE.INDEX_OUT_OF_RANGE) {
    console.log(err.message);
  }
}
```

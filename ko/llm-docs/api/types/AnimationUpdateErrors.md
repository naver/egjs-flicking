# AnimationUpdateErrors

> Error codes that may be thrown during animation updates.

## Description

These errors can occur when calling [update](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/Plugin_2.md#update) to manually update the animation state.

Common scenarios:

- `NOT_INITIALIZED`: Calling update before Flicking is ready

- `ANIMATION_INTERRUPTED`: User interrupted the animation during update

## Type

```typescript
type AnimationUpdateErrors = typeof ERROR_CODE.NOT_INITIALIZED | typeof ERROR_CODE.ANIMATION_INTERRUPTED
```

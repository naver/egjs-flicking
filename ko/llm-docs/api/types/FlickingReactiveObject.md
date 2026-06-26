# FlickingReactiveObject

> Reactive object type that combines state and methods for Flicking

## Description

This type provides reactive state properties and methods that automatically update when the Flicking instance state changes.

## Type

```typescript
type FlickingReactiveObject = ReactiveObject<FlickingReactiveState & FlickingReactiveMethod>
```

## Examples

```typescript
const flickingRef = React.useRef(null);
  const {
    progress
  } = useFlickingReactiveAPI(flickingRef);
```

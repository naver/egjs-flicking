# connectFlickingReactiveAPI

> Connect Flicking instance to reactive API

## Signature

```typescript
connectFlickingReactiveAPI: (flicking: Flicking, options?: FlickingReactiveAPIOptions | undefined) => FlickingReactiveObject
```

## Parameters

**`flicking`** (`Flicking`) - Flicking instance to connect

**`options`** (`FlickingReactiveAPIOptions | undefined`) - Flicking options

## Returns

Reactive object with Flicking state and methods

## Examples

```typescript
import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";

const flicking = new Flicking("#el");
const reactiveObj = connectFlickingReactiveAPI(flicking);

// Access reactive state
console.log("Current panel:", reactiveObj.currentPanelIndex);
console.log("Progress:", reactiveObj.progress + "%");
console.log("Is at start:", reactiveObj.isReachStart);
console.log("Is at end:", reactiveObj.isReachEnd);
console.log("Total panels:", reactiveObj.totalPanelCount);
console.log("Index progress:", reactiveObj.indexProgress);

// Subscribe to state changes
reactiveObj.subscribe("currentPanelIndex", (nextValue) => {
  console.log("Panel changed to:", nextValue);
});

// Use reactive methods
reactiveObj.moveTo(2); // Move to third panel
```

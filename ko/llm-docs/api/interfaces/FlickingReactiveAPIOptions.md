# FlickingReactiveAPIOptions

> Options for Flicking reactive API that help optimize initial rendering in SSR scenarios

## Description

These options allow you to set initial state values before the Flicking instance is fully initialized, preventing unnecessary re-renders when the actual Flicking state is applied.

## Properties

### defaultIndex

**Type:** `number`

Initial panel index to start with. This sets the currentPanelIndex and indexProgress initial values.

**Default:** `0`

**Remarks:** Also affects isReachStart and isReachEnd initial value setting.

*This property is optional.*

### totalPanelCount

**Type:** `number`

Total number of panels in the Flicking instance. This sets the totalPanelCount initial value

**Default:** `0`

**Remarks:** Helps prevent layout shifts during SSR hydration.

*This property is optional.*

## Examples

```typescript
const options = {
  defaultIndex: 2,
  totalPanelCount: 5
};
const reactiveObj = connectFlickingReactiveAPI(flicking, options);
```

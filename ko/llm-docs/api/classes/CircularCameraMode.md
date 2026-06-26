# CircularCameraMode

> A [Camera](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md) mode that connects the last panel and the first panel, enabling continuous loop

## Methods

### canReach

```typescript
canReach(panel: Panel): boolean
```

### canSee

```typescript
canSee(panel: Panel): boolean
```

### checkAvailability

```typescript
checkAvailability(): boolean
```

### clampToReachablePosition

```typescript
clampToReachablePosition(position: number): number
```

### findAnchorIncludePosition

```typescript
findAnchorIncludePosition(position: number): AnchorPoint | null
```

### findNearestAnchor

```typescript
findNearestAnchor(position: number): AnchorPoint | null
```

### getAnchors

```typescript
getAnchors(): AnchorPoint[]
```

### getCircularOffset

```typescript
getCircularOffset(): number
```

### getRange

```typescript
getRange(): CameraRange
```

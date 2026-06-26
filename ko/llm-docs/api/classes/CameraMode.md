# CameraMode

> A mode of camera

## Constructor

```typescript
constructor(flicking: Flicking);
```

Constructs a new instance of the `CameraMode` class

## Properties

### _flicking

**Type:** `Flicking`

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
abstract checkAvailability(): boolean
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
abstract getRange(): CameraRange
```

# CrossFlicking

since v4.12.0

> A preset for cross-directional carousel that combines horizontal and vertical Flicking instances

## Constructor

```typescript
constructor(root: HTMLElement | string, options: Partial<CrossFlickingOptions>);
```

Constructs a new instance of the `CrossFlicking` class

## Properties

### disableIndexSync

**Type:** `CrossFlickingOptions["disableIndexSync"]`

### disableSlideOnHold

**Type:** `CrossFlickingOptions["disableSlideOnHold"]`

### preserveIndex

**Type:** `CrossFlickingOptions["preserveIndex"]`

### sideFlicking

**Type:** `Flicking[]`

*This property is read-only.*

### sideIndex

**Type:** `number[]`

*This property is read-only.*

### sideOptions

**Type:** `CrossFlickingOptions["sideOptions"]`

### sideState

**Type:** `SideState[]`

*This property is read-only.*

## Methods

### destroy

```typescript
destroy(): void
```

### init

```typescript
init(): Promise<void>
```

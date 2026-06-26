# NormalRenderingStrategy

## Constructor

```typescript
constructor(options: NormalRenderingStrategyOptions);
```

Constructs a new instance of the `NormalRenderingStrategy` class

## Methods

### collectPanels

```typescript
collectPanels(flicking: Flicking, elements: any[]): Panel[]
```

### createPanel

```typescript
createPanel(element: any, options: Omit<PanelOptions, "elementProvider">): Panel
```

### getRenderingElementsByOrder

```typescript
getRenderingElementsByOrder(flicking: Flicking): HTMLElement[]
```

### getRenderingIndexesByOrder

```typescript
getRenderingIndexesByOrder(flicking: Flicking): number[]
```

### renderPanels

```typescript
renderPanels(): void
```

### updatePanelSizes

```typescript
updatePanelSizes(flicking: Flicking, size: Partial<{
        width: number | string;
        height: number | string;
    }>): void
```

### updateRenderingPanels

```typescript
updateRenderingPanels(flicking: Flicking): void
```

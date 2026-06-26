# VirtualRenderingStrategy

## Methods

### collectPanels

```typescript
collectPanels(flicking: Flicking): VirtualPanel[]
```

### createPanel

```typescript
createPanel(_el: any, options: PanelOptions): VirtualPanel
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
renderPanels(flicking: Flicking): void
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

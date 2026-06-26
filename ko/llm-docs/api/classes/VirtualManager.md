# VirtualManager

> A manager class to add / remove virtual panels

## Constructor

```typescript
constructor(flicking: Flicking, options: VirtualOptions | null);
```

Constructs a new instance of the `VirtualManager` class

## Properties

### cache

**Type:** `boolean`

Whether to cache rendered panel's innerHTML

**Default:** `false`

### elements

**Type:** `{
        nativeElement: HTMLElement;
        visible: boolean;
    }[]`

*This property is read-only.*

### initialPanelCount

**Type:** `number`

Initial panel count to render

**Default:** `-1`

*This property is read-only.*

### panelClass

**Type:** `string`

The class name that will be applied to rendered panel elements

**Default:** `"flicking-panel"`

### renderPanel

**Type:** `PanelRenderCallback`

A rendering function for the panel element's innerHTML

## Methods

### append

```typescript
append(count?: number): VirtualPanel[]
```

Add new virtual panels at the end of the list

**Parameters:**

- `count` (`number`) - The number of panels to add

**Returns:** The new panels added

### hide

```typescript
hide(index: number): void
```

### init

```typescript
init(): void
```

### insert

```typescript
insert(index: number, count?: number): VirtualPanel[]
```

Add new virtual panels at the given index

**Parameters:**

- `index` (`number`) - 

- `count` (`number`) - The number of panels to add

**Returns:** The new panels added

### prepend

```typescript
prepend(count?: number): VirtualPanel[]
```

Add new virtual panels at the start of the list

**Parameters:**

- `count` (`number`) - The number of panels to add

**Returns:** The new panels added

### remove

```typescript
remove(index: number, count: number): VirtualPanel[]
```

Remove panels at the given index

**Parameters:**

- `index` (`number`) - 

- `count` (`number`) - The number of panels to remove

**Returns:** The panels removed

### show

```typescript
show(index: number): void
```

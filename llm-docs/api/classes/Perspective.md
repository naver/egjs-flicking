# Perspective

> A plugin to apply 3D perspective effect while panels are moving

**See Also:**

- [Demo: Perspective](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/perspective.md)

## Constructor

```typescript
constructor(options?: Partial<PerspectiveOptions>);
```

Constructs a new instance of the `Perspective` class

### Parameters

**`options`** (`Partial<PerspectiveOptions>`) - Options for the Perspective instance

### Examples

```typescript
flicking.addPlugins(new Perspective({ selector: "p", scale: 1, rotate: 1, perspective: 1000 }));
```

## Options

### perspective

**Type:** `number`

The value of the CSS `perspective` property (px)

**Default:** `1000`

### rotate

**Type:** `number`

Rotation amplification scale

**Default:** `1`

### scale

**Type:** `number`

Effect amplification scale

**Default:** `1`

### selector

**Type:** `string`

CSS selector for the element to apply the perspective effect. If empty, the panel element itself is used

**Default:** `""`

## Properties

### perspective

**Type:** `number`

Current value of the [perspective](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Perspective.md#perspective) option.

### rotate

**Type:** `number`

Current value of the [rotate](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Perspective.md#rotate) option.

### scale

**Type:** `number`

Current value of the [scale](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Perspective.md#scale) option.

### selector

**Type:** `string`

Current value of the [selector](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Perspective.md#selector) option.

### update

**Type:** `() => void`

Recalculate and apply the perspective effect to all visible panels.

## Methods

### destroy

```typescript
destroy(): void
```

Destroy the plugin and remove all event listeners.

### init

```typescript
init(flicking: Flicking): void
```

Initialize the plugin and apply the perspective effect to the Flicking instance.

**Parameters:**

- `flicking` (`Flicking`) - The Flicking instance to attach this plugin to

# Fade

> A plugin to apply fade in/out effect while panels are moving

**See Also:**

- [Demo: Fade](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/fade.md)

## Constructor

```typescript
constructor(selector?: string, scale?: number);
```

Constructs a new instance of the `Fade` class

### Parameters

**`selector`** (`string`) - CSS selector for the element to apply the fade effect. If empty, the panel element itself is used

**`scale`** (`number`) - Effect amplification scale

### Examples

```typescript
flicking.addPlugins(new Fade("p", 1));
```

## Properties

### scale

**Type:** `number`

Effect amplification scale

*This property is read-only.*

### selector

**Type:** `string`

CSS selector for the element to apply the fade effect. If empty, the panel element itself is used

*This property is read-only.*

### update

**Type:** `() => void`

Recalculate and apply the fade effect to all visible panels.

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

Initialize the plugin and apply the fade effect to the Flicking instance.

**Parameters:**

- `flicking` (`Flicking`) - The Flicking instance to attach this plugin to

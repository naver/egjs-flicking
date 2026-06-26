# AutoPlay

> Plugin that allows you to automatically move to the next/previous panel on a specific time basis

**See Also:**

- [Demo: AutoPlay](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/autoplay.md)

## Constructor

```typescript
constructor(options?: Partial<AutoPlayOptions>);
```

Constructs a new instance of the `AutoPlay` class

### Parameters

**`options`** (`Partial<AutoPlayOptions>`) - Options for the AutoPlay instance

### Examples

```typescript
flicking.addPlugins(new AutoPlay({ duration: 2000, direction: "NEXT" }));
```

## Options

### animationDuration

**Type:** `number | undefined`

Duration of the panel move animation (ms). If `undefined`, the Flicking instance's `duration` is used

**Default:** `undefined`

### delayAfterHover

**Type:** `number`

If `stopOnHover` is true, time to wait before resuming after mouse leaves (ms)

**Default:** `Same as `duration``

### direction

**Type:** `(typeof DIRECTION)["NEXT"] | (typeof DIRECTION)["PREV"]`

The direction in which the panel moves

**Default:** `"NEXT"`

### duration

**Type:** `number`

Time to wait before moving on to the next panel (ms)

**Default:** `2000`

### stopOnHover

**Type:** `boolean`

Whether to stop when the mouse hovers over the element

**Default:** `false`

### stopOnInit

**Type:** `boolean`

Whether to stop autoplay when the plugin is first initialized

**Default:** `false`

## Properties

### animationDuration

**Type:** `number | undefined`

Current value of the [animationDuration](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AutoPlay.md#animationduration) option.

### delayAfterHover

**Type:** `number`

Current value of the [delayAfterHover](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AutoPlay.md#delayafterhover) option.

### direction

**Type:** `AutoPlayOptions["direction"]`

Current value of the [direction](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AutoPlay.md#direction) option.

### duration

**Type:** `number`

Current value of the [duration](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AutoPlay.md#duration) option.

### play

**Type:** `() => void`

Start the autoplay timer. Panels will move automatically after the configured [duration](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AutoPlay.md#duration).

### playing

**Type:** `boolean`

Whether the autoplay is currently active

*This property is read-only.*

### stop

**Type:** `() => void`

Stop the autoplay timer and cancel any pending panel movement.

### stopOnHover

**Type:** `boolean`

Current value of the [stopOnHover](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AutoPlay.md#stoponhover) option.

### stopOnInit

**Type:** `boolean`

Current value of the [stopOnInit](https://naver.github.io/egjs-flicking/llm-docs/api/classes/AutoPlay.md#stoponinit) option.

## Methods

### destroy

```typescript
destroy(): void
```

Destroy the plugin, stop autoplay, and remove all event listeners.

### init

```typescript
init(flicking: Flicking): void
```

Initialize the plugin and start autoplay on the given Flicking instance.

**Parameters:**

- `flicking` (`Flicking`) - The Flicking instance to attach this plugin to

### update

```typescript
update(): void
```

Update the plugin state. This is a no-op for AutoPlay.

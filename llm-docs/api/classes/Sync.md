# Sync

> Plugin for synchronizing multiple Flicking instances

**See Also:**

- [Demo: Sync](https://naver.github.io/egjs-flicking/llm-docs/demos/plugins/sync.md)

## Constructor

```typescript
constructor(options?: Partial<SyncOptions>);
```

Constructs a new instance of the `Sync` class

### Parameters

**`options`** (`Partial<SyncOptions>`) - Options for the Sync instance

### Examples

```typescript
flicking.addPlugins(new Sync({
  type: "camera",
  synchronizedFlickingOptions: [
    { flicking: flicking1 },
    { flicking: flicking2, isClickable: true }
  ]
}));
```

## Options

### synchronizedFlickingOptions

**Type:** `SychronizableFlickingOptions[]`

Detailed options for each Flicking instance to synchronize

**Default:** `[]`

### type

**Type:** `typeof SYNC.TYPE.CAMERA | typeof SYNC.TYPE.INDEX`

Method to synchronize between Flickings. `"camera"` syncs by camera position, `"index"` syncs by panel index

**Default:** `"camera"`

## Properties

### synchronizedFlickingOptions

**Type:** `SyncOptions["synchronizedFlickingOptions"]`

Current value of the [synchronizedFlickingOptions](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Sync.md#synchronizedflickingoptions) option.

### type

**Type:** `SyncOptions["type"]`

Current value of the SyncOptions.type | type option.

## Methods

### destroy

```typescript
destroy(): void
```

Destroy the plugin and remove all synchronization event listeners.

### init

```typescript
init(flicking: Flicking): void
```

Initialize the plugin and set up synchronization event listeners between Flicking instances.

**Parameters:**

- `flicking` (`Flicking`) - The Flicking instance to attach this plugin to

### update

```typescript
update(): void
```

Update the active class state for all synchronized Flicking instances.

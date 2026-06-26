# SychronizableFlickingOptions

> Per-instance synchronization options used in [synchronizedFlickingOptions](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Sync.md#synchronizedflickingoptions)

## Properties

### activeClass

**Type:** `string`

CSS class added to the active (selected) panel

**Default:** `undefined`

*This property is optional.*

### flicking

**Type:** `Flicking`

The Flicking instance to synchronize

### isClickable

**Type:** `boolean`

Whether clicking this Flicking's panel changes the index of all synced Flickings

**Default:** `false`

*This property is optional.*

### isSlidable

**Type:** `boolean`

Whether mouse/touch scroll on this Flicking changes other Flickings' index. Only available for the `"index"` type

**Default:** `false`

*This property is optional.*

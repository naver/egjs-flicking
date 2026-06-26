# GetStatusParams

> Parameters for [getStatus](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#getstatus)

## Properties

### includePanelHTML

**Type:** `boolean`

Include panel's `outerHTML`

**Default:** `false`

*This property is optional.*

### index

**Type:** `boolean`

Include current panel index

**Default:** `true`

*This property is optional.*

### position

**Type:** `boolean`

Include camera position. Only works when [moveType](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/FlickingOptions.md#movetype) is `freeScroll`

**Default:** `true`

*This property is optional.*

### visiblePanelsOnly

**Type:** `boolean`

Include only visible panels' HTML. Only available when `includePanelHTML` is `true`

**Default:** `false`

*This property is optional.*

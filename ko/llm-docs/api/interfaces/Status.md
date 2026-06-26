# Status

> Flicking Status returned by [getStatus](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#getstatus)

## Properties

### index

**Type:** `number`

An index of the active panel

*This property is optional.*

### panels

**Type:** `Array<{
        index: number;
        html?: string;
    }>`

A data array of panels

### position

**Type:** `{
        panel: number;
        progressInPanel: number;
    }`

A info to restore camera [position](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Camera.md#position)

*This property is optional.*

### visibleOffset

**Type:** `number`

An offset to visible panel's original index. This value is available only when `visiblePanelsOnly` is `true`

*This property is optional.*

# NeedPanelEvent

> Event that fires when an empty panel area is visible at the edge of viewport

## Description

You can set its threshold with [needPanelThreshold](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#needpanelthreshold)

## Properties

### direction

**Type:** `Exclude<ValueOf<typeof DIRECTION>, null>`

Direction where new panel is needed. `DIRECTION.PREV` means panels should be [prepend](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#prepend)ed and `DIRECTION.NEXT` means panels should be [append](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#append)ed

# EVENTS

> Event type object with event name strings of [Flicking](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md)

## Type

```typescript
{
    readonly READY: "ready";
    readonly BEFORE_RESIZE: "beforeResize";
    readonly AFTER_RESIZE: "afterResize";
    readonly HOLD_START: "holdStart";
    readonly HOLD_END: "holdEnd";
    readonly MOVE_START: "moveStart";
    readonly MOVE: "move";
    readonly MOVE_END: "moveEnd";
    readonly WILL_CHANGE: "willChange";
    readonly CHANGED: "changed";
    readonly WILL_RESTORE: "willRestore";
    readonly RESTORED: "restored";
    readonly SELECT: "select";
    readonly NEED_PANEL: "needPanel";
    readonly VISIBLE_CHANGE: "visibleChange";
    readonly REACH_EDGE: "reachEdge";
    readonly PANEL_CHANGE: "panelChange";
}
```

## Examples

```typescript
import { EVENTS } from "@egjs/flicking";
EVENTS.MOVE_START; // "moveStart"
```

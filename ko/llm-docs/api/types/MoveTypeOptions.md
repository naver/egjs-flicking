# MoveTypeOptions

## Type

```typescript
type MoveTypeOptions = T extends typeof MOVE_TYPE.SNAP ? [T] | [T, Partial<SnapControlOptions>] : T extends typeof MOVE_TYPE.FREE_SCROLL ? [T] | [T, Partial<FreeControlOptions>] : T extends typeof MOVE_TYPE.STRICT ? [T] | [T, Partial<StrictControlOptions>] : [T]
```

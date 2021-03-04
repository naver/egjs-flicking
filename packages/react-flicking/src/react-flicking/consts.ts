import { ChangeEvent, HoldEndEvent, HoldStartEvent, MoveEndEvent, MoveEvent, MoveStartEvent, NeedPanelEvent, RestoreEvent, SelectEvent, VisibleChangeEvent } from "../../../../src";
import { FlickingProps } from "./types";

export const FLICKING_PROPS: FlickingProps = {
  tag: "div",
  viewportTag: "div",
  cameraTag: "div",
  classPrefix: "eg-flick",
  plugins: [],
  onNeedPanel: (e: NeedPanelEvent) => {},
  onMoveStart: (e: MoveStartEvent) => {},
  onMove: (e: MoveEvent) => {},
  onMoveEnd: (e: MoveEndEvent) => {},
  onHoldStart: (e: HoldStartEvent) => {},
  onHoldEnd: (e: HoldEndEvent) => {},
  onChange: (e: ChangeEvent) => {},
  onRestore: (e: RestoreEvent) => {},
  onSelect: (e: SelectEvent) => {},
  onVisibleChange: (e: VisibleChangeEvent) => {},
};

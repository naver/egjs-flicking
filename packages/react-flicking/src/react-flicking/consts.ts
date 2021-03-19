import { AfterResizeEvent, BeforeResizeEvent, ChangeEvent, HoldEndEvent, HoldStartEvent, MoveEndEvent, MoveEvent, MoveStartEvent, NeedPanelEvent, ReachEdgeEvent, ReadyEvent, RestoreEvent, SelectEvent, VisibleChangeEvent } from "@egjs/flicking";
import { FlickingProps } from "./types";

export const DEFAULT_PROPS: FlickingProps = {
  viewportTag: "div",
  cameraTag: "div",
  classPrefix: "eg-flick",
  plugins: [],
  onReady: (e: ReadyEvent) => {},
  onBeforeResize: (e: BeforeResizeEvent) => {},
  onAfterResize: (e: AfterResizeEvent) => {},
  onHoldStart: (e: HoldStartEvent) => {},
  onHoldEnd: (e: HoldEndEvent) => {},
  onMoveStart: (e: MoveStartEvent) => {},
  onMove: (e: MoveEvent) => {},
  onMoveEnd: (e: MoveEndEvent) => {},
  onChange: (e: ChangeEvent) => {},
  onRestore: (e: RestoreEvent) => {},
  onSelect: (e: SelectEvent) => {},
  onNeedPanel: (e: NeedPanelEvent) => {},
  onVisibleChange: (e: VisibleChangeEvent) => {},
  onReachEdge: (e: ReachEdgeEvent) => {}
};

import {
  ChangeEvent,
  SelectEvent,
  NeedPanelEvent,
  VisibleChangeEvent,
  HoldStartEvent,
  HoldEndEvent,
  MoveStartEvent,
  MoveEvent,
  MoveEndEvent,
  RestoreEvent,
  ReadyEvent,
  BeforeResizeEvent,
  AfterResizeEvent,
  ReachEdgeEvent
} from "@egjs/flicking";

export interface FlickingProps {
  viewportTag: keyof JSX.IntrinsicElements;
  cameraTag: keyof JSX.IntrinsicElements;
  plugins: any[];
  onReady: (e: ReadyEvent) => any;
  onBeforeResize: (e: BeforeResizeEvent) => any;
  onAfterResize: (e: AfterResizeEvent) => any;
  onHoldStart: (e: HoldStartEvent) => any;
  onHoldEnd: (e: HoldEndEvent) => any;
  onMoveStart: (e: MoveStartEvent) => any;
  onMove: (e: MoveEvent) => any;
  onMoveEnd: (e: MoveEndEvent) => any;
  onChange: (e: ChangeEvent) => any;
  onRestore: (e: RestoreEvent) => any;
  onSelect: (e: SelectEvent) => any;
  onNeedPanel: (e: NeedPanelEvent) => any;
  onVisibleChange: (e: VisibleChangeEvent) => any;
  onReachEdge: (e: ReachEdgeEvent) => any;
  [key: string]: any;
}

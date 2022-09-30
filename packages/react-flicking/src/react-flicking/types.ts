/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ReactFlicking from "./Flicking";
import {
  SelectEvent,
  NeedPanelEvent,
  VisibleChangeEvent,
  HoldStartEvent,
  HoldEndEvent,
  MoveStartEvent,
  MoveEvent,
  MoveEndEvent,
  WillChangeEvent,
  ChangedEvent,
  WillRestoreEvent,
  RestoredEvent,
  ReadyEvent,
  BeforeResizeEvent,
  AfterResizeEvent,
  ReachEdgeEvent,
  PanelChangeEvent,
  Plugin,
  Status
} from "@egjs/flicking";

export interface FlickingProps {
  viewportTag: keyof JSX.IntrinsicElements;
  cameraTag: keyof JSX.IntrinsicElements;
  cameraClass: string;
  renderOnSameKey: boolean;
  plugins: Plugin[];
  status?: Status;
  useFindDOMNode: boolean;
  hideBeforeInit: boolean;
  firstPanelSize?: string;
  onReady: (e: ReadyEvent<ReactFlicking>) => any;
  onBeforeResize: (e: BeforeResizeEvent<ReactFlicking>) => any;
  onAfterResize: (e: AfterResizeEvent<ReactFlicking>) => any;
  onHoldStart: (e: HoldStartEvent<ReactFlicking>) => any;
  onHoldEnd: (e: HoldEndEvent<ReactFlicking>) => any;
  onMoveStart: (e: MoveStartEvent<ReactFlicking>) => any;
  onMove: (e: MoveEvent<ReactFlicking>) => any;
  onMoveEnd: (e: MoveEndEvent<ReactFlicking>) => any;
  onWillChange: (e: WillChangeEvent<ReactFlicking>) => any;
  onChanged: (e: ChangedEvent<ReactFlicking>) => any;
  onWillRestore: (e: WillRestoreEvent<ReactFlicking>) => any;
  onRestored: (e: RestoredEvent<ReactFlicking>) => any;
  onSelect: (e: SelectEvent<ReactFlicking>) => any;
  onNeedPanel: (e: NeedPanelEvent<ReactFlicking>) => any;
  onVisibleChange: (e: VisibleChangeEvent<ReactFlicking>) => any;
  onReachEdge: (e: ReachEdgeEvent<ReactFlicking>) => any;
  onPanelChange: (e: PanelChangeEvent<ReactFlicking>) => any;
  [key: string]: any;
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
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
  Plugin
} from "@egjs/flicking";

export interface FlickingProps {
  viewportTag: keyof JSX.IntrinsicElements;
  cameraTag: keyof JSX.IntrinsicElements;
  plugins: Plugin[];
  strict: boolean;
  onReady: (e: ReadyEvent) => any;
  onBeforeResize: (e: BeforeResizeEvent) => any;
  onAfterResize: (e: AfterResizeEvent) => any;
  onHoldStart: (e: HoldStartEvent) => any;
  onHoldEnd: (e: HoldEndEvent) => any;
  onMoveStart: (e: MoveStartEvent) => any;
  onMove: (e: MoveEvent) => any;
  onMoveEnd: (e: MoveEndEvent) => any;
  onWillChange: (e: WillChangeEvent) => any;
  onChanged: (e: ChangedEvent) => any;
  onWillRestore: (e: WillRestoreEvent) => any;
  onRestored: (e: RestoredEvent) => any;
  onSelect: (e: SelectEvent) => any;
  onNeedPanel: (e: NeedPanelEvent) => any;
  onVisibleChange: (e: VisibleChangeEvent) => any;
  onReachEdge: (e: ReachEdgeEvent) => any;
  [key: string]: any;
}

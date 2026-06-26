/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import {
  AfterResizeEvent,
  BeforeResizeEvent,
  ChangedEvent,
  HoldEndEvent,
  HoldStartEvent,
  MoveEndEvent,
  MoveEvent,
  MoveStartEvent,
  NeedPanelEvent,
  PanelChangeEvent,
  Plugin,
  ReachEdgeEvent,
  ReadyEvent,
  RestoredEvent,
  SelectEvent,
  Status,
  VisibleChangeEvent,
  WillChangeEvent,
  WillRestoreEvent
} from "@egjs/flicking";
import * as React from "react";
import ReactFlicking from "./Flicking";

export interface FlickingProps {
  viewportTag: keyof React.JSX.IntrinsicElements;
  cameraTag: keyof React.JSX.IntrinsicElements;
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

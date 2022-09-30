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
  PanelChangeEvent
} from "@egjs/flicking";

import { FlickingProps } from "./types";

export const DEFAULT_PROPS: FlickingProps = {
  viewportTag: "div",
  cameraTag: "div",
  cameraClass: "",
  renderOnSameKey: false,
  plugins: [],
  useFindDOMNode: false,
  hideBeforeInit: false,
  onReady: (e: ReadyEvent) => {},
  onBeforeResize: (e: BeforeResizeEvent) => {},
  onAfterResize: (e: AfterResizeEvent) => {},
  onHoldStart: (e: HoldStartEvent) => {},
  onHoldEnd: (e: HoldEndEvent) => {},
  onMoveStart: (e: MoveStartEvent) => {},
  onMove: (e: MoveEvent) => {},
  onMoveEnd: (e: MoveEndEvent) => {},
  onWillChange: (e: WillChangeEvent) => {},
  onChanged: (e: ChangedEvent) => {},
  onWillRestore: (e: WillRestoreEvent) => {},
  onRestored: (e: RestoredEvent) => {},
  onSelect: (e: SelectEvent) => {},
  onNeedPanel: (e: NeedPanelEvent) => {},
  onVisibleChange: (e: VisibleChangeEvent) => {},
  onReachEdge: (e: ReachEdgeEvent) => {},
  onPanelChange: (e: PanelChangeEvent) => {}
};

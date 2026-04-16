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
  ReachEdgeEvent,
  ReadyEvent,
  RestoredEvent,
  SelectEvent,
  VisibleChangeEvent,
  WillChangeEvent,
  WillRestoreEvent
} from "@egjs/flicking";

import { FlickingProps } from "./types";

export const DEFAULT_PROPS: FlickingProps = {
  viewportTag: "div",
  cameraTag: "div",
  cameraClass: "",
  firstPanelSize: "",
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

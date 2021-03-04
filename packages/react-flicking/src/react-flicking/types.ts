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
  RestoreEvent
} from "../../../../src/index";

import { FlickingEvents } from "../../../../src/Flicking";

export interface FlickingProps {
  tag: keyof JSX.IntrinsicElements;
  viewportTag: keyof JSX.IntrinsicElements;
  cameraTag: keyof JSX.IntrinsicElements;
  plugins: any[];
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
  [key: string]: any;
}

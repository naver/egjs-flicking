import { ChangeEvent, FlickingEvent, SelectEvent, NeedPanelEvent, VisibleChangeEvent } from "@egjs/flicking";
import { FlickingProps } from "./types";

export const FLICKING_PROPS: FlickingProps = {
  tag: "div",
  viewportTag: "div",
  cameraTag: "div",
  classPrefix: "eg-flick",
  plugins: [],
  onNeedPanel: (e: NeedPanelEvent) => {},
  onMoveStart: (e: FlickingEvent) => {},
  onMove: (e: FlickingEvent) => {},
  onMoveEnd: (e: FlickingEvent) => {},
  onHoldStart: (e: FlickingEvent) => {},
  onHoldEnd: (e: FlickingEvent) => {},
  onRestore: (e: FlickingEvent) => {},
  onSelect: (e: SelectEvent) => {},
  onChange: (e: ChangeEvent) => {},
  onVisibleChange: (e: VisibleChangeEvent) => {},
};

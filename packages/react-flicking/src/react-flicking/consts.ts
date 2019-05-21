import { ChangeEvent, FlickingEvent, FlickingOptions, SelectEvent, NeedPanelEvent } from "@egjs/flicking";
import { FlickingProps } from "./types";

export const FLICKING_PROPS: FlickingProps = {
  tag: "div",
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
};

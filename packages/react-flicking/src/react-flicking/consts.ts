import { ChangeEvent, FlickingEvent, FlickingOptions, SelectEvent, NeedPanelEvent } from "@egjs/flicking";
import { FlickingProps } from "./types";

export const DEFAULT_OPTIONS: FlickingOptions = {
  classPrefix: "eg-flick",
  deceleration: 0.0075,
  horizontal: true,
  circular: false,
  infinite: false,
  infiniteThreshold: 0,
  threshold: 40,
  duration: 100,
  panelEffect: x => 1 - Math.pow(1 - x, 3),
  defaultIndex: 0,
  inputType: ["touch", "mouse"],
  thresholdAngle: 45,
  bounce: 10,
  autoResize: false,
  adaptive: false,
  zIndex: 2000,
  bound: false,
  overflow: false,
  hanger: "50%",
  anchor: "50%",
  gap: 0,
  moveType: { type: "snap", count: 1 },
  lastIndex: Infinity,
  renderExternal: true,
};

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

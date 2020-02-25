import { ChangeEvent, FlickingEvent, SelectEvent, Plugin, NeedPanelEvent, FlickingStatus, FlickingMethods, VisibleChangeEvent } from "@egjs/flicking";
import NativeFlicking from "@egjs/flicking";

export type ParametersType<T, R> = T extends (...params: infer U) => any ? (...params: U) => R : never;
export type FlickingType<T> = {
  [key in keyof FlickingMethods]:
    FlickingMethods[key] extends (...params: any[]) => NativeFlicking ?
    ParametersType<FlickingMethods[key], T> : FlickingMethods[key]
};

export interface FlickingProps {
  tag: keyof JSX.IntrinsicElements;
  viewportTag: keyof JSX.IntrinsicElements;
  cameraTag: keyof JSX.IntrinsicElements;
  status?: FlickingStatus;
  plugins: Plugin[];
  onHoldStart: (e: FlickingEvent) => any;
  onHoldEnd: (e: FlickingEvent) => any;
  onMoveStart: (e: FlickingEvent) => any;
  onMove: (e: FlickingEvent) => any;
  onMoveEnd: (e: FlickingEvent) => any;
  onRestore: (e: FlickingEvent) => any;
  onSelect: (e: SelectEvent) => any;
  onChange: (e: ChangeEvent) => any;
  onNeedPanel: (e: NeedPanelEvent) => any;
  onVisibleChange: (e: VisibleChangeEvent) => any;
  [key: string]: any;
}

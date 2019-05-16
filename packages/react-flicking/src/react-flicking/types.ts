import NativeComponent from "@egjs/component";
import { ChangeEvent, FlickingEvent, SelectEvent, Plugin, NeedPanelEvent, FlickingStatus } from "@egjs/flicking";
import NativeFlicking from "@egjs/flicking";

export type ExcludeKeys = keyof NativeComponent | "replace" | "append" | "remove" | "prepend" | "sync" | "getCloneCount";
export type PureFlicking = Pick<NativeFlicking, Exclude<keyof NativeFlicking, ExcludeKeys>>;
export type FlickingType<T> = {
  [key in keyof PureFlicking]:
    PureFlicking[key] extends (...params: any) => NativeFlicking ?
      (...params: Parameters<PureFlicking[key]>) => T : PureFlicking[key]
};

export interface FlickingProps {
  tag: keyof JSX.IntrinsicElements;
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
  [key: string]: any;
}

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
  onHoldStart: (e: FlickingEvent) => void;
  onHoldEnd: (e: FlickingEvent) => void;
  onMoveStart: (e: FlickingEvent) => void;
  onMove: (e: FlickingEvent) => void;
  onMoveEnd: (e: FlickingEvent) => void;
  onRestore: (e: FlickingEvent) => void;
  onSelect: (e: SelectEvent) => void;
  onChange: (e: ChangeEvent) => void;
  onNeedPanel: (e: NeedPanelEvent) => void;
  [key: string]: any;
}

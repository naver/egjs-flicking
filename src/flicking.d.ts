// Type definitions for egjs-flicking 2.0
// Project: https://github.com/naver/egjs-flicking
// Definitions by: Naver <https://github.com/naver>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2
import Component from '@egjs/component';

export as namespace eg;

interface FlickingOption {
  hwAccelerable?: boolean;
  prefix?: string;
  deceleration?: number;
  horizontal?: boolean;
  circular?: boolean;
  previewPadding?: number | number[];
  bounce?: number | number[];
  threshold?: number;
  duration?: number;
  panelEffect?: Function;
  defaultIndex?: number;
  inputType?: string[];
  thresholdAngle?: number;
  adaptiveHeight?: boolean;
  zIndex?: number;
  useTranslate?: boolean;
}

interface FlickingStatus {
  panel: {
    index: number;
    no: number;
    currIndex: number;
    currNo: number;
  };
  $list: {
    style: string;
    className: string;
    html: string;
  }[];
}

export default class Flicking extends Component {
  constructor(el: string | HTMLElement, options?: FlickingOption);
  destroy(): void;
  disableInput(): this;
  enableInput(): this;
  getAllElements(): HTMLElement[];
  getElement(): HTMLElement;
  getIndex(physical: boolean): number;
  getNextElement(): HTMLElement | null;
  getNextIndex(physical: boolean): number;
  getPrevElement(): HTMLElement | null;
  getPrevIndex(physical: boolean): number;
  getStatus(stringify: boolean): FlickingStatus;
  isPlaying(): boolean;
  moveTo(no: number, duration?: number): this;
  next(duration?: number): this;
  prev(duration?: number): this;
  resize(): this;
  restore(duration?: number): this;
  setStatus(status: FlickingStatus | string): void;
  rebuild(param?: any): this;
}

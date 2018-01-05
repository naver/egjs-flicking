// Type definitions for egjs-flicking 2.0
// Project: https://github.com/naver/egjs-flicking
// Definitions by: Naver <https://github.com/naver>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

export as namespace eg;

export = Flicking;

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

declare class Flicking {
  constructor(el: string | HTMLElement, options?: FlickingOption);
  destroy(): void;
  disableInput(): Flicking;
  enableInput(): Flicking;
  getAllElements(): HTMLElement[];
  getElement(): HTMLElement;
  getIndex(physical: boolean): number;
  getNextElement(): HTMLElement | null;
  getNextIndex(physical: boolean): number;
  getPrevElement(): HTMLElement | null;
  getPrevIndex(physical: boolean): number;
  getStatus(stringify: boolean): FlickingStatus | string;
  getTotalCount(physical: boolean): number;
  isPlaying(): boolean;
  moveTo(no: number, duration?: number): Flicking;
  next(duration?: number): Flicking;
  prev(duration?: number): Flicking;
  resize(): Flicking;
  restore(duration?: number): Flicking;
  setStatus(status: FlickingStatus | string): void;
}

declare namespace Flicking {
  function destroy(): void;
  function disableInput(): Flicking;
  function enableInput(): Flicking;
  function getAllElements(): HTMLElement[];
  function getElement(): HTMLElement;
  function getIndex(physical: boolean): number;
  function getNextElement(): HTMLElement | null;
  function getNextIndex(physical: boolean): number;
  function getPrevElement(): HTMLElement | null;
  function getPrevIndex(physical: boolean): number;
  function getStatus(stringify: boolean): FlickingStatus | string;
  function getTotalCount(physical: boolean): number;
  function isPlaying(): boolean;
  function moveTo(no: number, duration?: number): Flicking;
  function next(duration?: number): Flicking;
  function prev(duration?: number): Flicking;
  function resize(): Flicking;
  function restore(duration?: number): Flicking;
  function setStatus(status: FlickingStatus | string): void;
}

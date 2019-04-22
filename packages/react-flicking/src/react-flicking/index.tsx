import NativeFlicking from "@egjs/flicking";
import { HTMLAttributes } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addClass, hasClass } from './utils';

export interface IFlickingOptions {
  hwAccelerable?: boolean;
  prefix?: string;
  deceleration?: number;
  horizontal?: boolean;
  circular?: boolean;
  previewPadding?: number | string | Array<number | string>;
  bounce?: number | number[];
  threshold?: number;
  duration?: number;
  panelEffect?: (x: number) => number;
  defaultIndex?: number,
  inputType?: string[],
  thresholdAngle?: number;
  adaptiveHeight?: boolean;
  zIndex?: number;
  useTranslate?: boolean;
}
export const DIRECTION_LEFT: number = (NativeFlicking as any).DIRECTION_LEFT;
export const DIRECTION_RIGHT: number = (NativeFlicking as any).DIRECTION_RIGHT;
export const DIRECTION_TOP: number = (NativeFlicking as any).DIRECTION_TOP;
export const DIRECTION_BOTTOM: number = (NativeFlicking as any).DIRECTION_BOTTOM;

export interface IFlickingProps extends IFlickingOptions, HTMLAttributes<HTMLElement> {
  onFlick?: (e?: any) => void;
  onFlickEnd?: (e?: any) => void;
  onBeforeFlickStart?: (e?: any) => void;
  onBeforeRestore?: (e?: any) => void;
  onRestore?: (e?: any) => void;
  tag?: string;
}


const flickingOptions: Array<keyof IFlickingOptions> = ["hwAccelerable", "prefix", "deceleration",
  "horizontal", "circular", "previewPadding", "bounce", "threshold", "duration", "panelEffect", "defaultIndex", "inputType",
  "thresholdAngle", "adaptiveHeight", "zIndex", "useTranslate"];

export default class Flicking extends React.Component<IFlickingProps> {
  public static defaultProps: IFlickingProps = {
    horizontal: true,
    onBeforeFlickStart: (e?: any) => { return; },
    onBeforeRestore: (e?: any) => { return; },
    onFlick: (e?: any) => { return; },
    onFlickEnd: (e?: any) => { return; },
    onRestore: (e?: any) => { return; },
    prefix: "eg-flick",
    tag: "div",
  };
  private flicking: NativeFlicking;
  public render() {
    const props = this.props;
    const defaultProps = Flicking.defaultProps;
    const Tag = props.tag as  keyof JSX.IntrinsicElements;
    const attributes = {};

    for (const name in props) {
      if (name in defaultProps || flickingOptions.indexOf(name as keyof IFlickingOptions) !== -1) {
        continue;
      }
      attributes[name] = props[name];
    }

    return <Tag {...attributes}>
      <div className={`${this.props.prefix}-container`}>
        {this.props.children}
      </div>
    </Tag>;
  }
  public componentDidUpdate() {
    const flicking = (this.flicking as any);
    const panel = flicking._conf.panel;
    const horizontal = this.props.horizontal;
    const className = `${this.props.prefix}-panel`;
    panel.$list = [].slice.call(flicking.$container.children);
    panel.count = panel.$list.length;
    panel.origCount = [].concat(this.props.children).length;

    if (this.props.circular) {
      flicking._arrangePanels();
      const deleteCount = panel.no - panel.index;
      const isAppend = deleteCount >= 0;
      flicking._movePanelPosition(isAppend ? deleteCount : -deleteCount, isAppend);
    }
    panel.$list.forEach((el: HTMLElement) => {
      if (hasClass(el, className)) {
        return;
      }
      addClass(el, className);
      el.style.cssText += `position:absolute;box-sizing:border-box;${horizontal ? "height" : "size"}: 100%;top:0;left:0;`;
    });

    flicking._applyPanelsPos();
    this.resize();
  }
  public componentDidMount() {
    const options = {};
    const props = this.props;

    for (const name in props) {
      if (flickingOptions.indexOf(name as keyof IFlickingOptions) !== -1) {
        options[name] = props[name];
      }
    }

    this.flicking = new NativeFlicking(ReactDOM.findDOMNode(this) as HTMLElement, options);

    const flicking = this.flicking;

    flicking.on("flick", (e) => {
      this.props.onFlick(e);
    });
    flicking.on("flickEnd", (e) => {
      this.props.onFlickEnd(e);
    });
    flicking.on("beforeFlickStart", (e) => {
      this.props.onBeforeFlickStart(e);
    });
    flicking.on("beforeRestore", (e) => {
      this.props.onBeforeRestore(e);
    });
    flicking.on("restore", (e) => {
      this.props.onRestore(e);
    });

    window.addEventListener("resize", this.resize);
  }
  public moveTo(no: number, duration?: number) {
    this.flicking.moveTo(no, duration);
    return this;
  }
  public next(duration?: number) {
    this.flicking.next(duration);
    return this;
  }
  public prev(duration?: number) {
    this.flicking.prev(duration);
    return this;
  }
  public getAllElements() {
    return this.flicking.getAllElements();
  }
  public getElement() {
    return this.flicking.getElement();
  }
  public getNextElement() {
    return this.flicking.getNextElement();
  }
  public getPrevElement() {
    return this.flicking.getPrevElement();
  }
  public getIndex(physical: boolean) {
    return this.flicking.getIndex(physical);
  }
  public getNextIndex(physical: boolean) {
    return this.flicking.getNextIndex(physical);
  }
  public getPrevIndex(physical: boolean) {
    return this.flicking.getPrevIndex(physical);
  }
  public plugin(plugins: any[]) {
    (this.flicking as any).plugin(plugins);
    return this;
  }
  public resize = () => {
    this.flicking.resize();
    (this.flicking as any).plugins.forEach((plugin: any) => {
      if (plugin.resize) {
        plugin.resize();
      }
    });
    return this;
  }
  public componentWillUnmount() {
    this.flicking.destroy();
    window.removeEventListener("resize", this.resize);
  }
}

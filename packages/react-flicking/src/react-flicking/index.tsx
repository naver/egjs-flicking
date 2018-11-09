import NativeFlicking from "@egjs/flicking";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

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
  useTranslate?: number;
}
export interface IFlickingProps extends IFlickingOptions {
  onFlick?: (e?: any) => void;
  onFlickEnd?: (e?: any) => void;
  onBeforeFlickStart?: (e?: any) => void;
  onBeforeRestore?: (e?: any) => void;
  onRestore?: (e?: any) => void;
  tag?: string;
  [key: string]: any;
}


const flickingOptions: Array<keyof IFlickingOptions> = ["hwAccelerable", "prefix", "deceleration",
  "horizontal", "circular", "previewPadding", "bounce", "threshold", "duration", "panelEffect", "defaultIndex", "inputType",
"thresholdAngle", "adaptiveHeight", "zIndex", "useTranslate"];

export default class Flicking extends React.Component<IFlickingProps> {
  public static defaultProps: IFlickingProps = {
    onBeforeFlickStart: (e?: any) => {return;},
    onBeforeRestore: (e?: any) => {return;},
    onFlick: (e?: any) => {return;},
    onFlickEnd: (e?: any) => {return;},
    onRestore: (e?: any) => {return;},
    tag: "div",
  };
  private flicking: NativeFlicking;
  public render() {
    const props = this.props;
    const defaultProps = Flicking.defaultProps;
    const Tag = props.tag;
    const attributes = {};

    for (const name in props) {
      if (name in defaultProps || flickingOptions.indexOf(name as keyof IFlickingOptions) !== -1) {
        continue;
      }
      attributes[name] = props[name];
    }

    return <Tag {...attributes}>{this.props.children}</Tag>;
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
  public resize = () => {
    this.flicking.resize();
    return this;
  }
  public componentWillUnmount() {
    this.flicking.destroy();
    window.removeEventListener("resize", this.resize);
  }
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import VanillaFlicking, {
  FlickingOptions,
  EVENTS,
  withFlickingMethods,
  sync,
  getRenderingPanels,
  Plugin
} from "@egjs/flicking";
import { isFragment } from "react-is";

import { DEFAULT_PROPS } from "./consts";
import { FlickingProps } from "./types";
import ReactRenderer from "./ReactRenderer";
import ReactPanelComponent from "./ReactPanelComponent";
import NonStrictPanelComponent from "./NonStrictPanelComponent";
import StrictPanelComponent from "./StrictPanelComponent";

class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
  public static defaultProps: FlickingProps = DEFAULT_PROPS;

  @withFlickingMethods private _vanillaFlicking: VanillaFlicking;
  private _panels: React.RefObject<ReactPanelComponent>[] = [];
  private _pluginsDiffer: ListDiffer<any>;
  private _jsxDiffer: ListDiffer<React.ReactElement>;
  private _viewportElement: HTMLElement;
  private _diffResult: DiffResult<React.ReactElement> | null;
  private _mounted: boolean;
  private _renderCallback: () => any;

  public get mounted() { return this._mounted; }
  public get reactPanels() { return this._panels.map(panel => panel.current!); }

  public constructor(props) {
    super(props);

    this._panels = this._getChildren().map(() => React.createRef());
  }

  public setRenderCallback(callback: () => any) {
    this._renderCallback = callback;
  }

  public componentDidMount() {
    this._mounted = true;

    const props = this.props as Required<FlickingProps>;

    const flicking = new VanillaFlicking(
      this._viewportElement,
      {
        ...props,
        ...{ renderExternal: {
          renderer: ReactRenderer as any,
          rendererOptions: { reactFlicking: this }
        }}
      },
    );

    this._vanillaFlicking = flicking;
    this._bindEvents();

    const children = this._getChildren();
    this._jsxDiffer = new ListDiffer(children, panel => panel.key!);
    this._pluginsDiffer = new ListDiffer<any>();

    this._checkPlugins();
  }

  public componentWillUnmount() {
    this._mounted = false;

    this._vanillaFlicking.destroy();
  }

  public shouldComponentUpdate(nextProps: this["props"]) {
    const children = this._getChildren(nextProps.children);
    const diffResult = this._jsxDiffer.update(children);

    this._panels = children.map(() => React.createRef());
    this._diffResult = diffResult;

    return true;
  }

  public componentDidUpdate() {
    const flicking = this._vanillaFlicking;
    const diffResult = this._diffResult;

    this._checkPlugins();
    this._renderCallback && this._renderCallback();

    if (!diffResult || !flicking.initialized) return;

    sync(flicking, diffResult, this.reactPanels);

    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      this.setState({});
    }

    this._diffResult = null;
  }

  public render() {
    const props = this.props;
    const Viewport = props.viewportTag as any;
    const Camera = props.cameraTag as any;
    const attributes: { [key: string]: any } = {};
    const flicking = this._vanillaFlicking;

    for (const name in props) {
      if (!(name in DEFAULT_PROPS) && !(name in VanillaFlicking.prototype)) {
        attributes[name] = props[name];
      }
    }

    const viewportClasses: string[] = ["flicking-viewport"];
    const isHorizontal = flicking
      ? flicking.horizontal
      : props.horizontal ?? true;

    if (!isHorizontal) {
      viewportClasses.push("vertical")
    }
    if (attributes.className) {
      viewportClasses.push(attributes.className);
    }

    const children = (this._diffResult && flicking && flicking.initialized)
      ? getRenderingPanels(flicking, this._diffResult)
      : this._getChildren();
    const panels = this.props.useFindDOMNode
      ? children.map((child, idx) => <NonStrictPanelComponent key={child.key!} ref={this._panels[idx]}>{child}</NonStrictPanelComponent>)
      : children.map((child, idx) => <StrictPanelComponent key={child.key!} ref={this._panels[idx] as any}>{child}</StrictPanelComponent>)

    return (
      <Viewport {...attributes} className={viewportClasses.join(" ")} ref={(e?: HTMLElement) => {
        e && (this._viewportElement = e);
      }}>
        <Camera className="flicking-camera">
          { panels }
        </Camera>
      </Viewport>
    );
  }

  private _bindEvents() {
    const flicking = this._vanillaFlicking!;
    const props = this.props as Required<FlickingProps>;

    Object.keys(EVENTS).forEach((eventKey: keyof typeof EVENTS) => {
      const eventName = EVENTS[eventKey];
      const propName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;

      flicking.on(eventName, e => {
        e.currentTarget = this;

        props[propName](e);
      });
    });

    flicking.once(EVENTS.READY, () => {
      this.forceUpdate();
    });
  }

  private _checkPlugins() {
    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.props.plugins!) as DiffResult<Plugin>;

    this._vanillaFlicking.addPlugins(...added.map(index => list[index]));
    this._vanillaFlicking.removePlugins(...removed.map(index => prevList[index]));
  }

  private _getChildren(children: React.ReactNode = this.props.children) {
    return (React.Children.toArray(children) as Array<React.ReactElement<any>>).reduce((all, child) => {
      return [...all, ...this._unpackFragment(child)];
    }, []) as Array<React.ReactElement<any>>;
  }

  private _unpackFragment(child: React.ReactElement) {
    return isFragment(child)
      ? React.Children.toArray(child.props.children)
        .reduce((allChilds, fragChild) => [...allChilds, ...this._unpackFragment(fragChild)], [])
      : [child];
  }
}

interface Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>>, VanillaFlicking { }
export default Flicking;

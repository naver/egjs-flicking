/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import VanillaFlicking, {
  AfterResizeEvent,
  BeforeResizeEvent,
  FlickingOptions,
  HoldEndEvent,
  HoldStartEvent,
  MoveEndEvent,
  MoveEvent,
  MoveStartEvent,
  NeedPanelEvent,
  ReadyEvent,
  VisibleChangeEvent,
  WillChangeEvent,
  ChangedEvent,
  WillRestoreEvent,
  RestoredEvent,
  SelectEvent,
  ReachEdgeEvent,
  EVENTS,
  withFlickingMethods,
  sync,
  getRenderingPanels,
  Plugin
} from "@egjs/flicking";
import { ComponentEvent } from "@egjs/component";
import "@egjs/flicking/dist/flicking.css";

import { DEFAULT_PROPS } from "./consts";
import { FlickingProps } from "./types";
import ReactRenderer from "./ReactRenderer";
import ReactPanelComponent from "./ReactPanelComponent";

class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
  public static defaultProps: FlickingProps = DEFAULT_PROPS;

  @withFlickingMethods private _vanillaFlicking: VanillaFlicking;
  private _panels: React.RefObject<ReactPanelComponent>[] = [];
  private _pluginsDiffer: ListDiffer<any>;
  private _jsxDiffer: ListDiffer<React.ReactElement>;
  private _viewportElement: HTMLElement;
  private _diffResult: DiffResult<React.ReactElement> | null;
  private _renderCallback: () => any;

  public get reactPanels() { return this._panels.map(panel => panel.current!); }

  public setRenderCallback(callback: () => any) {
    this._renderCallback = callback;
  }

  public componentDidMount() {
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
    ).on({
      [EVENTS.READY]: (e: ReadyEvent) => props.onReady({ ...e, currentTarget: this as any }),
      [EVENTS.BEFORE_RESIZE]: (e: BeforeResizeEvent) => props.onBeforeResize({ ...e, currentTarget: this as any }),
      [EVENTS.AFTER_RESIZE]: (e: AfterResizeEvent) => props.onAfterResize({ ...e, currentTarget: this as any }),
      [EVENTS.HOLD_START]: (e: HoldStartEvent) => props.onHoldStart({ ...e, currentTarget: this as any }),
      [EVENTS.HOLD_END]: (e: HoldEndEvent) => props.onHoldEnd({ ...e, currentTarget: this as any }),
      [EVENTS.MOVE_START]: (e: MoveStartEvent) => props.onMoveStart({ ...e, currentTarget: this as any }),
      [EVENTS.MOVE]: (e: MoveEvent) => props.onMove({ ...e, currentTarget: this as any }),
      [EVENTS.MOVE_END]: (e: MoveEndEvent) => props.onMoveEnd({ ...e, currentTarget: this as any }),
      [EVENTS.WILL_CHANGE]: (e: WillChangeEvent) => props.onWillChange({ ...e, currentTarget: this as any } as any),
      [EVENTS.CHANGED]: (e: ChangedEvent) => props.onChanged({ ...e, currentTarget: this as any } as any),
      [EVENTS.WILL_RESTORE]: (e: WillRestoreEvent) => props.onWillRestore({ ...e, currentTarget: this as any } as any),
      [EVENTS.RESTORED]: (e: RestoredEvent) => props.onRestored({ ...e, currentTarget: this as any }),
      [EVENTS.SELECT]: (e: SelectEvent) => props.onSelect({ ...e, currentTarget: this as any } as any),
      [EVENTS.NEED_PANEL]: (e: NeedPanelEvent) => props.onNeedPanel({ ...e, currentTarget: this as any }),
      [EVENTS.VISIBLE_CHANGE]: (e: VisibleChangeEvent) => props.onVisibleChange({ ...e, currentTarget: this as any } as any),
      [EVENTS.REACH_EDGE]: (e: ReachEdgeEvent) => props.onReachEdge({ ...e, currentTarget: this as any }),
    });

    if (flicking.initialized && props.onReady) {
      props.onReady({ ...new ComponentEvent(EVENTS.READY), currentTarget: this as any })
    }

    this._vanillaFlicking = flicking;

    const children = this._getChildren();
    this._jsxDiffer = new ListDiffer(children, panel => panel.key!);
    this._pluginsDiffer = new ListDiffer<any>();

    this._checkPlugins();
  }

  public componentWillUnmount() {
    this._vanillaFlicking.destroy();
  }

  public shouldComponentUpdate(nextProps: this["props"]) {
    const children = this._getChildren(nextProps.children);
    const diffResult = this._jsxDiffer.update(children);

    this._diffResult = diffResult;

    return true;
  }

  public componentDidUpdate() {
    const flicking = this._vanillaFlicking;
    const diffResult = this._diffResult;

    this._checkPlugins();

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

    const children = this._diffResult
      ? getRenderingPanels(this._vanillaFlicking, this._diffResult)
      : this._getChildren();
    this._panels = children.map(() => React.createRef());
    const panels = children.map((child, idx) => <ReactPanelComponent key={child.key} ref={this._panels[idx]}>{child}</ReactPanelComponent>)

    this._renderCallback && this._renderCallback();

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

  private _checkPlugins() {
    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.props.plugins!) as DiffResult<Plugin>;

    this._vanillaFlicking.addPlugins(...added.map(index => list[index]));
    this._vanillaFlicking.removePlugins(...removed.map(index => prevList[index]));
  }

  private _getChildren(children: React.ReactNode = this.props.children) {
    return React.Children.toArray(children).slice() as Array<React.ReactElement<any>>;
  }
}

interface Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>>, VanillaFlicking { }
export default Flicking;

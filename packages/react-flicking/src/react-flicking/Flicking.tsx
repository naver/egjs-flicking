import * as React from "react";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import NativeFlicking, {
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
  getRenderingPanels
} from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";

import { DEFAULT_PROPS } from "./consts";
import { FlickingProps } from "./types";

class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
  public static defaultProps: FlickingProps = DEFAULT_PROPS;

  @withFlickingMethods
  private _nativeFlicking: NativeFlicking;
  private _panels: React.ReactElement[] = [];
  private _pluginsDiffer: ListDiffer<any>;
  private _jsxDiffer: ListDiffer<React.ReactElement>;
  private _viewportElement: HTMLElement;
  private _diffResult: DiffResult<React.ReactElement>;

  public constructor(props: Partial<FlickingProps & FlickingOptions>) {
    super(props);

    this._panels = [...this._getChildren(this.props.children)];
  }

  public componentDidMount() {
    const props = this.props as Required<FlickingProps>;

    const flicking = new NativeFlicking(
      this._viewportElement,
      {
        ...props,
        renderExternal: true
      },
    ).on({
      [EVENTS.READY]: (e: ReadyEvent) => props.onReady(e),
      [EVENTS.BEFORE_RESIZE]: (e: BeforeResizeEvent) => props.onBeforeResize(e),
      [EVENTS.AFTER_RESIZE]: (e: AfterResizeEvent) => props.onAfterResize(e),
      [EVENTS.HOLD_START]: (e: HoldStartEvent) => props.onHoldStart(e),
      [EVENTS.HOLD_END]: (e: HoldEndEvent) => props.onHoldEnd(e),
      [EVENTS.MOVE_START]: (e: MoveStartEvent) => props.onMoveStart(e),
      [EVENTS.MOVE]: (e: MoveEvent) => props.onMove(e),
      [EVENTS.MOVE_END]: (e: MoveEndEvent) => props.onMoveEnd(e),
      [EVENTS.WILL_CHANGE]: (e: WillChangeEvent) => props.onWillChange(e),
      [EVENTS.CHANGED]: (e: ChangedEvent) => props.onChanged(e),
      [EVENTS.WILL_RESTORE]: (e: WillRestoreEvent) => props.onWillRestore(e),
      [EVENTS.RESTORED]: (e: RestoredEvent) => props.onRestored(e),
      [EVENTS.SELECT]: (e: SelectEvent) => props.onSelect(e),
      [EVENTS.NEED_PANEL]: (e: NeedPanelEvent) => props.onNeedPanel(e),
      [EVENTS.VISIBLE_CHANGE]: (e: VisibleChangeEvent) => {
        props.onVisibleChange!(e);
        if (flicking.renderOnlyVisible) {
          this.setState({});
        }
      },
      [EVENTS.REACH_EDGE]: (e: ReachEdgeEvent) => props.onReachEdge(e),
    });

    if (props.circular) {
      flicking.renderer.elementManipulator.on("orderChanged", () => {
        this.setState({});
      });
    }

    if (this.props.status) {
      this.setStatus(this.props.status);
    }

    this._nativeFlicking = flicking;

    const children = this._getChildren(this.props.children);
    this._jsxDiffer = new ListDiffer(children, panel => panel.key!);
    this._pluginsDiffer = new ListDiffer<any>();

    this._checkPlugins();

    this.setState({});
  }

  public componentWillUnmount() {
    this._nativeFlicking.destroy();
  }

  public shouldComponentUpdate(nextProps: this["props"]) {
    const children = this._getChildren(nextProps.children);
    const diffResult = this._jsxDiffer.update(children);
    const flicking = this._nativeFlicking;

    this._diffResult = diffResult;
    this._panels = flicking.initialized
      ? getRenderingPanels(flicking, diffResult)
      : children;

    return true;
  }

  public componentDidUpdate() {
    const flicking = this._nativeFlicking;
    const diffResult = this._diffResult;

    this._checkPlugins();

    if (!diffResult || !flicking.initialized) return;

    sync(flicking, diffResult);

    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      this.setState({});
    }
  }

  public render() {
    const props = this.props;
    const Viewport = props.viewportTag as any;
    const Camera = props.cameraTag as any;
    const attributes: { [key: string]: any } = {};
    const flicking = this._nativeFlicking;

    for (const name in props) {
      if (!(name in DEFAULT_PROPS) && !(name in NativeFlicking.prototype)) {
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

    return (
      <Viewport {...attributes} className={viewportClasses.join(" ")} ref={(e?: HTMLElement) => {
        e && (this._viewportElement = e);
      }}>
        <Camera className="flicking-camera">
          { this._panels }
        </Camera>
      </Viewport>
    );
  }

  private _checkPlugins() {
    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.props.plugins!);

    this._nativeFlicking.addPlugins(added.map(index => list[index]));
    this._nativeFlicking.removePlugins(removed.map(index => prevList[index]));
  }

  private _getChildren(children?: React.ReactNode) {
    const childs = React.Children.toArray(children) as Array<React.ReactElement<any>>;

    return childs.map(child => {
      return React.cloneElement(child, {
        key: child.key!
      });
    });
  }
}

interface Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>>, NativeFlicking { }
export default Flicking;

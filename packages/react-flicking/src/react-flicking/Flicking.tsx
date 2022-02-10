/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";
import Component from "@egjs/component";
import ListDiffer, { diff, DiffResult } from "@egjs/list-differ";
import VanillaFlicking, {
  FlickingOptions,
  VirtualRenderingStrategy,
  EVENTS,
  withFlickingMethods,
  sync,
  getRenderingPanels,
  getDefaultCameraTransform,
  Plugin,
  range,
  NormalRenderingStrategy
} from "@egjs/flicking";

import { DEFAULT_PROPS } from "./consts";
import { FlickingProps } from "./types";
import ReactRenderer, { ReactRendererOptions } from "./ReactRenderer";
import StrictPanel from "./StrictPanel";
import NonStrictPanel from "./NonStrictPanel";
import ViewportSlot from "./ViewportSlot";
import ReactElementProvider from "./ReactElementProvider";

enum LifeCycleState {
  BEFORE_UPDATE,
  RENDER,
  UPDATED
}

class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
  public static defaultProps: FlickingProps = DEFAULT_PROPS;

  @withFlickingMethods private _vanillaFlicking: VanillaFlicking;
  private _panels: React.RefObject<StrictPanel | NonStrictPanel | HTMLDivElement>[] = [];
  private _pluginsDiffer: ListDiffer<any>;
  private _jsxDiffer: ListDiffer<React.ReactElement>;
  private _viewportElement: HTMLElement;
  private _diffResult: DiffResult<React.ReactElement> | null;
  private _renderEmitter = new Component<{ render: void }>();
  private _currentState: LifeCycleState = LifeCycleState.BEFORE_UPDATE;

  public get reactPanels() { return this._panels.map(panel => panel.current!); }
  public get renderEmitter() { return this._renderEmitter; }

  public constructor(props: Partial<FlickingProps & FlickingOptions>) {
    super(props);

    this._panels = this._createPanelRefs(props, this._getChildren());
  }

  public componentDidMount() {
    const props = this.props as Required<FlickingProps & FlickingOptions>;
    const rendererOptions: ReactRendererOptions = {
      reactFlicking: this,
      align: props.align,
      strategy: props.virtual && props.panelsPerView > 0
        ? new VirtualRenderingStrategy()
        : new NormalRenderingStrategy({
          providerCtor: ReactElementProvider
        })
    };

    const flicking = new VanillaFlicking(
      this._viewportElement,
      {
        ...props,
        externalRenderer: new ReactRenderer(rendererOptions)
      },
    );

    this._vanillaFlicking = flicking;
    this._currentState = LifeCycleState.UPDATED;

    const children = this._getChildren();
    this._jsxDiffer = new ListDiffer(children, panel => panel.key!);
    this._pluginsDiffer = new ListDiffer<any>();

    this._bindEvents();
    this._checkPlugins();

    if (props.status) {
      flicking.setStatus(props.status);
    }
  }

  public componentWillUnmount() {
    this._vanillaFlicking?.destroy();
  }

  public shouldComponentUpdate(nextProps: this["props"]) {
    const vanillaFlicking = this._vanillaFlicking;
    const props = this.props;

    // Ignore updates before init, they will be updated after "ready" event's force update
    if (!vanillaFlicking || !vanillaFlicking.initialized) return false;

    if (this._currentState !== LifeCycleState.BEFORE_UPDATE && props.children !== nextProps.children) {
      const nextChildren = this._getChildren(nextProps.children);

      this._panels = this._createPanelRefs(nextProps, nextChildren);
      this._diffResult = this._jsxDiffer.update(nextChildren);
    }

    this._currentState = LifeCycleState.BEFORE_UPDATE;

    for (const key in nextProps) {
      if (props[key] !== nextProps[key]) {
        return true;
      }
    }

    return false;
  }

  public componentDidUpdate() {
    const flicking = this._vanillaFlicking;
    const renderEmitter = this._renderEmitter;
    const diffResult = this._diffResult;

    this._checkPlugins();
    renderEmitter.trigger("render");

    this._currentState = LifeCycleState.UPDATED;

    if (!diffResult || !flicking.initialized) return;

    sync(flicking, diffResult, this.reactPanels);

    this._diffResult = null;
  }

  public render() {
    const props = this.props;
    const Viewport = props.viewportTag as any;
    const Camera = props.cameraTag as any;
    const attributes: { [key: string]: any } = {};
    const flicking = this._vanillaFlicking;

    this._currentState = LifeCycleState.RENDER;

    for (const name in props) {
      if (!(name in DEFAULT_PROPS) && !(name in VanillaFlicking.prototype)) {
        attributes[name] = props[name];
      }
    }

    const initialized = flicking && flicking.initialized;
    const viewportClasses: string[] = ["flicking-viewport"];
    const isHorizontal = flicking
      ? flicking.horizontal
      : props.horizontal ?? true;

    if (!isHorizontal) {
      viewportClasses.push("vertical");
    }
    if (props.hideBeforeInit && !initialized) {
      viewportClasses.push("flicking-hidden");
    }
    if (attributes.className) {
      viewportClasses.push(attributes.className);
    }

    const cameraProps = !initialized && props.firstPanelSize
      ? { style: {
        transform: getDefaultCameraTransform(this.props.align, this.props.horizontal, this.props.firstPanelSize)
      }}
      : {};

    const panels = !!props.virtual && (props.panelsPerView ?? -1) > 0
      ? this._getVirtualPanels()
      : this._getPanels();

    return (
      <Viewport {...attributes} className={viewportClasses.join(" ")} ref={(e?: HTMLElement) => {
        e && (this._viewportElement = e);
      }}>
        <Camera className="flicking-camera" {...cameraProps}>
          { panels }
        </Camera>
        { this._getViewportSlot() }
      </Viewport>
    );
  }

  private _createPanelRefs(props: this["props"], children: Array<React.ReactElement<any>>): React.RefObject<StrictPanel | NonStrictPanel | HTMLDivElement>[] {
    const panelsPerView = props.panelsPerView ?? -1;

    return panelsPerView > 0 && !!props.virtual
      ? range(panelsPerView + 1).map(() => React.createRef())
      : children.map(() => React.createRef());
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
      const children = this._getChildren();
      const diffResult = this._jsxDiffer.update(children);

      // children is changed before init
      if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
        this._panels = this._createPanelRefs(this.props, children);
        this._diffResult = diffResult;
      }

      this.forceUpdate();
    });
  }

  private _checkPlugins() {
    const flicking = this._vanillaFlicking;
    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.props.plugins!) as DiffResult<Plugin>;

    flicking.addPlugins(...added.map(index => list[index]));
    flicking.removePlugins(...removed.map(index => prevList[index]));
  }

  private _getChildren(children: React.ReactNode = this.props.children) {
    return (React.Children.toArray(children) as Array<React.ReactElement<any>>)
      .filter(child => child.type !== ViewportSlot)
      .reduce((all, child) => {
        return [...all, ...this._unpackFragment(child)];
      }, []) as Array<React.ReactElement<any>>;
  }

  private _getViewportSlot() {
    return (React.Children.toArray(this.props.children) as Array<React.ReactElement<any>>)
      .filter(child => child.type === ViewportSlot);
  }

  private _unpackFragment(child: React.ReactElement) {
    return this._isFragment(child)
      ? React.Children.toArray(child.props.children)
        .reduce((allChilds, fragChild) => [...allChilds, ...this._unpackFragment(fragChild)], [])
      : [child];
  }

  private _getVirtualPanels() {
    const {
      panelClass = "flicking-panel"
    } = this.props.virtual!;
    const panelsPerView = this.props.panelsPerView!;
    const flicking = this._vanillaFlicking;
    const initialized = flicking && flicking.initialized;

    const renderingIndexes = initialized
      ? flicking.renderer.strategy.getRenderingIndexesByOrder(flicking)
      : range(panelsPerView + 1);

    const firstPanel = flicking && flicking.panels[0];
    const size = firstPanel
      ? flicking.horizontal
        ? { width: firstPanel.size }
        : { height: firstPanel.size }
      : {};

    return renderingIndexes.map(idx => {
      return <div
        key={idx}
        data-element-index={idx}
        ref={this._panels[idx] as React.RefObject<HTMLDivElement>}
        className={panelClass}
        style={size} />
    });
  }

  private _getPanels() {
    const origChildren = this._getChildren();
    const vanillaFlicking = this._vanillaFlicking;
    const diffResult = this._diffResult;

    const children = vanillaFlicking && vanillaFlicking.initialized
      ? diffResult
        ? getRenderingPanels(vanillaFlicking, diffResult)
        : getRenderingPanels(vanillaFlicking, diff(origChildren, origChildren))
      : origChildren;

    return this.props.useFindDOMNode
      ? children.map((child, idx) => <NonStrictPanel key={child.key!} ref={this._panels[idx] as any}>{child}</NonStrictPanel>)
      : children.map((child, idx) => <StrictPanel key={child.key!} ref={this._panels[idx] as any}>{child}</StrictPanel>)
  }

  private _isFragment(child: NonNullable<React.ReactNode>) {
    if ((child as React.ReactElement).type) {
      return (child as React.ReactElement).type === React.Fragment;
    }
    return child === React.Fragment;
  }
}

interface Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>>, VanillaFlicking { }
export default Flicking;

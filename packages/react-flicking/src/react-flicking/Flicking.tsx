/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";
import Component from "@egjs/component";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
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
  VirtualPanel,
  VirtualElementProvider,
  NormalRenderingStrategy,
  ExternalPanel
} from "@egjs/flicking";
import { isFragment } from "react-is";

import { DEFAULT_PROPS } from "./consts";
import { FlickingProps } from "./types";
import ReactRenderer, { ReactRendererOptions } from "./ReactRenderer";
import StrictPanel from "./StrictPanel";
import NonStrictPanel from "./NonStrictPanel";
import ViewportSlot from "./ViewportSlot";
import ReactElementProvider from "./ReactElementProvider";

class Flicking extends React.PureComponent<Partial<FlickingProps & FlickingOptions>> {
  public static defaultProps: FlickingProps = DEFAULT_PROPS;

  @withFlickingMethods private _vanillaFlicking: VanillaFlicking;
  private _panels: React.RefObject<StrictPanel | NonStrictPanel | HTMLDivElement>[] = [];
  private _pluginsDiffer: ListDiffer<any>;
  private _jsxDiffer: ListDiffer<React.ReactElement>;
  private _viewportElement: HTMLElement;
  private _diffResult: DiffResult<React.ReactElement> | null;
  private _renderEmitter = new Component<{ render: void }>();

  public get reactPanels() { return this._panels.map(panel => panel.current!); }
  public get renderEmitter() { return this._renderEmitter; }

  public componentDidMount() {
    const props = this.props as Required<FlickingProps & FlickingOptions>;
    const rendererOptions: ReactRendererOptions = {
      align: props.align,
      reactFlicking: this,
      strategy: props.virtual && props.panelsPerView > 0
        ? new VirtualRenderingStrategy()
        : new NormalRenderingStrategy({
          providerCtor: ReactElementProvider,
          panelCtor: ExternalPanel
        })
    };

    const flicking = new VanillaFlicking(
      this._viewportElement,
      {
        ...props,
        ...{ renderExternal: {
          renderer: ReactRenderer,
          rendererOptions
        }}
      },
    );

    this._vanillaFlicking = flicking;

    const children = this._getChildren();
    this._jsxDiffer = new ListDiffer(children, panel => panel.key!);
    this._pluginsDiffer = new ListDiffer<any>();

    this._bindEvents();
    this._checkPlugins();
  }

  public componentWillUnmount() {
    this._vanillaFlicking?.destroy();
  }

  public componentDidUpdate() {
    const flicking = this._vanillaFlicking;
    const diffResult = this._diffResult;

    this._checkPlugins();
    this._renderEmitter.trigger("render");

    if (!diffResult || !flicking.initialized) return;

    sync(flicking, diffResult, this.reactPanels);

    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      this.forceUpdate();
    }

    this._diffResult = null;
  }

  public render() {
    const props = this.props;
    const Viewport = props.viewportTag as any;
    const Camera = props.cameraTag as any;
    const attributes: { [key: string]: any } = {};
    const flicking = this._vanillaFlicking;
    const children = this._getChildren(props.children);
    const diffResult = this._jsxDiffer?.update(children) ?? null;

    this._panels = this._createPanelRefs(props, children);
    this._diffResult = diffResult;

    for (const name in props) {
      if (!(name in DEFAULT_PROPS) && !(name in VanillaFlicking.prototype)) {
        attributes[name] = props[name];
      }
    }

    const initialized = !!this._diffResult && flicking && flicking.initialized;
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
      ? this._getVirtualPanels(initialized)
      : this._getPanels(initialized);

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
    return isFragment(child)
      ? React.Children.toArray(child.props.children)
        .reduce((allChilds, fragChild) => [...allChilds, ...this._unpackFragment(fragChild)], [])
      : [child];
  }

  private _getVirtualPanels(initialized: boolean) {
    const {
      panelClass = "flicking-panel"
    } = this.props.virtual!;
    const panelsPerView = this.props.panelsPerView!;
    const flicking = this._vanillaFlicking;

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

  private _getPanels(initialized: boolean) {
    const children = initialized
      ? getRenderingPanels(this._vanillaFlicking, this._diffResult!)
      : this._getChildren();

    return this.props.useFindDOMNode
      ? children.map((child, idx) => <NonStrictPanel key={child.key!} ref={this._panels[idx] as any}>{child}</NonStrictPanel>)
      : children.map((child, idx) => <StrictPanel key={child.key!} ref={this._panels[idx] as any}>{child}</StrictPanel>)
  }
}

interface Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>>, VanillaFlicking { }
export default Flicking;

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";
import Component from "@egjs/component";
import ListDiffer, { diff, DiffResult } from "@egjs/list-differ";
import VanillaFlicking, {
  CrossFlicking as VanillaCrossFlicking,
  CrossFlickingOptions,
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
import { CrossFlickingProps, FlickingProps } from "./types";
import ReactRenderer, { ReactRendererOptions } from "./ReactRenderer";
import StrictPanel from "./StrictPanel";
import NonStrictPanel from "./NonStrictPanel";
import ViewportSlot from "./ViewportSlot";
import ReactElementProvider from "./ReactElementProvider";
import Flicking from "./Flicking";

class CrossFlicking extends Flicking {
  public static defaultProps: CrossFlickingProps = DEFAULT_PROPS;

  public constructor(props: Partial<FlickingProps & CrossFlickingOptions>) {
    super(props);
  }

  public componentDidMount() {
    const props = this.props as Required<FlickingProps & CrossFlickingOptions>;
    const rendererOptions: ReactRendererOptions = {
      reactFlicking: this,
      strategy: new NormalRenderingStrategy({
        providerCtor: ReactElementProvider
      })
    };

    const flicking = new VanillaCrossFlicking(
      this._viewportElement,
      {
        ...props,
        externalRenderer: new ReactRenderer(rendererOptions),
        sideOptions: {
          ...props.sideOptions,
          externalRenderer: new ReactRenderer({
            reactFlicking: this,
            strategy: new NormalRenderingStrategy({
              providerCtor: ReactElementProvider
            })
          }),
        }
      },
    );

    this._vanillaFlicking = flicking;

    const children = this._getChildren();
    this._jsxDiffer = new ListDiffer(children, panel => panel.key!);
    this._pluginsDiffer = new ListDiffer<any>();
    this._prevChildren = children;

    this._bindEvents();
    this._checkPlugins();

    if (props.status) {
      flicking.setStatus(props.status);
    }
  }

  public render() {
    const props = this.props;
    const Viewport = props.viewportTag as any;
    const Camera = props.cameraTag as any;
    const attributes: { [key: string]: any } = {};
    const flicking = this._vanillaFlicking;

    this.beforeRender();

    for (const name in props) {
      if (!(name in DEFAULT_PROPS) && !(name in VanillaFlicking.prototype)) {
        attributes[name] = props[name];
      }
    }

    const initialized = flicking && flicking.initialized;
    const viewportClasses: string[] = ["flicking-viewport"];
    const cameraClasses: string[] = ["flicking-camera"];
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
    if (props.cameraClass) {
      cameraClasses.push(props.cameraClass);
    }

    const cameraProps = !initialized && props.firstPanelSize
      ? { style: {
        transform: getDefaultCameraTransform(this.props.align, this.props.horizontal, this.props.firstPanelSize)
      }}
      : {};

    const panels = this._getPanels();

    console.log("panels", panels);

    return (
      <Viewport {...attributes} className={viewportClasses.join(" ")} ref={(e?: HTMLElement) => {
        e && (this._viewportElement = e);
      }}>
        <Camera className={cameraClasses.join(" ")} {...cameraProps}>
          { panels }
        </Camera>
        { this._getViewportSlot() }
      </Viewport>
    );
  }
}

interface CrossFlicking extends Flicking { }
export default CrossFlicking;

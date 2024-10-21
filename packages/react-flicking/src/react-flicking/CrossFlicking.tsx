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
          // externalRenderer: new ReactRenderer({
          //   reactFlicking: this,
          //   strategy: new NormalRenderingStrategy({
          //     providerCtor: ReactElementProvider
          //   })
          // }),
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
}

interface CrossFlicking extends Flicking { }
export default CrossFlicking;

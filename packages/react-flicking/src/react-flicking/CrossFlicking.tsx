/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";
import ListDiffer from "@egjs/list-differ";
import {
  CrossFlicking as VanillaCrossFlicking,
  NormalRenderingStrategy,
  CrossFlickingEvent,
  HoldStartEvent,
  HoldEndEvent,
  MoveStartEvent,
  MoveEvent,
  MoveEndEvent,
  WillChangeEvent,
  ChangedEvent,
  EVENTS,
  SIDE_EVENTS,
  CrossFlickingOptions,
  FlickingOptions,
} from "@egjs/flicking";

import { DEFAULT_PROPS } from "./consts";
import { FlickingProps } from "./types";
import ReactRenderer, { ReactRendererOptions } from "./ReactRenderer";
import ReactElementProvider from "./ReactElementProvider";
import Flicking from "./Flicking";

export interface CrossFlickingProps extends FlickingProps {
  onSideHoldStart: (e: CrossFlickingEvent<HoldStartEvent<Flicking>>) => any;
  onSideHoldEnd: (e: CrossFlickingEvent<HoldEndEvent<Flicking>>) => any;
  onSideMoveStart: (e: CrossFlickingEvent<MoveStartEvent<Flicking>>) => any;
  onSideMove: (e: CrossFlickingEvent<MoveEvent<Flicking>>) => any;
  onSideMoveEnd: (e: CrossFlickingEvent<MoveEndEvent<Flicking>>) => any;
  onSideWillChange: (e: CrossFlickingEvent<WillChangeEvent<Flicking>>) => any;
  onSideChanged: (e: CrossFlickingEvent<ChangedEvent<Flicking>>) => any;
}

export const CROSSFLICKING_DEFAULT_PROPS: CrossFlickingProps = {
  ...DEFAULT_PROPS,
  onSideHoldStart: (e: CrossFlickingEvent<HoldStartEvent>) => {},
  onSideHoldEnd: (e: CrossFlickingEvent<HoldEndEvent>) => {},
  onSideMoveStart: (e: CrossFlickingEvent<MoveStartEvent>) => {},
  onSideMove: (e: CrossFlickingEvent<MoveEvent>) => {},
  onSideMoveEnd: (e: CrossFlickingEvent<MoveEndEvent>) => {},
  onSideWillChange: (e: CrossFlickingEvent<WillChangeEvent>) => {},
  onSideChanged: (e: CrossFlickingEvent<ChangedEvent>) => {},
};

class CrossFlicking extends Flicking {
  public static defaultProps: CrossFlickingProps = CROSSFLICKING_DEFAULT_PROPS;

  public constructor(
    props: Partial<
      FlickingProps &
        FlickingOptions &
        CrossFlickingOptions &
        CrossFlickingProps
    >
  ) {
    super(props);
  }

  public componentDidMount() {
    const props = this.props as Required<CrossFlickingProps>;
    const rendererOptions: ReactRendererOptions = {
      reactFlicking: this,
      strategy: new NormalRenderingStrategy({
        providerCtor: ReactElementProvider,
      }),
    };

    const flicking = new VanillaCrossFlicking(this._viewportElement, {
      ...props,
      externalRenderer: new ReactRenderer(rendererOptions),
    });

    this._vanillaFlicking = flicking;

    const children = this._getChildren();
    this._jsxDiffer = new ListDiffer(children, (panel) => panel.key!);
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

    this.beforeRender();

    for (const name in props) {
      if (!(name in CROSSFLICKING_DEFAULT_PROPS) && !(name in VanillaCrossFlicking.prototype)) {
        attributes[name] = props[name];
      }
    }

    const { viewportClasses, cameraClasses, cameraProps } = this._getClasses(attributes, props);

    const panels = this._getPanels();

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

  protected _bindEvents() {
    super._bindEvents();

    Object.keys(SIDE_EVENTS).forEach((eventKey: keyof typeof EVENTS) => {
      const eventName = SIDE_EVENTS[eventKey];
      this._bindEvent(eventName);
    });
  }
}

interface CrossFlicking extends Flicking {}
export default CrossFlicking;

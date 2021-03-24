/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";
import { ComponentEvent } from "@egjs/component";

import Flicking from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import Panel from "~/core/Panel";
import AxesController from "~/control/AxesController";
import { DIRECTION, EVENTS } from "~/const/external";
import * as ERROR from "~/const/error";
import { getDirection, getFlickingAttached } from "~/utils";

/**
 * A component that manages inputs and animation of Flicking
 * @ko Flicking의 입력 장치 & 애니메이션을 담당하는 컴포넌트
 */
abstract class Control {
  // Internal States
  protected _flicking: Flicking | null;
  protected _controller: AxesController;
  protected _activePanel: Panel | null;

  public get controller() { return this._controller; }
  public get activeIndex() { return this._activePanel?.index ?? -1; }
  public get activePanel() { return this._activePanel; }
  public get animating() { return this._controller.state.animating; }
  public get holding() { return this._controller.state.holding; }

  /**
   *
   */
  public constructor() {
    this._flicking = null;
    this._controller = new AxesController();
    this._activePanel = null;
  }

  public abstract moveToPosition(position: number, duration: number, axesEvent?: OnRelease): Promise<void>;

  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._controller.init(flicking);

    return this;
  }

  public destroy(): this {
    this._controller.destroy();

    this._flicking = null;
    this._activePanel = null;

    return this;
  }

  public enable(): this {
    this._controller.enable();

    return this;
  }

  public disable(): this {
    this._controller.disable();

    return this;
  }

  public updateInput(): this {
    this._controller.update();

    return this;
  }

  public resetActivePanel(): this {
    this._activePanel = null;

    return this;
  }

  public async moveToPanel(panel: Panel, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const camera = flicking.camera;

    let position = panel.position;

    if (!camera.canReach(panel)) {
      const nearestAnchor = camera.findNearestAnchor(position);

      if (panel.removed || !nearestAnchor) {
        return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(panel.position), ERROR.CODE.POSITION_NOT_REACHABLE));
      }

      // Override position & panel if that panel is not reachable
      position = nearestAnchor.position;
      panel = nearestAnchor.panel;
    }

    this._triggerIndexChangeEvent(panel, panel.position, axesEvent);

    return this._animateToPosition({ position, duration, newActivePanel: panel, axesEvent });
  }

  protected _triggerIndexChangeEvent(panel: Panel, position: number, axesEvent?: OnRelease): void {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const triggeringEvent = panel !== this._activePanel ? EVENTS.WILL_CHANGE : EVENTS.WILL_RESTORE;
    const camera = flicking.camera;
    const activePanel = this._activePanel;

    const event = new ComponentEvent(triggeringEvent, {
      index: panel.index,
      panel,
      isTrusted: axesEvent?.isTrusted || false,
      direction: getDirection(activePanel?.position ?? camera.position, position)
    });
    flicking.trigger(event);

    if (event.isCanceled()) {
      throw new FlickingError(ERROR.MESSAGE.STOP_CALLED_BY_USER, ERROR.CODE.STOP_CALLED_BY_USER);
    }
  }

  protected async _animateToPosition({
    position,
    duration,
    newActivePanel,
    axesEvent
  }: {
    position: number;
    duration: number;
    newActivePanel: Panel;
    axesEvent?: OnRelease;
  }) {
    const currentPanel = this._activePanel;
    const animate = () => this._controller.animateTo(position, duration, axesEvent);
    const isTrusted = axesEvent?.isTrusted || false;

    if (duration === 0) {
      this._setActivePanel(newActivePanel, currentPanel, isTrusted);
      return animate();
    } else {
      return animate().then(() => this._setActivePanel(newActivePanel, currentPanel, isTrusted));
    }
  }

  protected _setActivePanel = (newActivePanel: Panel, prevActivePanel: Panel | null, isTrusted: boolean) => {
    const flicking = getFlickingAttached(this._flicking, "Control");
    this._activePanel = newActivePanel;

    if (newActivePanel !== prevActivePanel) {
      flicking.trigger(new ComponentEvent(EVENTS.CHANGED, {
        index: newActivePanel.index,
        prevIndex: prevActivePanel?.index ?? -1,
        isTrusted,
        direction: prevActivePanel ? getDirection(prevActivePanel.position, newActivePanel.position) : DIRECTION.NONE
      }));
    } else {
      flicking.trigger(new ComponentEvent(EVENTS.RESTORED, {
        isTrusted
      }));
    }
  };
}

export default Control;

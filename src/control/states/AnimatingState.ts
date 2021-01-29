/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import State from "~/control/states/State";
import { STATE_TYPE } from "~/control/StateMachine";
import { EVENTS } from "~/const/external";
import { getDirection } from "~/utils";

class AnimatingState extends State {
  public readonly holding = false;
  public readonly playing = true;

  public onHold(ctx: Parameters<State["onHold"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    const isSuccess = flicking.trigger(EVENTS.HOLD_START, {
      axesEvent
    });

    if (isSuccess) {
      transitTo(STATE_TYPE.DRAGGING);
    } else {
      transitTo(STATE_TYPE.DISABLED);
    }
  }

  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    if (!axesEvent.delta.flick) {
      return;
    }

    const camera = flicking.getCamera();
    const prevPosition = camera.getPosition();

    camera.lookAt(axesEvent.pos.flick);

    const isSuccess = flicking.trigger(EVENTS.MOVE, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(0, axesEvent.delta.flick),
      axesEvent
    });

    if (!isSuccess) {
      // Return to previous position
      flicking.getCamera().lookAt(prevPosition);
      transitTo(STATE_TYPE.DISABLED);
    }
  }

  public onFinish(ctx: Parameters<State["onFinish"]>[0]) {
    const { flicking, axesEvent, transitTo } = ctx;

    // if (viewport.options.bound) {
    //   viewport.setCurrentPanel(this.targetPanel as Panel);
    // } else {
    //   viewport.setCurrentPanel(viewport.getNearestPanel() as Panel);
    // }

    const panelBelow = flicking.getCamera().getPanelBelow();
    if (flicking.isAdaptive() && panelBelow) {
      const panelSize = panelBelow.getSize();
      flicking.getViewport().setSize({ height: panelSize.height });
    }

    transitTo(STATE_TYPE.IDLE);

    const controller = flicking.getControl().getController();
    const animatingContext = controller.getAnimatingContext();

    flicking.trigger(EVENTS.MOVE_END, {
      isTrusted: axesEvent.isTrusted,
      direction: getDirection(animatingContext.start, animatingContext.end),
      axesEvent
    });
  }
}

export default AnimatingState;

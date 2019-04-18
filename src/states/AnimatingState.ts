import State from "./State";
import { STATE_TYPE, EVENTS } from "../consts";
import { FlickingContext } from "../types";

class AnimatingState extends State {
  public readonly type = STATE_TYPE.ANIMATING;
  public readonly holding = false;
  public readonly playing = true;

  public onEnter(e: any): void {
    super.onEnter(e);
    this.delta = 0;
  }

  public onHold(e: any, { viewport, triggerEvent, transitTo }: FlickingContext): void {
    // Update current panel as current nearest panel
    this.lastPosition = viewport.getCameraPosition();
    viewport.setCurrentPanel(viewport.getNearestPanel()!);
    triggerEvent(EVENTS.HOLD_START, e, true)
      .onSuccess(() => {
        transitTo(STATE_TYPE.DRAGGING);
      })
      .onStopped(() => {
        transitTo(STATE_TYPE.DISABLED);
      });
  }

  public onChange(e: any, { moveCamera, transitTo }: FlickingContext): void {
    if (!e.delta.flick) {
      return;
    }

    moveCamera(e)
      .onStopped(() => {
        transitTo(STATE_TYPE.DISABLED);
      });
  }

  public onFinish(e: any, { flicking, viewport, triggerEvent, transitTo }: FlickingContext) {
    const isTrusted = e && e.isTrusted;

    viewport.options.bound
      ? viewport.setCurrentPanel(this.targetPanel!)
      : viewport.setCurrentPanel(viewport.getNearestPanel()!);
    transitTo(STATE_TYPE.IDLE);
    triggerEvent(EVENTS.MOVE_END, e, isTrusted, {
      direction: this.direction,
    });

    if (flicking.options.adaptive) {
      viewport.updateAdaptiveSize();
    }
  }
}

export default AnimatingState;

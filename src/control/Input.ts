import Axes, { AxesEvents, PanInput } from "@egjs/axes";

import Flicking from "~/Flicking";
import StateMachine from "~/control/StateMachine";
import { AXES_EVENTS } from "~/consts";

class Input {
  private _axes: Axes;
  private _panInput: PanInput;
  private _stateMachine: StateMachine;

  public init(flicking: Flicking): this {
    this._axes = new Axes({
      flick: {
        range: [0, 0],
        circular: flicking.isCircular(),
        bounce: [0, 0]
      }
    }, {
      easing: flicking.getEasing(),
      deceleration: flicking.getDeceleration(),
      interruptable: true
    });

    this._panInput = new PanInput(flicking.getViewport().getElement(), {
      inputType: flicking.getInputType(),
      iOSEdgeSwipeThreshold: flicking.getIOSEdgeSwipeThreshold(),
      scale: flicking.isHorizontal() ? [-1, 0] : [0, -1]
    });

    this._axes.connect(flicking.isHorizontal() ? ["flick", ""] : ["", "flick"], this._panInput);

    this._stateMachine = new StateMachine({ flicking });

    const handlers = {};
    for (const key in AXES_EVENTS) {
      const eventType = AXES_EVENTS[key] as string;

      handlers[eventType] = (e: any) => this._stateMachine.fire(eventType as keyof AxesEvents, e);
    }

    return this;
  }

  public destroy(): this {
    this._panInput.destroy();
    this._axes.destroy();
    return this;
  }
}

export default Input;

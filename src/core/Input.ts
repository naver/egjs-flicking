import Axes, { PanInput } from "@egjs/axes";
import { AXES_EVENTS } from "~/consts";
import Flicking from "~/Flicking";
import StateMachine from "./StateMachine";

class Input {
  private _axes: Axes;
  private _panInput: PanInput;
  private _stateMachine: StateMachine;

  public constructor() {
    const options = flicking.options;

    this._axes = new Axes({
      flick: {
        range: [0, 0],
        circular: options.circular,
        bounce: [0, 0]
      }
    }, {
      easing: options.panelEffect,
      deceleration: options.deceleration,
      interruptable: true
    });

    this._panInput = new PanInput(flicking.getViewport().getElement(), {
      inputType: options.inputType,
      thresholdAngle: options.thresholdAngle,
      iOSEdgeSwipeThreshold: options.iOSEdgeSwipeThreshold,
      scale: options.horizontal ? [-1, 0] : [0, -1]
    });

    this._axes.connect(options.horizontal ? ["flick", ""] : ["", "flick"], this._panInput);

    this._stateMachine = new StateMachine();

    const handlers = {};
    for (const key in AXES_EVENTS) {
      if (key) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const eventType = AXES_EVENTS[key];

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        handlers[eventType] = (e: any) => this._stateMachine.fire(eventType, e);
      }
    }
  }
}

export default Input;

import Axes, { AxesEvents, PanInput } from "@egjs/axes";

import Flicking from "~/Flicking";
import StateMachine, { STATE_TYPE } from "~/control/StateMachine";
import { AXES_EVENTS } from "~/consts";
import { parseBounce } from "~/utils";

class Input {
  private _flicking: Flicking | null;
  private _axes: Axes;
  private _panInput: PanInput;
  private _stateMachine: StateMachine;

  public constructor() {
    this._flicking = null;
  }

  public init(flicking: Flicking): this {
    this._flicking = flicking;

    this._reinit();

    this._stateMachine = new StateMachine({ flicking });

    return this;
  }

  public destroy(): this {
    this._flicking = null;
    this._panInput.destroy();
    this._axes.destroy();
    this._stateMachine.transitTo(STATE_TYPE.IDLE);
    return this;
  }

  public getStateMachine() { return this._stateMachine; }

  public updateRange(range: { min: number; max: number }) {
    this._axes.axis.flick.range = [range.min, range.max];
  }

  public animateTo(position: number, duration: number): Promise<void> {
    const axes = this._axes;
    axes.setTo({ flick: position }, duration);

    return new Promise(resolve => {
      axes.once("finish", () => resolve());
    });
  }

  public stop() {
    this._reinit();
  }

  private _reinit() {
    const flicking = this._flicking;

    if (!flicking) {
      return;
    }

    const viewportSize = flicking.getViewport().getSize();
    const cameraRange = flicking.getCamera().getRange();
    let prevPos = 0;

    if (this._axes) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      prevPos = (this._axes.axm as any)._pos.flick as number;
      this._axes.destroy();
    }

    if (this._panInput) {
      this._panInput.destroy();
    }

    this._axes = new Axes({
      flick: {
        range: [cameraRange.min, cameraRange.max],
        circular: flicking.isCircular(),
        bounce: parseBounce(flicking.getBounce(), flicking.isHorizontal() ? viewportSize.width : viewportSize.height)
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

    this._axes.setTo({ flick: prevPos }, 0);

    for (const key in AXES_EVENTS) {
      const eventType = AXES_EVENTS[key] as keyof AxesEvents;

      this._axes.on(eventType, e => this._stateMachine.fire(eventType, e));
    }
  }
}

export default Input;

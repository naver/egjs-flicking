import State from "./State";
import { STATE_TYPE } from "../consts";
import { FlickingContext } from "../types";

class DisabledState extends State {
  public readonly type = STATE_TYPE.DISABLED;
  public readonly holding = false;
  public readonly playing = true;

  public onAnimationEnd(e: any, { transitTo }: FlickingContext): void {
    transitTo(STATE_TYPE.IDLE);
  }

  public onRelease(e: any, { transitTo }: FlickingContext): void {
    // This is needed when stopped hold start event
    if (e.delta.flick === 0) {
      transitTo(STATE_TYPE.IDLE);
    }
  }
}

export default DisabledState;

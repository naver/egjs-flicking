/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import type { OnAnimationEnd, OnChange, OnRelease } from "@egjs/axes";
import State from "./State";
import { STATE_TYPE } from "../consts";
import { FlickingContext } from "../types";

class DisabledState extends State {
  public readonly type = STATE_TYPE.DISABLED;
  public readonly holding = false;
  public readonly playing = true;

  public onAnimationEnd(e: OnAnimationEnd, { transitTo }: FlickingContext): void {
    transitTo(STATE_TYPE.IDLE);
  }

  public onChange(e: OnChange, { viewport, transitTo }: FlickingContext): void {
    // Can stop Axes's change event
    e.stop();

    // Should update axes position as it's already changed at this moment
    viewport.updateAxesPosition(viewport.getCameraPosition());
    transitTo(STATE_TYPE.IDLE);
  }

  public onRelease(e: OnRelease, { transitTo }: FlickingContext): void {
    // This is needed when stopped hold start event
    if (e.delta.flick === 0) {
      transitTo(STATE_TYPE.IDLE);
    }
  }
}

export default DisabledState;

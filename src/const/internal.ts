export const AXES_EVENT: {
  HOLD: "hold";
  CHANGE: "change";
  RELEASE: "release";
  ANIMATION_END: "animationEnd";
  FINISH: "finish";
} = {
  HOLD: "hold",
  CHANGE: "change",
  RELEASE: "release",
  ANIMATION_END: "animationEnd",
  FINISH: "finish"
};

export enum STATE_TYPE {
  IDLE,
  HOLDING,
  DRAGGING,
  ANIMATING,
  DISABLED
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import AxesController from "./AxesController";
import Control from "./Control";
import FreeControl, { FreeControlOptions } from "./FreeControl";
import SnapControl, { SnapControlOptions } from "./SnapControl";
import StateMachine from "./StateMachine";
import StrictControl, { StrictControlOptions } from "./StrictControl";
import AnimatingState from "./states/AnimatingState";
import DisabledState from "./states/DisabledState";
import DraggingState from "./states/DraggingState";
import HoldingState from "./states/HoldingState";
import IdleState from "./states/IdleState";
import State from "./states/State";

export {
  Control,
  SnapControl,
  FreeControl,
  StrictControl,
  AxesController,
  State,
  IdleState,
  HoldingState,
  DraggingState,
  AnimatingState,
  DisabledState,
  StateMachine
};

export type { SnapControlOptions, FreeControlOptions, StrictControlOptions };

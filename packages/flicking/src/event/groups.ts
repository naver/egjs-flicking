/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Event groups for documentation purposes.
 * These interfaces are not used at runtime but serve as centralized documentation
 * for events fired by related methods.
 */

import type {
  AfterResizeEvent,
  BeforeResizeEvent,
  ChangedEvent,
  MoveEndEvent,
  MoveEvent,
  MoveStartEvent,
  NeedPanelEvent,
  ReachEdgeEvent,
  RestoredEvent,
  VisibleChangeEvent,
  WillChangeEvent,
  WillRestoreEvent
} from "./types";

/**
 * Events fired during panel movement operations (prev, next, moveTo).
 */
export interface MovementEvents {
  /** see {@link WillChangeEvent} */
  willChange: WillChangeEvent;
  /** see {@link ChangedEvent} */
  changed: ChangedEvent;
  /** see {@link WillRestoreEvent} */
  willRestore: WillRestoreEvent;
  /** see {@link RestoredEvent} */
  restored: RestoredEvent;
  /** see {@link MoveStartEvent} */
  moveStart: MoveStartEvent;
  /** see {@link MoveEvent} */
  move: MoveEvent;
  /** see {@link MoveEndEvent} */
  moveEnd: MoveEndEvent;
  /** see {@link NeedPanelEvent} */
  needPanel: NeedPanelEvent;
  /** see {@link VisibleChangeEvent} */
  visibleChange: VisibleChangeEvent;
  /** see {@link ReachEdgeEvent} */
  reachEdge: ReachEdgeEvent;
}

/**
 * Events fired during resize operations.
 */
export interface ResizeEvents {
  /** see {@link BeforeResizeEvent} */
  beforeResize: BeforeResizeEvent;
  /** see {@link AfterResizeEvent} */
  afterResize: AfterResizeEvent;
}

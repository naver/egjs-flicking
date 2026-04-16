/* eslint-disable @typescript-eslint/ban-types */
/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnChange, OnFinish, OnHold, OnRelease } from "@egjs/axes";
import { ComponentEvent } from "@egjs/component";
import { DIRECTION } from "../constants/values";
import Panel from "../core/panel/Panel";
import Flicking from "../Flicking";
import { ValueOf } from "../types/internal";

import { EVENTS } from "./names";

/**
 * Events of the Flicking component.
 * @privateRemarks
 * This interface is crucial as it maps event names to their actual event interfaces.
 * It is also functionally important because it is registered as the event generic parameter of Component, which is Flicking's parent class.
 */
export interface FlickingEvents {
  /**
   * Event that fires when Flicking's {@link Flicking.init | init()} is called.
   * @remarks
   * See {@link ReadyEvent} for more details.
   */
  [EVENTS.READY]: ReadyEvent;
  /**
   * Event that fires when Flicking's {@link Flicking.resize} is called, before updating the sizes of panels and viewport.
   * @remarks
   * See {@link BeforeResizeEvent} for more details.
   */
  [EVENTS.BEFORE_RESIZE]: BeforeResizeEvent;
  /**
   * Event that fires when Flicking's {@link Flicking.resize} is called, after updating the sizes of panels and viewport.
   * @remarks
   * See {@link AfterResizeEvent} for more details.
   */
  [EVENTS.AFTER_RESIZE]: AfterResizeEvent;
  /**
   * Event that fires when user started dragging.
   * @remarks
   * See {@link HoldStartEvent} for more details.
   */
  [EVENTS.HOLD_START]: HoldStartEvent;
  /**
   * Event that fires when user stopped dragging.
   * @remarks
   * See {@link HoldEndEvent} for more details.
   */
  [EVENTS.HOLD_END]: HoldEndEvent;
  /**
   * Event that fires once before first {@link Flicking.event:move | move} event.
   * @remarks
   * See {@link MoveStartEvent} for more details.
   */
  [EVENTS.MOVE_START]: MoveStartEvent;
  /**
   * Event that fires for every movement.
   * @remarks
   * See {@link MoveEvent} for more details.
   */
  [EVENTS.MOVE]: MoveEvent;
  /**
   * Event that fires when the movement is finished by user input release or animation end.
   * @remarks
   * See {@link MoveEndEvent} for more details.
   */
  [EVENTS.MOVE_END]: MoveEndEvent;
  /**
   * Event that fires BEFORE the active panel changes.
   * @remarks
   * See {@link WillChangeEvent} for more details.
   */
  [EVENTS.WILL_CHANGE]: WillChangeEvent;
  /**
   * Event that fires AFTER the active panel change completes.
   * @remarks
   * See {@link ChangedEvent} for more details.
   */
  [EVENTS.CHANGED]: ChangedEvent;
  /**
   * Event fires BEFORE returning to the current panel when drag doesn't reach threshold.
   * @remarks
   * See {@link WillRestoreEvent} for more details.
   */
  [EVENTS.WILL_RESTORE]: WillRestoreEvent;
  /**
   * Event that fires AFTER Flicking has returned to {@link Flicking.currentPanel | currentPanel}.
   * @remarks
   * See {@link RestoredEvent} for more details.
   */
  [EVENTS.RESTORED]: RestoredEvent;
  /**
   * Event that fires when panel is statically click / touched.
   * @remarks
   * See {@link SelectEvent} for more details.
   */
  [EVENTS.SELECT]: SelectEvent;
  /**
   * Event that fires when an empty panel area is visible at the edge of viewport.
   * @remarks
   * See {@link NeedPanelEvent} for more details.
   */
  [EVENTS.NEED_PANEL]: NeedPanelEvent;
  /**
   * Event that fires when visible panel inside the viewport changes.
   * @remarks
   * See {@link VisibleChangeEvent} for more details.
   */
  [EVENTS.VISIBLE_CHANGE]: VisibleChangeEvent;
  /**
   * Event that fires when camera reaches the maximum/minimum range.
   * @remarks
   * See {@link ReachEdgeEvent} for more details.
   */
  [EVENTS.REACH_EDGE]: ReachEdgeEvent;
  /**
   * Event that fires when a panel is added or removed.
   * @since 4.1.0
   * @remarks
   * See {@link PanelChangeEvent} for more details.
   */
  [EVENTS.PANEL_CHANGE]: PanelChangeEvent;
}

/**
 * Event that fires when Flicking's {@link Flicking.init | init()} is called
 */
export type ReadyEvent<T extends Flicking = Flicking> = ComponentEvent<{}, (typeof EVENTS)["READY"], T>;

/**
 * Event that fires when Flicking's {@link Flicking.resize} is called, before updating the sizes of panels and viewport.
 * @remarks
 * You can update the sizes of panels and viewport with this event, and it'll be applied after {@link Flicking.resize} is finished.
 */
export interface BeforeResizeEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["BEFORE_RESIZE"], T> {
  /** Previous width of the viewport */
  width: number;
  /** Previous height of the viewport */
  height: number;
  /** The viewport element */
  element: HTMLElement;
}

/**
 * Event that fires when Flicking's {@link Flicking.resize} is called, after updating the sizes of panels and viewport.
 */
export interface AfterResizeEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["AFTER_RESIZE"], T> {
  /** New width of the viewport */
  width: number;
  /** New height of the viewport */
  height: number;
  /** Previous size of the viewport */
  prev: {
    /** Previous width of the viewport */
    width: number;
    /** Previous height of the viewport */
    height: number;
  };
  /** A Boolean value indicating whether the width/height of the viewport element is changed */
  sizeChanged: boolean;
  /** The viewport element */
  element: HTMLElement;
}

/**
 * Event that fires when user started dragging.
 */
export interface HoldStartEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["HOLD_START"], T> {
  /** {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-hold | hold} event of {@link https://naver.github.io/egjs-axes/ | Axes} */
  axesEvent: OnHold;
}

/**
 * Event that fires when user stopped dragging.
 */
export interface HoldEndEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["HOLD_END"], T> {
  /** {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-release | release} event of {@link https://naver.github.io/egjs-axes/ | Axes} */
  axesEvent: OnRelease;
}

/**
 * Event that fires once before first {@link Flicking.event:move | move} event
 */
export interface MoveStartEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["MOVE_START"], T> {
  /** Boolean that indicates whether the event was generated by a user action */
  isTrusted: boolean;
  /** Boolean that indicates whether the user is dragging the viewport element */
  holding: boolean;
  /** Moving direction relative to previous position of the camera */
  direction: ValueOf<typeof DIRECTION>;
  /** {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-change | change} event of {@link https://naver.github.io/egjs-axes/ | Axes} */
  axesEvent: OnChange;
}

/**
 * Event that fires for every movement
 */
export interface MoveEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, (typeof EVENTS)["MOVE"], T> {
  /** Boolean that indicates whether the event was generated by a user action */
  isTrusted: boolean;
  /** Boolean that indicates whether the user is dragging the viewport element */
  holding: boolean;
  /** Moving direction relative to previous position of the camera */
  direction: ValueOf<typeof DIRECTION>;
  /** {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-change | change} event of {@link https://naver.github.io/egjs-axes/ | Axes} */
  axesEvent: OnChange;
}

/**
 * Event that fires when the movement is finished by user input release or animation end.
 */
export interface MoveEndEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["MOVE_END"], T> {
  /** Boolean that indicates whether the event was generated by a user action */
  isTrusted: boolean;
  /** Moving direction relative to previous position of the camera */
  direction: ValueOf<typeof DIRECTION>;
  /** {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-finish | finish} event of {@link https://naver.github.io/egjs-axes/ | Axes} */
  axesEvent: OnFinish;
}

/**
 * Event that fires BEFORE the active panel changes.
 * @remarks
 * Index will be changed at the {@link ChangedEvent | changed} event.
 * It can be triggered when user finished input, or flicking start to move by method.
 * Calling `stop()` in event will prevent index change and camera movement.
 * @see {@link ChangedEvent} - Fired AFTER the panel change completes
 */
export interface WillChangeEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["WILL_CHANGE"], T> {
  /** New active index */
  index: number;
  /** New active panel */
  panel: Panel;
  /** Boolean that indicates whether the event was generated by a user action */
  isTrusted: boolean;
  /** Moving direction from the active panel to the target panel */
  direction: ValueOf<typeof DIRECTION>;
}

/**
 * Event that fires AFTER the active panel change completes.
 * @remarks
 * This event fires after the panel movement animation finishes and the index is updated.
 * @see {@link WillChangeEvent} - Fired BEFORE the panel change starts
 */
export interface ChangedEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, (typeof EVENTS)["CHANGED"], T> {
  /** New index */
  index: number;
  /** New active panel */
  panel: Panel;
  /** Previous index */
  prevIndex: number;
  /** Previous active panel */
  prevPanel: Panel | null;
  /** Boolean that indicates whether the event was generated by a user action */
  isTrusted: boolean;
  /** Moving direction from the active panel to the target panel */
  direction: ValueOf<typeof DIRECTION>;
}

/**
 * Event fires BEFORE returning to the current panel when drag doesn't reach threshold.
 * @remarks
 * Fired when user drag amount does not reach {@link Flicking.threshold | threshold} and the camera starts returning to {@link Flicking.currentPanel | currentPanel}.
 * @see {@link RestoredEvent} - Fired AFTER restoration completes
 */
export interface WillRestoreEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["WILL_RESTORE"], T> {
  /** Index of the panel to restore */
  index: number;
  /** Panel to restore */
  panel: Panel;
  /** Boolean that indicates whether the event was generated by a user action */
  isTrusted: boolean;
  /** Moving direction relative to previous position of the camera */
  direction: ValueOf<typeof DIRECTION>;
}

/**
 * Event that fires AFTER Flicking has returned to {@link Flicking.currentPanel | currentPanel}.
 * @remarks
 * Fired after the restoration animation completes and the camera has returned to the current panel.
 * @see {@link WillRestoreEvent} - Fired BEFORE restoration starts
 */
export interface RestoredEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["RESTORED"], T> {
  /** Boolean that indicates whether the event was generated by a user action */
  isTrusted: boolean;
}

/**
 * Event that fires when panel is statically click / touched
 */
export interface SelectEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, (typeof EVENTS)["SELECT"], T> {
  /** Selected panel's index */
  index: number;
  /** Selected panel */
  panel: Panel;
  /** Direction from current camera position to the selected panel's position */
  direction: ValueOf<typeof DIRECTION> | null;
}

/**
 * Event that fires when an empty panel area is visible at the edge of viewport
 * @remarks
 * You can set its threshold with {@link Flicking.needPanelThreshold | needPanelThreshold}
 */
export interface NeedPanelEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["NEED_PANEL"], T> {
  /** Direction where new panel is needed. `DIRECTION.PREV` means panels should be {@link Flicking.prepend | prepend}ed and `DIRECTION.NEXT` means panels should be {@link Flicking.append | append}ed */
  direction: Exclude<ValueOf<typeof DIRECTION>, null>;
}

/**
 * Event that fires when visible panel inside the viewport changes
 */
export interface VisibleChangeEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["VISIBLE_CHANGE"], T> {
  /** Panels that added from previous visible panels */
  added: Panel[];
  /** Panels that removed from previous visible panels */
  removed: Panel[];
  /** Current visible panels */
  visiblePanels: Panel[];
}

/**
 * Event that fires when camera reaches the maximum/minimum range
 */
export interface ReachEdgeEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["REACH_EDGE"], T> {
  /** Direction indicates whether the camera's position is at the maximum range({@link DIRECTION | DIRECTION.NEXT}) or minimum range({@link DIRECTION | DIRECTION.PREV}) */
  direction: ValueOf<typeof DIRECTION>;
}

/**
 * Event that fires when a panel is added or removed
 * @since 4.1.0
 */
export interface PanelChangeEvent<T extends Flicking = Flicking>
  extends ComponentEvent<{}, (typeof EVENTS)["PANEL_CHANGE"], T> {
  /** An array of new panels added */
  added: Panel[];
  /** An array of panels removed */
  removed: Panel[];
}

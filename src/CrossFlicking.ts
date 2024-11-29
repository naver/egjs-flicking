/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";
import { EventKey } from "@egjs/component/declaration/types";

import Flicking, { FlickingEvents, FlickingOptions } from "./Flicking";
import {
  ChangedEvent,
  HoldEndEvent,
  HoldStartEvent,
  MoveEndEvent,
  MoveEvent,
  MoveStartEvent,
  RestoredEvent,
  WillChangeEvent,
  WillRestoreEvent
} from "./type/event";
import { LiteralUnion, ValueOf } from "./type/internal";
import { CLASS, EVENTS, MOVE_DIRECTION } from "./const/external";
import { getDataAttributes, includes, toArray } from "./utils";

export const SIDE_EVENTS = {
  HOLD_START: "sideHoldStart",
  HOLD_END: "sideHoldEnd",
  MOVE_START: "sideMoveStart",
  MOVE: "sideMove",
  MOVE_END: "sideMoveEnd",
  WILL_CHANGE: "sideWillChange",
  CHANGED: "sideChanged",
  WILL_RESTORE: "sideWillRestore",
  RESTORED: "sideRestored"
} as const;

export type CrossFlickingEvent<T> = { mainIndex: number } & T;

export interface CrossFlickingEvents extends FlickingEvents {
  [SIDE_EVENTS.HOLD_START]: CrossFlickingEvent<HoldStartEvent>;
  [SIDE_EVENTS.HOLD_END]: CrossFlickingEvent<HoldEndEvent>;
  [SIDE_EVENTS.MOVE_START]: CrossFlickingEvent<MoveStartEvent>;
  [SIDE_EVENTS.MOVE]: CrossFlickingEvent<MoveEvent>;
  [SIDE_EVENTS.MOVE_END]: CrossFlickingEvent<MoveEndEvent>;
  [SIDE_EVENTS.WILL_CHANGE]: CrossFlickingEvent<WillChangeEvent>;
  [SIDE_EVENTS.CHANGED]: CrossFlickingEvent<ChangedEvent>;
  [SIDE_EVENTS.WILL_RESTORE]: CrossFlickingEvent<WillRestoreEvent>;
  [SIDE_EVENTS.RESTORED]: CrossFlickingEvent<RestoredEvent>;
}

export interface CrossFlickingOptions extends FlickingOptions {
  sideOptions: Partial<FlickingOptions> | undefined;
  preserveIndex: boolean | undefined;
  disableSlideOnHold: boolean | undefined;
  disableIndexSync: boolean | undefined;
}

export interface SideState {
  key: string;
  start: number;
  end: number;
  element: HTMLElement;
}

export interface CrossFlickingChangedEvent extends ChangedEvent {
  sideIndex?: number;
}

export interface CrossFlickingWillChangeEvent extends WillChangeEvent {
  sideIndex?: number;
}

export class CrossFlicking extends Flicking {
  // Core components
  private _sideFlicking: Flicking[];

  // Options
  private _sideOptions: CrossFlickingOptions["sideOptions"];
  private _preserveIndex: CrossFlickingOptions["preserveIndex"];
  private _disableSlideOnHold: CrossFlickingOptions["disableSlideOnHold"];
  private _disableIndexSync: CrossFlickingOptions["disableIndexSync"];

  // Internal State
  private _sideState: SideState[];
  private _moveDirection: LiteralUnion<ValueOf<typeof MOVE_DIRECTION>> | null;
  private _originalDragThreshold: number;
  private _nextIndex: number;

  // Components
  public get sideFlicking() {
    return this._sideFlicking;
  }

  public get sideIndex() {
    return this._sideFlicking.map(i => i.index);
  }

  public get sideState() {
    return this._sideState;
  }

  // Options Getter
  public get sideOptions() { return this._sideOptions; }

  public get preserveIndex() { return this._preserveIndex; }

  public get disableSlideOnHold() { return this._disableSlideOnHold; }

  public get disableIndexSync() { return this._disableIndexSync; }

  // Options Setter
  public set sideOptions(val: CrossFlickingOptions["sideOptions"]) {
    this._sideOptions = val;
  }

  public set preserveIndex(val: CrossFlickingOptions["preserveIndex"]) {
    this._preserveIndex = val;
  }

  public set disableSlideOnHold(val: CrossFlickingOptions["disableSlideOnHold"]) {
    this._disableSlideOnHold = val;
  }

  public set disableIndexSync(val: CrossFlickingOptions["disableIndexSync"]) {
    this._disableIndexSync = val;
  }

  public constructor(
    root: HTMLElement | string,
    options: Partial<CrossFlickingOptions>
  ) {
    super(root, options);
    const {
      sideOptions = {},
      preserveIndex = true,
      disableSlideOnHold = true,
      disableIndexSync = false
    } = options;

    // Internal states
    this._moveDirection = null;
    this._nextIndex = 0;
    this._originalDragThreshold = this.dragThreshold;

    // Bind options
    this._sideOptions = sideOptions;
    this._preserveIndex = preserveIndex;
    this._disableSlideOnHold = disableSlideOnHold;
    this._disableIndexSync = disableIndexSync;
  }

  public init(): Promise<void> {
    return super.init().then(() => {
      this._sideState = this._createSideState();
      this._sideFlicking = this._createSideFlicking();
      this._addComponentEvents();
    });
  }

  public destroy(): void {
    this._sideFlicking.forEach((flicking) => {
      flicking.destroy();
    });
    super.destroy();
  }

  private _addComponentEvents(): void {
    this.on(EVENTS.HOLD_START, this._onHorizontalHoldStart);
    this.on(EVENTS.MOVE, this._onHorizontalMove);
    this.on(EVENTS.MOVE_END, this._onHorizontalMoveEnd);
    [EVENTS.CHANGED, EVENTS.WILL_CHANGE].forEach((event) => {
      this.on(event, this._addSideIndex);
    });

    this._sideFlicking.forEach((flicking, mainIndex) => {
      flicking.on(EVENTS.HOLD_START, this._onSideHoldStart);
      flicking.on(EVENTS.MOVE, this._onSideMove);
      flicking.on(EVENTS.MOVE_END, this._onSideMoveEnd);
      flicking.on(EVENTS.CHANGED, this._onSideChanged);

      Object.keys(SIDE_EVENTS).forEach((name: EventKey<FlickingEvents>) => {
        flicking.on(EVENTS[name], (event) => {
          this.trigger(
            new ComponentEvent(SIDE_EVENTS[name], {
              mainIndex,
              ...event
            })
          );
        });
      });
    });
  }

  private _createSideState(): SideState[] {
    const viewportEl = this.element;
    const cameraEl = this.camera.element;
    const panels = toArray(cameraEl.children) as HTMLElement[];
    const isCrossStructure = getDataAttributes(
      viewportEl,
      "data-cross-"
    ).structure;
    let sideState: SideState[] = [];

    if (!isCrossStructure) {
      const groupPanels = this._getGroupFromAttribute(panels);
      const groupKeys = Object.keys(groupPanels);

      if (groupKeys.length) {
        sideState = this._getSideStateFromGroup(groupPanels);
        this.remove(0, this.panelCount - groupKeys.length);
      } else {
        sideState = this._getSideStateFromPanels(panels);
      }

      this._createCrossStructure(sideState);
    } else {
      sideState = this._getSideStateFromCrossStructure(panels);
    }

    void this.resize();

    return sideState;
  }

  private _createCrossStructure(sideState: SideState[]) {
    const sideCamera = document.createElement("div");
    let sidePanels: string = "";

    sideCamera.classList.add(CLASS.CAMERA);
    sideState.forEach((state, i) => {
      const panel = this.camera.children[i];
      sidePanels += state.element.innerHTML;
      Array.from(panel.attributes).forEach((attribute) =>
        panel.removeAttribute(attribute.name)
      );
    });

    sideCamera.innerHTML = sidePanels;

    sideState.forEach((_, i) => {
      const panel = this.camera.children[i];
      [CLASS.VIEWPORT, CLASS.VERTICAL].forEach((className) => {
        if (!panel.classList.contains(className)) {
          panel.classList.add(className);
        }
      });
      panel.innerHTML = sideCamera.outerHTML;
    });

    this.element.setAttribute("data-cross-structure", "true");
  }

  private _getGroupFromAttribute(
    panels: HTMLElement[]
  ): Record<string, HTMLElement[]> {
    const groupKeys: string[] = [];
    const groupPanels: Record<string, HTMLElement[]> = {};

    panels.forEach((panel) => {
      const groupKey = getDataAttributes(panel, "data-cross-").groupkey;
      if (groupKey && !includes(groupKeys, groupKey)) {
        groupKeys.push(groupKey);
        groupPanels[groupKey] = [panel];
      } else if (groupKey) {
        groupPanels[groupKey].push(panel);
      }
    });

    return groupPanels;
  }

  private _getSideStateFromGroup(
    groupPanels: Record<string, HTMLElement[]>
  ): SideState[] {
    return Object.keys(groupPanels).reduce(
      (state: SideState[], key: string) => {
        const start = state.length ? +state[state.length - 1].end + 1 : 0;
        const element = groupPanels[key].reduce(
          (el: HTMLElement, panel: HTMLElement) => {
            el.innerHTML += panel.outerHTML;
            return el;
          },
          document.createElement("div")
        );
        return [
          ...state,
          {
            key,
            start,
            end: start + groupPanels[key].length - 1,
            element: element
          }
        ];
      },
      []
    );
  }

  private _getSideStateFromPanels(panels: HTMLElement[]): SideState[] {
    return panels.reduce(
      (state: SideState[], panel: HTMLElement, i: number) => {
        const start = state.length ? +state[state.length - 1].end + 1 : 0;
        return [
          ...state,
          {
            key: i.toString(),
            start,
            end: start + panel.children.length - 1,
            element: panel
          }
        ];
      },
      []
    );
  }

  private _getSideStateFromCrossStructure(panels: HTMLElement[]): SideState[] {
    const groupPanels = this._getGroupFromAttribute(panels);
    return this._getSideStateFromGroup(groupPanels);
  }

  private _createSideFlicking(): Flicking[] {
    return this.sideState.map((state, i) => {
      return new Flicking(this.camera.children[i], {
        ...this.sideOptions,
        horizontal: false,
        panelsPerView: 1,
        defaultIndex: state.start
      });
    });
  }

  private _syncToCategory = (index: number, outerIndex: number): void => {
    if (this._disableIndexSync) {
      return;
    }

    this.stopAnimation();
    this._sideFlicking.forEach((child, i) => {
      const { start, end } = this._sideState[i];

      if (start <= index && end >= index && outerIndex !== i) {
        child.stopAnimation();
        void child.moveTo(index, 0);
        void this.moveTo(i, 0);
      }
    });
  };

  private _setDraggable = (
    direction: ValueOf<typeof MOVE_DIRECTION>,
    draggable: boolean
  ): void => {
    if (!this._disableSlideOnHold) {
      return;
    }

    const dragThreshold = this._originalDragThreshold;
    const threshold = draggable
      ? dragThreshold && dragThreshold >= 10
        ? dragThreshold
        : 10
      : Infinity;

    if ((direction === MOVE_DIRECTION.HORIZONTAL) === this.horizontal) {
      this.dragThreshold = threshold;
    } else if ((direction === MOVE_DIRECTION.VERTICAL) === this.horizontal) {
      this._sideFlicking.forEach((child) => {
        child.dragThreshold = threshold;
      });
    }
  };

  private _setPreviousSideIndex = () => {
    this._sideFlicking.forEach((child, i) => {
      const { start, end } = this._sideState[i];

      if (this._preserveIndex) {
        if (this._nextIndex !== i) {
          if (child.index < start) {
            child.stopAnimation();
            void child.moveTo(start, 0);
          } else if (child.index > end) {
            child.stopAnimation();
            void child.moveTo(end, 0);
          }
        }
      } else {
        if (this._nextIndex !== i) {
          void child.moveTo(start, 0);
        }
      }
    });
  };

  private _addSideIndex = (e: ChangedEvent | WillChangeEvent): void => {
    (e as CrossFlickingChangedEvent | CrossFlickingWillChangeEvent).sideIndex = this._sideFlicking[e.index].index;
  };

  private _onHorizontalHoldStart = (): void => {
    this._setDraggable(MOVE_DIRECTION.HORIZONTAL, true);
    this._moveDirection = null;
  };

  private _onHorizontalMove = (e: MoveEvent): void => {
    if (e.isTrusted && !this._moveDirection) {
      this._setDraggable(MOVE_DIRECTION.VERTICAL, false);
      this._moveDirection = MOVE_DIRECTION.HORIZONTAL;
    }
  };

  private _onHorizontalMoveEnd = (e: MoveEndEvent): void => {
    const visiblePanels = this.visiblePanels;

    if (visiblePanels.length > 1) {
      this._nextIndex =
        e.direction === "NEXT"
          ? visiblePanels[1].index
          : visiblePanels[0].index;
    } else {
      this._nextIndex = visiblePanels[0].index;
    }

    this._setDraggable(MOVE_DIRECTION.VERTICAL, true);
    this._moveDirection = null;

    // _syncToCategory에서 완전히 가로 이동이 이루어지기 전에 세로 방향 index가 변하는 경우가 있어 requestAnimationFrame 처리
    requestAnimationFrame(() => this._setPreviousSideIndex());

    if (e.isTrusted) {
      this._syncToCategory(
        this._sideFlicking[this._nextIndex].index,
        this._nextIndex
      );
    }
  };

  private _onSideHoldStart = (): void => {
    this._setDraggable(MOVE_DIRECTION.VERTICAL, true);
    this._moveDirection = null;
  };

  private _onSideMove = (e: MoveEvent): void => {
    if (e.isTrusted && !this._moveDirection) {
      this._setDraggable(MOVE_DIRECTION.HORIZONTAL, false);
      this._moveDirection = MOVE_DIRECTION.VERTICAL;
    }
  };

  private _onSideMoveEnd = (): void => {
    this._setDraggable(MOVE_DIRECTION.HORIZONTAL, true);
    this._moveDirection = null;
  };

  private _onSideChanged = (e: ChangedEvent): void => {
    // If this.visiblePanels.length >= 2, it means that horizontal flicking is being dragged.
    // In this case, syncToCategory in _onHorizontalMoveEnd will fire after moving finishes, so we don't fire it here.
    if (
      this.visiblePanels.length < 2 &&
      this._sideFlicking[this.index] === e.currentTarget
    ) {
      this._syncToCategory(e.index, this.index);
    }
  };
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Flicking, { FlickingOptions } from "./Flicking";
import { ChangedEvent, MoveEndEvent, MoveEvent } from "./type/event";
import { LiteralUnion, ValueOf } from "./type/internal";
import { CLASS, EVENTS, MOVE_DIRECTION } from "./const/external";
import { getDataAttributes, includes, toArray } from "./utils";

export interface CrossFlickingEvents {
  // FlickingEvent 들을 확장하자...
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
  private _nextIndex: number;

  // Components
  public get sideFlicking() {
    return this._sideFlicking;
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
    options: Partial<CrossFlickingOptions> = {
      sideOptions: {},
      preserveIndex: false,
      disableSlideOnHold: false,
      disableIndexSync: false,
    }
  ) {
    super(root, options);

    // Internal states
    this._sideState = this._createSideState();
    this._moveDirection = null;
    this._nextIndex = 0;

    // Bind options
    this._sideOptions = options.sideOptions;
    this._preserveIndex = options.preserveIndex;
    this._disableSlideOnHold = options.disableSlideOnHold;
    this._disableIndexSync = options.disableIndexSync;

    // Create core components
    this._sideFlicking = this._createSideFlicking();
  }

  public init(): Promise<void> {
    return super.init().then(() => this._addComponentEvents());
  }

  public destroy(): void {
    // TODO 모든 child flicking destroy
    super.destroy();
  }

  private _addComponentEvents(): void {
    this.on(EVENTS.HOLD_START, this._onHorizontalHoldStart);
    this.on(EVENTS.MOVE, this._onHorizontalMove);
    this.on(EVENTS.MOVE_END, this._onHorizontalMoveEnd);

    this._sideFlicking.forEach((flicking) => {
      flicking.on(EVENTS.HOLD_START, this._onSideHoldStart);
      flicking.on(EVENTS.MOVE, this._onSideMove);
      flicking.on(EVENTS.MOVE_END, this._onSideMoveEnd);
      flicking.on(EVENTS.CHANGED, this._onSideChanged);
    });
  }

  private _getGroupFromAttribute(panels: HTMLElement[]): Record<string, HTMLElement[]> {
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

  private _createSideState(): SideState[] {
    const viewportEl = this.element;
    const cameraEl = this.camera.element;
    const panels = toArray(cameraEl.children) as HTMLElement[];
    let sideState: SideState[] = [];
    let sidePanels: string = "";

    // check data attribute exists
    const sideCamera = document.createElement("div");
    sideCamera.classList.add(CLASS.CAMERA);

    const isCrossStructure = getDataAttributes(viewportEl, "data-cross-").structure;

    if (!isCrossStructure) {
      viewportEl.setAttribute("data-cross-structure", "true");

      const groupPanels = this._getGroupFromAttribute(panels);
      const groupKeys = Object.keys(groupPanels);

      if (groupKeys.length) {
        sideState = this._getSideStateFromGroup(groupPanels);
        this.remove(0, this.panelCount - groupKeys.length);
        sideState.forEach((state, i) => {
          const panel = this.camera.children[i];
          sidePanels += state.element.innerHTML;
          Array.from(panel.attributes).forEach(attribute => panel.removeAttribute(attribute.name));
        });
      } else {
        sideState = panels.reduce(
          (state: SideState[], panel: HTMLElement, i: number) => {
            const start = state.length ? +state[state.length - 1].end + 1 : 0;
            sidePanels += panel.innerHTML;
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
    } else {
      sideState = this._getSideStateFromPanels(panels);
    }

    return sideState;
  }

  private _getSideStateFromGroup(groupPanels: Record<string, HTMLElement[]>): SideState[] {
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

  private _syncToCategory(index: number, outerIndex: number): void {
    this.stopAnimation();
    this._sideFlicking.forEach((child, i) => {
      const { start, end } = this._sideState[i];

      if (start <= index && end >= index && outerIndex !== i) {
        child.stopAnimation();
        void child.moveTo(index, 0);
        void this.moveTo(i, 0);
      }
    });
  }

  private _onHorizontalHoldStart = (): void => {
    this.dragThreshold = 10;
    this._moveDirection = null;
  };

  private _onHorizontalMove = (e: MoveEvent): void => {
    if (e.isTrusted && !this._moveDirection) {
      this._sideFlicking.forEach((child) => {
        child.dragThreshold = Infinity;
      });
      this._moveDirection = MOVE_DIRECTION.HORIZONTAL;
    }
  };

  private _onHorizontalMoveEnd = (e: MoveEndEvent): void => {
    const visiblePanels = this.visiblePanels;

    this._sideFlicking.forEach((child) => {
      child.dragThreshold = 10;
    });
    this._moveDirection = null;

    if (visiblePanels.length > 1) {
      this._nextIndex =
        e.direction === "NEXT"
          ? visiblePanels[1].index
          : visiblePanels[0].index;
    } else {
      this._nextIndex = visiblePanels[0].index;
    }

    // _syncToCategory에서 완전히 가로 이동이 이루어지기 전에 세로 방향 index가 변하는 경우가 있어 timeout으로 처리
    setTimeout(() => {
      this._sideFlicking.forEach((child, i) => {
        if (this._nextIndex !== i) {
          const { start, end } = this._sideState[i];

          if (child.index < start) {
            child.stopAnimation();
            void child.moveTo(start, 0);
          } else if (child.index > end) {
            child.stopAnimation();
            void child.moveTo(end, 0);
          }
        }
      });
    });

    if (e.isTrusted) {
      this._syncToCategory(
        this._sideFlicking[this._nextIndex].index,
        this._nextIndex
      );
    }
  };

  private _onSideHoldStart = (): void => {
    this._sideFlicking.forEach((child) => {
      child.dragThreshold = 10;
    });
    this._moveDirection = null;
  };

  private _onSideMove = (e: MoveEvent): void => {
    if (e.isTrusted && !this._moveDirection) {
      this.dragThreshold = Infinity;
      this._moveDirection = MOVE_DIRECTION.VERTICAL;
    }
  };

  private _onSideMoveEnd = (): void => {
    this.dragThreshold = 10;
    this._moveDirection = null;
  };

  private _onSideChanged = (e: ChangedEvent): void => {
    // this.visiblePanels.length 가 2보다 크다면 가로 방향 Flicking이 조작 중이라는 것을 의미합니다.
    // 이 경우 가로 방향 Flicking의 이동이 완전히 끝난 뒤 _onHorizontalMoveEnd 에서 syncToCategory할 것이므로 여기서는 하지 않습니다.
    if (
      this.visiblePanels.length < 2 &&
      this._sideFlicking[this.index] === e.currentTarget
    ) {
      this._syncToCategory(e.index, this.index);
    }
  };
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Flicking, { FlickingOptions } from "./Flicking";
import { ChangedEvent, MoveEndEvent, MoveEvent } from "./type/event";
import { LiteralUnion, ValueOf } from "./type/internal";
import { CLASS, EVENTS, MOVE_DIRECTION } from "./const/external";
import { getDataAttributes, includes, toArray } from "./utils";

/**
 * @interface
 */
export interface CrossFlickingEvents {
  // FlickingEvent 들을 확장하자...
}

/**
 * @interface
 */
export interface CrossFlickingOptions {
  verticalOptions: FlickingOptions | undefined;
  // 한쪽 움직이면 다른 한쪽 움직임을 막을지 여부
  // 이전 패널 기억 여부
}

export interface VerticalState {
  key: string;
  start: number;
  end: number;
  element: HTMLElement;
}

export class CrossFlicking extends Flicking {
  // Core components
  private _verticalFlicking: Flicking[];

  // Options
  private _verticalOptions: CrossFlickingOptions["verticalOptions"];

  // Internal State
  private _verticalState: VerticalState[];
  private _moveDirection: LiteralUnion<ValueOf<typeof MOVE_DIRECTION>> | null;
  private _nextIndex: number;

  // Components
  public get verticalFlicking() {
    return this._verticalFlicking;
  }

  // Internal States
  public get verticalState() {
    return this._verticalState;
  }

  // Options Getter
  public get verticalOptions() {
    return this._verticalOptions;
  }

  // Options Setter
  // public set align(val: FlickingOptions["align"]) {
  //   this._align = val;
  // }

  public constructor(
    root: HTMLElement | string,
    { verticalOptions = undefined }: Partial<CrossFlickingOptions> = {}
  ) {
    super(root);

    // Internal states
    this._verticalState = this._createVerticalState();
    this._moveDirection = null;
    this._nextIndex = 0;

    // Bind options
    this._verticalOptions = verticalOptions;

    // Create core components
    this._verticalFlicking = this._createVerticalFlicking();
  }

  public init(): Promise<void> {
    return super.init().then(() => this._addComponentEvents());
  }

  private _addComponentEvents(): void {
    this.on(EVENTS.HOLD_START, this._onHorizontalHoldStart);
    this.on(EVENTS.MOVE, this._onHorizontalMove);
    this.on(EVENTS.MOVE_END, this._onHorizontalMoveEnd);

    this._verticalFlicking.forEach((flicking) => {
      flicking.on(EVENTS.HOLD_START, this._onVerticalHoldStart);
      flicking.on(EVENTS.MOVE, this._onVerticalMove);
      flicking.on(EVENTS.MOVE_END, this._onVerticalMoveEnd);
      flicking.on(EVENTS.CHANGED, this._onVerticalChanged);
    });
  }

  private _createVerticalState(): VerticalState[] {
    // data-index로 분류하기 전에 임시로 모든 children에 대해 vertical flicking으로 해보자.
    // panels에 data-attributes가 붙어있을 때와 안 붙어있을 때를 다르게 처리
    // 붙어있다면 가상의 viewport들을 index 갯수만큼 만들어줘야 한다
    const cameraEl = this.camera.element;
    const panels = toArray(cameraEl.children) as HTMLElement[];
    let verticalState: VerticalState[];
    let verticalPanels: string = "";

    // check data attribute exists
    const groupKeys: string[] = [];
    const groupPanels: Record<string, HTMLElement[]> = {};
    const verticalCamera = document.createElement("div");
    verticalCamera.classList.add(CLASS.CAMERA);

    panels.forEach((panel) => {
      const groupKey = getDataAttributes(panel, "data-flicking-").groupkey;
      if (groupKey && !includes(groupKeys, groupKey)) {
        groupKeys.push(groupKey);
        groupPanels[groupKey] = [panel];
      } else if (groupKey) {
        groupPanels[groupKey].push(panel);
      }
      return groupKey;
    });

    if (groupKeys.length) {
      panels.forEach(() => this.remove(0));
      verticalState = groupKeys.reduce(
        (state: VerticalState[], key: string) => {
          const start = state.length ? +state[state.length - 1].end + 1 : 0;
          const element = groupPanels[key].reduce(
            (el: HTMLElement, panel: HTMLElement) => {
              verticalPanels += panel.outerHTML;
              el.appendChild(panel);
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

      verticalCamera.innerHTML = verticalPanels;
      cameraEl.innerHTML = "";
      groupKeys.forEach(() => {
        const panel = document.createElement("div");
        panel.classList.add(CLASS.VIEWPORT, CLASS.VERTICAL);
        panel.innerHTML = verticalCamera.outerHTML;
        this.append(panel);
      });
    } else {
      verticalState = panels.reduce(
        (state: VerticalState[], panel: HTMLElement, i: number) => {
          const start = state.length ? +state[state.length - 1].end + 1 : 0;
          verticalPanels += panel.innerHTML;
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

      verticalCamera.innerHTML = verticalPanels;
      panels.forEach((panel) => {
        [CLASS.VIEWPORT, CLASS.VERTICAL].forEach((className) => {
          if (!panel.classList.contains(className)) {
            panel.classList.add(className);
          }
        });
        panel.innerHTML = verticalCamera.outerHTML;
      });
    }

    return verticalState;
  }

  private _createVerticalFlicking(): Flicking[] {
    return this.camera.children.map((panel, i) => {
      return new Flicking(panel, {
        ...this.verticalOptions,
        horizontal: false,
        panelsPerView: 1,
        defaultIndex: this._verticalState[i].start
      });
    });
  }

  private _syncToCategory(index: number, outerIndex: number): void {
    this.stopAnimation();
    this._verticalFlicking.forEach((child, i) => {
      const { start, end } = this._verticalState[i];

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
      this._verticalFlicking.forEach((child) => {
        child.dragThreshold = Infinity;
      });
      this._moveDirection = MOVE_DIRECTION.HORIZONTAL;
    }
  };

  private _onHorizontalMoveEnd = (e: MoveEndEvent): void => {
    const visiblePanels = this.visiblePanels;

    this._verticalFlicking.forEach((child) => {
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

    this._verticalFlicking.forEach((child, i) => {
      if (this._nextIndex !== i) {
        const { start, end } = this._verticalState[i];

        if (child.index < start) {
          child.stopAnimation();
          void child.moveTo(start, 0);
        } else if (child.index > end) {
          child.stopAnimation();
          void child.moveTo(end, 0);
        }
      }
    });

    if (e.isTrusted) {
      this._syncToCategory(
        this._verticalFlicking[this._nextIndex].index,
        this._nextIndex
      );
    }
  };

  private _onVerticalHoldStart = (): void => {
    this._verticalFlicking.forEach((child) => {
      child.dragThreshold = 10;
    });
    this._moveDirection = null;
  };

  private _onVerticalMove = (e: MoveEvent): void => {
    if (e.isTrusted && !this._moveDirection) {
      this.dragThreshold = Infinity;
      this._moveDirection = MOVE_DIRECTION.VERTICAL;
    }
  };

  private _onVerticalMoveEnd = (): void => {
    this.dragThreshold = 10;
    this._moveDirection = null;
  };

  private _onVerticalChanged = (e: ChangedEvent): void => {
    // this.visiblePanels.length 가 2보다 크다면 가로 방향 Flicking이 조작 중이라는 것을 의미합니다.
    // 이 경우 가로 방향 Flicking의 이동이 완전히 끝난 뒤 _onHorizontalMoveEnd 에서 syncToCategory할 것이므로 여기서는 하지 않습니다.
    if (
      this.visiblePanels.length < 2 &&
      this._verticalFlicking[this.index] === e.currentTarget
    ) {
      this._syncToCategory(e.index, this.index);
    }
  };
}

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

/**
 * Flicking Status returned by {@link Flicking#getStatus}
 * @ko {@link Flicking#getStatus}에 의해 반환된 Flicking 상태 객체
 * @interface
 * @property {number} index An index of the active panel<ko>활성화된 패널의 인덱스</ko>
 * @property {object} position A info to restore camera {@link Camera#position position}<ko>카메라 {@link Camera#position position}을 설정하기 위한 정보들</ko>
 * @property {number} [position.panel] An index of the panel camera is located at<ko>카메라가 위치한 패널의 인덱스</ko>
 * @property {number} [position.progressInPanel] A progress of the camera position inside the panel<ko>패널 내에서의 카메라 위치의 진행도</ko>
 * @property {number} visibleOffset An offset to visible panel's original index. This value is available only when `visiblePanelsOnly` is `true`
 * <ko>현재 보이는 패널들을 저장했을 때, 원래의 인덱스 대비 offset. `visiblePanelsOnly` 옵션을 사용했을 때만 사용 가능합니다</ko>
 * @property {object[]} panels A data array of panels<ko>패널의 정보를 담은 배열</ko>
 * @property {index} [panels.index] An index of the panel<ko>패널의 인덱스</ko>
 * @property {string | undefined} [panels.html] An `outerHTML` of the panel element<ko>패널 엘리먼트의 `outerHTML`</ko>
 */
export interface VerticalState {
  key: string;
  start: number;
  end: number;
  element: HTMLElement;
}

/**
 * @extends Component
 * @support {"ie": "9+(with polyfill)", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
 * @requires {@link https://github.com/naver/egjs-component|@egjs/component}
 * @requires {@link https://github.com/naver/egjs-axes|@egjs/axes}
 */
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
  /**
   * {@link Control} instance of the Flicking
   * @ko 현재 Flicking에 활성화된 {@link Control} 인스턴스
   * @type {Control}
   * @default SnapControl
   * @readonly
   * @see Control
   * @see SnapControl
   * @see FreeControl
   */
  public get verticalFlicking() {
    return this._verticalFlicking;
  }

  // Internal States
  /**
   * Whether Flicking's {@link Flicking#init init()} is called.
   * This is `true` when {@link Flicking#init init()} is called, and is `false` after calling {@link Flicking#destroy destroy()}.
   * @ko Flicking의 {@link Flicking#init init()}이 호출되었는지를 나타내는 멤버 변수.
   * 이 값은 {@link Flicking#init init()}이 호출되었으면 `true`로 변하고, {@link Flicking#destroy destroy()}호출 이후에 다시 `false`로 변경됩니다.
   * @type {boolean}
   * @default false
   * @readonly
   */
  public get verticalState() {
    return this._verticalState;
  }

  // Options Getter
  /**
   * Change active panel index on mouse/touch hold while animating.
   * `index` of the `willChange`/`willRestore` event will be used as new index.
   * @ko 애니메이션 도중 마우스/터치 입력시 현재 활성화된 패널의 인덱스를 변경합니다.
   * `willChange`/`willRestore` 이벤트의 `index`값이 새로운 인덱스로 사용될 것입니다.
   * @type {FlickingOptions}
   * @default undefined
   * @see {@link https://naver.github.io/egjs-flicking/Options#changeonhold changeOnHold ( Options )}
   */
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

  /**
   * Initialize Flicking and move to the default index
   * This is automatically called on Flicking's constructor when `autoInit` is true(default)
   * @ko Flicking을 초기화하고, 디폴트 인덱스로 이동합니다
   * 이 메소드는 `autoInit` 옵션이 true(default)일 경우 Flicking이 생성될 때 자동으로 호출됩니다
   * @fires Flicking#ready
   * @return {Promise<void>}
   */
  public init(): Promise<void> {
    return super.init().then(() => this._addComponentEvents());
  }

  /**
   * Destroy Flicking and remove all event handlers
   * @ko Flicking과 하위 컴포넌트들을 초기 상태로 되돌리고, 부착된 모든 이벤트 핸들러를 제거합니다
   * @return {void}
   */
  public destroy(): void {
    // TODO 모든 child flicking destroy
    super.destroy();
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
      const groupKey = getDataAttributes(panel, "data-cross-").groupkey;
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
              element: element,
            },
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
              element: panel,
            },
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
        defaultIndex: this._verticalState[i].start,
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

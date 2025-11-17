/* eslint-disable @typescript-eslint/ban-types */
/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnChange, OnFinish, OnHold, OnRelease } from "@egjs/axes";
import { ComponentEvent } from "@egjs/component";

import Flicking from "../Flicking";
import Panel from "../core/panel/Panel";
import { EVENTS, DIRECTION } from "../const/external";
import { ValueOf } from "../type/internal";

/**
 * Event that fires when Flicking's {@link Flicking#init init()} is called
 * @ko Flicking의 {@link Flicking#init init()}이 호출되었을 때 발생하는 이벤트
 * @event Flicking#ready
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 */
export type ReadyEvent<T extends Flicking = Flicking> = ComponentEvent<{}, typeof EVENTS["READY"], T>;

/**
 * Event that fires when Flicking's {@link Flicking#resize resize()} is called, before updating the sizes of panels and viewport.
 * You can update the sizes of panels and viewport with this event, and it'll be applied after {@link Flicking#resize resize()} is finished.
 * @ko Flicking의 {@link Flicking#resize resize())}이 호출되었을 때 발생하는 이벤트로, 패널 및 뷰포트의 크기를 업데이트하기 전에 발생합니다.
 * 이 이벤트 단계에서 패널 및 뷰포트의 크기를 업데이트할 경우, 해당 크기가 최종적으로 반영됩니다.
 * @event Flicking#beforeResize
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {number} width Previous width of the viewport<ko>기존 뷰포트 너비</ko>
 * @property {number} height Previous height of the viewport<ko>기존 뷰포트 높이</ko>
 * @property {HTMLElement} element The viewport element<ko>뷰포트 엘리먼트</ko>
 */
export interface BeforeResizeEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["BEFORE_RESIZE"], T> {
  width: number;
  height: number;
  element: HTMLElement;
}

/**
 * Event that fires when Flicking's {@link Flicking#resize resize()} is called, after updating the sizes of panels and viewport.
 * @ko Flicking의 {@link Flicking#resize resize())}이 호출되었을 때 발생하는 이벤트로, 패널 및 뷰포트의 크기를 업데이트한 이후에 발생합니다.
 * @event Flicking#afterResize
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {number} width New width of the viewport<ko>업데이트된 뷰포트 너비</ko>
 * @property {number} height New height of the viewport<ko>업데이트된 뷰포트 높이</ko>
 * @property {object} prev Previous size of the viewport<ko>기존 뷰포트 크기</ko>
 * @property {number} [prev.width] Previous width of the viewport<ko>기존 뷰포트 너비</ko>
 * @property {number} [prev.height] Previous height of the viewport<ko>기존 뷰포트 높이</ko>
 * @property {boolean} sizeChanged A Boolean value indicating whether the width/height of the viewport element is changed<ko>뷰포트 너비/크기가 변경되었는지 여부를 나타내는 값</ko>
 * @property {HTMLElement} element The viewport element<ko>뷰포트 엘리먼트</ko>
 */
export interface AfterResizeEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["AFTER_RESIZE"], T> {
  width: number;
  height: number;
  prev: {
    width: number;
    height: number;
  };
  sizeChanged: boolean;
  element: HTMLElement;
}

/**
 * Event that fires when user started dragging.
 * @ko 사용자가 드래그를 시작했을 때 발생하는 이벤트
 * @event Flicking#holdStart
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {function} stop Stop the event action and prevent user from dragging<ko>이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다.</ko>
 * @property {object} axesEvent {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event of {@link https://naver.github.io/egjs-axes/ Axes}
 * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} 이벤트</ko>
 */
export interface HoldStartEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["HOLD_START"], T> {
  axesEvent: OnHold;
}

/**
 * Event that fires when user stopped dragging.
 * @ko 사용자가 드래그를 끝냈을 때 발생하는 이벤트
 * @event Flicking#holdEnd
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {object} axesEvent {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
 * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
 */
export interface HoldEndEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["HOLD_END"], T> {
  axesEvent: OnRelease;
}

/**
 * Event that fires once before first {@link Flicking#event:move move} event
 * @ko 첫 번째 {@link Flicking#event:move move} 이벤트 직전에 단 한번 발생하는 이벤트
 * @event Flicking#moveStart
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {function} stop Stop the event action and prevent user from dragging<ko>이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다.</ko>
 * @property {boolean} isTrusted Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>
 * @property {boolean} holding Boolean that indicates whether the user is dragging the viewport element<ko>사용자가 현재 viewport 엘리먼트를 드래그하고있는지를 나타내는 값</ko>
 * @property {DIRECTION} direction Moving direction relative to previous position of the camera<ko>이전 카메라 위치 대비 이동 방향</ko>
 * @property {object} axesEvent {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event of {@link https://naver.github.io/egjs-axes/ Axes}
 * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} 이벤트</ko>
 */
export interface MoveStartEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["MOVE_START"], T> {
  isTrusted: boolean;
  holding: boolean;
  direction: ValueOf<typeof DIRECTION>;
  axesEvent: OnChange;
}

/**
 * Event that fires for every movement
 * @ko 이동시마다 발생하는 이벤트
 * @event Flicking#move
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {function} stop Stop the event action and prevent user from dragging<ko>이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다.</ko>
 * @property {boolean} isTrusted Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>
 * @property {boolean} holding Boolean that indicates whether the user is dragging the viewport element<ko>사용자가 현재 viewport 엘리먼트를 드래그하고있는지를 나타내는 값</ko>
 * @property {DIRECTION} direction Moving direction relative to previous position of the camera<ko>이전 카메라 위치 대비 이동 방향</ko>
 * @property {object} axesEvent {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event of {@link https://naver.github.io/egjs-axes/ Axes}
 * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} 이벤트</ko>
 */
export interface MoveEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["MOVE"], T> {
  isTrusted: boolean;
  holding: boolean;
  direction: ValueOf<typeof DIRECTION>;
  axesEvent: OnChange;
}

/**
 * Event that fires when the movement is finished by user input release or animation end.
 * @ko 사용자 입력 중단/애니메이션 종료 등 이동이 끝났을 때 발생하는 이벤트
 * @event Flicking#moveEnd
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {boolean} isTrusted Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>
 * @property {boolean} holding Boolean that indicates whether the user is dragging the viewport element<ko>사용자가 현재 viewport 엘리먼트를 드래그하고있는지를 나타내는 값</ko>
 * @property {DIRECTION} direction Moving direction relative to previous position of the camera<ko>이전 카메라 위치 대비 이동 방향</ko>
 * @property {object} axesEvent {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event of {@link https://naver.github.io/egjs-axes/ Axes}
 * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} 이벤트</ko>
 */
export interface MoveEndEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["MOVE_END"], T> {
  isTrusted: boolean;
  direction: ValueOf<typeof DIRECTION>;
  axesEvent: OnFinish;
}

/**
 * Event that fires when Flicking's active index will be changed. Index will be changed at the {@link Flicking#event:changed changed} event.
 * It can be triggered when user finished input, or flicking start to move by method.
 * Calling `stop()` in event will prevent index change and camera movement.
 * @ko Flicking의 인덱스가 변경될 것임을 나타내는 이벤트. 실제 인덱스는 {@link Flicking#event:changed changed} 이벤트에서 변경된다.
 * 사용자가 입력을 마쳤을 때, 혹은 메소드를 통해 이동을 시작했을 때 발생한다.
 * 이벤트의 stop()을 호출시 인덱스 변경 및 패널로의 이동을 막는다.
 * @event Flicking#willChange
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {function} stop Stop the event action and prevent user from dragging<ko>이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다.</ko>
 * @property {number} index New active index<ko>변경할 인덱스</ko>
 * @property {Panel} panel New active panel<ko>인덱스 변경 이후 활성화된 패널로 설정할 패널</ko>
 * @property {boolean} isTrusted Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>
 * @property {DIRECTION} direction Moving direction from the active panel to the target panel<ko>현재 활성화된 패널로부터 이동하고자 하는 패널의 방향</ko>
 */
export interface WillChangeEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["WILL_CHANGE"], T> {
  index: number;
  panel: Panel;
  isTrusted: boolean;
  direction: ValueOf<typeof DIRECTION>;
}

/**
 * Event that fires when Flicking's index is changed.
 * @event Flicking#changed
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {number} index New index<ko>새 인덱스</ko>
 * @property {Panel} panel New active panel<ko>새로 선택된 패널</ko>
 * @property {number} prevIndex Previous index<ko>이전 인덱스</ko>
 * @property {Panel | null} prevPanel Previous active panel<ko>이전 패널</ko>
 * @property {boolean} isTrusted Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>
 * @property {DIRECTION} direction Moving direction from the active panel to the target panel<ko>현재 활성화된 패널로부터 이동하고자 하는 패널의 방향</ko>
 */
export interface ChangedEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["CHANGED"], T> {
  index: number;
  panel: Panel;
  prevIndex: number;
  prevPanel: Panel | null;
  isTrusted: boolean;
  direction: ValueOf<typeof DIRECTION>;
}

/**
 * Event fires when user drag amount not reached {@link Flicking#threshold threshold} and is returning to {@link Flicking#currentPanel currentPanel}
 * @ko 사용자가 드래그하여 이동한 거리가 {@link Flicking#threshold threshold}에 도달하지 못해, 기존 {@link Flicking#currentPanel currentPanel}로 돌아갈 것임을 나타내는 이벤트
 * @event Flicking#willRestore
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {function} stop Stop the event action and prevent user from dragging<ko>이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다</ko>
 * @property {number} index Index of the panel to restore<ko>복귀하고자 하는 패널의 인덱스</ko>
 * @property {Panel} panel Panel to restore<ko>복귀하고자 하는 패널</ko>
 * @property {boolean} isTrusted Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>
 * @property {DIRECTION} direction Moving direction relative to previous position of the camera<ko>이전 카메라 위치 대비 이동 방향</ko>
 */
export interface WillRestoreEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["WILL_RESTORE"], T> {
  index: number;
  panel: Panel;
  isTrusted: boolean;
  direction: ValueOf<typeof DIRECTION>;
}

/**
 * Event that fires when Flicking has returned to {@link Flicking#currentPanel currentPanel}
 * @ko Flicking이 {@link Flicking#currentPanel currentPanel}의 위치로 다시 돌아왔을 때 발생하는 이벤트
 * @event Flicking#restored
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {boolean} isTrusted Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>
 */
export interface RestoredEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["RESTORED"], T> {
  isTrusted: boolean;
}

/**
 * Event that fires when panel is statically click / touched
 * @ko 패널이 정적으로 클릭(혹은 터치)되었을 때 발생하는 이벤트
 * @event Flicking#select
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {number} index Selected panel's index<ko>선택된 패널의 인덱스</ko>
 * @property {Panel} panel Selected panel<ko>선택된 패널</ko>
 * @property {DIRECTION} direction Direction from current camera position to the selected panel's position<ko>현재 카메라 위치 대비 선택된 패널의 위치</ko>
 */
export interface SelectEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["SELECT"], T> {
  index: number;
  panel: Panel;
  direction: ValueOf<typeof DIRECTION> | null;
}

/**
 * Event that fires when an empty panel area is visible at the edge of viewport
 * You can set its threshold with {@link Flicking#needPanelThreshold needPanelThreshold}
 * @ko 빈 패널 영역이 뷰포트 끝에 도달했을 때 발생하는 이벤트
 * {@link Flicking#needPanelThreshold needPanelThreshold}를 이용해서 이벤트가 발생하는 지점을 조절할 수 있습니다
 * @event Flicking#needPanel
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {DIRECTION} direction Direction where new panel is needed. `DIRECTION.PREV` means panels should be {@link Flicking#prepend prepend}ed and `DIRECTION.NEXT` means panels should be {@link Flicking#append append}ed
 * <ko>패널이 필요한 방향. `DIRECTION.PREV`의 경우 패널이 {@link Flicking#prepend prepend}되어야 함을 의미하고, `DIRECTION.NEXT`는 패널이 {@link Flicking#append append}되어야 함을 의미한다</ko>
 */
export interface NeedPanelEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["NEED_PANEL"], T> {
  direction: Exclude<ValueOf<typeof DIRECTION>, null>;
}

/**
 * Event that fires when visible panel inside the viewport changes
 * @ko 현재 뷰포트 내에서 보이는 패널이 변경되었을 때 발생되는 이벤트
 * @event Flicking#visibleChange
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {Panel[]} added Panels that added from previous visible panels<ko>새로 보이는 패널의 배열</ko>
 * @property {Panel[]} removed Panels that removed from previous visible panels<ko>보이지 않게 된 패널의 배열</ko>
 * @property {Panel[]} visiblePanels Current visible panels<ko>현재 보이는 패널의 배열</ko>
 */
export interface VisibleChangeEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["VISIBLE_CHANGE"], T> {
  added: Panel[];
  removed: Panel[];
  visiblePanels: Panel[];
}

/**
 * Event that fires when camera reaches the maximum/minimum range
 * @ko 카메라가 이동 가능한 영역의 끝에 도달했을 때 발생하는 이벤트
 * @event Flicking#reachEdge
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {DIRECTION} direction Direction indicates whether the camera's position is at the maximum range({@link DIRECTION DIRECTION.NEXT}) or minimum range({@link DIRECTION DIRECTION.PREV})
 * <ko>카메라의 위치가 이동 가능한 범위의 최대점({@link DIRECTION DIRECTION.NEXT}) 혹은 최소점({@link DIRECTION DIRECTION.PREV})에 도달했는지를 나타내는 값</ko>
 */
export interface ReachEdgeEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["REACH_EDGE"], T> {
  direction: ValueOf<typeof DIRECTION>;
}

/**
 * Event that fires when a panel is added or removed
 * @ko 패널 추가/제거시에 발생하는 이벤트
 * @event Flicking#panelChange
 * @type {object}
 * @property {Flicking} currentTarget An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>
 * @property {string} eventType Name of the event<ko>이벤트명</ko>
 * @property {Panel[]} added An array of new panels added<ko>새로 추가된 패널의 배열</ko>
 * @property {Panel[]} removed An array of panels removed<ko>제거된 패널의 배열</ko>
 */
export interface PanelChangeEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["PANEL_CHANGE"], T> {
  added: Panel[];
  removed: Panel[];
}

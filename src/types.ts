/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Flicking from "./Flicking";
import Viewport from "./components/Viewport";
import StateMachine from "./components/StateMachine";
import Panel from "./components/Panel";
import Component from "@egjs/component";
import State from "./states/State";
import { DiffResult } from "@egjs/list-differ";
import { OnRelease } from "@egjs/axes";

export type ValueOf<T> = T[keyof T];
/**
 * HTML `string` of single/mutiple HTMLElement, or an instance of `HTMLElement`.
 * @ko 단일/복수의 HTMLElement의 outerHTML에 해당하는 `string`, 혹은 `HTMLElement`의 인스턴스.
 * @typedef
 * @memberof eg.Flicking
 */
export type ElementLike = string | HTMLElement;

/**
 * @typedef
 * @memberof eg.Flicking
 * @property - A prefix of class names will be added for the panels, viewport, and camera.<ko>패널들과 뷰포트, 카메라에 추가될 클래스 이름의 접두사.</ko>
 * @property - Deceleration value for panel movement animation for animation triggered by manual user input. A higher value means a shorter running time.<ko>사용자의 동작으로 가속도가 적용된 패널 이동 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
 * @property - The direction of panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true: 가로방향, false: 세로방향)</ko>
 * @property - Enables circular mode, which connects first/last panel for continuous scrolling.<ko>순환 모드를 활성화한다. 순환 모드에서는 양 끝의 패널이 서로 연결되어 끊김없는 스크롤이 가능하다.</ko>
 * @property - Enables infinite mode, which can automatically trigger needPanel until reaching the last panel's index reaches the lastIndex.<ko>무한 모드를 활성화한다. 무한 모드에서는 needPanel 이벤트를 자동으로 트리거한다. 해당 동작은 마지막 패널의 인덱스가 lastIndex와 일치할때까지 일어난다.</ko>
 * @property - A Threshold from viewport edge before triggering `needPanel` event in infinite mode.<ko>무한 모드에서 `needPanel`이벤트가 발생하기 위한 뷰포트 끝으로부터의 최대 거리.</ko>
 * @property - Maximum panel index that Flicking can set. Flicking won't trigger `needPanel` when the event's panel index is greater than it.<br/>Also, if the last panel's index reached a given index, you can't add more panels.<ko>Flicking이 설정 가능한 패널의 최대 인덱스. `needPanel` 이벤트에 지정된 인덱스가 최대 패널의 개수보다 같거나 커야 하는 경우에 이벤트를 트리거하지 않게 한다.<br>또한, 마지막 패널의 인덱스가 주어진 인덱스와 동일할 경우, 새로운 패널을 더 이상 추가할 수 없다.</ko>
 * @property - Movement threshold to change panel(unit: pixel). It should be dragged above the threshold to change the current panel.<ko>패널 변경을 위한 이동 임계값 (단위: 픽셀). 주어진 값 이상으로 스크롤해야만 패널 변경이 가능하다.</ko>
 * @property - Duration of the panel movement animation. (unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
 * @property - An easing function applied to the panel movement animation. Default value is `easeOutCubic`.<ko>패널 이동 애니메이션에 적용할 easing함수. 기본값은 `easeOutCubic`이다.</ko>
 * @property - Index of the panel to set as default when initializing. A zero-based integer.<ko>초기화시 지정할 디폴트 패널의 인덱스로, 0부터 시작하는 정수.</ko>
 * @property - Types of input devices to enable.({@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption Reference})<ko>활성화할 입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption 참고})</ko>
 * @property - The threshold angle value(0 ~ 90).<br>If the input angle from click/touched position is above or below this value in horizontal and vertical mode each, scrolling won't happen.<ko>스크롤 동작을 막기 위한 임계각(0 ~ 90).<br>클릭/터치한 지점으로부터 계산된 사용자 입력의 각도가 horizontal/vertical 모드에서 각각 크거나 작으면, 스크롤 동작이 이루어지지 않는다.</ko>
 * @property - The size value of the bounce area. Only can be enabled when `circular=false`.<br>You can set different bounce value for prev/next direction by using array.<br>`number` for px value, and `string` for px, and % value relative to viewport size.(ex - 0, "10px", "20%")<ko>바운스 영역의 크기값. `circular=false`인 경우에만 사용할 수 있다.<br>배열을 통해 prev/next 방향에 대해 서로 다른 바운스 값을 지정 가능하다.<br>`number`를 통해 px값을, `stirng`을 통해 px 혹은 뷰포트 크기 대비 %값을 사용할 수 있다.(ex - 0, "10px", "20%")</ko>
 * @property - Whether the `resize` method should be called automatically after a window resize event.<ko>window의 `resize` 이벤트 이후 자동으로 resize()메소드를 호출할지의 여부.</ko>
 * @property - Whether the height(horizontal)/width(vertical) of the viewport element reflects the height/width value of the panel after completing the movement.<ko>목적 패널로 이동한 후 그 패널의 높이(horizontal)/너비(vertical)값을 뷰포트 요소의 높이/너비값에 반영할지 여부.</ko>
 * @property - z-index value for viewport element.<ko>뷰포트 엘리먼트의 z-index 값.</ko>
 * @property - Prevent the view from going out of the first/last panel. Only can be enabled when `circular=false`.<ko>뷰가 첫번째와 마지막 패널 밖으로 나가는 것을 막아준다. `circular=false`인 경우에만 사용할 수 있다.</ko>
 * @property - Disables CSS property `overflow: hidden` in viewport if `true`.<ko>`true`로 설정시 뷰포트에 `overflow: hidden` 속성을 해제한다.</ko>
 * @property - The reference position of the hanger in the viewport, which hangs panel anchors should be stopped at.<br>It should be provided in px or % value of viewport size.<br>You can combinate those values with plus/minus sign.<br>ex) "50", "100px", "0%", "25% + 100px"<ko>뷰포트 내부의 행어의 위치. 패널의 앵커들이 뷰포트 내에서 멈추는 지점에 해당한다.<br>px값이나, 뷰포트의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
 * @property - The reference position of the anchor in panels, which can be hanged by viewport hanger.<br>It should be provided in px or % value of panel size.<br>You can combinate those values with plus/minus sign.<br>ex) "50", "100px", "0%", "25% + 100px"<ko>패널 내부의 앵커의 위치. 뷰포트의 행어와 연계하여 패널이 화면 내에서 멈추는 지점을 설정할 수 있다.<br>px값이나, 패널의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
 * @property - Space value between panels. Should be given in number.(px)<ko>패널간에 부여할 간격의 크기를 나타내는 숫자.(px)</ko>
 * @property - Movement style by user input. (ex: snap, freeScroll)<ko>사용자 입력에 의한 이동 방식.(ex: snap, freeScroll)</ko>
 * @property - Whether to use `offsetWidth`/`offsetHeight` instead of `getBoundingClientRect` for panel/viewport size calculation.<br/>You can use this option to calculate the original panel size when CSS transform is applied to viewport or panel.<br/>⚠️ If panel size is not fixed integer value, there can be a 1px gap between panels.<ko>패널과 뷰포트의 크기를 계산할 때 `offsetWidth`/`offsetHeight`를 `getBoundingClientRect` 대신 사용할지 여부.<br/>패널이나 뷰포트에 CSS transform이 설정되어 있을 때 원래 패널 크기를 계산하려면 활성화할 수 있다.<br/>⚠️ 패널의 크기가 정수로 고정되어있지 않다면 패널 사이에 1px의 공간이 생길 수 있다.</ko>
 * @property - This option indicates whether all panels have the same size(true) of first panel, or it can hold a list of class names that determines panel size.<br/>Enabling this option can increase performance while recalculating panel size.<ko>모든 패널의 크기가 동일한지(true), 혹은 패널 크기를 결정하는 패널 클래스들의 리스트.<br/>이 옵션을 설정하면 패널 크기 재설정시에 성능을 높일 수 있다.</ko>
 * @property - Whether all panels have a constant size that won't be changed after resize. Enabling this option can increase performance while recalculating panel size.<ko>모든 패널의 크기가 불변인지의 여부. 이 옵션을 'true'로 설정하면 패널 크기 재설정시에 성능을 높일 수 있다.</ko>
 * @property - Whether to render visible panels only. This can dramatically increase performance when there're many panels.<ko>보이는 패널만 렌더링할지 여부를 설정한다. 패널이 많을 경우에 퍼포먼스를 크게 향상시킬 수 있다.</ko>
 * @property - Whether to use external rendering. It will delegate DOM manipulation and can synchronize the rendered state by calling `sync()` method. You can use this option to use in frameworks like React, Vue, Angular, which has its states and rendering methods.<ko>외부 렌더링을 사용할 지의 여부. 이 옵션을 사용시 렌더링을 외부에 위임할 수 있고, `sync()`를 호출하여 그 상태를 동기화할 수 있다. 이 옵션을 사용하여, React, Vue, Angular 등 자체적인 상태와 렌더링 방법을 갖는 프레임워크에 대응할 수 있다.</ko>
 * @property - Area (px) that can go to the next page when swiping the right edge in iOS safari <ko>iOS Safari에서 오른쪽 엣지를 스와이프 하는 경우 다음 페이지로 넘어갈 수 있는 영역(px)</ko>
 * @property - Whether to collect statistics on how you are using `Flicking`. These statistical data do not contain any personal information and are used only as a basis for the development of a user-friendly product.<ko>어떻게 `Flicking`을 사용하고 있는지에 대한 통계 수집 여부를 나타낸다. 이 통계자료는 개인정보를 포함하고 있지 않으며 오직 사용자 친화적인 제품으로 발전시키기 위한 근거자료로서 활용한다.</ko>
 */
export interface FlickingOptions {
  classPrefix: string;
  deceleration: number;
  horizontal: boolean;
  circular: boolean;
  infinite: boolean;
  infiniteThreshold: number | string;
  lastIndex: number;
  threshold: number;
  duration: number;
  panelEffect: (x: number) => number;
  defaultIndex: number;
  inputType: string[];
  thresholdAngle: number;
  bounce: number | string | [number | string, number | string];
  autoResize: boolean;
  adaptive: boolean;
  zIndex: number | "";
  bound: boolean;
  overflow: boolean;
  hanger: number | string;
  anchor: number | string;
  gap: number;
  moveType: MoveTypeOption;
  useOffset: boolean;
  isEqualSize: boolean | string[];
  isConstantSize: boolean;
  renderOnlyVisible: boolean;
  renderExternal: boolean;
  iOSEdgeSwipeThreshold: number;
  resizeOnContentsReady: boolean;
  collectStatistics: boolean;
}

export type MoveTypeObjectOption = MoveTypeSnapOption | MoveTypeFreeScrollOption;
export type MoveTypeStringOption = MoveTypeObjectOption["type"];

export interface MoveTypeContext {
  viewport: Viewport;
  axesEvent: OnRelease;
  state: State;
  swipeDistance: number;
  isNextDirection: boolean;
}

export interface DestinationInfo {
  panel: Panel;
  destPos: number;
  duration: number;
  eventType: EventType["CHANGE"] | EventType["RESTORE"] | "";
}

/**
 * Movement style by user input.
 * @ko 사용자 입력에 의한 이동 방식.
 * @typedef {"snap" | "freeScroll" | eg.Flicking.MoveTypeSnapOption | eg.Flicking.MoveTypeFreeScrollOption}
 * @memberof eg.Flicking
 */
export type MoveTypeOption = MoveTypeStringOption | MoveTypeObjectOption;

/**
 * With "snap" move type, momentum is applied while choosing destination panel at release time.<br>You can set how many panels can go after release.
 * @ko 입력을 중단한 시점의 가속도에 영향받아 도달할 패널을 계산하는 이동 방식.<br>입력 중단 이후 최대 몇 개까지의 패널을 통과하여 이동할지 설정할 수 있다.
 * @typedef
 * @memberof eg.Flicking
 * @property - Should be `"snap"` to enable snap mode.<ko>`"snap"`을 지정하여 snap 모드를 활성화할 수 있다.</ko>
 * @property {number} [count=1] - Maximum number of panels can go after release.<ko>입력 중단 이후 통과하여 이동할 수 있는 패널의 최대 갯수.</ko>
 */
export interface MoveTypeSnapOption {
  type: "snap";
  count: number;
}

/**
 * With "freeScroll" move type, it can be scrolled freely without alignment.
 * @ko 패널이 정해진 지점에 정렬되지 않고, 자유롭게 스크롤할 수 있는 이동 방식.
 * @typedef
 * @memberof eg.Flicking
 * @property - Should be `"freeScroll"` to enable free scroll mode.<ko>`"freeScroll"`을 지정하여 free scroll 모드를 활성화할 수 있다.</ko>
 */
export interface MoveTypeFreeScrollOption {
  type: "freeScroll";
}

// State interface to save instance
/**
 * @typedef
 * @memberof eg.Flicking
 * @property - Index of current panel.<ko>현재 패널의 인덱스.</ko>
 * @property panels - Panels Flicking has.<ko>Flicking이 갖고 있는 패널들의 정보.</ko>
 * @property {string} [panels.html] - `outerHTML` of each panel elements.<ko>각 패널 엘리먼트의 `outerHTML`.</ko>
 * @property {index} [panels.index] - Index of each panels.<ko>각 패널의 인덱스.</ko>
 * @property - Camera position of Flicking.<ko>Flicking의 카메라 위치.</ko>
 */
export interface FlickingStatus {
  index: number;
  panels: Array<{
    html: string;
    index: number;
    position: number;
  }>;
  position: number;
}

export interface OriginalStyle {
  className: string | null;
  style: string | null;
}

/**
 * @typedef
 * @memberof eg.Flicking
 * @property - HTML element of panel object.<ko>패널 오브젝트에 지정된 HTML Element.</ko>
 * @property - Index of panel, zero-based integer.<ko>패널의 인덱스로, 0부터 시작하는 정수.</ko>
 * @property - Position of panel where it is placed from left(horizontal)/top(vertical).<ko>패널의 위치로, 왼쪽(horizontal)/위(vertical)을 기준으로 얼마나 떨어져 있는지를 나타내는 값.</ko>
 * @property - Position of panel anchor where it is actually stopped interacting with hanger position.<ko>Hanger와 상호작용하여 패널에 도착했을 때의 위치를 계산하는데 사용되는 패널 내부 Anchor의 위치.</ko>
 * @property - Size of panel, width(horizontal)/height(vertical) in `px`.<ko>`px`단위의 패널의 크기, horizontal일 때는 너비, vertical일 때는 높이에 해당한다.</ko>
 * @property - Progress of movement between previous or next panel relative to current panel.<ko> 현재 패널로부터 이전/다음 패널으로의 이동 진행률.</ko>
 * @property - Progress of movement between points that panel is completely invisible outside of viewport.(prev direction: -1, selected point: 0, next direction: 1) <ko>현재 패널이 뷰포트 영역 밖으로 완전히 사라지는 지점을 기준으로 하는 진행도.(prev방향: -1, 선택 지점: 0, next방향: 1)</ko>
 * @property - Percentage of area where panel is visible in the viewport.<ko>뷰포트 안에서 패널이 보이는 영역의 비율.</ko>
 * @property focus - Move to this panel.<ko>이 패널로 이동한다.</ko>
 * @property {number} [focus.duration] Duration of the panel movement. (unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
 * @property update - Update panel element with given function.<ko>패널 요소를 주어진 함수를 이용하여 업데이트한다.</ko>
 * @property {function} [update.updateFunction] Callback function to update panel element. argument is panel's element.<ko>패널 요소를 업데이트하기 위한 콜백 함수. 패널의 HTMLElement를 인자로 갖는다.</ko>
 * @property - Return previous panel of current panel, `null` if it doesn't exist.<ko>현재 패널의 이전 패널을 반환한다. 패널이 존재하지 않을 시 `null`을 반환한다.</ko>
 * @property - Return next panel of current panel, `null` if it doesn't exist.<ko>현재 패널의 다음 패널을 반환한다. 패널이 존재하지 않을 시 `null`을 반환한다.</ko>
 * @property - Insert new panels before reference panel. Return inserted panels.<ko>새로운 패널들을 해당 패널 앞에 추가한다. 새로 추가된 패널들을 반환한다.</ko>
 * @property - Insert new panels after reference panel. Return inserted panels.<ko>새로운 패널들을 해당 패널 뒤에 추가한다. 새로 추가된 패널들을 반환한다.</ko>
 * @property - Remove this panel.<ko>이 패널을 제거한다.</ko>
 * @example
 * - **Updating panel**
 * ```javascript
 * // As panel elements can be cloned in circular mode, `element` parameter is provided as read-only.
 * // You should use `update()` function to consistently update all panel elements cloned.
 *
 * // Don't
 * panel.element.classList.add("foo");
 * // Do
 * panel.update(el => {
 *   el.classList.add("foo");
 * });
 * ```
 */

export interface FlickingPanel {
  getElement: () => HTMLElement;
  getIndex: () => number;
  getPosition: () => number;
  getAnchorPosition: () => number;
  getSize: () => number;
  getProgress: () => number;
  getOutsetProgress: () => number;
  getVisibleRatio: () => number;
  focus: (duration?: number) => void;
  update: (updateFunction: (element: HTMLElement) => any) => void;
  prev: () => FlickingPanel | null;
  next: () => FlickingPanel | null;
  insertBefore: (element: ElementLike | ElementLike[]) => FlickingPanel[];
  insertAfter: (element: ElementLike | ElementLike[]) => FlickingPanel[];
  remove: () => void;
}

export interface Direction {
  readonly PREV: "PREV";
  readonly NEXT: "NEXT";
}

/**
 * Event triggered when user started dragging.
 * @ko 사용자가 드래그를 시작했을 떄 발생하는 이벤트
 * @event eg.Flicking#holdStart
 * @type eg.Flicking.FlickingEvent
 */

/**
 * Event triggered when user stopped dragging.
 * @ko 사용자가 드래그를 중단했을 때 발생하는 이벤트.
 * @event eg.Flicking#holdEnd
 * @type eg.Flicking.FlickingEvent
 */

/**
 * Event triggered once before first [move]{@link eg.Flicking#event:move} event.
 * @ko 첫 번째 [move]{@link eg.Flicking#event:move}이벤트 직전에 단 한번 발생하는 이벤트.
 * @event eg.Flicking#moveStart
 * @type eg.Flicking.FlickingEvent
 */

/**
 * Event triggered while moving to the destination panel.
 * @ko 목적 패널로의 이동 도중에 발생하는 이벤트.
 * @event eg.Flicking#move
 * @type eg.Flicking.FlickingEvent
 */

/**
 * Event triggered after finish moving to the destination panel.
 * @ko 목적 패널로의 이동을 완료한 다음 발생하는 이벤트.
 * @event eg.Flicking#moveEnd
 * @type eg.Flicking.FlickingEvent
 */

/**
 * Event that indicates index will be changed, and isn't restoring. Index will be changed at `moveEnd` event.<br>It can be triggered when user finished input, or flicking start to move by method.<br>It won't be triggered when moving to same panel, unless it's circulated more than one cycle in circular mode.<br>Calling `stop()` in event will prevent index changing & panel moving.<br><br>`event` doesn't have `axesEvent` property when triggered by [moveTo()]{@link eg.Flicking#moveTo}, [prev()]{@link eg.Flicking#prev}, [next()]{@link eg.Flicking#next} method.
 * @ko `restore`되지 않고, 인덱스가 변경될 것임을 나타내는 이벤트. 실제 인덱스는 `moveEnd` 이벤트에서 변경된다.<br>사용자가 입력을 마쳤을 때, 혹은 메소드를 통해 이동을 시작했을 때 발생한다.<br>동일 패널로 이동시에는 발생되지 않지만, circular 모드에서 한 바퀴 이상 순환하여 동일 패널로 도착했을 때에도 발생된다.<br>이벤트의 `stop()`을 호출시 패널로의 이동을 막는다.<br><br>[moveTo()]{@link eg.Flicking#moveTo}, [prev()]{@link eg.Flicking#prev}, [next()]{@link eg.Flicking#next}와 같은 메소드에 의해 호출되었을 경우 `event`내의 `axesEvent` 프로퍼티 값은 undefined이다.
 * @event eg.Flicking#change
 * @type eg.Flicking.ChangeEvent
 */

/**
 * Event triggered when user drag amount not reached `threshold` in [FlickingOptions]{@link eg.Flicking.FlickingOptions}.
 * @ko 사용자가 드래그한 정도가 [FlickingOptions]{@link eg.Flicking.FlickingOptions}의 `threshold`값보다 작을 때 발생하는 이벤트.
 * @event eg.Flicking#restore
 * @type eg.Flicking.FlickingEvent
 */

/**
 * Event triggered when user statically selected (clicked) panel.
 * @ko 사용자가 패널을 정적으로 선택(클릭)했을 때 발생하는 이벤트.
 * @event eg.Flicking#select
 * @type eg.Flicking.SelectEvent
 */

 /**
  * Event triggered when Flicking confronts panels don't have successive indexes, so it needs more content to draw panel in infinite mode.
  * @ko 무한 모드에서, Flicking이 인덱스가 연속하지 않은 패널들을 만나 새로운 패널이 필요함을 알리고자 할 때 발생시키는 이벤트.
  * @event eg.Flicking#needPanel
  * @type eg.Flicking.NeedPanelEvent
  */

/**
 * Event triggered when Flicking's visible panel changes. This event only triggered with `renderOnlyVisible` option.
 * @ko 보이는 패널 정보에 변화가 있을 경우에 발생되는 이벤트. `renderOnlyVisible` 옵션이 활성화된 경우에만 트리거된다.
 * @event eg.Flicking#visibleChange
 * @type eg.Flicking.VisibleChangeEvent
 */

 /**
  * Event triggered each time the image/video element inside Flicking fails to load. This event is only triggered with `resizeOnContentsReady` option.
  * @ko Flicking 내부의 이미지/비디오 엘리먼트의 로드가 실패했을때마다 발생했을 때마다 트리거되는 이벤트. `resizeOnContentsReady` 옵션이 활성화된 경우에만 트리거된다.
  * @event eg.Flicking#contentError
  * @type eg.Flicking.ContentErrorEvent
  */

export interface EventType {
  readonly HOLD_START: "holdStart";
  readonly HOLD_END: "holdEnd";
  readonly MOVE_START: "moveStart";
  readonly MOVE: "move";
  readonly MOVE_END: "moveEnd";
  readonly CHANGE: "change";
  readonly RESTORE: "restore";
  readonly SELECT: "select";
  readonly NEED_PANEL: "needPanel";
  readonly VISIBLE_CHANGE: "visibleChange";
  readonly CONTENT_ERROR: "contentError";
}

/**
 * @typedef
 * @type object
 * @memberof eg.Flicking
 * @property {string} type Name of the event.<ko>이벤트명</ko>
 * @property {number} index Index number of the current panel.<ko>현재 패널의 인덱스 번호.</ko>
 * @property {eg.Flicking.FlickingPanel|null} panel Current panel.<ko> 현재 패널.</ko>
 * @property {number} progress Absolute progress of how much it proceed from first panel. 0 at first panel, and 1 at last panel.<ko>첫 번째 패널로부터 얼마만큼 진행했는지를 나타내는 진행도. 첫번째 패널에서 0, 마지막 패널에서 1의 값을 갖는다.</ko>
 * @property {boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
 * @property {boolean} holding Whether the user is inputting through the input device. (Whether it is 'mousedown' for a mouse device or 'touchmove' for a touch device.)<ko>사용자가 입력 장치를 통해 입력중인지 여부. (마우스 장치라면 'mousedown' 여부, 터치 장치라면 'touchmove' 여부)</ko>
 * @property {function} stop Cancel the default action, and prevents every events after it.<br>Not effective with events postfixed with `-End`<ko>이벤트의 기본동작을 취소하고, 해당 이벤트 뒤에 발생할 이벤트들을 전부 발생하지 않도록 한다.<br>`-End`가 접미사로 붙은 이벤트에서는 유효한 동작을 하지 않는다.</ko>
 * @property {"PREV" | "NEXT" | null} direction Direction of the panel movement. `null` if not moved at all.<ko>패널 이동 방향. 아직 움직이지 않았을 경우 `null`이다.</ko>
 * @property {object | undefined} axesEvent Original event emitted from {@link https://naver.github.io/egjs-axes/release/latest/doc/ Axes} instance.<ko>내부의 {@link https://naver.github.io/egjs-axes/release/latest/doc Axes} 인스턴스로부터 발생된 원본 이벤트.</ko>
 * @property {eg.Flicking} currentTarget Flicking instance that triggered event.<ko>이벤트를 발생시킨 Flicking의 인스턴스</ko>
 */
export type FlickingEvent = {
  type: string;
  index: number;
  panel: FlickingPanel | null;
  progress: number;
  isTrusted: boolean;
  holding: boolean;
  stop: () => void;
  direction: ValueOf<Direction> | null;
  axesEvent?: any;
  currentTarget: Flicking;
};

/**
 * Event that indicates index will be changed, and isn't restoring. Index will be changed at `moveEnd` event.
 * @ko `restore`되지 않고, 인덱스가 변경될 것임을 나타내는 이벤트. 실제 인덱스는 `moveEnd`이벤트에서 변경된다.
 * @typedef
 * @type object
 * @memberof eg.Flicking
 * @property {string} type Name of the event.<ko>이벤트명</ko>
 * @property {number} index Expected panel's index that will arrive at animation end.<ko>애니메이션 종료 시점에 도착할 것으로 예측되는 패널의 인덱스.</ko>
 * @property {eg.Flicking.FlickingPanel | null} panel Expected panel that will arrive at animation end.<ko>애니메이션 종료 시점에 도착할 것으로 예측되는 패널.</ko>
 * @property {number} progress Absolute progress of how much it proceed from first panel. 0 at first panel, and 1 at last panel.<ko>첫 번째 패널로부터 얼마만큼 진행했는지를 나타내는 진행도. 첫번째 패널에서 0, 마지막 패널에서 1의 값을 갖는다.</ko>
 * @property {boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
 * @property {boolean} holding Whether the user is inputting through the input device. (Whether it is 'mousedown' for a mouse device or 'touchmove' for a touch device.)<ko>사용자가 입력 장치를 통해 입력중인지 여부. (마우스 장치라면 'mousedown' 여부, 터치 장치라면 'touchmove' 여부)</ko>
 * @property {function} stop Cancel the default action, and prevents every events after it.<br>Not effective with events postfixed with `-End`<ko>이벤트의 기본동작을 취소하고, 해당 이벤트 뒤에 발생할 이벤트들을 전부 발생하지 않도록 한다.<br>`-End`가 접미사로 붙은 이벤트에서는 유효한 동작을 하지 않는다.</ko>
 * @property {"PREV" | "NEXT" | null} direction Expected direction of the panel movement.<ko>예측되는 패널 이동 방향.</ko>
 * @property {object | undefined} axesEvent Original event emitted from {@link https://naver.github.io/egjs-axes/release/latest/doc/ Axes} instance.<br/>Is undefined when when triggered by [moveTo()]{@link eg.Flicking#moveTo}, [prev()]{@link eg.Flicking#prev}, [next()]{@link eg.Flicking#next}.<ko>내부의 {@link https://naver.github.io/egjs-axes/release/latest/doc Axes} 인스턴스로부터 발생된 원본 이벤트.<br/>[moveTo()]{@link eg.Flicking#moveTo}, [prev()]{@link eg.Flicking#prev}, [next()]{@link eg.Flicking#next}와 같은 메소드에 의해 발생되었을 경우 undefined.</ko>
 * @property {eg.Flicking} currentTarget Flicking instance that triggered event.<ko>이벤트를 발생시킨 Flicking의 인스턴스</ko>
 */
export type ChangeEvent = {
  type: string;
  index: number;
  panel: FlickingPanel | null;
  progress: number;
  isTrusted: boolean;
  holding: boolean;
  stop: () => void;
  direction: ValueOf<Direction> | null;
  axesEvent?: any;
  currentTarget: Flicking;
};

/**
 * Event will be triggered when panel is statically click / touched.
 * @ko 패널이 정적으로 클릭(혹은 터치)되었을 때 발생되는 이벤트.
 * @typedef
 * @type object
 * @memberof eg.Flicking
 * @property {string} type Name of the event.<ko>이벤트명</ko>
 * @property {number} index Selected panel's index.<ko>선택된 패널의 인덱스.</ko>.
 * @property {eg.Flicking.FlickingPanel | null} panel Selected panel.<ko>선택된 패널.</ko>.
 * @property {number} progress Absolute progress of how much it proceed from first panel. 0 at first panel, and 1 at last panel.<ko>첫 번째 패널로부터 얼마만큼 진행했는지를 나타내는 진행도. 첫번째 패널에서 0, 마지막 패널에서 1의 값을 갖는다.</ko>
 * @property {boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
 * @property {boolean} holding Whether the user is inputting through the input device. (Whether it is 'mousedown' for a mouse device or 'touchmove' for a touch device.)<ko>사용자가 입력 장치를 통해 입력중인지 여부. (마우스 장치라면 'mousedown' 여부, 터치 장치라면 'touchmove' 여부)</ko>
 * @property {"PREV" | "NEXT" | null} direction Expected direction of the panel movement.<ko>예측되는 패널 이동 방향.</ko>
 * @property {object | undefined} axesEvent Original event emitted from {@link https://naver.github.io/egjs-axes/release/latest/doc/ Axes} instance.<ko>내부의 {@link https://naver.github.io/egjs-axes/release/latest/doc Axes} 인스턴스로부터 발생된 원본 이벤트.</ko>
 * @property {eg.Flicking} currentTarget Flicking instance that triggered event.<ko>이벤트를 발생시킨 Flicking의 인스턴스</ko>
 */
export type SelectEvent = {
  type: string;
  index: number;
  panel: FlickingPanel | null;
  element: HTMLElement;
  progress: number;
  isTrusted: boolean;
  holding: boolean;
  direction: ValueOf<Direction> | null;
  axesEvent?: any;
  currentTarget: Flicking;
  stop: () => void;
};

/**
 * Event can be triggered in infinite mode. When camera element reaches at infinite threshold, this event can be triggered to indicate there should be more content to be displayed.
 * @ko 무한 모드에서 발생될 수 있는 이벤트. 화면의 양 끝, 혹은 불연속적인 인덱스를 가진 패널을 기준으로 `infiniteThreshold`만큼 떨어진 지점에 도달하였을 때 발생될 수 있다.
 * @typedef
 * @type object
 * @memberof eg.Flicking
 * @property {string} type Name of the event.<ko>이벤트명</ko>
 * @property {number} index Index of panel that needs panel before or after.<ko>앞 또는 뒤에 패널이 필요한 패널의 인덱스.</ko>.
 * @property {eg.Flicking.FlickingPanel | null} panel Reference panel that needs panel before or after it.<ko>앞 또는 뒤에 패널이 필요한 기준 패널.</ko>.
 * @property {boolean} progress Absolute progress of how much it proceed from first panel. 0 at first panel, and 1 at last panel.<ko>첫 번째 패널로부터 얼마만큼 진행했는지를 나타내는 진행도. 첫번째 패널에서 0, 마지막 패널에서 1의 값을 갖는다.</ko>
 * @property {boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
 * @property {boolean} holding Whether the user is inputting through the input device. (Whether it is 'mousedown' for a mouse device or 'touchmove' for a touch device.)<ko>사용자가 입력 장치를 통해 입력중인지 여부. (마우스 장치라면 'mousedown' 여부, 터치 장치라면 'touchmove' 여부)</ko>
 * @property {"PREV" | "NEXT" | null} direction Direction of panel is needed from reference panel. `null` if no panel exists.<ko>기준 패널로부터 패널이 필요한 방향. 패널이 하나도 없을 경우 `null`이다.</ko>
 * @property {object | undefined} axesEvent Original event emitted from {@link https://naver.github.io/egjs-axes/release/latest/doc/ Axes} instance.<ko>내부의 {@link https://naver.github.io/egjs-axes/release/latest/doc Axes} 인스턴스로부터 발생된 원본 이벤트.</ko>
 * @property {eg.Flicking} currentTarget Flicking instance that triggered event.<ko>이벤트를 발생시킨 Flicking의 인스턴스</ko>
 * @property {function} fill A helper function that can be used to fill the empty panel area without consideration of direction.<br/>Check the example below.<ko>방향을 고려하지 않고 패널을 손쉽게 추가할 수 있게 해주는 헬퍼 함수.<br/>사용 방법은 아래의 예를 참조.</ko>
 * @property {object} range - Range of indexes that is emtpy.<ko>패널이 존재하지 않는 인덱스의 범위.</ko>
 * @property {number} [range.min] - Minimum index of panels needed.<ko>필요한 패널들의 최소 인덱스.</ko>.
 * @property {number} [range.max] - Maximum index of panels needed.<ko>필요한 패널들의 최대 인덱스.</ko>.
 * @property {number} [range.length] - How many panels are needed to fill empty spaces.<ko>몇 개의 패널이 필요한지를 나타내는 정수.</ko>
 * @example
 * ```js
 * flicking.on("needPanel", e => {
 *     // You can use "fill" method in event to add panels easily.
 *     e.fill("<div>New panel</div>");
 * })
 * ```
 */
export type NeedPanelEvent = {
  type: string;
  index: number;
  panel: FlickingPanel | null;
  progress: number;
  isTrusted: boolean;
  holding: boolean;
  direction: ValueOf<Direction> | null;
  axesEvent?: any;
  currentTarget: Flicking;
  fill: (elements: ElementLike | ElementLike[]) => FlickingPanel[];
  range: {
    min: number;
    max: number;
    length: number;
  };
};

/**
 * Event triggered when Flicking's visible panel changes. This event is only triggered with `renderOnlyVisible` option.
 * @ko 보이는 패널 정보에 변화가 있을 경우에 발생되는 이벤트. `renderOnlyVisible` 옵션이 활성화된 경우에만 트리거된다.
 * @typedef
 * @type object
 * @memberof eg.Flicking
 * @property {string} type Name of the event.<ko>이벤트명</ko>
 * @property {object} range - Range of indexes that is newly visible.<ko>새로 보이는 패널의 인덱스 범위.</ko>
 * @property {number} [range.min] - Minimum index of visible panels.<ko>보이는 패널들 중 최소 인덱스.</ko>.
 * @property {number} [range.max] - Maximum index of visible panels.<ko>보이는 패널들 중 최대 인덱스.</ko>.
 */
export type VisibleChangeEvent = {
  type: string;
  range: {
    min: number;
    max: number;
  };
};

/**
 * Event triggered each time the image/video element inside Flicking fails to load. This event is only triggered with `resizeOnContentsReady` option.
 * @ko Flicking 내부의 이미지/비디오 엘리먼트의 로드가 실패했을때마다 발생했을 때마다 트리거되는 이벤트. `resizeOnContentsReady` 옵션이 활성화된 경우에만 트리거된다.
 * @typedef
 * @type object
 * @memberof eg.Flicking
 * @property {string} type Name of the event.<ko>이벤트명</ko>
 * @property {HTMLElement} element The image/video element that error is occured.<ko>에러가 발생한 이미지/비디오 엘리먼트</ko>
 */
export type ContentErrorEvent = {
  type: string;
  element: HTMLElement;
};

export interface StateType {
  readonly IDLE: 0;
  readonly HOLDING: 1;
  readonly DRAGGING: 2;
  readonly ANIMATING: 3;
  readonly DISABLED: 4;
}

export interface AxesEventType {
  readonly HOLD: "hold";
  readonly CHANGE: "change";
  readonly RELEASE: "release";
  readonly ANIMATION_END: "animationEnd";
  readonly FINISH: "finish";
}

export interface TriggerCallback {
  onSuccess(callback: () => any): TriggerCallback;
  onStopped(callback: () => any): TriggerCallback;
}

export interface FlickingContext {
  flicking: Flicking;
  viewport: Viewport;
  transitTo: StateMachine["transitTo"];
  triggerEvent: Flicking["triggerEvent"];
  moveCamera: Flicking["moveCamera"];
  stopCamera: Viewport["stopCamera"];
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * @typedef
 * @memberof eg.Flicking
 * @property - Method called when plugin is added.<ko>플러그인을 추가했을 때 발생하는 메소드.</ko>
 * @property - Method called when `resize` or `update` in flicking.<ko>플리킹에서 `resize`가 발생하거나 `update`를 했을 때 발생하는 메소드.</ko>
 * @property - Method called when plugin is removed.<ko>플러그인을 제거했을 때 발생하는 메소드.</ko>
 */
export interface Plugin {
  init(flicking: Flicking): void;
  update?(flicking: Flicking): void;
  destroy(flicking: Flicking): void;
}

export type ExcludeKeys = keyof Component
  | "replace" | "append" | "remove" | "prepend"
  | "beforeSync" | "sync" | "getCloneCount" | "getRenderingIndexes"
  | "getLastIndex" | "setLastIndex" | "addPlugins" | "removePlugins";
export type FlickingMethodsKeys = Exclude<keyof Flicking, ExcludeKeys>;
export type FlickingMethods = Pick<Flicking, FlickingMethodsKeys>;

export interface DestroyOption {
  preserveUI: boolean;
}

export type BeforeSyncResult = Pick<DiffResult<any>, "added" | "changed" | "maintained" | "removed">;
export type SyncResult = Pick<DiffResult<HTMLElement>, "added" | "changed" | "maintained" | "removed" | "list">;

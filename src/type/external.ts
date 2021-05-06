import Flicking from "~/Flicking";

/**
 * HTML `string` of single/mutiple HTMLElement, or an instance of `HTMLElement`
 * @ko 단일/복수의 HTMLElement의 outerHTML에 해당하는 `string`, 혹은 `HTMLElement`의 인스턴스
 * @typedef
 */
export type ElementLike = string | HTMLElement;

/**
 * Flicking Plugin
 * @ko Flicking 플러그인
 * @property - Initialize the plugin<ko>플러그인을 초기화합니다</ko>
 * @property - Destroy plugin and detach all events binded<ko>플러그인을 제거하고 부착된 모든 이벤트들을 제거합니다.</ko>
 * @property - Update plugin to match current Flicking's status<ko>현재 Flicking의 상태에 대응하도록 플러그인을 업데이트합니다.</ko>
 * @typedef
 */
export interface Plugin {
  init(flicking: Flicking): void;
  destroy(): void;
  update(flicking: Flicking): void;
}

/**
 * Flicking Status returned by {@link Flicking#getStatus}
 * @ko {@link Flicking#getStatus}에 의해 반환된 Flicking 상태 객체
 * @property {number} index An index of the active panel<ko>활성화된 패널의 인덱스</ko>
 * @property {number} position A camera {@link Camera#position position}<ko>카메라 {@link Camera#position position}</ko>
 * @property {string[]} panels An `outerHTML` array of panel elements<ko>패널의 `outerHTML` 배열</ko>
 */
export interface Status {
  index: number;
  position: number;
  panels: string[];
}

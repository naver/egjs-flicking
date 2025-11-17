import Flicking from "../Flicking";
import { SnapControlOptions, FreeControlOptions, StrictControlOptions } from "../control";
import { MOVE_TYPE } from "../const/external";
import { ValueOf } from "../type/internal";

/**
 * HTML `string` of single/mutiple HTMLElement, or an instance of `HTMLElement`
 * @ko 단일/복수의 HTMLElement의 outerHTML에 해당하는 `string`, 혹은 `HTMLElement`의 인스턴스
 * @typedef
 */
export type ElementLike = string | HTMLElement;

/**
 * Flicking Plugin
 * @ko Flicking 플러그인
 * @interface
 * @property - Initialize the plugin<ko>플러그인을 초기화합니다</ko>
 * @property - Destroy plugin and detach all events binded<ko>플러그인을 제거하고 부착된 모든 이벤트들을 제거합니다.</ko>
 * @property - Update plugin to match current Flicking's status<ko>현재 Flicking의 상태에 대응하도록 플러그인을 업데이트합니다.</ko>
 */
export interface Plugin {
  init(flicking: Flicking): void;
  destroy(): void;
  update(flicking: Flicking): void;
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
export interface Status {
  index?: number;
  position?: {
    panel: number;
    progressInPanel: number;
  };
  visibleOffset?: number;
  panels: Array<{
    index: number;
    html?: string;
  }>;
}

/* eslint-disable @typescript-eslint/indent */
export type MoveTypeOptions<T extends ValueOf<typeof MOVE_TYPE>> =
  T extends typeof MOVE_TYPE.SNAP ? [T] | [T, Partial<SnapControlOptions>] :
  T extends typeof MOVE_TYPE.FREE_SCROLL ? [T] | [T, Partial<FreeControlOptions>] :
  T extends typeof MOVE_TYPE.STRICT ? [T] | [T, Partial<StrictControlOptions>] :
  [T];
/* eslint-enable */

/**
 * A current parameters of the Camera for updating {@link AxesController}
 * @ko {@link AxesController}를 업데이트하기 위한 현재 Camera 패러미터들
 * @interface
 * @property {object} range A moveable range for Camera<ko>Camera가 이동 가능한 범위</ko>
 * @property {number} position Current camera position<ko>현재 카메라 좌표</ko>
 * @property {boolean} circular A Boolean indicating whether the {@link Flicking#circular circular} option is enabled<ko>{@link Flicking#circular circular}옵션 활성화 여부</ko>
 * @readonly
 */
export interface ControlParams {
  range: {
    min: number;
    max: number;
  };
  position: number;
  circular: boolean;
}

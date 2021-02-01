import { SnapControlOptions } from "~/control";
import { MOVE_TYPE } from "~/const/external";
import { ValueOf } from "~/type/internal";

/**
 * HTML `string` of single/mutiple HTMLElement, or an instance of `HTMLElement`.
 *
 * @ko 단일/복수의 HTMLElement의 outerHTML에 해당하는 `string`, 혹은 `HTMLElement`의 인스턴스.
 * @typedef
 * @memberof eg.Flicking
 */
export type ElementLike = string | HTMLElement;

export interface MoveTypeOption extends SnapControlOptions {
  type: ValueOf<typeof MOVE_TYPE>;
}

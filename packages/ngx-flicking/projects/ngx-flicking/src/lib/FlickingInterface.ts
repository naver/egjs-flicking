import { Directive } from '@angular/core';
import VanillaFlicking, { withFlickingMethods } from '@egjs/flicking';

@Directive()
export default class FlickingInterface {
  @withFlickingMethods protected _vanillaFlicking!: VanillaFlicking | null;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface FlickingInterface extends VanillaFlicking {}

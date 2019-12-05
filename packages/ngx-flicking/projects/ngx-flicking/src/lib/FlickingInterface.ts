import NativeFlicking, { withFlickingMethods } from '@egjs/flicking';
import { FlickingType } from './types';
import { NgxFlickingComponent } from './ngx-flicking.component';

export default class FlickingInterface {
  @withFlickingMethods
  protected flicking?: NativeFlicking | null;
}
export default interface FlickingInterface extends FlickingType<NgxFlickingComponent> { }

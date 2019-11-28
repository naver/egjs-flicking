import NativeFlicking, { withFlickingMethods } from '@egjs/flicking';
import { FlickingType } from './types';

export default class FlickingInterface {
  @withFlickingMethods
  protected flicking?: NativeFlicking | null;
}
export default interface FlickingInterface extends FlickingType<FlickingInterface> { }

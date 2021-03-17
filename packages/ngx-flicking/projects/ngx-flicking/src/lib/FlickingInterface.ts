import NativeFlicking, { withFlickingMethods } from "@egjs/flicking";

export default class FlickingInterface {
  @withFlickingMethods protected _nativeFlicking: NativeFlicking | null;
}
export default interface FlickingInterface extends NativeFlicking { }

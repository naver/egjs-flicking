import Flicking from "@egjs/flicking";


declare class Plugin {
  constructor(options: any);
  resize(): void;
}

export class OpacityEffect extends Plugin {
  constructor(selector: string);
  get(): any;
}
export class ParallaxEffect extends Plugin {
  constructor(selector: string);
  get(): any;
}
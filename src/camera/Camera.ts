import Component from "@egjs/component";
import Flicking from "~/Flicking";

export interface CameraOption {
  element: HTMLElement;
  flicking: Flicking;
}

abstract class Camera extends Component {
  // Options

  // Internal states
  protected _flicking: Flicking;
  protected _el: HTMLElement;
  protected _position: number;
  protected _alignPos: number;
  protected _range: { min: number; max: number };

  public constructor({
    element,
    flicking
  }: CameraOption) {
    super();

    this._flicking = flicking;
    this._el = element;
    this._position = 0;
    this._alignPos = 0;
    this._range = { min: 0, max: 0 };
  }

  public destroy(): this {
    return this;
  }

  public lookAt(pos: number): this {
    this._position = pos;
    this._applyTransform();
    return this;
  }

  private _applyTransform() {
    const el = this._el;

    el.style.transform = `translate(${-(this._position - this._alignPos)}px)`;
    // this.emit(EVENTS.MOVE, { position: this._position });
  }

  public abstract updateRange(): this;
}

export default Camera;

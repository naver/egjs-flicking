import Panel from "./Panel";

class AnchorPoint {
  private _index: number;
  private _pos: number;
  private _panel: Panel;

  public get index() { return this._index; }
  public get position() { return this._pos; }
  public get panel() { return this._panel; }

  public constructor({
    index,
    position,
    panel
  }: {
    index: number;
    position: number;
    panel: Panel;
  }) {
    this._index = index;
    this._pos = position;
    this._panel = panel;
  }
}

export default AnchorPoint;

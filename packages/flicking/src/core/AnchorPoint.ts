/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "./panel/Panel";

/**
 * Options for creating an AnchorPoint
 */
export interface AnchorPointOptions {
  /** Index of AnchorPoint */
  index: number;
  /** Position of AnchorPoint */
  position: number;
  /** A {@link Panel} instance AnchorPoint is referencing to */
  panel: Panel;
}

/**
 * A data component that has actual position where the camera should be stopped at
 */
class AnchorPoint {
  private _index: number;
  private _pos: number;
  private _panel: Panel;

  /**
   * Index of AnchorPoint
   * @readonly
   */
  public get index(): number {
    return this._index;
  }
  /**
   * Position of AnchorPoint
   * @readonly
   */
  public get position(): number {
    return this._pos;
  }
  /**
   * A {@link Panel} instance AnchorPoint is referencing to
   * @readonly
   */
  public get panel(): Panel {
    return this._panel;
  }

  /**
   * @param options - {@link AnchorPointOptions}
   */
  public constructor(options: AnchorPointOptions) {
    const { index, position, panel } = options;

    this._index = index;
    this._pos = position;
    this._panel = panel;
  }
}

export default AnchorPoint;

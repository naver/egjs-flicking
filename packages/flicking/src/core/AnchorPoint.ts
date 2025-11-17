/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "./panel/Panel";

/**
 * A data component that has actual position where the camera should be stopped at
 * @ko 카메라가 정지해야하는 실제 위치를 담고 있는 데이터 컴포넌트
 */
class AnchorPoint {
  private _index: number;
  private _pos: number;
  private _panel: Panel;

  /**
   * Index of AnchorPoint
   * @ko AnchorPoint의 인덱스
   * @type {number}
   * @readonly
   */
  public get index() { return this._index; }
  /**
   * Position of AnchorPoint
   * @ko AnchorPoint의 좌표
   * @type {number}
   * @readonly
   */
  public get position() { return this._pos; }
  /**
   * A {@link Panel} instance AnchorPoint is referencing to
   * @ko AnchorPoint가 참조하고 있는 {@link Panel}
   * @type {Panel}
   * @readonly
   */
  public get panel() { return this._panel; }

  /**
   * @param {object} options An options object<ko>옵션 객체</ko>
   * @param {number} [options.index] Index of AnchorPoint<ko>AnchorPoint의 인덱스</ko>
   * @param {number} [options.position] Position of AnchorPoint<ko>AnchorPoint의 좌표</ko>
   * @param {Panel} [options.panel] A {@link Panel} instance AnchorPoint is referencing to<ko>AnchorPoint가 참조하고 있는 {@link Panel}</ko>
   */
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

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "../Flicking";
import Panel from "../core/Panel/Panel";
import { ALIGN } from "../const/external";
import { getFlickingAttached } from "../utils";
import { ElementLike } from "../type/external";

import RenderingStrategy from "./RenderingStrategy/RenderingStrategy";
import RawRenderingStrategy from "./RenderingStrategy/RawRenderingStrategy";

export interface RendererOptions {
  align: FlickingOptions["align"];
  strategy: RenderingStrategy;
}

/**
 * A component that manages {@link Panel} and its elements
 * @ko {@link Panel}과 그 엘리먼트들을 관리하는 컴포넌트
 */
abstract class Renderer {
  // Internal States
  protected _flicking: Flicking | null;
  protected _panels: Panel[];
  protected _renderingStrategy: RenderingStrategy;

  // Options
  protected _align: RendererOptions["align"];

  // Internal states Getter
  /**
   * Array of panels
   * @ko 전체 패널들의 배열
   * @type {Panel[]}
   * @readonly
   * @see Panel
   */
  public get panels() { return this._panels; }
  /**
   * Count of panels
   * @ko 전체 패널의 개수
   * @type {number}
   * @readonly
   */
  public get panelCount() { return this._panels.length; }

  // Options Getter
  /**
   * A {@link Panel}'s {@link Panel#align align} value that applied to all panels
   * @ko {@link Panel}에 공통적으로 적용할 {@link Panel#align align} 값
   * @type {Constants.ALIGN | string | number}
   */
  public get align() { return this._align; }

  // Options Setter
  public set align(val: RendererOptions["align"]) {
    this._align = val;

    const panelAlign = this._getPanelAlign();
    this._panels.forEach(panel => { panel.align = panelAlign; });
  }

  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An {@link Flicking#align align} value that will be applied to all panels<ko>전체 패널에 적용될 {@link Flicking#align align} 값</ko>
   * @param {OffsetManipulator} [options.elementManipulator] An instance of {@link OffsetManipulator} that renderer will use<ko>Renderer가 사용할 {@link OffsetManipulator}의 인스턴스</ko>
   */
  public constructor({
    align = ALIGN.CENTER,
    strategy = new RawRenderingStrategy()
  }: Partial<RendererOptions> = {}) {
    this._align = align;
    this._flicking = null;
    this._renderingStrategy = strategy;
    this._panels = [];
  }

  /**
   * Render panel elements inside the camera element
   * @ko 패널 엘리먼트들을 카메라 엘리먼트 내부에 렌더링합니다
   * @method
   * @abstract
   * @memberof Renderer
   * @instance
   * @name render
   * @chainable
   * @return {this}
   */
  public abstract render(): Promise<void>;
  public abstract forceRenderAllPanels(): Promise<void>;
  public abstract insert(index: number, element: ElementLike | ElementLike[]): Panel[];
  public abstract remove(index: number, deleteCount: number): Panel[];

  protected abstract _collectPanels(): this;

  /**
   * Initialize Renderer
   * @ko Renderer를 초기화합니다
   * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
   * @chainable
   * @return {this}
   */
  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._collectPanels();

    return this;
  }

  /**
   * Destroy Renderer and return to initial state
   * @ko Renderer를 초기 상태로 되돌립니다
   * @return {void}
   */
  public destroy(): void {
    this._flicking = null;
    this._panels = [];
  }

  /**
   * Return the {@link Panel} at the given index. `null` if it doesn't exists.
   * @ko 주어진 인덱스에 해당하는 {@link Panel}을 반환합니다. 주어진 인덱스에 해당하는 패널이 존재하지 않을 경우 `null`을 반환합니다.
   * @return {Panel | null} Panel at the given index<ko>주어진 인덱스에 해당하는 패널</ko>
   * @see Panel
   */
  public getPanel(index: number): Panel | null {
    return this._panels[index] || null;
  }

  /**
   * Update all panel sizes
   * @ko 모든 패널의 크기를 업데이트합니다
   * @chainable
   * @return {this}
   */
  public updatePanelSize(): this {
    this._panels.forEach(panel => panel.resize());
    return this;
  }

  protected _getPanelAlign() {
    const align = this._align;

    return typeof align === "object"
      ? (align as { panel: string | number }).panel
      : align;
  }

  protected _getPanelSizeSum(panels: Panel[]): number {
    const firstPanel = panels[0];
    const lastPanel = panels[panels.length - 1];

    const marginDiff = lastPanel.margin.next - firstPanel.margin.prev;

    return (lastPanel.range.max - firstPanel.range.min) + marginDiff;
  }

  protected _getRenderingPanelsByOrder(): Panel[] {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const panels = flicking.renderer.panels;

    return panels.filter(panel => panel.rendered)
      .sort((a, b) => (a.position + a.offset) - (b.position + b.offset));
  }

  protected _updateCameraAndControl() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const { camera, control } = flicking;

    camera.updateRange();
    camera.updateAnchors();
    camera.resetNeedPanelHistory();
    control.updateInput();
  }
}

export default Renderer;

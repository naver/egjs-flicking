/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "../Flicking";
import Panel, { PanelOptions } from "../core/panel/Panel";
import { ALIGN } from "../const/external";
import { getFlickingAttached, getMinusCompensatedIndex, includes } from "../utils";

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

  protected abstract _collectPanels(): void;
  protected abstract _createPanel(el: any, options: PanelOptions): Panel;
  protected abstract _insertPanelElements(panels: Panel[], nextSibling: Panel | null): void;
  protected abstract _removePanelElements(panels: Panel[]): void;

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

  /**
   * Insert new panels at given index
   * This will increase index of panels after by the number of panels added
   * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
   * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
   * @param {number} index Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
   * @param {any[]} elements An array of element or framework component with element in it<ko>엘리먼트의 배열 혹은 프레임워크에서 엘리먼트를 포함한 컴포넌트들의 배열</ko>
   * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
   */
  public batchInsert(...items: Array<{
    index: number;
    elements: any[];
  }>): Panel[] {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const { control } = flicking;
    const align = this._getPanelAlign();

    const allPanelsInserted = items.reduce((addedPanels, item) => {
      const insertingIdx = getMinusCompensatedIndex(item.index, panels.length);
      const panelsPushed = panels.slice(insertingIdx);
      const panelsInserted = item.elements.map(el => this._createPanel(el, { index: insertingIdx, align, flicking }));

      panels.splice(insertingIdx, 0, ...panelsInserted);

      // Resize the newly added panels
      panelsInserted.forEach(panel => panel.resize());

      const insertedSize = this._getPanelSizeSum(panelsInserted);

      // Update panel indexes & positions
      panelsPushed.forEach(panel => {
        panel.increaseIndex(panelsInserted.length);
        panel.increasePosition(insertedSize);
      });

      // Insert the actual elements as camera element's children
      this._insertPanelElements(panelsInserted, panelsPushed[0] ?? null);

      return [...addedPanels, ...panelsInserted];
    }, []);

    if (allPanelsInserted.length <= 0) return [];

    // Update camera & control
    this._updateCameraAndControl();

    void this.render();

    // Move to the first panel added if no panels existed
    // FIXME: fix for animating case
    if (allPanelsInserted.length > 0 && !control.animating) {
      void control.moveToPanel(control.activePanel || allPanelsInserted[0], {
        duration: 0
      }).catch(() => void 0);
    }

    flicking.camera.updateOffset();

    return allPanelsInserted;
  }

  /**
   * Remove the panel at the given index
   * This will decrease index of panels after by the number of panels removed
   * @ko 주어진 인덱스의 패널을 제거합니다
   * 해당 인덱스보다 큰 인덱스를 가진 기존 패널들은 제거한 패널의 개수만큼 인덱스가 감소합니다
   * @param {number} index Index of panel to remove<ko>제거할 패널의 인덱스</ko>
   * @param {number} [deleteCount=1] Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>
   * @return An array of removed panels<ko>제거된 패널들의 배열</ko>
   */
  public batchRemove(...items: Array<{ index: number; deleteCount: number }>): Panel[] {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const { camera, control } = flicking;
    const activePanel = control.activePanel;
    const activeIndex = control.activeIndex;

    const allPanelsRemoved = items.reduce((removed, item) => {
      const { index, deleteCount } = item;
      const removingIdx = getMinusCompensatedIndex(index, panels.length);

      const panelsPulled = panels.slice(removingIdx + deleteCount);
      const panelsRemoved = panels.splice(removingIdx, deleteCount);

      if (panelsRemoved.length <= 0) return [];

      // Update panel indexes & positions
      const removedSize = this._getPanelSizeSum(panelsRemoved);
      panelsPulled.forEach(panel => {
        panel.decreaseIndex(panelsRemoved.length);
        panel.decreasePosition(removedSize);
      });

      this._removePanelElements(panelsRemoved);

      // Remove panel elements
      panelsRemoved.forEach(panel => panel.destroy());

      // Update camera & control
      this._updateCameraAndControl();

      if (includes(panelsRemoved, activePanel)) {
        control.resetActive();
      }

      return [...removed, ...panelsRemoved];
    }, []);

    void this.render();

    // FIXME: fix for animating case
    if (allPanelsRemoved.length > 0 && !control.animating) {
      const targetPanel = includes(allPanelsRemoved, activePanel)
        ? (panels[activeIndex] || panels[panels.length - 1])
        : activePanel;

      if (targetPanel) {
        void control.moveToPanel(targetPanel, {
          duration: 0
        }).catch(() => void 0);
      } else {
        // All panels removed
        void camera.lookAt(0);
      }
    }

    flicking.camera.updateOffset();

    return allPanelsRemoved;
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

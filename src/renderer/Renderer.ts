/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "../Flicking";
import Panel from "../core/Panel";
import { ALIGN } from "../const/external";
import { getFlickingAttached, getMinusCompensatedIndex, includes, parseElement, toArray } from "../utils";
import { ElementLike } from "../type/external";

import OffsetManipulator from "./OffsetManipulator/OffsetManipulator";

export interface RendererOptions {
  align: FlickingOptions["align"];
  elementManipulator: OffsetManipulator;
}

/**
 * A component that manages {@link Panel} and its elements
 * @ko {@link Panel}과 그 엘리먼트들을 관리하는 컴포넌트
 */
abstract class Renderer {
  // Internal States
  protected _flicking: Flicking | null;
  protected _elementManipulator: OffsetManipulator;
  protected _panels: Panel[];

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
  /**
   * An instance of the {@link OffsetManipulator} that Renderer's using
   * @ko Renderer가 현재 사용중인 {@link OffsetManipulator}의 인스턴스
   * @type {OffsetManipulator}
   * @readonly
   */
  public get elementManipulator() { return this._elementManipulator; }

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
    elementManipulator = new OffsetManipulator()
  }: Partial<RendererOptions> = {}) {
    this._align = align;
    this._flicking = null;
    this._elementManipulator = elementManipulator;
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
  public abstract render(): this;

  /**
   * Initialize Renderer
   * @ko Renderer를 초기화합니다
   * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
   * @chainable
   * @return {this}
   */
  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._elementManipulator.init(flicking);
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
    this._elementManipulator.destroy();
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
   * Insert new panels at given index
   * This will increase index of panels after by the number of panels added
   * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
   * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
   * @param {number} index Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
   * @param {Flicking.ElementLike | Flicking.ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
   * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
   */
  public insert(index: number, element: ElementLike | ElementLike[]): Panel[] {
    const panels = this._panels;
    const elementManipulator = this._elementManipulator;
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const { control } = flicking;
    const align = this._getPanelAlign();

    const elements = parseElement(element);
    const insertingIdx = getMinusCompensatedIndex(index, panels.length);

    const panelsPushed = panels.slice(insertingIdx);
    const newPanels = elements.map((el, elIdx) => new Panel({ el, index: insertingIdx + elIdx, align, flicking }));

    if (newPanels.length <= 0) return [];

    // Reset the order of the elements first
    elementManipulator.resetPanelElementOrder(panels);

    panels.splice(insertingIdx, 0, ...newPanels);

    // Insert the actual elements as camera element's children
    elementManipulator.insertPanelElements(newPanels, panelsPushed[0] || null);

    // Resize the newly added panels
    newPanels.forEach(panel => panel.resize());

    const insertedSize = this._getPanelSizeSum(newPanels);

    // Update panel indexes & positions
    panelsPushed.forEach(panel => {
      panel.increaseIndex(newPanels.length);
      panel.increasePosition(insertedSize);
    });

    // Update camera & control
    this._updateCameraAndControl();

    this.render();

    // Move to the first panel added if no panels existed
    // FIXME: fix for animating case
    if (newPanels.length > 0 && !control.animating) {
      void control.moveToPanel(control.activePanel || newPanels[0], {
        duration: 0
      }).catch(() => void 0);
    }

    return newPanels;
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
  public remove(index: number, deleteCount: number = 1): Panel[] {
    const panels = this._panels;
    const elementManipulator = this._elementManipulator;
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const { camera, control } = flicking;
    const activePanel = control.activePanel;
    const removingIdx = getMinusCompensatedIndex(index, panels.length);

    const panelsPulled = panels.slice(removingIdx + deleteCount);
    const panelsRemoved = panels.splice(removingIdx, deleteCount);

    if (panelsRemoved.length <= 0) return [];

    // Reset the order of the elements first
    elementManipulator.resetPanelElementOrder(panels);

    // Update panel indexes & positions
    const removedSize = this._getPanelSizeSum(panelsRemoved);
    panelsPulled.forEach(panel => {
      panel.decreaseIndex(panelsRemoved.length);
      panel.decreasePosition(removedSize);
    });

    // Remove panel elements
    elementManipulator.removePanelElements(panelsRemoved);
    panelsRemoved.forEach(panel => panel.destroy());

    // Update camera & control
    this._updateCameraAndControl();

    if (includes(panelsRemoved, activePanel)) {
      control.resetActive();
    }

    this.render();

    // FIXME: fix for animating case
    if (panelsRemoved.length > 0 && !control.animating) {
      const targetPanel = includes(panelsRemoved, activePanel)
        ? (panelsPulled[0] || panels[panels.length - 1])
        : activePanel;

      if (targetPanel) {
        void control.moveToPanel(targetPanel, {
          duration: 0
        }).catch(() => void 0);
      } else {
        // All panels removed
        camera.lookAt(0);
      }
    }

    return panelsRemoved;
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

  protected _collectPanels(): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const cameraElement = flicking.camera.element;

    // Remove all text nodes in the camera element
    this._elementManipulator.removeAllTextNodes(cameraElement);

    const align = this._getPanelAlign();
    const cameraChilds = toArray(cameraElement.children);

    this._panels = cameraChilds.map(
      (el: HTMLElement, index: number) => new Panel({ flicking, el, index, align })
    );
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

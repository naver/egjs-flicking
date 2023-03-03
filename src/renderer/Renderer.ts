/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";
import ImReady from "@egjs/imready";

import Flicking, { FlickingOptions } from "../Flicking";
import Panel, { PanelOptions } from "../core/panel/Panel";
import FlickingError from "../core/FlickingError";
import { ALIGN, EVENTS } from "../const/external";
import * as ERROR from "../const/error";
import { getFlickingAttached, getMinusCompensatedIndex, includes, parsePanelAlign } from "../utils";

import RenderingStrategy from "./strategy/RenderingStrategy";

export interface RendererOptions {
  align?: FlickingOptions["align"];
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
  protected _rendering: boolean;

  // Options
  protected _align: NonNullable<RendererOptions["align"]>;
  protected _strategy: RendererOptions["strategy"];

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
   * A boolean value indicating whether rendering is in progress
   * @ko 현재 렌더링이 시작되어 끝나기 전까지의 상태인지의 여부
   * @type {boolean}
   * @readonly
   * @internal
   */
  public get rendering() { return this._rendering; }
  /**
   * Count of panels
   * @ko 전체 패널의 개수
   * @type {number}
   * @readonly
   */
  public get panelCount() { return this._panels.length; }
  /**
   * @internal
   */
  public get strategy() { return this._strategy; }

  // Options Getter
  /**
   * A {@link Panel}'s {@link Panel#align align} value that applied to all panels
   * @ko {@link Panel}에 공통적으로 적용할 {@link Panel#align align} 값
   * @type {Constants.ALIGN | string | number}
   */
  public get align() { return this._align; }

  // Options Setter
  public set align(val: NonNullable<RendererOptions["align"]>) {
    this._align = val;

    const panelAlign = parsePanelAlign(val);
    this._panels.forEach(panel => { panel.align = panelAlign; });
  }

  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {Constants.ALIGN | string | number} [options.align="center"] An {@link Flicking#align align} value that will be applied to all panels<ko>전체 패널에 적용될 {@link Flicking#align align} 값</ko>
   * @param {object} [options.strategy] An instance of RenderingStrategy(internal module)<ko>RenderingStrategy의 인스턴스(내부 모듈)</ko>
   */
  public constructor({
    align = ALIGN.CENTER,
    strategy
  }: RendererOptions) {
    this._flicking = null;
    this._panels = [];
    this._rendering = false;

    // Bind options
    this._align = align;
    this._strategy = strategy;
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

  protected abstract _collectPanels(): void;
  protected abstract _createPanel(el: any, options: Omit<PanelOptions, "elementProvider">): Panel;

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

  public forceRenderAllPanels(): Promise<void> {
    this._panels.forEach(panel => panel.markForShow());

    return Promise.resolve();
  }

  /**
   * Update all panel sizes
   * @ko 모든 패널의 크기를 업데이트합니다
   * @chainable
   * @return {this}
   */
  public updatePanelSize(): this {
    const flicking = getFlickingAttached(this._flicking);
    const panels = this._panels;

    if (panels.length <= 0) return this;

    if (flicking.panelsPerView > 0) {
      const firstPanel = panels[0];
      firstPanel.resize();

      this._updatePanelSizeByGrid(firstPanel, panels);
    } else {
      flicking.panels.forEach(panel => panel.resize());
    }

    return this;
  }

  /**
   * Insert new panels at given index
   * This will increase index of panels after by the number of panels added
   * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
   * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
   * @param {Array<object>} items An array of items to insert<ko>추가할 아이템들의 배열</ko>
   * @param {number} [items.index] Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
   * @param {any[]} [items.elements] An array of element or framework component with element in it<ko>엘리먼트의 배열 혹은 프레임워크에서 엘리먼트를 포함한 컴포넌트들의 배열</ko>
   * @param {boolean} [items.hasDOMInElements] Whether it contains actual DOM elements. If set to true, renderer will add them to the camera element<ko>내부에 실제 DOM 엘리먼트들을 포함하고 있는지 여부. true로 설정할 경우, 렌더러는 해당 엘리먼트들을 카메라 엘리먼트 내부에 추가합니다</ko>
   * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
   */
  public batchInsert(...items: Array<{
    index: number;
    elements: any[];
    hasDOMInElements: boolean;
  }>): Panel[] {
    const allPanelsInserted = this.batchInsertDefer(...items);

    if (allPanelsInserted.length <= 0) return [];

    this.updateAfterPanelChange(allPanelsInserted, []);

    return allPanelsInserted;
  }

  /**
   * Defers update
   * camera position & others will be updated after calling updateAfterPanelChange
   * @internal
   */
  public batchInsertDefer(...items: Array<{
    index: number;
    elements: any[];
    hasDOMInElements: boolean;
  }>) {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking);

    const prevFirstPanel = panels[0];
    const align = parsePanelAlign(this._align);

    const allPanelsInserted = items.reduce((addedPanels, item) => {
      const insertingIdx = getMinusCompensatedIndex(item.index, panels.length);
      const panelsPushed = panels.slice(insertingIdx);
      const panelsInserted = item.elements.map((el, idx) => this._createPanel(el, { index: insertingIdx + idx, align, flicking }));

      panels.splice(insertingIdx, 0, ...panelsInserted);

      if (item.hasDOMInElements) {
        // Insert the actual elements as camera element's children
        this._insertPanelElements(panelsInserted, panelsPushed[0] ?? null);
      }

      // Resize the newly added panels
      if (flicking.panelsPerView > 0) {
        const firstPanel = prevFirstPanel || panelsInserted[0].resize();

        this._updatePanelSizeByGrid(firstPanel, panelsInserted);
      } else {
        panelsInserted.forEach(panel => panel.resize());
      }

      // Update panel indexes & positions
      panelsPushed.forEach(panel => {
        panel.increaseIndex(panelsInserted.length);
        panel.updatePosition();
      });

      return [...addedPanels, ...panelsInserted];
    }, []);

    return allPanelsInserted;
  }

  /**
   * Remove the panel at the given index
   * This will decrease index of panels after by the number of panels removed
   * @ko 주어진 인덱스의 패널을 제거합니다
   * 해당 인덱스보다 큰 인덱스를 가진 기존 패널들은 제거한 패널의 개수만큼 인덱스가 감소합니다
   * @param {Array<object>} items An array of items to remove<ko>제거할 아이템들의 배열</ko>
   * @param {number} [items.index] Index of panel to remove<ko>제거할 패널의 인덱스</ko>
   * @param {number} [items.deleteCount=1] Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>
   * @param {boolean} [items.hasDOMInElements=1] Whether it contains actual DOM elements. If set to true, renderer will remove them from the camera element<ko>내부에 실제 DOM 엘리먼트들을 포함하고 있는지 여부. true로 설정할 경우, 렌더러는 해당 엘리먼트들을 카메라 엘리먼트 내부에서 제거합니다</ko>
   * @return An array of removed panels<ko>제거된 패널들의 배열</ko>
   */
  public batchRemove(...items: Array<{
    index: number;
    deleteCount: number;
    hasDOMInElements: boolean;
  }>): Panel[] {
    const allPanelsRemoved = this.batchRemoveDefer(...items);

    if (allPanelsRemoved.length <= 0) return [];

    this.updateAfterPanelChange([], allPanelsRemoved);

    return allPanelsRemoved;
  }

  /**
   * Defers update
   * camera position & others will be updated after calling updateAfterPanelChange
   * @internal
   */
  public batchRemoveDefer(...items: Array<{
    index: number;
    deleteCount: number;
    hasDOMInElements: boolean;
  }>) {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking);

    const { control } = flicking;
    const activePanel = control.activePanel;

    const allPanelsRemoved = items.reduce((removed, item) => {
      const { index, deleteCount } = item;
      const removingIdx = getMinusCompensatedIndex(index, panels.length);

      const panelsPulled = panels.slice(removingIdx + deleteCount);
      const panelsRemoved = panels.splice(removingIdx, deleteCount);

      if (panelsRemoved.length <= 0) return [];

      // Update panel indexes & positions
      panelsPulled.forEach(panel => {
        panel.decreaseIndex(panelsRemoved.length);
        panel.updatePosition();
      });

      if (item.hasDOMInElements) {
        this._removePanelElements(panelsRemoved);
      }

      // Remove panel elements
      panelsRemoved.forEach(panel => panel.destroy());

      if (includes(panelsRemoved, activePanel)) {
        control.resetActive();
      }

      return [...removed, ...panelsRemoved];
    }, []);

    return allPanelsRemoved;
  }

  /**
   * @internal
   */
  public updateAfterPanelChange(panelsAdded: Panel[], panelsRemoved: Panel[]) {
    const flicking = getFlickingAttached(this._flicking);
    const { camera, control } = flicking;
    const panels = this._panels;
    const activePanel = control.activePanel;

    // Update camera & control
    this._updateCameraAndControl();

    void this.render();

    if (!flicking.animating) {
      if (!activePanel || activePanel.removed) {
        if (panels.length <= 0) {
          // All panels removed
          camera.lookAt(0);
        } else {
          let targetIndex = activePanel?.index ?? 0;
          if (targetIndex > panels.length - 1) {
            targetIndex = panels.length - 1;
          }

          void control.moveToPanel(panels[targetIndex], {
            duration: 0
          }).catch(() => void 0);
        }
      } else {
        void control.moveToPanel(activePanel, {
          duration: 0
        }).catch(() => void 0);
      }
    }

    flicking.camera.updateOffset();

    if (panelsAdded.length > 0 || panelsRemoved.length > 0) {
      flicking.trigger(new ComponentEvent(EVENTS.PANEL_CHANGE, {
        added: panelsAdded,
        removed: panelsRemoved
      }));

      this.checkPanelContentsReady([
        ...panelsAdded,
        ...panelsRemoved
      ]);
    }
  }

  /**
   * @internal
   */
  public checkPanelContentsReady(checkingPanels: Panel[]) {
    const flicking = getFlickingAttached(this._flicking);
    const resizeOnContentsReady = flicking.resizeOnContentsReady;
    const panels = this._panels;

    if (!resizeOnContentsReady || flicking.virtualEnabled) return;

    const hasContents = (panel: Panel) => panel.element && !!panel.element.querySelector("img, video");
    checkingPanels = checkingPanels.filter(panel => hasContents(panel));

    if (checkingPanels.length <= 0) return;

    const contentsReadyChecker = new ImReady();

    checkingPanels.forEach(panel => {
      panel.loading = true;
    });

    contentsReadyChecker.on("readyElement", e => {
      if (!this._flicking) {
        // Renderer's destroy() is called before
        contentsReadyChecker.destroy();
        return;
      }

      const panel = checkingPanels[e.index];
      const camera = flicking.camera;
      const control = flicking.control;
      const prevProgressInPanel = control.activePanel
        ? camera.getProgressInPanel(control.activePanel)
        : 0;

      panel.loading = false;
      panel.resize();
      panels.slice(panel.index + 1).forEach(panelBehind => panelBehind.updatePosition());

      if (!flicking.initialized) return;

      camera.updateRange();
      camera.updateOffset();
      camera.updateAnchors();

      if (control.animating) {
        // TODO: Need Axes update
      } else {
        control.updatePosition(prevProgressInPanel);
        control.updateInput();
      }
    });

    contentsReadyChecker.on("preReady", e => {
      if (this._flicking) {
        void this.render();
      }

      if (e.readyCount === e.totalCount) {
        contentsReadyChecker.destroy();
      }
    });

    contentsReadyChecker.on("ready", () => {
      if (this._flicking) {
        void this.render();
      }
      contentsReadyChecker.destroy();
    });

    contentsReadyChecker.check(checkingPanels.map(panel => panel.element));
  }

  protected _updateCameraAndControl() {
    const flicking = getFlickingAttached(this._flicking);
    const { camera, control } = flicking;

    camera.updateRange();
    camera.updateOffset();
    camera.updateAnchors();
    camera.resetNeedPanelHistory();
    control.updateInput();
  }

  protected _showOnlyVisiblePanels(flicking: Flicking) {
    const panels = flicking.renderer.panels;
    const camera = flicking.camera;

    const visibleIndexes = camera.visiblePanels.reduce((visibles, panel) => {
      visibles[panel.index] = true;
      return visibles;
    }, {});

    panels.forEach(panel => {
      if (panel.index in visibleIndexes || panel.loading) {
        panel.markForShow();
      } else if (!flicking.holding) {
        // During the input sequence,
        // Do not remove panel elements as it won't trigger touchend event.
        panel.markForHide();
      }
    });
  }

  protected _updatePanelSizeByGrid(referencePanel: Panel, panels: Panel[]) {
    const flicking = getFlickingAttached(this._flicking);
    const panelsPerView = flicking.panelsPerView;

    if (panelsPerView <= 0) {
      throw new FlickingError(ERROR.MESSAGE.WRONG_OPTION("panelsPerView", panelsPerView), ERROR.CODE.WRONG_OPTION);
    }
    if (panels.length <= 0) return;

    const viewportSize = flicking.camera.size;
    const gap = referencePanel.margin.prev + referencePanel.margin.next;

    const panelSize = (viewportSize - gap * (panelsPerView - 1)) / panelsPerView;
    const panelSizeObj = flicking.horizontal
      ? { width: panelSize }
      : { height: panelSize };
    const firstPanelSizeObj = {
      size: panelSize,
      margin: referencePanel.margin,
      ...(!flicking.horizontal && { height: referencePanel.height})
    };

    if (!flicking.noPanelStyleOverride) {
      this._strategy.updatePanelSizes(flicking, panelSizeObj);
    }

    flicking.panels.forEach(panel => panel.resize(firstPanelSizeObj));
  }

  protected _removeAllChildsFromCamera() {
    const flicking = getFlickingAttached(this._flicking);
    const cameraElement = flicking.camera.element;

    // Remove other elements
    while (cameraElement.firstChild) {
      cameraElement.removeChild(cameraElement.firstChild);
    }
  }

  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null = null) {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const nextSiblingElement = nextSibling?.element || null;
    const fragment = document.createDocumentFragment();

    panels.forEach(panel => fragment.appendChild(panel.element));
    cameraElement.insertBefore(fragment, nextSiblingElement);
  }

  protected _removePanelElements(panels: Panel[]) {
    const flicking = getFlickingAttached(this._flicking);
    const cameraElement = flicking.camera.element;

    panels.forEach(panel => {
      cameraElement.removeChild(panel.element);
    });
  }

  protected _afterRender() {
    const flicking = getFlickingAttached(this._flicking);

    flicking.camera.applyTransform();
  }
}

export default Renderer;

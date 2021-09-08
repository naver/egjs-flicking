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
import { getFlickingAttached, getMinusCompensatedIndex, includes } from "../utils";

export interface RendererOptions {
  align: FlickingOptions["align"];
}

/**
 * A component that manages {@link Panel} and its elements
 * @ko {@link Panel}과 그 엘리먼트들을 관리하는 컴포넌트
 */
abstract class Renderer {
  // Internal States
  protected _flicking: Flicking | null;
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
    align = ALIGN.CENTER
  }: Partial<RendererOptions> = {}) {
    this._flicking = null;
    this._panels = [];

    // Bind options
    this._align = align;
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
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    if (flicking.panelsPerView > 0) {
      this._updatePanelSizeByGrid(flicking);
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
      const panelsInserted = item.elements.map((el, idx) => this._createPanel(el, { index: insertingIdx + idx, align, flicking }));

      panels.splice(insertingIdx, 0, ...panelsInserted);

      // Insert the actual elements as camera element's children
      this._insertPanelElements(panelsInserted, panelsPushed[0] ?? null);

      // Resize the newly added panels
      panelsInserted.forEach(panel => panel.resize());

      // Update panel indexes & positions
      panelsPushed.forEach(panel => {
        panel.increaseIndex(panelsInserted.length);
        panel.updatePosition();
      });

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

    flicking.trigger(new ComponentEvent(EVENTS.PANEL_CHANGE, {
      added: allPanelsInserted,
      removed: []
    }));

    this.checkPanelContentsReady(allPanelsInserted);

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
      panelsPulled.forEach(panel => {
        panel.decreaseIndex(panelsRemoved.length);
        panel.updatePosition();
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
        camera.lookAt(0);
      }
    }

    flicking.camera.updateOffset();

    flicking.trigger(new ComponentEvent(EVENTS.PANEL_CHANGE, {
      added: [],
      removed: allPanelsRemoved
    }));

    return allPanelsRemoved;
  }

  /**
   * @internal
   */
  public checkPanelContentsReady(checkingPanels: Panel[]) {
    const resizeOnContentsReady = getFlickingAttached(this._flicking, "Renderer").resizeOnContentsReady;
    const panels = this._panels;

    if (!resizeOnContentsReady) return;

    const hasContents = (panel: Panel) => !!panel.element.querySelector("img, video");
    checkingPanels = checkingPanels.filter(panel => hasContents(panel));

    if (checkingPanels.length <= 0) return;

    const contentsReadyChecker = new ImReady();

    checkingPanels.forEach(panel => {
      panel.loading = true;
    });

    contentsReadyChecker.on("readyElement", e => {
      const flicking = this._flicking;

      if (!flicking) {
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

  protected _getPanelAlign() {
    const align = this._align;

    return typeof align === "object"
      ? (align as { panel: string | number }).panel
      : align;
  }

  protected _updateCameraAndControl() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const { camera, control } = flicking;

    camera.updateRange();
    camera.updateAnchors();
    camera.resetNeedPanelHistory();
    control.updateInput();
  }

  protected _updateRenderingPanels(): void {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    if (flicking.renderOnlyVisible) {
      this._showOnlyVisiblePanels(flicking);
    } else {
      flicking.panels.forEach(panel => panel.markForShow());
    }
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

    camera.updateOffset();
  }

  protected _updatePanelSizeByGrid(flicking: Flicking) {
    const panels = flicking.panels;
    const panelsPerView = flicking.panelsPerView;

    if (panelsPerView <= 0) {
      throw new FlickingError(ERROR.MESSAGE.WRONG_OPTION("panelsPerView", panelsPerView), ERROR.CODE.WRONG_OPTION);
    }
    if (panels.length <= 0) return;

    // resize only the first panel
    const firstPanel = panels[0];
    firstPanel.resize();

    const viewportSize = flicking.camera.size;
    const gap = firstPanel.margin.prev + firstPanel.margin.next;

    const panelSize = (viewportSize - gap * (panelsPerView - 1)) / panelsPerView;
    const panelSizeObj = flicking.horizontal
      ? { width: panelSize }
      : { height: panelSize };
    const firstPanelSizeObj = {
      size: panelSize,
      height: firstPanel.height,
      margin: firstPanel.margin
    };

    if (!flicking.noPanelStyleOverride) {
      flicking.panels.forEach(panel => panel.setSize(panelSizeObj));
    }

    flicking.panels.forEach(panel => panel.resize(firstPanelSizeObj));
  }

  protected _removeAllChildsFromCamera() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraElement = flicking.camera.element;

    // Remove other elements
    while (cameraElement.firstChild) {
      cameraElement.removeChild(cameraElement.firstChild);
    }
  }
}

export default Renderer;

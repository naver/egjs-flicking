/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";
import ImReady from "@egjs/imready";
import { ALIGN } from "../constants/values";
import Panel, { PanelOptions } from "../core/panel/Panel";
import * as ERROR from "../error/codes";
import FlickingError from "../error/FlickingError";
import { EVENTS } from "../event/names";
import Flicking, { FlickingOptions } from "../Flicking";
import { getFlickingAttached, getMinusCompensatedIndex, includes, parsePanelAlign } from "../utils";

import RenderingStrategy from "./strategy/RenderingStrategy";

/**
 * Options for creating a {@link Renderer}
 */
export interface RendererOptions {
  /** An {@link Flicking.align | align} value that will be applied to all panels */
  align?: FlickingOptions["align"];
  /** An instance of RenderingStrategy(internal module) */
  strategy: RenderingStrategy;
}

/**
 * Parameters for {@link Renderer.batchInsert}
 * @public
 */
export interface BatchInsertParams {
  /** Index to insert new panels at */
  index: number;
  /** An array of element or framework component with element in it */
  elements: any[];
  /** Whether it contains actual DOM elements. If set to true, renderer will add them to the camera element */
  hasDOMInElements: boolean;
}

/**
 * Parameters for {@link Renderer.batchRemove}
 * @public
 */
export interface BatchRemoveParams {
  /** Index of panel to remove */
  index: number;
  /** Number of panels to remove from index */
  deleteCount: number;
  /** Whether it contains actual DOM elements. If set to true, renderer will remove them from the camera element */
  hasDOMInElements: boolean;
}

/**
 * A component that manages {@link Panel} and its elements
 * @public
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
   * @readonly
   * @see Panel
   */
  public get panels(): Panel[] {
    return this._panels;
  }
  /**
   * A boolean value indicating whether rendering is in progress
   * @readonly
   * @internal
   */
  public get rendering(): boolean {
    return this._rendering;
  }
  /**
   * Count of panels
   * @readonly
   */
  public get panelCount(): number {
    return this._panels.length;
  }
  /**
   * @internal
   */
  public get strategy(): RendererOptions["strategy"] {
    return this._strategy;
  }

  // Options Getter
  /**
   * A {@link Panel}'s {@link Panel.align | align} value that applied to all panels
   */
  public get align(): NonNullable<RendererOptions["align"]> {
    return this._align;
  }

  // Options Setter
  public set align(val: NonNullable<RendererOptions["align"]>) {
    this._align = val;

    const panelAlign = parsePanelAlign(val);
    this._panels.forEach(panel => {
      panel.align = panelAlign;
    });
  }

  /**
   * @param options - {@link RendererOptions}
   */
  public constructor(options: RendererOptions) {
    // Destructure options with default values
    const { align = ALIGN.CENTER, strategy } = options;

    this._flicking = null;
    this._panels = [];
    this._rendering = false;

    // Bind options
    this._align = align;
    this._strategy = strategy;
  }

  /**
   * Render panel elements inside the camera element
   * @remarks
   * This method updates the DOM to reflect the current panel state.
   * @returns A Promise that resolves when rendering is complete
   */
  public abstract render(): Promise<void>;

  /**
   * @internal
   * @privateRemarks
   * Collects panel elements from the camera element and creates Panel instances.
   */
  protected abstract _collectPanels(): void;
  /**
   * @internal
   * @privateRemarks
   * Creates a Panel instance from an element with the given options.
   */
  protected abstract _createPanel(el: any, options: Omit<PanelOptions, "elementProvider">): Panel;

  /**
   * Initialize Renderer
   * @remarks
   * This method is called automatically during {@link Flicking.init}. It collects existing panel elements.
   * @param flicking - An instance of {@link Flicking}
   * @returns The current instance for method chaining
   */
  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._collectPanels();

    return this;
  }

  /**
   * Destroy Renderer and return to initial state
   * @remarks
   * This method clears all panel references and resets the internal state.
   */
  public destroy(): void {
    this._flicking = null;
    this._panels = [];
  }

  /**
   * Return the {@link Panel} at the given index. `null` if it doesn't exist.
   * @remarks
   * This is equivalent to accessing `Flicking.panels[index]`.
   * @param index - Index of the panel to get
   * @returns Panel at the given index
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
   * Return Rendered Panels
   * @returns Rendered Panels
   */
  public getRenderedPanels(): Panel[] {
    const flicking = getFlickingAttached(this._flicking);

    return flicking.renderer.panels.filter(panel => panel.rendered);
  }

  /**
   * Update all panel sizes
   * @returns The current instance for method chaining
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
   * @remarks
   * This will increase index of panels after by the number of panels added.
   * @param items - An array of {@link BatchInsertParams}
   * @throws {@link DOMManipulationErrors}
   * @returns An array of inserted panels
   */
  public batchInsert(...items: BatchInsertParams[]): Panel[] {
    const allPanelsInserted = this.batchInsertDefer(...items);

    if (allPanelsInserted.length <= 0) return [];

    this.updateAfterPanelChange(allPanelsInserted, []);

    return allPanelsInserted;
  }

  /**
   * @internal
   * @privateRemarks
   * Defers update. Camera position & others will be updated after calling updateAfterPanelChange.
   */
  public batchInsertDefer(...items: BatchInsertParams[]) {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking);

    const prevFirstPanel = panels[0];
    const align = parsePanelAlign(this._align);

    const allPanelsInserted = items.reduce((addedPanels, item) => {
      const insertingIdx = getMinusCompensatedIndex(item.index, panels.length);
      const panelsPushed = panels.slice(insertingIdx);
      const panelsInserted = item.elements.map((el, idx) =>
        this._createPanel(el, { index: insertingIdx + idx, align, flicking })
      );

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
   * @remarks
   * This will decrease index of panels after by the number of panels removed.
   * @param items - An array of {@link BatchRemoveParams}
   * @throws {@link DOMManipulationErrors}
   * @returns An array of removed panels
   */
  public batchRemove(...items: BatchRemoveParams[]): Panel[] {
    const allPanelsRemoved = this.batchRemoveDefer(...items);

    if (allPanelsRemoved.length <= 0) return [];

    this.updateAfterPanelChange([], allPanelsRemoved);

    return allPanelsRemoved;
  }

  /**
   * @internal
   * @privateRemarks
   * Defers update. Camera position & others will be updated after calling updateAfterPanelChange.
   */
  public batchRemoveDefer(...items: BatchRemoveParams[]) {
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
   * @privateRemarks
   * Updates camera, control, and triggers {@link PanelChangeEvent} after panels are added or removed.
   */
  public updateAfterPanelChange(panelsAdded: Panel[], panelsRemoved: Panel[]) {
    const flicking = getFlickingAttached(this._flicking);
    const { camera, control } = flicking;
    const panels = this._panels;
    const activePanel = control.activePanel;

    // Update camera & control
    this._updateCameraAndControl();

    if (flicking.autoResize && flicking.useResizeObserver) {
      panelsAdded.forEach(panel => {
        if (panel.element) {
          flicking.autoResizer.observe(panel.element);
        }
      });
      panelsRemoved.forEach(panel => {
        if (panel.element) {
          flicking.autoResizer.unobserve(panel.element);
        }
      });
    }

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

          void control
            .moveToPanel(panels[targetIndex], {
              duration: 0
            })
            .catch(() => void 0);
        }
      } else {
        void control
          .moveToPanel(activePanel, {
            duration: 0
          })
          .catch(() => void 0);
      }
    }

    flicking.camera.updateOffset();

    if (panelsAdded.length > 0 || panelsRemoved.length > 0) {
      flicking.trigger(
        new ComponentEvent(EVENTS.PANEL_CHANGE, {
          added: panelsAdded,
          removed: panelsRemoved
        })
      );

      this.checkPanelContentsReady([...panelsAdded, ...panelsRemoved]);
    }
  }

  /**
   * @internal
   * @privateRemarks
   * Checks if panel contents (images/videos) are ready and triggers resize when loaded.
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
      const prevProgressInPanel = control.activePanel ? camera.getProgressInPanel(control.activePanel) : 0;

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

  /**
   * @internal
   * @privateRemarks
   * Updates camera range, anchors, and control input after panel changes.
   */
  protected _updateCameraAndControl() {
    const flicking = getFlickingAttached(this._flicking);
    const { camera, control } = flicking;

    camera.updateRange();
    camera.updateOffset();
    camera.updateAnchors();
    camera.resetNeedPanelHistory();
    control.updateInput();
  }

  /**
   * @internal
   * @privateRemarks
   * Marks only visible panels for rendering when {@link FlickingOptions.renderOnlyVisible | renderOnlyVisible} is enabled.
   */
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

  /**
   * @internal
   * @privateRemarks
   * Calculates and applies panel sizes when {@link FlickingOptions.panelsPerView | panelsPerView} is enabled.
   */
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
    const panelSizeObj = flicking.horizontal ? { width: panelSize } : { height: panelSize };
    const firstPanelSizeObj = {
      size: panelSize,
      margin: referencePanel.margin,
      ...(!flicking.horizontal && { height: referencePanel.height })
    };

    if (!flicking.noPanelStyleOverride) {
      this._strategy.updatePanelSizes(flicking, panelSizeObj);
    }

    flicking.panels.forEach(panel => panel.resize(firstPanelSizeObj));
  }

  /**
   * @internal
   * @privateRemarks
   * Removes all child elements from the camera element.
   */
  protected _removeAllChildsFromCamera() {
    const flicking = getFlickingAttached(this._flicking);
    const cameraElement = flicking.camera.element;

    // Remove other elements
    while (cameraElement.firstChild) {
      cameraElement.removeChild(cameraElement.firstChild);
    }
  }

  /**
   * @internal
   * @privateRemarks
   * Inserts panel elements into the camera element at the specified position.
   */
  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null = null) {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const nextSiblingElement = nextSibling?.element || null;
    const fragment = document.createDocumentFragment();

    panels.forEach(panel => fragment.appendChild(panel.element));
    cameraElement.insertBefore(fragment, nextSiblingElement);
  }

  /**
   * @internal
   * @privateRemarks
   * Removes panel elements from the camera element.
   */
  protected _removePanelElements(panels: Panel[]) {
    const flicking = getFlickingAttached(this._flicking);
    const cameraElement = flicking.camera.element;

    panels.forEach(panel => {
      cameraElement.removeChild(panel.element);
    });
  }

  /**
   * @internal
   * @privateRemarks
   * Called after rendering to apply the camera transform.
   */
  protected _afterRender() {
    const flicking = getFlickingAttached(this._flicking);

    flicking.camera.applyTransform();

    if (flicking.useCSSOrder) {
      // `useCSSOrder`를 사용하는 경우 DOM은 변화가 없지만 대신 css `order`값을 주입
      const renderedPanels = flicking.renderer.panels.filter(panel => panel.rendered);

      this._strategy.getRenderingIndexesByOrder(flicking).forEach((domIndex, index) => {
        if (renderedPanels[domIndex].element) {
          // 방어 코드 추가
          renderedPanels[domIndex].element.style.order = `${index}`;
        }
      });
    }
  }
}

export default Renderer;

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";

import FlickingError from "../core/FlickingError";
import Panel, { PanelOptions } from "../core/panel/Panel";
import VirtualPanel from "../core/panel/VirtualPanel";
import * as ERROR from "../const/error";
import { EVENTS } from "../const/external";
import { getFlickingAttached, getMinusCompensatedIndex, includes, range } from "../utils";

import Renderer, { RendererOptions } from "./Renderer";

export interface VirtualElement {
  el: HTMLElement;
  renderingPanel: VirtualPanel | null;
}

export interface VirtualRendererOptions extends RendererOptions {
  renderPanel: (panel: VirtualPanel, index: number) => string;
  initialPanelCount: number;
  cache?: boolean;
  panelClass?: string;
}

/**
 *
 */
class VirtualRenderer extends Renderer {
  private _elements: VirtualElement[] = [];
  private _renderFn: (panel: VirtualPanel, index: number) => string;
  private _initialPanelCount: number;
  private _cache: boolean;
  private _panelClass: string;

  public get elements() { return this._elements; }

  // Options
  /**
   * A rendering function for the panel element's innerHTML
   * @ko 패널 엘리먼트의 innerHTML을 렌더링하는 함수
   * @type {function}
   * @param {VirtualPanel} panel Instance of the panel<ko>패널 인스턴스</ko>
   * @param {number} index Index of the panel<ko>패널 인덱스</ko>
   */
  public get renderPanel() { return this._renderFn; }
  /**
   * Initial panel count to render
   * @ko 최초로 렌더링할 패널의 개수
   * @readonly
   * @type {number}
   */
  public get initialPanelCount() { return this._initialPanelCount; }
  /**
   * Whether to cache rendered panel's innerHTML
   * @ko 렌더링된 패널의 innerHTML 정보를 캐시할지 여부
   * @type {boolean}
   * @default false
   */
  public get cache() { return this._cache; }
  /**
   * The class name that will be applied to rendered panel elements
   * @ko 렌더링되는 패널 엘리먼트에 적용될 클래스 이름
   * @type {string}
   * @default "flicking-panel"
   */
  public get panelClass() { return this._panelClass; }

  public set renderPanel(val: VirtualRendererOptions["renderPanel"]) {
    this._renderFn = val;
    this._elements.forEach(el => el.renderingPanel = null);
    this._panels.forEach((panel: VirtualPanel) => panel.uncacheRenderResult());
  }

  public set cache(val: NonNullable<VirtualRendererOptions["cache"]>) { this._cache = val; }
  public set panelClass(val: NonNullable<VirtualRendererOptions["panelClass"]>) { this._panelClass = val; }

  public constructor(options: VirtualRendererOptions) {
    super(options);

    this._renderFn = options.renderPanel;
    this._initialPanelCount = options.initialPanelCount;
    this._cache = options.cache ?? false;
    this._panelClass = options.panelClass ?? "flicking-panel";
  }

  public async render() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const visiblePanels = flicking.visiblePanels as VirtualPanel[];
    const cache = this._cache;
    const renderFn = this._renderFn;
    const elements = this._elements;
    const invisibles = elements.map((_, idx) => idx);

    this._showOnlyVisiblePanels(flicking);

    visiblePanels.forEach(panel => {
      const elIdx = panel.index % elements.length;
      const virtualEl = elements[elIdx];
      const el = virtualEl.el;

      invisibles[elIdx] = -1;

      if (el.style.display) {
        el.style.display = "";
      }

      if (virtualEl.renderingPanel !== panel) {
        if (cache && panel.cachedInnerHTML) {
          el.innerHTML = panel.cachedInnerHTML;
        } else {
          const renderedHTML = renderFn(panel, panel.index);
          el.innerHTML = renderedHTML;

          if (cache) {
            panel.cacheRenderResult(renderedHTML);
          }
        }
        virtualEl.renderingPanel = panel;
      }
    });

    invisibles.filter(val => val >= 0)
      .forEach(idx => {
        elements[idx].el.style.display = "none";
      });

    this._resetPanelElementOrder();

    return Promise.resolve();
  }

  public async forceRenderAllPanels() {
    this._elements.forEach(virtualEl => {
      virtualEl.el.style.display = "";
      virtualEl.renderingPanel = null;
    });

    return Promise.resolve();
  }

  /**
   * Add new virtual panels at the end of the list
   * @ko 새로운 가상 패널들을 리스트의 끝에 추가합니다
   * @param {number} count The number of panels to add<ko>추가할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The new panels added<ko>새롭게 추가된 패널들</ko>
   */
  public append(count: number = 1): VirtualPanel[] {
    return this.insert(this._panels.length, count);
  }

  /**
   * Add new virtual panels at the start of the list
   * @ko 새로운 가상 패널들을 리스트의 시작에 추가합니다
   * @param {number} count The number of panels to add<ko>추가할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The new panels added<ko>새롭게 추가된 패널들</ko>
   */
  public prepend(count: number = 1): VirtualPanel[] {
    return this.insert(0, count);
  }

  /**
   * Add new virtual panels at the given index
   * @ko 새로운 가상 패널들을 주어진 인덱스에 추가합니다
   * @param {number} count The number of panels to add<ko>추가할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The new panels added<ko>새롭게 추가된 패널들</ko>
   */
  public insert(index: number, count: number = 1): VirtualPanel[] {
    if (count <= 0) return [];

    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const control = flicking.control;
    const align = this._getPanelAlign();
    const panels = this._panels;
    const panelsPushed = panels.slice(index);
    const insertingIdx = getMinusCompensatedIndex(index, panels.length);

    panelsPushed.forEach(panel => {
      panel.increaseIndex(count);
      panel.updatePosition();
    });

    const newPanels = range(count).map(idx => new VirtualPanel({ align, flicking, index: insertingIdx + idx }));

    panels.splice(insertingIdx, 0, ...newPanels);

    this._updateCameraAndControl();

    void this.render();

    // Move to the first panel added if no panels existed
    // FIXME: fix for animating case
    if (!control.animating) {
      void control.moveToPanel(control.activePanel || newPanels[0], {
        duration: 0
      }).catch(() => void 0);
    }

    flicking.camera.updateOffset();

    flicking.trigger(new ComponentEvent(EVENTS.PANEL_CHANGE, {
      added: newPanels,
      removed: []
    }));

    return newPanels;
  }

  /**
   * Remove panels at the given index
   * @ko 주어진 인덱스에서 패널들을 삭제합니다
   * @param {number} count The number of panels to remove<ko>삭제할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The panels removed<ko>삭제된 패널들</ko>
   */
  public remove(index: number, count: number): VirtualPanel[] {
    if (count <= 0) return [];

    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const { camera, control } = flicking;
    const activePanel = control.activePanel;
    const activeIndex = control.activeIndex;
    const panels = this._panels as VirtualPanel[];
    const removingIdx = getMinusCompensatedIndex(index, panels.length);
    const panelsPulled = panels.slice(removingIdx + 1);

    const removed = panels.splice(removingIdx, count);

    if (removed.length <= 0) return [];

    panelsPulled.forEach(panel => {
      panel.decreaseIndex(removed.length);
      panel.updatePosition();
    });

    // Update camera & control
    this._updateCameraAndControl();

    void this.render();

    // FIXME: fix for animating case
    if (!control.animating) {
      const targetPanel = includes(removed, activePanel)
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
      removed
    }));

    return removed;
  }

  public batchInsert(): Panel[] {
    throw new FlickingError(ERROR.MESSAGE.NOT_ALLOWED_IN_VIRTUAL, ERROR.CODE.NOT_ALLOWED_IN_VIRTUAL);
  }

  public batchRemove(): Panel[] {
    throw new FlickingError(ERROR.MESSAGE.NOT_ALLOWED_IN_VIRTUAL, ERROR.CODE.NOT_ALLOWED_IN_VIRTUAL);
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const panelsPerView = flicking.panelsPerView;
    const fragment = document.createDocumentFragment();

    // Remove all child elements in the camera element
    this._removeAllChildsFromCamera();

    range(panelsPerView + 1).forEach(() => {
      const panelEl = document.createElement("div");
      panelEl.className = this._panelClass;
      fragment.appendChild(panelEl);

      this._elements.push({
        el: panelEl,
        renderingPanel: null
      });
    });

    flicking.camera.element.appendChild(fragment);

    this._updateVirtualPanels();
  }

  protected _createPanel(el: any, options: PanelOptions) {
    return new VirtualPanel(options);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null) {
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _removePanelElements(panels: Panel[]): this {
    return this;
  }

  private _resetPanelElementOrder() {
    const elements = this._elements;
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const visiblePanels = [...flicking.visiblePanels].sort((panel1, panel2) => (panel1.position + panel1.offset) - (panel2.position + panel2.offset));
    const cameraEl = flicking.camera.element;

    if (visiblePanels.length <= 0) return;

    const firstVisiblePanel = visiblePanels[0];
    const firstVisibleIndex = firstVisiblePanel.index % elements.length;

    const elementsByReversedOrder = [...elements.slice(firstVisibleIndex), ...elements.slice(0, firstVisibleIndex)].reverse();

    elementsByReversedOrder.forEach((virtualEl, idx) => {
      const nextEl = elementsByReversedOrder[idx - 1]?.el ?? null;

      if (virtualEl.el.nextElementSibling !== nextEl) {
        cameraEl.insertBefore(virtualEl.el, nextEl);
      }
    });
  }

  private _updateVirtualPanels() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const initialPanelCount = this._initialPanelCount;
    const align = this._getPanelAlign();
    const panels = this._panels;

    if (initialPanelCount > panels.length) {
      const firstIndex = panels.length;
      const newPanels = range(initialPanelCount - panels.length)
        .map(idx => new VirtualPanel({ flicking, index: firstIndex + idx, align }));

      panels.push(...newPanels);
    } else if (initialPanelCount < panels.length) {
      panels.splice(initialPanelCount);
    }
  }
}

export default VirtualRenderer;

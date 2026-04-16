/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { CLASS } from "../constants/values";
import Flicking from "../Flicking";
import { range } from "../utils";

import VirtualPanel from "./panel/VirtualPanel";

export type PanelRenderCallback =
  | ((
      /** Virtual panel to render */
      panel: VirtualPanel,
      /** Index of the panel */
      index: number
    ) => string)
  | (() => string);

export interface VirtualOptions {
  renderPanel: PanelRenderCallback;
  initialPanelCount: number;
  cache?: boolean;
  panelClass?: string;
}

/**
 * A manager class to add / remove virtual panels
 */
class VirtualManager {
  private _flicking: Flicking;

  private _renderPanel: PanelRenderCallback;
  private _initialPanelCount: number;
  private _cache: boolean;
  private _panelClass: string;

  private _elements: Array<{ nativeElement: HTMLElement; visible: boolean }>;

  public get elements() {
    return this._elements;
  }

  // Options
  /**
   * A rendering function for the panel element's innerHTML
   */
  public get renderPanel(): PanelRenderCallback {
    return this._renderPanel;
  }
  /**
   * Initial panel count to render
   * @readonly
   * @defaultValue -1
   */
  public get initialPanelCount(): number {
    return this._initialPanelCount;
  }
  /**
   * Whether to cache rendered panel's innerHTML
   * @defaultValue false
   */
  public get cache(): boolean {
    return this._cache;
  }
  /**
   * The class name that will be applied to rendered panel elements
   * @defaultValue "flicking-panel"
   */
  public get panelClass(): string {
    return this._panelClass;
  }

  public set renderPanel(val: VirtualOptions["renderPanel"]) {
    this._renderPanel = val;
    this._flicking.renderer.panels.forEach((panel: VirtualPanel) => panel.uncacheRenderResult());
  }

  public set cache(val: NonNullable<VirtualOptions["cache"]>) {
    this._cache = val;
  }
  public set panelClass(val: NonNullable<VirtualOptions["panelClass"]>) {
    this._panelClass = val;
  }

  public constructor(flicking: Flicking, options: VirtualOptions | null) {
    this._flicking = flicking;

    this._renderPanel = options?.renderPanel ?? (() => "");
    this._initialPanelCount = options?.initialPanelCount ?? -1;
    this._cache = options?.cache ?? false;
    this._panelClass = options?.panelClass ?? CLASS.DEFAULT_VIRTUAL;

    this._elements = [];
  }

  public init() {
    const flicking = this._flicking;

    if (!flicking.virtualEnabled) return;

    if (!flicking.externalRenderer && !flicking.renderExternal) {
      this._initVirtualElements();
    }

    const virtualElements = flicking.camera.children;
    this._elements = virtualElements.map(el => ({ nativeElement: el, visible: true }));
  }

  public show(index: number) {
    const el = this._elements[index];
    const nativeEl = el.nativeElement;

    el.visible = true;

    if (nativeEl.style.display) {
      nativeEl.style.display = "";
    }
  }

  public hide(index: number) {
    const el = this._elements[index];
    const nativeEl = el.nativeElement;

    el.visible = false;
    nativeEl.style.display = "none";
  }

  /**
   * Add new virtual panels at the end of the list
   * @param count - The number of panels to add
   * @returns The new panels added
   */
  public append(count: number = 1): VirtualPanel[] {
    const flicking = this._flicking;

    return this.insert(flicking.panels.length, count);
  }

  /**
   * Add new virtual panels at the start of the list
   * @param count - The number of panels to add
   * @returns The new panels added
   */
  public prepend(count: number = 1): VirtualPanel[] {
    return this.insert(0, count);
  }

  /**
   * Add new virtual panels at the given index
   * @param count - The number of panels to add
   * @returns The new panels added
   */
  public insert(index: number, count: number = 1): VirtualPanel[] {
    if (count <= 0) return [];

    const flicking = this._flicking;

    return flicking.renderer.batchInsert({ index, elements: range(count), hasDOMInElements: false }) as VirtualPanel[];
  }

  /**
   * Remove panels at the given index
   * @param count - The number of panels to remove
   * @returns The panels removed
   */
  public remove(index: number, count: number): VirtualPanel[] {
    if (count <= 0) return [];

    const flicking = this._flicking;

    return flicking.renderer.batchRemove({ index, deleteCount: count, hasDOMInElements: false }) as VirtualPanel[];
  }

  /**
   * @internal
   */
  private _initVirtualElements() {
    const flicking = this._flicking;
    const cameraElement = flicking.camera.element;
    const panelsPerView = flicking.panelsPerView;
    const fragment = document.createDocumentFragment();

    const newElements = range(panelsPerView + 1).map(idx => {
      const panelEl = document.createElement("div");
      panelEl.className = this._panelClass;
      panelEl.dataset.elementIndex = idx.toString();
      return panelEl;
    });

    newElements.forEach(el => {
      fragment.appendChild(el);
    });

    cameraElement.appendChild(fragment);
  }
}

export default VirtualManager;

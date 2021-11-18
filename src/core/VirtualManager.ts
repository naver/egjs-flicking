/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../Flicking";
import { range } from "../utils";
import { CLASS } from "../const/external";

import VirtualPanel from "./panel/VirtualPanel";

export interface VirtualOptions {
  renderPanel: (panel: VirtualPanel, index: number) => string;
  initialPanelCount: number;
  cache?: boolean;
  panelClass?: string;
}

/**
 * A manager class to add / remove virtual panels
 */
class VirtualManager {
  private _flicking: Flicking;

  private _renderPanel: (panel: VirtualPanel, index: number) => string;
  private _initialPanelCount: number;
  private _cache: boolean;
  private _panelClass: string;

  private _elements: Array<{ nativeElement: HTMLElement; visible: boolean }>;

  public get elements() { return this._elements; }

  // Options
  /**
   * A rendering function for the panel element's innerHTML
   * @ko 패널 엘리먼트의 innerHTML을 렌더링하는 함수
   * @type {function}
   * @param {VirtualPanel} panel Instance of the panel<ko>패널 인스턴스</ko>
   * @param {number} index Index of the panel<ko>패널 인덱스</ko>
   * @default "() => {}"
   */
  public get renderPanel() { return this._renderPanel; }
  /**
   * Initial panel count to render
   * @ko 최초로 렌더링할 패널의 개수
   * @readonly
   * @type {number}
   * @default -1
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

  public set renderPanel(val: VirtualOptions["renderPanel"]) {
    this._renderPanel = val;
    this._flicking.renderer.panels.forEach((panel: VirtualPanel) => panel.uncacheRenderResult());
  }

  public set cache(val: NonNullable<VirtualOptions["cache"]>) { this._cache = val; }
  public set panelClass(val: NonNullable<VirtualOptions["panelClass"]>) { this._panelClass = val; }

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
   * @ko 새로운 가상 패널들을 리스트의 끝에 추가합니다
   * @param {number} count The number of panels to add<ko>추가할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The new panels added<ko>새롭게 추가된 패널들</ko>
   */
  public append(count: number = 1): VirtualPanel[] {
    const flicking = this._flicking;

    return this.insert(flicking.panels.length, count);
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

    const flicking = this._flicking;

    return flicking.renderer.batchInsert({ index, elements: range(count), hasDOMInElements: false }) as VirtualPanel[];
  }

  /**
   * Remove panels at the given index
   * @ko 주어진 인덱스에서 패널들을 삭제합니다
   * @param {number} count The number of panels to remove<ko>삭제할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The panels removed<ko>삭제된 패널들</ko>
   */
  public remove(index: number, count: number): VirtualPanel[] {
    if (count <= 0) return [];

    const flicking = this._flicking;

    return flicking.renderer.batchRemove({ index, deleteCount: count, hasDOMInElements: false }) as VirtualPanel[];
  }

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

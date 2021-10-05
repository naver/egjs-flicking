import Flicking from "../Flicking";
import VirtualPanel from "../core/panel/VirtualPanel";
import { getFlickingAttached, parsePanelAlign, range } from "../utils";

import VirtualElement from "./VirtualElement";

export interface VirtualOptions {
  renderPanel: (panel: VirtualPanel, index: number) => string;
  initialPanelCount: number;
  cache?: boolean;
  panelClass?: string;
}

/**
 *
 */
class VirtualManager {
  private _flicking: Flicking | null;
  private _elements: VirtualElement[] = [];

  private _renderFn: (panel: VirtualPanel, index: number) => string;
  private _initialPanelCount: number;
  private _cache: boolean;
  private _panelClass: string;

  /**
   * An actual HTML elements used by renderer
   * @ko 렌더러에 의해 사용되는 실제 HTML 엘리먼트들의 배열
   * @readonly
   * @type {VirtualElement}
   */
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

  public set renderPanel(val: VirtualOptions["renderPanel"]) {
    this._renderFn = val;
    this._elements.forEach(el => el.renderingPanel = null);
    this._flicking?.renderer.panels.forEach((panel: VirtualPanel) => panel.uncacheRenderResult());
  }

  public set cache(val: NonNullable<VirtualOptions["cache"]>) { this._cache = val; }
  public set panelClass(val: NonNullable<VirtualOptions["panelClass"]>) { this._panelClass = val; }

  public constructor({
    renderPanel,
    initialPanelCount,
    cache = false,
    panelClass = "flicking-panel"
  }: VirtualOptions) {
    this._renderFn = renderPanel;
    this._initialPanelCount = initialPanelCount;
    this._cache = cache;
    this._panelClass = panelClass;
  }

  public init(flicking: Flicking): this {
    this._flicking = flicking;

    return this;
  }

  public destroy(): void {
    this._flicking = null;
  }

  public updateElements(elements: VirtualElement[]) {
    this._elements = elements;
  }

  public generatePanels() {
    const flicking = getFlickingAttached(this._flicking);
    const panelAlign = parsePanelAlign(flicking.renderer.align);

    return range(this._initialPanelCount)
      .map(idx => new VirtualPanel({ flicking, index: idx, align: panelAlign }));
  }

  public getVirtualElementsByOrder() {
    const elements = this._elements;
    const flicking = getFlickingAttached(this._flicking);
    const visiblePanels = [...flicking.visiblePanels]
      .filter(panel => panel.rendered)
      .sort((panel1, panel2) => {
        return (panel1.position + panel1.offset) - (panel2.position + panel2.offset);
      }) as VirtualPanel[];

    if (visiblePanels.length <= 0) return [...elements];

    const visibleElements = visiblePanels.map(panel => panel.virtualElement);
    const visibleIndexes = visibleElements.reduce((visibles, el) => {
      visibles[el.index] = true;
      return visibles;
    }, {});
    const invisibleElements = elements.filter(el => !(el.index in visibleIndexes));

    return [...visibleElements, ...invisibleElements];
  }

  /**
   * Add new virtual panels at the end of the list
   * @ko 새로운 가상 패널들을 리스트의 끝에 추가합니다
   * @param {number} count The number of panels to add<ko>추가할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The new panels added<ko>새롭게 추가된 패널들</ko>
   */
  public append(count: number = 1): VirtualPanel[] {
    const flicking = getFlickingAttached(this._flicking);

    return this.insert(flicking.renderer.panels.length, count);
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

    const flicking = getFlickingAttached(this._flicking);

    return flicking.renderer.batchInsert({ index, elements: range(count) }) as VirtualPanel[];
  }

  /**
   * Remove panels at the given index
   * @ko 주어진 인덱스에서 패널들을 삭제합니다
   * @param {number} count The number of panels to remove<ko>삭제할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The panels removed<ko>삭제된 패널들</ko>
   */
  public remove(index: number, count: number): VirtualPanel[] {
    if (count <= 0) return [];

    const flicking = getFlickingAttached(this._flicking);

    return flicking.renderer.batchRemove({ index, deleteCount: count }) as VirtualPanel[];
  }

  public async update() {
    const flicking = getFlickingAttached(this._flicking);

    flicking.panels.forEach((panel: VirtualPanel) => panel.uncacheRenderResult());

    await flicking.renderer.forceRenderAllPanels();
    await flicking.renderer.render();
  }
}

export default VirtualManager;

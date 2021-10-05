import VirtualPanel from "../core/panel/VirtualPanel";

/**
 * An interface of virtual element
 * @ko 가상 엘리먼트의 인터페이스
 * @interface
 * @property {HTMLElement} el An actual HTML element of virtual element<ko>가상 엘리먼트가 가리키는 실제 HTML 엘리먼트</ko>
 * @property {VirtualPanel | null} renderingPanel A panel that currently rendering this element<ko>현재 이 가상 엘리먼트를 렌더링하는 패널</ko>
 */
interface VirtualElement {
  element: HTMLElement;
  index: number;
  renderingPanel: VirtualPanel | null;
  hide(): void;
  show(): void;
}

export default VirtualElement;

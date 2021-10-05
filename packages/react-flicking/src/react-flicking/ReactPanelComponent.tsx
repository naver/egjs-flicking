interface ReactPanelComponent extends React.Component {
  element: HTMLElement;
  rendered: boolean;
  show(): void;
  hide(): void;
}

export default ReactPanelComponent;

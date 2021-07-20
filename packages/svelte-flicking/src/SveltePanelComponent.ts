interface SveltePanelComponent {
  id: string;
  show(): void;
  hide(): void;
  hidden(): boolean;
  element(): HTMLElement;
}

export default SveltePanelComponent;

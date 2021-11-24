/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
interface SvelteFlickingPanel {
  id: string;
  show(): void;
  hide(): void;
  setOrder(newOrder: number): void;
  rendered(): boolean;
  nativeElement(): HTMLElement;
}

export default SvelteFlickingPanel;

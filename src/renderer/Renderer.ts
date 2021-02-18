/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "~/Flicking";
import Panel from "~/core/Panel";
import { ElementLike } from "~/type/external";

export interface RendererOptions {
  align: FlickingOptions["align"];
}

interface Renderer {
  // Properties
  readonly panels: Panel[];
  readonly panelCount: number;

  // Methods
  init(flicking: Flicking): this;
  destroy(): void;
  render(): this;
  insert(index: number, element: ElementLike | ElementLike[]): Panel[];
  remove(index: number, deleteCount: number): Panel[];
  getPanel(index: number): Panel | null;
  updatePanelSize(): this;

  // Modifying panel elements always should be handled in abstract methods
  movePanelElementsToStart(panels: Panel[]): this;
  movePanelElementsToEnd(panels: Panel[]): this;
  resetPanelElementOrder(): this;
}

export default Renderer;

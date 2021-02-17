/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "~/Flicking";
import Renderer from "~/renderer/Renderer";
import DataPanel from "~/core/DataPanel";
import { ElementLike } from "~/type/external";

class ExternalRenderer extends Renderer {
  // Internal States
  protected _panels: DataPanel[];

  public init(flicking: Flicking): this {
    super.init(flicking);

    return this;
  }

  public render(): this {
    return this;
  }

  public insert(index: number, element: ElementLike | ElementLike[]): DataPanel[] {
    return [];
  }

  public remove(index: number, deleteCount: number): DataPanel[] {
    return [];
  }

  public movePanelElementsToStart(panels: DataPanel[]): this {
    return this;
  }

  public movePanelElementsToEnd(panels: DataPanel[]): this {
    return this;
  }

  public resetPanelElementOrder(): this {
    return this;
  }
}

export default ExternalRenderer;

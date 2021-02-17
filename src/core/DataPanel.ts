/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel, { PanelOptions } from "~/core/Panel";

class DataPanel extends Panel {
  public resize(): this {
    return this;
  }

  public contains(element: HTMLElement): boolean {
    return false;
  }

  public prev(): DataPanel | null {
    return super.prev() as DataPanel | null;
  }

  public next(): DataPanel | null {
    return super.next() as DataPanel | null;
  }
}

export default DataPanel;

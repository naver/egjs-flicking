/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import SvelteFlickingPanel from "./SvelteFlickingPanel";

class PanelManager {
  public panels: Record<string, any>;
  public dirty: boolean;

  public constructor() {
    this.panels = {};
    this.dirty = false;
  }

  public add(panel: SvelteFlickingPanel) {
    this.panels[panel.id] = panel;
    this.dirty = true;
  }

  public remove(id: string) {
    delete this.panels[id];
    this.dirty = true;
  }

  public get(id: string) {
    return this.panels[id];
  }
}

export default PanelManager;

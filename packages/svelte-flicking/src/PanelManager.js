/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
class PanelManager {
  constructor() {
    this.panels = {};
    this.dirty = false;
  }

  add(panel) {
    this.panels[panel.id] = panel;
    this.dirty = true;
  }

  remove(id) {
    delete this.panels[id];
    this.dirty = true;
  }

  get(id) {
    return this.panels[id];
  }
}

export default PanelManager;

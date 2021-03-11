import { DiffResult } from "@egjs/list-differ";

import Flicking from "~/Flicking";

export default <T>(flicking: Flicking, diffResult: DiffResult<T>) => {
  const panelsToRender = flicking.renderOnlyVisible
    ? flicking.camera.visiblePanels
    : flicking.renderer.panels;

  const removedPanels = diffResult.removed.reduce((map, idx) => {
    map[idx] = true;
    return map;
  }, {});

  return [
    ...panelsToRender
      .filter(panel => !removedPanels[panel.index])
      // Sort panels by position
      .sort((panel1, panel2) => (panel1.position + panel1.offset) - (panel2.position + panel2.offset))
      .map(panel => diffResult.prevList[panel.index]),
    ...diffResult.added.map(idx => diffResult.list[idx])
  ];
};


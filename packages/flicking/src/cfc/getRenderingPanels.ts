import { DiffResult } from "@egjs/list-differ";

import Flicking from "../Flicking";

export default <T>(flicking: Flicking, diffResult: DiffResult<T>) => {
  const removedPanels = diffResult.removed.reduce((map, idx) => {
    map[idx] = true;
    return map;
  }, {});

  const maintainedMap = diffResult.maintained.reduce((map, [prev, current]) => {
    map[prev] = current;
    return map;
  }, {});
  const renderingPanels = flicking.panels.filter(panel => !removedPanels[panel.index]);

  if (!flicking.useCSSOrder) {
    // useCSSOrder를 사용하게 되는 경우 sort를 하지 않는다.
    renderingPanels.sort((panel1, panel2) => panel1.position + panel1.offset - (panel2.position + panel2.offset));
  }

  return [
    ...renderingPanels.map(panel => diffResult.list[maintainedMap[panel.index]]),
    ...diffResult.added.map(idx => diffResult.list[idx])
  ];
};

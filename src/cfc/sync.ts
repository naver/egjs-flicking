import { DiffResult } from "@egjs/list-differ";

import Flicking from "../Flicking";

export default (flicking: Flicking, diffResult: DiffResult<any>) => {
  const renderer = flicking.renderer;
  const cameraEl = flicking.camera.element;
  const children = [].slice.call(cameraEl.children) as HTMLElement[];
  const addedElements = children.slice(-diffResult.added.length);

  diffResult.removed.forEach(idx => {
    renderer.remove(idx, 1);
  });

  diffResult.ordered.forEach(([prevIdx, newIdx]) => {
    const prevPanel = renderer.panels[prevIdx];
    const indexDiff = newIdx - prevIdx;

    if (indexDiff > 0) {
      prevPanel.increaseIndex(indexDiff);
    } else {
      prevPanel.decreaseIndex(-indexDiff);
    }
    // Update position
    prevPanel.resize();
  });

  diffResult.added.forEach((panelIdx, elIdx) => {
    renderer.insert(panelIdx, addedElements[elIdx]);
  });
};

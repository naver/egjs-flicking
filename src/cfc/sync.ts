import { DiffResult } from "@egjs/list-differ";

import Flicking from "../Flicking";

export default (flicking: Flicking, diffResult: DiffResult<any>, rendered: any[]) => {
  const renderer = flicking.renderer;

  if (diffResult.removed.length > 0) {
    renderer.batchRemove(
      ...diffResult.removed.map(index => ({ index, deleteCount: 1 }))
    );
  }

  diffResult.removed.forEach(idx => {
    console.log("removed", idx);
  });

  diffResult.ordered.forEach(([prevIdx, newIdx]) => {
    console.log("ordered", prevIdx, newIdx);
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

  if (diffResult.added.length > 0) {
    const inserted = renderer.batchInsert(
      ...diffResult.added.map((index, elIdx) => ({ index, elements: [rendered[elIdx + diffResult.prevList.length]] }))
    );
    console.log("inserted", inserted);
  }

  diffResult.added.forEach((panelIdx, elIdx) => {
    console.log("added", panelIdx);
  });
};

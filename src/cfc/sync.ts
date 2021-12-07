import { DiffResult } from "@egjs/list-differ";

import Flicking from "../Flicking";
import Renderer from "../renderer/Renderer";

export default (flicking: Flicking, diffResult: DiffResult<any>, rendered: any[]) => {
  const renderer = flicking.renderer;
  const panels = renderer.panels;
  const prevList = [...diffResult.prevList];

  if (diffResult.removed.length > 0) {
    let endIdx = -1;
    let prevIdx = -1;

    diffResult.removed.forEach(removedIdx => {
      if (endIdx < 0) {
        endIdx = removedIdx;
      }

      if (prevIdx >= 0 && removedIdx !== prevIdx - 1) {
        batchRemove(renderer, prevIdx, endIdx + 1);

        endIdx = removedIdx;
        prevIdx = removedIdx;
      } else {
        prevIdx = removedIdx;
      }

      prevList.splice(removedIdx, 1);
    });

    batchRemove(renderer, prevIdx, endIdx + 1);
  }

  diffResult.ordered.forEach(([prevIdx, newIdx]) => {
    const prevPanel = panels[prevIdx];
    const indexDiff = newIdx - prevIdx;

    if (indexDiff > 0) {
      const middlePanels = panels.slice(prevIdx + 1, newIdx + 1);

      prevPanel.increaseIndex(indexDiff);
      middlePanels.forEach(panel => panel.decreaseIndex(1));
    } else {
      const middlePanels = panels.slice(newIdx, prevIdx);

      prevPanel.decreaseIndex(-indexDiff);
      middlePanels.forEach(panel => panel.increaseIndex(1));
    }
    // Update position
    prevPanel.resize();
  });

  if (diffResult.ordered.length > 0) {
    panels.sort((panel1, panel2) => panel1.index - panel2.index);
  }

  if (diffResult.added.length > 0) {
    let startIdx = -1;
    let prevIdx = -1;

    const addedElements = rendered.slice(prevList.length);

    diffResult.added.forEach((addedIdx, idx) => {
      if (startIdx < 0) {
        startIdx = idx;
      }

      if (prevIdx >= 0 && addedIdx !== prevIdx + 1) {
        batchInsert(renderer, diffResult, addedElements, startIdx, idx + 1);

        startIdx = -1;
        prevIdx = -1;
      } else {
        prevIdx = addedIdx;
      }
    });

    if (startIdx >= 0) {
      batchInsert(renderer, diffResult, addedElements, startIdx);
    }
  }
};

const batchInsert = (renderer: Renderer, diffResult: DiffResult<any>, addedElements: any[], startIdx: number, endIdx?: number) => {
  renderer.batchInsert(
    ...diffResult.added.slice(startIdx, endIdx).map((index, elIdx) => ({ index, elements: [addedElements[elIdx]], hasDOMInElements: false }))
  );
};

const batchRemove = (renderer: Renderer, startIdx: number, endIdx?: number) => {
  const removed = renderer.panels.slice(startIdx, endIdx);

  renderer.batchRemove({ index: startIdx, deleteCount: removed.length, hasDOMInElements: false });
};


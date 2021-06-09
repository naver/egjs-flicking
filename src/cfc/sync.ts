import { DiffResult } from "@egjs/list-differ";

import Flicking from "../Flicking";
import Renderer from "../renderer/Renderer";

export default (flicking: Flicking, diffResult: DiffResult<any>, rendered: any[]) => {
  const renderer = flicking.renderer;

  if (diffResult.removed.length > 0) {
    let startIdx = -1;
    let prevIdx = -1;

    diffResult.removed.forEach((removedIdx, idx) => {
      if (startIdx < 0) {
        startIdx = idx;
      }

      if (prevIdx >= 0 && removedIdx !== prevIdx + 1) {
        batchRemove(renderer, diffResult, startIdx, idx + 1);

        startIdx = -1;
        prevIdx = -1;
      } else {
        prevIdx = removedIdx;
      }
    });

    if (startIdx >= 0) {
      batchRemove(renderer, diffResult, startIdx);
    }
  }

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

  if (diffResult.added.length > 0) {
    let startIdx = -1;
    let prevIdx = -1;

    diffResult.added.forEach((addedIdx, idx) => {
      if (startIdx < 0) {
        startIdx = idx;
      }

      if (prevIdx >= 0 && addedIdx !== prevIdx + 1) {
        batchInsert(renderer, diffResult, rendered, startIdx, idx + 1);

        startIdx = -1;
        prevIdx = -1;
      } else {
        prevIdx = addedIdx;
      }
    });

    if (startIdx >= 0) {
      batchInsert(renderer, diffResult, rendered, startIdx);
    }
  }
};

const batchInsert = (renderer: Renderer, diffResult: DiffResult<any>, rendered: any[], startIdx: number, endIdx?: number) => {
  renderer.batchInsert(
    ...diffResult.added.slice(startIdx, endIdx).map((index, elIdx) => ({ index, elements: [rendered[elIdx + diffResult.prevList.length]] }))
  );
};

const batchRemove = (renderer: Renderer, diffResult: DiffResult<any>, startIdx: number, endIdx?: number) => {
  const removed = diffResult.removed.slice(startIdx, endIdx);

  renderer.batchRemove({ index: startIdx, deleteCount: removed.length });
};


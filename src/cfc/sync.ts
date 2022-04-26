import { DiffResult } from "@egjs/list-differ";

import Flicking from "../Flicking";
import Renderer from "../renderer/Renderer";
import Panel from "../core/panel/Panel";

export default (flicking: Flicking, diffResult: DiffResult<any>, rendered: any[]) => {
  const renderer = flicking.renderer;
  const panels = renderer.panels;
  const prevList = [...diffResult.prevList];

  const added: Panel[] = [];
  const removed: Panel[] = [];

  if (diffResult.removed.length > 0) {
    let endIdx = -1;
    let prevIdx = -1;

    diffResult.removed.forEach(removedIdx => {
      if (endIdx < 0) {
        endIdx = removedIdx;
      }

      if (prevIdx >= 0 && removedIdx !== prevIdx - 1) {
        removed.push(...batchRemove(renderer, prevIdx, endIdx + 1));

        endIdx = removedIdx;
        prevIdx = removedIdx;
      } else {
        prevIdx = removedIdx;
      }

      prevList.splice(removedIdx, 1);
    });

    removed.push(...batchRemove(renderer, prevIdx, endIdx + 1));
  }

  diffResult.ordered.forEach(([from, to]) => {
    const prevPanel = panels.splice(from, 1)[0];
    panels.splice(to, 0, prevPanel);
  });

  if (diffResult.ordered.length > 0) {
    panels.forEach((panel, idx) => {
      const indexDiff = idx - panel.index;

      if (indexDiff > 0) {
        panel.increaseIndex(indexDiff);
      } else {
        panel.decreaseIndex(-indexDiff);
      }
    });

    panels.sort((panel1, panel2) => panel1.index - panel2.index);

    panels.forEach(panel => {
      panel.updatePosition();
    });
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
        added.push(...batchInsert(renderer, diffResult, addedElements, startIdx, idx + 1));

        startIdx = -1;
        prevIdx = -1;
      } else {
        prevIdx = addedIdx;
      }
    });

    if (startIdx >= 0) {
      added.push(...batchInsert(renderer, diffResult, addedElements, startIdx));
    }
  }

  if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
    renderer.updateAfterPanelChange(added, removed);
  }
};

const batchInsert = (renderer: Renderer, diffResult: DiffResult<any>, addedElements: any[], startIdx: number, endIdx?: number) => {
  return renderer.batchInsertDefer(
    ...diffResult.added.slice(startIdx, endIdx).map((index, elIdx) => ({ index, elements: [addedElements[elIdx]], hasDOMInElements: false }))
  );
};

const batchRemove = (renderer: Renderer, startIdx: number, endIdx?: number) => {
  const removed = renderer.panels.slice(startIdx, endIdx);

  return renderer.batchRemoveDefer({ index: startIdx, deleteCount: removed.length, hasDOMInElements: false });
};


import { DiffResult } from "@egjs/list-differ";
import sync from "~/cfc/sync";

import El from "../helper/El";
import { createFlicking } from "../helper/test-util";

describe("sync", () => {
  it("can remove consecutive panels", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
    const prevPanels = flicking.panels;
    const diffResult: DiffResult<HTMLElement> = {
      prevList: flicking.panels.map(panel => panel.element),
      list: [flicking.panels[0].element],
      added: [],
      removed: [2, 1],
      changed: [],
      ordered: [],
      pureChanged: [],
      maintained: []
    };

    sync(flicking, diffResult, []);

    expect(flicking.panels.length).to.equal(1);
    expect(flicking.panels[0]).to.deep.equal(prevPanels[0]);
  });

  it("can remove the first panel", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
    const prevPanels = [...flicking.panels];
    const diffResult: DiffResult<HTMLElement> = {
      prevList: flicking.panels.map(panel => panel.element),
      list: flicking.panels.slice(1, 3).map(panel => panel.element),
      added: [],
      removed: [0],
      changed: [],
      ordered: [],
      pureChanged: [],
      maintained: []
    };

    sync(flicking, diffResult, []);

    expect(flicking.panels.length).to.equal(2);
    expect(flicking.panels).to.deep.equal(prevPanels.slice(1, 3));
  });

  it("can remove the last panel", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
    const prevPanels = [...flicking.panels];
    const diffResult: DiffResult<HTMLElement> = {
      prevList: flicking.panels.map(panel => panel.element),
      list: flicking.panels.slice(0, 2).map(panel => panel.element),
      added: [],
      removed: [2],
      changed: [],
      ordered: [],
      pureChanged: [],
      maintained: []
    };

    sync(flicking, diffResult, []);

    expect(flicking.panels.length).to.equal(2);
    expect(flicking.panels).to.deep.equal(prevPanels.slice(0, 2));
  });

  it("can remove non-consecutive panels", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
    const prevPanels = [...flicking.panels];
    const diffResult: DiffResult<HTMLElement> = {
      prevList: flicking.panels.map(panel => panel.element),
      list: [flicking.panels[1].element],
      added: [],
      removed: [2, 0],
      changed: [],
      ordered: [],
      pureChanged: [],
      maintained: []
    };

    sync(flicking, diffResult, []);

    expect(flicking.panels.length).to.equal(1);
    expect(flicking.panels).to.deep.equal([prevPanels[1]]);
  });

  it("can remove consecutive & non-consecutive mixed panels", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(10));
    const prevPanels = [...flicking.panels];
    const nonRemovedPanels = [prevPanels[1], prevPanels[4], prevPanels[5], prevPanels[9]];

    const diffResult: DiffResult<HTMLElement> = {
      prevList: prevPanels.map(panel => panel.element),
      list: nonRemovedPanels.map(panel => panel.element),
      added: [],
      removed: [8, 7, 6, 3, 2, 0],
      changed: [],
      ordered: [],
      pureChanged: [],
      maintained: []
    };

    sync(flicking, diffResult, []);

    expect(flicking.panels.length).to.equal(nonRemovedPanels.length);
    expect(flicking.panels).to.deep.equal(nonRemovedPanels);
  });

  it("should decrease the indexes of the middle panels if one of the panels move to last", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(5));
    const prevPanels = [...flicking.panels];
    const newPanels = [...flicking.panels.slice(1), flicking.panels[0]];

    const diffResult: DiffResult<HTMLElement> = {
      prevList: prevPanels.map(panel => panel.element),
      list: newPanels.map(panel => panel.element),
      added: [],
      removed: [],
      changed: [],
      ordered: [[0, 4]],
      pureChanged: [],
      maintained: []
    };

    sync(flicking, diffResult, []);

    expect(flicking.panels.every((panel, idx) => panel.index === idx)).to.be.true;
  });

  it("should increase the indexes of the middle panels if one of the panels move to last", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(5));
    const prevPanels = [...flicking.panels];
    const newPanels = [flicking.panels[4], ...flicking.panels.slice(0, 4)];

    const diffResult: DiffResult<HTMLElement> = {
      prevList: prevPanels.map(panel => panel.element),
      list: newPanels.map(panel => panel.element),
      added: [],
      removed: [],
      changed: [],
      ordered: [[4, 0]],
      pureChanged: [],
      maintained: []
    };

    sync(flicking, diffResult, []);

    expect(flicking.panels.every((panel, idx) => panel.index === idx)).to.be.true;
  });
});

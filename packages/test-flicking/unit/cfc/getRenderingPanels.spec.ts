import { diff } from "@egjs/list-differ";
import getRenderingPanels from "~/cfc/getRenderingPanels";

import El from "../helper/El";
import { createFlicking } from "../helper/test-util";

describe("getRenderingPanels", () => {
  it("should use diffResult's list instead of prevList", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
    const prevPanels = flicking.panels.map(panel => panel.element);
    const newPanels = flicking.panels.map(() => El.panel().el);

    const diffResult = diff(prevPanels, newPanels);
    const renderingPanels = getRenderingPanels(flicking, diffResult);

    expect(renderingPanels.every((panel, idx) => panel !== prevPanels[idx])).to.be.true;
    expect(renderingPanels.every((panel, idx) => panel === newPanels[idx])).to.be.true;
  });

  it("should not include removed panels", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
    const prevPanels = flicking.panels;
    const newPanels = flicking.panels.slice(0, 1);
    const removed = flicking.panels.slice(1);

    const diffResult = diff(prevPanels, newPanels);
    const renderingPanels = getRenderingPanels(flicking, diffResult);

    expect(renderingPanels.every(panel => !removed.includes(panel))).to.be.true;
  });

  it("should include added panels after the previous panels", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
    const prevPanels = flicking.panels.map(panel => panel.element);
    const added = [El.panel().el, El.panel().el];
    const newPanels = [...added, ...prevPanels];

    const diffResult = diff(prevPanels, newPanels);
    const renderingPanels = getRenderingPanels(flicking, diffResult);

    expect(renderingPanels.slice(0, prevPanels.length)).to.deep.equal(prevPanels);
    expect(renderingPanels.slice(prevPanels.length)).to.deep.equal(added);
  });
});

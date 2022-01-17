import CameraMode from "~/camera/mode/CameraMode";

import { createFlicking } from "../../helper/test-util";
import El from "../../helper/El";

describe("CameraMode", () => {
  class CamerModeImpl extends CameraMode {
    public checkAvailability(): boolean {
      return true;
    }

    public getRange(): { min: number; max: number } {
      return { min: 0, max: 0 };
    }
  }

  describe("getAnchors", async () => {
    it("should return anchors matching panels without considering reachability", async () => {
      const flicking = await createFlicking(
        El.viewport().setWidth(900).add(
          El.camera()
            .add(El.panel("100px"))
            .add(El.panel("100px"))
            .add(El.panel("100px"))
        ),
        { bound: true }
      );
      const mode = new CamerModeImpl(flicking);
      const anchors = mode.getAnchors();
      const panels = flicking.panels;

      expect(anchors.length).to.equal(panels.length);
      expect(anchors.every((anchor, idx) => anchor.panel === panels[idx])).to.be.true;
    });
  });

  describe("clampToReachablePosition", () => {
    it("should return position if it's inside current range", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
      const range = flicking.camera.range;
      const mode = new CamerModeImpl(flicking);

      expect(mode.clampToReachablePosition(range.min)).to.equal(range.min);
      expect(mode.clampToReachablePosition((range.min + range.max) / 2)).to.equal((range.min + range.max) / 2);
      expect(mode.clampToReachablePosition(range.max)).to.equal(range.max);
    });

    it("should return clamped position if it's outside of current range", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
      const range = flicking.camera.range;
      const mode = new CamerModeImpl(flicking);

      expect(mode.clampToReachablePosition(range.min - 1)).to.equal(range.min);
      expect(mode.clampToReachablePosition(range.max + 1)).to.equal(range.max);
    });
  });

  describe("canSee", () => {
    it("should return true when panel is inside of camera's visible range", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
      const { camera, panels } = flicking;
      const panel = panels[0];
      const mode = new CamerModeImpl(flicking);

      sinon.stub(panel, "position")
        .get(() => camera.visibleRange.min);

      expect(mode.canSee(panel)).to.be.true;

      sinon.stub(panel, "position")
        .get(() => camera.visibleRange.max);

      expect(mode.canSee(panel)).to.be.true;
    });

    it("should return false when panel is outside of camera's visible range", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
      const { camera, panels } = flicking;
      const panel = panels[0];
      const mode = new CamerModeImpl(flicking);

      sinon.stub(panel, "range")
        .get(() => ({ min: camera.visibleRange.min - 1, max: camera.visibleRange.min - 1 }));

      expect(mode.canSee(panel)).to.be.false;

      sinon.stub(panel, "range")
        .get(() => ({ min: camera.visibleRange.max + 1, max: camera.visibleRange.max + 1 }));

      expect(mode.canSee(panel)).to.be.false;
    });
  });

  describe("canReach", () => {
    it("should return false when panel's position is outside of camera range", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
      const { camera, panels } = flicking;
      const panel = panels[0];
      const mode = new CamerModeImpl(flicking);

      sinon.stub(panel, "position")
        .get(() => camera.range.max + 1);

      expect(mode.canReach(panel)).to.be.false;

      sinon.stub(panel, "position")
        .get(() => camera.range.min - 1);

      expect(mode.canReach(panel)).to.be.false;
    });

    it("should return true when panel's position is inside of camera range", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
      const { camera, panels } = flicking;
      const panel = panels[0];
      const mode = new CamerModeImpl(flicking);

      sinon.stub(panel, "position")
        .get(() => camera.range.max);

      expect(mode.canReach(panel)).to.be.true;

      sinon.stub(panel, "position")
        .get(() => camera.range.min);

      expect(mode.canReach(panel)).to.be.true;
    });
  });

  describe("getCircularOffset", () => {
    it("should return 0", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
      const mode = new CamerModeImpl(flicking);

      expect(mode.getCircularOffset()).to.equal(0);
    });
  });
});

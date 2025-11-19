import CircularCameraMode from "~/camera/mode/CircularCameraMode";

import { createFlicking, createPanel } from "../../helper/test-util";
import El from "../../helper/El";

describe("CircularCamera", () => {
  describe("Methods", () => {
    describe("findAnchorIncludePosition", () => {
      it("should return panel at toggled position if circular is enabled", async () => {
        const { camera, panels } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).to.be.an.instanceOf(CircularCameraMode);
        expect(camera.mode.findAnchorIncludePosition(panels[2].range.max + 1).panel).to.equal(panels[0]);
        expect(camera.mode.findAnchorIncludePosition(panels[0].range.min - 1).panel).to.equal(panels[2]);
      });

      it("should return panel at toggled position if the given position is same to the camera range max", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).to.be.an.instanceOf(CircularCameraMode);
        expect(camera.mode.findAnchorIncludePosition(camera.range.max).index).to.equal(0);
      });

      it("should return panel at toggled position if the given position is same to the camera range min", async () => {
        const { camera, panelCount } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).to.be.an.instanceOf(CircularCameraMode);
        expect(camera.mode.findAnchorIncludePosition(camera.range.min).index).to.equal(panelCount - 1);
      });
    });

    describe("clampToReachablePosition", () => {
      it("should return position itself even it's over range when circular can be enabled", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).to.be.an.instanceOf(CircularCameraMode);
        expect(camera.controlParams.circular).to.be.true;
        expect(camera.clampToReachablePosition(camera.range.max + 1))
          .to.equal(camera.range.max + 1);
        expect(camera.clampToReachablePosition(camera.range.min - 1))
          .to.equal(camera.range.min - 1);
      });
    });

    describe("canReach", () => {
      it("should always return true for any panel when circular is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const camera = flicking.camera;
        const panel = flicking.getPanel(0);

        expect(camera.mode).to.be.an.instanceOf(CircularCameraMode);

        sinon.stub(panel, "position")
          .get(() => camera.range.max + 1);

        expect(camera.canReach(panel)).to.be.true;

        sinon.stub(panel, "position")
          .get(() => camera.range.min - 1);

        expect(camera.canReach(panel)).to.be.true;
      });
    });

    describe("canSee", () => {
      it("should return true when panel is visible on looped position is included if circular is enabled", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const panel = await createPanel(El.panel());
        const camRange = camera.range;

        expect(camera.mode).to.be.an.instanceOf(CircularCameraMode);

        camera.lookAt(camRange.min);
        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.min + camera.rangeDiff + 1, max: camera.visibleRange.min + camera.rangeDiff + 1 }));

        expect(camera.canSee(panel)).to.be.true;

        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.max + camera.rangeDiff - 1, max: camera.visibleRange.max + camera.rangeDiff - 1 }));

        expect(camera.canSee(panel)).to.be.true;

        camera.lookAt(camRange.max);
        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.min - camera.rangeDiff + 1, max: camera.visibleRange.min - camera.rangeDiff + 1 }));

        expect(camera.canSee(panel)).to.be.true;

        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.max - camera.rangeDiff - 1, max: camera.visibleRange.max - camera.rangeDiff - 1 }));

        expect(camera.canSee(panel)).to.be.true;
      });

      it("should return false when visible on looped position is not included if circular is enabled", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).to.be.an.instanceOf(CircularCameraMode);

        const panel = await createPanel(El.panel());
        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.min + camera.rangeDiff - 1, max: camera.visibleRange.min + camera.rangeDiff - 1 }));

        expect(camera.canSee(panel)).to.be.false;

        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.max + camera.rangeDiff + 1, max: camera.visibleRange.max + camera.rangeDiff + 1 }));

        expect(camera.canSee(panel)).to.be.false;

        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.min - camera.rangeDiff - 1, max: camera.visibleRange.min - camera.rangeDiff - 1 }));

        expect(camera.canSee(panel)).to.be.false;

        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.max - camera.rangeDiff + 1, max: camera.visibleRange.max - camera.rangeDiff + 1 }));

        expect(camera.canSee(panel)).to.be.false;
      });
    });

    describe("getRange", () => {
      it("should set range from first panel's left to last panel's right when circular is enabled", async () => {
        const { camera, panels } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).to.be.an.instanceOf(CircularCameraMode);
        expect(camera.mode.checkAvailability()).to.be.true;
        expect(camera.range).to.deep.equal({
          min: panels[0].range.min,
          max: panels[2].range.max
        });
      });
    });

    describe("findNearestAnchor", () => {
      it("should return the first anchor when position is 0", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const anchors = camera.anchorPoints;

        expect(camera.mode).to.be.an.instanceOf(CircularCameraMode);
        expect(camera.mode.checkAvailability()).to.be.true;
        expect(camera.mode.findNearestAnchor(0)).to.equal(anchors[0]);
      });

      it("should return the last anchor when position is below 0", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const anchors = camera.anchorPoints;

        expect(camera.mode).to.be.an.instanceOf(CircularCameraMode);
        expect(camera.mode.checkAvailability()).to.be.true;
        expect(camera.mode.findNearestAnchor(-500)).to.equal(anchors[2]);
      });
    });
  });
});

import CircularCamera from "~/camera/CircularCamera";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";

import { createFlicking, createPanel } from "../helper/test-util";
import El from "../helper/El";

describe("CircularCamera", () => {
  describe("Properties", () => {
    it("should have circularEnabled false as default", () => {
      expect(new CircularCamera().controlParams.circular).to.be.false;
    });
  });

  describe("Methods", () => {
    describe("findAnchorIncludePosition", () => {
      it("should return panel at toggled position if circular is enabled", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panels = flicking.panels;

        camera.init(flicking);
        camera.updateRange();
        camera.updateAnchors();

        expect(camera.findAnchorIncludePosition(panels[2].range.max + 1).panel).to.equal(panels[0]);
        expect(camera.findAnchorIncludePosition(panels[0].range.min - 1).panel).to.equal(panels[2]);
      });
    });

    describe("clampToReachablePosition", () => {
      it("should return position itself even it's over range when circular can be enabled", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        camera.init(flicking);
        camera.updateRange();

        expect(camera.controlParams.circular).to.be.true;
        expect(camera.clampToReachablePosition(camera.range.max + 1))
          .to.equal(camera.range.max + 1);
        expect(camera.clampToReachablePosition(camera.range.min - 1))
          .to.equal(camera.range.min - 1);
      });

      it("should return clamped position when circular cannot be enabled", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(
          El.viewport().setWidth(3000).add(
            El.camera()
              .add(El.panel("30%"))
              .add(El.panel("30%"))
              .add(El.panel("30%"))
          )
        );

        camera.init(flicking);
        camera.updateRange();

        expect(camera.controlParams.circular).to.be.false;
        expect(camera.clampToReachablePosition(camera.range.max + 1))
          .to.equal(camera.range.max);
        expect(camera.clampToReachablePosition(camera.range.min - 1))
          .to.equal(camera.range.min);
      });
    });

    describe("canReach", () => {
      it("should always return true for any panel when circular is enabled", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const panel = flicking.getPanel(0);

        camera.init(flicking);
        camera.updateRange();

        expect(camera).to.be.an.instanceOf(CircularCamera);

        sinon.stub(panel, "position")
          .get(() => camera.range.max + 1);

        expect(camera.canReach(panel)).to.be.true;

        sinon.stub(panel, "position")
          .get(() => camera.range.min - 1);

        expect(camera.canReach(panel)).to.be.true;
      });
    });

    describe("canSee", () => {
      it("should return true when panel is visible on looped position is included if circular is enabled", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const panel = createPanel(El.panel());

        camera.init(flicking);
        camera.updateAlignPos();
        camera.updateRange();

        const camRange = camera.range;
        expect(camera.controlParams.circular).to.be.true;

        camera.lookAt(camRange.min);
        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.min + camera.rangeDiff, max: camera.visibleRange.min + camera.rangeDiff }));

        expect(camera.canSee(panel)).to.be.true;

        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.max + camera.rangeDiff, max: camera.visibleRange.max + camera.rangeDiff }));

        expect(camera.canSee(panel)).to.be.true;

        camera.lookAt(camRange.max);
        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.min - camera.rangeDiff, max: camera.visibleRange.min - camera.rangeDiff }));

        expect(camera.canSee(panel)).to.be.true;

        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.max - camera.rangeDiff, max: camera.visibleRange.max - camera.rangeDiff }));

        expect(camera.canSee(panel)).to.be.true;
      });

      it("should return false when visible on looped position is not included if circular is enabled", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        camera.init(flicking);
        camera.updateRange();

        expect(camera.controlParams.circular).to.be.true;

        const panel = createPanel(El.panel());
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

    describe("getControlParameters", () => {
      it("should return circular: true when circular can be enabled", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        camera.init(flicking);
        camera.updateRange();

        expect(camera.controlParams.circular).to.be.true;
        expect(camera.controlParams.circular).to.be.true;
      });

      it("should return circular: false when circular cannot be enabled", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(
          El.viewport().setWidth(3000).add(
            El.camera()
              .add(El.panel("30%"))
              .add(El.panel("30%"))
              .add(El.panel("30%"))
          )
        );

        camera.init(flicking);
        camera.updateRange();

        expect(camera.controlParams.circular).to.be.false;
      });
    });

    describe("updateRange", () => {
      it("should throw a FlickingError with code NOT_ATTACHED_TO_FLICKING when it's not initialized yet", () => {
        const camera = new CircularCamera();

        expect(() => camera.updateRange())
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should set range to min:0, max:0 when there're no panels", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(El.viewport().add(El.camera()));

        camera.init(flicking);
        camera.updateRange();

        expect(camera.range).to.deep.equal({ min: 0, max: 0 });
      });

      it("should set range from first panel's position to last panel's position when circular cannot be enabled", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(
          El.viewport().setWidth(900).add(
            El.camera()
              .add(El.panel("300px"))
              .add(El.panel("300px"))
              .add(El.panel("300px"))
          )
        );

        camera.init(flicking);
        camera.updateAlignPos();
        camera.updateRange();

        expect(camera.controlParams.circular).to.be.false;
        expect(camera.range).to.deep.equal({
          min: flicking.getPanel(0).position,
          max: flicking.getPanel(2).position
        });
      });

      it("should set range from first panel's left to last panel's right when circular is enabled", () => {
        const camera = new CircularCamera();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        camera.init(flicking);
        camera.updateAlignPos();
        camera.updateRange();

        expect(camera.controlParams.circular).to.be.true;
        expect(camera.range).to.deep.equal({
          min: flicking.getPanel(0).range.min,
          max: flicking.getPanel(2).range.max
        });
      });
    });
  });
});

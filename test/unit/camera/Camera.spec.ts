import { ALIGN, DIRECTION, EVENTS } from "~/const/external";
import Camera from "~/camera/Camera";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";

import { createFlicking } from "../helper/test-util";
import El from "../helper/El";

class CameraImpl extends Camera {
  public get range() { return this._range; }
  public set range(val: { min: number; max: number }) { this._range = val; }
  public updateRange() { return this; }
}

describe("Camera", () => {
  describe("Properties", () => {
    it("should have element undefined as default", () => {
      expect(new CameraImpl().element).to.be.undefined;
    });

    it("should have position 0 as default", () => {
      expect(new CameraImpl().position).to.equal(0);
    });

    it("should have 0 as a default size", () => {
      expect(new CameraImpl().size).to.equal(0);
    });

    it("should have alignPosition 0 as default", () => {
      expect(new CameraImpl().alignPosition).to.equal(0);
    });

    it("should have range from 0 to 0 as default", () => {
      expect(new CameraImpl().range.min).to.equal(0);
      expect(new CameraImpl().range.max).to.equal(0);
    });

    it("should have visiblePanels as an empty array as default", () => {
      expect(new CameraImpl().visiblePanels).to.be.empty;
    });

    it(`should have align ${ALIGN.CENTER} as default`, () => {
      expect(new CameraImpl().align).to.equal(ALIGN.CENTER);
    });

    it("should return size same to viewport width when horizontal: true", () => {
      const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { horizontal: true });
      const camera = new CameraImpl();

      camera.init(flicking);

      expect(camera.size).not.to.equal(0);
      expect(camera.size).to.equal(flicking.viewport.width);
      expect(camera.size).not.to.equal(flicking.viewport.height);
    });

    it("should return size same to viewport height when horizontal: false", () => {
      const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { horizontal: false });
      const camera = new CameraImpl();

      camera.init(flicking);

      expect(camera.size).not.to.equal(0);
      expect(camera.size).not.to.equal(flicking.viewport.width);
      expect(camera.size).to.equal(flicking.viewport.height);
    });

    describe("controlParams", () => {
      it("should return current range", () => {
        expect(new CameraImpl().controlParams.range).to.deep.equal(new CameraImpl().range);
      });

      it("should return current position", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        camera.init(flicking);
        camera.lookAt(800);

        expect(camera.controlParams.position).to.equal(800);
      });

      it("should always return circular as false", () => {
        expect(new CameraImpl().controlParams.circular).to.be.false;
      });
    });

    describe("visibleRange", () => {
      it("should return visible range from current position", () => {
        const camera = new CameraImpl({ align: ALIGN.CENTER });
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        camera.init(flicking);
        camera.updateAlignPos();
        camera.lookAt(500);

        expect(camera.visibleRange.min).to.equal(500 - flicking.viewport.width / 2);
        expect(camera.visibleRange.max).to.equal(500 + flicking.viewport.width / 2);
      });
    });
  });

  describe("Methods", () => {
    describe("init", () => {
      it("should throw a FlickingError with code VAL_MUST_NOT_NULL when there's no camera element inside it", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        // Remove viewport's children
        while (flicking.getElement().firstChild) {
          flicking.getElement().firstChild.remove();
        }

        expect(() => camera.init(flicking))
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.VAL_MUST_NOT_NULL);
      });

      it("should set first child of the viewport element as its element", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        camera.init(flicking);

        expect(camera.element).to.equal(flicking.getElement().firstChild);
      });
    });

    describe("lookAt", () => {
      it("should throw a FlickingError with code NOT_ATTACHED_TO_FLICKING when it's not initialized yet", () => {
        const camera = new CameraImpl();

        expect(() => camera.lookAt(500))
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should set position to given value", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const prevPosition = camera.position;

        camera.init(flicking);
        camera.lookAt(500);

        expect(camera.position).not.to.equal(prevPosition);
        expect(camera.position).to.equal(500);
      });

      it("should apply transform to camera element", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        camera.init(flicking);
        camera.lookAt(500);

        expect(camera.element.style.transform).to.equal(`translate(${-(500 - camera.alignPosition)}px)`);
      });

      it("should update visible panels", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        camera.init(flicking);
        camera.lookAt(500);

        expect(camera.visiblePanels).not.to.be.empty;
      });

      it(`should trigger flicking's ${EVENTS.VISIBLE_CHANGE} on visible panels update`, () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const visibleChangeSpy = sinon.spy();

        flicking.on(EVENTS.VISIBLE_CHANGE, visibleChangeSpy);
        camera.init(flicking);
        camera.lookAt(500);

        expect(visibleChangeSpy.calledOnce).to.be.true;
      });

      it(`should trigger flicking's ${EVENTS.NEED_PANEL} for both sides when there're no panels`, () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.viewport().add(El.camera()));
        const needPanelSpy = sinon.spy();

        flicking.on(EVENTS.NEED_PANEL, needPanelSpy);
        camera.init(flicking);
        camera.lookAt(500);

        expect(needPanelSpy.calledTwice).to.be.true;
        expect(needPanelSpy.calledWithMatch({ direction: DIRECTION.NEXT })).to.be.true;
        expect(needPanelSpy.calledWithMatch({ direction: DIRECTION.PREV })).to.be.true;
      });

      it(`should trigger flicking's ${EVENTS.REACH_EDGE} when moving to range.min`, () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.viewport().add(El.camera()));
        const reachEdgeSpy = sinon.spy();

        camera.range = { min: -1000, max: 1000 };
        camera.init(flicking);
        flicking.on(EVENTS.REACH_EDGE, reachEdgeSpy);
        camera.lookAt(-1000);

        expect(reachEdgeSpy.calledOnce).to.be.true;
        expect(reachEdgeSpy.calledWithMatch({ direction: DIRECTION.PREV })).to.be.true;
      });

      it(`should trigger flicking's ${EVENTS.REACH_EDGE} when moving to range.max`, () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.viewport().add(El.camera()));
        const reachEdgeSpy = sinon.spy();

        camera.range = { min: -1000, max: 1000 };
        camera.init(flicking);
        flicking.on(EVENTS.REACH_EDGE, reachEdgeSpy);
        camera.lookAt(1000);

        expect(reachEdgeSpy.calledOnce).to.be.true;
        expect(reachEdgeSpy.calledWithMatch({ direction: DIRECTION.NEXT })).to.be.true;
      });

      it(`should noot trigger flicking's ${EVENTS.REACH_EDGE} when moving from outside of range to range.min`, () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.viewport().add(El.camera()));
        const reachEdgeSpy = sinon.spy();

        camera.range = { min: -1000, max: 1000 };
        camera.init(flicking);
        camera.lookAt(-1001); // Move to outside
        flicking.on(EVENTS.REACH_EDGE, reachEdgeSpy);
        camera.lookAt(-1000); // Move to outside

        expect(reachEdgeSpy.called).to.be.false;
      });

      it(`should noot trigger flicking's ${EVENTS.REACH_EDGE} when moving from outside of range to range.max`, () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.viewport().add(El.camera()));
        const reachEdgeSpy = sinon.spy();

        camera.range = { min: -1000, max: 1000 };
        camera.init(flicking);
        camera.lookAt(1001); // Move to outside
        flicking.on(EVENTS.REACH_EDGE, reachEdgeSpy);
        camera.lookAt(1000); // Move to outside

        expect(reachEdgeSpy.called).to.be.false;
      });
    });

    describe("findAnchorIncludePosition", () => {
      it("should return panel at given position", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panels = flicking.getAllPanels();

        camera.init(flicking);
        camera.updateAnchors();

        expect(camera.findAnchorIncludePosition(panels[0].position).panel).to.equal(panels[0]);
        expect(camera.findAnchorIncludePosition(panels[1].position).panel).to.equal(panels[1]);
        expect(camera.findAnchorIncludePosition(panels[2].position).panel).to.equal(panels[2]);
      });

      it("should return null when no panel includes given position", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panels = flicking.getAllPanels();

        camera.init(flicking);
        camera.updateAnchors();

        expect(camera.findAnchorIncludePosition(-999999999)).to.be.null;
        expect(camera.findAnchorIncludePosition(999999999)).to.be.null;
        expect(camera.findAnchorIncludePosition(panels[2].range.max + 1)).to.be.null;
        expect(camera.findAnchorIncludePosition(panels[0].range.min - 1)).to.be.null;
      });
    });

    describe("findNearestAnchor", () => {
      it("should return null when there're no panels", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.viewport().add(El.camera()));

        camera.init(flicking);
        camera.updateAnchors();

        expect(camera.findNearestAnchor(0)).to.be.null;
      });

      it("should return correct panel underneath it", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        camera.init(flicking);
        camera.updateAnchors();
        camera.lookAt(flicking.getPanel(1).position);

        const nearestAnchor = camera.findNearestAnchor(camera.position);
        expect(nearestAnchor.panel).to.equal(flicking.getPanel(1));
        expect(nearestAnchor.position).to.equal(flicking.getPanel(1).position);
      });
    });

    describe("clampToReachablePosition", () => {
      it("should return position if it's inside current range", () => {
        const camera = new CameraImpl();
        camera.range = { min: 0, max: 200 };
        expect(camera.clampToReachablePosition(100)).to.equal(100);
      });

      it("should return clamped position if it's outside of current range", () => {
        const camera = new CameraImpl();
        camera.range = { min: 0, max: 200 };
        expect(camera.clampToReachablePosition(-100)).to.equal(0);
        expect(camera.clampToReachablePosition(201)).to.equal(200);
      });
    });

    describe("canReach", () => {
      it("should return false when panel's position is outside of camera range", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        camera.init(flicking);
        camera.updateRange();

        sinon.stub(panel, "position")
          .get(() => camera.range.max + 1);

        expect(camera.canReach(panel)).to.be.false;

        sinon.stub(panel, "position")
          .get(() => camera.range.min - 1);

        expect(camera.canReach(panel)).to.be.false;
      });

      it("should return true when panel's position is inside of camera range", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        camera.init(flicking);
        camera.updateRange();

        sinon.stub(panel, "position")
          .get(() => camera.range.max);

        expect(camera.canReach(panel)).to.be.true;

        sinon.stub(panel, "position")
          .get(() => camera.range.min);

        expect(camera.canReach(panel)).to.be.true;
      });
    });

    describe("canSee", () => {
      it("should return true when panel is inside of camera's visible range", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        camera.init(flicking);
        camera.updateRange();

        sinon.stub(panel, "position")
          .get(() => camera.visibleRange.min);

        expect(camera.canSee(panel)).to.be.true;

        sinon.stub(panel, "position")
          .get(() => camera.visibleRange.max);

        expect(camera.canSee(panel)).to.be.true;
      });

      it("should return false when panel is outside of camera's visible range", () => {
        const camera = new CameraImpl();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        camera.init(flicking);
        camera.updateRange();

        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.min - 1, max: camera.visibleRange.min - 1 }));

        expect(camera.canSee(panel)).to.be.false;

        sinon.stub(panel, "range")
          .get(() => ({ min: camera.visibleRange.max + 1, max: camera.visibleRange.max + 1 }));

        expect(camera.canSee(panel)).to.be.false;
      });
    });

    describe("updateAlignPos", () => {
      it("should update alignPosition using current align value", () => {
        const camera = new CameraImpl({ align: "80%" });
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const prevAlignPosition = camera.alignPosition;

        camera.init(flicking);
        camera.updateAlignPos();

        expect(camera.alignPosition).not.to.equal(prevAlignPosition);
        expect(camera.alignPosition).to.equal(flicking.viewport.width * 0.8);
      });

      it("should use property 'camera' if align is given as an object", () => {
        const camera = new CameraImpl({ align: { panel: "30%", camera: "70%" } });
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const prevAlignPosition = camera.alignPosition;

        camera.init(flicking);
        camera.updateAlignPos();

        expect(camera.alignPosition).not.to.equal(prevAlignPosition);
        expect(camera.alignPosition).to.equal(flicking.viewport.width * 0.7);
      });
    });
  });
});

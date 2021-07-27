import StrictControl from "~/control/StrictControl";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";
import { MOVE_TYPE } from "~/const/external";

import El from "../helper/El";
import { createFlicking, simulate } from "../helper/test-util";

describe("StrictControl", () => {
  describe("Methods", () => {
    describe("updateInput", () => {
      it("should set controller range to prev panel's position to next panel's position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, defaultIndex: 1 });
        const prevPanel = flicking.panels[0];
        const nextPanel = flicking.panels[2];
        const controller = flicking.control.controller;

        flicking.control.updateInput();

        expect(controller.range[0]).to.equal(prevPanel.position);
        expect(controller.range[1]).to.equal(nextPanel.position);
      });

      it("should set control range to current panel's position to next panel's position if current panel is the first panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, defaultIndex: 0 });
        const currentPanel = flicking.panels[0];
        const nextPanel = flicking.panels[1];
        const controller = flicking.control.controller;

        flicking.control.updateInput();

        expect(controller.range[0]).to.equal(currentPanel.position);
        expect(controller.range[1]).to.equal(nextPanel.position);
      });

      it("should set control range to prev panel's position to current panel's position if current panel is the last panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, defaultIndex: 2 });
        const prevPanel = flicking.panels[1];
        const currentPanel = flicking.panels[2];
        const controller = flicking.control.controller;

        flicking.control.updateInput();

        expect(controller.range[0]).to.equal(prevPanel.position);
        expect(controller.range[1]).to.equal(currentPanel.position);
      });

      it("should set control range to current - n panel's position to current + n panel's position", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "100%").add(
            El.camera().add(
              // Total 9 panels
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300)
            ),
          ),
          { moveType: [MOVE_TYPE.STRICT, { count: 2 }] }
        );
        const panels = flicking.panels;
        const controller = flicking.control.controller;

        await flicking.moveTo(2, 0);

        expect(controller.range[0]).to.equal(panels[0].position);
        expect(controller.range[1]).to.equal(panels[4].position);

        await flicking.moveTo(4, 0);

        expect(controller.range[0]).to.equal(panels[2].position);
        expect(controller.range[1]).to.equal(panels[6].position);

        await flicking.moveTo(6, 0);

        expect(controller.range[0]).to.equal(panels[4].position);
        expect(controller.range[1]).to.equal(panels[8].position);
      });

      it("should set control range to current - n panel's position to current + n panel's position (edge case)", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "100%").add(
            El.camera().add(
              // Total 9 panels
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300)
            ),
          ),
          { moveType: [MOVE_TYPE.STRICT, { count: 2 }] }
        );
        const panels = flicking.panels;
        const controller = flicking.control.controller;

        await flicking.moveTo(0, 0);

        expect(controller.range[0]).to.equal(panels[0].position);
        expect(controller.range[1]).to.equal(panels[2].position);

        await flicking.moveTo(1, 0);

        expect(controller.range[0]).to.equal(panels[0].position);
        expect(controller.range[1]).to.equal(panels[3].position);

        await flicking.moveTo(8, 0);

        expect(controller.range[0]).to.equal(panels[6].position);
        expect(controller.range[1]).to.equal(panels[8].position);

        await flicking.moveTo(7, 0);

        expect(controller.range[0]).to.equal(panels[5].position);
        expect(controller.range[1]).to.equal(panels[8].position);
      });

      it("should clamp controller range to camera range if bound=true", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "100%").add(
            El.camera().add(
              El.panel().setWidth("50%").setHeight(300),
              El.panel().setWidth("50%").setHeight(300),
              El.panel().setWidth("50%").setHeight(300)
            ),
          ),
          { moveType: MOVE_TYPE.STRICT, bound: true, defaultIndex: 1 }
        );
        const camera = flicking.camera;
        const control = flicking.control;
        const controller = control.controller;
        const prevPanel = flicking.panels[0];
        const nextPanel = flicking.panels[2];

        control.updateInput();

        expect(controller.range[0]).not.equals(prevPanel.position);
        expect(controller.range[0]).equals(camera.range.min);
        expect(controller.range[1]).not.equals(nextPanel.position);
        expect(controller.range[1]).equals(camera.range.max);
      });

      it("should always set Axes's circular to false even if circular mode is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, circular: true });
        const controller = flicking.control.controller;

        expect(flicking.circularEnabled).to.be.true;
        expect(controller.controlParams.circular).to.be.false;
      });

      it("should extend controller range larger than camera range when circular=true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, circular: true });
        const panels = flicking.panels;
        const controller = flicking.control.controller;
        const cameraRangeDiff = flicking.camera.rangeDiff;

        expect(flicking.circularEnabled).to.be.true;

        await flicking.moveTo(0, 0);

        expect(controller.range[0]).to.equal(panels[2].position - cameraRangeDiff);
        expect(controller.range[1]).to.equal(panels[1].position);

        await flicking.moveTo(2, 0);

        expect(controller.range[0]).to.equal(panels[1].position);
        expect(controller.range[1]).to.equal(panels[0].position + cameraRangeDiff);
      });

      it("should update based on nearest panel when updated during animation", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT });
        const panels = flicking.panels;
        const camera = flicking.camera;
        const control = flicking.control;
        const controller = control.controller;

        // This should reach panel 1
        void simulate(flicking.element, { deltaX: -99999, duration: 1000 }, 800);

        expect(flicking.animating).to.be.true;
        expect(camera.findNearestAnchor(camera.position).panel.index).to.equal(1);

        control.updateInput();

        expect(controller.range[0]).to.equal(panels[0].position);
        expect(controller.range[1]).to.equal(panels[2].position);
      });
    });

    describe("moveToPosition", () => {
      it("should be rejected returning FlickingError with code NOT_ATTACHED_TO_FLICKING if control is not initialized", async () => {
        const control = new StrictControl();

        const err = await control.moveToPosition(0, 0).catch(e => e);
        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should be rejected returning FlickingError with code POSITION_NOT_REACHABLE when there are no panels exist", async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()), { moveType: MOVE_TYPE.STRICT });
        const control = flicking.control;

        const err = await control.moveToPosition(500, 0).catch(e => e);
        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.POSITION_NOT_REACHABLE);
      });

      it("should not exceed movable index range", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT });
        const control = flicking.control;

        await control.moveToPosition(99999999, 0);

        expect(flicking.index).to.equal(1);

        const flicking2 = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: [MOVE_TYPE.STRICT, { count: 2 }] });
        const control2 = flicking2.control;

        await control2.moveToPosition(99999999, 0);

        expect(flicking2.index).to.equal(2);
      });

      it("should not exceed movable index range, when circular is true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, circular: true });
        const control = flicking.control;

        await control.moveToPosition(-99999999, 0);

        expect(flicking.index).to.equal(2);

        const flicking2 = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: [MOVE_TYPE.STRICT, { count: 2 }], circular: true });
        const control2 = flicking2.control;

        await control2.moveToPosition(-99999999, 0);

        expect(flicking2.index).to.equal(1);
      });

      it("should move to first anchor when going out of bound when bound=true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, bound: true });
        const control = flicking.control;
        const firstAnchor = flicking.camera.anchorPoints[0];

        await control.moveToPosition(-99999999, 0);

        expect(flicking.index).to.equal(firstAnchor.panel.index);
      });

      it("should move to last anchor when going out of bound when bound=true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, bound: true, defaultIndex: 2 });
        const control = flicking.control;
        const lastAnchor = flicking.camera.anchorPoints[flicking.camera.anchorPoints.length - 1];

        await control.moveToPosition(99999999, 0);

        expect(flicking.index).to.equal(lastAnchor.panel.index);
      });
    });
  });
});

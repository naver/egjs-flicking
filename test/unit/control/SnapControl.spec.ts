import FlickingError from "~/core/FlickingError";
import SnapControl from "~/control/SnapControl";
import * as ERROR from "~/const/error";
import { MOVE_TYPE } from "~/const/external";

import El from "../helper/El";
import { createFlicking, simulate, tick } from "../helper/test-util";

describe("SnapControl", () => {
  describe("Methods", () => {
    describe("moveToPosition", () => {
      it("should be rejected returning FlickingError with code NOT_ATTACHED_TO_FLICKING if control is not initialized", async () => {
        const control = new SnapControl();

        expect(() => control.moveToPosition(0, 0))
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should be rejected returning FlickingError with code POSITION_NOT_REACHABLE when there are no panels exist", async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()), { moveType: MOVE_TYPE.SNAP });
        const control = flicking.control;

        expect(control).to.be.an.instanceOf(SnapControl);

        try {
          await control.moveToPosition(500, 0);
          expect(true).to.be.false;
        } catch (err) {
          expect(err)
            .to.be.instanceOf(FlickingError)
            .with.property("code", ERROR.CODE.POSITION_NOT_REACHABLE);
        }
      });

      it("should return to current panel if position delta is smaller than threshold", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP,
          threshold: 40
        });
        const control = flicking.control;

        const promise = control.moveToPosition(control.activePanel.position + 39, 500);
        tick(1000);
        await promise;

        expect(control.activePanel).to.equal(flicking.getPanel(0));
      });

      it("should move to adjacent panel if position delta is bigger than threshold", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP,
          threshold: 40
        });
        const control = flicking.control;

        const promise = control.moveToPosition(control.activePanel.position + 40, 500);
        tick(1000);
        await promise;

        expect(control.activePanel).to.equal(flicking.getPanel(1));
      });

      it("should clamp to camera range even if it's further outside of camera range", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP
        });
        const control = flicking.control;

        const promise = control.moveToPosition(999999999999999, 500);
        tick(1000);
        await promise;

        expect(control.activePanel).to.equal(flicking.getPanel(2));
      });

      it("should not be rejected when user interrupted while animating with user input", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP
        });

        const control = flicking.control;
        const changedSpy = sinon.spy();
        const moveToSpy = sinon.spy(control, "moveToPosition");
        flicking.on("changed", changedSpy);

        await simulate(flicking.element, { deltaX: -300, duration: 100 }, 150);
        await simulate(flicking.element, { deltaX: -300, duration: 100 });

        const err = await (moveToSpy.firstCall.returnValue.catch(error => error));

        expect(err).to.be.undefined;
        expect(changedSpy.calledOnce).to.be.true;
      });

      it("should move to the below panel when dragged with no acceleration", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP
        });

        const control = flicking.control;

        // Drag with enough duration to prevent acceleration
        await simulate(flicking.element, { deltaX: -2000, duration: 9999 }, 15000);

        expect(control.activePanel.index).to.equal(flicking.getPanel(2).index);
      });

      it("should move to the below panel when dragged with no acceleration, when count is applied", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: [MOVE_TYPE.SNAP, { count: 1 }]
        });

        const control = flicking.control;

        // Drag with enough duration to prevent acceleration
        await simulate(flicking.element, { deltaX: -2000, duration: 9999 }, 15000);

        expect(control.activePanel.index).to.equal(flicking.getPanel(2).index);
      });

      it("should move to the correct adjacent panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP,
          threshold: 40
        });

        const control = flicking.control;

        // Drag with enough duration to prevent acceleration
        await simulate(flicking.element, { deltaX: -40, duration: 9999 }, 15000);

        expect(control.activePanel.index).to.equal(flicking.getPanel(1).index);
      });

      it("should move to the correct adjacent panel, when circular is applied", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP,
          circular: true,
          threshold: 40
        });

        const control = flicking.control;

        // Drag with enough duration to prevent acceleration
        await simulate(flicking.element, { deltaX: -40, duration: 9999 }, 15000);

        expect(control.activePanel.index).to.equal(flicking.getPanel(1).index);
      });

      it("should move to the correct adjacent panel, when circular is applied and moving from index 0 to last", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP,
          circular: true,
          threshold: 40
        });

        const control = flicking.control;

        // Drag with enough duration to prevent acceleration
        await simulate(flicking.element, { deltaX: 40, duration: 9999 }, 15000);

        expect(control.activePanel.index).to.equal(flicking.getPanel(2).index);
      });

      it("should move to the correct adjacent panel, when circular is applied and moving from last index to 0", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP,
          circular: true,
          defaultIndex: 2,
          threshold: 40
        });

        const control = flicking.control;

        // Drag with enough duration to prevent acceleration
        await simulate(flicking.element, { deltaX: -40, duration: 9999 }, 15000);

        expect(control.activePanel.index).to.equal(flicking.getPanel(0).index);
      });

      it("should move to the panel with index diff by the given count", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "300px").add(
            El.camera().add(
              El.panel("100%", "100%"),
              El.panel("100%", "100%"),
              El.panel("100%", "100%"),
              El.panel("100%", "100%"),
              El.panel("100%", "100%")
            )
          ),
          { moveType: [MOVE_TYPE.SNAP, { count: 1 }] }
        );

        // Start from the index 1
        void simulate(flicking.element, { deltaX: -1000, duration: 9999 });
        tick(9000);

        await simulate(flicking.element, { deltaX: -400, duration: 50 });

        expect(flicking.index).to.equal(2);
      });

      it("should move to the panel with index diff by the given count, in circular case", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "300px").add(
            El.camera().add(
              El.panel("100%", "100%"),
              El.panel("100%", "100%"),
              El.panel("100%", "100%"),
              El.panel("100%", "100%"),
              El.panel("100%", "100%")
            )
          ),
          { moveType: [MOVE_TYPE.SNAP, { count: 1 }], circular: true }
        );

        // Start from the index 0
        await simulate(flicking.element, { deltaX: 400, duration: 50 });

        expect(flicking.index).to.equal(4);
      });

      it("should restore to the current panel with the nearest position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP,
          circular: true,
          align: "prev"
        });

        const control = flicking.control;
        const controller = control.controller;
        const animateSpy = sinon.spy(controller, "animateTo");

        // Drag with enough duration to prevent acceleration
        await simulate(flicking.element, { deltaX: 20, duration: 10000 }, 15000);

        const position = animateSpy.firstCall.args[0];

        expect(position).to.be.greaterThan(0);
        expect(position).to.equal(flicking.panels[0].position + flicking.camera.rangeDiff);
      });

      it("should move to the adjacent panel with the nearest position, from first to last panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP,
          circular: true,
          align: "prev"
        });

        const control = flicking.control;
        const controller = control.controller;
        const animateSpy = sinon.spy(controller, "animateTo");

        // Drag with enough duration to prevent acceleration
        await simulate(flicking.element, { deltaX: 60, duration: 10000 }, 15000);

        const position = animateSpy.firstCall.args[0];

        expect(position).to.be.greaterThan(0);
        expect(position).to.equal(flicking.panels[flicking.panelCount - 1].position);
      });

      it("should move to the adjacent panel with the nearest position, from last to first panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP,
          defaultIndex: 2,
          circular: true,
          align: "next"
        });

        const control = flicking.control;
        const controller = control.controller;
        const animateSpy = sinon.spy(controller, "animateTo");

        // Drag with enough duration to prevent acceleration
        await simulate(flicking.element, { deltaX: -60, duration: 10000 }, 15000);

        const position = animateSpy.firstCall.args[0];

        expect(position).to.be.lessThan(flicking.panels[flicking.panelCount - 1].position);
        expect(position).to.equal(flicking.panels[0].position);
      });

      it("Should move to the nearest panel from the camera, when animation is interrupted by user input", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.SNAP,
          align: "prev",
        });

        const control = flicking.control;
        const camera = flicking.camera;
        const moveSpy = sinon.spy(control, "moveToPanel");

        // Suppress animation interrupt error
        const promise = flicking.moveTo(2, 1500).catch(error => error);
        tick(500);
        const position = camera.position;
        // Simulate interrupt
        await simulate(flicking.element, { deltaX: 0, duration: 100 }, 1000);
        tick(1000);
        await promise;

        expect(moveSpy.calledTwice).to.be.true;
        expect(control.activePanel.index).to.equal(camera.findNearestAnchor(position).panel.index);
      });
    });
  });
});

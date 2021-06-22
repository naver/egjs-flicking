import FlickingError from "~/core/FlickingError";
import FreeControl from "~/control/FreeControl";
import * as ERROR from "~/const/error";
import { EVENTS, MOVE_TYPE } from "~/const/external";

import El from "../helper/El";
import { createFlicking, simulate, tick } from "../helper/test-util";

describe("FreeControl", () => {
  describe("Methods", () => {
    describe("moveToPosition", () => {
      it("should be rejected returning FlickingError with code NOT_ATTACHED_TO_FLICKING if control is not initialized", async () => {
        const control = new FreeControl();

        const err = await control.moveToPosition(0, 0).catch(e => e);
        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should be rejected returning FlickingError with code POSITION_NOT_REACHABLE when there are no panels exist", async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()), { moveType: MOVE_TYPE.FREE_SCROLL });
        const control = flicking.control;

        expect(control).to.be.an.instanceOf(FreeControl);

        try {
          await control.moveToPosition(500, 0);
          expect(true).to.be.false;
        } catch (err) {
          expect(err)
            .to.be.instanceOf(FlickingError)
            .with.property("code", ERROR.CODE.POSITION_NOT_REACHABLE);
        }
      });

      it(`should not trigger either ${EVENTS.WILL_CHANGE} or ${EVENTS.WILL_RESTORE} if active panel is not changed`, async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.FREE_SCROLL,
          threshold: 100
        });
        const control = flicking.control;
        const prevActivePanel = control.activePanel;

        const changeSpy = sinon.spy();
        const restoreSpy = sinon.spy();

        flicking.on({
          [EVENTS.WILL_CHANGE]: changeSpy,
          [EVENTS.WILL_RESTORE]: restoreSpy
        });

        const promise = control.moveToPosition(control.activePanel.position + 1, 500);
        tick(1000);
        await promise;

        expect(control).to.be.an.instanceOf(FreeControl);
        expect(control.activePanel).to.equal(prevActivePanel);
        expect(changeSpy.called).to.be.false;
        expect(restoreSpy.called).to.be.false;
      });

      it("should set target panel by clamping position to camera range even if it's further outside of camera range", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.FREE_SCROLL
        });
        const control = flicking.control;

        const promise = control.moveToPosition(999999999999999, 500);
        tick(1000);
        await promise;

        expect(control.activePanel).to.equal(flicking.getPanel(2));
      });

      it("anyway moves to the given position even if it's further outside of camera range if stopAtEdge is false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: [MOVE_TYPE.FREE_SCROLL, { stopAtEdge: false }]
        });
        const control = flicking.control;
        const animateSpy = sinon.spy(control.controller, "animateTo");

        void control.moveToPosition(999999999999999, 500);

        expect(animateSpy.calledWith(999999999999999, 500)).to.be.true;
      });

      it("should not be rejected when user interrupted while animating with user input", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.FREE_SCROLL
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
    });
  });
});

import { vi } from "vitest";
import { MOVE_TYPE } from "~/constants/values";
import FreeControl from "~/control/FreeControl";
import * as ERROR from "~/error/codes";
import FlickingError from "~/error/FlickingError";
import { EVENTS } from "~/event";

import El from "../helper/El";
import { createFlicking, simulate, tick } from "../helper/test-util";

describe("FreeControl", () => {
  describe("Methods", () => {
    describe("moveToPosition", () => {
      it("should be rejected returning FlickingError with code NOT_ATTACHED_TO_FLICKING if control is not initialized", async () => {
        const control = new FreeControl();

        const err = (() => {
          try {
            control.moveToPosition(0, 0);
          } catch (e) {
            return e;
          }
        })();
        expect(err).toBeInstanceOf(FlickingError);
        expect((err as FlickingError).code).toBe(ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should be rejected returning FlickingError with code POSITION_NOT_REACHABLE when there are no panels exist", async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()), { moveType: MOVE_TYPE.FREE_SCROLL });
        const control = flicking.control;

        expect(control).toBeInstanceOf(FreeControl);

        try {
          await control.moveToPosition(500, 0);
          expect(true).toBe(false);
        } catch (err) {
          expect(err).toBeInstanceOf(FlickingError);
          expect((err as FlickingError).code).toBe(ERROR.CODE.POSITION_NOT_REACHABLE);
        }
      });

      it(`should not trigger either ${EVENTS.WILL_CHANGE} or ${EVENTS.WILL_RESTORE} if active panel is not changed`, async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.FREE_SCROLL,
          threshold: 100
        });
        const control = flicking.control;
        const prevActivePanel = control.activePanel;

        const changeSpy = vi.fn();
        const restoreSpy = vi.fn();

        flicking.on({
          [EVENTS.WILL_CHANGE]: changeSpy,
          [EVENTS.WILL_RESTORE]: restoreSpy
        });

        const promise = control.moveToPosition(control.activePanel.position + 1, 500);
        tick(1000);
        await promise;

        expect(control).toBeInstanceOf(FreeControl);
        expect(control.activePanel).toBe(prevActivePanel);
        expect(changeSpy).not.toHaveBeenCalled();
        expect(restoreSpy).not.toHaveBeenCalled();
      });

      it("should set target panel by clamping position to camera range even if it's further outside of camera range", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.FREE_SCROLL
        });
        const control = flicking.control;

        const promise = control.moveToPosition(999999999999999, 500);
        tick(1000);
        await promise;

        expect(control.activePanel).toBe(flicking.getPanel(2));
      });

      it("anyway moves to the given position even if it's further outside of camera range if stopAtEdge is false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: [MOVE_TYPE.FREE_SCROLL, { stopAtEdge: false }]
        });
        const control = flicking.control;
        const animateSpy = vi.spyOn(control.controller, "animateTo");

        void control.moveToPosition(999999999999999, 500);

        expect(animateSpy.mock.calls[0][0]).toBe(999999999999999);
        expect(animateSpy.mock.calls[0][1]).toBe(500);
      });

      it("should not be rejected when user interrupted while animating with user input", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.FREE_SCROLL
        });

        const control = flicking.control;
        const changedSpy = vi.fn();
        const moveToSpy = vi.spyOn(control, "moveToPosition");
        flicking.on("changed", changedSpy);

        await simulate(flicking.element, { deltaX: -300, duration: 100 }, 150);
        await simulate(flicking.element, { deltaX: -300, duration: 100 });

        const err = await (moveToSpy.mock.results[0].value as Promise<any>).catch(error => error);

        expect(err).toBeUndefined();
        expect(changedSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});

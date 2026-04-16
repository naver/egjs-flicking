import { vi } from "vitest";
import { MOVE_TYPE } from "~/constants/values";
import StrictControl from "~/control/StrictControl";
import * as ERROR from "~/error/codes";
import FlickingError from "~/error/FlickingError";

import El from "../helper/El";
import { createFlicking, simulate, tick } from "../helper/test-util";

describe("StrictControl", () => {
  describe("Methods", () => {
    describe("updateInput", () => {
      it("should set controller range to prev panel's position to next panel's position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, defaultIndex: 1 });
        const prevPanel = flicking.panels[0];
        const nextPanel = flicking.panels[2];
        const controller = flicking.control.controller;

        flicking.control.updateInput();

        expect(controller.range[0]).toBe(prevPanel.position);
        expect(controller.range[1]).toBe(nextPanel.position);
      });

      it("should set control range to current panel's position to next panel's position if current panel is the first panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, defaultIndex: 0 });
        const currentPanel = flicking.panels[0];
        const nextPanel = flicking.panels[1];
        const controller = flicking.control.controller;

        flicking.control.updateInput();

        expect(controller.range[0]).toBe(currentPanel.position);
        expect(controller.range[1]).toBe(nextPanel.position);
      });

      it("should set control range to prev panel's position to current panel's position if current panel is the last panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, defaultIndex: 2 });
        const prevPanel = flicking.panels[1];
        const currentPanel = flicking.panels[2];
        const controller = flicking.control.controller;

        flicking.control.updateInput();

        expect(controller.range[0]).toBe(prevPanel.position);
        expect(controller.range[1]).toBe(currentPanel.position);
      });

      it("should set control range to current - n panel's position to current + n panel's position", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "100%").add(
            El.camera().add(
              // Total 9 panels
              El.panel()
                .setWidth("100%")
                .setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300)
            )
          ),
          { moveType: [MOVE_TYPE.STRICT, { count: 2 }] }
        );
        const panels = flicking.panels;
        const controller = flicking.control.controller;

        await flicking.moveTo(2, 0);

        expect(controller.range[0]).toBe(panels[0].position);
        expect(controller.range[1]).toBe(panels[4].position);

        await flicking.moveTo(4, 0);

        expect(controller.range[0]).toBe(panels[2].position);
        expect(controller.range[1]).toBe(panels[6].position);

        await flicking.moveTo(6, 0);

        expect(controller.range[0]).toBe(panels[4].position);
        expect(controller.range[1]).toBe(panels[8].position);
      });

      it("should set control range to current - n panel's position to current + n panel's position (edge case)", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "100%").add(
            El.camera().add(
              // Total 9 panels
              El.panel()
                .setWidth("100%")
                .setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300),
              El.panel().setWidth("100%").setHeight(300)
            )
          ),
          { moveType: [MOVE_TYPE.STRICT, { count: 2 }] }
        );
        const panels = flicking.panels;
        const controller = flicking.control.controller;

        await flicking.moveTo(0, 0);

        expect(controller.range[0]).toBe(panels[0].position);
        expect(controller.range[1]).toBe(panels[2].position);

        await flicking.moveTo(1, 0);

        expect(controller.range[0]).toBe(panels[0].position);
        expect(controller.range[1]).toBe(panels[3].position);

        await flicking.moveTo(8, 0);

        expect(controller.range[0]).toBe(panels[6].position);
        expect(controller.range[1]).toBe(panels[8].position);

        await flicking.moveTo(7, 0);

        expect(controller.range[0]).toBe(panels[5].position);
        expect(controller.range[1]).toBe(panels[8].position);
      });

      it("should clamp controller range to camera range if bound=true", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "100%").add(
            El.camera().add(
              El.panel().setWidth("50%").setHeight(300),
              El.panel().setWidth("50%").setHeight(300),
              El.panel().setWidth("50%").setHeight(300)
            )
          ),
          { moveType: MOVE_TYPE.STRICT, bound: true, defaultIndex: 1 }
        );
        const camera = flicking.camera;
        const control = flicking.control;
        const controller = control.controller;
        const prevPanel = flicking.panels[0];
        const nextPanel = flicking.panels[2];

        control.updateInput();

        expect(controller.range[0]).not.toBe(prevPanel.position);
        expect(controller.range[0]).toBe(camera.range.min);
        expect(controller.range[1]).not.toBe(nextPanel.position);
        expect(controller.range[1]).toBe(camera.range.max);
      });

      it("should always set Axes's circular to false even if circular mode is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, circular: true });
        const controller = flicking.control.controller;

        expect(flicking.circularEnabled).toBe(true);
        expect(controller.controlParams.circular).toBe(false);
      });

      it("should extend controller range larger than camera range when circular=true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, circular: true });
        const panels = flicking.panels;
        const controller = flicking.control.controller;
        const cameraRangeDiff = flicking.camera.rangeDiff;

        expect(flicking.circularEnabled).toBe(true);

        await flicking.moveTo(0, 0);

        expect(controller.range[0]).toBe(panels[2].position - cameraRangeDiff);
        expect(controller.range[1]).toBe(panels[1].position);

        await flicking.moveTo(2, 0);

        expect(controller.range[0]).toBe(panels[1].position);
        expect(controller.range[1]).toBe(panels[0].position + cameraRangeDiff);
      });

      it("should update based on nearest panel when updated during animation", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT });
        const panels = flicking.panels;
        const camera = flicking.camera;
        const control = flicking.control;
        const controller = control.controller;

        // This should reach panel 1
        void simulate(flicking.element, { deltaX: -99999, duration: 1000 }, 800);

        expect(flicking.animating).toBe(true);
        expect(camera.findNearestAnchor(camera.position).panel.index).toBe(1);

        control.updateInput();

        expect(controller.range[0]).toBe(panels[0].position);
        expect(controller.range[1]).toBe(panels[2].position);
      });
    });

    describe("moveToPosition", () => {
      it("should be rejected returning FlickingError with code NOT_ATTACHED_TO_FLICKING if control is not initialized", async () => {
        const control = new StrictControl();

        expect(() => control.moveToPosition(0, 0)).toThrow(FlickingError);
      });

      it("should be rejected returning FlickingError with code POSITION_NOT_REACHABLE when there are no panels exist", async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()), { moveType: MOVE_TYPE.STRICT });
        const control = flicking.control;

        const err = await control.moveToPosition(500, 0).catch(e => e);
        expect(err).toBeInstanceOf(FlickingError);
        expect(err).toHaveProperty("code", ERROR.CODE.POSITION_NOT_REACHABLE);
      });

      it("should not exceed movable index range", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT });
        const control = flicking.control;

        await control.moveToPosition(99999999, 0);

        expect(flicking.index).toBe(1);

        const flicking2 = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: [MOVE_TYPE.STRICT, { count: 2 }] });
        const control2 = flicking2.control;

        await control2.moveToPosition(99999999, 0);

        expect(flicking2.index).toBe(2);
      });

      it("should not exceed movable index range, when circular is true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, circular: true });
        const control = flicking.control;

        await control.moveToPosition(-99999999, 0);

        expect(flicking.index).toBe(2);

        const flicking2 = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: [MOVE_TYPE.STRICT, { count: 2 }],
          circular: true
        });
        const control2 = flicking2.control;

        await control2.moveToPosition(-99999999, 0);

        expect(flicking2.index).toBe(1);
      });

      it("should move to first anchor when going out of bound when bound=true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT, bound: true });
        const control = flicking.control;
        const firstAnchor = flicking.camera.anchorPoints[0];

        await control.moveToPosition(-99999999, 0);

        expect(flicking.index).toBe(firstAnchor.panel.index);
      });

      it("should move to last anchor when going out of bound when bound=true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.STRICT,
          bound: true,
          defaultIndex: 2
        });
        const control = flicking.control;
        const lastAnchor = flicking.camera.anchorPoints[flicking.camera.anchorPoints.length - 1];

        await control.moveToPosition(99999999, 0);

        expect(flicking.index).toBe(lastAnchor.panel.index);
      });

      it("Should move to the nearest panel from the camera, when animation is interrupted by user input", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.STRICT,
          animationThreshold: 0
        });

        const control = flicking.control;
        const camera = flicking.camera;
        const moveSpy = vi.spyOn(control, "moveToPanel");

        // Suppress animation interrupt error
        const promise = flicking.moveTo(1, 1500).catch(error => error);
        tick(100);
        const position = camera.position;
        // Simulate interrupt
        await simulate(flicking.element, { deltaX: 0, duration: 100 }, 1000);
        tick(1000);
        await promise;

        expect(moveSpy).toHaveBeenCalledTimes(2);
        expect(control.activePanel.index).toBe(camera.findNearestAnchor(position).panel.index);
      });

      it("should determine the next panel based on the target panel of the willChange event", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          moveType: MOVE_TYPE.STRICT,
          circular: true,
          duration: 5000,
          threshold: 0
        });

        await simulate(flicking.element, { deltaX: 900, duration: 100 }, 1000);
        tick(500);
        await simulate(flicking.element, { deltaX: 900, duration: 100 }, 1000);
        tick(500);
        await simulate(flicking.element, { deltaX: 900, duration: 100 }, 1000);
        tick(5000);

        expect(flicking.index).toBe(0);
      });
    });
  });
});

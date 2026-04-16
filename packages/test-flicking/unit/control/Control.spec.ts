import { OnRelease } from "@egjs/axes";
import { vi } from "vitest";
import { DIRECTION } from "~/constants/values";
import AxesController from "~/control/AxesController";
import Control from "~/control/Control";
import Panel from "~/core/panel/Panel";
import * as ERROR from "~/error/codes";
import FlickingError from "~/error/FlickingError";
import { EVENTS } from "~/event";
import { ValueOf } from "~/types/internal";
import El from "../helper/El";
import { createFlicking, createPanel, simulate, tick } from "../helper/test-util";

class ControlImpl extends Control {
  public moveToPosition(position: number, duration: number, axesEvent?: OnRelease): Promise<void> {
    return Promise.resolve();
  }

  public moveToPanel(
    panel: Panel,
    {
      duration,
      direction = DIRECTION.NONE,
      axesEvent
    }: {
      duration: number;
      direction?: ValueOf<typeof DIRECTION>;
      axesEvent?: OnRelease;
    }
  ) {
    const promise = super.moveToPanel(panel, { duration, direction, axesEvent });

    tick(10000);

    return promise;
  }

  public async moveToPanelWithInterruption(panel: Panel, duration: number, axesEvent?: OnRelease): Promise<void> {
    const promise = super.moveToPanel(panel, { duration, axesEvent });

    tick(duration / 2);
    await simulate((panel as any)._flicking.element);

    return promise;
  }
}

describe("Control", () => {
  describe("properties", () => {
    it("should have controller as AxesController", () => {
      expect(new ControlImpl().controller).toBeInstanceOf(AxesController);
    });

    it("should have activeIndex as -1", () => {
      expect(new ControlImpl().activeIndex).toBe(-1);
    });

    it("should have activePanel as null", () => {
      expect(new ControlImpl().activePanel).toBe(null);
    });

    it("is not animating by default", () => {
      expect(new ControlImpl().animating).toBe(false);
    });

    it("is not holding by default", () => {
      expect(new ControlImpl().holding).toBe(false);
    });
  });

  describe("Methods", () => {
    describe("init", () => {
      it("should also call init of the controller", async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const initSpy = vi.spyOn(control.controller, "init");

        control.init(flicking);

        expect(initSpy).toHaveBeenCalledTimes(1);
        expect(initSpy).toHaveBeenCalledWith(flicking);
      });
    });

    describe("enable", () => {
      it("should call enable of the controller", () => {
        const control = new ControlImpl();
        control.disable();

        const enableSpy = vi.spyOn(control.controller, "enable");
        control.enable();

        expect(enableSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("disable", () => {
      it("should call disable of the controller", () => {
        const control = new ControlImpl();
        const disableSpy = vi.fn();

        control.controller.disable = disableSpy;
        control.disable();

        expect(disableSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("release", () => {
      it("should call release of the controller", () => {
        const control = new ControlImpl();
        const releaseSpy = vi.fn();

        control.controller.release = releaseSpy;
        control.release();

        expect(releaseSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("updateInput", () => {
      it("should call update of the controller", async () => {
        const control = new ControlImpl();
        const updateSpy = vi.spyOn(control.controller, "update");

        control.init(await createFlicking(El.DEFAULT_HORIZONTAL));
        control.updateInput();

        expect(updateSpy).toHaveBeenCalledTimes(1);
      });

      it("should be throw FlickingError with code NOT_ATTACHED_TO_FLICKING if control is not initialized", () => {
        const control = new ControlImpl();

        expect(() => control.updateInput()).toThrow(FlickingError);
      });
    });

    describe("moveToPanel", () => {
      it("should be rejected returning FlickingError with code NOT_ATTACHED_TO_FLICKING if control is not initialized", async () => {
        const control = new ControlImpl();

        const err = await control.moveToPanel(await createPanel(El.panel()), { duration: 500 }).catch(e => e);

        expect(err).toBeInstanceOf(FlickingError);
        expect(err).toHaveProperty("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should change activePanel to given panel after resolved", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const control = flicking.control;
        const panel = flicking.getPanel(2);
        const activePanelBefore = control.activePanel;

        void control.moveToPanel(panel, { duration: 500 });
        tick(1500);
        const activePanelAfter = control.activePanel;

        expect(activePanelBefore).toBe(flicking.getPanel(0));
        expect(activePanelAfter).toBe(panel);
      });

      it("should change activePanel to given panel after resolved when duration is 0", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const control = flicking.control;
        const panel = flicking.getPanel(2);
        const activePanelBefore = control.activePanel;

        void control.moveToPanel(panel, { duration: 0 });
        const activePanelAfter = control.activePanel;

        expect(activePanelBefore).toBe(flicking.getPanel(0));
        expect(activePanelAfter).toBe(panel);
      });

      it("should change activePanel to given panel after resolved when duration is 0 and moving to the same position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const control = flicking.control;

        control.setActive(flicking.panels[2], flicking.panels[0], false);
        const activePanelBefore = control.activePanel;
        void control.moveToPanel(flicking.panels[0], { duration: 0 });
        const activePanelAfter = control.activePanel;

        expect(activePanelBefore).toBe(flicking.getPanel(2));
        expect(activePanelAfter).toBe(flicking.getPanel(0));
      });

      it(`should trigger ${EVENTS.WILL_CHANGE} if active panel was null`, async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const changeSpy = vi.fn();
        const restoreSpy = vi.fn();
        flicking.on(EVENTS.WILL_CHANGE, changeSpy);
        flicking.on(EVENTS.WILL_RESTORE, restoreSpy);

        control.init(flicking);
        control.updateInput();

        await control.moveToPanel(flicking.getPanel(2), { duration: 500 });

        expect(changeSpy).toHaveBeenCalledTimes(1);
        expect(restoreSpy).not.toHaveBeenCalled();
      });

      it(`should trigger ${EVENTS.WILL_CHANGE} if given panel is not same to active panel`, async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        control.init(flicking);
        control.updateInput();
        await control.moveToPanel(flicking.getPanel(1), { duration: 0 });

        const changeSpy = vi.fn();
        const restoreSpy = vi.fn();
        flicking.on(EVENTS.WILL_CHANGE, changeSpy);
        flicking.on(EVENTS.WILL_RESTORE, restoreSpy);

        await control.moveToPanel(flicking.getPanel(2), { duration: 500 });

        expect(changeSpy).toHaveBeenCalledTimes(1);
        expect(restoreSpy).not.toHaveBeenCalled();
      });

      it(`should trigger ${EVENTS.WILL_RESTORE} if give panel is same to active panel`, async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });
        const control = flicking.control;
        const changeSpy = vi.fn();
        const restoreSpy = vi.fn();

        flicking.on(EVENTS.WILL_CHANGE, changeSpy);
        flicking.on(EVENTS.WILL_RESTORE, restoreSpy);
        await control.moveToPanel(flicking.getPanel(1), { duration: 500 });

        expect(changeSpy).not.toHaveBeenCalled();
        expect(restoreSpy).toHaveBeenCalledTimes(1);
      });

      it(`should be rejected with FlickingError with STOP_CALLED_BY_USER as code when stop() is called from ${EVENTS.WILL_CHANGE} event`, async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        flicking.on(EVENTS.WILL_CHANGE, e => e.stop());

        control.init(flicking);
        control.updateInput();

        const err = await control.moveToPanel(flicking.getPanel(1), { duration: 500 }).catch(e => e);

        expect(err).toBeInstanceOf(FlickingError);
        expect(err).toHaveProperty("code", ERROR.CODE.STOP_CALLED_BY_USER);
      });

      it(`should be rejected with FlickingError with STOP_CALLED_BY_USER as code when stop() is called from ${EVENTS.WILL_RESTORE} event`, async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });
        const control = flicking.control;

        flicking.on(EVENTS.WILL_RESTORE, e => e.stop());

        const err = await control.moveToPanel(flicking.getPanel(1), { duration: 500 }).catch(e => e);

        expect(err).toBeInstanceOf(FlickingError);
        expect(err).toHaveProperty("code", ERROR.CODE.STOP_CALLED_BY_USER);
      });

      it("should be rejected when user interrupted while animating", async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        control.init(flicking);
        control.updateInput();

        const err = await control.moveToPanelWithInterruption(flicking.getPanel(2), 1000).catch(e => e);

        expect(err).toBeInstanceOf(FlickingError);
        expect(err).toHaveProperty("code", ERROR.CODE.ANIMATION_INTERRUPTED);
      });
    });
  });
});

import Axes from "@egjs/axes";
import { vi } from "vitest";
import * as AXES from "~/constants/internal";
import AxesController from "~/control/AxesController";
import IdleState from "~/control/states/IdleState";
import * as ERROR from "~/error/codes";
import FlickingError from "~/error/FlickingError";

import El from "../helper/El";
import { createFlicking, tick } from "../helper/test-util";

describe("AxesController", () => {
  describe("Properties", () => {
    it("is not enabled by default", () => {
      expect(new AxesController().enabled).toBe(false);
    });

    it("has IdleState as a default state", () => {
      expect(new AxesController().state).toBeInstanceOf(IdleState);
    });

    it("has axes as null by default", () => {
      expect(new AxesController().axes).toBeNull();
    });

    it("has {start: 0, end: 0} as a default animating context", () => {
      expect(new AxesController().animatingContext).toEqual({ start: 0, end: 0, offset: 0 });
    });

    it("has 0 as a default position", () => {
      expect(new AxesController().position).toBe(0);
    });
  });

  describe("Methods", () => {
    describe("init", () => {
      it("should create axes instance on initialization", async () => {
        const controller = new AxesController();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        controller.init(flicking);

        expect(controller.axes).not.toBeNull();
        expect(controller.axes).toBeInstanceOf(Axes);
      });
    });

    describe("destroy", () => {
      it("should also destroy axes instance", async () => {
        const controller = new AxesController();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        controller.init(flicking);

        const destroySpy = vi.spyOn(controller.axes, "destroy");
        controller.destroy();

        expect(destroySpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("update", () => {
      it("should throw a FlickingError with code NOT_ATTACHED_TO_FLICKING when it's not initialized yet", async () => {
        const camera = new AxesController();

        const err = await camera.animateTo(1000, 1000).catch(e => e);

        expect(err).toBeInstanceOf(FlickingError);
        expect(err).toHaveProperty("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should update position to a camera's position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const controller = flicking.control.controller;
        const prevPos = controller.position;

        flicking.camera.lookAt(1500);
        controller.update(flicking.camera.controlParams);

        expect(controller.position).toBe(1500);
        expect(controller.position).not.toBe(prevPos);
      });
    });

    describe("animateTo", () => {
      it("should throw a FlickingError with code NOT_ATTACHED_TO_FLICKING when it's not initialized yet", async () => {
        const camera = new AxesController();

        const err = await camera.animateTo(1000, 1000).catch(e => e);

        expect(err).toBeInstanceOf(FlickingError);
        expect(err).toHaveProperty("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should call `setTo` of the axes instance", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const controller = flicking.control.controller;
        const setToSpy = vi.spyOn(controller.axes, "setTo");

        void controller.animateTo(1000, 1000);
        tick(2000);

        expect(setToSpy).toHaveBeenCalledTimes(1);
        expect(setToSpy).toHaveBeenCalledWith(expect.objectContaining({ [AXES.POSITION_KEY]: 1000 }), 1000);
      });

      it("should call `setTo` of the axes onRelease event if given", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const controller = flicking.control.controller;
        const onReleaseMock = { setTo: vi.fn() };

        void controller.animateTo(1000, 1000, onReleaseMock as any);
        tick(2000);

        expect(onReleaseMock.setTo).toHaveBeenCalledTimes(1);
        expect(onReleaseMock.setTo).toHaveBeenCalledWith(expect.objectContaining({ [AXES.POSITION_KEY]: 1000 }), 1000);
      });

      it("should be resolved immediately if duration is 0", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const controller = flicking.control.controller;

        await controller.animateTo(1000, 0);
        // No tick() is involved, so passing this test means that promise is resolved immediately
        expect(controller.position).toBe(1000);
      });

      it("should be resolved immediately if given position is same to current position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const controller = flicking.control.controller;

        const prevPos = controller.position;

        // No tick() is involved, so passing this test means that promise is resolved immediately
        await controller.animateTo(prevPos, 0);

        expect(controller.position).toBe(prevPos);
      });
    });
  });
});

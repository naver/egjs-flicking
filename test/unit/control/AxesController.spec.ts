import Axes from "@egjs/axes";
import AxesController from "~/control/AxesController";
import IdleState from "~/control/states/IdleState";
import FlickingError from "~/core/FlickingError";
import * as AXES from "~/const/axes";
import * as ERROR from "~/const/error";

import El from "../helper/El";
import { createFlicking, tick } from "../helper/test-util";

describe("AxesController", () => {
  describe("Properties", () => {
    it("is not enabled by default", () => {
      expect(new AxesController().enabled).to.be.false;
    });

    it("has IdleState as a default state", () => {
      expect(new AxesController().state).to.be.an.instanceOf(IdleState);
    });

    it("has axes as null by default", () => {
      expect(new AxesController().axes).to.be.null;
    });

    it("has {start: 0, end: 0} as a default animating context", () => {
      expect(new AxesController().animatingContext).to.deep.equal({ start: 0, end: 0, offset: 0 });
    });

    it("has 0 as a default position", () => {
      expect(new AxesController().position).to.equal(0);
    });
  });

  describe("Methods", () => {
    describe("init", () => {
      it("should create axes instance on initialization", async () => {
        const controller = new AxesController();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        controller.init(flicking);

        expect(controller.axes).not.to.be.null;
        expect(controller.axes).to.be.an.instanceOf(Axes);
      });
    });

    describe("destroy", () => {
      it("should also destroy axes instance", async () => {
        const controller = new AxesController();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        controller.init(flicking);

        const destroySpy = sinon.spy(controller.axes, "destroy");
        controller.destroy();

        expect(destroySpy.calledOnce).to.be.true;
      });
    });

    describe("update", () => {
      it("should throw a FlickingError with code NOT_ATTACHED_TO_FLICKING when it's not initialized yet", async () => {
        const camera = new AxesController();

        const err = await camera.animateTo(1000, 1000).catch(e => e);

        expect(err)
          .to.be.an.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should update position to a camera's position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const controller = flicking.control.controller;
        const prevPos = controller.position;

        flicking.camera.lookAt(1500);
        controller.update(flicking.camera.controlParams);

        expect(controller.position).to.equal(1500);
        expect(controller.position).not.to.equal(prevPos);
      });
    });

    describe("animateTo", () => {
      it("should throw a FlickingError with code NOT_ATTACHED_TO_FLICKING when it's not initialized yet", async () => {
        const camera = new AxesController();

        const err = await camera.animateTo(1000, 1000).catch(e => e);

        expect(err)
          .to.be.an.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should call `setTo` of the axes instance", async () => {
        const controller = new AxesController();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        controller.init(flicking);
        const setToSpy = sinon.spy(controller.axes, "setTo");

        void controller.animateTo(1000, 1000);
        tick(2000);

        expect(setToSpy.calledOnce).to.be.true;
        expect(setToSpy.calledWithMatch({ [AXES.POSITION_KEY]: 1000 }, 1000));
      });

      it("should call `setTo` of the axes onRelease event if given", async () => {
        const controller = new AxesController();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        controller.init(flicking);
        const onReleaseMock = { setTo: sinon.spy() };

        void controller.animateTo(1000, 1000, onReleaseMock as any);
        tick(2000);

        expect(onReleaseMock.setTo.calledOnce).to.be.true;
        expect(onReleaseMock.setTo.calledWithMatch({ [AXES.POSITION_KEY]: 1000 }, 1000));
      });

      it("should be resolved immediately if duration is 0", async () => {
        const controller = new AxesController();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        controller.init(flicking);

        flicking.once("ready", async () => {
          await controller.animateTo(1000, 0);
          // No tick() is involved, so passing this test means that promise is resolved immediately
          expect(controller.position).to.equal(1000);
        });
      });

      it("should be resolved immediately if given position is same to current position", async () => {
        const controller = new AxesController();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        controller.init(flicking);

        const prevPos = controller.position;

        // No tick() is involved, so passing this test means that promise is resolved immediately
        await controller.animateTo(prevPos, 0);

        expect(controller.position).to.equal(prevPos);
      });
    });
  });
});

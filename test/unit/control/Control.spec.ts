import { OnRelease } from "@egjs/axes";

import FlickingError from "~/core/FlickingError";
import Control from "~/control/Control";
import AxesController from "~/control/AxesController";
import { DIRECTION, EVENTS } from "~/const/external";
import * as ERROR from "~/const/error";

import { createFlicking, createPanel, simulate, tick } from "../helper/test-util";
import El from "../helper/El";
import Panel from "~/core/panel/Panel";
import { ValueOf } from "~/type/internal";

class ControlImpl extends Control {
  public moveToPosition(position: number, duration: number, axesEvent?: OnRelease): Promise<void> {
    return Promise.resolve();
  }

  public moveToPanel(panel: Panel, {
    duration,
    direction = DIRECTION.NONE,
    axesEvent
  }: {
    duration: number;
    direction?: ValueOf<typeof DIRECTION>;
    axesEvent?: OnRelease;
  }) {
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
      expect(new ControlImpl().controller).to.be.an.instanceOf(AxesController);
    });

    it("should have activeIndex as -1", () => {
      expect(new ControlImpl().activeIndex).to.equal(-1);
    });

    it("should have activePanel as null", () => {
      expect(new ControlImpl().activePanel).to.equal(null);
    });

    it("is not animating by default", () => {
      expect(new ControlImpl().animating).to.be.false;
    });

    it("is not holding by default", () => {
      expect(new ControlImpl().holding).to.be.false;
    });
  });

  describe("Methods", () => {
    describe("init", () => {
      it("should also call init of the controller", async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const initSpy = sinon.spy(control.controller, "init");

        control.init(flicking);

        expect(initSpy.calledOnceWith(flicking)).to.be.true;
      });
    });

    describe("enable", () => {
      it("should call enable of the controller", () => {
        const control = new ControlImpl();
        control.disable();

        const enableSpy = sinon.spy(control.controller, "enable");
        control.enable();

        expect(enableSpy.calledOnce).to.be.true;
      });
    });

    describe("disable", () => {
      it("should call disable of the controller", () => {
        const control = new ControlImpl();
        const disableSpy = sinon.spy();

        control.controller.disable = disableSpy;
        control.disable();

        expect(disableSpy.calledOnce).to.be.true;
      });
    });

    describe("updateInput", () => {
      it("should call update of the controller", async () => {
        const control = new ControlImpl();
        const updateSpy = sinon.spy(control.controller, "update");

        control.init(await createFlicking(El.DEFAULT_HORIZONTAL));
        control.updateInput();

        expect(updateSpy.calledOnce).to.be.true;
      });

      it("should be throw FlickingError with code NOT_ATTACHED_TO_FLICKING if control is not initialized", () => {
        const control = new ControlImpl();

        expect(() => control.updateInput())
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });
    });

    describe("moveToPanel", () => {
      it("should be rejected returning FlickingError with code NOT_ATTACHED_TO_FLICKING if control is not initialized", async () => {
        const control = new ControlImpl();

        const err = await control.moveToPanel(await createPanel(El.panel()), { duration: 500 }).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should change activePanel to given panel after resolved if active panel was null", async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(2);

        control.init(flicking);
        control.updateInput();

        const activePanelBefore = control.activePanel;
        await control.moveToPanel(panel, { duration: 500 });
        const activePanelAfter = control.activePanel;

        expect(activePanelBefore).to.be.null;
        expect(activePanelAfter).to.equal(panel);
      });

      it(`should trigger ${EVENTS.WILL_CHANGE} if active panel was null`, async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const changeSpy = sinon.spy();
        const restoreSpy = sinon.spy();
        flicking.on(EVENTS.WILL_CHANGE, changeSpy);
        flicking.on(EVENTS.WILL_RESTORE, restoreSpy);

        control.init(flicking);
        control.updateInput();

        await control.moveToPanel(flicking.getPanel(2), { duration: 500 });

        expect(changeSpy.calledOnce).to.be.true;
        expect(restoreSpy.called).to.be.false;
      });

      it(`should trigger ${EVENTS.WILL_CHANGE} if given panel is not same to active panel`, async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        control.init(flicking);
        control.updateInput();
        await control.moveToPanel(flicking.getPanel(1), { duration: 0 });

        const changeSpy = sinon.spy();
        const restoreSpy = sinon.spy();
        flicking.on(EVENTS.WILL_CHANGE, changeSpy);
        flicking.on(EVENTS.WILL_RESTORE, restoreSpy);

        await control.moveToPanel(flicking.getPanel(2), { duration: 500 });

        expect(changeSpy.calledOnce).to.be.true;
        expect(restoreSpy.called).to.be.false;
      });

      it(`should trigger ${EVENTS.WILL_RESTORE} if give panel is same to active panel`, async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        control.init(flicking);
        control.updateInput();
        await control.moveToPanel(flicking.getPanel(1), { duration: 0 });

        const changeSpy = sinon.spy();
        const restoreSpy = sinon.spy();
        flicking.on(EVENTS.WILL_CHANGE, changeSpy);
        flicking.on(EVENTS.WILL_RESTORE, restoreSpy);

        await control.moveToPanel(flicking.getPanel(1), { duration: 500 });

        expect(changeSpy.calledOnce).to.be.false;
        expect(restoreSpy.calledOnce).to.be.true;
      });

      it(`should be rejected with FlickingError with STOP_CALLED_BY_USER as code when stop() is called from ${EVENTS.WILL_CHANGE} event`, async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        flicking.on(EVENTS.WILL_CHANGE, e => e.stop());

        control.init(flicking);
        control.updateInput();

        const err = await control.moveToPanel(flicking.getPanel(1), { duration: 500 }).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.STOP_CALLED_BY_USER);
      });

      it(`should be rejected with FlickingError with STOP_CALLED_BY_USER as code when stop() is called from ${EVENTS.WILL_RESTORE} event`, async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        control.init(flicking);
        control.updateInput();
        await control.moveToPanel(flicking.getPanel(1), { duration: 0 });
        flicking.on(EVENTS.WILL_RESTORE, e => e.stop());

        const err = await control.moveToPanel(flicking.getPanel(1), { duration: 500 }).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.STOP_CALLED_BY_USER);
      });

      it("should be rejected when user interrupted while animating", async () => {
        const control = new ControlImpl();
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        control.init(flicking);
        control.updateInput();

        const err = await control.moveToPanelWithInterruption(flicking.getPanel(2), 1000).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.ANIMATION_INTERRUPTED);
      });
    });
  });
});

import FlickingError from "~/core/FlickingError";
import Viewport from "~/core/Viewport";
import Flicking from "~/Flicking";
import { SnapControl, FreeControl, StrictControl } from "~/control";
import VirtualManager from "~/core/VirtualManager";
import * as ERROR from "~/const/error";
import { ALIGN, DIRECTION, EVENTS, MOVE_TYPE } from "~/const/external";
import { Plugin } from "~/type/external";
import { AfterResizeEvent, BeforeResizeEvent } from "~/type/event";

import El from "./helper/El";
import { cleanup, createFlicking, range, simulate, tick } from "./helper/test-util";

describe("Flicking", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Initializing with correct structure", () => {
    it("can be created", async () => {
      const err = await createFlicking(El.DEFAULT_HORIZONTAL).then(() => null).catch(e => e);
      expect(err).to.be.null;
    });

    it("should throw an Error when no element is given", async () => {
      const err = await createFlicking(null).then(() => null).catch(e => e);

      expect(err).to.be.instanceOf(FlickingError);
      expect(err.code).to.equal(ERROR.CODE.WRONG_TYPE);
    });

    it("should throw an Error when element with given selector is not found", async () => {
      const selector = "#definitely-not-a-flicking-selector";
      const err = await createFlicking(selector).then(() => null).catch(e => e);

      expect(err).to.be.instanceOf(FlickingError);
      expect(err.code).to.equal(ERROR.CODE.ELEMENT_NOT_FOUND);
    });

    it("should not throw an Error when there's no panel elements", async () => {
      const err = await createFlicking(
        El.viewport().add(
          El.camera(),
        ),
      ).then(() => null).catch(e => e);

      expect(err).to.be.null;
    });

    it("won't throw error even if all panel has width: 0", async () => {
      const err = await createFlicking(
        El.viewport().add(
          El.camera()
            .add(El.panel("0px"))
            .add(El.panel("0px"))
            .add(El.panel("0px"))
        ),
      ).then(() => null).catch(e => e);

      expect(err).to.equal(null);
    });

    it("should set current panel even if all panel's size is 0", async () => {
      const flicking = await createFlicking(
        El.viewport().add(
          El.camera()
            .add(El.panel("0px"))
            .add(El.panel("0px"))
            .add(El.panel("0px"))
        ),
      );

      expect(flicking.currentPanel).not.to.be.null;
      expect(flicking.currentPanel).to.equal(flicking.getPanel(0));
    });
  });

  describe("Properties", () => {
    it("should have VERSION string", () => {
      expect(Flicking.VERSION).not.to.be.undefined;
      expect(typeof Flicking.VERSION).to.equal("string");
    });

    describe("viewport", () => {
      it("exists when the flicking is created", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.viewport).to.exist;
        expect(flicking.viewport).to.be.an.instanceof(Viewport);
      });
    });

    describe("virtual", () => {
      it("should be an instance of VirtualManager", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.virtual).to.be.an.instanceOf(VirtualManager);
      });

      it("should have virtual options in it", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(typeof flicking.virtual.panelClass).to.equal("string");
        expect(typeof flicking.virtual.cache).to.equal("boolean");
        expect(typeof flicking.virtual.initialPanelCount).to.equal("number");
        expect(typeof flicking.virtual.renderPanel).to.equal("function");
      });
    });
  });

  describe("Options", () => {
    describe("align", () => {
      it("is center by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.align).to.equal(ALIGN.CENTER);
      });

      it("should override renderer & camera's align", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          align: ALIGN.NEXT
        });

        expect(flicking.align).equals(ALIGN.NEXT);
        expect(flicking.renderer.align).equals(ALIGN.NEXT);
        expect(flicking.camera.align).equals(ALIGN.NEXT);
      });

      it("can be changed at anytime", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          align: ALIGN.CENTER
        });

        flicking.align = ALIGN.PREV;

        expect(flicking.align).equals(ALIGN.PREV);
        expect(flicking.renderer.align).equals(ALIGN.PREV);
        expect(flicking.camera.align).equals(ALIGN.PREV);
      });
    });

    describe("defaultIndex", () => {
      it("should be 0 by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.defaultIndex).to.equal(0);
      });

      it("should accept any number, even if it's bigger than actual panel length", async () => {
        // Empty flicking
        const flicking = await createFlicking(El.viewport().add(El.camera()), { defaultIndex: 2 });
        expect(flicking.renderer.panels.length).to.equal(0);
        expect(flicking.defaultIndex).to.equal(2);
      });

      it("should locate camera at position of panel which has index equal to defaultIndex", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });
        expect(flicking.camera.position).not.to.equal(0);
        expect(flicking.camera.position).to.equal(flicking.renderer.getPanel(1).position);
      });

      it("should locate camera at first panel's position instead if index is out of range", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 99999 });
        expect(flicking.camera.position).to.equal(flicking.renderer.getPanel(0).position);
      });
    });

    describe("horizontal", () => {
      it("is true by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.horizontal).to.be.true;
      });

      it("can be changed on creating new instance", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          horizontal: false
        });

        expect(flicking.horizontal).to.be.false;
      });

      it("can be changed anytime", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          horizontal: true
        });

        flicking.horizontal = false;

        expect(flicking.horizontal).to.be.false;
      });
    });

    describe("circular", () => {
      it("is false by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.circular).to.be.false;
      });
    });

    describe("circularFallback", () => {
      it("is 'linear' by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.circularFallback).to.equal("linear");
      });
    });

    describe("bound", () => {
      it("is false by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.bound).to.be.false;
      });
    });

    describe("adaptive", () => {
      it("is false by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.adaptive).to.be.false;
      });
    });

    describe("panelsPerView", () => {
      it("is -1 by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.panelsPerView).to.equal(-1);
      });
    });

    describe("noPanelStyleOverride", () => {
      it("is false by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.noPanelStyleOverride).to.be.false;
      });
    });

    describe("resizeOnContentsReady", () => {
      it("is false by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.resizeOnContentsReady).to.be.false;
      });

      it("should set all initial panels with images to be loading at init if it's set to true", async () => {
        const flicking = await createFlicking(El.viewport("200px", "200px").add(
          El.camera().add(
            El.imgPanel("100%", "100%"),
            El.imgPanel("100%", "100%"),
            El.imgPanel("100%", "100%")
          )
        ), { resizeOnContentsReady: true });

        expect(flicking.panels.every(panel => panel.loading)).to.be.true;
      });
    });

    describe("needPanelThreshold", () => {
      it("is 0 by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.needPanelThreshold).to.equal(0);
      });
    });

    describe("preventEventsBeforeInit", () => {
      it("is true by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.preventEventsBeforeInit).to.be.true;
      });

      it("should prevent events before ready", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false, preventEventsBeforeInit: true });
        const eventsTriggered = [];

        Object.values(EVENTS).forEach(evt => flicking.on(evt, e => eventsTriggered.push(e)));
        flicking.once(EVENTS.READY, () => { flicking.off(); });
        await flicking.init();

        expect(eventsTriggered.length).to.equal(1);
        expect(eventsTriggered[0].eventType).equal(EVENTS.READY);
      });

      it("should not prevent events before ready if false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false, preventEventsBeforeInit: false });
        const eventsTriggered = [];

        Object.values(EVENTS).forEach(evt => flicking.on(evt, e => eventsTriggered.push(e)));
        flicking.once(EVENTS.READY, () => { flicking.off(); });
        await flicking.init();

        expect(eventsTriggered.length).to.be.greaterThan(1);
        expect(eventsTriggered[0].eventType).not.equal(EVENTS.READY);
      });
    });

    describe("deceleration", () => {
      it("is 0.0075 by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.deceleration).to.equal(0.0075);
      });
    });

    describe("duration", () => {
      it("is 500 by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.duration).to.equal(500);
      });
    });

    describe("easing", () => {
      it("is (x => 1 - (1 - x)^3) by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        const defaultEasing = flicking.easing;

        expect(defaultEasing(0)).to.equal(0);
        expect(defaultEasing(0.5)).to.equal(1 - Math.pow(0.5, 3));
        expect(defaultEasing(1)).to.equal(1);
      });
    });

    describe("inputType", () => {
      it("is ['mouse', 'touch'] by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.inputType).to.deep.equal(["mouse", "touch"]);
      });
    });

    describe("moveType", () => {
      it("is 'snap' by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.moveType).to.equal("snap");
      });

      it("should change control to SnapControl when 'snap' is given", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.SNAP });

        expect(flicking.control).to.be.instanceOf(SnapControl);
      });

      it("should change control to FreeControl when 'freeScroll' is given", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.FREE_SCROLL });

        expect(flicking.control).to.be.instanceOf(FreeControl);
      });

      it("should change control to StrictControl when 'strict' is given", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.STRICT });

        expect(flicking.control).to.be.instanceOf(StrictControl);
      });
    });

    describe("threshold", () => {
      it("is 40 by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.threshold).to.equal(40);
      });

      it("should change panel when moving above threshold", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 50 });
        const beforeIndex = flicking.index;

        await simulate(flicking.element, { deltaX: -51, duration: 3000 });

        expect(flicking.index).not.to.equal(beforeIndex);
      });

      it("should change panel when moving same as threshold", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 50 });
        const beforeIndex = flicking.index;

        await simulate(flicking.element, { deltaX: -50, duration: 3000 });

        expect(flicking.index).not.to.equal(beforeIndex);
      });

      it("should not change panel when moving below threshold", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 50 });
        const beforeIndex = flicking.index;

        await simulate(flicking.element, { deltaX: -49, duration: 3000 });

        expect(flicking.index).equals(beforeIndex);
      });
    });

    describe("interruptable", () => {
      it("is true by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.interruptable).to.be.true;
      });
    });

    describe("bounce", () => {
      it("is '20%' by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.bounce).to.equal("20%");
      });

      it("should limit input to left bounce", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { bounce: 25 });
        const cameraPositionOnDefaultPanel = flicking.camera.position;
        let cameraPositionOnHoldEnd = 0;
        flicking.on(EVENTS.HOLD_END, () => {
          cameraPositionOnHoldEnd = flicking.camera.position;
        });

        await simulate(flicking.element, {
          deltaX: 999999999
        });

        expect(cameraPositionOnHoldEnd - cameraPositionOnDefaultPanel).equals(-25);
      });

      it("should limit input to right bounce", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { bounce: 25, defaultIndex: 2 });
        const cameraPositionOnDefaultPanel = flicking.camera.position;
        let cameraPositionOnHoldEnd = 0;
        flicking.on(EVENTS.HOLD_END, () => {
          cameraPositionOnHoldEnd = flicking.camera.position;
        });

        await simulate(flicking.element, {
          deltaX: -999999999
        });

        expect(cameraPositionOnHoldEnd - cameraPositionOnDefaultPanel).equals(25);
      });

      it("should limit input to up bounce", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { bounce: 25, horizontal: false });
        const cameraPositionOnDefaultPanel = flicking.camera.position;
        let cameraPositionOnHoldEnd = 0;
        flicking.on(EVENTS.HOLD_END, () => {
          cameraPositionOnHoldEnd = flicking.camera.position;
        });

        await simulate(flicking.element, {
          deltaY: 999999999
        });

        expect(cameraPositionOnHoldEnd - cameraPositionOnDefaultPanel).equals(-25);
      });

      it("should limit input to down bounce", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { bounce: 25, defaultIndex: 2, horizontal: false });
        const cameraPositionOnDefaultPanel = flicking.camera.position;
        let cameraPositionOnHoldEnd = 0;
        flicking.on(EVENTS.HOLD_END, () => {
          cameraPositionOnHoldEnd = flicking.camera.position;
        });

        await simulate(flicking.element, {
          deltaY: -999999999
        });

        expect(cameraPositionOnHoldEnd - cameraPositionOnDefaultPanel).equals(25);
      });
    });

    describe("iOSEdgeSwipeThreshold", () => {
      it("is 30 by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.iOSEdgeSwipeThreshold).to.equal(30);
      });
    });

    describe("renderOnlyVisible", () => {
      it("is false by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.renderOnlyVisible).to.equal(false);
      });
    });

    describe("virtual", () => {
      it("has cache as false by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.virtual.cache).to.be.false;
      });

      it("has initialPanelCount as -1 by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.virtual.initialPanelCount).to.equal(-1);
      });

      it("has panelClass as 'flicking-panel' by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.virtual.panelClass).to.equal("flicking-panel");
      });

      it("has renderPanel as a function that returns an empty string by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.virtual.renderPanel(null, 0)).to.equal("");
      });
    });

    describe("autoInit", () => {
      it("is true by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.autoInit).to.be.true;
      });

      it("should set initialized to true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.initialized).to.be.true;
      });

      it("should not set initialized to true when it's set to false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });

        expect(flicking.initialized).to.be.false;
      });
    });

    describe("autoResize", () => {
      it("is true by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.autoResize).to.be.true;
      });
    });

    describe("useResizeObserver", () => {
      it("should receive window resize event and emit resize event if set to false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoResize: true, useResizeObserver: false });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        window.dispatchEvent(new Event("resize"));

        return new Promise((resolve) => {
          flicking.once(EVENTS.AFTER_RESIZE, () => {
            expect(resizeSpy.calledOnce).to.be.true;
            resolve();
          });
        });
      });

      it("should not attach resize event until init() is called if set to false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false, autoResize: true, useResizeObserver: false });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.BEFORE_RESIZE, resizeSpy);

        window.dispatchEvent(new Event("resize"));
        expect(resizeSpy.called).to.be.false;

        await flicking.init(); // resize() called inside, so reset resizeSpy history
        resizeSpy.resetHistory();
        window.dispatchEvent(new Event("resize"));

        expect(resizeSpy.calledOnce).to.be.true;
      });
    });

    describe("preventClickOnDrag", () => {
      it("should trigger click event when Flicking's not dragged at all", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { preventClickOnDrag: true });
        const clickSpy = sinon.spy();
        const testPanel = flicking.panels[0];

        testPanel.element.addEventListener("click", clickSpy);

        await simulate(flicking.element, { deltaX: 0, deltaY: 0 });
        testPanel.element.click();

        expect(clickSpy.calledOnce).to.be.true;
      });

      it("shouldn't trigger click event when Flicking's dragged a little", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { preventClickOnDrag: true });
        const clickSpy = sinon.spy();
        const testPanel = flicking.panels[0];

        testPanel.element.addEventListener("click", clickSpy);

        await simulate(flicking.element, { deltaX: -50, deltaY: 0 });
        testPanel.element.click();

        expect(clickSpy.called).to.be.false;
      });

      it("shouldn't bother click event on outside of camera element", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { preventClickOnDrag: true });
        const clickSpy = sinon.spy();
        const testEl = document.createElement("div");

        flicking.element.appendChild(testEl);

        testEl.addEventListener("click", clickSpy);

        await simulate(flicking.element, { deltaX: -50, deltaY: 0 });
        testEl.click();

        expect(clickSpy.called).to.be.true;
      });
    });
  });

  describe("Events", () => {
    describe(EVENTS.READY, () => {
      it("should be emitted when Flicking is initialized", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          autoInit: false
        });
        const readySpy = sinon.spy();
        flicking.on(EVENTS.READY, readySpy);

        expect(readySpy.called).to.be.false;
        await flicking.init();
        expect(readySpy.calledOnce).to.be.true;
      });

      it("won't be emitted after Flicking is initialized", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          autoInit: false
        });
        const readySpy = sinon.spy();
        flicking.on(EVENTS.READY, readySpy);

        expect(readySpy.called).to.be.false;
        await flicking.init();
        await flicking.init();
        await flicking.init();
        await flicking.init();
        await flicking.init();
        expect(readySpy.calledOnce).to.be.true;
      });
    });

    describe(EVENTS.BEFORE_RESIZE, () => {
      it("should be emitted on initialization when resize if preventEventsBeforeInit is false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          autoInit: false,
          preventEventsBeforeInit: false
        });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.BEFORE_RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        await flicking.init();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should be emitted when resize() is called", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.BEFORE_RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        await flicking.resize();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should have previous size in it", async () => {
        const viewportEl = El.viewport().setWidth(300).setHeight(300).add(El.camera());
        const flicking = await createFlicking(viewportEl);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.BEFORE_RESIZE, resizeSpy);

        viewportEl.setWidth(500).setHeight(500);
        await flicking.resize();

        const event = resizeSpy.firstCall.args[0] as BeforeResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.width).to.exist;
        expect(event.height).to.exist;
        expect(event.width).to.equal(300);
        expect(event.height).to.equal(300);
      });

      it(`should be triggered before ${EVENTS.AFTER_RESIZE}`, async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const beforeResizeSpy = sinon.spy();
        const afterResizeSpy = sinon.spy();

        flicking.on(EVENTS.BEFORE_RESIZE, beforeResizeSpy);
        flicking.on(EVENTS.BEFORE_RESIZE, afterResizeSpy);
        await flicking.resize();

        expect(beforeResizeSpy.calledOnce).to.be.true;
        expect(afterResizeSpy.calledOnce).to.be.true;
        expect(beforeResizeSpy.calledBefore(afterResizeSpy)).to.be.true;
      });
    });

    describe(EVENTS.AFTER_RESIZE, () => {
      it("should be emitted on initialization when resize if preventEventsBeforeInit is false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
          autoInit: false,
          preventEventsBeforeInit: false
        });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        await flicking.init();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should be emitted when resize() is called", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        await flicking.resize();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should have new size in it", async () => {
        const viewportEl = El.viewport().setWidth(300).setHeight(300).add(El.camera());
        const flicking = await createFlicking(viewportEl);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        viewportEl.setWidth(500).setHeight(500);
        await flicking.resize();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.width).to.equal(500);
        expect(event.height).to.equal(500);
      });

      it("should have correct size value of viewport in it", async () => {
        const viewportSize = {
          width: 500,
          height: 300
        };

        const flicking = await createFlicking(
          El.viewport().setWidth(viewportSize.width).setHeight(viewportSize.height).add(
            El.camera(),
          ),
        );
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);
        await flicking.resize();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.width).to.equal(viewportSize.width);
        expect(event.height).to.equal(viewportSize.height);
      });

      it("should have size 0 on initialization", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false, preventEventsBeforeInit: false });
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);
        await flicking.init();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.prev.width).to.equal(0);
        expect(event.prev.height).to.equal(0);
      });

      it("should set sizeChanged to true when the size is changed", async () => {
        const prevSize = { width: 100, height: 200 };
        const newSize = { width: 530, height: 740 };
        const viewport = El.viewport().add(El.camera());
        viewport.setWidth(prevSize.width).setHeight(prevSize.height);

        const flicking = await createFlicking(viewport);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);
        viewport.setWidth(newSize.width).setHeight(newSize.height);
        await flicking.resize();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;

        expect(event.width).to.equal(newSize.width);
        expect(event.height).to.equal(newSize.height);
        expect(event.prev.width).to.equal(prevSize.width);
        expect(event.prev.height).to.equal(prevSize.height);
        expect(event.sizeChanged).to.be.true;
      });

      it("should set sizeChanged to false when the size is not changed", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);
        await flicking.resize();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;

        expect(event.width).to.equal(event.prev.width);
        expect(event.height).to.equal(event.prev.height);
        expect(event.width).not.to.equal(0);
        expect(event.height).not.to.equal(0);
        expect(event.sizeChanged).to.be.false;
      });

      it("should provide viewport element in it", async () => {
        const viewport = El.viewport().add(El.camera());
        const flicking = await createFlicking(viewport);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);
        await flicking.resize();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.element).to.deep.equal(viewport.el);
      });
    });

    describe(EVENTS.NEED_PANEL, () => {
      it("should be in animating state when it's triggered", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const needPanelSpy = sinon.spy();
        const wasAnimating: boolean[] = [];

        flicking.on(EVENTS.NEED_PANEL, () => {
          wasAnimating.push(flicking.animating);
          needPanelSpy();
        });

        await simulate(flicking.element, { deltaX: -5000 });

        expect(needPanelSpy.called).to.be.true;
        expect(wasAnimating.every(animating => animating)).to.be.true;
      });

      it("should not trigger another needPanel event when panel is appended by it", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const needPanelSpy = sinon.spy();

        flicking.on(EVENTS.NEED_PANEL, needPanelSpy);
        flicking.on(EVENTS.NEED_PANEL, e => {
          if (e.direction === DIRECTION.PREV) return;

          flicking.append(El.panel("100%").el);
        });

        await simulate(flicking.element, { deltaX: -2000 });

        expect(needPanelSpy.calledOnce).to.be.true;
      });
    });

    describe(EVENTS.MOVE_END, () => {
      it("should set Flicking not to be animating", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const moveEndSpy = sinon.spy();
        const wasAnimating: boolean[] = [];

        flicking.on(EVENTS.MOVE_END, moveEndSpy);
        flicking.on(EVENTS.MOVE_END, () => {
          wasAnimating.push(flicking.animating);
        });

        await simulate(flicking.element, { deltaX: -500 });

        expect(moveEndSpy.called).to.be.true;
        expect(wasAnimating.every(animating => !animating)).to.be.true;
      });
    });

    describe("Input & Move Event Order", () => {
      const eventsFired: string[] = [];
      const attachEventOrderRecognizer = (flicking: Flicking) => {
        [EVENTS.HOLD_START, EVENTS.HOLD_END, EVENTS.MOVE_START, EVENTS.MOVE, EVENTS.MOVE_END, EVENTS.WILL_CHANGE, EVENTS.WILL_RESTORE, EVENTS.CHANGED, EVENTS.RESTORED].forEach(event => {
          flicking.on(event, e => {
            if (eventsFired.length === 0 || eventsFired[eventsFired.length - 1] !== e.eventType) {
              eventsFired.push(e.eventType);
            }
          });
        });
      };

      beforeEach(() => {
        eventsFired.splice(0, eventsFired.length);
      });

      it(`should be ${EVENTS.HOLD_START} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.HOLD_END} -> ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} -> ${EVENTS.CHANGED} when panel changed with user input`, async () => {
        const expectedEventOrder = [
          EVENTS.HOLD_START,
          EVENTS.MOVE_START,
          EVENTS.MOVE,
          EVENTS.HOLD_END,
          EVENTS.WILL_CHANGE,
          EVENTS.MOVE,
          EVENTS.MOVE_END,
          EVENTS.CHANGED
        ];

        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 10 });
        attachEventOrderRecognizer(flicking);

        await simulate(flicking.element, { deltaX: -50 });

        expect(eventsFired).to.deep.equal(expectedEventOrder);
      });

      it(`should be ${EVENTS.HOLD_START} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.HOLD_END} -> ${EVENTS.WILL_RESTORE} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} -> ${EVENTS.RESTORED} when panel restored with user input`, async () => {
        const expectedEventOrder = [
          EVENTS.HOLD_START,
          EVENTS.MOVE_START,
          EVENTS.MOVE,
          EVENTS.HOLD_END,
          EVENTS.WILL_RESTORE,
          EVENTS.MOVE,
          EVENTS.MOVE_END,
          EVENTS.RESTORED
        ];

        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 50 });
        attachEventOrderRecognizer(flicking);

        await simulate(flicking.element, { deltaX: -49 });

        expect(eventsFired).to.deep.equal(expectedEventOrder);
      });

      describe("moveTo's event order", () => {
        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} -> ${EVENTS.CHANGED} when called with method`, async () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END,
            EVENTS.CHANGED
          ];

          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          attachEventOrderRecognizer(flicking);

          void flicking.moveTo(2, 10).then(() => {
            expect(eventsFired).to.deep.equal(expectedEventOrder);
          });
          tick(1000);
        });

        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} -> ${EVENTS.CHANGED} when called with method and duration is 0`, async () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END,
            EVENTS.CHANGED
          ];

          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          attachEventOrderRecognizer(flicking);

          void flicking.moveTo(2, 0);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });
      });

      describe("prev's event order", () => {
        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} -> ${EVENTS.CHANGED} when called with method`, async () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END,
            EVENTS.CHANGED
          ];

          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });
          attachEventOrderRecognizer(flicking);

          void flicking.prev(10).then(() => {
            expect(eventsFired).to.deep.equal(expectedEventOrder);
          });
          tick(1000);
        });

        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} -> ${EVENTS.CHANGED} when called with method and duration is 0`, async () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END,
            EVENTS.CHANGED
          ];

          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });
          attachEventOrderRecognizer(flicking);

          void flicking.prev(0);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });
      });

      describe("next's event order", () => {
        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} -> ${EVENTS.CHANGED} when called with method`, async () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END,
            EVENTS.CHANGED
          ];

          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          attachEventOrderRecognizer(flicking);

          void flicking.next(10).then(() => {
            expect(eventsFired).to.deep.equal(expectedEventOrder);
          });
          tick(1000);
        });

        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} -> ${EVENTS.CHANGED} when called with method and duration is 0`, async () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END,
            EVENTS.CHANGED
          ];

          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          attachEventOrderRecognizer(flicking);

          void flicking.next(0);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });
      });
    });

    describe("Common parameters", () => {
      const eventsFired: any[] = [];
      const collectEvents = (flicking: Flicking) => {
        Object.values(EVENTS).forEach(event => {
          flicking.on(event, e => eventsFired.push(e));
        });
      };

      beforeEach(() => {
        eventsFired.splice(0, eventsFired.length);
      });

      describe("direction", () => {
        it(`is always ${DIRECTION.NEXT} when calling next()`, async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          collectEvents(flicking);

          void flicking.next(100);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.NEXT)).to.be.true;
        });

        it(`is always ${DIRECTION.PREV} when calling prev()`, async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });
          collectEvents(flicking);

          void flicking.prev(100);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.PREV)).to.be.true;
        });

        it(`is always ${DIRECTION.NEXT} when moving to next panel with user input, not going over current panel area`, async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
            align: ALIGN.CENTER,
            threshold: 10
          });
          collectEvents(flicking);

          await simulate(flicking.element, { deltaX: -20 });

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.NEXT)).to.be.true;
        });

        it(`is always ${DIRECTION.PREV} when moving to next panel with user input, not going over current panel area`, async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
            align: ALIGN.CENTER,
            threshold: 10,
            defaultIndex: 2
          });
          collectEvents(flicking);

          await simulate(flicking.element, { deltaX: 20 });

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.PREV)).to.be.true;
        });
      });

      describe("isTrusted", () => {
        it("is always false in events triggered by next()", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          collectEvents(flicking);

          void flicking.next(500);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.isTrusted != null).every(e => e.isTrusted === false)).to.be.true;
        });

        it("is always false in events triggered by prev()", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });
          collectEvents(flicking);

          void flicking.prev(500);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.isTrusted != null).every(e => e.isTrusted === false)).to.be.true;
        });

        it("is always true in events triggered by user input", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 10 });
          collectEvents(flicking);

          await simulate(flicking.element, { deltaX: -20 });

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.isTrusted != null).every(e => e.isTrusted === true)).to.be.true;
        });
      });
    });
  });

  describe("Methods", () => {
    describe("init", () => {
      it("should set initialized to true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });

        expect(flicking.initialized).to.be.false;
        await flicking.init();
        expect(flicking.initialized).to.be.true;
      });

      it("should call init of the camera/renderer/control", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
        const controlSpy = sinon.spy(flicking.control, "init");
        const cameraSpy = sinon.spy(flicking.camera, "init");
        const rendererSpy = sinon.spy(flicking.renderer, "init");

        await flicking.init();

        expect(controlSpy.calledOnce).to.be.true;
        expect(cameraSpy.calledOnce).to.be.true;
        expect(rendererSpy.calledOnce).to.be.true;
      });

      it("should move to default index", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false, defaultIndex: 1 });

        const beforeIdx = flicking.index;
        await flicking.init();
        const afterIdx = flicking.index;

        expect(beforeIdx).to.equal(-1);
        expect(afterIdx).to.equal(1);
      });
    });

    describe("destroy", () => {
      it("should set initialized to false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: true });

        expect(flicking.initialized).to.be.true;
        flicking.destroy();
        expect(flicking.initialized).to.be.false;
      });

      it("should remove window resize event handler", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false, autoResize: false });
        const resizeSpy = sinon.spy(flicking, "resize");
        flicking.autoResize = true;
        await flicking.init();

        resizeSpy.resetHistory();
        flicking.destroy();

        window.dispatchEvent(new Event("resize"));
        expect(resizeSpy.called).to.be.false;
      });

      it("should call off of it", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const offSpy = sinon.spy(flicking, "off");

        flicking.destroy();

        expect(offSpy.calledOnce).to.be.true;
      });

      it("should call destroy of the control/camera/renderer", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const controlSpy = sinon.spy(flicking.control, "destroy");
        const cameraSpy = sinon.spy(flicking.camera, "destroy");
        const rendererSpy = sinon.spy(flicking.renderer, "destroy");

        flicking.destroy();

        expect(controlSpy.calledOnce).to.be.true;
        expect(cameraSpy.calledOnce).to.be.true;
        expect(rendererSpy.calledOnce).to.be.true;
      });
    });

    describe("getElement()", () => {
      it("should return viewport element", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.element).to.be.an.instanceOf(HTMLElement);
        expect(flicking.element).to.equal(flicking.viewport.element);
      });
    });

    describe("enableInput()", () => {
      it("should enable input", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 40 });
        flicking.disableInput();

        flicking.enableInput();
        const beforeIdx = flicking.index;
        await simulate(flicking.element, { deltaX: -100 });
        const afterIdx = flicking.index;

        expect(beforeIdx).to.equal(0);
        expect(afterIdx).to.equal(1);
      });

      it("should return this", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const returnVal = flicking.enableInput();

        expect(returnVal).deep.equals(flicking);
      });
    });

    describe("disableInput()", () => {
      it("should disable input", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        flicking.disableInput();

        const beforeIdx = flicking.index;
        await simulate(flicking.element, { deltaX: -100 });
        const afterIdx = flicking.index;

        expect(beforeIdx).to.equal(afterIdx);
        expect(beforeIdx).to.equal(0);
      });

      it("should return this", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const returnVal = flicking.disableInput();

        expect(returnVal).deep.equals(flicking);
      });
    });

    describe("next()", () => {
      const next = async (flicking: Flicking, duration?: number) => {
        const nextPromise = flicking.next(duration);
        tick(10000);
        return nextPromise;
      };

      it("should move to the next panel that has index + 1", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        const prevIndex = flicking.index;
        await next(flicking);
        const nextIndex = flicking.index;

        expect(prevIndex).to.equal(0);
        expect(nextIndex).to.equal(1);
      });

      it("should use the Flicking's current duration option value if the duration is not given", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { duration: 1000 });
        const moveToSpy = sinon.spy(flicking.control, "moveToPanel");

        await next(flicking);
        flicking.duration = 2000;

        await next(flicking);

        expect(moveToSpy.calledTwice).to.be.true;
        expect(moveToSpy.firstCall.calledWith(flicking.getPanel(1), { duration: 1000, direction: DIRECTION.NEXT })).to.be.true;
        expect(moveToSpy.secondCall.calledWith(flicking.getPanel(2), { duration: 2000, direction: DIRECTION.NEXT })).to.be.true;
      });

      it("should throw FlickingError with code INDEX_OUT_OF_RANGE if called on the last index", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });

        const err = await next(flicking).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.INDEX_OUT_OF_RANGE);
      });

      it("should throw FlickingError with code ANIMATION_ALREADY_PLAYING if it is animating", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        void flicking.next(1000);
        const err = await next(flicking).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.ANIMATION_ALREADY_PLAYING);
      });
    });

    describe("prev()", () => {
      const prev = async (flicking: Flicking, duration?: number) => {
        const nextPromise = flicking.prev(duration);
        tick(10000);
        return nextPromise;
      };

      it("should move to the previous panel that has index - 1", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });

        const prevIndex = flicking.index;
        await prev(flicking);
        const nextIndex = flicking.index;

        expect(prevIndex).to.equal(2);
        expect(nextIndex).to.equal(1);
      });

      it("should use the Flicking's current duration option value if the duration is not given", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { duration: 1000, defaultIndex: 2 });
        const moveToSpy = sinon.spy(flicking.control, "moveToPanel");

        await prev(flicking);
        flicking.duration = 2000;
        await prev(flicking);

        expect(moveToSpy.calledTwice).to.be.true;
        expect(moveToSpy.firstCall.calledWith(flicking.getPanel(1), { duration: 1000, direction: DIRECTION.PREV })).to.be.true;
        expect(moveToSpy.secondCall.calledWith(flicking.getPanel(0), { duration: 2000, direction: DIRECTION.PREV })).to.be.true;
      });

      it("should throw FlickingError with code INDEX_OUT_OF_RANGE if called on the first index", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 0 });

        const err = await prev(flicking).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.INDEX_OUT_OF_RANGE);
      });

      it("should throw FlickingError with code ANIMATION_ALREADY_PLAYING if it is animating", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });

        void flicking.prev(1000);
        const err = await prev(flicking).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.ANIMATION_ALREADY_PLAYING);
      });
    });

    describe("moveTo", () => {
      const moveTo = async (flicking: Flicking, index: number, duration?: number) => {
        const nextPromise = flicking.moveTo(index, duration);
        tick(10000);
        return nextPromise;
      };

      it("should move to the panel with the given index", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });

        const prevIndex = flicking.index;
        await moveTo(flicking, 0);
        const nextIndex = flicking.index;

        expect(prevIndex).to.equal(2);
        expect(nextIndex).to.equal(0);
      });

      it("should throw FlickingError with code INDEX_OUT_OF_RANGE if moving to negative index", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        const err = await moveTo(flicking, -1).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.INDEX_OUT_OF_RANGE);
      });

      it("should throw FlickingError with code INDEX_OUT_OF_RANGE if moving to index >= panel count", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        const err = await moveTo(flicking, 3).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.INDEX_OUT_OF_RANGE);
      });

      it("should throw FlickingError with code ANIMATION_ALREADY_PLAYING if it is animating", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        void flicking.moveTo(1, 1000);
        const err = await moveTo(flicking, 2).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.ANIMATION_ALREADY_PLAYING);
      });

      it("can move to the panel more than count limit when using strict move type", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: "strict" });

        await moveTo(flicking, 2);

        expect(flicking.index).to.equal(2);
        expect(flicking.camera.position).to.equal(flicking.panels[2].position);
      });
    });

    describe("getStatus()", () => {
      it("should return correct index", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });

        const status = flicking.getStatus();

        expect(status.index).equals(1);
      });

      it("should return correct index after moving", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 0 });

        void flicking.moveTo(2, 0);
        const status = flicking.getStatus();

        expect(status.index).equals(2);
      });

      it("should return panel's outerHTML if `includePanelHTML` is true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        const panels = flicking.panels;
        const status = flicking.getStatus({ includePanelHTML: true });

        expect(status.panels).not.to.be.undefined;
        expect(status.panels.length).above(0);
        expect(status.panels.length).equals(panels.length);
        expect(status.panels.every((panel, panelIdx) => panel.html === panels[panelIdx].element.outerHTML));
      });

      it("should include index to a returned object if index = true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });

        const status = flicking.getStatus({ index: true });

        expect(status.index).to.exist;
        expect(typeof status.index).to.equal("number");
      });

      it("should not include index to a returned object if index = false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });

        const status = flicking.getStatus({ index: false });

        expect(status.index).to.be.undefined;
      });

      it("should include position to a returned object if position = true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });

        const status = flicking.getStatus({ position: true });

        expect(status.position).to.exist;
        expect(typeof status.position.panel).to.equal("number");
        expect(typeof status.position.progressInPanel).to.equal("number");
      });

      it("should not include position to a returned object if position = false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });

        const status = flicking.getStatus({ position: false });

        expect(status.position).to.be.undefined;
      });

      it("should include a panel outerHTML array to a returned object if includePanelHTML = true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });

        const status = flicking.getStatus({ includePanelHTML: true });

        expect(status.panels).to.exist;
        expect(status.panels).to.be.an.instanceOf(Array);
        expect(status.panels.length).to.equal(flicking.panelCount);
        expect(status.panels.every(panel => typeof panel.html === "string")).to.be.true;
      });

      it("should not include a panel outerHTML array to a returned object if includePanelHTML = false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });

        const status = flicking.getStatus({ includePanelHTML: false });

        expect(status.panels.every(panel => panel.html === undefined)).to.be.true;
      });

      it("should include a panel outerHTML array of the visible panels to a returned object if includePanelHTML = true and visiblePanelsOnly = true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        const status = flicking.getStatus({ includePanelHTML: true, visiblePanelsOnly: true });

        expect(status.panels).to.exist;
        expect(status.panels).to.be.an.instanceOf(Array);

        expect(status.panels.length).to.equal(flicking.visiblePanels.length);
        expect(status.panels.length).not.to.equal(flicking.panels.length);
        expect(status.panels.every(panel => typeof panel.html === "string")).to.be.true;
      });

      it("should not include a panel outerHTML array of the visible panels to a returned object if includePanelHTML = false and visiblePanelsOnly = true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });

        const status = flicking.getStatus({ includePanelHTML: false });

        expect(status.panels.every(panel => panel.html === undefined)).to.be.true;
      });

      it("should include visible offsets to the return value if visiblePanelsOnly = true", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "400px").add(
            El.camera().add(
              ...range(10).map(() => El.panel("100%", "100%"))
            )
          ),
          { defaultIndex: 5 }
        );

        const visiblePanels = flicking.visiblePanels;
        const status = flicking.getStatus({ visiblePanelsOnly: true });

        expect(status.visibleOffset).not.to.be.undefined;
        expect(status.visibleOffset).to.be.above(0);
        expect(status.visibleOffset).to.equal(visiblePanels[0].index);
      });

      it("should not include visible offsets to the return value if visiblePanelsOnly = true", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "400px").add(
            El.camera().add(
              ...range(10).map(() => El.panel("100%", "100%"))
            )
          ),
          { defaultIndex: 5 }
        );

        const status = flicking.getStatus({ visiblePanelsOnly: false });

        expect(status.visibleOffset).to.be.undefined;
      });
    });

    describe("setStatus()", () => {
      it("can restore index", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });
        const status = flicking.getStatus();

        void flicking.moveTo(0, 0);
        const indexBefore = flicking.index;
        flicking.setStatus(status);

        expect(indexBefore).to.equal(0);
        expect(flicking.index).equals(2);
        expect(flicking.camera.position).to.equal(flicking.panels[2].position);
      });

      it("should restore previous state of panels if panel outerHTML is included", async () => {
        const classToAdd = "this-is-test-class";
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const status = flicking.getStatus({ includePanelHTML: true });

        flicking.currentPanel.element.classList.add(classToAdd);
        flicking.setStatus(status);

        expect(flicking.currentPanel.element.classList.contains(classToAdd)).to.be.false;
      });

      it("should move to the given camera position if moveType is freeScroll", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.FREE_SCROLL });
        const status = flicking.getStatus({ index: false, position: true });
        const prevPosition = flicking.camera.position;

        flicking.setStatus({ ...status, position: { panel: flicking.panelCount - 1, progressInPanel: 1 } });

        expect(flicking.camera.position).not.equals(prevPosition);
        expect(flicking.camera.position).equals(flicking.camera.range.max);
      });

      it("should not move to the given camera position if moveType is not freeScroll", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { moveType: MOVE_TYPE.SNAP });
        const status = flicking.getStatus({ index: false, position: true });
        const prevPosition = flicking.camera.position;

        flicking.setStatus({ ...status, position: { panel: flicking.panelCount - 1, progressInPanel: 1 } });

        expect(flicking.camera.position).equals(prevPosition);
        expect(flicking.camera.position).not.equals(flicking.camera.range.max);
      });

      it("should restore index using the visible offset if given", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "400px").add(
            El.camera().add(
              ...range(10).map(() => El.panel("100%", "100%"))
            )
          ),
          { defaultIndex: 5 }
        );

        const visiblePanels = flicking.visiblePanels;
        const status = flicking.getStatus({ visiblePanelsOnly: true });

        flicking.setStatus(status);

        expect(visiblePanels.length).not.equals(10);
        expect(flicking.index).not.equals(5);
        expect(flicking.index).to.equal(5 - status.visibleOffset);
      });

      it("should move to the given camera position using the visible offset if given", async () => {
        const flicking = await createFlicking(
          El.viewport("1000px", "400px").add(
            El.camera().add(
              ...range(10).map(() => El.panel("100%", "100%"))
            )
          ),
          { moveType: MOVE_TYPE.FREE_SCROLL, defaultIndex: 5 }
        );
        const status = flicking.getStatus({ index: false, position: true, includePanelHTML: true, visiblePanelsOnly: true });
        const prevPosition = flicking.camera.position;
        const prevRange = flicking.camera.range;

        flicking.setStatus(status);

        expect(flicking.camera.position).not.equals(prevPosition);
        expect(flicking.camera.range).not.deep.equals(prevRange);
      });
    });

    describe("plugin-related methods", () => {
      class TestPlugin implements Plugin {
        public init = sinon.spy();
        public destroy = sinon.spy();
        public update = sinon.spy();
      }

      describe("addPlugins()", () => {
        it("can add new plugin to a `plugins` array", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          const plugin = new TestPlugin();

          flicking.addPlugins(plugin);

          expect(flicking.activePlugins.includes(plugin)).to.be.true;
        });

        it("can add multiple plugins to a `plugins` array", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          const plugins = range(100).map(() => new TestPlugin());

          flicking.addPlugins(...plugins);

          expect(plugins.every(plugin => flicking.activePlugins.includes(plugin))).to.be.true;
        });

        it("should call `init` of the plugin when Flicking's already initialized", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: true });
          const plugin = new TestPlugin();

          const initCalledBefore = plugin.init.called;
          flicking.addPlugins(plugin);

          expect(initCalledBefore).to.be.false;
          expect(plugin.init.calledOnce).to.be.true;
        });

        it("shouldn't call `init` of the plugin when Flicking's not initialized", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
          const plugin = new TestPlugin();

          const initCalledBefore = plugin.init.called;
          flicking.addPlugins(plugin);

          expect(initCalledBefore).to.be.false;
          expect(plugin.init.called).to.be.false;
        });

        it("should call `init` on Flicking's init() called", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
          const plugin = new TestPlugin();

          flicking.addPlugins(plugin);
          const initCalledBefore = plugin.init.called;

          await flicking.init();

          expect(initCalledBefore).to.be.false;
          expect(plugin.init.calledOnce).to.be.true;
        });
      });

      describe("removePlugins()", () => {
        it("should remove a plugin from `plugins` array", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          const plugin = new TestPlugin();

          flicking.addPlugins(plugin);
          flicking.removePlugins(plugin);

          expect(flicking.activePlugins.includes(plugin)).to.be.false;
        });

        it("can be called with plugin that is not added before but will not throw any error", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          const plugin = new TestPlugin();

          flicking.removePlugins(plugin);

          expect(flicking.activePlugins.includes(plugin)).to.be.false;
        });

        it("can remove a plugin from `plugins` array even if the plugin's not initialized", async () => {
          const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
          const plugin = new TestPlugin();

          flicking.addPlugins(plugin);
          flicking.removePlugins(plugin);

          expect(plugin.init.called).to.be.false;
          expect(flicking.activePlugins.includes(plugin)).to.be.false;
        });
      });
    });
  });
});

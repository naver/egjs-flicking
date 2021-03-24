import FlickingError from "~/core/FlickingError";
import Viewport from "~/core/Viewport";
import Flicking from "~/Flicking";
import * as ERROR from "~/const/error";
import { ALIGN, DIRECTION, EVENTS } from "~/const/external";
import { AfterResizeEvent, BeforeResizeEvent } from "~/type/event";

import El from "./helper/El";
import { cleanup, createFlicking, simulate, tick } from "./helper/test-util";

describe("Flicking", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Initializing with correct structure", () => {
    it("can be created", () => {
      expect(() => {
        createFlicking(El.DEFAULT_HORIZONTAL);
      }).to.not.throw();
    });

    it("should throw an Error when no element is given", () => {
      expect(() => {
        createFlicking(null);
      }).to.throw(FlickingError, typeof null)
        .with.property("code", ERROR.CODE.WRONG_TYPE);
    });

    it("should throw an Error when element with given selector is not found", () => {
      const selector = "#definitely-not-a-flicking-selector";
      expect(() => {
        createFlicking(selector);
      }).to.throw(FlickingError, selector)
        .with.property("code", ERROR.CODE.ELEMENT_NOT_FOUND);
    });

    it("should not throw an Error when there's no panel elements", () => {
      expect(() => {
        createFlicking(
          El.viewport().add(
            El.camera(),
          ),
        );
      }).not.to.throw();
    });

    it("won't throw error even if all panel has width: 0", () => {
      expect(() => {
        createFlicking(
          El.viewport().add(
            El.camera()
              .add(El.panel("0px"))
              .add(El.panel("0px"))
              .add(El.panel("0px"))
          ),
        );
      }).not.to.throw();
    });
  });

  describe("Properties", () => {
    it("should have VERSION string", () => {
      expect(Flicking.VERSION).not.to.be.undefined;
      expect(typeof Flicking.VERSION).to.equal("string");
    });

    describe("viewport", () => {
      it("exists when the flicking is created", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.viewport).to.exist;
        expect(flicking.viewport).to.be.an.instanceof(Viewport);
      });
    });
  });

  describe("Options", () => {
    describe("align", () => {
      it("is center by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.align).to.equal(ALIGN.CENTER);
      });

      it("should override renderer & camera's align", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, {
          align: ALIGN.NEXT
        });

        expect(flicking.align).equals(ALIGN.NEXT);
        expect(flicking.renderer.align).equals(ALIGN.NEXT);
        expect(flicking.camera.align).equals(ALIGN.NEXT);
      });

      it("can be changed at anytime", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, {
          align: ALIGN.CENTER
        });

        flicking.align = ALIGN.PREV;

        expect(flicking.align).equals(ALIGN.PREV);
        expect(flicking.renderer.align).equals(ALIGN.PREV);
        expect(flicking.camera.align).equals(ALIGN.PREV);
      });
    });

    describe("defaultIndex", () => {
      it("should be 0 by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.defaultIndex).to.equal(0);
      });

      it("should accept any number, even if it's bigger than actual panel length", () => {
        // Empty flicking
        const flicking = createFlicking(El.viewport().add(El.camera()), { defaultIndex: 2 });
        expect(flicking.renderer.panels.length).to.equal(0);
        expect(flicking.defaultIndex).to.equal(2);
      });

      it("should locate camera at position of panel which has index equal to defaultIndex", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 1 });
        expect(flicking.camera.position).not.to.equal(0);
        expect(flicking.camera.position).to.equal(flicking.renderer.getPanel(1).position);
      });

      it("should locate camera at first panel's position instead if index is out of range", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 99999 });
        expect(flicking.camera.position).to.equal(flicking.renderer.getPanel(0).position);
      });
    });

    describe("horizontal", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.horizontal).to.be.true;
      });

      it("can be changed on creating new instance", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, {
          horizontal: false
        });

        expect(flicking.horizontal).to.be.false;
      });

      it("can be changed anytime", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, {
          horizontal: true
        });

        flicking.horizontal = false;

        expect(flicking.horizontal).to.be.false;
      });
    });

    describe("circular", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.circular).to.be.false;
      });
    });

    describe("bound", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.bound).to.be.false;
      });
    });

    describe("adaptive", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.adaptive).to.be.false;
      });
    });

    describe("deceleration", () => {
      it("is 0.0075 by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.deceleration).to.equal(0.0075);
      });
    });

    describe("duration", () => {
      it("is 500 by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.duration).to.equal(500);
      });
    });

    describe("easing", () => {
      it("is (x => 1 - (1 - x)^3) by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        const defaultEasing = flicking.easing;

        expect(defaultEasing(0)).to.equal(0);
        expect(defaultEasing(0.5)).to.equal(1 - Math.pow(0.5, 3));
        expect(defaultEasing(1)).to.equal(1);
      });
    });

    describe("inputType", () => {
      it("is ['mouse', 'touch'] by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.inputType).to.deep.equal(["mouse", "touch"]);
      });
    });

    describe("moveType", () => {
      it("is 'snap' by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.moveType).to.equal("snap");
      });
    });

    describe("threshold", () => {
      it("is 40 by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.threshold).to.equal(40);
      });

      it("should change panel when moving above threshold", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 50 });
        const beforeIndex = flicking.index;

        await simulate(flicking.element, { deltaX: -51, duration: 3000 });

        expect(flicking.index).not.to.equal(beforeIndex);
      });

      it("should change panel when moving same as threshold", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 50 });
        const beforeIndex = flicking.index;

        await simulate(flicking.element, { deltaX: -50, duration: 3000 });

        expect(flicking.index).not.to.equal(beforeIndex);
      });

      it("should not change panel when moving below threshold", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 50 });
        const beforeIndex = flicking.index;

        await simulate(flicking.element, { deltaX: -49, duration: 3000 });

        expect(flicking.index).equals(beforeIndex);
      });
    });

    describe("interruptable", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.interruptable).to.be.true;
      });
    });

    describe("bounce", () => {
      it("is '20%' by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.bounce).to.equal("20%");
      });

      it("should limit input to left bounce", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { bounce: 25 });
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
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { bounce: 25, defaultIndex: 2 });
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
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { bounce: 25, horizontal: false });
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
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { bounce: 25, defaultIndex: 2, horizontal: false });
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
      it("is 30 by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.iOSEdgeSwipeThreshold).to.equal(30);
      });
    });

    describe("renderOnlyVisible", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.renderOnlyVisible).to.equal(false);
      });
    });

    describe("autoInit", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.autoInit).to.be.true;
      });

      it("should set initialized to true", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.initialized).to.be.true;
      });

      it("should not set initialized to true when it's set to false", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });

        expect(flicking.initialized).to.be.false;
      });
    });

    describe("autoResize", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.autoResize).to.be.true;
      });

      it("should receive window resize event and emit resize event", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { autoResize: true });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        window.dispatchEvent(new Event("resize"));

        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should not attach resize event until init() is called", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false, autoResize: true });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        window.dispatchEvent(new Event("resize"));
        expect(resizeSpy.called).to.be.false;

        flicking.init(); // resize() called inside, so reset resizeSpy history
        resizeSpy.resetHistory();
        window.dispatchEvent(new Event("resize"));
        expect(resizeSpy.calledOnce).to.be.true;
      });
    });
  });

  describe("Flicking Events", () => {
    describe(EVENTS.READY, () => {
      it("should be emitted when Flicking is initialized", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, {
          autoInit: false
        });
        const readySpy = sinon.spy();
        flicking.on(EVENTS.READY, readySpy);

        expect(readySpy.called).to.be.false;
        flicking.init();
        expect(readySpy.calledOnce).to.be.true;
      });

      it("won't be emitted after Flicking is initialized", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, {
          autoInit: false
        });
        const readySpy = sinon.spy();
        flicking.on(EVENTS.READY, readySpy);

        expect(readySpy.called).to.be.false;
        flicking.init();
        flicking.init();
        flicking.init();
        flicking.init();
        flicking.init();
        expect(readySpy.calledOnce).to.be.true;
      });
    });

    describe(EVENTS.BEFORE_RESIZE, () => {
      it("should be emitted on initialization when resize", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, {
          autoInit: false
        });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.BEFORE_RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        flicking.init();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should be emitted when resize() is called", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.BEFORE_RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        flicking.resize();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should have previous size in it", () => {
        const viewportEl = El.viewport().setWidth(300).setHeight(300).add(El.camera());
        const flicking = createFlicking(viewportEl);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.BEFORE_RESIZE, resizeSpy);

        viewportEl.setWidth(500).setHeight(500);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as BeforeResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.width).to.exist;
        expect(event.height).to.exist;
        expect(event.width).to.equal(300);
        expect(event.height).to.equal(300);
      });

      it(`should be triggered before ${EVENTS.AFTER_RESIZE}`, () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const beforeResizeSpy = sinon.spy();
        const afterResizeSpy = sinon.spy();

        flicking.on(EVENTS.BEFORE_RESIZE, beforeResizeSpy);
        flicking.on(EVENTS.BEFORE_RESIZE, afterResizeSpy);
        flicking.resize();

        expect(beforeResizeSpy.calledOnce).to.be.true;
        expect(afterResizeSpy.calledOnce).to.be.true;
        expect(beforeResizeSpy.calledBefore(afterResizeSpy)).to.be.true;
      });
    });

    describe(EVENTS.AFTER_RESIZE, () => {
      it("should be emitted on initialization when resize", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, {
          autoInit: false
        });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        flicking.init();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should be emitted when resize() is called", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        flicking.resize();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should have new size in it", () => {
        const viewportEl = El.viewport().setWidth(300).setHeight(300).add(El.camera());
        const flicking = createFlicking(viewportEl);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        viewportEl.setWidth(500).setHeight(500);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.width).to.equal(500);
        expect(event.height).to.equal(500);
      });

      it("should have correct size value of viewport in it", () => {
        const viewportSize = {
          width: 500,
          height: 300
        };

        const flicking = createFlicking(
          El.viewport().setWidth(viewportSize.width).setHeight(viewportSize.height).add(
            El.camera(),
          ),
        );
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.width).to.equal(viewportSize.width);
        expect(event.height).to.equal(viewportSize.height);
      });

      it("should have size 0 on initialization", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);
        flicking.init();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.prev.width).to.equal(0);
        expect(event.prev.height).to.equal(0);
      });

      it("should set sizeChanged to true when the size is changed", () => {
        const prevSize = { width: 100, height: 200 };
        const newSize = { width: 530, height: 740 };
        const viewport = El.viewport().add(El.camera());
        viewport.setWidth(prevSize.width).setHeight(prevSize.height);

        const flicking = createFlicking(viewport);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);
        viewport.setWidth(newSize.width).setHeight(newSize.height);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;

        expect(event.width).to.equal(newSize.width);
        expect(event.height).to.equal(newSize.height);
        expect(event.prev.width).to.equal(prevSize.width);
        expect(event.prev.height).to.equal(prevSize.height);
        expect(event.sizeChanged).to.be.true;
      });

      it("should set sizeChanged to false when the size is not changed", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;

        expect(event.width).to.equal(event.prev.width);
        expect(event.height).to.equal(event.prev.height);
        expect(event.width).not.to.equal(0);
        expect(event.height).not.to.equal(0);
        expect(event.sizeChanged).to.be.false;
      });

      it("should provide viewport element in it", () => {
        const viewport = El.viewport().add(El.camera());
        const flicking = createFlicking(viewport);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as AfterResizeEvent;
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.element).to.deep.equal(viewport.el);
      });
    });

    describe("Input & Move Event Order", () => {
      const eventsFired: string[] = [];
      const attachEventOrderRecognizer = (flicking: Flicking) => {
        [EVENTS.HOLD_START, EVENTS.HOLD_END, EVENTS.MOVE_START, EVENTS.MOVE, EVENTS.MOVE_END, EVENTS.WILL_CHANGE, EVENTS.WILL_RESTORE].forEach(event => {
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

      it(`should be ${EVENTS.HOLD_START} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.HOLD_END} -> ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when panel changed with user input`, async () => {
        const expectedEventOrder = [
          EVENTS.HOLD_START,
          EVENTS.MOVE_START,
          EVENTS.MOVE,
          EVENTS.HOLD_END,
          EVENTS.WILL_CHANGE,
          EVENTS.MOVE,
          EVENTS.MOVE_END
        ];

        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 10 });
        attachEventOrderRecognizer(flicking);

        await simulate(flicking.element, { deltaX: -50 });

        expect(eventsFired).to.deep.equal(expectedEventOrder);
      });

      it(`should be ${EVENTS.HOLD_START} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.HOLD_END} -> ${EVENTS.WILL_RESTORE} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when panel restored with user input`, async () => {
        const expectedEventOrder = [
          EVENTS.HOLD_START,
          EVENTS.MOVE_START,
          EVENTS.MOVE,
          EVENTS.HOLD_END,
          EVENTS.WILL_RESTORE,
          EVENTS.MOVE,
          EVENTS.MOVE_END
        ];

        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 50 });
        attachEventOrderRecognizer(flicking);

        await simulate(flicking.element, { deltaX: -49 });

        expect(eventsFired).to.deep.equal(expectedEventOrder);
      });

      describe("moveTo's event order", () => {
        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method`, () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
          attachEventOrderRecognizer(flicking);

          void flicking.moveTo(2, 10);
          tick(1000);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });

        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method and duration is 0`, () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
          attachEventOrderRecognizer(flicking);

          void flicking.moveTo(2, 0);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });
      });

      describe("prev's event order", () => {
        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method`, () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });
          attachEventOrderRecognizer(flicking);

          void flicking.prev(10);
          tick(1000);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });

        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method and duration is 0`, () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });
          attachEventOrderRecognizer(flicking);

          void flicking.prev(0);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });
      });

      describe("next's event order", () => {
        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method`, () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
          attachEventOrderRecognizer(flicking);

          void flicking.next(10);
          tick(1000);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });

        it(`should be ${EVENTS.WILL_CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method and duration is 0`, () => {
          const expectedEventOrder = [
            EVENTS.WILL_CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
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
        it(`is always ${DIRECTION.NEXT} when calling next()`, () => {
          const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
          collectEvents(flicking);

          void flicking.next(100);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.NEXT)).to.be.true;
        });

        it(`is always ${DIRECTION.PREV} when calling prev()`, () => {
          const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });
          collectEvents(flicking);

          void flicking.prev(100);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.PREV)).to.be.true;
        });

        it(`is always ${DIRECTION.NEXT} when moving to next panel with user input, not going over current panel area`, async () => {
          const flicking = createFlicking(El.DEFAULT_HORIZONTAL, {
            align: ALIGN.CENTER,
            threshold: 10
          });
          collectEvents(flicking);

          await simulate(flicking.element, { deltaX: -20 });

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.NEXT)).to.be.true;
        });

        it(`is always ${DIRECTION.PREV} when moving to next panel with user input, not going over current panel area`, async () => {
          const flicking = createFlicking(El.DEFAULT_HORIZONTAL, {
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
        it("is always false in events triggered by next()", () => {
          const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
          collectEvents(flicking);

          void flicking.next(500);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.isTrusted != null).every(e => e.isTrusted === false)).to.be.true;
        });

        it("is always false in events triggered by prev()", () => {
          const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });
          collectEvents(flicking);

          void flicking.prev(500);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.isTrusted != null).every(e => e.isTrusted === false)).to.be.true;
        });

        it("is always true in events triggered by user input", async () => {
          const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 10 });
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
      it("should set initialized to true", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });

        expect(flicking.initialized).to.be.false;
        flicking.init();
        expect(flicking.initialized).to.be.true;
      });

      it("should call init of the camera/renderer/control", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
        const controlSpy = sinon.spy(flicking.control, "init");
        const cameraSpy = sinon.spy(flicking.camera, "init");
        const rendererSpy = sinon.spy(flicking.renderer, "init");

        flicking.init();

        expect(controlSpy.calledOnce).to.be.true;
        expect(cameraSpy.calledOnce).to.be.true;
        expect(rendererSpy.calledOnce).to.be.true;
      });

      it("should call resize of it", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
        const resizeSpy = sinon.spy(flicking, "resize");

        flicking.init();

        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should move to default index", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false, defaultIndex: 1 });

        const beforeIdx = flicking.index;
        flicking.init();
        const afterIdx = flicking.index;

        expect(beforeIdx).to.equal(-1);
        expect(afterIdx).to.equal(1);
      });
    });

    describe("destroy", () => {
      it("should set initialized to false", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: true });

        expect(flicking.initialized).to.be.true;
        flicking.destroy();
        expect(flicking.initialized).to.be.false;
      });

      it("should remove window resize event handler", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false, autoResize: false });
        const resizeSpy = sinon.spy(flicking, "resize");
        flicking.autoResize = true;
        flicking.init();

        resizeSpy.resetHistory();
        flicking.destroy();

        window.dispatchEvent(new Event("resize"));
        expect(resizeSpy.called).to.be.false;
      });

      it("should call off of it", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const offSpy = sinon.spy(flicking, "off");

        flicking.destroy();

        expect(offSpy.calledOnce).to.be.true;
      });

      it("should call destroy of the control/camera/renderer", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
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
      it("should return viewport element", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.element).to.be.an.instanceOf(HTMLElement);
        expect(flicking.element).to.equal(flicking.viewport.element);
      });
    });

    describe("enableInput()", () => {
      it("should enable input", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { threshold: 40 });
        flicking.disableInput();

        flicking.enableInput();
        const beforeIdx = flicking.index;
        await simulate(flicking.element, { deltaX: -100 });
        const afterIdx = flicking.index;

        expect(beforeIdx).to.equal(0);
        expect(afterIdx).to.equal(1);
      });

      it("should return this", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const returnVal = flicking.enableInput();

        expect(returnVal).deep.equals(flicking);
      });
    });

    describe("disableInput()", () => {
      it("should disable input", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        flicking.disableInput();

        const beforeIdx = flicking.index;
        await simulate(flicking.element, { deltaX: -100 });
        const afterIdx = flicking.index;

        expect(beforeIdx).to.equal(afterIdx);
        expect(beforeIdx).to.equal(0);
      });

      it("should return this", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
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
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        const prevIndex = flicking.index;
        await next(flicking);
        const nextIndex = flicking.index;

        expect(prevIndex).to.equal(0);
        expect(nextIndex).to.equal(1);
      });

      it("should use the Flicking's current duration option value if the duration is not given", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { duration: 1000 });
        const moveToSpy = sinon.spy(flicking.control, "moveToPanel");

        await next(flicking);
        flicking.duration = 2000;

        console.log(flicking.control.controller.axes.hasOn("finish"));
        await next(flicking);

        expect(moveToSpy.calledTwice).to.be.true;
        expect(moveToSpy.firstCall.calledWith(flicking.getPanel(1), 1000)).to.be.true;
        expect(moveToSpy.secondCall.calledWith(flicking.getPanel(2), 2000)).to.be.true;
      });

      it("should throw FlickingError with code INDEX_OUT_OF_RANGE if called on the last index", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });

        const err = await next(flicking).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.INDEX_OUT_OF_RANGE);
      });

      it("should throw FlickingError with code ANIMATION_ALREADY_PLAYING if it is animating", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        void simulate(flicking.element, { duration: 1000 }, 500);
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
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });

        const prevIndex = flicking.index;
        await prev(flicking);
        const nextIndex = flicking.index;

        expect(prevIndex).to.equal(2);
        expect(nextIndex).to.equal(1);
      });

      it("should use the Flicking's current duration option value if the duration is not given", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { duration: 1000, defaultIndex: 2 });
        const moveToSpy = sinon.spy(flicking.control, "moveToPanel");

        await prev(flicking);
        flicking.duration = 2000;
        await prev(flicking);

        expect(moveToSpy.calledTwice).to.be.true;
        expect(moveToSpy.firstCall.calledWith(flicking.getPanel(1), 1000)).to.be.true;
        expect(moveToSpy.secondCall.calledWith(flicking.getPanel(0), 2000)).to.be.true;
      });

      it("should throw FlickingError with code INDEX_OUT_OF_RANGE if called on the first index", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 0 });

        const err = await prev(flicking).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.INDEX_OUT_OF_RANGE);
      });

      it("should throw FlickingError with code ANIMATION_ALREADY_PLAYING if it is animating", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });

        void simulate(flicking.element, { duration: 1000 }, 500);
        const err = await prev(flicking).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.ANIMATION_ALREADY_PLAYING);
      });
    });

    describe("moveTo", () => {
      const prev = async (flicking: Flicking) => {
        const nextPromise = flicking.prev();
        tick(10000);
        return nextPromise;
      };

      it("should move to the previous panel that has index - 1", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });

        const prevIndex = flicking.index;
        await prev(flicking);
        const nextIndex = flicking.index;

        expect(prevIndex).to.equal(2);
        expect(nextIndex).to.equal(1);
      });

      it("should throw FlickingError with code INDEX_OUT_OF_RANGE if called on the first index", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 0 });

        const err = await prev(flicking).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.INDEX_OUT_OF_RANGE);
      });

      it("should throw FlickingError with code ANIMATION_ALREADY_PLAYING if it is animating", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { defaultIndex: 2 });

        void simulate(flicking.element, { duration: 1000 }, 500);
        const err = await prev(flicking).catch(e => e);

        expect(err)
          .to.be.instanceOf(FlickingError)
          .with.property("code", ERROR.CODE.ANIMATION_ALREADY_PLAYING);
      });
    });
  });
});

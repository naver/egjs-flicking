import FlickingError from "~/core/FlickingError";
import Viewport from "~/core/Viewport";
import Flicking from "~/Flicking";
import * as ERROR from "~/const/error";
import { ALIGN, DIRECTION, EVENTS } from "~/const/external";
import { AfterResizeEvent, BeforeResizeEvent } from "~/types";

import El from "./helper/El";
import { cleanup, createFlicking, simulate, tick } from "./helper/test-util";

describe("Flicking", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Initializing with correct structure", () => {
    it("can be created", () => {
      expect(() => {
        createFlicking(El.DEFAULT_STRUCTURE);
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
  });

  describe("Properties", () => {
    describe("viewport", () => {
      it("exists when the flicking is created", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        expect(flicking.viewport).to.exist;
        expect(flicking.viewport).to.be.an.instanceof(Viewport);
      });
    });
  });

  describe("Options", () => {
    describe("align", () => {
      it("is center by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        expect(flicking.align).to.equal(ALIGN.CENTER);
      });

      it("should override renderer & camera's align", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          align: ALIGN.NEXT
        });

        expect(flicking.align).equals(ALIGN.NEXT);
        expect(flicking.renderer.align).equals(ALIGN.NEXT);
        expect(flicking.camera.align).equals(ALIGN.NEXT);
      });

      it("can be changed at anytime", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
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
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        expect(flicking.defaultIndex).to.equal(0);
      });

      it("should accept any number, even if it's bigger than actual panel length", () => {
        // Empty flicking
        const flicking = createFlicking(El.viewport().add(El.camera()), { defaultIndex: 2 });
        expect(flicking.renderer.getPanels().length).to.equal(0);
        expect(flicking.defaultIndex).to.equal(2);
      });

      it("should locate camera at position of panel which has index equal to defaultIndex", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { defaultIndex: 1 });
        expect(flicking.camera.position).not.to.equal(0);
        expect(flicking.camera.position).to.equal(flicking.renderer.getPanel(1).position);
      });

      it("should locate camera at first panel's position instead if index is out of range", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { defaultIndex: 99999 });
        expect(flicking.camera.position).to.equal(flicking.renderer.getPanel(0).position);
      });
    });

    describe("horizontal", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.horizontal).to.be.true;
      });

      it("can be changed on creating new instance", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          horizontal: false
        });

        expect(flicking.horizontal).to.be.false;
      });

      it("can be changed anytime", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          horizontal: true
        });

        flicking.horizontal = false;

        expect(flicking.horizontal).to.be.false;
      });
    });

    describe("circular", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.circular).to.be.false;
      });
    });

    describe("bound", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.bound).to.be.false;
      });
    });

    describe("adaptive", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.adaptive).to.be.false;
      });
    });

    describe("deceleration", () => {
      it("is 0.0075 by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.deceleration).to.equal(0.0075);
      });
    });

    describe("duration", () => {
      it("is 500 by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.duration).to.equal(500);
      });
    });

    describe("easing", () => {

    });

    describe("inputType", () => {
      it("is ['mouse', 'touch'] by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.inputType).to.deep.equal(["mouse", "touch"]);
      });
    });

    describe("moveType", () => {
      it("is 'snap' by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.moveType).to.equal("snap");
      });
    });

    describe("threshold", () => {
      it("is 40 by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.threshold).to.equal(40);
      });
    });

    describe("interruptable", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.interruptable).to.be.true;
      });
    });

    describe("bounce", () => {
      it("is '50%' by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.bounce).to.equal("50%");
      });
    });

    describe("iOSEdgeSwipeThreshold", () => {
      it("is 30 by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.iOSEdgeSwipeThreshold).to.equal(30);
      });
    });

    describe("isEqualSize", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isEqualSize).to.equal(false);
      });
    });

    describe("isConstantSize", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isConstantSize).to.equal(false);
      });
    });

    describe("renderOnlyVisible", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.renderOnlyVisible).to.equal(false);
      });
    });

    describe("autoInit", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.autoInit).to.be.true;
      });

      it("should set initialized to true", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.initialized).to.be.true;
      });

      it("should not set initialized to true when it's set to false", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: false });

        expect(flicking.initialized).to.be.false;
      });
    });

    describe("autoResize", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.autoResize).to.be.true;
      });

      it("should receive window resize event and emit resize event", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoResize: true });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        window.dispatchEvent(new Event("resize"));

        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should not attach resize event until init() is called", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: false, autoResize: true });
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
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          autoInit: false
        });
        const readySpy = sinon.spy();
        flicking.on(EVENTS.READY, readySpy);

        expect(readySpy.called).to.be.false;
        flicking.init();
        expect(readySpy.calledOnce).to.be.true;
      });

      it("won't be emitted after Flicking is initialized", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
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
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          autoInit: false
        });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.BEFORE_RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        flicking.init();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should be emitted when resize() is called", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
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
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
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
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          autoInit: false
        });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.AFTER_RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        flicking.init();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should be emitted when resize() is called", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
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
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: false });
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
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
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
        [EVENTS.HOLD_START, EVENTS.HOLD_END, EVENTS.MOVE_START, EVENTS.MOVE, EVENTS.MOVE_END, EVENTS.CHANGE, EVENTS.RESTORE].forEach(event => {
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

      it(`should be ${EVENTS.HOLD_START} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.HOLD_END} -> ${EVENTS.CHANGE} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when panel changed with user input`, async () => {
        const expectedEventOrder = [
          EVENTS.HOLD_START,
          EVENTS.MOVE_START,
          EVENTS.MOVE,
          EVENTS.HOLD_END,
          EVENTS.CHANGE,
          EVENTS.MOVE,
          EVENTS.MOVE_END
        ];

        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { threshold: 10 });
        attachEventOrderRecognizer(flicking);

        await simulate(flicking.getElement(), { deltaX: -50 });

        expect(eventsFired).to.deep.equal(expectedEventOrder);
      });

      it(`should be ${EVENTS.HOLD_START} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.HOLD_END} -> ${EVENTS.RESTORE} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when panel restored with user input`, async () => {
        const expectedEventOrder = [
          EVENTS.HOLD_START,
          EVENTS.MOVE_START,
          EVENTS.MOVE,
          EVENTS.HOLD_END,
          EVENTS.RESTORE,
          EVENTS.MOVE,
          EVENTS.MOVE_END
        ];

        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { threshold: 50 });
        attachEventOrderRecognizer(flicking);

        await simulate(flicking.getElement(), { deltaX: -49 });

        expect(eventsFired).to.deep.equal(expectedEventOrder);
      });

      describe("moveTo's event order", () => {
        it(`should be ${EVENTS.CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method`, () => {
          const expectedEventOrder = [
            EVENTS.CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_STRUCTURE);
          attachEventOrderRecognizer(flicking);

          void flicking.moveTo(2, 10);
          tick(1000);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });

        it(`should be ${EVENTS.CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method and duration is 0`, () => {
          const expectedEventOrder = [
            EVENTS.CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_STRUCTURE);
          attachEventOrderRecognizer(flicking);

          void flicking.moveTo(2, 0);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });
      });

      describe("prev's event order", () => {
        it(`should be ${EVENTS.CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method`, () => {
          const expectedEventOrder = [
            EVENTS.CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_STRUCTURE, { defaultIndex: 2 });
          attachEventOrderRecognizer(flicking);

          void flicking.prev(10);
          tick(1000);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });

        it(`should be ${EVENTS.CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method and duration is 0`, () => {
          const expectedEventOrder = [
            EVENTS.CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_STRUCTURE, { defaultIndex: 2 });
          attachEventOrderRecognizer(flicking);

          void flicking.prev(0);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });
      });

      describe("next's event order", () => {
        it(`should be ${EVENTS.CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method`, () => {
          const expectedEventOrder = [
            EVENTS.CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_STRUCTURE);
          attachEventOrderRecognizer(flicking);

          void flicking.next(10);
          tick(1000);

          expect(eventsFired).to.deep.equal(expectedEventOrder);
        });

        it(`should be ${EVENTS.CHANGE} -> ${EVENTS.MOVE_START} -> ${EVENTS.MOVE} -> ${EVENTS.MOVE_END} when called with method and duration is 0`, () => {
          const expectedEventOrder = [
            EVENTS.CHANGE,
            EVENTS.MOVE_START,
            EVENTS.MOVE,
            EVENTS.MOVE_END
          ];

          const flicking = createFlicking(El.DEFAULT_STRUCTURE);
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
          const flicking = createFlicking(El.DEFAULT_STRUCTURE);
          collectEvents(flicking);

          void flicking.next(100);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.NEXT)).to.be.true;
        });

        it(`is always ${DIRECTION.PREV} when calling prev()`, () => {
          const flicking = createFlicking(El.DEFAULT_STRUCTURE, { defaultIndex: 2 });
          collectEvents(flicking);

          void flicking.prev(100);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.PREV)).to.be.true;
        });

        it(`is always ${DIRECTION.NEXT} when moving to next panel with user input, not going over current panel area`, async () => {
          const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
            align: ALIGN.CENTER,
            threshold: 10
          });
          collectEvents(flicking);

          await simulate(flicking.getElement(), { deltaX: -20 });

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.NEXT)).to.be.true;
        });

        it(`is always ${DIRECTION.PREV} when moving to next panel with user input, not going over current panel area`, async () => {
          const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
            align: ALIGN.CENTER,
            threshold: 10,
            defaultIndex: 2
          });
          collectEvents(flicking);

          await simulate(flicking.getElement(), { deltaX: 20 });

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.direction).every(e => e.direction === DIRECTION.PREV)).to.be.true;
        });
      });

      describe("isTrusted", () => {
        it("is always false in events triggered by next()", () => {
          const flicking = createFlicking(El.DEFAULT_STRUCTURE);
          collectEvents(flicking);

          void flicking.next(500);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.isTrusted != null).every(e => e.isTrusted === false)).to.be.true;
        });

        it("is always false in events triggered by prev()", () => {
          const flicking = createFlicking(El.DEFAULT_STRUCTURE, { defaultIndex: 2 });
          collectEvents(flicking);

          void flicking.prev(500);
          tick(1000);

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.isTrusted != null).every(e => e.isTrusted === false)).to.be.true;
        });

        it("is always true in events triggered by user input", async () => {
          const flicking = createFlicking(El.DEFAULT_STRUCTURE, { threshold: 10 });
          collectEvents(flicking);

          await simulate(flicking.getElement(), { deltaX: -20 });

          expect(eventsFired).not.to.be.empty;
          expect(eventsFired.filter(e => e.isTrusted != null).every(e => e.isTrusted === true)).to.be.true;
        });
      });
    });
  });

  describe("Methods", () => {
    describe("destroy", () => {
      it("should set initialized to false", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: true });

        expect(flicking.initialized).to.be.true;
        flicking.destroy();
        expect(flicking.initialized).to.be.false;
      });

      it("should remove window resize event handler", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: false, autoResize: false });
        const resizeSpy = sinon.spy();
        flicking.resize = resizeSpy;
        flicking.autoResize = true;
        flicking.init();

        resizeSpy.resetHistory();
        flicking.destroy();

        window.dispatchEvent(new Event("resize"));
        expect(resizeSpy.called).to.be.false;
      });
    });
  });
});

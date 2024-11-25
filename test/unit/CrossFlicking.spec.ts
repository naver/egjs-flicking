import { SIDE_EVENTS } from "~/CrossFlicking";
import El from "./helper/El";
import { cleanup, createCrossFlicking, simulate, tick } from "./helper/test-util";

describe("CrossFlicking", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Initializing with correct structure", () => {
    it("can be created", async () => {
      const err = await createCrossFlicking(El.DEFAULT_CROSS).then(() => null).catch(e => e);
      expect(err).to.be.null;
    });
  });

  describe("Options", () => {
    describe("sideOptions", () => {
      it("should apply sideOptions to side flicking instances.", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          sideOptions: {
            preventClickOnDrag: true,
            duration: 3000
          }
        });

        expect(flicking.sideFlicking[2].preventClickOnDrag).to.equal(true);
        expect(flicking.sideFlicking[2].duration).to.equal(3000);
      });
    });

    describe("preserveIndex", () => {
      it("is true by default", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS);

        expect(flicking.preserveIndex).to.equal(true);
      });

      it("should preserve index of previous side flicking when preserveIndex is true", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS,{
          preserveIndex: true
        });
        void flicking.sideFlicking[0].moveTo(1, 0);
        void flicking.moveTo(1, 0);
        tick(100);

        expect(flicking.index).to.equal(1);
        expect(flicking.sideFlicking[0].index).to.equal(1);
      });

      it("should reset index of previous side flicking when preserveIndex is false", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS,{
          preserveIndex: false
        });
        void flicking.sideFlicking[0].moveTo(1, 0);
        void flicking.moveTo(1, 0);
        tick(100);

        expect(flicking.index).to.equal(1);
        expect(flicking.sideFlicking[0].index).to.equal(0);
      });
    });

    describe("disableSlideOnHold", () => {
      it("is true by default", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS);

        expect(flicking.disableSlideOnHold).to.equal(true);
      });

      it("should prevent side flicking from dragging while the main flicking is being dragged when disableSlideOnHold is true", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          disableSlideOnHold: true
        });

        const moveSpy = sinon.spy();
        const sidemoveSpy = sinon.spy();
        flicking.on("move", moveSpy);
        flicking.sideFlicking[0].on("move", sidemoveSpy);

        await simulate(flicking.sideFlicking[0].element, { deltaX: -200, deltaY: -300, duration: 300 });

        expect(moveSpy.called).to.be.false;
        expect(sidemoveSpy.called).to.be.true;
      });

      it("should allow side flicking from dragging while the main flicking is being dragged when disableSlideOnHold is false", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          disableSlideOnHold: false
        });

        const moveSpy = sinon.spy();
        const sidemoveSpy = sinon.spy();
        flicking.on("move", moveSpy);
        flicking.sideFlicking[0].on("move", sidemoveSpy);

        await simulate(flicking.sideFlicking[0].element, { deltaX: -200, deltaY: -300, duration: 300 });

        expect(moveSpy.called).to.be.true;
        expect(sidemoveSpy.called).to.be.true;
      });
    });

    describe("disableIndexSync", () => {
      it("is false by default", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS);

        expect(flicking.disableIndexSync).to.equal(false);
      });

      it("should not change index of main flicking from index of side flicking when disableIndexSync is true", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          disableIndexSync: true
        });
        void flicking.sideFlicking[0].moveTo(5, 0);
        tick(100);

        expect(flicking.index).to.equal(0);
        expect(flicking.sideFlicking[0].index).to.equal(5);
        expect(flicking.sideFlicking[1].index).to.equal(3);
      });
    });
  });

  describe("Events", () => {
    describe(SIDE_EVENTS.HOLD_START, () => {
      it("should be emitted when Flicking is initialized", async () => {
      });
    });
    describe(SIDE_EVENTS.HOLD_END, () => {
      it("should be emitted when Flicking is initialized", async () => {
      });
    });
    describe(SIDE_EVENTS.MOVE_START, () => {
      it("should be emitted when Flicking is initialized", async () => {
      });
    });
    describe(SIDE_EVENTS.MOVE, () => {
      it("should be emitted when Flicking is initialized", async () => {
      });
    });
    describe(SIDE_EVENTS.MOVE_END, () => {
      it("should be emitted when Flicking is initialized", async () => {
      });
    });
    describe(SIDE_EVENTS.WILL_CHANGE, () => {
      it("should be emitted when Flicking is initialized", async () => {
      });
    });
    describe(SIDE_EVENTS.CHANGED, () => {
      it("should be emitted when Flicking is initialized", async () => {
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

    describe(EVENTS.WILL_CHANGE, () => {
      it("can be stopped", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        let willChangePosition = 0;

        flicking.on(EVENTS.WILL_CHANGE, evt => {
          willChangePosition = flicking.camera.position;
          evt.stop();
        });
        await simulate(flicking.element, { deltaX: -300 });

        expect(willChangePosition).not.to.equal(0);
        expect(flicking.control.controller.position).to.equal(willChangePosition);
      });
    });

    describe(EVENTS.WILL_RESTORE, () => {
      it("can be stopped", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        let willChangePosition = 0;

        flicking.on(EVENTS.WILL_RESTORE, evt => {
          willChangePosition = flicking.camera.position;
          evt.stop();
        });
        await simulate(flicking.element, { deltaX: -10 });

        expect(willChangePosition).not.to.equal(0);
        expect(flicking.control.controller.position).to.equal(willChangePosition);
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

  describe("Key Features", () => {
    it("should change index of main flicking from index of side flicking", async () => {
      const flicking = await createCrossFlicking(El.DEFAULT_CROSS);
      void flicking.sideFlicking[0].moveTo(5, 0);
      tick(100);

      expect(flicking.index).to.equal(1);
      expect(flicking.sideFlicking[0].index).to.equal(2);
      expect(flicking.sideFlicking[1].index).to.equal(5);
    });
  });
});

import { vi } from "vitest";
import { SIDE_EVENTS } from "~/CrossFlicking";
import El from "./helper/El";
import { cleanup, createCrossFlicking, simulate } from "./helper/test-util";

describe("CrossFlicking", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Initializing with correct structure", () => {
    it("can be created", async () => {
      const err = await createCrossFlicking(El.DEFAULT_CROSS)
        .then(() => null)
        .catch(e => e);
      expect(err).toBeNull();
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

        expect(flicking.sideFlicking[2].preventClickOnDrag).toBe(true);
        expect(flicking.sideFlicking[2].duration).toBe(3000);
      });
    });

    describe("preserveIndex", () => {
      it("is true by default", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS);

        expect(flicking.preserveIndex).toBe(true);
      });

      it("should preserve index of previous side flicking when preserveIndex is true", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          preserveIndex: true
        });
        // Sequential: let side complete first (triggers _syncToCategory which moves main),
        // then explicitly move main, then flush all remaining timers for _setPreviousSideIndex rAF.
        void flicking.sideFlicking[0].moveTo(1, 0);
        await vi.runAllTimersAsync();
        void flicking.moveTo(1, 0);
        await vi.runAllTimersAsync();

        expect(flicking.index).toBe(1);
        expect(flicking.sideFlicking[0].index).toBe(1);
      });

      it("should reset index of previous side flicking when preserveIndex is false", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          preserveIndex: false
        });
        // Move side 0 to index 1 (within its range)
        void flicking.sideFlicking[0].moveTo(1, 0);
        await vi.runAllTimersAsync();
        // Move main to panel 1 (making side 0 inactive)
        void flicking.moveTo(1, 0);
        await vi.runAllTimersAsync();

        expect(flicking.index).toBe(1);
        expect(flicking.sideFlicking[0].index).toBe(0);
      });
    });

    describe("disableSlideOnHold", () => {
      it("is true by default", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS);

        expect(flicking.disableSlideOnHold).toBe(true);
      });

      it("should prevent side flicking from dragging while the main flicking is being dragged when disableSlideOnHold is true", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          disableSlideOnHold: true
        });

        const moveSpy = vi.fn();
        const sidemoveSpy = vi.fn();
        flicking.on("move", moveSpy);
        flicking.sideFlicking[0].on("move", sidemoveSpy);

        await simulate(flicking.sideFlicking[0].element, { deltaX: -200, deltaY: -300, duration: 300 });

        expect(moveSpy).not.toHaveBeenCalled();
        expect(sidemoveSpy).toHaveBeenCalled();
      });

      it("should allow side flicking from dragging while the main flicking is being dragged when disableSlideOnHold is false", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          disableSlideOnHold: false
        });

        const moveSpy = vi.fn();
        const sidemoveSpy = vi.fn();
        flicking.on("move", moveSpy);
        flicking.sideFlicking[0].on("move", sidemoveSpy);

        await simulate(flicking.sideFlicking[0].element, { deltaX: -200, deltaY: -300, duration: 300 });

        expect(moveSpy).toHaveBeenCalled();
        expect(sidemoveSpy).toHaveBeenCalled();
      });
    });

    describe("disableIndexSync", () => {
      it("is false by default", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS);

        expect(flicking.disableIndexSync).toBe(false);
      });

      it("should not change index of main flicking from index of side flicking when disableIndexSync is true", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          disableIndexSync: true
        });
        void flicking.sideFlicking[0].moveTo(5, 0);
        await vi.advanceTimersByTimeAsync(100);

        expect(flicking.index).toBe(0);
        expect(flicking.sideFlicking[0].index).toBe(5);
        expect(flicking.sideFlicking[1].index).toBe(3);
      });
    });
  });

  describe("Events", () => {
    describe("Side Flicking Input & Move Event Order", () => {
      const eventsFired: string[] = [];
      const attachEventOrderRecognizer = flicking => {
        [
          SIDE_EVENTS.HOLD_START,
          SIDE_EVENTS.HOLD_END,
          SIDE_EVENTS.MOVE_START,
          SIDE_EVENTS.MOVE,
          SIDE_EVENTS.MOVE_END,
          SIDE_EVENTS.WILL_CHANGE,
          SIDE_EVENTS.WILL_RESTORE,
          SIDE_EVENTS.CHANGED,
          SIDE_EVENTS.RESTORED
        ].forEach(event => {
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

      it(`should be ${SIDE_EVENTS.HOLD_START} -> ${SIDE_EVENTS.MOVE_START} -> ${SIDE_EVENTS.MOVE} -> ${SIDE_EVENTS.HOLD_END} -> ${SIDE_EVENTS.WILL_CHANGE} -> ${SIDE_EVENTS.MOVE} -> ${SIDE_EVENTS.MOVE_END} -> ${SIDE_EVENTS.CHANGED} when panel changed with user input`, async () => {
        const expectedEventOrder = [
          SIDE_EVENTS.HOLD_START,
          SIDE_EVENTS.MOVE_START,
          SIDE_EVENTS.MOVE,
          SIDE_EVENTS.HOLD_END,
          SIDE_EVENTS.WILL_CHANGE,
          SIDE_EVENTS.MOVE,
          SIDE_EVENTS.MOVE_END,
          SIDE_EVENTS.CHANGED
        ];

        const flicking = await createCrossFlicking(El.DEFAULT_CROSS);
        attachEventOrderRecognizer(flicking);

        await simulate(flicking.sideFlicking[0].element, { deltaY: -300, duration: 300 });

        expect(eventsFired).toEqual(expectedEventOrder);
      });
    });
  });

  describe("Key Features", () => {
    it("should change index of main flicking from index of side flicking", async () => {
      const flicking = await createCrossFlicking(El.DEFAULT_CROSS);

      void flicking.sideFlicking[0].moveTo(5, 0);
      await vi.advanceTimersByTimeAsync(100);

      expect(flicking.index).toBe(1);
      expect(flicking.sideFlicking[0].index).toBe(2);
      expect(flicking.sideFlicking[1].index).toBe(5);
    });
  });
});

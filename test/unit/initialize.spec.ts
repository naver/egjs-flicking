import Flicking from "../../src/Flicking";
import { DEFAULT_OPTIONS } from "../../src/consts";
import { FlickingEvent, FlickingPanel } from "../../src/types";
import { horizontal, vertical } from "./assets/fixture";
import { createFlicking, cleanup, simulate, waitFor, waitEvent } from "./assets/utils";
import { EVENTS } from "../../src/consts";

const defaultClassPrefix = DEFAULT_OPTIONS.classPrefix;

describe("Initialization", () => {
  let flickingInfo: {
    element: HTMLElement,
    instance: Flicking,
    events: FlickingEvent[],
    eventFired: string[],
    eventDirection: string[],
  };

  describe("Check specifications in initialization process", () => {
    afterEach(() => cleanup());

    it("should have VERSION string", () => {
      expect(Flicking.VERSION).not.to.be.undefined;
    });

    it("should have viewport & camera element automatically generated", () => {
      flickingInfo = createFlicking(horizontal.full);

      const flickingElement = flickingInfo.element;
      const viewportElement = flickingElement.querySelector(".eg-flick-viewport");
      const cameraElement = flickingElement.querySelector(".eg-flick-camera");

      expect(viewportElement).not.to.be.null;
      expect(cameraElement).not.to.be.null;
    });

    it("should clamp default index in viable range", () => {
      flickingInfo = createFlicking(horizontal.full, { defaultIndex: 3 });
      expect(flickingInfo.instance.getIndex()).equals(2);

      flickingInfo = createFlicking(horizontal.full, { defaultIndex: -1 });
      expect(flickingInfo.instance.getIndex()).equals(0);
    });

    it("should throw error when no element is given", () => {
      expect(() => new Flicking("#NO-ELEMENT")).to.throw(Error);
    });

    it("can initialize using existing viewport element", () => {
      // Given
      /* NOTHING */

      // When
      flickingInfo = createFlicking(horizontal.hasViewport);

      // Then
      const flickingWrapper = flickingInfo.instance.getElement();
      const viewportElements = flickingWrapper.querySelectorAll(`.${defaultClassPrefix}-viewport`);
      const cameraElements = flickingWrapper.querySelectorAll(`.${defaultClassPrefix}-camera`);

      expect(viewportElements.length).equals(1);
      expect(cameraElements.length).equals(1);
      expect(cameraElements[0].parentElement).equals(viewportElements[0]);
    });

    it("can initialize using existing camera element", () => {
      // Given
      /* NOTHING */

      // When
      flickingInfo = createFlicking(horizontal.hasCamera);

      // Then
      const flickingWrapper = flickingInfo.instance.getElement();
      const viewportElements = flickingWrapper.querySelectorAll(`.${defaultClassPrefix}-viewport`);
      const cameraElements = flickingWrapper.querySelectorAll(`.${defaultClassPrefix}-camera`);

      expect(viewportElements.length).equals(1);
      expect(cameraElements.length).equals(1);
      expect(cameraElements[0].parentElement).equals(viewportElements[0]);
    });

    it("can initialize using existing both viewport and camera element", () => {
      // Given
      /* NOTHING */

      // When
      flickingInfo = createFlicking(horizontal.hasViewportCamera);

      // Then
      const flickingWrapper = flickingInfo.instance.getElement();
      const viewportElements = flickingWrapper.querySelectorAll(`.${defaultClassPrefix}-viewport`);
      const cameraElements = flickingWrapper.querySelectorAll(`.${defaultClassPrefix}-camera`);

      expect(viewportElements.length).equals(1);
      expect(cameraElements.length).equals(1);
      expect(cameraElements[0].parentElement).equals(viewportElements[0]);
    });
  });

  describe("circular", () => {
    afterEach(() => cleanup());

    it("should not clone panels in non-circular, horizontal mode", () => {
      flickingInfo = createFlicking(horizontal.shouldClone4);

      const panelElements = flickingInfo.element.querySelectorAll(".eg-flick-panel");

      expect(panelElements.length).equals(2);
    });

    it("should clone panels needed in circular, horizontal mode", () => {
      flickingInfo = createFlicking(horizontal.shouldClone4, { circular: true });

      const panelElements = flickingInfo.element.querySelectorAll(".eg-flick-panel");

      expect(panelElements.length).equals(6);
    });

    it("should not clone panels in non-circular, vertical mode", () => {
      flickingInfo = createFlicking(vertical.shouldClone4, {
        horizontal: false,
      });

      const panelElements = flickingInfo.element.querySelectorAll(".eg-flick-panel");

      expect(panelElements.length).equals(2);
    });

    it("should clone panels needed in circular, vertical mode", () => {
      flickingInfo = createFlicking(vertical.shouldClone4, {
        horizontal: false,
        circular: true,
      });

      const panelElements = flickingInfo.element.querySelectorAll(".eg-flick-panel");

      expect(panelElements.length).equals(6);
    });
  });

  describe("bounce", () => {
    let range = [0, 0];
    let depaPos = 0;

    const setEventHandler = () => {
      flickingInfo.instance.on(EVENTS.HOLD_END, e => {
        depaPos = e.axesEvent.depaPos.flick;
        range = e.axesEvent.input.observer.axm.axis.flick.range;
      });
    };
    afterEach(() => cleanup());

    it("has correct left bounce", async () => {
      const bounceVal = 25;
      flickingInfo = createFlicking(horizontal.full, {
        bounce: [bounceVal, 0],
      });
      setEventHandler();

      await simulate(flickingInfo.element, {
        pos: [0, 0],
        deltaX: 250,
        deltaY: 0,
      });

      expect(depaPos).equals(-bounceVal);
    });

    it("has correct right bounce", async () => {
      const bounceVal = 25;
      flickingInfo = createFlicking(horizontal.full, {
        bounce: [0, bounceVal],
        defaultIndex: 2,
      });
      setEventHandler();

      await simulate(flickingInfo.element, {
        pos: [0, 0],
        deltaX: -250,
        deltaY: 0,
      });

      expect(depaPos).equals(range[1] + bounceVal);
    });

    it("has correct up bounce", async () => {
      const bounceVal = 25;
      flickingInfo = createFlicking(vertical.full, {
        bounce: [bounceVal, 0],
        horizontal: false,
      });

      setEventHandler();

      await simulate(flickingInfo.element, {
        pos: [0, 0],
        deltaX: 0,
        deltaY: 250,
      });

      expect(depaPos).equals(-bounceVal);
    });

    it("has correct down bounce", async () => {
      const bounceVal = 25;
      flickingInfo = createFlicking(vertical.full, {
        bounce: [0, bounceVal],
        horizontal: false,
      });

      setEventHandler();

      await simulate(flickingInfo.element, {
        pos: [0, 0],
        deltaX: 0,
        deltaY: -250,
      });

      expect(depaPos).equals(range[1] + bounceVal);
    });

    /*
    it("is clamped to wrapper width(horizontal)", async () => {
      const bounceVal = 999;
      flickingInfo = createFlicking(vertical.full, {
        bounce: [bounceVal, 0],
      });

      setEventHandler();

      const wrapperWidth = flickingInfo.element.getBoundingClientRect().width;

      await simulate(flickingInfo.element, {
        pos: [0, 0],
        deltaX: 9999,
        deltaY: 0,
      });

      expect(depaPos).equals(-wrapperWidth);
    });
    */

    it("is clamped to wrapper height(vertical)", async () => {
      const bounceVal = 99999;
      flickingInfo = createFlicking(vertical.full, {
        bounce: [bounceVal, 0],
        horizontal: false,
      });

      setEventHandler();

      const wrapperHeight = flickingInfo.element.getBoundingClientRect().height;

      await simulate(flickingInfo.element, {
        pos: [0, 0],
        deltaX: 0,
        deltaY: 999999,
      });

      expect(depaPos).equals(-wrapperHeight);
    });
  });

  describe("threshold-horizontal", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full, {
        threshold: 50,
      });
    });
    afterEach(() => cleanup());

    it("should change panel when moving above threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      // Simulation won't be at max position(deltaX we've set) unless setting high duration value
      await simulate(flickingInfo.element, { deltaX: -51, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should change panel when moving same as threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaX: -50, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should not change panel when moving below threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaX: -49, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).equals(afterIndex);
    });
  });

  describe("threshold-vertical", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(vertical.full, {
        horizontal: false,
        threshold: 50,
      });
    });
    afterEach(() => cleanup());

    it("should change panel when moving above threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -51, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should change panel when moving same as threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -50, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should not change panel when moving below threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -49, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).equals(afterIndex);
    });
  });

  describe("threshold-horizontal, circular", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full, {
        threshold: 50,
      });
    });
    afterEach(() => cleanup());

    it("should change panel when moving above threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaX: -51, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should change panel when moving same as threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaX: -50, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should not change panel when moving below threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaX: -49, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).equals(afterIndex);
    });
  });

  describe("threshold-vertical, circular", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(vertical.full, {
        horizontal: false,
        circular: true,
        threshold: 50,
      });
    });
    afterEach(() => cleanup());

    it("should change panel when moving above threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -51, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should change panel when moving same as threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -50, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should not change panel when moving below threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -49, duration: 3000 });
      await waitFor(500);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).equals(afterIndex);
    });
  });

  describe("thresholdAngle - horizontal", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full, {
        circular: true,
        threshold: 30,
        thresholdAngle: 45,
      });
    });
    afterEach(() => cleanup());

    it("should not change panel when input angle is above thresholdAngle", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, {
        deltaX: -100,
        deltaY: 101,
        duration: 300,
      });
      await waitFor(1000);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).equals(afterIndex);
    });

    it("should change panel when input angle is same as thresholdAngle", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, {
        deltaX: -100,
        deltaY: 100,
        duration: 300,
      });
      await waitFor(1000);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should change panel when input angle is below thresholdAngle", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, {
        deltaX: -100,
        deltaY: 99,
        duration: 300,
      });
      await waitFor(1000);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });
  });

  describe("thresholdAngle - vertical", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(vertical.full, {
        circular: true,
        horizontal: false,
        threshold: 30,
        thresholdAngle: 45,
      });
    });
    afterEach(() => cleanup());

    it("should change panel when input angle is above thresholdAngle", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, {
        deltaX: -100,
        deltaY: 101,
        duration: 300,
      });
      await waitFor(1000);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should not change panel when input angle is same as thresholdAngle", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, {
        deltaX: -100,
        deltaY: 100,
        duration: 300,
      });
      await waitFor(1000);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).equals(afterIndex);
    });

    it("should not change panel when input angle is below thresholdAngle", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, {
        deltaX: -100,
        deltaY: 99,
        duration: 300,
      });
      await waitFor(1000);

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).equals(afterIndex);
    });
  });

  describe("snap", () => {
    afterEach(() => cleanup());

    describe("Maximum panel changes per snap value", () => {
      // Snap is effective only when above 1
      const snapCounts = [2, 3, 4, 5];
      const deltaValues = [-80, -110, -140, -170, -200];
      const panelWidth = 100;

      snapCounts.forEach(snapCount => {
        deltaValues.forEach(delta => {
          it(`should move to panel correctly when snap is ${snapCount} and delta is ${delta}`, async () => {
            flickingInfo = createFlicking(horizontal.fixedTo100, {
              moveType: {
                type: "snap",
                count: snapCount,
              },
              threshold: 40,
              defaultIndex: 0,
              hanger: "0%",
            });
            const flicking = flickingInfo.instance;
            const startIndex = flicking.getIndex();

            simulate(flickingInfo.element, {
              deltaX: delta,
              duration: 50,
            });

            const [destPos, nearestPanel] = await waitEvent(flicking, "change")
              .then((e: any) => {
                const viewport = (flicking as any).viewport;

                return [
                  e.axesEvent.destPos.flick,
                  viewport.getNearestPanel(),
                ];
              });

            await waitEvent(flicking, "moveEnd");

            const endIndex = flicking.getIndex();
            const indexAtDestPos = Math.floor(destPos / panelWidth);
            // As all delta is above threshold, it should change panel at least once
            const expectedIndex = destPos >= 100
              ? Math.min(nearestPanel.getIndex() + snapCount, Math.max(1, indexAtDestPos))
              // Sometimes, simulation won't return proper dest position for given delta.
              : 0;

            expect(startIndex).equals(0);
            expect(expectedIndex).equals(endIndex);
            expect(endIndex).to.be.not.gt(snapCount + nearestPanel.getIndex());
          });
        });
      });
    });
  });

  describe("gap", () => {
    afterEach(() => cleanup());

    it("should place panels at correct position", async () => {
      const gap = 50;

      flickingInfo = createFlicking(horizontal.variant, {
        gap,
        defaultIndex: 0,
      });
      const flicking = flickingInfo.instance;
      let panel: FlickingPanel = flicking.getCurrentPanel();

      while (panel.next() != null) {
        const nextPanel = panel.next();

        expect(nextPanel.getPosition() - (panel.getPosition() + panel.getSize())).equals(gap);
        panel = nextPanel;
      }
    });

    it("should place panels at correct position in circular mode", async () => {
      const gap = 50;

      flickingInfo = createFlicking(horizontal.shouldClone4, {
        gap,
        anchor: "0",
        hanger: "0",
        circular: true,
        defaultIndex: 0,
      });

      const flicking = flickingInfo.instance;
      const firstPanel = flicking.getPanel(0);
      const lastPanel = flicking.getPanel(flicking.getPanelCount() - 1);

      // It should place panel before firstPanel correctly
      expect(firstPanel.getPosition() - (firstPanel.prev().getPosition() + firstPanel.prev().getSize())).equals(gap);

      // It should place panel next lastPanel correctly
      expect(lastPanel.next().getPosition() - (lastPanel.getPosition() + lastPanel.getSize())).equals(gap);
    });
  });
});

import { ImportMock } from "ts-mock-imports";
import Flicking from "../../src/Flicking";
import { DEFAULT_OPTIONS } from "../../src/consts";
import { FlickingEvent, FlickingPanel, Plugin } from "../../src/types";
import { horizontal, vertical } from "./assets/fixture";
import { createFlicking, cleanup, simulate, createFixture, tick } from "./assets/utils";
import { EVENTS } from "../../src/consts";
import * as sinon from "sinon";
import { withFlickingMethods } from "../../src/utils";
import * as ga from "../../src/ga/ga";

declare var viewport: any;

const defaultClassPrefix = DEFAULT_OPTIONS.classPrefix;

describe("Initialization", () => {
  afterEach(() => cleanup());

  let flickingInfo: {
    element: HTMLElement,
    instance: Flicking,
    events: FlickingEvent[],
    eventFired: string[],
    eventDirection: string[],
  };

  describe("Check specifications in initialization process", () => {
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

    it("should have zIndex option", () => {
      flickingInfo = createFlicking(horizontal.full);
      expect(flickingInfo.instance.getElement().querySelector<HTMLElement>(".eg-flick-viewport").style.zIndex).equals("2000");

      flickingInfo = createFlicking(horizontal.full, { zIndex: 0 });
      expect(flickingInfo.instance.getElement().querySelector<HTMLElement>(".eg-flick-viewport").style.zIndex).equals("0");

      flickingInfo = createFlicking(horizontal.full, { zIndex: "" });
      expect(flickingInfo.instance.getElement().querySelector<HTMLElement>(".eg-flick-viewport").style.zIndex).equals("");
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

    it("should init with first panel have left style enabled on it", () => {
      // Given
      /* NOTHING */

      // When
      flickingInfo = createFlicking(horizontal.full);

      // Then
      const firstPanel = flickingInfo.instance.getPanel(0);
      expect(firstPanel.getElement().style.left !== "").to.be.true;
    });

    // pause GA
    // it("should init with collectStatistics(true)", () => {
    //   // Given
    //   const mockGa = ImportMock.mockFunction(ga, "sendEvent");

    //   // When
    //   flickingInfo = createFlicking(horizontal.full, { collectStatistics: true });
    //   mockGa.restore();

    //   // Then
    //   expect(mockGa.callCount).to.be.equals(1);
    // });

    it("won't throw error even if all panel has width: 0", () => {
      // Given & When
      expect(() => {
        flickingInfo = createFlicking(horizontal.hasZeroWidth);
      }).not.to.throw();
    });

    it("won't throw error even if all panel has display: none", () => {
      // Given & When
      expect(() => {
        flickingInfo = createFlicking(horizontal.hasDisplayNone);
      }).not.to.throw();
    });
  });

  describe("circular", () => {
    it("should not clone panels in non-circular, horizontal mode", () => {
      // Given & When
      flickingInfo = createFlicking(horizontal.shouldClone4);
      const flicking = flickingInfo.instance;

      // Then
      expect(flicking.getPanelCount()).equals(2);
      expect(flicking.getCloneCount()).equals(0);
    });

    it("should clone panels needed in circular, horizontal mode", () => {
      // Given & When
      flickingInfo = createFlicking(horizontal.shouldClone4, { circular: true });
      const flicking = flickingInfo.instance;

      // Then
      expect(flicking.getPanelCount()).equals(2);
      expect(flicking.getCloneCount()).equals(2); // It will create 4 panels (2 * 2)
    });

    it("should not clone panels in non-circular, vertical mode", () => {
      // Given & When
      flickingInfo = createFlicking(vertical.shouldClone4, {
        horizontal: false,
      });
      const flicking = flickingInfo.instance;

      // Then
      expect(flicking.getPanelCount()).equals(2);
      expect(flicking.getCloneCount()).equals(0);
    });

    it("should clone panels needed in circular, vertical mode", () => {
      // Given & When
      flickingInfo = createFlicking(vertical.shouldClone4, {
        horizontal: false,
        circular: true,
      });
      const flicking = flickingInfo.instance;

      // Then
      expect(flicking.getPanelCount()).equals(2);
      expect(flicking.getCloneCount()).equals(2); // It will create 4 panels (2 * 2)
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

    it("should change panel when moving above threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      // Simulation won't be at max position(deltaX we've set) unless setting high duration value
      await simulate(flickingInfo.element, { deltaX: -51, duration: 3000 });

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should change panel when moving same as threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaX: -50, duration: 3000 });

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should not change panel when moving below threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaX: -49, duration: 3000 });

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

    it("should change panel when moving above threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -51, duration: 3000 });

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should change panel when moving same as threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -50, duration: 3000 });

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should not change panel when moving below threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -49, duration: 3000 });

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

    it("should change panel when moving above threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaX: -51, duration: 3000 });

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should change panel when moving same as threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaX: -50, duration: 3000 });

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should not change panel when moving below threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaX: -49, duration: 3000 });

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

    it("should change panel when moving above threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -51, duration: 3000 });

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should change panel when moving same as threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -50, duration: 3000 });

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).not.to.equal(afterIndex);
    });

    it("should not change panel when moving below threshold", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, { deltaY: -49, duration: 3000 });

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

    it("should not change panel when input angle is above thresholdAngle", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, {
        deltaX: -100,
        deltaY: 101,
        duration: 300,
      });

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

    it("should change panel when input angle is above thresholdAngle", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      await simulate(flickingInfo.element, {
        deltaX: -100,
        deltaY: 101,
        duration: 300,
      });

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

      const afterIndex = flicking.getIndex();

      expect(beforeIndex).equals(afterIndex);
    });
  });

  describe("snap", () => {
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
            let destPos;
            let eventDelta;
            let nearestPanel;
            const flicking = flickingInfo.instance;

            flicking.on(Flicking.EVENTS.CHANGE, e => {
              destPos = e.axesEvent.destPos.flick;
              eventDelta = Math.abs(e.axesEvent.delta.flick);
              nearestPanel = (flicking as any).viewport.getNearestPanel();
            });

            const startIndex = flicking.getIndex();

            simulate(flickingInfo.element, {
              deltaX: delta,
              duration: 50,
            });

            const endIndex = flicking.getIndex();
            const indexAtDestPos = Math.floor(destPos / panelWidth);
            // As all delta is above threshold, it should change panel at least once
            // But, if simulate fails and returns wrong dest position,
            // check eventDelta if it's over 50 as it's minimum distance to change index(half of panel size as anchor is 50%)
            // If it's not, expected index will be 0 as it's restoring.
            const expectedIndex = eventDelta >= 50
              ? Math.min(nearestPanel.getIndex() + snapCount, Math.max(1, indexAtDestPos))
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

  describe("renderOnlyVisible", () => {
    it("should render only visible panels at init #1", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        hanger: "0%",
        anchor: "0%",
      });

      // When
      // => Init

      // Then
      const flicking = flickingInfo.instance;
      expect(flicking.getPanelCount()).equals(6);
      expect(flicking.getElement().querySelectorAll(".eg-flick-panel").length).equals(4);
    });

    it("should render only visible panels at init #2", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        hanger: "50%",
        anchor: "50%",
      });

      // When
      // => Init

      // Then
      const flicking = flickingInfo.instance;
      expect(flicking.getPanelCount()).equals(6);
      expect(flicking.getElement().querySelectorAll(".eg-flick-panel").length).equals(3);
    });

    it("should render only visible panels after move", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        hanger: "50%",
        anchor: "50%",
      });
      const flicking = flickingInfo.instance;
      const visiblePanelCntBefore = flicking.getElement().querySelectorAll(".eg-flick-panel").length;

      // When
      flicking.moveTo(2, 100);
      tick(200);

      // Then
      const visiblePAnelCntAfter = flicking.getElement().querySelectorAll(".eg-flick-panel").length;
      expect(flicking.getPanelCount()).equals(6);
      expect(visiblePanelCntBefore).equals(3);
      expect(visiblePAnelCntAfter).equals(5);
    });

    it("should reposition panels to maintain layer size", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        hanger: "50%",
        anchor: "50%",
      });
      const flicking = flickingInfo.instance;
      const prevFirstVisiblePanel = flicking.getVisiblePanels()[0];
      const prevStyleLeft = prevFirstVisiblePanel.getElement().style.left;

      // When
      flicking.moveTo(4, 100);
      tick(200);
      const nextFirstVisiblePanel = flicking.getVisiblePanels()[0];
      const nextStyleLeft = nextFirstVisiblePanel.getElement().style.left;

      // Then
      expect(prevFirstVisiblePanel).not.equals(nextFirstVisiblePanel);
      expect(prevStyleLeft).to.equal("0px");
      expect(nextStyleLeft).to.equal("0px");
    });

    it("should reposition camera to maintain layer size", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        hanger: "0%",
        anchor: "0%",
      });
      const flicking = flickingInfo.instance;
      const cameraElement = flicking.getElement().children[0].children[0] as HTMLElement;
      const prevCameraTransform = cameraElement.style.transform;

      // When
      flicking.moveTo(4, 100);
      tick(200);
      const nextCameraTransform = cameraElement.style.transform;

      // Then
      expect(prevCameraTransform).equals(nextCameraTransform);
    });

    it("should position panels at correct position on init(Issue #382)", () => {
      viewport.set(400, 100);
      // Given
      flickingInfo = createFlicking(horizontal.fixedTo100N(2), {
        renderOnlyVisible: true,
      });

      // When
      // => Init

      // Then
      const flicking = flickingInfo.instance;
      const panels = flicking.getElement().querySelectorAll(".eg-flick-panel") as NodeListOf<HTMLElement>;

      expect(flicking.getPanelCount()).equals(2);
      expect(panels.length).equals(2);
      panels.forEach((panel, i) => {
        expect(panel.style.left).equals(`${100 * i}px`);
      });
    });

    it("should position panels at correct position on init #2 (Issue #382)", () => {
      viewport.set(400, 100);
      // Given
      flickingInfo = createFlicking(horizontal.fixedTo100N(4), {
        renderOnlyVisible: true,
        hanger: "0%",
        anchor: "0%",
        gap: 10,
      });

      // When
      // => Init

      // Then
      const flicking = flickingInfo.instance;
      const panels = flicking.getElement().querySelectorAll(".eg-flick-panel") as NodeListOf<HTMLElement>;

      expect(flicking.getPanelCount()).equals(4);
      expect(panels.length).equals(4);
      panels.forEach((panel, i) => {
        expect(panel.style.left).equals(`${110 * i}px`);
      });
    });

    it("should position panels at correct position on init #3 (Issue #382)", () => {
      viewport.set(400, 100);
      // Given
      flickingInfo = createFlicking(horizontal.fixedTo100N(4), {
        renderOnlyVisible: true,
        bound: true,
      });

      // When
      // => Init

      // Then
      const flicking = flickingInfo.instance;
      const panels = flicking.getElement().querySelectorAll(".eg-flick-panel") as NodeListOf<HTMLElement>;

      expect(flicking.getPanelCount()).equals(4);
      expect(panels.length).equals(4);
      panels.forEach((panel, i) => {
        expect(panel.style.left).equals(`${100 * i}px`);
      });
    });

    it("should position panels at correct position on init #4 (Issue #382)", () => {
      viewport.set(400, 100);
      // Given
      flickingInfo = createFlicking(horizontal.fixedTo100N(4), {
        renderOnlyVisible: true,
        moveType: "freeScroll",
        bound: true,
        gap: 20,
      });

      // When
      // => Init

      // Then
      const flicking = flickingInfo.instance;
      const panels = flicking.getElement().querySelectorAll(".eg-flick-panel") as NodeListOf<HTMLElement>;

      expect(flicking.getPanelCount()).equals(4);
      expect(panels.length).equals(4);
      panels.forEach((panel, i) => {
        expect(panel.style.left).equals(`${120 * i}px`);
      });
    });
  });

  describe("plugin interface", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.shouldClone4, {
        anchor: "0",
        hanger: "0",
        circular: true,
        defaultIndex: 0,
      });
    });

    it("should check plugin's init lifecycle", () => {
      // Given
      const plugin: Plugin = {
        init: sinon.spy(),
        update: sinon.spy(),
        destroy: sinon.spy(),
      };

      // When
      // init
      flickingInfo.instance.addPlugins(plugin);

      // Then
      expect((plugin.init as sinon.SinonSpy).callCount).to.be.equals(1);
      expect((plugin.update as sinon.SinonSpy).callCount).to.be.equals(0);
      expect((plugin.destroy as sinon.SinonSpy).callCount).to.be.equals(0);
    });

    it("should check plugin's destroy lifecycle", () => {
      // Given
      const plugin: Plugin = {
        init: sinon.spy(),
        update: sinon.spy(),
        destroy: sinon.spy(),
      };

      // When
      // init
      flickingInfo.instance.addPlugins(plugin);
      // destroy
      flickingInfo.instance.removePlugins(plugin);

      // Then
      expect((plugin.init as sinon.SinonSpy).callCount).to.be.equals(1);
      expect((plugin.update as sinon.SinonSpy).callCount).to.be.equals(0);
      expect((plugin.destroy as sinon.SinonSpy).callCount).to.be.equals(1);
    });

    it("should check flicking's destroy for plugin's destroy lifecycle", () => {
      // Given
      const plugin: Plugin = {
        init: sinon.spy(),
        update: sinon.spy(),
        destroy: sinon.spy(),
      };

      // When
      // init
      flickingInfo.instance.addPlugins(plugin);
      // destory
      flickingInfo.instance.destroy();

      // Then
      expect((plugin.init as sinon.SinonSpy).callCount).to.be.equals(1);
      expect((plugin.update as sinon.SinonSpy).callCount).to.be.equals(0);
      expect((plugin.destroy as sinon.SinonSpy).callCount).to.be.equals(1);
    });

    it("should check plugin's update lifecycle", () => {
      // Given
      const plugin: Plugin = {
        init: sinon.spy(),
        destroy: sinon.spy(),
        update: sinon.spy(),
      };

      // When
      // init
      flickingInfo.instance.addPlugins(plugin);

      // update
      flickingInfo.instance.getPanel(0).update(() => {});

      // update 2
      flickingInfo.instance.resize();

      // destory
      flickingInfo.instance.removePlugins(plugin);

      // Then
      expect((plugin.init as sinon.SinonSpy).callCount).to.be.equals(1);
      expect((plugin.update as sinon.SinonSpy).callCount).to.be.equals(2);
      expect((plugin.destroy as sinon.SinonSpy).callCount).to.be.equals(1);
    });
  });

  describe("initialize component with decorator", () => {
    it("should check if the method of the class created with the decorator is properly entered.", () => {
      class TestFlicking {
        @withFlickingMethods
        private nativeFlicking: Flicking;

        constructor() {
          flickingInfo = createFlicking(horizontal.shouldClone4, {
            gap: 10,
            anchor: "0",
            hanger: "0",
            circular: false,
            defaultIndex: 0,
          });
          this.nativeFlicking = flickingInfo.instance;
        }
      }
      const flicking: any = new TestFlicking();

      expect(flicking.sync).to.be.undefined;
      expect(flicking.getCloneCount).to.be.undefined;
      expect(flicking.append).to.be.undefined;
      expect(flicking.prepend).to.be.undefined;
      expect(flicking.addPlugins).to.be.undefined;
      expect(flicking.removePlugins).to.be.undefined;
      expect(flicking.getLastIndex).to.be.undefined;
      expect(flicking.setLastIndex).to.be.undefined;
      expect(flicking.getPanelCount()).to.be.equals(2);
    });
  });

  describe("bound", () => {
    it("should clamp dest position when moving prev to adjacent panel #219", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        bound: true,
        anchor: 50,
        hanger: 50,
        threshold: 40,
        defaultIndex: 5,
        moveType: { type: "snap", count: 1},
      });
      const moves = [];
      flickingInfo.instance.on("move", e => moves.push(e.axesEvent.pos.flick));

      // When
      await simulate(flickingInfo.element, {
        deltaX: 40,
        duration: 200,
      });

      // Then
      const scrollArea = (flickingInfo.instance as any).viewport.getScrollArea();
      expect(moves.every(move => move <= scrollArea.next)).to.be.true;
    });

    it("should clamp dest position when moving next to adjacent panel #219", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        bound: true,
        threshold: 40,
        defaultIndex: 0,
        moveType: { type: "snap", count: 1},
      });
      const moves = [];
      flickingInfo.instance.on("move", e => moves.push(e.axesEvent.pos.flick));

      // When
      await simulate(flickingInfo.element, {
        deltaX: -40,
        duration: 500,
      });

      // Then
      const scrollArea = (flickingInfo.instance as any).viewport.getScrollArea();
      expect(moves.every(move => move >= scrollArea.prev)).to.be.true;
    });
  });

  describe("isEqualSize", () => {
    it("should assume all panels have same size based on first panel on init, if true is given", () => {
      // Given & When(Init)
      flickingInfo = createFlicking(horizontal.variant, {
        gap: 0,
        isEqualSize: true,
      });

      // Then
      const flicking = flickingInfo.instance;
      const firstPanelSize = flicking.getPanel(0).getSize();
      const allPanels = flicking.getAllPanels();

      allPanels.forEach(panel => {
        expect(panel.getSize()).equals(firstPanelSize);
      });
    });

    it("should assume panels with same class have same size on init", () => {
      // Given & When(Init)
      const wrapper = createFixture(horizontal.variant);
      [].forEach.call(wrapper.children, (el, idx) => {
        // All 6 panels have different size, but apply same class for 2 of each
        el.classList.add(`test-panel-${idx % 3}`);
      });
      const flicking = new Flicking(wrapper, {
        isEqualSize: ["test-panel-0", "test-panel-1", "test-panel-2"],
      });
      const panelsClassed = flicking.getAllPanels().reduce((panels, panel) => {
        const className = `test-panel-${panel.getIndex() % 3}`;
        panels[className]
          ? panels[className].push(panel)
          : panels[className] = [panel];
        return panels;
      }, {});

      // Then
      expect(flicking.getPanelCount()).equals(6);

      // For panels with same class name, it should have same size
      for (const className in panelsClassed) {
        const panelsWithSameClass = panelsClassed[className];
        const firstPanelSize = panelsWithSameClass[0].getSize();

        expect(panelsWithSameClass.length).equals(2); // Check fixture.ts, every class has 2 panels each
        expect(panelsWithSameClass.every(panel => panel.getElement().classList.contains(className)));
        expect(panelsWithSameClass.every(panel => panel.getSize() === firstPanelSize)).to.be.true;
      }
      // ...but for panels with different class name should have different size
      const firstPanelOfEachClass = Object.keys(panelsClassed)
        .map(className => panelsClassed[className])
        .map(panels => panels[0]);

      firstPanelOfEachClass.forEach(panel => {
        firstPanelOfEachClass.forEach(otherPanel => {
          if (panel !== otherPanel) {
            expect(panel.getSize()).not.equals(otherPanel.getSize());
          }
        });
      });
    });

    it("should have same size for each panels based on first panel after resize, but it won't have to be same with previous size if true is given", () => {
      // Given
      viewport.set(1000, 100);
      flickingInfo = createFlicking(horizontal.variant, {
        gap: 0,
        isEqualSize: true,
      });
      const flicking = flickingInfo.instance;
      const beforeSize = flicking.getPanel(0).getSize();

      // When
      viewport.set(2000, 100);
      flicking.resize();

      // Then
      const afterSize = flicking.getPanel(0).getSize();
      const allPanels = flicking.getAllPanels();

      expect(afterSize).not.to.equal(beforeSize);
      allPanels.forEach(panel => {
        expect(panel.getSize()).equals(afterSize);
      });
    });

    it("should assume panels with same class have same size on resize, but it won't have to be same with previous size", () => {
      // Given
      viewport.set(1000, 100);
      const wrapper = createFixture(horizontal.variant);
      [].forEach.call(wrapper.children, (el, idx) => {
        // All 6 panels have different size, but apply same class for 2 of each
        el.classList.add(`test-panel-${idx % 3}`);
      });
      const flicking = new Flicking(wrapper, {
        isEqualSize: ["test-panel-0", "test-panel-1", "test-panel-2"],
      });
      const panelsClassed = flicking.getAllPanels().reduce((panels, panel) => {
        const className = `test-panel-${panel.getIndex() % 3}`;
        panels[className]
          ? panels[className].push(panel)
          : panels[className] = [panel];
        return panels;
      }, {});
      const beforeSizes = Object.keys(panelsClassed).reduce((sizes, className) => {
        sizes[className] = panelsClassed[className][0].getSize();
        return sizes;
      }, {});

      // When
      viewport.set(2000, 100);
      flicking.resize();

      // Then
      expect(flicking.getPanelCount()).equals(6);

      const afterSizes = Object.keys(panelsClassed).reduce((sizes, className) => {
        sizes[className] = panelsClassed[className][0].getSize();
        return sizes;
      }, {});

      Object.keys(beforeSizes).forEach(className => {
        expect(beforeSizes[className]).not.to.undefined;
        expect(afterSizes[className]).not.to.undefined;
        expect(beforeSizes[className]).not.equals(afterSizes[className]);
      });

      // For panels with same class name, it should have same size
      for (const className in panelsClassed) {
        const panelsWithSameClass = panelsClassed[className];
        const firstPanelSize = panelsWithSameClass[0].getSize();

        expect(panelsWithSameClass.length).equals(2); // Check fixture.ts, every class has 2 panels each
        expect(panelsWithSameClass.every(panel => panel.getElement().classList.contains(className)));
        expect(panelsWithSameClass.every(panel => panel.getSize() === firstPanelSize)).to.be.true;
      }
      // ...but for panels with different class name should have different size
      const firstPanelOfEachClass = Object.keys(panelsClassed)
        .map(className => panelsClassed[className])
        .map(panels => panels[0]);

      firstPanelOfEachClass.forEach(panel => {
        firstPanelOfEachClass.forEach(otherPanel => {
          if (panel !== otherPanel) {
            expect(panel.getSize()).not.equals(otherPanel.getSize());
          }
        });
      });
    });

    it("should put same size for appended panel with existing class", () => {
      // Given
      flickingInfo = createFlicking(horizontal.half, {
        isEqualSize: ["panel-horizontal-50"],
      });

      // When
      const flicking = flickingInfo.instance;
      const newPanel = flicking.append("<div class=\"panel-horizontal-50\" style=\"width: 99999px;\"></div>")[0];

      // Then
      const prevPanel = flicking.getPanel(0);
      expect(prevPanel.getElement().classList.contains("panel-horizontal-50")).to.be.true;
      expect(newPanel.getSize()).equals(prevPanel.getSize());
    });

    it("should put same size for replaced panel with existing class", () => {
      // Given
      flickingInfo = createFlicking(horizontal.half, {
        isEqualSize: ["panel-horizontal-50"],
      });

      // When
      const flicking = flickingInfo.instance;
      const prevPanel = flicking.getPanel(0);
      const newPanel = flicking.replace(0, "<div class=\"panel-horizontal-50\" style=\"width: 99999px;\"></div>")[0];

      // Then
      expect(prevPanel.getElement().classList.contains("panel-horizontal-50")).to.be.true;
      expect(newPanel.getSize()).equals(prevPanel.getSize());
    });
  });

  describe("isConstantSize", () => {
    it("should maintain panel size after resize", () => {
      // Given
      viewport.set(1000, 100);
      flickingInfo = createFlicking(horizontal.variant, { // horizontal.variant panels has width dependency on window width
        gap: 0,
        isConstantSize: true,
      });
      const flicking = flickingInfo.instance;
      const allPanels = flicking.getAllPanels();
      const beforePanelSizes = allPanels.map(panel => panel.getSize());

      // When
      viewport.set(500, 100);
      flicking.resize();

      // Then
      const afterPanelSizes = allPanels.map(panel => panel.getSize());
      beforePanelSizes.forEach((beforePanelSize, idx) => {
        const afterPanelSize = afterPanelSizes[idx];

        expect(beforePanelSize).equals(afterPanelSize);
      });
    });
  });

  describe("useOffset", () => {
    it("should make viewport size integer when true", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        useOffset: true,
      });
      const flicking = flickingInfo.instance;
      flicking.getElement().style.width = "1000.54321px";

      // When
      flicking.resize();

      // Then
      const viewportSize = (flickingInfo.instance as any).viewport.getSize();
      expect(viewportSize).equals(parseInt(viewportSize, 10));
    });

    it("should make viewport size not integer when false", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        useOffset: false,
      });
      const flicking = flickingInfo.instance;
      flicking.getElement().style.width = "1000.54321px";

      // When
      flicking.resize();

      // Then
      const viewportSize = (flickingInfo.instance as any).viewport.getSize();
      expect(viewportSize).not.equals(parseInt(viewportSize, 10));
    });

    it("should make panel size integer when true", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        useOffset: true,
      });
      const flicking = flickingInfo.instance;
      flicking.getElement().style.width = "1000.54321px";

      // When
      flicking.resize();

      // Then
      flicking.getAllPanels().forEach(panel => {
        const panelSize = panel.getSize();
        expect(panelSize).equals(parseInt(panelSize.toString(), 10));
      });
    });

    it("should make panel size not integer when false", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        useOffset: false,
      });
      const flicking = flickingInfo.instance;
      flicking.getElement().style.width = "1000.54321px";

      // When
      flicking.resize();

      // Then
      flicking.getAllPanels().forEach(panel => {
        const panelSize = panel.getSize();
        expect(panelSize).not.equals(parseInt(panelSize.toString(), 10));
      });
    });

    it("should return original panel size when true even if transform is applied", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        useOffset: true,
      });

      // When
      const flicking = flickingInfo.instance;
      const prevSize = flicking.getPanel(0).getSize();
      flicking.getElement().style.transform = "scale(2)";
      flicking.resize();

      // Then
      const afterSize = flicking.getPanel(0).getSize();
      expect(prevSize).equals(afterSize);
    });
  });

  describe("adaptive", () => {
    it("should current panel height at init", () => {
      // Given & When
      flickingInfo = createFlicking(horizontal.hasDifferentHeight, {
        adaptive: true,
      });

      // Then
      const flicking = flickingInfo.instance;
      const viewportEl = flickingInfo.element.querySelector(".eg-flick-viewport") as HTMLElement;
      const firstPanelEl = flicking.getPanel(0).getElement();
      const secondPanelEl = flicking.getPanel(1).getElement();
      const viewportSize = viewportEl.getBoundingClientRect().height;
      const firstPanelSize = firstPanelEl.getBoundingClientRect().height;
      const secondPanelSize = secondPanelEl.getBoundingClientRect().height;
      expect(viewportSize).equals(firstPanelSize);
      expect(secondPanelSize).greaterThan(firstPanelSize);
    });

    it("should change viewport height to current panel's height", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.hasDifferentHeight, {
        adaptive: true,
      });
      const flicking = flickingInfo.instance;
      const viewportEl = flickingInfo.element.querySelector(".eg-flick-viewport") as HTMLElement;
      const firstPanelEl = flicking.getPanel(0).getElement();
      const secondPanelEl = flicking.getPanel(1).getElement();
      const firstPanelSize = firstPanelEl.getBoundingClientRect().height;
      const secondPanelSize = secondPanelEl.getBoundingClientRect().height;

      // When
      const heightInit = viewportEl.getBoundingClientRect().height;
      flicking.moveTo(1, 300);
      tick(500);
      const heightAtPanel1 = viewportEl.getBoundingClientRect().height;
      flicking.moveTo(0, 0);
      const heightAtPanel0 = viewportEl.getBoundingClientRect().height;

      // Then
      expect(heightInit).equals(firstPanelSize);
      expect(heightAtPanel1).equals(secondPanelSize);
      expect(heightAtPanel0).equals(firstPanelSize);
    });
  });
});

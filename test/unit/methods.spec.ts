import { spy } from "sinon";

import Flicking from "../../src/Flicking";
import { FlickingEvent, FlickingPanel, NeedPanelEvent } from "../../src/types";
import { horizontal, panel as createPanelElement } from "./assets/fixture";
import { createFlicking, cleanup, simulate, waitFor, createHorizontalElement, waitEvent } from "./assets/utils";
import { EVENTS, DIRECTION } from "../../src/consts";
import { counter } from "../../src/utils";
import Viewport from "../../src/components/Viewport";
import Panel from "../../src/components/Panel";

declare var viewport: any;

describe("Methods call", () => {
  let flickingInfo: {
    element: HTMLElement,
    instance: Flicking,
    events: FlickingEvent[],
    eventFired: string[],
    eventDirection: string[],
  };
  // afterEach(() => cleanup());

  describe("getIndex()", () => {
    const maximumIndex = 2;
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full, {
        circular: true,
        defaultIndex: maximumIndex,
      });
    });

    it("should set current index to option's defaultIndex", () => {
      expect(maximumIndex).to.equal(flickingInfo.instance.getIndex());
    });

    it("should circulate index in circular mode(moving to next panel)", async () => {
      await simulate(flickingInfo.element, { deltaX: -100 });
      await waitFor(1000);

      expect(flickingInfo.instance.getIndex()).to.equal(0);
    });

    it("should circulate index in circular mode(moving to prev panel)", async () => {
      flickingInfo = createFlicking(horizontal.full, {
        circular: true,
        defaultIndex: 0,
      });

      await simulate(flickingInfo.element, { deltaX: 100 });
      await waitFor(1000);

      expect(flickingInfo.instance.getIndex()).to.equal(maximumIndex);
    });
  });

  describe("next()", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.fixedTo100, {
        anchor: "0%",
        hanger: "0%",
      });
    });

    it("can move to next panel correctly", async () => {
      // Given
      const flicking = flickingInfo.instance;
      const cameraElement = flickingInfo.element.querySelector(".eg-flick-camera") as HTMLElement;

      const beforeCameraPos = -cameraElement.getBoundingClientRect().left; // position is set multiplied by -1
      const beforePanelPos = flicking.getCurrentPanel().getPosition();

      // When
      flicking.next(200);
      await waitEvent(flicking, "moveEnd");

      // Then
      const afterCameraPos = -cameraElement.getBoundingClientRect().left; // position is set multiplied by -1
      const afterPanelPos = flicking.getCurrentPanel().getPosition();

      expect(Math.abs(afterCameraPos - beforeCameraPos)).equals(afterPanelPos - beforePanelPos);
    });

    it("changes index correctly", async () => {
      const flicking = flickingInfo.instance;
      const indexBefore = flicking.getIndex();
      flicking.next(200);
      await waitEvent(flicking, "moveEnd");

      expect(flicking.getIndex()).equals(indexBefore + 1);
    });

    it("should return flicking instance itself", () => {
      const flicking = flickingInfo.instance;
      const returnVal = flicking.next();

      expect(returnVal).deep.equals(flickingInfo.instance);
    });

    it("cannot be called during manual input", async () => {
      const flicking = flickingInfo.instance;

      // Will trigger "restore" event, not "change" event
      simulate(flickingInfo.element, { deltaX: 10, duration: 200 });
      await waitFor(25);
      flicking.next();
      await waitFor(500);

      expect(flickingInfo.eventFired.some(eventType => eventType === EVENTS.CHANGE)).to.be.false;
    });
  });

  describe("prev()", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.fixedTo100, {
        anchor: "100%",
        hanger: "100%",
        defaultIndex: 2,
      });
    });

    it("can move to prev panel correctly", async () => {
      // Given
      const flicking = flickingInfo.instance;
      const cameraElement = flickingInfo.element.querySelector(".eg-flick-camera") as HTMLElement;

      const beforeCameraPos = -cameraElement.getBoundingClientRect().left; // position is set multiplied by -1
      const beforePanelPos = flicking.getCurrentPanel().getPosition();

      // When
      flicking.prev(200);
      await waitEvent(flicking, "moveEnd");

      // Then
      const afterCameraPos = -cameraElement.getBoundingClientRect().left; // position is set multiplied by -1
      const afterPanelPos = flicking.getCurrentPanel().getPosition();

      expect(afterCameraPos - beforeCameraPos).equals(afterPanelPos - beforePanelPos);
    });

    it("changes index correctly", async () => {
      const flicking = flickingInfo.instance;
      const indexBefore = flicking.getIndex();
      flicking.prev(200);
      await waitFor(1000);

      expect(flicking.getIndex()).equals(indexBefore - 1);
    });

    it("should return flicking instance itself", () => {
      const flicking = flickingInfo.instance;
      const returnVal = flicking.prev();

      expect(returnVal).deep.equals(flickingInfo.instance);
    });

    it("cannot be called during manual input", async () => {
      const flicking = flickingInfo.instance;

      // Will trigger "restore" event, not "change" event
      simulate(flickingInfo.element, { deltaX: 10, duration: 200 });
      await waitFor(25);
      flicking.prev();
      await waitFor(500);

      expect(flickingInfo.eventFired.some(eventType => eventType === EVENTS.CHANGE)).to.be.false;
    });
  });

  describe("moveTo()", () => {
    it("can change index correctly", async () => {
      flickingInfo = createFlicking(horizontal.variant);

      const flicking = flickingInfo.instance;
      const indexToMove = 3;

      flicking.moveTo(indexToMove, 200);
      await waitFor(500);

      expect(flicking.getIndex()).equals(indexToMove);
    });

    it("can change index correctly in circular mode", async () => {
      flickingInfo = createFlicking(horizontal.variant);

      const flicking = flickingInfo.instance;
      let indexToMove = 5;

      flicking.moveTo(indexToMove, 200);
      await waitFor(500);

      expect(flicking.getIndex()).equals(indexToMove);

      indexToMove = 2;

      flicking.moveTo(indexToMove, 200);
      await waitFor(500);

      expect(flicking.getIndex()).equals(indexToMove);
    });

    it("can choose shortest path correctly in circular mode(next to prev)", async () => {
      flickingInfo = createFlicking(horizontal.full, { circular: true });

      const flicking = flickingInfo.instance;

      flicking.moveTo(2, 200);
      await waitFor(500);

      expect(flickingInfo.eventDirection[0]).equals(DIRECTION.PREV);
    });

    it("can choose shortest path correctly in circular mode(prev to next)", async () => {
      flickingInfo = createFlicking(horizontal.full, { circular: true, defaultIndex: 2 });

      const flicking = flickingInfo.instance;

      flicking.moveTo(0, 200);
      await waitFor(500);

      expect(flickingInfo.eventDirection[0]).equals(DIRECTION.NEXT);
    });
  });

  describe("enableInput()", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full);
    });

    it("should enable input", async () => {
      const flicking = flickingInfo.instance;

      flicking.disableInput();
      flicking.enableInput();

      await simulate(flickingInfo.element, { deltaX: -100 });
      await waitFor(500);
      expect(flickingInfo.eventFired.length).to.not.equal(0);
    });

    it("should return flicking instance itself", () => {
      const flicking = flickingInfo.instance;
      const returnVal = flicking.enableInput();

      expect(returnVal).deep.equals(flickingInfo.instance);
    });
  });

  describe("disableInput()", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full);
    });

    it("should disable input", async () => {
      const flicking = flickingInfo.instance;

      flicking.disableInput();

      await simulate(flickingInfo.element, { deltaX: -100 });
      await waitFor(500);
      expect(flickingInfo.eventFired.length).equals(0);
    });

    it("should return flicking instance itself", () => {
      const flicking = flickingInfo.instance;
      const returnVal = flicking.disableInput();

      expect(returnVal).deep.equals(flickingInfo.instance);
    });
  });

  describe("destroy()", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full);
      flickingInfo.instance.destroy();
    });

    it("should not trigger events anymore", async () => {
      await simulate(flickingInfo.element, { deltaX: -100 });
      await waitFor(500);
      expect(flickingInfo.eventFired.length).equals(0);
    });

    it("should not have viewport & camera element", () => {
      const flickingElement = flickingInfo.element;
      const viewportElement = flickingElement.querySelector(".eg-flick-viewport");
      const cameraElement = flickingElement.querySelector(".eg-flick-camera");

      expect(viewportElement).to.be.null;
      expect(cameraElement).to.be.null;
    });

    it("should remove panel class", () => {
      const flickingElement = flickingInfo.element;
      const panelElements = flickingElement.querySelectorAll(".eg-flick-panel");
      expect(panelElements.length).equals(0);
    });

    it("should free all resources in flicking instance", () => {
      const flicking = flickingInfo.instance;
      for (const x in flicking) {
        expect(flicking[x]).to.be.null;
      }
    });

    it("should remove cloned panels", () => {
      flickingInfo = createFlicking(horizontal.shouldClone4, { circular: true });
      flickingInfo.instance.destroy();

      const flickingElement = flickingInfo.element;
      expect(flickingElement.children.length).equals(2);
    });
  });

  describe("getPanelCount()", () => {
    it("should return proper panel count (non-circular)", () => {
      flickingInfo = createFlicking(horizontal.full);

      expect(flickingInfo.instance.getPanelCount()).equals(3);
    });

    it("should return proper panel count (circular)", () => {
      flickingInfo = createFlicking(horizontal.shouldClone4, { circular: true });

      expect(flickingInfo.instance.getPanelCount()).equals(2);
    });
  });
  describe("getAllPanels, getVisiblePanels()", () => {
    it("should check 'getAllPanels' in panel(circular: false)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full);

      // When, Then
      expect(flickingInfo.instance.getAllPanels().length).to.be.equals(3);
      expect(flickingInfo.instance.getAllPanels(true).length).to.be.equals(3);
    });

    it("should check 'getAllPanels' in panel(circular: true)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.half, {circular: true});

      // When, Then
      expect(flickingInfo.instance.getAllPanels().length).to.be.equals(3);

      // clone
      expect(flickingInfo.instance.getAllPanels(true).length).to.be.equals(6);
    });

    it("should check 'getVisiblePanels' in panel(circular: true)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full);

      // When
      const panels1 = flickingInfo.instance.getVisiblePanels();

      flickingInfo.instance.next(0);

      await waitFor(100);
      const panels2 = flickingInfo.instance.getVisiblePanels();

      // Then
      expect(panels1.length).to.be.equals(1);
      expect(panels1[0].getIndex()).to.be.equals(0);

      expect(panels2.length).to.be.equals(1);
      expect(panels2[0].getIndex()).to.be.equals(1);
    });

    it("should check 'getVisiblePanels' in panel(circular: true)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {circular: true});

      // When
      const panels1 = flickingInfo.instance.getVisiblePanels();

      flickingInfo.instance.prev(0);

      await waitFor(100);
      const panels2 = flickingInfo.instance.getVisiblePanels();

      // Then
      expect(panels1.length).to.be.equals(1);
      expect(panels1[0].getIndex()).to.be.equals(0);

      expect(panels2.length).to.be.equals(1);
      expect(panels2[0].getIndex()).to.be.equals(2);
    });
  });

  describe("getPanel()", () => {
    function getPanels(index: number, length: number, start: number = index) {
      const arr: FlickingPanel[] = [];

      arr[start] = flickingInfo.instance.getPanel(index);

      for (let i = start - 1; i >= 0; --i) {
        arr[i] = arr[i + 1].prev();
      }
      for (let i = start + 1; i < length; ++i) {
        arr[i] = arr[i - 1].next();
      }
      return arr;
    }

    it("should check 'progress' in panel(circular: false)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full);

      const panelArr = [0, 1, 2];
      const steps: number[][][] = [];

      steps[0] = panelArr.map(i => getPanels(i, 3))
        .map(panels => panels.map(panel => panel.getProgress()));

      // When
      flickingInfo.instance.next();

      await waitFor(500);

      steps[1] = panelArr.map(i => getPanels(i, 3))
        .map(panels => panels.map(panel => panel.getProgress()));

      flickingInfo.instance.next();

      await waitFor(500);

      steps[2] = panelArr.map(i => getPanels(i, 3))
        .map(panels => panels.map(panel => panel.getProgress()));

      // Then
      steps.forEach((standards, i) => {
        const expected = panelArr.map(j => j - i);
        standards.forEach(progressArr => {
          expect(progressArr).to.be.eql(expected);
        });
      });
    });

    it("should check 'progress' in panel(circular: true)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, { circular: true });

      const panelArr = [0, 1, 2];
      const steps: number[][][] = [];
      // 0, 1, 2, 0(3), 1(4), 2(5)
      steps[0] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getProgress()));

      // When
      // 0 => 1
      flickingInfo.instance.next();

      await waitFor(500);
      // 1, 2, 0(3), 1(4), 2(5), 0(6)
      steps[1] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getProgress()));

      // 1 => 2
      flickingInfo.instance.next();

      await waitFor(500);
      // 2, 0(3), 1(4), 2(5), 0(6), 1(7)
      steps[2] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getProgress()));

      // 2 => 0
      flickingInfo.instance.next();

      await waitFor(500);
      // 0(3) 1(4) 2(5) 0 (6) 1(7) 0(8)
      steps[3] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getProgress()));

      // Then
      steps.forEach((standards, i) => {
        const expected = [-1, 0, 1, 2, 3, 4, 5, 6].map(j => j - i);
        standards.forEach(progressArr => {
          expect(progressArr).to.be.eql(expected);
        });
      });
    });

    it("should check 'outsetProgress' in panel(circular: true)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, { circular: true });

      const panelArr = [0, 1, 2];
      const steps: number[][][] = [];
      // 0, 1, 2, 0(3), 1(4), 2(5)
      steps[0] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getOutsetProgress()));

      // When
      // 0 => 1
      flickingInfo.instance.next();

      await waitFor(500);
      // 1, 2, 0(3), 1(4), 2(5), 0(6)
      steps[1] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getOutsetProgress()));

      // 1 => 2
      flickingInfo.instance.next();

      await waitFor(500);
      // 2, 0(3), 1(4), 2(5), 0(6), 1(7)
      steps[2] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getOutsetProgress()));

      // 2 => 0
      flickingInfo.instance.next();

      await waitFor(500);
      // 0(3) 1(4) 2(5) 0 (6) 1(7) 0(8)
      steps[3] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getOutsetProgress()));

      // Then
      steps.forEach((standards, i) => {
        const expected = [-1, 0, 1, 2, 3, 4, 5, 6].map(j => j - i);
        standards.forEach(outsetArr => {
          expect(outsetArr).to.be.eql(expected);
        });
      });
    });
    ["0%", "50%", "100%"].forEach(hanger => {
      ["0%", "50%", "100%"].forEach(anchor => {
        it(`checks that 'progress' should be integer in panel(bound: true, hanger: ${hanger}, anchor: ${anchor})`, async () => {
          // Given
          // 6 panels
          flickingInfo = createFlicking(horizontal.panel30, {bound: true, hanger, anchor});

          const inst = flickingInfo.instance;
          const steps: number[][] = [];

          // When
          // [0, 1, 2, 3, 4, 5]
          steps[0] = inst.getAllPanels().map(panel => panel.getProgress());

          for (let i = 1; i <= 5; ++i) {
            inst.next(0);
            await waitFor(50);
            steps[i] = inst.getAllPanels().map(panel => panel.getProgress());
          }

          // Then
          steps.forEach((progressList, i) => {
            const expected = [0, 1, 2, 3, 4, 5].map(j => j - i);

            expect(progressList).to.be.eql(expected);
          });
        });
      });
    });
    it("should check 'visibleRatio' in panel", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.variant2, {circular: true});

      const panelArr = [0, 1, 2];
      const steps: number[][][] = [];
      steps[0] = panelArr.map(i => getPanels(i, 8))
        .map(panels => panels.map(panel => panel.getVisibleRatio()));

      // When
      // 0 => 1
      flickingInfo.instance.next();

      await waitFor(500);
      steps[1] = panelArr.map(i => getPanels(i, 8))
        .map(panels => panels.map(panel => panel.getVisibleRatio()));

      // 1 => 2
      flickingInfo.instance.next();

      await waitFor(500);
      steps[2] = panelArr.map(i => getPanels(i, 8))
        .map(panels => panels.map(panel => panel.getVisibleRatio()));

      // 2 => 3
      flickingInfo.instance.next();

      await waitFor(500);
      steps[3] = panelArr.map(i => getPanels(i, 8))
        .map(panels => panels.map(panel => panel.getVisibleRatio()));

      // 3 => 4
      flickingInfo.instance.next();

      await waitFor(500);
      steps[4] = panelArr.map(i => getPanels(i, 8))
        .map(panels => panels.map(panel => panel.getVisibleRatio()));

      const expected = [
        // 100 => 25 / 100 => 0.25
        [1, 0.25, 0, 0, 0, 0, 0, 0], // half
        [0, 1, 0, 0, 0, 0, 0, 0], // full
        // 100 => 35 / 100 = 0.35
        // 120 => 35 / 120 = 0.2916
        [0, 0.3500162760416667, 1, 0.2916822081312943, 0, 0, 0, 0], // 30
        // 120 => 100 / 120 = 0.83333
        [0, 0, 0, 0.8333389847750161, 0, 0, 0, 0], // 120
        // 120 => 25 / 120 = 0.208
        [0, 0, 0, 0.20833474619375403, 1, 0.25, 0, 0], // half(clone: 0)
      ];
      // Then
      steps.forEach((standards, i) => {
        standards.forEach(visibleRatioArr => {
          expected[i].forEach((ratio, j) => {
            expect(visibleRatioArr[j]).to.be.closeTo(ratio, 0.00001);
          });
        });
      });
    });

    it("should check 'freeScroll' option(weak snap)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        circular: true,
        moveType: "freeScroll",
      });
      const flicking = flickingInfo.instance;
      const restore = spy();
      const change = spy();
      const moveEnd = spy();

      flicking.on("restore", restore);
      flicking.on("change", change);
      flicking.on("moveEnd", moveEnd);

      // When
      await simulate(flickingInfo.element, { deltaX: -150, duration: 500 });
      await waitFor(1000);
      const index = flicking.getIndex();

      // not call change event
      flicking.moveTo(index, 0);

      await waitFor(100);

      // Then
      expect(restore.callCount).to.be.equal(0);
      expect(change.callCount).to.be.equal(0);
      expect(moveEnd.callCount).to.be.equal(2);
      expect(index).to.be.equal(0);
      expect(flicking.getIndex()).to.be.equal(0);
      // progress1
      expect(moveEnd.args[0][0].progress).to.be.not.equal(0);
      // progress2
      expect(moveEnd.args[1][0].progress).to.be.equal(0);
    });

    it("should check 'freeScroll' option(strong snap)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        circular: true,
        moveType: "freeScroll",
      });
      const flicking = flickingInfo.instance;

      let destPos = 0;

      const restore = spy();
      const change = spy(e => {
        e.axesEvent && (destPos = e.axesEvent.destPos.flick);
      });
      const moveEnd = spy();

      flicking.on("restore", restore);
      flicking.on("change", change);
      flicking.on("moveEnd", moveEnd);

      // When
      await simulate(flickingInfo.element, { deltaX: -400, duration: 50 });
      await waitEvent(flicking, "moveEnd");

      const index = flicking.getIndex();
      const flick = moveEnd.args[0][0].axesEvent.currentTarget.get(["flick"]).flick;
      const scrollAreaSize = (flicking as any).viewport.getScrollAreaSize();

      // call change event
      const targetIndex = index === 2 // Last panel's index is 2
        ? 0
        : index + 1;
      flicking.moveTo(targetIndex, 0);

      // Then
      expect(restore.callCount).to.be.equals(0);
      expect(change.callCount).to.be.equals(2);
      expect(moveEnd.callCount).to.be.equals(2);
      expect(destPos).to.be.not.equals(0);
      expect(flick).to.be.equals(destPos % scrollAreaSize);
      expect(flickingInfo.instance.getIndex()).to.be.equals(targetIndex);
    });
  });

  describe("resize()", () => {
    const testResize = async (
      initial: { width: number, expected: number },
      resize: { width: number, expected: number },
      gap: number,
    ) => {
      document.body.style.margin = "0";
      viewport.set(initial.width, 100);

      flickingInfo = createFlicking(horizontal.oneTenth, {
        circular: true,
        gap,
      });

      let panels = flickingInfo.element.querySelectorAll(".eg-flick-panel");

      expect(panels.length).equals(initial.expected);

      viewport.set(resize.width, 100);
      flickingInfo.instance.resize();

      panels = flickingInfo.element.querySelectorAll(".eg-flick-panel");

      expect(panels.length).equals(resize.expected);
    };

    it("shouldn't trigger any event while resizing", async () => {
      flickingInfo = createFlicking(horizontal.full);

      flickingInfo.instance.resize();

      expect(flickingInfo.events).to.empty;
    });

    it("should clone proper amount of panels(without gap)", () => {
      testResize(
        { width: 1000, expected: 12},
        { width: 500, expected: 12 },
        0,
      );
    });

    it("should clone proper amount of panels(with gap)", () => {
      testResize(
        { width: 1000, expected: 8},
        { width: 500, expected: 7 },
        50,
      );
    });

    it("shouldn't move camera position when it's freeScroll mode", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        moveType: "freeScroll",
      });
      const flicking = flickingInfo.instance;
      const flickingViewport = (flicking as any).viewport as Viewport;
      await simulate(flickingInfo.element, {
        deltaX: -200,
        duration: 100,
      });
      await waitEvent(flicking, "moveEnd");
      const prevCameraPosition = flickingViewport.getCameraPosition();

      // When
      flicking.resize();

      // Then
      const afterCameraPosition = flickingViewport.getCameraPosition();
      expect(prevCameraPosition).equals(afterCameraPosition);
    });
  });

  describe("getStatus()", () => {
    it("should return correct index", () => {
      // Given
      const defaultIndex = 1;
      flickingInfo = createFlicking(horizontal.full, {
        defaultIndex,
      });

      // When
      const flicking = flickingInfo.instance;
      const state = flicking.getStatus();

      // Then
      expect(state.index).equals(defaultIndex);
    });

    it("should return correct index after moving", () => {
      // Given
      const indexToMove = 2;
      flickingInfo = createFlicking(horizontal.full, {
        defaultIndex: 0,
      });

      // When
      const flicking = flickingInfo.instance;
      flicking.moveTo(indexToMove, 0);
      const state = flicking.getStatus();

      // Then
      expect(state.index).equals(indexToMove);
    });

    it("should return panels in string correctly", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full);

      // When
      const flicking = flickingInfo.instance;
      const panelCount = flicking.getPanelCount();
      const state = flicking.getStatus();

      // Then
      expect(state.panels.length).equals(panelCount);
      expect(state.panels.every(panel => typeof panel.html === "string")).to.be.true;
      expect(state.panels.every(panel => typeof panel.index === "number")).to.be.true;
    });

    it("shouldn't return cloned panels", () => {
      // Given
      flickingInfo = createFlicking(horizontal.shouldClone4, {
        circular: true,
      });

      // When
      const flicking = flickingInfo.instance;
      const panelCount = flicking.getPanelCount(); // Returns original panel count
      const state = flicking.getStatus();

      // Then
      expect(state.panels.length).equals(panelCount);
    });
  });

  describe("setStatus()", () => {
    it("can restore index", () => {
      // Given
      const beforeIndex = 0;
      const afterIndex = 2;
      flickingInfo = createFlicking(horizontal.full, {
        defaultIndex: beforeIndex,
      });

      // When
      const flicking = flickingInfo.instance;
      const state = flicking.getStatus();
      flicking.moveTo(afterIndex, 0);
      flicking.setStatus(state);

      // Then
      expect(flicking.getIndex()).equals(beforeIndex);
    });

    it("should restore previous state of panels", () => {
      // Given
      const classToAdd = "this-is-test-class";
      flickingInfo = createFlicking(horizontal.full);

      // When
      const flicking = flickingInfo.instance;
      const state = flicking.getStatus();
      flicking.getCurrentPanel()
        .update(el => el.classList.add(classToAdd));
      flicking.setStatus(state);

      // Then
      const currentPanelElement = flicking.getCurrentPanel().getElement();
      expect(currentPanelElement.classList.contains(classToAdd)).to.be.false;
    });

    it("shouldn't trigger events while restoring", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        defaultIndex: 0,
      });

      // When
      const flicking = flickingInfo.instance;
      const state = flicking.getStatus();
      // Move to another panel, to make flikcing should change camera position
      flicking.moveTo(1, 0);
      flickingInfo.eventFired.splice(0); // clear eventFired
      flicking.setStatus(state);

      // Then
      expect(flickingInfo.eventFired).to.be.empty;
    });

    it("current panel can be set correctly", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none);

      const flicking = flickingInfo.instance;
      flicking.replace(2, "<div><p></p></div>");

      // When
      // Check issue #180 https://github.com/naver/egjs-flicking/issues/180
      flicking.setStatus(flicking.getStatus());

      // Then
      expect(flicking.getCurrentPanel()).not.to.be.null;
      expect(flicking.getCurrentPanel().getIndex()).equals(2);
    });
  });

  describe("append()", () => {
    it("can append single element", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none);
      const flicking = flickingInfo.instance;

      // When
      const firstPanel = flicking.append("<div></div>")[0];
      const secondPanel = flicking.append(document.createElement("div"))[0];

      // Then
      expect(flicking.getCurrentPanel()).not.to.be.null;
      expect(flicking.getPanelCount()).equals(2);
      expect(firstPanel.getIndex()).equals(0);
      expect(secondPanel.getIndex()).equals(1);
    });

    it("can append multiple elements", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none);
      const flicking = flickingInfo.instance;

      // When
      const appendedPanels = flicking.append(["<div></div>", document.createElement("div"), "<div></div><div></div>"]);

      // Then
      expect(flicking.getCurrentPanel()).not.to.be.null;
      expect(flicking.getPanelCount()).equals(4);
      appendedPanels.forEach((panel, idx) => {
        expect(panel.getIndex()).equals(idx);
      });
    });

    it("can append HTML string with multiple elements", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none);
      const flicking = flickingInfo.instance;

      // When
      const appendedPanels = flicking.append(`
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      `);

      // Then
      expect(flicking.getCurrentPanel()).not.to.be.null;
      expect(flicking.getPanelCount()).equals(5);
      appendedPanels.forEach((panel, idx) => {
        expect(panel.getIndex()).equals(idx);
      });
    });

    it("can append panel to correct position", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none);
      const flicking = flickingInfo.instance;
      flicking.replace(99, "<div></div>");

      // When
      const appendedPanel = flicking.append("<div></div>")[0];

      // Then
      expect(appendedPanel.getIndex()).equals(100);
    });
  });

  describe("replace()", () => {
    it("can insert panel at index 0", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full);
      const flicking = flickingInfo.instance;

      // When
      const insertedPanel = flicking.replace(0, "<div></div>")[0];

      // Then
      expect(insertedPanel.getIndex()).equals(0);
      flicking.getAllPanels().forEach((panel, index) => {
        expect(panel.getIndex()).equals(index);
      });
    });

    it("can insert multiple panels at index 0", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full);
      const flicking = flickingInfo.instance;

      // When
      const insertedPanels = flicking.replace(0, "<div></div><div></div><div></div>");

      // Then
      insertedPanels.forEach((panel, index) => {
        expect(panel.getIndex()).equals(index);
      });
      // All panels before insertion should increase its index
      flicking.getAllPanels().forEach((panel, index) => {
        expect(panel.getIndex()).equals(index);
      });
    });

    it("can insert panel at index above 0", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full);
      const flicking = flickingInfo.instance;

      // When
      const insertedPanel = flicking.replace(1, "<div></div>")[0];

      // Then
      expect(insertedPanel.getIndex()).equals(1);
      flicking.getAllPanels().forEach((panel, index) => {
        expect(panel.getIndex()).equals(index);
      });
    });

    it("can insert multiple panels at index above 0", () => {
      // Given
      flickingInfo = createFlicking(horizontal.variant);
      const flicking = flickingInfo.instance;

      // When
      const insertedPanels = flicking.replace(1, ["<div></div>", "<div></div>", "<div></div>"]);

      // Then
      insertedPanels.forEach((panel, index) => {
        expect(panel.getIndex()).equals(index + 1);
      });
      flicking.getAllPanels().forEach((panel, index) => {
        expect(panel.getIndex()).equals(index);
      });
    });

    it("can insert to empty position", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none);
      const flicking = flickingInfo.instance;

      // When
      const insertedPanel = flicking.replace(5, "<div></div>")[0];

      // Then
      expect(insertedPanel.getIndex()).equals(5);
      expect(flicking.getCurrentPanel()).is.not.null;
      expect(flicking.getCurrentPanel().getIndex()).equals(insertedPanel.getIndex());
      expect(flicking.getIndex()).equals(5);
      expect(flicking.getPanel(0)).is.null;
      expect(flicking.getPanel(5).getIndex()).deep.equals(insertedPanel.getIndex());
    });

    it("will replace existing panel index if inserting index is occupied", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none);
      const flicking = flickingInfo.instance;

      // When
      flicking.replace(5, "<div></div>");
      flicking.replace(3, ["<div></div>", "<div></div>", "<div></div>"]);

      // Then
      // Panel indexes should be 3, 4, 5, 6
      flicking.getAllPanels().forEach((panel, index) => {
        expect(panel.getIndex()).equals(3 + index);
      });
    });
  });

  describe("remove()", () => {
    it("can remove all panels", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none);
      const flicking = flickingInfo.instance;
      flicking.append("<div></div>");

      // When
      flicking.remove(0);

      // Then
      expect(flicking.getPanelCount()).equals(0);
      expect(flicking.getCurrentPanel()).to.be.null;
      expect(flicking.getIndex()).equals(-1);
    });

    it("should decrease all panel indexes behind it", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full);
      const flicking = flickingInfo.instance;

      // When
      flicking.remove(0);

      // Then
      expect(flicking.getIndex()).equals(0);
      expect(flicking.getAllPanels().every((panel, idx) => panel.getIndex() === idx)).to.be.true;
    });

    it("should decrease all panel indexes behind it even if it's empty", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none);
      const flicking = flickingInfo.instance;
      flicking.replace(2, "<div></div>");

      // When
      flicking.remove(0);

      // Then
      expect(flicking.getIndex()).equals(1);
      expect(flicking.getPanel(1)).is.not.null;
      expect(flicking.getPanel(2)).is.null;
    });
  });

  describe("setLastIndex()", () => {
    let needPanelEvents: NeedPanelEvent[] = [];

    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.none, {
        infinite: true,
      });
      flickingInfo.instance.on(EVENTS.NEED_PANEL, (e: NeedPanelEvent) => {
        needPanelEvents.push(e);
      });
    });

    afterEach(() => {
      needPanelEvents = [];
    });

    const doLeftAndRightFlicking = async () => {
      // Left flicking first
      await simulate(flickingInfo.element, { deltaX: -1000, duration: 50 });

      // Right flicking next
      await simulate(flickingInfo.element, { deltaX: 2000, duration: 50 });
    };

    it("won't trigger event when lastIndex is below 0", async () => {
      // Given
      const flicking = flickingInfo.instance;
      flicking.setLastIndex(-1);

      // When
      await doLeftAndRightFlicking();

      // Then
      expect(needPanelEvents).to.be.empty;
    });

    it("will trigger event with correct range value after setting last index", async () => {
      // Given
      const givenLastIndex = 5;
      const flicking = flickingInfo.instance;

      // When
      flicking.setLastIndex(-1);
      flicking.setLastIndex(givenLastIndex);

      // Then
      expect(needPanelEvents.length).equals(1);

      const event = needPanelEvents[0];
      expect(event.range.min).equals(0);
      expect(event.range.max).equals(givenLastIndex);
      expect(event.range.length).equals(givenLastIndex + 1);
    });

    it("can still trigger events when empty panels exist where index below maximum panel count", async () => {
      // Given
      const givenLastIndex = 5;
      const flicking = flickingInfo.instance;
      flicking.setLastIndex(givenLastIndex);

      // When
      flicking.replace(givenLastIndex, createHorizontalElement(50));

      // Then
      // This should be happened twice, after setLastIndex, and after replace
      expect(needPanelEvents.length).equals(2);

      const event = needPanelEvents[1];
      expect(event.direction).equals(DIRECTION.PREV);
      expect(event.range.min).equals(0);
      expect(event.range.max).equals(givenLastIndex - 1);
    });

    it("can't insert more panels after lastIndex", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none, {
        infinite: true,
        lastIndex: 5,
      });
      const flicking = flickingInfo.instance;

      // When
      const panels = counter(7).map(() => {
        return createHorizontalElement(50);
      });
      flicking.append(panels);

      // Then
      expect(needPanelEvents).to.be.empty;
      expect(flicking.getPanelCount()).equals(6);
      expect(flicking.getPanel(6)).to.be.null;
    });

    it("will remove panels above lastIndex after adding more panels", () => {
      // Given
      const givenLastIndex = 0;
      const flicking = flickingInfo.instance;
      const originalPanel = createHorizontalElement(50);

      flicking.setLastIndex(givenLastIndex);
      flicking.append(originalPanel);

      // When
      flicking.prepend(createHorizontalElement(50));

      // Then
      expect(flicking.getPanelCount()).equals(1);
      expect(flicking.getPanel(0).getElement()).not.equals(originalPanel);
    });
  });

  describe("sync() in non-circular mode", () => {
    it("can sync with externally rendered elements when there are no panels", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none, {
        renderExternal: true,
      });
      const flicking = flickingInfo.instance;
      const cameraElement = (flicking as any).viewport.cameraElement as HTMLElement;

      // When
      const newElements = counter(3).map(index => {
        const tempElement = document.createElement("div");
        // Fix its size to 100px
        tempElement.innerHTML = createPanelElement(index, "panel-horizontal-100px");

        const newElement = tempElement.children[0];
        cameraElement.appendChild(newElement);

        return newElement as HTMLElement;
      });

      flicking.sync({
        list: newElements,
        maintained: [],
        added: [0, 1, 2],
      });

      // Then
      const panelSize = 100;
      expect(flicking.getPanelCount()).equals(3);
      expect(flicking.getCloneCount()).equals(0);
      flicking.getAllPanels().forEach(panel => {
        expect(panel.getElement()).not.to.be.null;
        expect(panel.getPosition()).equals(panelSize * panel.getIndex());
      });
    });

    it("can sync with externally rendered elements", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        renderExternal: true,
      });
      const flicking = flickingInfo.instance;
      const cameraElement = (flicking as any).viewport.cameraElement as HTMLElement;
      const originalLastPanel = flicking.getAllPanels()[flicking.getPanelCount() - 1];
      const originalElements = flicking.getAllPanels().map(panel => panel.getElement());

      // When
      const newElements = counter(3).map(index => {
        const tempElement = document.createElement("div");
        // Fix its size to 100px
        tempElement.innerHTML = createPanelElement(index, "panel-horizontal-100px");

        const newElement = tempElement.children[0];
        cameraElement.appendChild(newElement);

        return newElement as HTMLElement;
      });

      flicking.sync({
        list: [...originalElements, ...newElements],
        maintained: [[0, 0], [1, 1], [2, 2]],
        added: [3, 4, 5],
      });

      // Then
      const panelSize = 100;
      expect(flicking.getPanelCount()).equals(6);
      expect(flicking.getCloneCount()).equals(0);
      // Check size of newly added panels
      flicking.getAllPanels().forEach(panel => {
        expect(panel.getElement()).not.to.be.null;
      });
      flicking.getAllPanels().slice(3).forEach((panel, idx) => {
        expect(panel.getPosition())
          .equals(originalLastPanel.getPosition() + originalLastPanel.getSize() + panelSize * idx);
      });
    });
  });

  describe("sync() in circular mode", () => {
    it("can sync with externally rendered elements when there are no panels", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none, {
        renderExternal: true,
        circular: true,
      });
      const flicking = flickingInfo.instance;
      const cameraElement = (flicking as any).viewport.cameraElement as HTMLElement;

      // When
      const newElements = counter(3).map(index => {
        const tempElement = document.createElement("div");
        // Fix its size to 100px
        tempElement.innerHTML = createPanelElement(index, "panel-horizontal-100px");

        const newElement = tempElement.children[0];
        cameraElement.appendChild(newElement);

        return newElement as HTMLElement;
      });

      // In circular mode, flicking must be syned if clone count is changed
      flicking.sync({
        list: newElements,
        maintained: [],
        added: [0, 1, 2],
      });

      const calcedCloneCount = flicking.getCloneCount();
      const originalElements = flicking.getAllPanels().map(panel => panel.getElement());
      const clonedElements = counter(calcedCloneCount).reduce((elements: HTMLElement[]) => {
        flicking.getAllPanels().forEach(panel => {
          const clonedElement = panel.getElement().cloneNode(true);
          cameraElement.appendChild(clonedElement);
          elements.push(clonedElement as HTMLElement);
        });
        return elements;
      }, []);

      flicking.sync({
        list: [...originalElements, ...clonedElements],
        maintained: [[0, 0], [1, 1], [2, 2]],
        added: [...counter(calcedCloneCount * originalElements.length).map(index => 3 + index)],
      });
      const finalCloneCount = flicking.getCloneCount();

      // Then
      expect(flicking.getPanelCount()).equals(3);
      expect(flicking.getCloneCount()).equals(calcedCloneCount);
      expect(calcedCloneCount).equals(finalCloneCount);
      flicking.getAllPanels(true).forEach((panel, idx) => {
        expect(panel.getElement()).not.to.be.null;
        // As cloned position shouldn't have to be prev + 100
        // Just make sure that panel is re-positioned.
        expect(panel.getPosition()).not.equals((panel as Panel).prevSibling.getPosition());
      });
    });

    it("can sync with externally rendered clone elements", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        renderExternal: true,
        circular: true,
      });
      const flicking = flickingInfo.instance;
      const cameraElement = (flicking as any).viewport.cameraElement as HTMLElement;

      // When
      const originalElements = flicking.getAllPanels().map(panel => panel.getElement());
      // No cloned elements at this moment
      const originalCloneCount = flicking.getCloneCount();
      const clonedElements = counter(originalCloneCount).reduce((elements: HTMLElement[]) => {
        flicking.getAllPanels().forEach(panel => {
          const clonedElement = panel.getElement().cloneNode(true);
          cameraElement.appendChild(clonedElement);
          elements.push(clonedElement as HTMLElement);
        });
        return elements;
      }, []);

      flicking.sync({
        list: [...originalElements, ...clonedElements],
        maintained: [
          ...originalElements.map((val, idx) => [idx, idx]),
        ],
        added: [
          ...clonedElements.map((val, idx) => originalElements.length + idx),
        ],
      });

      // Then
      const finalCloneCount = flicking.getCloneCount();
      expect(flicking.getPanelCount()).equals(3);
      expect(finalCloneCount).equals(originalCloneCount);
      flicking.getAllPanels(true).forEach(panel => {
        expect(panel.getElement()).not.to.be.null;
        // As cloned position shouldn't have to be prev + 100
        // Just make sure that panel is re-positioned.
        expect(panel.getPosition()).not.equals((panel as Panel).prevSibling.getPosition());
      });
    });
  });
});

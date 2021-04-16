import { spy } from "sinon";

import Flicking from "../../src/Flicking";
import { FlickingEvent, FlickingPanel, NeedPanelEvent } from "../../src/types";
import { horizontal, panel as createPanelElement, vertical } from "./assets/fixture";
import { createFlicking, cleanup, simulate, createHorizontalElement, tick, createFixture } from "./assets/utils";
import { EVENTS, DIRECTION, STATE_TYPE } from "../../src/consts";
import { counter, toArray } from "../../src/utils";
import Viewport from "../../src/components/Viewport";
import Panel from "../../src/components/Panel";
import { diff } from "@egjs/list-differ";

declare var viewport: any;

describe("Methods call", () => {
  let flickingInfo: {
    element: HTMLElement,
    instance: Flicking,
    events: FlickingEvent[],
    eventFired: string[],
    eventDirection: string[],
  };
  afterEach(() => {
    cleanup();
  });

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

      expect(flickingInfo.instance.getIndex()).to.equal(0);
    });

    it("should circulate index in circular mode(moving to prev panel)", async () => {
      flickingInfo = createFlicking(horizontal.full, {
        circular: true,
        defaultIndex: 0,
      });

      await simulate(flickingInfo.element, { deltaX: 100 });

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
      const beforeCameraPos = (flicking as any).viewport.getCameraPosition();
      const beforePanelPos = flicking.getCurrentPanel().getPosition();

      // When
      flicking.next(200);
      tick(300);

      // Then
      const afterCameraPos = (flicking as any).viewport.getCameraPosition();
      const afterPanelPos = flicking.getCurrentPanel().getPosition();

      expect(Math.abs(afterCameraPos - beforeCameraPos)).equals(afterPanelPos - beforePanelPos);
    });

    it("changes index correctly", async () => {
      const flicking = flickingInfo.instance;
      const indexBefore = flicking.getIndex();
      flicking.next(200);
      tick(300);

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
      simulate(flickingInfo.element, { deltaX: 10, duration: 200 }, 200);
      flicking.next();
      tick(100);

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
      tick(300);

      // Then
      const afterCameraPos = -cameraElement.getBoundingClientRect().left; // position is set multiplied by -1
      const afterPanelPos = flicking.getCurrentPanel().getPosition();

      expect(afterCameraPos - beforeCameraPos).equals(afterPanelPos - beforePanelPos);
    });

    it("changes index correctly", async () => {
      const flicking = flickingInfo.instance;
      const indexBefore = flicking.getIndex();
      flicking.prev(200);
      tick(300);

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
      simulate(flickingInfo.element, { deltaX: 10, duration: 200 }, 200);
      flicking.prev();
      tick(100);

      expect(flickingInfo.eventFired.some(eventType => eventType === EVENTS.CHANGE)).to.be.false;
    });
  });

  describe("moveTo()", () => {
    it("can change index correctly", async () => {
      flickingInfo = createFlicking(horizontal.variant);

      const flicking = flickingInfo.instance;
      const indexToMove = 3;

      flicking.moveTo(indexToMove, 200);
      tick(300);

      expect(flicking.getIndex()).equals(indexToMove);
    });

    it("can change index correctly in circular mode", async () => {
      flickingInfo = createFlicking(horizontal.variant);

      const flicking = flickingInfo.instance;
      let indexToMove = 5;

      flicking.moveTo(indexToMove, 200);
      tick(300);

      expect(flicking.getIndex()).equals(indexToMove);

      indexToMove = 2;

      flicking.moveTo(indexToMove, 200);
      tick(300);

      expect(flicking.getIndex()).equals(indexToMove);
    });

    it("can choose shortest path correctly in circular mode(next to prev)", async () => {
      flickingInfo = createFlicking(horizontal.full, { circular: true });

      const flicking = flickingInfo.instance;

      flicking.moveTo(2, 200);
      tick(300);

      expect(flickingInfo.eventDirection[0]).equals(DIRECTION.PREV);
    });

    it("can choose shortest path correctly in circular mode(prev to next)", async () => {
      flickingInfo = createFlicking(horizontal.full, { circular: true, defaultIndex: 2 });

      const flicking = flickingInfo.instance;

      flicking.moveTo(0, 200);
      tick(300);

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
      expect(flickingInfo.eventFired.length).equals(0);
    });

    it("should return flicking instance itself", () => {
      const flicking = flickingInfo.instance;
      const returnVal = flicking.disableInput();

      expect(returnVal).deep.equals(flickingInfo.instance);
    });

    it("should make moveTo to be callable when it's called while holding panels", async () => {
      // Given
      const flicking = flickingInfo.instance;
      simulate(flickingInfo.element, { deltaX: -100, duration: 500 }, 10);

      // When
      flicking.disableInput();

      // Then
      flicking.moveTo(2, 500);
      tick(1000);
      expect(flicking.getIndex()).to.equal(2);
    });

    it("should remove animation of previous gesture when it's called", async () => {
      // Given
      const flicking = flickingInfo.instance;
      simulate(flickingInfo.element, { deltaX: -100, duration: 50 }, 10);

      // When
      flicking.disableInput();
      flicking.enableInput();

      // Then
      tick(30);
      expect((flicking as any).viewport.stateMachine.state.type).to.equal(STATE_TYPE.IDLE);
      expect(flicking.getIndex()).to.equal(0);

      await simulate(flickingInfo.element, { deltaX: -100, duration: 50 });
      expect(flicking.getIndex()).not.to.equal(0);
    });
  });

  describe("destroy()", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full);
      flickingInfo.instance.destroy();
    });

    it("should not trigger events anymore", async () => {
      await simulate(flickingInfo.element, { deltaX: -100 });
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

    describe("With preserveUI option", () => {
      beforeEach(() => {
        // Given
        flickingInfo = createFlicking(horizontal.full);

        // When
        flickingInfo.instance.destroy({ preserveUI: true });
      });

      it("should have viewport & camera element", () => {
        // Then
        const flickingElement = flickingInfo.element;
        const viewportElement = flickingElement.querySelector(".eg-flick-viewport");
        const cameraElement = flickingElement.querySelector(".eg-flick-camera");

        expect(viewportElement).not.to.be.null;
        expect(cameraElement).not.to.be.null;
      });

      it("should maintain classes on panels", () => {
        // Then
        const flickingElement = flickingInfo.element;
        const panelElements = flickingElement.querySelectorAll(".eg-flick-panel");

        expect(panelElements.length).not.equals(0);
      });

      it("should maintain styles on panels", () => {
        // Then
        const flickingElement = flickingInfo.element;
        const panels = toArray(flickingElement.querySelectorAll(".eg-flick-panel")) as HTMLElement[];

        expect(panels.every(panelEl => panelEl.style.left !== "")).to.be.true;
      });
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
      flickingInfo = createFlicking(horizontal.half, { circular: true });

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
      tick(100);
      const panels2 = flickingInfo.instance.getVisiblePanels();

      // Then
      expect(panels1.length).to.be.equals(1);
      expect(panels1[0].getIndex()).to.be.equals(0);

      expect(panels2.length).to.be.equals(1);
      expect(panels2[0].getIndex()).to.be.equals(1);
    });

    it("should check 'getVisiblePanels' in panel(circular: true)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, { circular: true });

      // When
      const panels1 = flickingInfo.instance.getVisiblePanels();

      flickingInfo.instance.prev(0);
      tick(100);
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
      tick(200);

      steps[1] = panelArr.map(i => getPanels(i, 3))
        .map(panels => panels.map(panel => panel.getProgress()));

      flickingInfo.instance.next();
      tick(200);

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
      tick(150);

      // 1, 2, 0(3), 1(4), 2(5), 0(6)
      steps[1] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getProgress()));

      // 1 => 2
      flickingInfo.instance.next();
      tick(150);

      // 2, 0(3), 1(4), 2(5), 0(6), 1(7)
      steps[2] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getProgress()));

      // 2 => 0
      flickingInfo.instance.next();
      tick(150);

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
      tick(150);

      // 1, 2, 0(3), 1(4), 2(5), 0(6)
      steps[1] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getOutsetProgress()));

      // 1 => 2
      flickingInfo.instance.next();
      tick(150);

      // 2, 0(3), 1(4), 2(5), 0(6), 1(7)
      steps[2] = panelArr.map(i => getPanels(i, 8, i + 1))
        .map(panels => panels.map(panel => panel.getOutsetProgress()));

      // 2 => 0
      flickingInfo.instance.next();
      tick(150);

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
          flickingInfo = createFlicking(horizontal.panel30, { bound: true, hanger, anchor });

          const inst = flickingInfo.instance;
          const steps: number[][] = [];

          // When
          // [0, 1, 2, 3, 4, 5]
          steps[0] = inst.getAllPanels().map(panel => panel.getProgress());

          for (let i = 1; i <= 5; ++i) {
            inst.next(0);
            tick(100);
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
      viewport.set(1000, 100);
      // Given
      flickingInfo = createFlicking(horizontal.variant2, { circular: true });

      const panelArr = [0, 1, 2];
      const steps: number[][][] = [];
      steps[0] = panelArr.map(i => getPanels(i, 8))
        .map(panels => panels.map(panel => panel.getVisibleRatio()));

      // When
      // 0 => 1
      flickingInfo.instance.next(300);
      tick(450);

      steps[1] = panelArr.map(i => getPanels(i, 8))
        .map(panels => panels.map(panel => panel.getVisibleRatio()));

      // 1 => 2
      flickingInfo.instance.next(300);
      tick(450);

      steps[2] = panelArr.map(i => getPanels(i, 8))
        .map(panels => panels.map(panel => panel.getVisibleRatio()));

      // 2 => 3
      flickingInfo.instance.next(300);
      tick(450);

      steps[3] = panelArr.map(i => getPanels(i, 8))
        .map(panels => panels.map(panel => panel.getVisibleRatio()));

      // 3 => 4
      flickingInfo.instance.next(300);
      tick(450);

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
      const index = flicking.getIndex();

      // not call change event
      flicking.moveTo(index, 0);
      tick(100);

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
        { width: 1000, expected: 12 },
        { width: 500, expected: 12 },
        0,
      );
    });

    it("should clone proper amount of panels(with gap)", () => {
      testResize(
        { width: 1000, expected: 8 },
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
      const prevCameraPosition = flickingViewport.getCameraPosition();

      // When
      flicking.resize();

      // Then
      const afterCameraPosition = flickingViewport.getCameraPosition();
      expect(prevCameraPosition).closeTo(afterCameraPosition, 0.001);
    });

    it("shouldn't be scrolled when there's no viewport size change after resize(issue #333)", () => {
      // Given
      const wrapper = createFixture(horizontal.hasBigHeight);
      const sandbox = wrapper.parentElement;
      const someFixture = createFixture(horizontal.full);

      sandbox.appendChild(someFixture);
      wrapper.style.height = "auto";

      const flicking = new Flicking(wrapper, {
        autoResize: true,
      });

      // When
      window.scrollTo(0, 1000); // scroll to half of wrapper size
      flicking.resize(); // then call resize

      // Then
      expect(window.scrollY).equals(1000); // Should not be scrolled to top(0)
    });

    it("shouldn't be scrolled if second panel is selected and freescroll & bound option is enabled (#376)", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30N(10), {
        moveType: "freeScroll",
        bound: true,
      });

      // When
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport;
      const origCameraPos = viewport.getCameraPosition();
      flicking.moveTo(1, 0);
      const boundCameraPos = viewport.getCameraPosition();
      flicking.resize();

      // Then
      const resizeCameraPos = viewport.getCameraPosition();
      expect(origCameraPos).equals(boundCameraPos);
      expect(origCameraPos).equals(resizeCameraPos);
    });

    it("shouldn't be scrolled if second to last panel is selected and freescroll & bound option is enabled (#376)", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30N(10), {
        moveType: "freeScroll",
        bound: true,
      });

      // When
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport;
      flicking.moveTo(9, 0);
      const origCameraPos = viewport.getCameraPosition();
      flicking.moveTo(8, 0);
      const boundCameraPos = viewport.getCameraPosition();
      flicking.resize();

      // Then
      const resizeCameraPos = viewport.getCameraPosition();
      expect(origCameraPos).equals(boundCameraPos);
      expect(origCameraPos).equals(resizeCameraPos);
    });

    it("should be scrolled if panel is prepended and freescroll & bound option is enabled (#376)", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30N(10), {
        moveType: "freeScroll",
        bound: true,
      });

      // When
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport;
      const origCameraPos = viewport.getCameraPosition();
      flicking.moveTo(1, 0);
      const boundCameraPos = viewport.getCameraPosition();
      flicking.prepend(horizontal.fullN(1));

      // Then
      const resizeCameraPos = viewport.getCameraPosition();
      expect(origCameraPos).equals(boundCameraPos);
      expect(origCameraPos).not.equals(resizeCameraPos);
      expect(boundCameraPos).not.equals(resizeCameraPos);
    });

    it("should be scrolled if second panel is selected and freescroll is enabled (#376)", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30N(10), {
        moveType: "freeScroll",
      });

      // When
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport;
      const origCameraPos = viewport.getCameraPosition();
      flicking.moveTo(1, 0);
      const movedCameraPos = viewport.getCameraPosition();
      flicking.resize();

      // Then
      const resizeCameraPos = viewport.getCameraPosition();
      expect(origCameraPos).not.equals(movedCameraPos);
      expect(origCameraPos).not.equals(resizeCameraPos);
      expect(movedCameraPos).equals(resizeCameraPos);
    });

    it("should be scrolled if second to last panel is selected and freescroll is enabled (#376)", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30N(10), {
        moveType: "freeScroll",
      });

      // When
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport;
      flicking.moveTo(9, 0);
      const origCameraPos = viewport.getCameraPosition();
      flicking.moveTo(8, 0);
      const movedCameraPos = viewport.getCameraPosition();
      flicking.resize();

      // Then
      const resizeCameraPos = viewport.getCameraPosition();
      expect(origCameraPos).not.equals(movedCameraPos);
      expect(origCameraPos).not.equals(resizeCameraPos);
      expect(movedCameraPos).equals(resizeCameraPos);
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
      expect(state.panels.every(panel => typeof panel.position === "number")).to.be.true;
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

    it("can restore panel's position correctly", () => {
      // Given
      const { instance: flicking } = createFlicking(horizontal.fullN(3));
      const panelSize = flicking.getPanel(0).getSize();
      const panels = flicking.getAllPanels() as Panel[];
      panels.forEach((panel, idx) => {
        // Reset start position to -1000
        panel.setPosition(-1000 + panelSize * idx);
      });
      flicking.moveTo(2, 0); // look at panel 2

      // When
      flicking.setStatus(flicking.getStatus());

      // Then
      const restoredPanels = flicking.getAllPanels() as Panel[];
      expect(restoredPanels[0].getPosition()).to.equal(-1000);
      expect(restoredPanels[1].getPosition()).to.equal(-1000 + panelSize);
      expect(restoredPanels[2].getPosition()).to.equal(-1000 + 2 * panelSize);
      expect((flicking as any).viewport.state.position).to.equal(flicking.getPanel(2).getPosition());
    });

    it("can restore panel's position correctly when getStatus is called from non-zero index panel", () => {
      // Given
      flickingInfo = createFlicking(horizontal.fullN(5));

      const flicking = flickingInfo.instance;
      flicking.moveTo(3, 0);
      const status = flicking.getStatus();
      const prevPositions = flicking.getAllPanels().map(panel => parseFloat(panel.getElement().style.left));

      // When
      flicking.setStatus(status);
      const positions = flicking.getAllPanels().map(panel => parseFloat(panel.getElement().style.left));

      // Then
      expect(positions.every((pos, idx) => pos === prevPositions[idx])).to.be.true;
      // Camera position should be on the third panel
      expect((flicking as any).viewport.state.position).to.equal(flicking.getPanel(3).getPosition());
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
      // Children of camera element should be empty
      expect(flicking.getElement().children[0].children[0].children.length).equals(0);
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

  describe("getRenderingIndexes()", () => {
    it("should return correct rendering indexes when only visible panels are changed and circular option is false", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        circular: false,
      });
      const flicking = flickingInfo.instance;

      // When
      const prevItems = [0, 1, 2, 3, 4, 5];
      const newItems = [0, 1, 2, 3, 4, 5];
      const result = diff(prevItems, newItems);

      flicking.beforeSync(result);
      const renderingIndexes = flicking.getRenderingIndexes(result);

      // Then
      expect(renderingIndexes).to.be.deep.equals([0, 1, 2]);
    });

    it("should return correct rendering indexes when only visible panels are changed and circular option is true", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        circular: true,
      });
      const flicking = flickingInfo.instance;

      // When
      const prevItems = [0, 1, 2, 3, 4, 5];
      const newItems = [0, 1, 2, 3, 4, 5];
      const result = diff(prevItems, newItems);

      flicking.beforeSync(result);
      const renderingIndexes = flicking.getRenderingIndexes(result);

      // Then
      // It is rendered [10, 11, 0, 1, 2]
      // ...so it should return Original (0, 1, 2) + Clone(10, 11)
      expect(renderingIndexes).to.be.deep.equals([0, 1, 2, 10, 11]);
    });

    it("should return correct rendering indexes, including appending panels", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        circular: false,
      });
      const flicking = flickingInfo.instance;

      // When
      const prevItems = [0, 1, 2, 3, 4, 5];
      const newItems = [0, 1, 2, 3, 4, 5, 6, 7];
      const result = diff(prevItems, newItems);

      flicking.beforeSync(result);
      const renderingIndexes = flicking.getRenderingIndexes(result);

      // Then
      // Render previously rendered(0, 1, 2) + new ones(6, 7)
      expect(renderingIndexes).to.be.deep.equals([0, 1, 2, 6, 7]);
    });

    it("should return correct rendering indexes when circular option in enabled, including appending panels", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        circular: true,
      });
      const flicking = flickingInfo.instance;

      // When
      const prevItems = [0, 1, 2, 3, 4, 5];
      const newItems = [0, 1, 2, 3, 4, 5, 6, 7];
      const result = diff(prevItems, newItems);

      flicking.beforeSync(result);
      const renderingIndexes = flicking.getRenderingIndexes(result);

      // Then
      // It should return in order of
      // Original (0, 1, 2)
      // Clone(12, 13), which has been pushed by 2
      // New panels(6, 7)
      expect(renderingIndexes).to.be.deep.equals([0, 1, 2, 12, 13, 6, 7]);
    });

    it("should return correct rendering indexes, including prepending panels", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        circular: false,
      });
      const flicking = flickingInfo.instance;

      // When
      const prevItems = [0, 1, 2, 3, 4, 5];
      const newItems = [-2, -1, 0, 1, 2, 3, 4, 5];
      const result = diff(prevItems, newItems);

      flicking.beforeSync(result);
      const renderingIndexes = flicking.getRenderingIndexes(result);

      // Then
      // It should return
      // Original(2, 3, 4), which has been pushed by 2
      // New panels(0, 1)
      expect(renderingIndexes).to.be.deep.equals([2, 3, 4, 0, 1]);
    });

    it("should return correct rendering indexes when circular option is enabled, including prepending panels", () => {
      // Given
      flickingInfo = createFlicking(horizontal.panel30, {
        renderOnlyVisible: true,
        circular: true,
      });
      const flicking = flickingInfo.instance;

      // When
      const prevItems = [0, 1, 2, 3, 4, 5];
      const newItems = [-2, -1, 0, 1, 2, 3, 4, 5];
      const result = diff(prevItems, newItems);

      flicking.beforeSync(result);
      const renderingIndexes = flicking.getRenderingIndexes(result);

      // Then
      // It should return
      // Original(2, 3, 4), which has been pushed by 2
      // Clones(14, 15), which has been pushed by 4(original 2 + clone 2)
      // New panels(0, 1)
      expect(renderingIndexes).to.be.deep.equals([2, 3, 4, 14, 15, 0, 1]);
    });

    it("should return correct rendering indexes when prepending panels (#389)", () => {
      // Given
      flickingInfo = createFlicking(horizontal.halfN(5), {
        renderOnlyVisible: true,
        circular: false,
      });
      const flicking = flickingInfo.instance;

      // When
      const prevItems = [0, 1, 2, 3, 4];
      const newItems = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4];
      const result = diff(prevItems, newItems);

      flicking.beforeSync(result);
      const renderingIndexes = flicking.getRenderingIndexes(result);

      // Then
      // It should return
      // Original(10, 11), which has been pushed by 10
      // New panels(0~9)
      expect(renderingIndexes).to.be.deep.equals([10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe("beforeSync() with renderOnlyVisible", () => {
    it("can add panel with beforeSync, renderOnlyVisible", () => {
      // Given
      // 30, 30, 30, 30, 30, 30
      flickingInfo = createFlicking(horizontal.panel30, {
        renderExternal: true,
        renderOnlyVisible: true,
      });

      const flicking = flickingInfo.instance;
      // 0, 1, 2, 3, 4, 5,
      const allElements = flicking.getAllPanels().map(panel => panel.getElement());
      // 0, DIV, 1, 2, 3, 4, 5
      const nextElements = [...allElements.slice(0, 1), document.createElement("div"), ...allElements.slice(1, 6)];
      const result = diff(allElements, nextElements);

      // When
      flicking.beforeSync(result);

      // Then
      expect(flicking.getPanelCount()).equals(7);
      expect(flicking.getPanel(1).getElement()).to.be.undefined;
    });

    it("can remove element with beforeSync, renderOnlyVisible", () => {
      // Given
      // 30, 30, 30, 30, 30, 30
      flickingInfo = createFlicking(horizontal.panel30, {
        renderExternal: true,
        renderOnlyVisible: true,
      });

      const flicking = flickingInfo.instance;

      // 0, 1, 2, 3, 4, 5,
      const allElements = flicking.getAllPanels().map(panel => panel.getElement());
      // 0, 2, 3, 4, 5
      const nextElements = [...allElements.slice(0, 1), ...allElements.slice(2, 6)];
      const result = diff(allElements, nextElements);

      // When
      const removingPanel = flicking.getPanel(1);
      flicking.beforeSync(result);

      // Then
      expect(flicking.getPanelCount()).equals(5);
      expect(flicking.getAllPanels().every(panel => panel !== removingPanel));
    });

    it("should set currentPanel after adding the panel when there're no panels", () => {
      // Given
      flickingInfo = createFlicking(horizontal.none, {
        renderExternal: true,
        renderOnlyVisible: true,
      });
      const flicking = flickingInfo.instance;

      // When
      const newElement = createHorizontalElement(100);
      (flicking as any).viewport.getCameraElement().appendChild(newElement);
      const addPanel = diff([], [newElement])
      const currentPanelBefore = flicking.getCurrentPanel();
      flicking.beforeSync(addPanel);

      // Then
      expect(currentPanelBefore).to.be.null;
      expect(flicking.getCurrentPanel()).not.to.be.null;
    });

    it("should set currentPanel to null after removing all the panels", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        renderExternal: true,
        renderOnlyVisible: true,
      });
      const flicking = flickingInfo.instance;

      // When
      const removeAllPanels = diff(flicking.getAllPanels().map(panel => panel.getElement()), []);
      const currentPanelBefore = flicking.getCurrentPanel();
      flicking.beforeSync(removeAllPanels);

      // Then
      expect(currentPanelBefore).not.to.be.null;
      expect(flicking.getCurrentPanel()).to.be.null;
    });
  });

  describe("sync()", () => {
    const renderOriginalElement = (count: number, className: string): HTMLElement[] => {
      const flicking = flickingInfo.instance;
      const cameraElement = (flicking as any).viewport.cameraElement as HTMLElement;
      const newElements = counter(count).map(index => {
        const tempElement = document.createElement("div");
        // Fix its size to 100px
        tempElement.innerHTML = createPanelElement(index, className);

        const newElement = tempElement.children[0];
        cameraElement.appendChild(newElement);

        return newElement as HTMLElement;
      });

      return newElements;
    };

    const renderClonedElement = (cloneCount: number): HTMLElement[] => {
      const flicking = flickingInfo.instance;
      const cameraElement = (flicking as any).viewport.cameraElement as HTMLElement;
      const clonedElements = counter(cloneCount).reduce((elements: HTMLElement[]) => {
        flicking.getAllPanels().forEach(panel => {
          const clonedElement = panel.getElement().cloneNode(true);
          cameraElement.appendChild(clonedElement);
          elements.push(clonedElement as HTMLElement);
        });
        return elements;
      }, []);

      return clonedElements;
    };

    describe("sync() in non-circular mode", () => {
      it("can sync with externally rendered elements when there are no panels", () => {
        // Given
        flickingInfo = createFlicking(horizontal.none, {
          renderExternal: true,
        });
        const flicking = flickingInfo.instance;

        // When
        const newElements = renderOriginalElement(3, "panel-horizontal-100px");
        flicking.sync({
          list: newElements,
          maintained: [],
          added: [0, 1, 2],
          changed: [],
          removed: [],
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
        const originalLastPanel = flicking.getAllPanels()[flicking.getPanelCount() - 1];
        const originalElements = flicking.getAllPanels().map(panel => panel.getElement());

        // When
        const newElements = renderOriginalElement(3, "panel-horizontal-100px");
        flicking.sync({
          list: [...originalElements, ...newElements],
          maintained: [[0, 0], [1, 1], [2, 2]],
          added: [3, 4, 5],
          changed: [],
          removed: [],
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

      it("can sync with externally rendered elements when prepended", () => {
        // Given
        flickingInfo = createFlicking(horizontal.full, {
          renderExternal: true,
        });
        const flicking = flickingInfo.instance;

        // When
        const originalElements = flicking.getAllPanels().map(panel => panel.getElement());
        const newElements = renderOriginalElement(1, "panel-horizontal-100px");
        flicking.sync({
          list: [...newElements, ...originalElements],
          maintained: [[0, 1], [1, 2], [2, 3]],
          added: [0],
          changed: [[0, 1], [1, 2], [2, 3]],
          removed: [],
        });

        // Then
        expect(flicking.getPanelCount()).equals(4);
        expect(flicking.getCloneCount()).equals(0);
        expect(flicking.getAllPanels().length).equals(4);
        flicking.getAllPanels().forEach((panel, idx) => {
          expect(panel.getIndex()).equals(idx);
          expect(panel.getElement()).not.to.be.null;
        });
        flicking.getAllPanels().slice(1).forEach((panel, idx) => {
          const prevPanel = flicking.getPanel(panel.getIndex() - 1);
          expect(panel.getPosition()).is.greaterThan(prevPanel.getPosition());
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

        // When
        const newElements = renderOriginalElement(3, "panel-horizontal-100px");

        // In circular mode, flicking must be syned if clone count is changed
        flicking.sync({
          list: newElements,
          maintained: [],
          added: [0, 1, 2],
          changed: [],
          removed: [],
        });

        const calcedCloneCount = flicking.getCloneCount();
        const originalElements = flicking.getAllPanels().map(panel => panel.getElement());
        const clonedElements = renderClonedElement(calcedCloneCount);

        flicking.sync({
          list: [...originalElements, ...clonedElements],
          maintained: [[0, 0], [1, 1], [2, 2]],
          added: [...counter(calcedCloneCount * originalElements.length).map(index => 3 + index)],
          changed: [],
          removed: [],
        });
        const finalCloneCount = flicking.getCloneCount();

        // Then
        expect(flicking.getPanelCount()).equals(3);
        expect(flicking.getCloneCount()).equals(calcedCloneCount);
        expect(calcedCloneCount).equals(finalCloneCount);
        flicking.getAllPanels(true).forEach(panel => {
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

        // When
        const originalElements = flicking.getAllPanels().map(panel => panel.getElement());
        // No cloned elements at this moment
        const originalCloneCount = flicking.getCloneCount();
        const clonedElements = renderClonedElement(originalCloneCount);

        flicking.sync({
          list: [...originalElements, ...clonedElements],
          maintained: [
            ...originalElements.map((val, idx) => [idx, idx]),
          ],
          added: [
            ...clonedElements.map((val, idx) => originalElements.length + idx),
          ],
          changed: [],
          removed: [],
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

      it("can apply css to externally rendered elements", () => {
        // Given
        flickingInfo = createFlicking(horizontal.none, {
          renderExternal: true,
          circular: true,
        });
        const flicking = flickingInfo.instance;

        // When
        const newElements = renderOriginalElement(3, "panel-horizontal-100px");

        // In circular mode, flicking must be syned if clone count is changed
        flicking.sync({
          list: newElements,
          maintained: [],
          added: [0, 1, 2],
          changed: [],
          removed: [],
        });

        const calcedCloneCount = flicking.getCloneCount();
        const originalElements = flicking.getAllPanels().map(panel => panel.getElement());
        const clonedElements = renderClonedElement(calcedCloneCount);

        flicking.sync({
          list: [...originalElements, ...clonedElements],
          maintained: [[0, 0], [1, 1], [2, 2]],
          added: [...counter(calcedCloneCount * originalElements.length).map(index => 3 + index)],
          changed: [],
          removed: [],
        });

        // Then
        const panelClassName = `${flicking.options.classPrefix}-panel`;
        flicking.getAllPanels(true).forEach(panel => {
          expect(panel.getElement().classList.contains(panelClassName)).to.be.true;
        });
      });
    });
  });

  describe("getSize()", () => {
    it("should return width if horizontal:true", () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, { horizontal: true });
      const flicking = flickingInfo.instance;
      const wrapper = flicking.getElement();
      const viewportEl = wrapper.querySelector(".eg-flick-viewport");

      // When
      const size = flicking.getSize();

      // Then
      expect(size).equals(viewportEl.getBoundingClientRect().width);
    });

    it("should return height if horizontal:false", () => {
      // Given
      flickingInfo = createFlicking(vertical.full, { horizontal: false });
      const flicking = flickingInfo.instance;
      const wrapper = flicking.getElement();
      const viewportEl = wrapper.querySelector(".eg-flick-viewport");

      // When
      const size = flicking.getSize();

      // Then
      expect(size).equals(viewportEl.getBoundingClientRect().height);
    });
  });
});

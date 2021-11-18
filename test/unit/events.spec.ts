import { SinonStatic } from "sinon";
import Flicking from "../../src/Flicking";
import { EVENTS, DIRECTION, MOVE_TYPE } from "../../src/consts";
import { FlickingEvent, NeedPanelEvent, FlickingOptions, SelectEvent } from "../../src/types";
import { horizontal, vertical } from "./assets/fixture";
import { createFlicking, createHorizontalElement, cleanup, simulate, tick } from "./assets/utils";
import { merge } from "../../src/utils";
import Viewport from "../../src/components/Viewport";

declare var sinon: SinonStatic;

describe("Events", () => {
  afterEach(() => {
    cleanup();
  });

  let flickingInfo: {
    element: HTMLElement,
    instance: Flicking,
    events: FlickingEvent[],
    eventFired: string[],
    eventDirection: string[],
  };

  const expectedEventOrder = {
    manual: [
      EVENTS.HOLD_START,
      EVENTS.MOVE_START,
      EVENTS.MOVE,
      EVENTS.HOLD_END,
      EVENTS.CHANGE,
      EVENTS.MOVE,
      EVENTS.MOVE_END,
    ],
    programmatic: [
      EVENTS.CHANGE,
      EVENTS.MOVE_START,
      EVENTS.MOVE,
      EVENTS.MOVE_END,
    ],
  };

  describe("Changing panel normally", () => {
    const runTest = async (simulateOption: object) => {
      const beforeIndex = flickingInfo.instance.getIndex();

      await simulate(flickingInfo.element, simulateOption);

      // Events are fired in correct order
      expect(expectedEventOrder.manual).to.deep.equal(flickingInfo.eventFired);
      // Index changed correctly
      const afterIndex = flickingInfo.instance.getIndex();
      expect(beforeIndex).not.equals(afterIndex);
    };

    const horizontalPanelTypes = {
      "horizontal-full": horizontal.full,
      "horizontal-half": horizontal.half,
      "horizontal-variant": horizontal.variant,
    };

    const verticalPanelTypes = {
      "vertical-full": vertical.full,
      "vertical-half": vertical.half,
      "vertical-variant": vertical.variant,
    };

    Object.keys(horizontalPanelTypes).forEach(type => {
      it(`will trigger events in correct order - (panel type: ${type})`, async () => {
        flickingInfo = createFlicking(horizontalPanelTypes[type]);
        await runTest({deltaX: -70});
      });
    });

    Object.keys(verticalPanelTypes).forEach(type => {
      it(`will trigger events in correct order - (panel type: ${type})`, async () => {
        flickingInfo = createFlicking(verticalPanelTypes[type], { horizontal: false });
        await runTest({deltaY: -70});
      });
    });
  });

  describe("When stop() is called for each event types", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full);
    });

    const orderedEventTypes = [
      EVENTS.HOLD_START,
      EVENTS.MOVE_START,
      EVENTS.MOVE,
      EVENTS.HOLD_END,
      EVENTS.CHANGE,
      EVENTS.MOVE_END,
    ];

    orderedEventTypes.forEach((eventType, eventIndex) => {
      it(`won't trigger events after it - (event: ${eventType})`, async () => {
        const flicking = flickingInfo.instance;

        const mockedHandlers = orderedEventTypes.reduce((handlers, type) => {
          handlers[type] = sinon.fake();
          return handlers;
        }, {});

        // Mock all handlers to sinon fake
        flicking.on(mockedHandlers);

        // Set current event type handler to stop it.
        flicking.on(eventType, e => e.stop());

        await simulate(flickingInfo.element, { deltaX: -70 });

        if (eventType.endsWith("End")) {
          // If event name ends with ~end, then it won't do anything.
          // Which means every events are properly called.
          orderedEventTypes.forEach(type => {
            const handler = mockedHandlers[type];
            expect(handler.called).to.be.true;
          });
        } else {
          // Events before current event type will be triggered
          orderedEventTypes.slice(0, eventIndex + 1).forEach(type => {
            const handler = mockedHandlers[type];
            expect(handler.called).to.be.true;
          });
          // But, events after current event type won't be triggered
          orderedEventTypes.slice(eventIndex + 1).forEach(type => {
            const handler = mockedHandlers[type];
            expect(handler.called).to.be.false;
          });
        }
      });
    });
  });

  describe("events can be stopped almost immediately", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full);
    });

    it("holdStart can be stopped almost immediately", () => {
      // Given
      let holdCount = 0;
      const isPlayingInHoldStart: boolean[] = [];

      const flicking = flickingInfo.instance;
      flicking.on(EVENTS.HOLD_START, e => {
        isPlayingInHoldStart.push(flicking.isPlaying());
        holdCount += 1;
        e.stop();
      });

      // When
      simulate(flickingInfo.element, { deltaX: -70, duration: 30 });
      simulate(flickingInfo.element, { deltaX: -70, duration: 30 });

      // Then
      expect(isPlayingInHoldStart.every(val => val === false)).to.be.true;
      expect(holdCount).equals(2);
    });

    const testingEvents = [
      EVENTS.MOVE_START,
      EVENTS.MOVE,
    ];

    testingEvents.forEach(event => {
      it(`${event} can be stopped almost immediately`, () => {
        // Given
        let eventCount = 0;
        const flicking = flickingInfo.instance;
        flicking.on(event, e => {
          e.stop();
          eventCount += 1;
        });

        // When
        simulate(flickingInfo.element, { deltaX: -70, duration: 30 });
        simulate(flickingInfo.element, { deltaX: -70, duration: 30 });

        // Then
        expect(eventCount).equals(2);
      });
    });
  });

  describe("Changing panel by method, when duration is 0", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full, { defaultIndex: 1 });
    });

    it("will trigger events in correct order - next()", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      flicking.next(0);

      // Events are fired in correct order
      expect(expectedEventOrder.programmatic).to.deep.equal(flickingInfo.eventFired);

      // Index changed correctly
      const afterIndex = flickingInfo.instance.getIndex();
      expect(beforeIndex).not.equals(afterIndex);
    });

    it("will trigger events in correct order - prev()", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      flicking.prev(0);

      // Events are fired in correct order
      expect(expectedEventOrder.programmatic).to.deep.equal(flickingInfo.eventFired);

      // Index changed correctly
      const afterIndex = flickingInfo.instance.getIndex();
      expect(beforeIndex).not.equals(afterIndex);
    });

    it("will trigger events in correct order - moveTo()", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      flicking.moveTo(2, 0);

      // Events are fired in correct order
      expect(expectedEventOrder.programmatic).to.deep.equal(flickingInfo.eventFired);

      // Index changed correctly
      const afterIndex = flickingInfo.instance.getIndex();
      expect(beforeIndex).not.equals(afterIndex);
    });
  });

  describe("Changing panel by method, when duration is greater than 0", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full, { defaultIndex: 1 });
    });

    it("will trigger events in correct order - next()", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      flicking.next(10);
      tick(100);

      // Events are fired in correct order
      expect(expectedEventOrder.programmatic).to.deep.equal(flickingInfo.eventFired);

      // Index changed correctly
      const afterIndex = flickingInfo.instance.getIndex();
      expect(beforeIndex).not.equals(afterIndex);
    });

    it("will trigger events in correct order - prev()", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      flicking.prev(10);
      tick(100);

      // Events are fired in correct order
      expect(expectedEventOrder.programmatic).to.deep.equal(flickingInfo.eventFired);

      // Index changed correctly
      const afterIndex = flickingInfo.instance.getIndex();
      expect(beforeIndex).not.equals(afterIndex);
    });

    it("will trigger events in correct order - moveTo()", async () => {
      const flicking = flickingInfo.instance;
      const beforeIndex = flicking.getIndex();

      flicking.moveTo(2, 10);
      tick(100);

      // Events are fired in correct order
      expect(expectedEventOrder.programmatic).to.deep.equal(flickingInfo.eventFired);

      // Index changed correctly
      const afterIndex = flickingInfo.instance.getIndex();
      expect(beforeIndex).not.equals(afterIndex);
    });
  });

  describe("Direction correctness check", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full, { defaultIndex: 1 });
    });

    it("is always \"NEXT\" when calling next()", async () => {
      const flicking = flickingInfo.instance;

      flicking.next(10);
      tick(100);

      expect(flickingInfo.eventDirection.every(dir => dir === DIRECTION.NEXT)).to.be.true;
    });

    it("is always \"PREV\" when calling prev()", async () => {
      const flicking = flickingInfo.instance;

      flicking.prev(10);
      tick(100);

      expect(flickingInfo.eventDirection.every(dir => dir === DIRECTION.PREV)).to.be.true;
    });

    it("is \"NEXT\" while manually flicking to next panel(except for holdStart)", async () => {
      await simulate(flickingInfo.element, { deltaX: -100 });

      expect(flickingInfo.eventDirection[0]).to.deep.equal(null);
      expect(flickingInfo.eventDirection.slice(1).every(direction => {
        return direction === DIRECTION.NEXT;
      })).to.be.true;
    });

    it("is \"PREV\" while manually flicking to prev panel(except for holdStart)", async () => {
      await simulate(flickingInfo.element, { deltaX: 100 });

      expect(flickingInfo.eventDirection[0]).to.deep.equal(null);
      expect(flickingInfo.eventDirection.slice(1).every(direction => {
        return direction === DIRECTION.PREV;
      })).to.be.true;
    });
  });

  describe("\"isTrusted\" parameter", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full, { defaultIndex: 1 });
    });

    it("is always false in events triggered by next()", async () => {
      const flicking = flickingInfo.instance;

      flicking.next(100);
      tick(200);

      expect(flickingInfo.events.every(e => e.isTrusted === false)).to.be.true;
    });

    it("is always false in events triggered by prev()", async () => {
      const flicking = flickingInfo.instance;

      flicking.prev(100);
      tick(200);

      expect(flickingInfo.events.every(e => e.isTrusted === false)).to.be.true;
    });

    it("is always false in events triggered by moveTo()", async () => {
      const flicking = flickingInfo.instance;

      flicking.moveTo(2, 100);
      tick(200);

      expect(flickingInfo.events.every(e => e.isTrusted === false)).to.be.true;
    });

    it("is always true in events triggered by user input(moving to next panel)", async () => {
      await simulate(flickingInfo.element, { deltaX: -70 });

      expect(flickingInfo.events.every(e => e.isTrusted === true)).to.be.true;
    });

    it("is always true in events triggered by user input(moving to prev panel)", async () => {
      await simulate(flickingInfo.element, { deltaX: 70 });

      expect(flickingInfo.events.every(e => e.isTrusted === true)).to.be.true;
    });
  });

  describe("event's parameter", () => {
    it("Check the progress of the 'move' event.(circular: false)", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, { defaultIndex: 0 });
      let progress = 0;
      const callback = e => {
        // Then
        // e.progress >= progress
        expect(e.progress).to.be.not.lt(progress);
        progress = e.progress;
      };
      for (const name in EVENTS) {
        flickingInfo.instance.on(EVENTS[name], callback);
      }

      // When
      await simulate(flickingInfo.element, { deltaX: -70 });

      const halfProgress = progress;

      await simulate(flickingInfo.element, { deltaX: -70 });

      const fullProgress = progress;

      // Then
      expect(halfProgress).to.be.equals(0.5);
      expect(fullProgress).to.be.equals(1);
    });

    it("Check the progress of the 'move' event.(circular: true)", async () => {
      flickingInfo = createFlicking(horizontal.full, { defaultIndex: 0, circular: true });
      let progress = 0;

      flickingInfo.instance.on("move", e => {
        // Then
        // e.progress >= progress
        if (progress > 0.99 && progress > e.progress) {
          // (0 => 1) => (0 => 1)
          progress = 0;
        }
        expect(e.progress).to.be.not.lt(progress);
        progress = e.progress;
      });

      // When
      await simulate(flickingInfo.element, { deltaX: -70 });

      // 1/3
      const progress1 = progress;

      await simulate(flickingInfo.element, { deltaX: -70 });

      // 2/3
      const progress2 = progress;

      await simulate(flickingInfo.element, { deltaX: -70 });

      // 3/3 => 0/3
      const progress3 = progress;

      // Then
      expect(progress1).to.be.closeTo(1 / 3, 0.0001);
      expect(progress2).to.be.closeTo(2 / 3, 0.0001);
      expect(progress3).to.be.closeTo(0, 0.0001);
    });
  });

  describe("interruption", () => {
    beforeEach(() => {
      flickingInfo = createFlicking(horizontal.full, { defaultIndex: 0 });
    });

    it("can restore its position after user keeps static clicking", async () => {
      const flicking = flickingInfo.instance;
      const beforePosition = (flicking as any).viewport.getCameraPosition();

      const firstPanel = flicking.getPanel(0);
      const firstSize = firstPanel.getSize();

      await simulate(flickingInfo.element, { deltaX: -100, duration: 200 });

      // Interrupt
      await simulate(flickingInfo.element, { deltaX: 0, duration: 200 });

      // Interrupt again
      await simulate(flickingInfo.element, { deltaX: 0, duration: 200 });

      const afterPosition = (flicking as any).viewport.getCameraPosition();

      expect(afterPosition).equals(beforePosition + firstSize);
    });

    it("can interrupt while moving with api calls", async () => {
      const flicking = flickingInfo.instance;

      flicking.moveTo(2, 200);
      tick(300);
      await simulate(flickingInfo.element, { deltaX: 100 });

      expect(flicking.getIndex()).equals(1);
    });

    it("will trigger events in correct order even if interrupted", async () => {
      // Don't let first simulate finished, as this is testing interruptablility
      // Setting time same to duration(400) makes only panning behavior finished, but not animation
      simulate(flickingInfo.element, { deltaX: -500, duration: 400 }, 400);
      await simulate(flickingInfo.element, { deltaX: -500, duration: 100 });

      // Expected event order
      const expectedEventsOnInterrupted = [
        EVENTS.HOLD_START,
        EVENTS.MOVE_START,
        EVENTS.MOVE,
        EVENTS.HOLD_END,
        EVENTS.CHANGE,
        EVENTS.MOVE,
        // Interrupted on here, MOVE_END won't be triggered
        EVENTS.HOLD_START,
        EVENTS.MOVE, // MOVE START won't be triggered
        EVENTS.HOLD_END,
        EVENTS.CHANGE,
        EVENTS.MOVE,
        EVENTS.MOVE_END,
      ];

      expect(flickingInfo.eventFired).to.deep.equal(expectedEventsOnInterrupted);
    });
  });

  describe("needPanel event", () => {
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

    const createInfiniteFlickingWithOption = (type: string, options: Partial<FlickingOptions> = {}) => {
      cleanup();
      flickingInfo = createFlicking(type, merge({
        infinite: true,
      }, options));

      flickingInfo.instance.on(EVENTS.NEED_PANEL, (e: NeedPanelEvent) => {
        needPanelEvents.push(e);
      });
    };

    it("won't trigger event while in initialization process", () => {
      // Given & When
      /* Initial State */

      // Then
      expect(needPanelEvents).to.be.empty;
    });

    it("will trigger event after adding one half sized panel at index 0", async () => {
      // Given
      /* Initial State */

      // When
      flickingInfo.instance.replace(0, createHorizontalElement(50));

      // Then
      expect(needPanelEvents.length).equals(1);

      const event = needPanelEvents[0];
      expect(event.type).equals(EVENTS.NEED_PANEL);
      expect(event.range.min).equals(1);
      expect(event.range.max).equals(Infinity);
      expect(event.range.length).equals(Infinity);
    });

    it("will trigger event in both direction after adding one half sized panel at index above 0", async () => {
      // Given
      /* Initial State */

      // When
      flickingInfo.instance.replace(1, createHorizontalElement(50));

      // Then
      expect(needPanelEvents.length).equals(2);
      // Next direction should be triggered first
      expect(needPanelEvents[0].direction).equals(DIRECTION.NEXT);
      expect(needPanelEvents[1].direction).equals(DIRECTION.PREV);

      expect(needPanelEvents[0].range).deep.equals({
        min: 2, max: Infinity, length: Infinity,
      });
      expect(needPanelEvents[1].range).deep.equals({
        min: 0, max: 0, length: 1,
      });
    });

    it("won't trigger event after adding 2 half size panel at index 0", () => {
      // Given
      /* Initial State */

      // When
      flickingInfo.instance.replace(0, [createHorizontalElement(50), createHorizontalElement(50)]);

      // Then
      expect(needPanelEvents).to.be.empty;
    });

    it("will trigger event after adding 2 half size panel at index 0 with infiniteThreshold is above proper amount", () => {
      // Given
      createInfiniteFlickingWithOption(horizontal.none, {
        infiniteThreshold: "50%",
        anchor: "0%",
        hanger: "0%",
      });

      // When
      const eventsLengthBefore = needPanelEvents.length;
      flickingInfo.instance.replace(0, [createHorizontalElement(50), createHorizontalElement(50)]);

      // Then
      const eventsLengthAfter = needPanelEvents.length;
      expect(eventsLengthBefore).equals(0);
      expect(eventsLengthAfter).equals(1);
    });

    it("will trigger event with prev direction at panel 0 in circular mode", () => {
      // Given
      createInfiniteFlickingWithOption(horizontal.none, {
        circular: true,
        anchor: "0%",
        hanger: "50%",
      });

      // When
      const flicking = flickingInfo.instance;
      flicking.append(createHorizontalElement(100));

      // Then
      expect(needPanelEvents.length).equals(1);
      const needPanelEvent = needPanelEvents[0];

      expect(needPanelEvent.direction).equals(DIRECTION.PREV);
      expect(needPanelEvent.index).equals(0);
      expect(needPanelEvent.panel.getPosition()).equals(flicking.getPanel(0).getPosition());
      expect(needPanelEvent.range.min).equals(1);
      expect(needPanelEvent.range.max).equals(Infinity);
    });

    it("will trigger event with next direction at last panel in circular mode", () => {
      // Given
      createInfiniteFlickingWithOption(horizontal.none, {
        circular: true,
        anchor: "100%",
        hanger: "50%",
        lastIndex: 50,
      });

      // When
      const flicking = flickingInfo.instance;
      flicking.replace(50, createHorizontalElement(100));

      // Then
      expect(needPanelEvents.length).equals(1);
      const needPanelEvent = needPanelEvents[0];

      expect(needPanelEvent.direction).equals(DIRECTION.NEXT);
      expect(needPanelEvent.index).equals(50);
      expect(needPanelEvent.panel.getPosition()).equals(flicking.getPanel(50).getPosition());
      expect(needPanelEvent.range.min).equals(0);
      expect(needPanelEvent.range.max).equals(49);
    });

    it("should increase range to prev direction if insertBefore is called for event's panel", async () => {
      // Given
      createInfiniteFlickingWithOption(horizontal.none, {
        circular: true,
        anchor: "0%",
        hanger: "50%",
        lastIndex: 50,
      });
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport as Viewport;
      flicking.on(EVENTS.NEED_PANEL, e => {
        if (e.direction === DIRECTION.PREV) {
          e.panel.insertBefore(createHorizontalElement(20));
        }
      });
      flicking.replace(50, createHorizontalElement(100));

      const scrollAreaBefore = viewport.getScrollArea();
      const panelCountBefore = flicking.getPanelCount();

      // When
      await simulate(flickingInfo.element, { deltaX: 500, duration: 100 });

      // Then
      const scrollAreaAfter = viewport.getScrollArea();
      const panelCountAfter = flicking.getPanelCount();
      expect(panelCountBefore).not.equals(panelCountAfter);
      expect(scrollAreaBefore.next).equals(scrollAreaAfter.next);
      expect(scrollAreaBefore.prev).not.equals(scrollAreaAfter.prev);
    });

    it("should increase range to next direction if insertAfter is called for event's panel", async () => {
      createInfiniteFlickingWithOption(horizontal.none, {
        circular: true,
        anchor: "100%",
        hanger: "50%",
        lastIndex: 50,
      });

      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport as Viewport;
      flicking.on(EVENTS.NEED_PANEL, e => {
        if (e.direction === DIRECTION.NEXT) {
          e.panel.insertAfter(createHorizontalElement(20));
        }
      });
      flicking.replace(0, createHorizontalElement(100));

      const scrollAreaBefore = viewport.getScrollArea();
      const panelCountBefore = flicking.getPanelCount();

      // When
      await simulate(flickingInfo.element, { deltaX: -500, duration: 100 });

      // Then
      const scrollAreaAfter = viewport.getScrollArea();
      const panelCountAfter = flicking.getPanelCount();
      expect(panelCountBefore).not.equals(panelCountAfter);
      expect(scrollAreaBefore.next).not.equals(scrollAreaAfter.next);
      expect(scrollAreaBefore.prev).equals(scrollAreaAfter.prev);
    });

    it("should increase range to next direction if moving to prev direction and looped while scrolling", async () => {
      // Given
      createInfiniteFlickingWithOption(horizontal.none, {
        circular: true,
        anchor: "0%",
        hanger: "50%",
        lastIndex: 50,
      });
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport as Viewport;
      flicking.on(EVENTS.NEED_PANEL, e => {
        if (e.direction === DIRECTION.PREV) {
          e.index === 0
            ? flicking.replace(e.range.max, createHorizontalElement(20))
            : e.panel.insertBefore(createHorizontalElement(20));
        }
      });
      flicking.replace(0, createHorizontalElement(100));

      const scrollAreaBefore = viewport.getScrollArea();
      const panelCountBefore = flicking.getPanelCount();

      // When
      await simulate(flickingInfo.element, { deltaX: 500, duration: 100 });

      // Then
      const scrollAreaAfter = viewport.getScrollArea();
      const panelCountAfter = flicking.getPanelCount();
      expect(panelCountBefore).not.equals(panelCountAfter);
      expect(panelCountBefore + 1).not.equals(panelCountAfter);

      // Expanded to both prev / next
      // Because scroll area expanded to next direction while scrolling
      // And it expanded to prev direction while animating
      expect(scrollAreaBefore.next).not.equals(scrollAreaAfter.next);
      expect(scrollAreaBefore.prev).not.equals(scrollAreaAfter.prev);
    });

    it("should increase range to prev direction if moving to next direction and looped while scrolling", async () => {
      // Given
      createInfiniteFlickingWithOption(horizontal.none, {
        circular: true,
        anchor: "100%",
        hanger: "50%",
        lastIndex: 50,
      });
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport as Viewport;
      flicking.on(EVENTS.NEED_PANEL, e => {
        if (e.direction === DIRECTION.NEXT) {
          e.index === 50
            ? flicking.replace(e.range.min, createHorizontalElement(20))
            : e.panel.insertAfter(createHorizontalElement(20));
        }
      });
      flicking.replace(50, createHorizontalElement(100));

      const scrollAreaBefore = viewport.getScrollArea();
      const panelCountBefore = flicking.getPanelCount();

      // When
      await simulate(flickingInfo.element, { deltaX: -500, duration: 100 });

      // Then
      const scrollAreaAfter = viewport.getScrollArea();
      const panelCountAfter = flicking.getPanelCount();
      expect(panelCountBefore).not.equals(panelCountAfter);
      expect(panelCountBefore + 1).not.equals(panelCountAfter);

      // Expanded to both prev / next
      // Because scroll area expanded to prev direction while scrolling
      // And it expanded to next direction while animating
      expect(scrollAreaBefore.next).not.equals(scrollAreaAfter.next);
      expect(scrollAreaBefore.prev).not.equals(scrollAreaAfter.prev);
    });

    describe("fill()", () => {
      it("can fill panels in right position when not circular, next direction", () => {
        // Given
        createInfiniteFlickingWithOption(horizontal.none, {
          anchor: 0,
          hanger: 0,
          circular: false,
        });

        // When
        const flicking = flickingInfo.instance;
        flicking.on(EVENTS.NEED_PANEL, e => {
          e.fill([
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
          ]);
        });
        flicking.replace(0, createHorizontalElement(20)); // Panel info should be changed to trgiger needPanel event

        // Then
        expect(needPanelEvents.length).equals(1);
        const needPanelEvent = needPanelEvents[0];

        expect(needPanelEvent.direction).equals(DIRECTION.NEXT);
        expect(flicking.getPanel(1)).not.to.be.null;
        expect(flicking.getPanel(2)).not.to.be.null;
        expect(flicking.getPanel(3)).not.to.be.null;
        expect(flicking.getPanel(4)).not.to.be.null;
        expect(flicking.getPanel(5)).not.to.be.null;
      });

      it("can fill panels in right position when not circular, prev direction", () => {
        // Given
        createInfiniteFlickingWithOption(horizontal.none, {
          anchor: "0%",
          hanger: "100%",
          circular: false,
        });

        // When
        const flicking = flickingInfo.instance;
        flicking.on(EVENTS.NEED_PANEL, e => {
          e.fill([
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
          ]);
        });
        flicking.replace(5, createHorizontalElement(20)); // Panel info should be changed to trgiger needPanel event

        // Then
        expect(needPanelEvents.length).equals(1);
        const needPanelEvent = needPanelEvents[0];

        expect(needPanelEvent.direction).equals(DIRECTION.PREV);
        expect(flicking.getPanel(0)).not.to.be.null;
        expect(flicking.getPanel(1)).not.to.be.null;
        expect(flicking.getPanel(2)).not.to.be.null;
        expect(flicking.getPanel(3)).not.to.be.null;
        expect(flicking.getPanel(4)).not.to.be.null;
      });

      it("can fill panels in right position when circular, next direction", () => {
        // Given
        createInfiniteFlickingWithOption(horizontal.none, {
          anchor: 0,
          hanger: 0,
          circular: true,
          lastIndex: 5,
        });

        // When
        const flicking = flickingInfo.instance;
        flicking.on(EVENTS.NEED_PANEL, e => {
          e.fill([
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
          ]);
        });
        flicking.replace(5, createHorizontalElement(20));

        // Then
        expect(needPanelEvents.length).equals(1);
        const needPanelEvent = needPanelEvents[0];

        expect(needPanelEvent.direction).equals(DIRECTION.NEXT);
        expect(flicking.getPanel(0)).not.to.be.null;
        expect(flicking.getPanel(1)).not.to.be.null;
        expect(flicking.getPanel(2)).not.to.be.null;
        expect(flicking.getPanel(3)).not.to.be.null;
        expect(flicking.getPanel(4)).not.to.be.null;
      });

      it("can fill panels in right position when circular, prev direction", () => {
        // Given
        createInfiniteFlickingWithOption(horizontal.none, {
          anchor: 0,
          hanger: "100%",
          circular: true,
          lastIndex: 5,
        });

        // When
        const flicking = flickingInfo.instance;
        flicking.on(EVENTS.NEED_PANEL, e => {
          e.fill([
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
          ]);
        });
        flicking.replace(0, createHorizontalElement(20));

        // Then
        expect(needPanelEvents.length).equals(1);
        const needPanelEvent = needPanelEvents[0];

        expect(needPanelEvent.direction).equals(DIRECTION.PREV);
        expect(flicking.getPanel(1)).not.to.be.null;
        expect(flicking.getPanel(2)).not.to.be.null;
        expect(flicking.getPanel(3)).not.to.be.null;
        expect(flicking.getPanel(4)).not.to.be.null;
        expect(flicking.getPanel(5)).not.to.be.null;
      });

      it("can fill panels in only empty position, next direction", () => {
        // Given
        createInfiniteFlickingWithOption(horizontal.none, {
          anchor: 0,
          hanger: 0,
          lastIndex: 10,
        });
        const flicking = flickingInfo.instance;
        flicking.replace(0, createHorizontalElement(50)); // needPanel is triggered but not handled

        // When
        flicking.on(EVENTS.NEED_PANEL, e => {
          e.fill([
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
          ]);
        });
        flicking.replace(5, createHorizontalElement(20));

        // Then
        expect(needPanelEvents.length).equals(2);
        const needPanelEvent = needPanelEvents[1];

        expect(needPanelEvent.direction).equals(DIRECTION.NEXT);
        expect(flicking.getPanel(0)).not.to.be.null;
        expect(flicking.getPanel(1)).not.to.be.null;
        expect(flicking.getPanel(2)).not.to.be.null;
        expect(flicking.getPanel(3)).not.to.be.null;
        expect(flicking.getPanel(4)).not.to.be.null;
        expect(flicking.getPanel(5)).not.to.be.null;
        expect(flicking.getPanel(6)).to.be.null;
      });

      it("can fill panels in only empty position, prev direction", () => {
        // Given
        createInfiniteFlickingWithOption(horizontal.none, {
          anchor: 0,
          hanger: "100%",
          lastIndex: 10,
        });
        const flicking = flickingInfo.instance;
        flicking.replace(5, createHorizontalElement(50)); // needPanel is triggered but not handled

        // When
        flicking.on(EVENTS.NEED_PANEL, e => {
          e.fill([
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
            createHorizontalElement(20),
          ]);
        });
        flicking.replace(3, createHorizontalElement(100)); // should fill from 3 to 5

        // Then
        expect(needPanelEvents.length).equals(2);
        const needPanelEvent = needPanelEvents[1];

        expect(needPanelEvent.direction).equals(DIRECTION.PREV);
        expect(flicking.getPanel(0)).to.be.null;
        expect(flicking.getPanel(1)).to.be.null;
        expect(flicking.getPanel(2)).to.be.null;
        expect(flicking.getPanel(3)).not.to.be.null;
        expect(flicking.getPanel(4)).not.to.be.null;
        expect(flicking.getPanel(5)).not.to.be.null;
        expect(flicking.getPanel(6)).to.be.null;
      });
    });
  });

  describe("change event", () => {
    // Issue: https://github.com/naver/egjs-flicking/issues/208
    it("shouldn't be triggered when going out of bound area with bounce 0 & freeScroll", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        defaultIndex: 2,
        bound: true,
        bounce: 0,
        moveType: "freeScroll",
      });

      // When
      await simulate(flickingInfo.element, { deltaX: -500, duration: 100 });

      // Then
      expect(flickingInfo.eventFired.every(evtName => evtName !== EVENTS.CHANGE)).to.be.true;
    });

    // Issue: https://github.com/naver/egjs-flicking/issues/302
    it("shouldn't be triggered when going out of bound area with bound option & snap", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full, {
        defaultIndex: 0,
        bound: true,
      });

      // When
      await simulate(flickingInfo.element, { deltaX: 500, duration: 500 });

      // Then
      expect(flickingInfo.eventFired.every(evtName => evtName !== EVENTS.CHANGE)).to.be.true;
    });

    it("shouldn't be triggered when going from original panel 0 to cloned panel 0", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.fixedTo100, {
        circular: true,
        moveType: "freeScroll",
      });

      // When
      await simulate(flickingInfo.element, { deltaX: 25, duration: 100 });

      // Then
      expect(flickingInfo.eventFired.every(evtName => evtName !== EVENTS.CHANGE)).to.be.true;
    });
  });

  describe("visibleChange event", () => {
    // Issue: https://github.com/naver/egjs-flicking/issues/342
    it("should not remove visible panels until panning ends", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.fixedTo100, {
        circular: true,
        renderOnlyVisible: true,
      });
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport as Viewport;
      const initialVisiblePanels = viewport.getVisiblePanels();
      const visiblePanels = [];

      flicking.on(EVENTS.VISIBLE_CHANGE, e => {
        if (viewport.stateMachine.getState().holding) {
          visiblePanels.push(viewport.getVisiblePanels());
        }
      });

      // When
      await simulate(flickingInfo.element, { deltaX: -500, duration: 100 });
      flicking.off(EVENTS.VISIBLE_CHANGE);

      // Then
      let prevVisiblePanels = initialVisiblePanels;
      expect(visiblePanels.length).to.be.greaterThan(0);
      expect(visiblePanels.every(panels => {
        const visiblePanelsNotRemoved = panels.length >= prevVisiblePanels.length;
        prevVisiblePanels = panels;
        return visiblePanelsNotRemoved;
      })).to.be.true;
    });

    it("should preserve visible panels when animation ends", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.fixedTo100, {
        circular: true,
        renderOnlyVisible: true,
      });
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport as Viewport;
      const initialVisiblePanels = viewport.getVisiblePanels();

      // When
      await simulate(flickingInfo.element, { deltaX: -500, duration: 100 });
      const visiblePanelsAfterAnimation = viewport.getVisiblePanels();

      // Then
      expect(initialVisiblePanels.length).equals(visiblePanelsAfterAnimation.length);
    });

    it("should update visible panels also when animation didn't triggered & freeScroll", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.fixedTo100, {
        circular: true,
        renderOnlyVisible: true,
        moveType: MOVE_TYPE.FREE_SCROLL,
      });
      const flicking = flickingInfo.instance;
      const viewport = (flicking as any).viewport as Viewport;
      const initialVisiblePanels = viewport.getVisiblePanels();
      const visiblePanels = [];

      flicking.on(EVENTS.VISIBLE_CHANGE, e => {
        if (viewport.stateMachine.getState().holding) {
          visiblePanels.push(viewport.getVisiblePanels());
        }
      });

      // When
      await simulate(flickingInfo.element, { deltaX: -500, duration: 10000 });

      // Then
      const visiblePanelsAfterMoveEnd = viewport.getVisiblePanels();
      const holdEndTriggered = flickingInfo.eventFired.indexOf("holdEnd");
      const moveEndTriggered = flickingInfo.eventFired.indexOf("moveEnd", holdEndTriggered);
      const animationNotTriggered = flickingInfo.eventFired.slice(holdEndTriggered, moveEndTriggered)
        .every(eventName => eventName !== "move");

      expect(visiblePanelsAfterMoveEnd.length).equals(initialVisiblePanels.length);
      expect(animationNotTriggered).to.be.true;

      // Make sure visible panels were grown without being removed
      let prevVisiblePanels = initialVisiblePanels;
      expect(visiblePanels.length).to.be.greaterThan(0);
      expect(visiblePanels.every(panels => {
        const visiblePanelsNotRemoved = panels.length >= prevVisiblePanels.length;
        prevVisiblePanels = panels;
        return visiblePanelsNotRemoved;
      })).to.be.true;
    });
  });

  describe("select event", () => {
    it("should have property 'element' in it", async () => {
      // Given
      flickingInfo = createFlicking(horizontal.full);

      // When
      await simulate(flickingInfo.element, { deltaX: 0, deltaY: 0, duration: 100 });

      // Then
      const selectEvent = flickingInfo.events.find(evt => evt.type === EVENTS.SELECT) as SelectEvent;

      expect(selectEvent.element).to.be.an.instanceOf(HTMLElement);
    });
  });

  describe("moveEnd event", () => {
    it("should set property direction not to null after disabling & enabling input", async () => {
      // Given
      const { element, instance: flicking } = createFlicking(horizontal.full);
      const moveEndSpy = sinon.spy();
      flicking.on("moveEnd", moveEndSpy);

      // When
      void simulate(element, { deltaX: -500, deltaY: 0, duration: 1000 }, 0);
      tick(500);
      expect((flicking as any).viewport.stateMachine.getState().holding).to.be.true
      flicking.disableInput(); // call it before release
      flicking.enableInput(); // Then, re-enable
      tick(5000); // Flush previous input
      await simulate(element, { deltaX: -500, deltaY: 0, duration: 1000 });

      // Then
      expect(moveEndSpy.calledOnce).to.be.true;
      expect(moveEndSpy.firstCall.args[0].direction).not.to.be.null;
    });

    it("should set property direction not to null after disabling & enabling input (Idle case)", async () => {
      // Given
      const { element, instance: flicking } = createFlicking(horizontal.full);
      const moveEndSpy = sinon.spy();
      flicking.on("moveEnd", moveEndSpy);

      // When
      void simulate(element, { deltaX: 0, deltaY: 0, duration: 1000 }, 0);
      tick(500);
      expect((flicking as any).viewport.stateMachine.getState().holding).to.be.true
      flicking.disableInput(); // call it before release
      flicking.enableInput(); // Then, re-enable
      tick(5000); // Flush previous input
      await simulate(element, { deltaX: -500, deltaY: 0, duration: 1000 });

      // Then
      expect(moveEndSpy.calledOnce).to.be.true;
      expect(moveEndSpy.firstCall.args[0].direction).not.to.be.null;
    });
  });
});

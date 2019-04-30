import { SinonStatic } from "sinon";

import Flicking from "../../src/Flicking";
import { FlickingEvent, FlickingOptions } from "../../src/types";
import { cleanup, createFlicking } from "./assets/utils";
import { horizontal } from "./assets/fixture";
import { counter } from "../../src/utils";
import Panel from "../../src/components/Panel";

declare var sinon: SinonStatic;

describe("Panel", () => {
  let flickingInfo: {
    element: HTMLElement,
    instance: Flicking,
    events: FlickingEvent[],
    eventFired: string[],
    eventDirection: string[],
  };
  let flicking: Flicking;

  beforeEach(() => {
    initFlicking(horizontal.full);
  });

  afterEach(() => cleanup());

  const initFlicking = (type: string, options?: Partial<FlickingOptions>) => {
    flickingInfo = createFlicking(type, options);
    flicking = flickingInfo.instance;
  };

  describe("next()", () => {
    it("can return correct next panel", () => {
      // Given
      const currentPanel = flicking.getCurrentPanel();

      // When
      const nextPanel = currentPanel.next();

      // Then
      expect(nextPanel.getIndex()).equals(currentPanel.getIndex() + 1);
      expect(nextPanel.getPosition()).equals(currentPanel.getPosition() + currentPanel.getSize());
      expect(nextPanel).deep.equals(flicking.getPanel(currentPanel.getIndex() + 1));
    });

    it("will return null if called at last panel in non-circular mode", () => {
      // Given
      initFlicking(horizontal.full, { circular: false });
      const lastPanel = flicking.getPanel(flicking.getPanelCount() - 1);

      // When
      const shouldBeNull = lastPanel.next();

      // Then
      expect(shouldBeNull).to.be.null;
    });

    it("can return virtual panel in circular mode", () => {
      // Given
      initFlicking(horizontal.full, { circular: true });
      const lastPanel = flicking.getPanel(flicking.getPanelCount() - 1);
      const panelSize = lastPanel.getSize(); // All panels have same size
      const nextCount = 100;
      let nextPanel = lastPanel;

      // When
      counter(nextCount).forEach(() => {
        nextPanel = nextPanel.next();
      });

      // Then
      const expectedIndex = (lastPanel.getIndex() + nextCount) % flicking.getPanelCount();
      expect(nextPanel.getIndex()).equals(expectedIndex);
      expect(nextPanel.getPosition()).equals(lastPanel.getPosition() + panelSize * nextCount);
    });

    it("should return virtual panel after successive prev() calls", () => {
      // Given
      initFlicking(horizontal.full, { circular: true });
      const firstPanel = flicking.getPanel(0);
      const prevCount = 100;
      let virtualPrevPanel = firstPanel;

      // When
      counter(prevCount).forEach(() => {
        virtualPrevPanel = virtualPrevPanel.prev();
      });
      const nextPanel = virtualPrevPanel.next();

      // Then
      expect(nextPanel.getPosition())
        .equals(virtualPrevPanel.getPosition() + virtualPrevPanel.getSize());
    });
  });

  describe("prev()", () => {
    it("can return correct prev panel", () => {
      // Given
      initFlicking(horizontal.full, { defaultIndex: 2 });
      const currentPanel = flicking.getCurrentPanel();

      // When
      const prevPanel = currentPanel.prev();

      // Then
      expect(prevPanel.getIndex()).equals(currentPanel.getIndex() - 1);
      expect(prevPanel.getPosition()).equals(currentPanel.getPosition() - prevPanel.getSize());
      expect(prevPanel).deep.equals(flicking.getPanel(currentPanel.getIndex() - 1));
    });

    it("will return null if called at first panel in non-circular mode", () => {
      // Given
      initFlicking(horizontal.full, { circular: false });
      const firstPanel = flicking.getPanel(0);

      // When
      const shouldBeNull = firstPanel.prev();

      // Then
      expect(shouldBeNull).to.be.null;
    });

    it("can return virtual panel in circular mode", () => {
      // Given
      initFlicking(horizontal.full, { circular: true });
      const firstPanel = flicking.getPanel(0);
      const panelSize = firstPanel.getSize(); // All panels have same size
      const prevCount = 100;
      let prevPanel = firstPanel;

      // When
      counter(prevCount).forEach(() => {
        prevPanel = prevPanel.prev();
      });

      // Then
      const lastIndex = flicking.getPanelCount() - 1;
      const expectedIndex = lastIndex + (firstPanel.getIndex() - prevCount + 1) % flicking.getPanelCount();
      expect(prevPanel.getIndex()).equals(expectedIndex);
      expect(prevPanel.getPosition()).equals(firstPanel.getPosition() - panelSize * prevCount);
    });

    it("should return virtual panel after successive next() calls", () => {
      // Given
      initFlicking(horizontal.full, { circular: true });
      const firstPanel = flicking.getPanel(0);
      const nextCount = 100;
      let virtualNextPanel = firstPanel;

      // When
      counter(nextCount).forEach(() => {
        virtualNextPanel = virtualNextPanel.next();
      });
      const prevPanel = virtualNextPanel.prev();

      // Then
      expect(prevPanel.getPosition())
        .equals(virtualNextPanel.getPosition() - prevPanel.getSize());
    });
  });

  describe("update()", () => {
    it("can alter panel's element", () => {
      // Given
      const panel = flicking.getCurrentPanel();
      const element = panel.getElement();
      const expectedHTML = "<p>THIS IS NEW INNERHTML</p>";

      // When
      panel.update(el => el.innerHTML = expectedHTML);

      // Then
      expect(element.innerHTML).equals(expectedHTML);
    });

    it("will be applied also on cloned panels", () => {
      // Given
      initFlicking(horizontal.full, { circular: true });
      const currentPanel = flicking.getCurrentPanel() as Panel;
      const randomText = new Date().toString();

      // When
      currentPanel.update(el => el.innerHTML = randomText);

      // Then
      currentPanel.getIdenticalPanels().forEach(panel => {
        expect(panel.getElement().innerHTML).equals(randomText);
      });
    });

    it("should be resized after it", () => {
      // Given
      const panel = flicking.getCurrentPanel() as Panel;
      const resizeSpy = sinon.spy(panel, "resize");

      // When
      panel.update(el => el);

      // Then
      expect(resizeSpy.calledOnce).to.be.true;
    });
  });
});

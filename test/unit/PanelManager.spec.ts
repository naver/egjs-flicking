import { SinonStatic } from "sinon";

import Flicking from "../../src/Flicking";
import Panel from "../../src/components/Panel";
import Viewport from "../../src/components/Viewport";
import PanelManager from "../../src/components/PanelManager";
import { counter } from "../../src/utils";
import { FlickingEvent } from "../../src/types";
import { cleanup, createFlicking } from "./assets/utils";
import { horizontal } from "./assets/fixture";

declare var sinon: SinonStatic;

describe("PanelManager", () => {
  let panelManager: PanelManager;
  let viewport: Viewport;
  let cameraElement: HTMLElement;
  let flickingInfo: {
    element: HTMLElement,
    instance: Flicking,
    events: FlickingEvent[],
    eventFired: string[],
    eventDirection: string[],
  };

  beforeEach(() => {
    flickingInfo = createFlicking(horizontal.none);

    const flicking = flickingInfo.instance;
    viewport = (flicking as any).viewport as Viewport;
    cameraElement = (viewport as any).cameraElement as HTMLElement;
    panelManager = viewport.panelManager;
  });

  afterEach(() => cleanup());

  // Helpers
  const createPanel = (idx: number) => {
    // Parent element should be exist,
    // as panel element can be removed when remove() is called
    const panelElement = document.createElement("div");
    cameraElement.appendChild(panelElement);

    return new Panel(panelElement, idx, viewport);
  };

  const createPanels = (count: number, baseIdx: number = 0): Panel[] => {
    const panels = new Array(count)
      .fill(undefined)
      .map((val, idx) => {
        return createPanel(baseIdx + idx);
      });
    return panels;
  };
  const firstLastShouldBe = (first: number, last: number) => {
    expect(panelManager.firstPanel().getIndex()).equals(first);
    expect(panelManager.lastPanel().getIndex()).equals(last);
  };
  const lengthShouldBe = (len: number) => {
    expect(panelManager.getPanelCount()).equals(len);
  };
  const rangeShouldBe = (min: number, max: number) => {
    const range = panelManager.getRange();
    expect(range.min).equals(min);
    expect(range.max).equals(max);
  };
  const useCircularMode = () => {
    flickingInfo = createFlicking(horizontal.none, {
      circular: true,
    });

    const flicking = flickingInfo.instance;
    viewport = (flicking as any).viewport as Viewport;
    cameraElement = (viewport as any).cameraElement as HTMLElement;
    panelManager = viewport.panelManager;
  };

  describe("Initial State", () => {
    it("has no panels", () => {
      // Given & When
      /* Initial state */

      // Then
      expect(panelManager.originalPanels().length).equals(0);
      expect(panelManager.clonedPanels().length).equals(0);
      expect(panelManager.allPanels().length).equals(0);
      lengthShouldBe(0);
    });

    it("has correct initial range", () => {
      // Given & When
      /* Initial state */

      // Then
      rangeShouldBe(-1, -1);
    });
  });

  describe("Retrieving panel", () => {
    it("can get panels correctly", () => {
      // Given
      panelManager.insert(0, [
        createPanel(0),
        createPanel(1),
      ]);

      // When
      const panels = [
        panelManager.get(0),
        panelManager.get(1),
      ];

      // Then
      panels.forEach(panel => {
        expect(panel instanceof Panel).to.be.true;
      });
    });

    it("should return undefined for non-exist index", () => {
      // Given
      panelManager.insert(3, [createPanel(3)]);

      // When
      const shouldBeUndefinedArray = [
        panelManager.get(0),
        panelManager.get(1),
        panelManager.get(2),
        panelManager.get(4),
        panelManager.get(100),
      ];
      const shouldBePanel = panelManager.get(3);

      // Then
      shouldBeUndefinedArray.forEach(notPanel => {
        expect(notPanel).to.be.undefined;
      });
      expect(shouldBePanel instanceof Panel).to.be.true;
      expect(shouldBePanel.getIndex()).equals(3);
    });

    describe("Retriving first/last panel", () => {
      it("should return correct first/last panel after append", () => {
        // Given
        /* Initial State */

        // When
        const panelCount = 100;
        const panels = createPanels(100);
        panelManager.insert(0, panels);

        // Then
        firstLastShouldBe(0, panelCount - 1);
      });

      it("should return correct first/last panel after insertion", () => {
        // Given
        /* Initial State */

        // When & Then
        panelManager.insert(3, [createPanel(3)]);
        firstLastShouldBe(3, 3);

        panelManager.insert(5, [createPanel(5)]);
        firstLastShouldBe(3, 5);

        panelManager.insert(4, [createPanel(4)]);
        firstLastShouldBe(3, 5);

        panelManager.insert(8, [createPanel(8)]);
        firstLastShouldBe(3, 8);

        panelManager.insert(1, [createPanel(1)]);
        firstLastShouldBe(1, 8);
      });

      it("should return correct first/last panel after removal", () => {
        // Given
        const panels = createPanels(100);
        panelManager.insert(0, panels);

        // When & Then
        firstLastShouldBe(0, 99);

        panelManager.remove(0);
        firstLastShouldBe(0, 98);
        lengthShouldBe(99);

        panelManager.remove(98);
        firstLastShouldBe(0, 97);
        lengthShouldBe(98);

        panelManager.remove(1, 5);
        firstLastShouldBe(0, 92);
        lengthShouldBe(93);

        panelManager.remove(90, 100);
        firstLastShouldBe(0, 89);
        lengthShouldBe(90);
      });

      it("should not change first/last panel when no panel is not actually removed", () => {
        // Given
        const panels = createPanels(5);
        panelManager.insert(0, panels);

        // When & Then
        panelManager.remove(0, 0);
        firstLastShouldBe(0, 4);
        lengthShouldBe(5);

        panelManager.remove(0, -1);
        firstLastShouldBe(0, 4);
        lengthShouldBe(5);

        panelManager.remove(5, 100);
        firstLastShouldBe(0, 4);
        lengthShouldBe(5);

        panelManager.remove(2, -100);
        firstLastShouldBe(0, 4);
        lengthShouldBe(5);
      });
    });
  });

  describe("Adding and removing panels", () => {
    describe("insert()", () => {
      it("can insert at position 0", () => {
        // Given
        /* Initial State */

        // When
        panelManager.insert(0, [createPanel(0)]);

        // Then
        expect(panelManager.originalPanels().length).equals(1);
        rangeShouldBe(0, 0);
        lengthShouldBe(1);
      });

      it("can insert at position above 0", () => {
        // Given
        /* Initial State */

        // When
        panelManager.insert(5, [createPanel(5)]);

        // Then
        expect(panelManager.originalPanels().length).equals(6);
        rangeShouldBe(5, 5);
        lengthShouldBe(1);
      });

      it("can insert multiple panels at position 0", () => {
        // Given
        /* Initial State */

        // When
        panelManager.insert(0, createPanels(5));

        // Then
        expect(panelManager.originalPanels().length).equals(5);
        rangeShouldBe(0, 4);
        lengthShouldBe(5);
      });

      it("can insert multiple panels at position above 0", () => {
        // Given
        /* Initial State */

        // When
        panelManager.insert(5, createPanels(5));

        // Then
        expect(panelManager.originalPanels().length).equals(10);
        rangeShouldBe(5, 9);
        lengthShouldBe(5);
      });

      it("should update previous panel index if index is occupied", () => {
        // Given
        const indexWas3 = createPanel(3);
        const indexWas10 = createPanel(10);
        panelManager.insert(3, [indexWas3]);
        panelManager.insert(10, [indexWas10]);

        // When & Then
        panelManager.insert(3, [createPanel(3)]);
        expect(indexWas3.getIndex()).equals(4);
        expect(indexWas10.getIndex()).equals(11);

        // Index 5, 6 is currently empty
        panelManager.insert(5, createPanels(2, 5));
        expect(indexWas3.getIndex()).equals(4);
        expect(indexWas10.getIndex()).equals(11);

        // Index 9, 10 is currently empty, 11 is occupied
        panelManager.insert(9, createPanels(2, 9));
        expect(indexWas3.getIndex()).equals(4);
        expect(indexWas10.getIndex()).equals(11);

        // Index 7, 8 is currently empty, 9 or high is occupied
        // Adding 4 more panels at 8, which should fill one empty space, and push 3 index
        panelManager.insert(8, createPanels(4, 8));
        expect(indexWas3.getIndex()).equals(4);
        expect(indexWas10.getIndex()).equals(14);
      });

      it("can insert new panels correctly in circular mode", () => {
        // Given
        useCircularMode();
        const panelAt0 = createPanel(0);
        panelManager.replacePanels([panelAt0], []); // [0]
        const clonePanel = panelAt0.clone(0);
        cameraElement.appendChild(clonePanel.getElement());
        panelManager.insertClones(0, 0, [clonePanel], 0);

        const panelsAt5 = createPanels(5, 5); // [0, x, x, x, x, 5, 6, 7, 8, 9]
        panelManager.insert(5, panelsAt5);

        // When
        // BEFORE => [0, x, x, "INSERTING 3 PANELS FROM HERE", x, 5, 6, 7, 8, 9]
        // AFTER  => [0, x, x, NEW1, NEW2, NEW3, 5, 6, 7, 8, 9]
        panelManager.insert(3, createPanels(3, 3));

        // Then
        // All panels after index 5 are pushed by 1
        // As pushed 3 new panels and empty spaces were 2
        rangeShouldBe(0, 10);
        lengthShouldBe(9);
        panelsAt5.forEach((panel, index) => {
          expect(panel.getIndex()).equals(5 + 1 + index);
        });
      });
    });

    describe("replace()", () => {
      it("can add new panel at index 0 when no panel exists", () => {
        // Given
        /* Initial State */

        // When
        panelManager.replace(0, [createPanel(0)]);

        // Then
        rangeShouldBe(0, 0);
        lengthShouldBe(1);
        expect(panelManager.get(0)).not.to.be.undefined;
        expect(panelManager.has(0)).to.be.true;
      });

      it("can add new panel at index above 0 when no panel exists", () => {
        // Given
        /* Initial State */

        // When
        panelManager.replace(5, [createPanel(5)]);

        // Then
        rangeShouldBe(5, 5);
        lengthShouldBe(1);
        expect(panelManager.get(5)).not.to.be.undefined;
        expect(panelManager.has(5)).to.be.true;
        counter(5).forEach(index => {
          // No panel exists at index 0 ~ 4
          expect(panelManager.has(index)).to.be.false;
        });
      });

      it("can add multiple panels", () => {
        // Given
        /* Initial State */

        // When
        panelManager.replace(0, createPanels(5));

        // Then
        rangeShouldBe(0, 4);
        lengthShouldBe(5);
      });

      it("can replace existing panel at target index", () => {
        // Given
        const previousPanel = createPanel(0);
        panelManager.replace(0, [previousPanel]);

        // When
        const replacePanel = createPanel(0);
        panelManager.replace(0, [replacePanel]);

        // Then
        rangeShouldBe(0, 0);
        lengthShouldBe(1);
        expect(panelManager.get(0)).equals(replacePanel);
        expect(panelManager.get(0)).not.equals(previousPanel);
      });

      it("can correctly increase length, considering empty panels", () => {
        // Given
        // [empty, empty, PANEL, PANEL, PANEL]
        panelManager.replace(2, createPanels(3, 2));

        // When
        panelManager.replace(1, createPanels(3, 1));

        // Then
        lengthShouldBe(4);
        rangeShouldBe(1, 4);
      });
    });

    describe("remove()", () => {
      it("can remove all panels", () => {
        // Given
        panelManager.insert(0, [createPanel(0)]);

        // When
        panelManager.remove(0);

        // Then
        rangeShouldBe(-1, -1);
        lengthShouldBe(0);
        expect(panelManager.originalPanels().length).equals(0);
        expect(panelManager.clonedPanels().length).equals(0);
        expect(panelManager.allPanels().length).equals(0);
      });

      it("should remove all empty panel from last after remove", () => {
        // Given
        panelManager.insert(0, [createPanel(0)]);
        panelManager.insert(5, [createPanel(5)]);

        // When
        panelManager.remove(5);

        // Then
        const originalPanels = panelManager.originalPanels();

        rangeShouldBe(0, 0);
        lengthShouldBe(1);
        expect(originalPanels.length).equals(1);
        expect(originalPanels.every(panel => !!panel)).to.be.true;
      });

      it("should decrease all panel indexes behind it", () => {
        // Given
        panelManager.insert(0, createPanels(5));

        // When
        panelManager.remove(2);

        // Then
        rangeShouldBe(0, 3);
        lengthShouldBe(4);
        panelManager.originalPanels().forEach((panel, index) => {
          expect(panel.getIndex()).equals(index);
        });
      });

      it("should not decrease index of panels before given index", () => {
        // Given
        panelManager.insert(2, [createPanel(2)]);
        panelManager.insert(5, [createPanel(5)]);

        // When
        panelManager.remove(5);

        // Then
        expect(panelManager.firstPanel().getIndex()).equals(2);
      });
    });
  });

  describe("Adding and removing clones", () => {
    it("can append cloned panels", () => {
      // Given
      /* Initial state */

      // When
      panelManager.insertClones(0, 0, createPanels(5));

      // Then
      const clones = panelManager.clonedPanels()[0];
      expect(clones.length).equals(5);
    });

    it("can remove clones after some cloneIndex", () => {
      // Given
      const originalPanels = createPanels(5);
      const maxCloneCount = 3;

      panelManager.insert(0, originalPanels);
      counter(maxCloneCount).forEach(cloneIdx => {
        const clones = originalPanels.map(panel => {
          return panel.clone(cloneIdx);
        });
        panelManager.insertClones(cloneIdx, 0, clones);
      });

      const previousRange = panelManager.getRange();
      const previousLength = panelManager.getPanelCount();

      // When
      panelManager.removeClonesAfter(1); // Should leave only one set of cloned panels(all clonedIndex 0)

      // Then
      expect(panelManager.clonedPanels()[0].length).equals(originalPanels.length);
      rangeShouldBe(previousRange.min, previousRange.max);
      lengthShouldBe(previousLength);
    });

    it("won't fill empty at last positions of panels array", () => {
      // Given
      const flicking = flickingInfo.instance;
      flicking.setLastIndex(3);
      flicking.replace(0, "<div></div>");
      flicking.replace(3, "<div></div>");
      /*
       *   [PANEL, empty, empty, PANEL]
       */

      // When
      flicking.prepend("<div></div>");

      // Then
      /* It should be
       * [PANEL, PANEL]
       * Not [PANEL, PANEL, empty, empty]
       */
      expect(panelManager.allPanels().length).equals(2);
      expect(panelManager.lastPanel()).not.to.be.empty;
    });

    describe("Panel chaining", () => {
      it("can chain panels correctly in non-circular mode", () => {
        // Given
        const panels = createPanels(5);
        panelManager.insert(0, panels);

        // When
        panelManager.chainAllPanels();

        // Then
        panels.forEach((panel, idx) => {
          const nextPanel = panels[idx + 1];
          const prevPanel = panels[idx - 1];

          nextPanel
            ? expect(panel.nextSibling).equals(nextPanel)
            : expect(panel.nextSibling).to.be.null;
          prevPanel
            ? expect(panel.prevSibling).equals(prevPanel)
            : expect(panel.prevSibling).to.be.null;
        });
      });

      it("can chain panels correctly in circular mode", () => {
        // Given
        useCircularMode();

        const panels = createPanels(5);
        const clones = panels.map(panel => panel.clone(0));
        panelManager.insert(0, panels);
        panelManager.insertClones(0, 0, clones);

        // When
        panelManager.chainAllPanels();

        // Then
        panels.forEach((panel, index) => {
          const nextPanel = index < panels.length - 1
            ? panels[index + 1]
            : clones[0];
          const prevPanel = index > 0
            ? panels[index - 1]
            : clones[clones.length - 1];
          expect(panel.nextSibling).equals(nextPanel);
          expect(panel.prevSibling).equals(prevPanel);
        });

        clones.forEach((panel, index) => {
          const nextPanel = index < panels.length - 1
            ? clones[index + 1]
            : panels[0];
          const prevPanel = index > 0
            ? clones[index - 1]
            : panels[clones.length - 1];
          expect(panel.nextSibling).equals(nextPanel);
          expect(panel.prevSibling).equals(prevPanel);
        });
      });

      it("can chain panel when empty spaces between indexes exist", () => {
        // Given
        const panels = createPanels(5);
        const insertingIndexes = [0, 1, 5, 10, 100];

        // When
        panels.forEach((panel, index) => {
          panelManager.insert(insertingIndexes[index], [panel]);
        });
        panelManager.chainAllPanels();

        // Then
        panels.forEach((panel, idx) => {
          const nextPanel = panels[idx + 1];
          const prevPanel = panels[idx - 1];

          nextPanel
            ? expect(panel.nextSibling).equals(nextPanel)
            : expect(panel.nextSibling).to.be.null;
          prevPanel
            ? expect(panel.prevSibling).equals(prevPanel)
            : expect(panel.prevSibling).to.be.null;
        });
      });
    });

    describe("Find panel of given element", () => {
      it("should return undefined when no panels exist", () => {
        // Given
        /* Initial State*/

        // When
        const foundPanel = panelManager.findPanelOf(document.createElement("div"));

        // Then
        expect(foundPanel).to.be.undefined;
      });

      it("should return undefined when no matching panel is found", () => {
        // Given
        panelManager.insert(0, createPanels(5));

        // When
        const foundPanel = panelManager.findPanelOf(document.createElement("div"));

        // Then
        expect(foundPanel).to.be.undefined;
      });

      it("should return panel when element is matched", () => {
        // Given
        const panels = createPanels(10);
        panelManager.insert(0, panels);

        // When
        const expectedIndex = 5;
        const panelElement = panels[expectedIndex].getElement();
        const foundPanel = panelManager.findPanelOf(panelElement);

        // Then
        expect(foundPanel).not.to.be.undefined;
        expect(foundPanel.getIndex()).equals(expectedIndex);
      });
    });
  });
});

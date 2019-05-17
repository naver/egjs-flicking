import { SinonStatic, SinonFakeTimers, SinonSpy } from "sinon";

import Viewport from "../../src/components/Viewport";
import Flicking from "../../src/Flicking";
import { createFlicking, cleanup, simulate, createHorizontalElement } from "./assets/utils";
import { FlickingOptions } from "../../src/types";
import { horizontal } from "./assets/fixture";
import { EVENTS, DEFAULT_OPTIONS } from "../../src/consts";
import { counter } from "../../src/utils";

declare var sinon: SinonStatic;

describe("Viewport", () => {
  let flicking: Flicking;
  let viewport: Viewport;
  let clock: SinonFakeTimers;

  const createViewport = (type: string, options: Partial<FlickingOptions> = {}) => {
    const flickingInfo = createFlicking(type, options);
    flicking = flickingInfo.instance;
    viewport = (flicking as any).viewport as Viewport;
  };

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });
  afterEach(() => {
    flicking = null;
    viewport = null;

    clock.restore();
    cleanup();
  });

  describe("checkedIndexes", () => {
    it("should be empty when initialized", () => {
      // Given
      createViewport(horizontal.none, { infinite: true });

      // When
      /* In initial state */

      // Then
      expect(viewport.getCheckedIndexes()).to.be.empty;
    });

    it("should be added with index range after moving", () => {
      // Given
      createViewport(horizontal.none, { infinite: true });

      // When
      simulate(flicking.getElement(), { deltaX: -100, duration: 50 });
      clock.tick(100);

      // Then
      expect(viewport.getCheckedIndexes().length).equals(1);
      const checked = viewport.getCheckedIndexes()[0];
      expect(checked[0]).equals(0);
      expect(checked[1]).equals(DEFAULT_OPTIONS.lastIndex);
    });

    it("should be updated after insertion", () => {
      // Given
      createViewport(horizontal.none, { infinite: true });
      flicking.replace(2, createHorizontalElement(100))[0];

      // When
      const checkedBeforeAdd = viewport.getCheckedIndexes().concat();
      const newElements = counter(3).map(() => createHorizontalElement(100));
      viewport.insert(0, newElements);

      // Then
      const checkedAfterAdd = viewport.getCheckedIndexes();
      expect(checkedBeforeAdd.length).equals(2); // Both direction
      expect(checkedAfterAdd.length).equals(1); // Only next direction
      expect(viewport.panelManager.has(3)).to.be.true; // panel at index 2 was pushed
      expect(checkedAfterAdd[0][0]).equals(4); // Checked index should be pushed
    });

    it("should be updated after removal", () => {
      // Given
      createViewport(horizontal.none, { infinite: true });
      flicking.replace(2, createHorizontalElement(100))[0];

      // When
      const checkedBeforeAdd = viewport.getCheckedIndexes().concat();
      viewport.remove(2);

      // Then
      const checkedAfterAdd = viewport.getCheckedIndexes();
      expect(checkedBeforeAdd.length).equals(2); // Both direction
      expect(checkedAfterAdd.length).equals(1); // Only next direction
      expect(checkedAfterAdd[0][0]).equals(0); // Should be updated to full index range
      expect(checkedAfterAdd[0][1]).equals(DEFAULT_OPTIONS.lastIndex); // Should be updated to full index range
    });

    it("should be pushed after insertion at existing panel index", () => {
      // Given
      createViewport(horizontal.fullN(1), { infinite: true });
      viewport.resize(); // to trigger need panel
      sinon.spy(viewport.getCheckedIndexes(), "splice");

      // When
      const checkedBeforeAdd = viewport.getCheckedIndexes().concat();
      const pushedIndex = 3;
      const newElements = counter(pushedIndex).map(() => createHorizontalElement(100));
      viewport.insert(0, newElements);
      const checkedAfterAdd = viewport.getCheckedIndexes();

      // Then
      expect(checkedBeforeAdd.length).equals(1);
      expect(checkedBeforeAdd[0][0]).equals(1);
      expect(checkedBeforeAdd[0][1]).equals(DEFAULT_OPTIONS.lastIndex);
      expect(checkedAfterAdd.length).equals(1);
      expect(checkedAfterAdd[0][0]).equals(4);
      expect(checkedAfterAdd[0][1]).equals(DEFAULT_OPTIONS.lastIndex);

      const spliceSpy = viewport.getCheckedIndexes().splice as SinonSpy;
      expect(spliceSpy.calledOnce).to.be.true;
      // splice called with (0, 1, [3 + 1, Infinity + 1])
      expect(spliceSpy.getCall(0).args).deep.equals([0, 1, [4, Infinity]]);
    });

    it("should be updated after sync, when adding panels", () => {
      // Given
      createViewport(horizontal.none, { infinite: true, renderExternal: true });

      // When
      const newElement = createHorizontalElement(100);
      viewport.getCameraElement().appendChild(newElement);
      flicking.sync({
        list: [newElement],
        added: [0],
        changed: [],
        removed: [],
        maintained: [],
      });

      // Then
      expect(viewport.getCheckedIndexes().length).equals(1);
      const checked = viewport.getCheckedIndexes()[0];
      expect(checked[0]).equals(0);
      expect(checked[1]).equals(DEFAULT_OPTIONS.lastIndex);
    });

    it("should be updated after sync, when removing panels", () => {
      // Given
      createViewport(horizontal.fullN(1), { infinite: true, renderExternal: true });
      viewport.resize(); // resize to trigger needPanel

      // When
      const checkedBeforeRemove = viewport.getCheckedIndexes().concat();
      // Removed 2 panels at back
      viewport.getCameraElement().removeChild(flicking.getPanel(0).getElement());

      flicking.sync({
        list: [],
        added: [],
        changed: [],
        removed: [0],
        maintained: [],
      });
      const checkedAfterRemove = viewport.getCheckedIndexes();

      // Then
      expect(checkedBeforeRemove.length).equals(1);
      expect(checkedBeforeRemove[0][0]).equals(1);
      expect(checkedBeforeRemove[0][1]).equals(DEFAULT_OPTIONS.lastIndex);
      expect(checkedAfterRemove.length).equals(1);
      expect(checkedAfterRemove[0][0]).equals(0);
      expect(checkedAfterRemove[0][1]).equals(DEFAULT_OPTIONS.lastIndex);
    });

    it("should be pushed after sync, when inserting at existing panel index", () => {
      // Given
      createViewport(horizontal.fullN(1), { infinite: true, renderExternal: true });
      viewport.resize(); // to trigger need panel

      // When
      const checkedBeforeAdd = viewport.getCheckedIndexes().concat();
      const pushedIndex = 3;
      const newElements = counter(pushedIndex).map(() => createHorizontalElement(100));
      newElements.forEach(el => {
        viewport.getCameraElement().insertBefore(el, flicking.getPanel(0).getElement());
      });
      flicking.sync({
        list: [flicking.getPanel(0).getElement(), ...newElements],
        added: [0, 1, 2],
        removed: [],
        changed: [[0, 3]],
        maintained: [[0, 3]],
      });
      const checkedAfterAdd = viewport.getCheckedIndexes();

      // Then
      expect(checkedBeforeAdd.length).equals(1);
      expect(checkedBeforeAdd[0][0]).equals(1);
      expect(checkedBeforeAdd[0][1]).equals(DEFAULT_OPTIONS.lastIndex);
      expect(checkedAfterAdd.length).equals(1);
      expect(checkedAfterAdd[0][0]).equals(4);
      expect(checkedAfterAdd[0][1]).equals(DEFAULT_OPTIONS.lastIndex);
    });

    it("should be pushed after sync, when both inserting and removing happened", () => {
      // Given
      createViewport(horizontal.fullN(3), { infinite: true, renderExternal: true });
      flicking.moveTo(2, 0); // to trigger need panel
      sinon.spy(viewport.getCheckedIndexes(), "splice");

      // When
      const checkedBeforeAdd = viewport.getCheckedIndexes().concat();
      // Insert 2 elements before panel 0
      const newElements = counter(2).map(() => createHorizontalElement(100));
      newElements.forEach(el => {
        viewport.getCameraElement().insertBefore(el, flicking.getPanel(0).getElement());
      });
      // Remove panel 1
      viewport.getCameraElement().removeChild(flicking.getPanel(1).getElement());

      flicking.sync({
        list: [...newElements, flicking.getPanel(0).getElement(), flicking.getPanel(2).getElement()],
        added: [0, 1],
        removed: [1],
        changed: [[0, 2], [2, 3]],
        maintained: [[0, 2], [2, 3]],
      });
      const checkedAfterAdd = viewport.getCheckedIndexes();

      // Then
      expect(checkedBeforeAdd.length).equals(1);
      expect(checkedBeforeAdd[0][0]).equals(3);
      expect(checkedBeforeAdd[0][1]).equals(DEFAULT_OPTIONS.lastIndex);
      expect(checkedAfterAdd.length).equals(1);
      expect(checkedAfterAdd[0][0]).equals(4);
      expect(checkedAfterAdd[0][1]).equals(DEFAULT_OPTIONS.lastIndex);

      const spliceSpy = viewport.getCheckedIndexes().splice as SinonSpy;
      expect(spliceSpy.calledOnce).to.be.true;
      // splice called with (0, 1, [3 + 1, Infinity + 1])
      expect(spliceSpy.getCall(0).args).deep.equals([0, 1, [4, Infinity]]);
    });
  });
});

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Panel from "./Panel";
import { FlickingOptions } from "../types";
import { findIndex, counter } from "../utils";

class PanelManager {
  private cameraElement: HTMLElement;
  private options: FlickingOptions;
  private panels: Panel[];
  private clones: Panel[][];
  // index range of existing panels
  private range: {
    min: number;
    max: number;
  };
  private length: number;
  private lastIndex: number;
  private cloneCount: number;

  constructor(
    cameraElement: HTMLElement,
    options: FlickingOptions,
  ) {
    this.cameraElement = cameraElement;
    this.panels = [];
    this.clones = [];
    this.range = {
      min: -1,
      max: -1,
    };
    this.length = 0;
    this.cloneCount = 0;
    this.options = options;
    this.lastIndex = options.lastIndex;
  }

  public firstPanel(): Panel | undefined {
    return this.panels[this.range.min];
  }

  public lastPanel(): Panel | undefined {
    return this.panels[this.range.max];
  }

  public allPanels(): ReadonlyArray<Panel> {
    return [
      ...this.panels,
      ...this.clones.reduce((allClones, clones) => [...allClones, ...clones], []),
    ];
  }

  public originalPanels(): ReadonlyArray<Panel> {
    return this.panels;
  }

  public clonedPanels(): ReadonlyArray<Panel[]> {
    return this.clones;
  }

  public replacePanels(newPanels: Panel[], newClones: Panel[][]): void {
    this.panels = newPanels;
    this.clones = newClones;

    this.range = {
      min: findIndex(newPanels, panel => Boolean(panel)),
      max: newPanels.length - 1,
    };
    this.length = newPanels.filter(panel => Boolean(panel)).length;
  }

  public has(index: number): boolean {
    return !!this.panels[index];
  }

  public get(index: number): Panel | undefined {
    return this.panels[index];
  }

  public getPanelCount(): number {
    return this.length;
  }

  public getLastIndex(): number {
    return this.lastIndex;
  }

  public getRange(): Readonly<{ min: number, max: number }> {
    return this.range;
  }

  public getCloneCount(): number {
    return this.cloneCount;
  }

  public setLastIndex(lastIndex: number): void {
    this.lastIndex = lastIndex;

    const firstPanel = this.firstPanel();
    const lastPanel = this.lastPanel();

    if (!firstPanel || !lastPanel) {
      return; // no meaning of updating range & length
    }

    // Remove panels above new last index
    const range = this.range;
    if (lastPanel.getIndex() > lastIndex) {
      const removingPanels = this.panels.splice(lastIndex + 1);
      this.length -= removingPanels.length;

      const firstRemovedPanel = removingPanels.filter(panel => !!panel)[0];
      const possibleLastPanel = firstRemovedPanel.prevSibling;
      if (possibleLastPanel) {
        range.max = possibleLastPanel.getIndex();
      } else {
        range.min = -1;
        range.max = -1;
      }

      if (this.shouldRender()) {
        removingPanels.forEach(panel => panel.removeElement());
      }
    }
  }

  public setCloneCount(cloneCount: number): void {
    this.cloneCount = cloneCount;
  }

  // Insert at index
  // Returns pushed elements from index, inserting at 'empty' position doesn't push elements behind it
  public insert(index: number, newPanels: Panel[]): number {
    const panels = this.panels;
    const range = this.range;
    const isCircular = this.options.circular;
    const lastIndex = this.lastIndex;

    // Find first panel that index is greater than inserting index
    const nextSibling = this.findFirstPanelFrom(index);

    // if it's null, element will be inserted at last position
    // https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore#Syntax
    const firstPanel = this.firstPanel();
    const siblingElement = nextSibling
      ? nextSibling.getElement()
      : isCircular && firstPanel
        ? firstPanel.getClonedPanels()[0].getElement()
        : null;

    // Insert panels before sibling element
    this.insertNewPanels(newPanels, siblingElement);

    let pushedIndex = newPanels.length;
    // Like when setting index 50 while visible panels are 0, 1, 2
    if (index > range.max) {
      newPanels.forEach((panel, offset) => {
        panels[index + offset] = panel;
      });
    } else {
      const panelsAfterIndex = panels.slice(index, index + newPanels.length);
      // Find empty from beginning
      let emptyPanelCount = findIndex(panelsAfterIndex, panel => !!panel);
      if (emptyPanelCount < 0) {
        // All empty
        emptyPanelCount = panelsAfterIndex.length;
      }
      pushedIndex = newPanels.length - emptyPanelCount;

      // Insert removing empty panels
      panels.splice(index, emptyPanelCount, ...newPanels);

      // Remove panels after last index
      if (panels.length > lastIndex + 1) {
        const removedPanels = panels.splice(lastIndex + 1)
          .filter(panel => Boolean(panel));
        this.length -= removedPanels.length;

        // Find first
        const newLastIndex = lastIndex - findIndex(this.panels.concat().reverse(), panel => !!panel);

        // Can be filled with empty after newLastIndex
        this.panels.splice(newLastIndex + 1);
        this.range.max = newLastIndex;

        if (this.shouldRender()) {
          removedPanels.forEach(panel => panel.removeElement());
        }
      }
    }

    // Update index of previous panels
    if (pushedIndex > 0) {
      panels.slice(index + newPanels.length).forEach(panel => {
        panel.setIndex(panel.getIndex() + pushedIndex);
      });
    }

    // Update state
    this.length += newPanels.length;
    this.updateIndex(index);

    if (isCircular) {
      this.addNewClones(index, newPanels, newPanels.length - pushedIndex, nextSibling);
      const clones = this.clones;
      const panelCount = this.panels.length;
      if (clones[0] && clones[0].length > lastIndex + 1) {
        clones.forEach(cloneSet => {
          cloneSet.splice(panelCount);
        });
      }
    }

    return pushedIndex;
  }

  public replace(index: number, newPanels: Panel[]): Panel[] {
    const panels = this.panels;
    const range = this.range;
    const options = this.options;
    const isCircular = options.circular;

    // Find first panel that index is greater than inserting index
    const nextSibling = this.findFirstPanelFrom(index + newPanels.length);

    // if it's null, element will be inserted at last position
    // https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore#Syntax
    const firstPanel = this.firstPanel();
    const siblingElement = nextSibling
      ? nextSibling.getElement()
      : isCircular && firstPanel
        ? firstPanel.getClonedPanels()[0].getElement()
        : null;

    // Insert panels before sibling element
    this.insertNewPanels(newPanels, siblingElement);

    if (index > range.max) {
      // Temporarily insert null at index to use splice()
      (panels[index] as any) = null;
    }

    const replacedPanels = panels.splice(index, newPanels.length, ...newPanels);
    const wasNonEmptyCount = replacedPanels.filter(panel => Boolean(panel)).length;

    // Suppose inserting [1, 2, 3] at 0 position when there were [empty, 1]
    // So length should be increased by 3(inserting panels) - 1(non-empty panels)
    this.length += newPanels.length - wasNonEmptyCount;
    this.updateIndex(index);

    if (isCircular) {
      this.addNewClones(index, newPanels, newPanels.length, nextSibling);
    }

    if (this.shouldRender()) {
      replacedPanels.forEach(panel => panel && panel.removeElement());
    }

    return replacedPanels;
  }

  public remove(index: number, deleteCount: number = 1): Panel[] {
    const isCircular = this.options.circular;
    const panels = this.panels;
    const clones = this.clones;
    // Delete count should be equal or larger than 0
    deleteCount = Math.max(deleteCount, 0);

    const deletedPanels = panels
      .splice(index, deleteCount)
      .filter(panel => !!panel);

    if (this.shouldRender()) {
      deletedPanels.forEach(panel => panel.removeElement());
    }

    if (isCircular) {
      clones.forEach(cloneSet => {
        cloneSet.splice(index, deleteCount);
      });
    }

    // Update indexes
    panels
      .slice(index)
      .forEach(panel => {
        panel.setIndex(panel.getIndex() - deleteCount);
      });

    // Check last panel is empty
    let lastIndex = panels.length - 1;
    if (!panels[lastIndex]) {
      const reversedPanels = panels.concat().reverse();
      const nonEmptyIndexFromLast = findIndex(reversedPanels, panel => !!panel);
      lastIndex = nonEmptyIndexFromLast < 0
        ? -1 // All empty
        : lastIndex - nonEmptyIndexFromLast;

      // Remove all empty panels from last
      panels.splice(lastIndex + 1);
      if (isCircular) {
        clones.forEach(cloneSet => {
          cloneSet.splice(lastIndex + 1);
        });
      }
    }

    // Update range & length
    this.range = {
      min: findIndex(panels, panel => !!panel),
      max: lastIndex,
    };
    this.length -= deletedPanels.length;

    if (this.length <= 0) {
      // Reset clones
      this.clones = [];
      this.cloneCount = 0;
    }

    return deletedPanels;
  }

  public chainAllPanels() {
    const allPanels = this.allPanels().filter(panel => !!panel);
    const allPanelsCount = allPanels.length;

    if (allPanelsCount <= 1) {
      return;
    }

    allPanels.slice(1, allPanels.length - 1).forEach((panel, idx) => {
      const prevPanel = allPanels[idx];
      const nextPanel = allPanels[idx + 2];

      panel.prevSibling = prevPanel;
      panel.nextSibling = nextPanel;
    });

    const firstPanel = allPanels[0];
    const lastPanel = allPanels[allPanelsCount - 1];

    firstPanel.prevSibling = null;
    firstPanel.nextSibling = allPanels[1];
    lastPanel.prevSibling = allPanels[allPanelsCount - 2];
    lastPanel.nextSibling = null;

    if (this.options.circular) {
      firstPanel.prevSibling = lastPanel;
      lastPanel.nextSibling = firstPanel;
    }
  }

  public insertClones(cloneIndex: number, index: number, clonedPanels: Panel[], deleteCount: number = 0): void {
    const clones = this.clones;
    const lastIndex = this.lastIndex;

    if (!clones[cloneIndex]) {
      const newClones: Panel[] = [];
      clonedPanels.forEach((panel, offset) => {
        newClones[index + offset] = panel;
      });

      clones[cloneIndex] = newClones;
    } else {
      const insertTarget = clones[cloneIndex];

      if (index >= insertTarget.length) {
        clonedPanels.forEach((panel, offset) => {
          insertTarget[index + offset] = panel;
        });
      } else {
        insertTarget.splice(index, deleteCount, ...clonedPanels);
        // Remove panels after last index
        if (clonedPanels.length > lastIndex + 1) {
          clonedPanels.splice(lastIndex + 1);
        }
      }
    }
  }

  // clones are operating in set
  public removeClonesAfter(cloneIndex: number): void {
    const panels = this.panels;

    panels.forEach(panel => {
      panel.removeClonedPanelsAfter(cloneIndex);
    });
    this.clones.splice(cloneIndex);
  }

  public findPanelOf(element: HTMLElement): Panel | undefined {
    const allPanels = this.allPanels();
    for (const panel of allPanels) {
      if (!panel) {
        continue;
      }
      const panelElement = panel.getElement();
      if (panelElement.contains(element)) {
        return panel;
      }
    }
  }

  public findFirstPanelFrom(index: number): Panel | undefined {
    for (const panel of this.panels.slice(index)) {
      if (panel && panel.getIndex() >= index && panel.getElement().parentNode) {
        return panel;
      }
    }
  }

  private addNewClones(index: number, originalPanels: Panel[], deleteCount: number, nextSibling: Panel | undefined) {
    const cameraElement = this.cameraElement;
    const cloneCount = this.getCloneCount();
    const lastPanel = this.lastPanel();
    const lastPanelClones: Panel[] = lastPanel
      ? lastPanel.getClonedPanels()
      : [];
    const nextSiblingClones: Panel[] = nextSibling
      ? nextSibling.getClonedPanels()
      : [];

    for (const cloneIndex of counter(cloneCount)) {
      const cloneNextSibling = nextSiblingClones[cloneIndex];
      const lastPanelSibling = lastPanelClones[cloneIndex];

      const cloneSiblingElement = cloneNextSibling
        ? cloneNextSibling.getElement()
        : lastPanelSibling
          ? lastPanelSibling.getElement().nextElementSibling
          : null;

      const newClones = originalPanels.map(panel => {
        const clone = panel.clone(cloneIndex);

        if (this.shouldRender()) {
          cameraElement.insertBefore(clone.getElement(), cloneSiblingElement);
        }

        return clone;
      });

      this.insertClones(cloneIndex, index, newClones, deleteCount);
    }
  }

  private updateIndex(insertingIndex: number) {
    const panels = this.panels;
    const range = this.range;

    const newLastIndex = panels.length - 1;
    if (newLastIndex > range.max) {
      range.max = newLastIndex;
    }
    if (insertingIndex < range.min || range.min < 0) {
      range.min = insertingIndex;
    }
  }

  private insertNewPanels(newPanels: Panel[], siblingElement: HTMLElement | null) {
    if (this.shouldRender()) {
      const fragment = document.createDocumentFragment();
      newPanels.forEach(panel => fragment.appendChild(panel.getElement()));
      this.cameraElement.insertBefore(fragment, siblingElement);
    }
  }

  private shouldRender(): boolean {
    const options = this.options;

    return !options.renderExternal && !options.renderOnlyVisible;
  }
}

export default PanelManager;

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Axes, { PanInput } from "@egjs/axes";

import Flicking from "../Flicking";
import Panel from "./Panel";
import PanelManager from "./PanelManager";
import StateMachine from "./StateMachine";
import MoveType from "../moves/MoveType";
import { FlickingOptions, FlickingPanel, FlickingStatus, ElementLike, EventType, TriggerCallback, NeedPanelEvent, FlickingEvent, MoveTypeObjectOption, OriginalStyle, Plugin, DestroyOption, BoundingBox } from "../types";
import { DEFAULT_VIEWPORT_CSS, DEFAULT_CAMERA_CSS, TRANSFORM, DEFAULT_OPTIONS, EVENTS, DIRECTION, STATE_TYPE, MOVE_TYPE } from "../consts";
import { clamp, applyCSS, toArray, parseArithmeticExpression, isBetween, isArray, parseElement, hasClass, restoreStyle, circulate, findIndex, getBbox } from "../utils";
import Snap from "../moves/Snap";
import FreeScroll from "../moves/FreeScroll";

export default class Viewport {
  public options: FlickingOptions;
  public stateMachine: StateMachine;
  public panelManager: PanelManager;
  public moveType: MoveType;

  private flicking: Flicking;
  private axes: Axes;
  private panInput: PanInput | null;

  private viewportElement: HTMLElement;
  private cameraElement: HTMLElement;

  private triggerEvent: Flicking["triggerEvent"];
  private axesHandlers: { [key: string]: any };

  private currentPanel: Panel | undefined;
  private nearestPanel: Panel | undefined;
  private visiblePanels: Panel[];

  private plugins: Plugin[] = [];
  private panelBboxes: { [className: string]: BoundingBox };
  private state: {
    size: number;
    position: number;
    panelMaintainRatio: number;
    relativeHangerPosition: number;
    positionOffset: number;
    scrollArea: {
      prev: number;
      next: number;
    };
    translate: {
      name: string,
      has3d: boolean,
    };
    infiniteThreshold: number;
    checkedIndexes: Array<[number, number]>;
    isAdaptiveCached: boolean;
    isViewportGiven: boolean;
    isCameraGiven: boolean;
    originalViewportStyle: OriginalStyle;
    originalCameraStyle: OriginalStyle;
    cachedBbox: BoundingBox | null;
  };

  constructor(
    flicking: Flicking,
    options: FlickingOptions,
    triggerEvent: Flicking["triggerEvent"],
  ) {
    this.flicking = flicking;
    this.triggerEvent = triggerEvent;

    this.state = {
      size: 0,
      position: 0,
      panelMaintainRatio: 0,
      relativeHangerPosition: 0,
      positionOffset: 0,
      scrollArea: {
        prev: 0,
        next: 0,
      },
      translate: TRANSFORM,
      infiniteThreshold: 0,
      checkedIndexes: [],
      isAdaptiveCached: false,
      isViewportGiven: false,
      isCameraGiven: false,
      originalViewportStyle: {
        className: null,
        style: null,
      },
      originalCameraStyle: {
        className: null,
        style: null,
      },
      cachedBbox: null,
    };
    this.options = options;
    this.stateMachine = new StateMachine();
    this.visiblePanels = [];
    this.panelBboxes = {};

    this.build();
  }

  public moveTo(
    panel: Panel,
    destPos: number,
    eventType: EventType["CHANGE"] | EventType["RESTORE"] | "",
    axesEvent: any,
    duration: number = this.options.duration,
  ): TriggerCallback {
    const state = this.state;
    const currentState = this.stateMachine.getState();
    const currentPosition = state.position;

    const isTrusted = axesEvent
      ? axesEvent.isTrusted
      : false;
    const direction = destPos === currentPosition
      ? null
      : destPos > currentPosition
        ? DIRECTION.NEXT
        : DIRECTION.PREV;

    let eventResult: TriggerCallback;
    if (eventType === EVENTS.CHANGE) {
      eventResult = this.triggerEvent(EVENTS.CHANGE, axesEvent, isTrusted, {
        index: panel.getIndex(),
        panel,
        direction,
      });
    } else if (eventType === EVENTS.RESTORE) {
      eventResult = this.triggerEvent(EVENTS.RESTORE, axesEvent, isTrusted);
    } else {
      eventResult = {
        onSuccess(callback: () => void): TriggerCallback {
          callback();
          return this;
        },
        onStopped(): TriggerCallback {
          return this;
        },
      };
    }

    eventResult.onSuccess(() => {
      currentState.delta = 0;
      currentState.lastPosition = this.getCameraPosition();
      currentState.targetPanel = panel;
      currentState.direction = destPos === currentPosition
        ? null
        : destPos > currentPosition
          ? DIRECTION.NEXT
          : DIRECTION.PREV;

      if (destPos === currentPosition) {
        // no move
        this.nearestPanel = panel;
        this.currentPanel = panel;
      }

      if (axesEvent && axesEvent.setTo) {
        // freeScroll only occurs in release events
        axesEvent.setTo({ flick: destPos }, duration);
      } else {
        this.axes.setTo({ flick: destPos }, duration);
      }
    });

    return eventResult;
  }

  public moveCamera(pos: number, axesEvent?: any): void {
    const state = this.state;
    const options = this.options;
    const transform = state.translate.name;
    const scrollArea = state.scrollArea;

    // Update position & nearestPanel
    if (options.circular && !isBetween(pos, scrollArea.prev, scrollArea.next)) {
      pos = circulate(pos, scrollArea.prev, scrollArea.next, false);
    }
    state.position = pos;
    this.nearestPanel = this.findNearestPanel();
    const nearestPanel = this.nearestPanel;
    const originalNearestPosition = nearestPanel
      ? nearestPanel.getPosition()
      : 0;

    // From 0(panel position) to 1(panel position + panel size)
    // When it's on gap area value will be (val > 1 || val < 0)
    if (nearestPanel) {
      const hangerPosition = this.getHangerPosition();
      const panelPosition = nearestPanel.getPosition();
      const panelSize = nearestPanel.getSize();
      const halfGap = options.gap / 2;

      // As panel's range is from panel position - half gap ~ panel pos + panel size + half gap
      state.panelMaintainRatio = (hangerPosition - panelPosition + halfGap) / (panelSize + 2 * halfGap);
    } else {
      state.panelMaintainRatio = 0;
    }

    this.checkNeedPanel(axesEvent);

    // Possibly modified after need panel, if it's looped
    const modifiedNearestPosition = nearestPanel
      ? nearestPanel.getPosition()
      : 0;

    pos += (modifiedNearestPosition - originalNearestPosition);
    state.position = pos;

    this.updateVisiblePanels();

    // Offset is needed to fix camera layer size in visible-only rendering mode
    const posOffset = options.renderOnlyVisible
      ? state.positionOffset
      : 0;
    const moveVector = options.horizontal
      ? [-(pos - posOffset), 0] : [0, -(pos - posOffset)];
    const moveCoord = moveVector.map(coord => `${Math.round(coord)}px`).join(", ");

    this.cameraElement.style[transform] = state.translate.has3d
      ? `translate3d(${moveCoord}, 0px)`
      : `translate(${moveCoord})`;
  }

  public stopCamera = (axesEvent: any): void => {
    if (axesEvent && axesEvent.setTo) {
      axesEvent.setTo({ flick: this.state.position }, 0);
    }

    this.stateMachine.transitTo(STATE_TYPE.IDLE);
  }

  public unCacheBbox(): void {
    const state = this.state;
    const options = this.options;

    state.cachedBbox = null;
    this.visiblePanels = [];

    const viewportElement = this.viewportElement;
    if (!options.horizontal) {
      // Don't preserve previous width for adaptive resizing
      viewportElement.style.width = "";
    } else {
      viewportElement.style.height = "";
    }
    state.isAdaptiveCached = false;
    this.panelBboxes = {};
  }

  public resize(): void {
    this.updateSize();
    this.updateOriginalPanelPositions();
    this.updateAdaptiveSize();
    this.updateScrollArea();
    this.updateClonePanels();
    this.updateVisiblePanelPositions();
    this.updateCameraPosition();
    this.updatePlugins();
  }

  // Find nearest anchor from current hanger position
  public findNearestPanel(): Panel | undefined {
    const state = this.state;
    const panelManager = this.panelManager;
    const hangerPosition = this.getHangerPosition();

    if (this.isOutOfBound()) {
      const position = state.position;

      return position <= state.scrollArea.prev
        ? panelManager.firstPanel()
        : panelManager.lastPanel();
    }

    return this.findNearestPanelAt(hangerPosition);
  }

  public findNearestPanelAt(position: number): Panel | undefined {
    const panelManager = this.panelManager;

    const allPanels = panelManager.allPanels();
    let minimumDistance = Infinity;
    let nearestPanel: Panel | undefined;

    for (const panel of allPanels) {
      if (!panel) {
        continue;
      }
      const prevPosition = panel.getPosition();
      const nextPosition = prevPosition + panel.getSize();

      // Use shortest distance from panel's range
      const distance = isBetween(position, prevPosition, nextPosition)
        ? 0
        : Math.min(
          Math.abs(prevPosition - position),
          Math.abs(nextPosition - position),
        );

      if (distance > minimumDistance) {
        break;
      } else if (distance === minimumDistance) {
        const minimumAnchorDistance = Math.abs(position - nearestPanel!.getAnchorPosition());
        const anchorDistance = Math.abs(position - panel.getAnchorPosition());

        if (anchorDistance > minimumAnchorDistance) {
          break;
        }
      }

      minimumDistance = distance;
      nearestPanel = panel;
    }

    return nearestPanel;
  }

  public findNearestIdenticalPanel(panel: Panel): Panel {
    let nearest = panel;
    let shortestDistance = Infinity;
    const hangerPosition = this.getHangerPosition();

    const identicals = panel.getIdenticalPanels();
    identicals.forEach(identical => {
      const anchorPosition = identical.getAnchorPosition();
      const distance = Math.abs(anchorPosition - hangerPosition);

      if (distance < shortestDistance) {
        nearest = identical;
        shortestDistance = distance;
      }
    });

    return nearest;
  }

  // Find shortest camera position that distance is minimum
  public findShortestPositionToPanel(panel: Panel): number {
    const state = this.state;
    const options = this.options;
    const anchorPosition = panel.getAnchorPosition();
    const hangerPosition = this.getHangerPosition();
    const distance = Math.abs(hangerPosition - anchorPosition);
    const scrollAreaSize = state.scrollArea.next - state.scrollArea.prev;

    if (!options.circular) {
      const position = anchorPosition - state.relativeHangerPosition;
      return this.canSetBoundMode()
        ? clamp(position, state.scrollArea.prev, state.scrollArea.next)
        : position;
    } else {
      // If going out of viewport border is more efficient way of moving, choose that position
      return distance <= scrollAreaSize - distance
        ? anchorPosition - state.relativeHangerPosition
        : anchorPosition > hangerPosition
          // PREV TO NEXT
          ? anchorPosition - state.relativeHangerPosition - scrollAreaSize
          // NEXT TO PREV
          : anchorPosition - state.relativeHangerPosition + scrollAreaSize;
    }
  }

  public findEstimatedPosition(panel: Panel): number {
    const scrollArea = this.getScrollArea();

    let estimatedPosition = panel.getAnchorPosition() - this.getRelativeHangerPosition();
    estimatedPosition = this.canSetBoundMode()
      ? clamp(estimatedPosition, scrollArea.prev, scrollArea.next)
      : estimatedPosition;

    return estimatedPosition;
  }

  public addVisiblePanel(panel: Panel): void {
    if (this.getVisibleIndexOf(panel) < 0) {
      this.visiblePanels.push(panel);
    }
  }

  public enable(): void {
    if (!this.panInput) {
      this.createPanInput();
    }
  }

  public disable(): void {
    if (this.panInput) {
      this.panInput.destroy();
      this.panInput = null;

      this.stateMachine.transitTo(STATE_TYPE.IDLE);
    }
  }

  public insert(index: number, element: ElementLike | ElementLike[]): FlickingPanel[] {
    const lastIndex = this.panelManager.getLastIndex();

    // Index should not below 0
    if (index < 0 || index > lastIndex) {
      return [];
    }

    const state = this.state;
    const options = this.options;
    const parsedElements = parseElement(element);

    const panels = parsedElements
      .map((el, idx) => new Panel(el, index + idx, this))
      .slice(0, lastIndex - index + 1);

    if (panels.length <= 0) {
      return [];
    }

    const pushedIndex = this.panelManager.insert(index, panels);

    // ...then calc bbox for all panels
    this.resizePanels(panels);

    if (!this.currentPanel) {
      this.currentPanel = panels[0];
      this.nearestPanel = panels[0];

      const newCenterPanel = panels[0];
      const newPanelPosition = this.findEstimatedPosition(newCenterPanel);
      state.position = newPanelPosition;
      this.updateAxesPosition(newPanelPosition);
      state.panelMaintainRatio = (newCenterPanel.getRelativeAnchorPosition() + options.gap / 2) / (newCenterPanel.getSize() + options.gap);
    }

    // Update checked indexes in infinite mode
    this.updateCheckedIndexes({ min: index, max: index });
    state.checkedIndexes.forEach((indexes, idx) => {
      const [min, max] = indexes;
      if (index < min) {
        // Push checked index
        state.checkedIndexes.splice(idx, 1, [min + pushedIndex, max + pushedIndex]);
      }
    });

    this.resize();

    return panels;
  }

  public replace(index: number, element: ElementLike | ElementLike[]): FlickingPanel[] {
    const state = this.state;
    const options = this.options;
    const panelManager = this.panelManager;
    const lastIndex = panelManager.getLastIndex();

    // Index should not below 0
    if (index < 0 || index > lastIndex) {
      return [];
    }

    const parsedElements = parseElement(element);
    const panels = parsedElements
      .map((el, idx) => new Panel(el, index + idx, this))
      .slice(0, lastIndex - index + 1);

    if (panels.length <= 0) {
      return [];
    }

    const replacedPanels = panelManager.replace(index, panels);

    replacedPanels.forEach(panel => {
      const visibleIndex = this.getVisibleIndexOf(panel);
      if (visibleIndex > -1) {
        this.visiblePanels.splice(visibleIndex, 1);
      }
    });

    // ...then calc bbox for all panels
    this.resizePanels(panels);

    const currentPanel = this.currentPanel;
    const wasEmpty = !currentPanel;
    if (wasEmpty) {
      this.currentPanel = panels[0];
      this.nearestPanel = panels[0];

      const newCenterPanel = panels[0];
      const newPanelPosition = this.findEstimatedPosition(newCenterPanel);
      state.position = newPanelPosition;
      this.updateAxesPosition(newPanelPosition);
      state.panelMaintainRatio = (newCenterPanel.getRelativeAnchorPosition() + options.gap / 2) / (newCenterPanel.getSize() + options.gap);
    } else if (isBetween(currentPanel!.getIndex(), index, index + panels.length - 1)) {
      // Current panel is replaced
      this.currentPanel = panelManager.get(currentPanel!.getIndex());
    }

    // Update checked indexes in infinite mode
    this.updateCheckedIndexes({ min: index, max: index + panels.length - 1 });

    this.resize();

    return panels;
  }

  public remove(index: number, deleteCount: number = 1): FlickingPanel[] {
    const state = this.state;
    // Index should not below 0
    index = Math.max(index, 0);

    const panelManager = this.panelManager;
    const currentIndex = this.getCurrentIndex();

    const removedPanels = panelManager.remove(index, deleteCount);
    if (isBetween(currentIndex, index, index + deleteCount - 1)) {
      // Current panel is removed
      // Use panel at removing index - 1 as new current panel if it exists
      const newCurrentIndex = Math.max(index - 1, panelManager.getRange().min);
      this.currentPanel = panelManager.get(newCurrentIndex);
    }

    // Update checked indexes in infinite mode
    if (deleteCount > 0) {
      // Check whether removing index will affect checked indexes
      // Suppose index 0 is empty and removed index 1, then checked index 0 should be deleted and vice versa.
      this.updateCheckedIndexes({ min: index - 1, max: index + deleteCount });
      // Uncache visible panels to refresh panels
      this.visiblePanels = [];
    }

    if (panelManager.getPanelCount() <= 0) {
      this.currentPanel = undefined;
      this.nearestPanel = undefined;
    }

    this.resize();

    const scrollArea = state.scrollArea;
    if (state.position < scrollArea.prev || state.position > scrollArea.next) {
      const newPosition = circulate(state.position, scrollArea.prev, scrollArea.next, false);
      this.moveCamera(newPosition);
      this.updateAxesPosition(newPosition);
    }

    return removedPanels;
  }

  public updateAdaptiveSize(): void {
    const state = this.state;
    const options = this.options;
    const horizontal = options.horizontal;
    const currentPanel = this.getCurrentPanel();

    if (!currentPanel) {
      return;
    }

    const shouldApplyAdaptive = options.adaptive || !state.isAdaptiveCached;
    const viewportStyle = this.viewportElement.style;
    if (shouldApplyAdaptive) {
      let sizeToApply: number;
      if (options.adaptive) {
        const panelBbox = currentPanel.getBbox();

        sizeToApply = horizontal ? panelBbox.height : panelBbox.width;
      } else {
        // Find minimum height of panels to maximum panel size
        const maximumPanelSize = this.panelManager.originalPanels().reduce((maximum, panel) => {
          const panelBbox = panel.getBbox();
          return Math.max(maximum, horizontal ? panelBbox.height : panelBbox.width);
        }, 0);

        sizeToApply = maximumPanelSize;
      }

      if (!state.isAdaptiveCached) {
        const viewportBbox = this.updateBbox();
        sizeToApply = Math.max(sizeToApply, horizontal ? viewportBbox.height : viewportBbox.width);
        state.isAdaptiveCached = true;
      }

      const viewportSize = `${sizeToApply}px`;
      if (horizontal) {
        viewportStyle.height = viewportSize;
        state.cachedBbox!.height = sizeToApply;
      } else {
        viewportStyle.width = viewportSize;
        state.cachedBbox!.width = sizeToApply;
      }
    }
  }

  // Update camera position after resizing
  public updateCameraPosition(): void {
    const state = this.state;
    const currentPanel = this.getCurrentPanel();
    const cameraPosition = this.getCameraPosition();
    const currentState = this.stateMachine.getState();
    const isFreeScroll = this.moveType.is(MOVE_TYPE.FREE_SCROLL);
    const relativeHangerPosition = this.getRelativeHangerPosition();
    const halfGap = this.options.gap / 2;

    if (currentState.holding || currentState.playing) {
      this.updateVisiblePanels();
      return;
    }

    let newPosition: number;
    if (isFreeScroll) {
      const positionBounded = this.canSetBoundMode() && (cameraPosition === state.scrollArea.prev || cameraPosition === state.scrollArea.next);
      const nearestPanel = this.getNearestPanel();

      // Preserve camera position if it is bound to scroll area limit
      newPosition = positionBounded || !nearestPanel
        ? cameraPosition
        : nearestPanel.getPosition() - halfGap + (nearestPanel.getSize() + 2 * halfGap) * state.panelMaintainRatio - relativeHangerPosition;
    } else {
      newPosition = currentPanel
        ? currentPanel.getAnchorPosition() - relativeHangerPosition
        : cameraPosition;
    }

    if (this.canSetBoundMode()) {
      newPosition = clamp(newPosition, state.scrollArea.prev, state.scrollArea.next);
    }

    // Pause & resume axes to prevent axes's "change" event triggered
    // This should be done before moveCamera, as moveCamera can trigger needPanel
    this.updateAxesPosition(newPosition);

    this.moveCamera(newPosition);
  }

  public updateBbox(): BoundingBox {
    const state = this.state;
    const options = this.options;
    const viewportElement = this.viewportElement;

    if (!state.cachedBbox) {
      state.cachedBbox = getBbox(viewportElement, options.useOffset);
    }

    return state.cachedBbox!;
  }

  public updatePlugins(): void {
    // update for resize
    this.plugins.forEach(plugin => {
      plugin.update && plugin.update(this.flicking);
    });
  }

  public destroy(option: Partial<DestroyOption>): void {
    const state = this.state;
    const wrapper = this.flicking.getElement();
    const viewportElement = this.viewportElement;
    const cameraElement = this.cameraElement;
    const originalPanels = this.panelManager.originalPanels();

    this.removePlugins(this.plugins);
    if (!option.preserveUI) {
      restoreStyle(viewportElement, state.originalViewportStyle);
      restoreStyle(cameraElement, state.originalCameraStyle);

      if (!state.isCameraGiven && !this.options.renderExternal) {
        const topmostElement = state.isViewportGiven
          ? viewportElement
          : wrapper;
        const deletingElement = state.isViewportGiven
          ? cameraElement
          : viewportElement;

        originalPanels.forEach(panel => {
          topmostElement.appendChild(panel.getElement());
        });

        topmostElement.removeChild(deletingElement);
      }
    }

    this.axes.destroy();
    this.panInput?.destroy();

    originalPanels.forEach(panel => { panel.destroy(option); });

    // release resources
    for (const x in this) {
      (this as any)[x] = null;
    }
  }

  public restore(status: FlickingStatus): void {
    const panels = status.panels;
    const defaultIndex = this.options.defaultIndex;
    const cameraElement = this.cameraElement;
    const panelManager = this.panelManager;

    // Restore index
    cameraElement.innerHTML = panels.map(panel => panel.html).join("");

    // Create panels first
    this.refreshPanels();
    const createdPanels = panelManager.originalPanels();

    // ...then order it by its index
    const orderedPanels: Panel[] = [];
    panels.forEach((panel, idx) => {
      const createdPanel = createdPanels[idx];
      createdPanel.setIndex(panel.index);
      createdPanel.setPosition(panel.position);
      orderedPanels[panel.index] = createdPanel;
    });
    panelManager.replacePanels(orderedPanels, []);
    panelManager.setCloneCount(0); // No clones at this point

    const panelCount = panelManager.getPanelCount();
    if (panelCount > 0) {
      this.currentPanel = panelManager.get(status.index)
        || panelManager.get(defaultIndex)
        || panelManager.firstPanel();
    } else {
      this.currentPanel = undefined;
    }
    this.visiblePanels = orderedPanels.filter(panel => Boolean(panel));

    this.resize();

    this.axes.setTo({ flick: status.position }, 0);
    this.moveCamera(status.position);
  }

  public calcVisiblePanels(): Panel[] {
    const allPanels = this.panelManager.allPanels();
    if (this.options.renderOnlyVisible) {
      const cameraPos = this.getCameraPosition();
      const viewportSize = this.getSize();
      const basePanel = this.nearestPanel!;

      const getNextPanel = (panel: Panel) => {
        const nextPanel = panel.nextSibling;

        if (nextPanel && nextPanel.getPosition() >= panel.getPosition()) {
          return nextPanel;
        } else {
          return null;
        }
      };

      const getPrevPanel = (panel: Panel) => {
        const prevPanel = panel.prevSibling;

        if (prevPanel && prevPanel.getPosition() <= panel.getPosition()) {
          return prevPanel;
        } else {
          return null;
        }
      };

      const isOutOfBoundNext = (panel: Panel) => panel.getPosition() >= cameraPos + viewportSize;
      const isOutOfBoundPrev = (panel: Panel) => panel.getPosition() + panel.getSize() <= cameraPos;

      const getVisiblePanels = (
        panel: Panel,
        getNext: (panel: Panel) => Panel | null,
        isOutOfViewport: (panel: Panel) => boolean,
      ): Panel[] => {
        const visiblePanels: Panel[] = [];

        let lastPanel = panel;
        while (true) {
          const nextPanel = getNext(lastPanel);
          if (!nextPanel || isOutOfViewport(nextPanel)) {
            break;
          }
          visiblePanels.push(nextPanel);
          lastPanel = nextPanel;
        }
        return visiblePanels;
      };

      const panelCount = this.panelManager.getPanelCount();
      const getAbsIndex = (panel: Panel) => panel.getIndex() + (panel.getCloneIndex() + 1) * panelCount;
      const nextPanels = getVisiblePanels(basePanel, getNextPanel, isOutOfBoundNext);
      const prevPanels = getVisiblePanels(basePanel, getPrevPanel, isOutOfBoundPrev);

      return [basePanel, ...nextPanels, ...prevPanels].sort((panel1, panel2) => getAbsIndex(panel1) - getAbsIndex(panel2));
    } else {
      return allPanels.filter(panel => {
        const outsetProgress = panel.getOutsetProgress();

        return outsetProgress > -1 && outsetProgress < 1;
      });
    }
  }

  public getCurrentPanel(): Panel | undefined {
    return this.currentPanel;
  }

  public getCurrentIndex(): number {
    const currentPanel = this.currentPanel;

    return currentPanel
      ? currentPanel.getIndex()
      : -1;
  }

  public getNearestPanel(): Panel | undefined {
    return this.nearestPanel;
  }

  // Get progress from nearest panel
  public getCurrentProgress(): number {
    const currentState = this.stateMachine.getState();
    let nearestPanel = currentState.playing || currentState.holding
      ? this.nearestPanel
      : this.currentPanel;

    const panelManager = this.panelManager;
    if (!nearestPanel) {
      // There're no panels
      return NaN;
    }
    const { prev: prevRange, next: nextRange } = this.getScrollArea();
    const cameraPosition = this.getCameraPosition();
    const isOutOfBound = this.isOutOfBound();
    let prevPanel = nearestPanel.prevSibling;
    let nextPanel = nearestPanel.nextSibling;
    let hangerPosition = this.getHangerPosition();
    let nearestAnchorPos = nearestPanel.getAnchorPosition();

    if (
      isOutOfBound
      && prevPanel
      && nextPanel
      && cameraPosition < nextRange
      // On the basis of anchor, prevPanel is nearestPanel.
      && (hangerPosition - prevPanel.getAnchorPosition() < nearestAnchorPos - hangerPosition)
    ) {
      nearestPanel = prevPanel;
      nextPanel = nearestPanel.nextSibling;
      prevPanel = nearestPanel.prevSibling;
      nearestAnchorPos = nearestPanel.getAnchorPosition();
    }
    const nearestIndex = nearestPanel.getIndex() + (nearestPanel.getCloneIndex() + 1) * panelManager.getPanelCount();
    const nearestSize = nearestPanel.getSize();

    if (isOutOfBound) {
      const relativeHangerPosition = this.getRelativeHangerPosition();

      if (nearestAnchorPos > nextRange + relativeHangerPosition) {
        // next bounce area: hangerPosition - relativeHangerPosition - nextRange
        hangerPosition = nearestAnchorPos + hangerPosition - relativeHangerPosition - nextRange;
      } else if (nearestAnchorPos < prevRange + relativeHangerPosition) {
        // prev bounce area: hangerPosition - relativeHangerPosition - prevRange
        hangerPosition = nearestAnchorPos + hangerPosition - relativeHangerPosition - prevRange;
      }
    }
    const hangerIsNextToNearestPanel = hangerPosition >= nearestAnchorPos;
    const gap = this.options.gap;

    let basePosition = nearestAnchorPos;
    let targetPosition = nearestAnchorPos;
    if (hangerIsNextToNearestPanel) {
      targetPosition = nextPanel
        ? nextPanel.getAnchorPosition()
        : nearestAnchorPos + nearestSize + gap;
    } else {
      basePosition = prevPanel
        ? prevPanel.getAnchorPosition()
        : nearestAnchorPos - nearestSize - gap;
    }

    const progressBetween = (hangerPosition - basePosition) / (targetPosition - basePosition);
    const startIndex = hangerIsNextToNearestPanel
      ? nearestIndex
      : prevPanel
        ? prevPanel.getIndex()
        : nearestIndex - 1;

    return startIndex + progressBetween;
  }

  // Update axes flick position without triggering event
  public updateAxesPosition(position: number) {
    const axes = this.axes;
    axes.off();
    axes.setTo({
      flick: position,
    }, 0);
    axes.on(this.axesHandlers);
  }

  public getSize(): number {
    return this.state.size;
  }

  public getScrollArea(): { prev: number, next: number } {
    return this.state.scrollArea;
  }

  public isOutOfBound(): boolean {
    const state = this.state;
    const options = this.options;
    const scrollArea = state.scrollArea;

    return !options.circular
      && options.bound
      && (state.position <= scrollArea.prev || state.position >= scrollArea.next);
  }

  public canSetBoundMode(): boolean {
    const options = this.options;

    return options.bound && !options.circular;
  }

  public getViewportElement(): HTMLElement {
    return this.viewportElement;
  }

  public getCameraElement(): HTMLElement {
    return this.cameraElement;
  }

  public getScrollAreaSize(): number {
    const scrollArea = this.state.scrollArea;

    return scrollArea.next - scrollArea.prev;
  }

  public getRelativeHangerPosition(): number {
    return this.state.relativeHangerPosition;
  }

  public getHangerPosition(): number {
    return this.state.position + this.state.relativeHangerPosition;
  }

  public getCameraPosition(): number {
    return this.state.position;
  }

  public getPositionOffset(): number {
    return this.state.positionOffset;
  }

  public getCheckedIndexes(): Array<[number, number]> {
    return this.state.checkedIndexes;
  }

  public getVisiblePanels(): Panel[] {
    return this.visiblePanels;
  }

  public setCurrentPanel(panel: Panel | undefined): void {
    this.currentPanel = panel;
  }

  public setLastIndex(index: number): void {
    const currentPanel = this.currentPanel;
    const panelManager = this.panelManager;

    panelManager.setLastIndex(index);
    if (currentPanel && currentPanel.getIndex() > index) {
      this.currentPanel = panelManager.lastPanel();
    }

    this.resize();
  }

  public setVisiblePanels(panels: Panel[]): void {
    this.visiblePanels = panels;
  }

  public connectAxesHandler(handlers: { [key: string]: (event: { [key: string]: any; }) => any }): void {
    const axes = this.axes;

    this.axesHandlers = handlers;
    axes.on(handlers);
  }

  public addPlugins(plugins: Plugin | Plugin[]) {
    const newPlugins = ([] as Plugin[]).concat(plugins);

    newPlugins.forEach(plugin => {
      plugin.init(this.flicking);
    });

    this.plugins = this.plugins.concat(newPlugins);
    return this;
  }

  public removePlugins(plugins: Plugin | Plugin[]) {
    const currentPlugins = this.plugins;
    const removedPlugins = ([] as Plugin[]).concat(plugins);

    removedPlugins.forEach(plugin => {
      const index = currentPlugins.indexOf(plugin);

      if (index > -1) {
        currentPlugins.splice(index, 1);
      }

      plugin.destroy(this.flicking);
    });
    return this;
  }

  public updateCheckedIndexes(changedRange: { min: number, max: number }): void {
    const state = this.state;

    let removed = 0;
    state.checkedIndexes.concat().forEach((indexes, idx) => {
      const [min, max] = indexes;
      // Can fill part of indexes in range
      if (changedRange.min <= max && changedRange.max >= min) {
        // Remove checked index from list
        state.checkedIndexes.splice(idx - removed, 1);
        removed++;
      }
    });
  }

  public appendUncachedPanelElements(panels: Panel[]): void {
    const options = this.options;
    const fragment = document.createDocumentFragment();

    if (options.isEqualSize) {
      const prevVisiblePanels = this.visiblePanels;
      const equalSizeClasses = options.isEqualSize as string[]; // for readability
      const cached: { [className: string]: boolean } = {};

      this.visiblePanels = [];

      Object.keys(this.panelBboxes).forEach(className => {
        cached[className] = true;
      });

      panels.forEach(panel => {
        const overlappedClass = panel.getOverlappedClass(equalSizeClasses);
        if (overlappedClass && !cached[overlappedClass]) {
          if (!options.renderExternal) {
            fragment.appendChild(panel.getElement());
          }
          this.visiblePanels.push(panel);
          cached[overlappedClass] = true;
        } else if (!overlappedClass) {
          if (!options.renderExternal) {
            fragment.appendChild(panel.getElement());
          }
          this.visiblePanels.push(panel);
        }
      });
      prevVisiblePanels.forEach(panel => {
        this.addVisiblePanel(panel);
      });
    } else {
      if (!options.renderExternal) {
        panels.forEach(panel => fragment.appendChild(panel.getElement()));
      }
      this.visiblePanels = panels.filter(panel => Boolean(panel));
    }

    if (!options.renderExternal) {
      this.cameraElement.appendChild(fragment);
    }
  }

  private updateClonePanels() {
    const panelManager = this.panelManager;

    // Clone panels in circular mode
    if (this.options.circular && panelManager.getPanelCount() > 0) {
      this.clonePanels();
      this.updateClonedPanelPositions();
    }
    panelManager.chainAllPanels();
  }

  private getVisibleIndexOf(panel: Panel): number {
    return findIndex(this.visiblePanels, visiblePanel => visiblePanel === panel);
  }

  private build(): void {
    this.setElements();
    this.applyCSSValue();
    this.setMoveType();
    this.setAxesInstance();
    this.refreshPanels();
    this.setDefaultPanel();
    this.resize();
    this.moveToDefaultPanel();
  }

  private setElements(): void {
    const state = this.state;
    const options = this.options;
    const wrapper = this.flicking.getElement();
    const classPrefix = options.classPrefix;

    const viewportCandidate = wrapper.children[0] as HTMLElement;
    const hasViewportElement = viewportCandidate && hasClass(viewportCandidate, `${classPrefix}-viewport`);

    const viewportElement = hasViewportElement
      ? viewportCandidate
      : document.createElement("div");

    const cameraCandidate = hasViewportElement
      ? viewportElement.children[0] as HTMLElement
      : wrapper.children[0] as HTMLElement;
    const hasCameraElement = cameraCandidate && hasClass(cameraCandidate, `${classPrefix}-camera`);

    const cameraElement = hasCameraElement
      ? cameraCandidate
      : document.createElement("div");

    if (!hasCameraElement) {
      cameraElement.className = `${classPrefix}-camera`;

      const panelElements = hasViewportElement
        ? viewportElement.children
        : wrapper.children;

      // Make all panels to be a child of camera element
      // wrapper <- viewport <- camera <- panels[1...n]
      toArray(panelElements).forEach(child => {
        cameraElement.appendChild(child);
      });
    } else {
      state.originalCameraStyle = {
        className: cameraElement.getAttribute("class"),
        style: cameraElement.getAttribute("style"),
      };
    }

    if (!hasViewportElement) {
      viewportElement.className = `${classPrefix}-viewport`;

      // Add viewport element to wrapper
      wrapper.appendChild(viewportElement);
    } else {
      state.originalViewportStyle = {
        className: viewportElement.getAttribute("class"),
        style: viewportElement.getAttribute("style"),
      };
    }

    if (!hasCameraElement || !hasViewportElement) {
      viewportElement.appendChild(cameraElement);
    }

    this.viewportElement = viewportElement;
    this.cameraElement = cameraElement;
    state.isViewportGiven = hasViewportElement;
    state.isCameraGiven = hasCameraElement;
  }

  private applyCSSValue(): void {
    const options = this.options;
    const viewportElement = this.viewportElement;
    const cameraElement = this.cameraElement;
    const viewportStyle = this.viewportElement.style;

    // Set default css values for each element
    applyCSS(viewportElement, DEFAULT_VIEWPORT_CSS);
    applyCSS(cameraElement, DEFAULT_CAMERA_CSS);

    viewportElement.style.zIndex = `${options.zIndex}`;
    if (options.horizontal) {
      viewportStyle.minHeight = "100%";
      viewportStyle.width = "100%";
    } else {
      viewportStyle.minWidth = "100%";
      viewportStyle.height = "100%";
    }
    if (options.overflow) {
      viewportStyle.overflow = "visible";
    }

    this.panelManager = new PanelManager(this.cameraElement, options);
  }

  private setMoveType(): void {
    const moveType = this.options.moveType as MoveTypeObjectOption;

    switch (moveType.type) {
      case MOVE_TYPE.SNAP:
        this.moveType = new Snap(moveType.count);
        break;
      case MOVE_TYPE.FREE_SCROLL:
        this.moveType = new FreeScroll();
        break;
      default:
        throw new Error("moveType is not correct!");
    }
  }

  private setAxesInstance(): void {
    const state = this.state;
    const options = this.options;

    const scrollArea = state.scrollArea;

    this.axes = new Axes({
      flick: {
        range: [scrollArea.prev, scrollArea.next],
        circular: options.circular,
        bounce: [0, 0], // will be updated in resize()
      },
    }, {
      easing: options.panelEffect,
      deceleration: options.deceleration,
      interruptable: true,
    });

    this.createPanInput();
  }

  private refreshPanels(): void {
    const panelManager = this.panelManager;
    // Panel elements were attached to camera element by Flicking class
    const panelElements = this.cameraElement.children;

    // Initialize panels
    const panels = toArray(panelElements).map(
      (el: HTMLElement, idx: number) => new Panel(el, idx, this),
    );

    panelManager.replacePanels(panels, []);
    this.visiblePanels = panels.filter(panel => Boolean(panel));
  }

  private setDefaultPanel(): void {
    const options = this.options;
    const panelManager = this.panelManager;
    const indexRange = this.panelManager.getRange();
    const index = clamp(options.defaultIndex, indexRange.min, indexRange.max);

    this.currentPanel = panelManager.get(index);
  }

  private clonePanels() {
    const state = this.state;
    const options = this.options;
    const panelManager = this.panelManager;

    const gap = options.gap;
    const viewportSize = state.size;
    const firstPanel = panelManager.firstPanel();
    const lastPanel = panelManager.lastPanel()!;

    // There're no panels exist
    if (!firstPanel) {
      return;
    }

    // For each panels, clone itself while last panel's position + size is below viewport size
    const panels = panelManager.originalPanels();
    const reversedPanels = panels.concat().reverse();

    const sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition() + gap;
    const relativeAnchorPosition = firstPanel.getRelativeAnchorPosition();
    const relativeHangerPosition = this.getRelativeHangerPosition();

    const areaPrev = (relativeHangerPosition - relativeAnchorPosition) % sumOriginalPanelSize;
    let sizeSum = 0;
    let panelAtLeftBoundary!: Panel;
    for (const panel of reversedPanels) {
      if (!panel) {
        continue;
      }
      sizeSum += panel.getSize() + gap;
      if (sizeSum >= areaPrev) {
        panelAtLeftBoundary = panel;
        break;
      }
    }

    const areaNext = (viewportSize - relativeHangerPosition + relativeAnchorPosition) % sumOriginalPanelSize;
    sizeSum = 0;
    let panelAtRightBoundary!: Panel;
    for (const panel of panels) {
      if (!panel) {
        continue;
      }
      sizeSum += panel.getSize() + gap;
      if (sizeSum >= areaNext) {
        panelAtRightBoundary = panel;
        break;
      }
    }

    // Need one more set of clones on prev area of original panel 0
    const needCloneOnPrev = panelAtLeftBoundary.getIndex() !== 0
      && panelAtLeftBoundary.getIndex() <= panelAtRightBoundary.getIndex();

    // Visible count of panel 0 on first screen
    const panel0OnFirstscreen = Math.ceil((relativeHangerPosition + firstPanel.getSize() - relativeAnchorPosition) / sumOriginalPanelSize)
      + Math.ceil((viewportSize - relativeHangerPosition + relativeAnchorPosition) / sumOriginalPanelSize)
      - 1; // duplication

    const cloneCount = panel0OnFirstscreen
      + (needCloneOnPrev ? 1 : 0);
    const prevCloneCount = panelManager.getCloneCount();

    panelManager.setCloneCount(cloneCount);
    if (options.renderExternal) {
      return;
    }

    if (cloneCount > prevCloneCount) {
      // should clone more
      for (let cloneIndex = prevCloneCount; cloneIndex < cloneCount; cloneIndex++) {
        const clones = panels.map(origPanel => origPanel.clone(cloneIndex));
        const fragment = document.createDocumentFragment();
        clones.forEach(panel => fragment.appendChild(panel.getElement()));

        this.cameraElement.appendChild(fragment);
        this.visiblePanels.push(...clones.filter(clone => Boolean(clone)));
        panelManager.insertClones(cloneIndex, 0, clones);
      }
    } else if (cloneCount < prevCloneCount) {
      // should remove some
      panelManager.removeClonesAfter(cloneCount);
    }
  }

  private moveToDefaultPanel(): void {
    const state = this.state;
    const panelManager = this.panelManager;
    const options = this.options;
    const indexRange = this.panelManager.getRange();

    const defaultIndex = clamp(options.defaultIndex, indexRange.min, indexRange.max);
    const defaultPanel = panelManager.get(defaultIndex);

    let defaultPosition = 0;
    if (defaultPanel) {
      defaultPosition = defaultPanel.getAnchorPosition() - state.relativeHangerPosition;
      defaultPosition = this.canSetBoundMode()
        ? clamp(defaultPosition, state.scrollArea.prev, state.scrollArea.next)
        : defaultPosition;
    }

    this.moveCamera(defaultPosition);
    this.axes.setTo({ flick: defaultPosition }, 0);
  }

  private updateSize(): void {
    const state = this.state;
    const options = this.options;
    const panels = this.panelManager.originalPanels()
      .filter(panel => Boolean(panel));
    const bbox = this.updateBbox();

    const prevSize = state.size;
    // Update size & hanger position
    state.size = options.horizontal
      ? bbox.width
      : bbox.height;

    if (prevSize !== state.size) {
      state.relativeHangerPosition = parseArithmeticExpression(options.hanger, state.size);
      state.infiniteThreshold = parseArithmeticExpression(options.infiniteThreshold, state.size);
    }

    if (panels.length <= 0) {
      return;
    }

    this.resizePanels(panels);
  }

  private updateOriginalPanelPositions(): void {
    const gap = this.options.gap;
    const panelManager = this.panelManager;

    const firstPanel = panelManager.firstPanel();
    const panels = panelManager.originalPanels();

    if (!firstPanel) {
      return;
    }

    const currentPanel = this.currentPanel!;
    const nearestPanel = this.nearestPanel;
    const currentState = this.stateMachine.getState();
    const scrollArea = this.state.scrollArea;

    // Update panel position && fit to wrapper
    let nextPanelPos = firstPanel.getPosition();
    let maintainingPanel: Panel = firstPanel;
    if (nearestPanel) {
      // We should maintain nearestPanel's position
      const looped = !isBetween(currentState.lastPosition + currentState.delta, scrollArea.prev, scrollArea.next);

      maintainingPanel = looped
        ? currentPanel
        : nearestPanel;
    } else if (firstPanel.getIndex() > 0) {
      maintainingPanel = currentPanel;
    }

    const panelsBeforeMaintainPanel = panels.slice(0, maintainingPanel.getIndex() + (maintainingPanel.getCloneIndex() + 1) * panels.length);
    const accumulatedSize = panelsBeforeMaintainPanel.reduce((total, panel) => {
      return total + panel.getSize() + gap;
    }, 0);

    nextPanelPos = maintainingPanel.getPosition() - accumulatedSize;

    panels.forEach(panel => {
      const newPosition = nextPanelPos;
      const panelSize = panel.getSize();

      panel.setPosition(newPosition);
      nextPanelPos += panelSize + gap;
    });

    if (!this.options.renderOnlyVisible) {
      panels.forEach(panel => panel.setPositionCSS());
    }
  }

  private updateClonedPanelPositions(): void {
    const state = this.state;
    const options = this.options;
    const panelManager = this.panelManager;
    const clonedPanels = panelManager.clonedPanels()
      .reduce((allClones, clones) => [...allClones, ...clones], [])
      .filter(panel => Boolean(panel));

    const scrollArea = state.scrollArea;

    const firstPanel = panelManager.firstPanel();
    const lastPanel = panelManager.lastPanel()!;

    if (!firstPanel) {
      return;
    }

    const sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition() + options.gap;

    // Locate all cloned panels linearly first
    for (const panel of clonedPanels) {
      const origPanel = panel.getOriginalPanel();
      const cloneIndex = panel.getCloneIndex();
      const cloneBasePos = sumOriginalPanelSize * (cloneIndex + 1);
      const clonedPanelPos = cloneBasePos + origPanel.getPosition();

      panel.setPosition(clonedPanelPos);
    }

    let lastReplacePosition = firstPanel.getPosition();
    // reverse() pollutes original array, so copy it with concat()
    for (const panel of clonedPanels.concat().reverse()) {
      const panelSize = panel.getSize();
      const replacePosition = lastReplacePosition - panelSize - options.gap;

      if (replacePosition + panelSize <= scrollArea.prev) {
        // Replace is not meaningful, as it won't be seen in current scroll area
        break;
      }

      panel.setPosition(replacePosition);
      lastReplacePosition = replacePosition;
    }

    if (!this.options.renderOnlyVisible) {
      clonedPanels.forEach(panel => {
        panel.setPositionCSS();
      });
    }
  }

  private updateVisiblePanelPositions(): void {
    if (this.options.renderOnlyVisible) {
      this.visiblePanels.forEach(panel => {
        panel.setPositionCSS(this.state.positionOffset);
      });
    }
  }

  private updateScrollArea(): void {
    const state = this.state;
    const panelManager = this.panelManager;
    const options = this.options;
    const axes = this.axes;

    // Set viewport scrollable area
    const firstPanel = panelManager.firstPanel();
    const lastPanel = panelManager.lastPanel() as Panel;
    const relativeHangerPosition = state.relativeHangerPosition;

    if (!firstPanel) {
      state.scrollArea = {
        prev: 0,
        next: 0,
      };
    } else if (this.canSetBoundMode()) {
      const sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition();

      if (sumOriginalPanelSize >= state.size) {
        state.scrollArea = {
          prev: firstPanel.getPosition(),
          next: lastPanel.getPosition() + lastPanel.getSize() - state.size,
        };
      } else {
        // Find anchor position of set of the combined panels
        const relAnchorPosOfCombined = parseArithmeticExpression(options.anchor, sumOriginalPanelSize);
        const anchorPos = firstPanel.getPosition() + clamp(
          relAnchorPosOfCombined,
          sumOriginalPanelSize - (state.size - relativeHangerPosition),
          relativeHangerPosition,
        );

        state.scrollArea = {
          prev: anchorPos - relativeHangerPosition,
          next: anchorPos - relativeHangerPosition,
        };
      }
    } else if (options.circular) {
      const sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition() + options.gap;

      // Maximum scroll extends to first clone sequence's first panel
      state.scrollArea = {
        prev: firstPanel.getAnchorPosition() - relativeHangerPosition,
        next: sumOriginalPanelSize + firstPanel.getAnchorPosition() - relativeHangerPosition,
      };
    } else {
      state.scrollArea = {
        prev: firstPanel.getAnchorPosition() - relativeHangerPosition,
        next: lastPanel.getAnchorPosition() - relativeHangerPosition,
      };
    }

    const viewportSize = state.size;
    const bounce = options.bounce;

    let parsedBounce: number[];
    if (isArray(bounce)) {
      parsedBounce = (bounce as string[]).map(val => parseArithmeticExpression(val, viewportSize, DEFAULT_OPTIONS.bounce as number));
    } else {
      const parsedVal = parseArithmeticExpression(bounce as number | string, viewportSize, DEFAULT_OPTIONS.bounce as number);
      parsedBounce = [parsedVal, parsedVal];
    }

    // Update axes range and bounce
    const flick = axes.axis.flick;
    flick.range = [state.scrollArea.prev, state.scrollArea.next];
    flick.bounce = parsedBounce;
  }

  private checkNeedPanel(axesEvent?: any): void {
    const state = this.state;
    const options = this.options;
    const panelManager = this.panelManager;
    const currentPanel = this.currentPanel;
    const nearestPanel = this.nearestPanel;
    const currentState = this.stateMachine.getState();

    if (!options.infinite) {
      return;
    }

    const gap = options.gap;
    const infiniteThreshold = state.infiniteThreshold;
    const maxLastIndex = panelManager.getLastIndex();

    if (maxLastIndex < 0) {
      return;
    }

    if (!currentPanel || !nearestPanel) {
      // There're no panels
      this.triggerNeedPanel({
        axesEvent,
        siblingPanel: null,
        direction: null,
        indexRange: {
          min: 0,
          max: maxLastIndex,
          length: maxLastIndex + 1,
        },
      });
      return;
    }

    const originalNearestPosition = nearestPanel.getPosition();

    // Check next direction
    let checkingPanel: Panel | null = !currentState.holding && !currentState.playing
      ? currentPanel
      : nearestPanel;

    while (checkingPanel) {
      const currentIndex = checkingPanel.getIndex();
      const nextSibling = checkingPanel.nextSibling;
      const lastPanel = panelManager.lastPanel()!;
      const atLastPanel = currentIndex === lastPanel.getIndex();
      const nextIndex = !atLastPanel && nextSibling
        ? nextSibling.getIndex()
        : maxLastIndex + 1;
      const currentNearestPosition = nearestPanel.getPosition();
      const panelRight = checkingPanel.getPosition() + checkingPanel.getSize() - (currentNearestPosition - originalNearestPosition);
      const cameraNext = state.position + state.size;

      // There're empty panels between
      const emptyPanelExistsBetween = (nextIndex - currentIndex > 1);
      // Expected prev panel's left position is smaller than camera position
      const overThreshold = panelRight + gap - infiniteThreshold <= cameraNext;

      if (emptyPanelExistsBetween && overThreshold) {
        this.triggerNeedPanel({
          axesEvent,
          siblingPanel: checkingPanel,
          direction: DIRECTION.NEXT,
          indexRange: {
            min: currentIndex + 1,
            max: nextIndex - 1,
            length: nextIndex - currentIndex - 1,
          },
        });
      }

      // Trigger needPanel in circular & at max panel index
      if (options.circular && currentIndex === maxLastIndex && overThreshold) {
        const firstPanel = panelManager.firstPanel();
        const firstIndex = firstPanel
          ? firstPanel.getIndex()
          : -1;

        if (firstIndex > 0) {
          this.triggerNeedPanel({
            axesEvent,
            siblingPanel: checkingPanel,
            direction: DIRECTION.NEXT,
            indexRange: {
              min: 0,
              max: firstIndex - 1,
              length: firstIndex,
            },
          });
        }
      }

      // Check whether panels are changed
      const lastPanelAfterNeed = panelManager.lastPanel()!;
      const atLastPanelAfterNeed = lastPanelAfterNeed && currentIndex === lastPanelAfterNeed.getIndex();

      if (atLastPanelAfterNeed || !overThreshold) {
        break;
      }

      checkingPanel = checkingPanel.nextSibling;
    }

    // Check prev direction
    checkingPanel = nearestPanel;
    while (checkingPanel) {
      const cameraPrev = state.position;
      const checkingIndex = checkingPanel.getIndex();
      const prevSibling = checkingPanel.prevSibling;
      const firstPanel = panelManager.firstPanel()!;
      const atFirstPanel = checkingIndex === firstPanel.getIndex();
      const prevIndex = !atFirstPanel && prevSibling
        ? prevSibling.getIndex()
        : -1;
      const currentNearestPosition = nearestPanel.getPosition();
      const panelLeft = checkingPanel.getPosition() - (currentNearestPosition - originalNearestPosition);

      // There're empty panels between
      const emptyPanelExistsBetween = checkingIndex - prevIndex > 1;
      // Expected prev panel's right position is smaller than camera position
      const overThreshold = panelLeft - gap + infiniteThreshold >= cameraPrev;
      if (emptyPanelExistsBetween && overThreshold) {
        this.triggerNeedPanel({
          axesEvent,
          siblingPanel: checkingPanel,
          direction: DIRECTION.PREV,
          indexRange: {
            min: prevIndex + 1,
            max: checkingIndex - 1,
            length: checkingIndex - prevIndex - 1,
          },
        });
      }

      // Trigger needPanel in circular & at panel 0
      if (options.circular && checkingIndex === 0 && overThreshold) {
        const lastPanel = panelManager.lastPanel();

        if (lastPanel && lastPanel.getIndex() < maxLastIndex) {
          const lastIndex = lastPanel.getIndex();

          this.triggerNeedPanel({
            axesEvent,
            siblingPanel: checkingPanel,
            direction: DIRECTION.PREV,
            indexRange: {
              min: lastIndex + 1,
              max: maxLastIndex,
              length: maxLastIndex - lastIndex,
            },
          });
        }
      }

      // Check whether panels were changed
      const firstPanelAfterNeed = panelManager.firstPanel();
      const atFirstPanelAfterNeed = firstPanelAfterNeed && checkingIndex === firstPanelAfterNeed.getIndex();

      // Looped in circular mode
      if (atFirstPanelAfterNeed || !overThreshold) {
        break;
      }

      checkingPanel = checkingPanel.prevSibling;
    }
  }

  private triggerNeedPanel(params: {
    axesEvent: any;
    siblingPanel: Panel | null,
    direction: FlickingEvent["direction"];
    indexRange: NeedPanelEvent["range"];
  }): void {
    const { axesEvent, siblingPanel, direction, indexRange } = params;
    const options = this.options;
    const checkedIndexes = this.state.checkedIndexes;
    const alreadyTriggered = checkedIndexes.some(([min, max]) => min === indexRange.min || max === indexRange.max);
    const hasHandler = this.flicking.hasOn(EVENTS.NEED_PANEL);

    if (alreadyTriggered || !hasHandler) {
      return;
    }

    // Should done before triggering event, as we can directly add panels by event callback
    checkedIndexes.push([indexRange.min, indexRange.max]);

    const index = siblingPanel
      ? siblingPanel.getIndex()
      : 0;
    const isTrusted = axesEvent
      ? axesEvent.isTrusted
      : false;

    this.triggerEvent(
      EVENTS.NEED_PANEL,
      axesEvent,
      isTrusted,
      {
        index,
        panel: siblingPanel,
        direction,
        range: indexRange,
        fill: (element: ElementLike | ElementLike[]) => {
          const panelManager = this.panelManager;
          if (!siblingPanel) {
            return this.insert(panelManager.getRange().max + 1, element);
          }

          const parsedElements = parseElement(element);
          // Slice elements to fit size equal to empty spaces
          const elements = direction === DIRECTION.NEXT
            ? parsedElements.slice(0, indexRange.length)
            : parsedElements.slice(-indexRange.length);

          if (direction === DIRECTION.NEXT) {
            if (options.circular && index === panelManager.getLastIndex()) {
              // needPanel event is triggered on last index, insert at index 0
              return this.insert(0, elements);
            } else {
              return siblingPanel.insertAfter(elements);
            }
          } else if (direction === DIRECTION.PREV) {
            if (options.circular && index === 0) {
              // needPanel event is triggered on first index(0), insert at the last index
              return this.insert(indexRange.max - elements.length + 1, elements);
            } else {
              return siblingPanel.insertBefore(elements);
            }
          } else {
            // direction is null when there're no panels exist
            return this.insert(0, elements);
          }
        },
      } as Partial<NeedPanelEvent>,
    );
  }

  private updateVisiblePanels() {
    const state = this.state;
    const options = this.options;
    const panelManager = this.panelManager;
    const currentState = this.stateMachine.getState();
    const cameraElement = this.cameraElement;
    const { renderExternal, renderOnlyVisible } = options;
    if (!renderOnlyVisible) {
      return;
    }

    if (!this.nearestPanel) {
      this.visiblePanels = [];
      while (cameraElement.firstChild) {
        cameraElement.removeChild(cameraElement.firstChild);
      }
      return;
    }

    const prevVisiblePanels = this.visiblePanels;
    const newVisiblePanels = this.calcVisiblePanels();

    const { addedPanels, removedPanels } = this.checkVisiblePanelChange(prevVisiblePanels, newVisiblePanels);

    if (addedPanels.length <= 0 && removedPanels.length <= 0) {
      // Visible panels not changed
      return;
    }

    if (currentState.holding) {
      newVisiblePanels.push(...removedPanels);
    } else {
      const firstVisiblePanelPos = newVisiblePanels[0].getPosition();
      state.positionOffset = firstVisiblePanelPos;
    }

    newVisiblePanels.forEach(panel => {
      panel.setPositionCSS(state.positionOffset);
    });

    if (!renderExternal) {
      if (!currentState.holding) {
        removedPanels.forEach(panel => {
          const panelElement = panel.getElement();
          panelElement.parentNode && cameraElement.removeChild(panelElement);
        });
      }

      const fragment = document.createDocumentFragment();
      addedPanels.forEach(panel => {
        fragment.appendChild(panel.getElement());
      });

      cameraElement.appendChild(fragment);
    }

    const firstVisiblePanel = newVisiblePanels[0];
    const lastVisiblePanel = newVisiblePanels[newVisiblePanels.length - 1];
    const getAbsIndex = (panel: Panel) => panel.getIndex() + (panel.getCloneIndex() + 1) * panelManager.getPanelCount();

    const newVisibleRange = {
      min: getAbsIndex(firstVisiblePanel),
      max: getAbsIndex(lastVisiblePanel),
    };
    this.visiblePanels = newVisiblePanels;
    this.flicking.trigger(EVENTS.VISIBLE_CHANGE, {
      type: EVENTS.VISIBLE_CHANGE,
      range: newVisibleRange,
    });
  }

  private checkVisiblePanelChange(prevVisiblePanels: Panel[], newVisiblePanels: Panel[]) {
    const prevRefCount = prevVisiblePanels.map(() => 0);
    const newRefCount = newVisiblePanels.map(() => 0);

    prevVisiblePanels.forEach((prevPanel, prevIndex) => {
      newVisiblePanels.forEach((newPanel, newIndex) => {
        if (prevPanel === newPanel) {
          prevRefCount[prevIndex]++;
          newRefCount[newIndex]++;
        }
      });
    });

    const removedPanels = prevRefCount.reduce((removed: Panel[], count, index) => {
      return count === 0
        ? [...removed, prevVisiblePanels[index]]
        : removed;
    }, []);
    const addedPanels = newRefCount.reduce((added: Panel[], count, index) => {
      return count === 0
        ? [...added, newVisiblePanels[index]]
        : added;
    }, []);

    return { removedPanels, addedPanels };
  }

  private resizePanels(panels: Panel[]): void {
    const options = this.options;
    const panelBboxes = this.panelBboxes;

    if (options.isEqualSize === true) {
      if (!panelBboxes.default) {
        const defaultPanel = panels[0];
        panelBboxes.default = defaultPanel.getBbox();
      }

      const defaultBbox = panelBboxes.default;

      panels.forEach(panel => {
        panel.resize(defaultBbox);
      });
      return;
    } else if (options.isEqualSize) {
      const equalSizeClasses = options.isEqualSize;

      panels.forEach(panel => {
        const overlappedClass = panel.getOverlappedClass(equalSizeClasses);
        if (overlappedClass) {
          panel.resize(panelBboxes[overlappedClass]);
          panelBboxes[overlappedClass] = panel.getBbox();
        } else {
          panel.resize();
        }
      });
      return;
    }
    panels.forEach(panel => {
      panel.resize();
    });
  }

  private createPanInput() {
    const options = this.options;

    this.panInput = new PanInput(this.viewportElement, {
      inputType: options.inputType,
      thresholdAngle: options.thresholdAngle,
      iOSEdgeSwipeThreshold: options.iOSEdgeSwipeThreshold,
      scale: options.horizontal ? [-1, 0] : [0, -1],
      releaseOnScroll: true,
    });

    this.axes.connect(options.horizontal ? ["flick", ""] : ["", "flick"], this.panInput);
  }
}

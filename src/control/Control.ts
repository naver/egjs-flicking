/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Panel from "../core/Panel";
import { EVENTS } from "../consts";
import { MoveTypeStringOption, MoveTypeContext, DestinationInfo } from "../types";

abstract class Control {
  protected readonly abstract _type: string;

  public is(type: MoveTypeStringOption): boolean {
    return type === this._type;
  }

  public findRestorePanel(ctx: MoveTypeContext): DestinationInfo {
    const viewport = ctx.viewport;
    const options = viewport.options;

    const panel = options.circular
      ? this._findRestorePanelInCircularMode(ctx)
      : viewport.getCurrentPanel() as Panel;

    return {
      panel,
      destPos: viewport.findEstimatedPosition(panel),
      duration: options.duration,
      eventType: EVENTS.RESTORE
    };
  }

  public findPanelWhenInterrupted(ctx: MoveTypeContext): DestinationInfo {
    const { state, viewport } = ctx;
    const targetPanel = state.targetPanel as Panel;

    return {
      panel: targetPanel,
      destPos: viewport.findEstimatedPosition(targetPanel),
      duration: viewport.options.duration,
      eventType: ""
    };
  }

  // Calculate minimum distance to "change" panel
  protected _calcBrinkOfChange(ctx: MoveTypeContext): number {
    const { viewport, isNextDirection } = ctx;

    const options = viewport.options;
    const currentPanel = viewport.getCurrentPanel() as Panel;
    const halfGap = options.gap / 2;

    const relativeAnchorPosition = currentPanel.getRelativeAnchorPosition();

    // Minimum distance needed to decide prev/next panel as nearest
    /*
     * |  Prev  |     Next     |
     * |--------|--------------|
     * [][      |<-Anchor    ][] <- Panel + Half-Gap
     */
    let minimumDistanceToChange = isNextDirection
      ? currentPanel.getSize() - relativeAnchorPosition + halfGap
      : relativeAnchorPosition + halfGap;

    minimumDistanceToChange = Math.max(minimumDistanceToChange, options.threshold);

    return minimumDistanceToChange;
  }

  private _findRestorePanelInCircularMode(ctx: MoveTypeContext): Panel {
    const viewport = ctx.viewport;
    const originalPanel = (viewport.getCurrentPanel() as Panel).getOriginalPanel();
    const hangerPosition = viewport.getHangerPosition();

    const firstClonedPanel = originalPanel.getIdenticalPanels()[1];
    const lapped = Math.abs(originalPanel.getAnchorPosition() - hangerPosition)
      > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);

    return (!ctx.isNextDirection && lapped)
      ? firstClonedPanel
      : originalPanel;
  }

  public abstract findTargetPanel(ctx: MoveTypeContext): DestinationInfo;
}

export default Control;

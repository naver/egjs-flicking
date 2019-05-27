/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { MoveTypeStringOption, MoveTypeContext, DestinationInfo } from "../types";
import Panel from "../components/Panel";
import { EVENTS } from "../consts";

abstract class MoveType {
  protected readonly abstract type: string;

  public abstract findTargetPanel(ctx: MoveTypeContext): DestinationInfo;

  public is(type: MoveTypeStringOption): boolean {
    return type === this.type;
  }

  public findRestorePanel(ctx: MoveTypeContext): DestinationInfo {
    const viewport = ctx.viewport;
    const options = viewport.options;

    const panel = options.circular
      ? this.findRestorePanelInCircularMode(ctx)
      : viewport.getCurrentPanel()!;

    return {
      panel,
      destPos: viewport.findEstimatedPosition(panel),
      duration: options.duration,
      eventType: EVENTS.RESTORE,
    };
  }

  public findPanelWhenInterrupted(ctx: MoveTypeContext): DestinationInfo {
    const { state, viewport } = ctx;
    const targetPanel = state.targetPanel!;

    return {
      panel: targetPanel,
      destPos: viewport.findEstimatedPosition(targetPanel),
      duration: viewport.options.duration,
      eventType: "",
    };
  }

  // Calculate minimum distance to "change" panel
  protected calcBrinkOfChange(ctx: MoveTypeContext): number {
    const { viewport, isNextDirection } = ctx;

    const options = viewport.options;
    const currentPanel = viewport.getCurrentPanel()!;
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

  private findRestorePanelInCircularMode(ctx: MoveTypeContext): Panel {
    const viewport = ctx.viewport;
    const originalPanel = viewport.getCurrentPanel()!.getOriginalPanel();
    const hangerPosition = viewport.getHangerPosition();

    const firstClonedPanel = originalPanel.getIdenticalPanels()[1];
    const lapped = Math.abs(originalPanel.getAnchorPosition() - hangerPosition)
      > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);

    return (!ctx.isNextDirection && lapped)
      ? firstClonedPanel
      : originalPanel;
  }
}

export default MoveType;

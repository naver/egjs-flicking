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

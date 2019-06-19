import { MoveTypeStringOption, MoveTypeContext, DestinationInfo } from "../types";
declare abstract class MoveType {
    protected readonly abstract type: string;
    abstract findTargetPanel(ctx: MoveTypeContext): DestinationInfo;
    is(type: MoveTypeStringOption): boolean;
    findRestorePanel(ctx: MoveTypeContext): DestinationInfo;
    findPanelWhenInterrupted(ctx: MoveTypeContext): DestinationInfo;
    protected calcBrinkOfChange(ctx: MoveTypeContext): number;
    private findRestorePanelInCircularMode(ctx);
}
export default MoveType;

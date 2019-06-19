import Snap from "./Snap";
import { MoveTypeContext, DestinationInfo } from "../types";
declare class FreeScroll extends Snap {
    protected readonly type: string;
    constructor();
    findTargetPanel(ctx: MoveTypeContext): DestinationInfo;
    findRestorePanel(ctx: MoveTypeContext): DestinationInfo;
    findPanelWhenInterrupted(ctx: MoveTypeContext): DestinationInfo;
    protected calcBrinkOfChange(ctx: MoveTypeContext): number;
}
export default FreeScroll;

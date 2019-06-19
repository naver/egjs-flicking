import MoveType from "./MoveType";
import { MoveTypeContext, DestinationInfo } from "../types";
declare class Snap extends MoveType {
    protected readonly type: string;
    protected count: number;
    constructor(count: number);
    findTargetPanel(ctx: MoveTypeContext): DestinationInfo;
    protected findSnappedPanel(ctx: MoveTypeContext): DestinationInfo;
    private findAdjacentPanel(ctx);
}
export default Snap;

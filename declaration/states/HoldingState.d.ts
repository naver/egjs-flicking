import State from "./State";
import { FlickingContext } from "../types";
declare class HoldingState extends State {
    readonly type: 1;
    readonly holding: boolean;
    readonly playing: boolean;
    private releaseEvent;
    onChange(e: any, context: FlickingContext): void;
    onRelease(e: any, context: FlickingContext): void;
    onFinish(e: any, {viewport, triggerEvent, transitTo}: FlickingContext): void;
}
export default HoldingState;

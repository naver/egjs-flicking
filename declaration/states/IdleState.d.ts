import State from "./State";
import { FlickingContext } from "../types";
declare class IdleState extends State {
    readonly type: 0;
    readonly holding: boolean;
    readonly playing: boolean;
    onEnter(): void;
    onHold(e: any, {flicking, viewport, triggerEvent, transitTo}: FlickingContext): void;
    onChange(e: any, context: FlickingContext): void;
}
export default IdleState;

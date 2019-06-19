import State from "./State";
import { FlickingContext } from "../types";
declare class AnimatingState extends State {
    readonly type: 3;
    readonly holding: boolean;
    readonly playing: boolean;
    onHold(e: any, {viewport, triggerEvent, transitTo}: FlickingContext): void;
    onChange(e: any, {moveCamera, transitTo}: FlickingContext): void;
    onFinish(e: any, {flicking, viewport, triggerEvent, transitTo}: FlickingContext): void;
}
export default AnimatingState;

import State from "./State";
import { FlickingContext } from "../types";
declare class DisabledState extends State {
    readonly type: 4;
    readonly holding: boolean;
    readonly playing: boolean;
    onAnimationEnd(e: any, {transitTo}: FlickingContext): void;
    onChange(e: any, {viewport, transitTo}: FlickingContext): void;
    onRelease(e: any, {transitTo}: FlickingContext): void;
}
export default DisabledState;

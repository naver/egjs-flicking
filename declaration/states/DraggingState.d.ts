import State from "./State";
import { FlickingContext } from "../types";
declare class DraggingState extends State {
    readonly type: 2;
    readonly holding: boolean;
    readonly playing: boolean;
    onChange(e: any, {moveCamera, transitTo}: FlickingContext): void;
    onRelease(e: any, context: FlickingContext): void;
}
export default DraggingState;

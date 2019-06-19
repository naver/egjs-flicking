import Panel from "../components/Panel";
import { ValueOf, Direction, StateType, FlickingContext } from "../types";
declare abstract class State {
    delta: number;
    direction: ValueOf<Direction> | null;
    targetPanel: Panel | null;
    lastPosition: number;
    readonly abstract type: ValueOf<StateType>;
    readonly abstract holding: boolean;
    readonly abstract playing: boolean;
    onEnter(prevState: State): void;
    onExit(nextState: State): void;
    onHold(e: any, context: FlickingContext): void;
    onChange(e: any, context: FlickingContext): void;
    onRelease(e: any, context: FlickingContext): void;
    onAnimationEnd(e: any, context: FlickingContext): void;
    onFinish(e: any, context: FlickingContext): void;
}
export default State;

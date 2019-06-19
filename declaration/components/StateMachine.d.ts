import State from "../states/State";
import { AxesEventType, ValueOf, FlickingContext } from "../types";
declare class StateMachine {
    private state;
    fire(eventType: ValueOf<AxesEventType>, e: any, context: FlickingContext): void;
    getState(): State;
    transitTo: (nextStateType: 0 | 2 | 4 | 3 | 1) => State;
}
export default StateMachine;

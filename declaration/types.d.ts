import Flicking from "./Flicking";
import Viewport from "./components/Viewport";
import StateMachine from "./components/StateMachine";
import Panel from "./components/Panel";
import Component from "@egjs/component";
import State from "./states/State";
export declare type ValueOf<T> = T[keyof T];
export declare type ElementLike = string | HTMLElement;
export interface FlickingOptions {
    classPrefix: string;
    deceleration: number;
    horizontal: boolean;
    circular: boolean;
    infinite: boolean;
    infiniteThreshold: number | string;
    lastIndex: number;
    threshold: number;
    duration: number;
    panelEffect: (x: number) => number;
    defaultIndex: number;
    inputType: string[];
    thresholdAngle: number;
    bounce: number | string | [number | string, number | string];
    autoResize: boolean;
    adaptive: boolean;
    zIndex: number;
    bound: boolean;
    overflow: boolean;
    hanger: number | string;
    anchor: number | string;
    gap: number;
    moveType: MoveTypeOption;
    renderExternal: boolean;
}
export declare type MoveTypeObjectOption = MoveTypeSnapOption | MoveTypeFreeScrollOption;
export declare type MoveTypeStringOption = MoveTypeObjectOption["type"];
export interface MoveTypeContext {
    viewport: Viewport;
    axesEvent: {
        delta: {
            flick: number;
        };
        depaPos: {
            flick: number;
        };
        destPos: {
            flick: number;
        };
        duration: number;
    };
    state: State;
    swipeDistance: number;
    isNextDirection: boolean;
}
export interface DestinationInfo {
    panel: Panel;
    destPos: number;
    duration: number;
    eventType: EventType["CHANGE"] | EventType["RESTORE"] | "";
}
export declare type MoveTypeOption = MoveTypeStringOption | MoveTypeObjectOption;
export interface MoveTypeSnapOption {
    type: "snap";
    count: number;
}
export interface MoveTypeFreeScrollOption {
    type: "freeScroll";
}
export interface FlickingStatus {
    index: number;
    panels: Array<{
        html: string;
        index: number;
    }>;
    position: number;
}
export interface OriginalStyle {
    className: string | null;
    style: string | null;
}
export interface FlickingPanel {
    getElement: () => HTMLElement;
    getIndex: () => number;
    getPosition: () => number;
    getAnchorPosition: () => number;
    getSize: () => number;
    getProgress: () => number;
    getOutsetProgress: () => number;
    getVisibleRatio: () => number;
    focus: (duration?: number) => void;
    update: (updateFunction: (element: HTMLElement) => any) => void;
    prev: () => FlickingPanel | null;
    next: () => FlickingPanel | null;
    insertBefore: (element: ElementLike | ElementLike[]) => FlickingPanel[];
    insertAfter: (element: ElementLike | ElementLike[]) => FlickingPanel[];
    remove: () => void;
}
export interface Direction {
    readonly PREV: "PREV";
    readonly NEXT: "NEXT";
}
export interface EventType {
    readonly HOLD_START: "holdStart";
    readonly HOLD_END: "holdEnd";
    readonly MOVE_START: "moveStart";
    readonly MOVE: "move";
    readonly MOVE_END: "moveEnd";
    readonly CHANGE: "change";
    readonly RESTORE: "restore";
    readonly SELECT: "select";
    readonly NEED_PANEL: "needPanel";
}
export interface FlickingEvent {
    type: string;
    index: number;
    panel: FlickingPanel | null;
    progress: number;
    isTrusted: boolean;
    holding: boolean;
    stop: () => void;
    direction: ValueOf<Direction> | null;
    axesEvent?: any;
    currentTarget: Flicking;
}
export interface ChangeEvent {
    type: string;
    index: number;
    panel: FlickingPanel | null;
    progress: number;
    isTrusted: boolean;
    holding: boolean;
    stop: () => void;
    direction: ValueOf<Direction> | null;
    axesEvent?: any;
    currentTarget: Flicking;
}
export interface SelectEvent {
    type: string;
    index: number;
    panel: FlickingPanel | null;
    progress: number;
    isTrusted: boolean;
    holding: boolean;
    direction: ValueOf<Direction> | null;
    axesEvent?: any;
    currentTarget: Flicking;
}
export interface NeedPanelEvent {
    type: string;
    index: number;
    panel: FlickingPanel | null;
    progress: number;
    isTrusted: boolean;
    holding: boolean;
    direction: ValueOf<Direction> | null;
    axesEvent?: any;
    currentTarget: Flicking;
    range: {
        min: number;
        max: number;
        length: number;
    };
}
export interface StateType {
    readonly IDLE: 0;
    readonly HOLDING: 1;
    readonly DRAGGING: 2;
    readonly ANIMATING: 3;
    readonly DISABLED: 4;
}
export interface AxesEventType {
    readonly HOLD: "hold";
    readonly CHANGE: "change";
    readonly RELEASE: "release";
    readonly ANIMATION_END: "animationEnd";
    readonly FINISH: "finish";
}
export interface TriggerCallback {
    onSuccess(callback: () => any): TriggerCallback;
    onStopped(callback: () => any): TriggerCallback;
}
export interface FlickingContext {
    flicking: Flicking;
    viewport: Viewport;
    transitTo: StateMachine["transitTo"];
    triggerEvent: Flicking["triggerEvent"];
    moveCamera: Flicking["moveCamera"];
    stopCamera: Viewport["stopCamera"];
}
export interface Plugin {
    init(flicking: Flicking): void;
    update?(flicking: Flicking): void;
    destroy(flicking: Flicking): void;
}
export declare type ExcludeKeys = keyof Component | "replace" | "append" | "remove" | "prepend" | "sync" | "getCloneCount";
export declare type FlickingMethodsKeys = Exclude<keyof Flicking, ExcludeKeys>;
export declare type FlickingMethods = Pick<Flicking, FlickingMethodsKeys>;
export interface DestroyOption {
    preserveUI: boolean;
}

import { FlickingOptions, EventType, Direction, AxesEventType, StateType, MoveTypeSnapOption, MoveTypeFreeScrollOption, FlickingMethodsKeys } from "./types";
export declare const MOVE_TYPE: {
    SNAP: "snap";
    FREE_SCROLL: "freeScroll";
};
export declare const DEFAULT_MOVE_TYPE_OPTIONS: {
    snap: MoveTypeSnapOption;
    freeScroll: MoveTypeFreeScrollOption;
};
export declare const DEFAULT_OPTIONS: Readonly<FlickingOptions>;
export declare const DEFAULT_VIEWPORT_CSS: {
    position: string;
    zIndex: number;
    width: string;
    height: string;
    overflow: string;
};
export declare const DEFAULT_CAMERA_CSS: {
    width: string;
    height: string;
    willChange: string;
};
export declare const DEFAULT_PANEL_CSS: {
    position: string;
};
export declare const EVENTS: EventType;
export declare const AXES_EVENTS: AxesEventType;
export declare const STATE_TYPE: StateType;
export declare const DIRECTION: Direction;
export declare const FLICKING_METHODS: {
    [key in FlickingMethodsKeys]: true;
};
export declare const TRANSFORM: {
    name: string;
    has3d: boolean;
};

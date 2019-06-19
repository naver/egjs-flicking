import { ElementLike, OriginalStyle } from "./types";
export declare function merge(target: object, ...srcs: object[]): object;
export declare function parseElement(element: ElementLike | ElementLike[]): HTMLElement[];
export declare let checkTranslateSupport: () => {
    name: string;
    has3d: boolean;
};
export declare function isString(value: any): value is string;
export declare function classList(element: HTMLElement): string[];
export declare function addClass(element: HTMLElement, className: string): void;
export declare function applyCSS(element: HTMLElement, cssObj: object): void;
export declare function clamp(val: number, min: number, max: number): number;
export declare function isBetween(val: number, min: number, max: number): boolean;
export interface ArrayLike<T> {
    length: number;
    [index: number]: T;
}
export declare function toArray<T>(iterable: ArrayLike<T>): T[];
export declare function isArray(arr: any): boolean;
export declare function parseArithmeticExpression(cssValue: number | string, base: number, defaultVal?: number): number;
export declare function getProgress(pos: number, range: number[]): number;
export declare function findIndex<T>(iterable: T[], callback: (el: T) => boolean): number;
export declare function counter(max: number): number[];
export declare function circulate(value: number, min: number, max: number, indexed: boolean): number;
export declare function hasClass(element: HTMLElement | null, className: string): boolean;
export declare function restoreStyle(element: HTMLElement, originalStyle: OriginalStyle): void;
export declare function withFlickingMethods(prototype: any, flickingName: string): void;

import { HTMLAttributes } from 'react';
import * as React from 'react';
export interface IFlickingOptions {
    hwAccelerable?: boolean;
    prefix?: string;
    deceleration?: number;
    horizontal?: boolean;
    circular?: boolean;
    previewPadding?: number | string | Array<number | string>;
    bounce?: number | number[];
    threshold?: number;
    duration?: number;
    panelEffect?: (x: number) => number;
    defaultIndex?: number;
    inputType?: string[];
    thresholdAngle?: number;
    adaptiveHeight?: boolean;
    zIndex?: number;
    useTranslate?: number;
}
export declare const DIRECTION_LEFT: number;
export declare const DIRECTION_RIGHT: number;
export declare const DIRECTION_TOP: number;
export declare const DIRECTION_BOTTOM: number;
export interface IFlickingProps extends IFlickingOptions, HTMLAttributes<HTMLElement> {
    onFlick?: (e?: any) => void;
    onFlickEnd?: (e?: any) => void;
    onBeforeFlickStart?: (e?: any) => void;
    onBeforeRestore?: (e?: any) => void;
    onRestore?: (e?: any) => void;
    tag?: string;
}
export default class Flicking extends React.Component<IFlickingProps> {
    static defaultProps: IFlickingProps;
    private flicking;
    render(): JSX.Element;
    componentDidUpdate(): void;
    componentDidMount(): void;
    moveTo(no: number, duration?: number): this;
    next(duration?: number): this;
    prev(duration?: number): this;
    getAllElements(): HTMLElement[];
    getElement(): HTMLElement;
    getNextElement(): HTMLElement;
    getPrevElement(): HTMLElement;
    getIndex(physical: boolean): number;
    getNextIndex(physical: boolean): number;
    getPrevIndex(physical: boolean): number;
    plugin(plugins: any[]): this;
    resize: () => this;
    componentWillUnmount(): void;
}

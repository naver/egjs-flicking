import NativeFlicking, { FlickingMethods } from '@egjs/flicking';

export type ParametersType<T, R> = T extends (...params: infer U) => any ? (...params: U) => R : never;
export type FlickingType<T> = {
  [key in keyof FlickingMethods]:
    FlickingMethods[key] extends (...params: any[]) => NativeFlicking ?
    ParametersType<FlickingMethods[key], T> : FlickingMethods[key]
};

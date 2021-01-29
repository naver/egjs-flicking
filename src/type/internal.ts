/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
export type ValueOf<T> = T[keyof T];
export type LiteralUnion<T extends U, U = string> = T | (Pick<U, never> & {_?: never});

export interface ArrayLike<T> {
  [index: number]: T;
  length: number;
}

export type Unique<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type MergeObject<T, U> = {
  [K in keyof T & keyof U]: T[K] extends Record<string, unknown>
    ? U[K] extends Record<string, unknown>
      ? Merged<T[K], U[K]>
      : T[K]
    : T[K];
};

export type Merged<From, To> =
  Unique<From, To>
  & Unique<To, From>
  & MergeObject<From, To>;

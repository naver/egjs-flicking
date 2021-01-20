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

/**
 * HTML `string` of single/mutiple HTMLElement, or an instance of `HTMLElement`.
 *
 * @ko 단일/복수의 HTMLElement의 outerHTML에 해당하는 `string`, 혹은 `HTMLElement`의 인스턴스.
 * @typedef
 * @memberof eg.Flicking
 */
export type ElementLike = string | HTMLElement;

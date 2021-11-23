/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../../Flicking";

interface ElementProvider {
  element: HTMLElement;
  rendered: boolean;
  show(flicking: Flicking): void;
  hide(flicking: Flicking): void;
}

export default ElementProvider;

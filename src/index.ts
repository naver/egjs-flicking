/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "./Flicking";
import type { FlickingOptions, FlickingEvents } from "./Flicking";
import type { CrossFlickingOptions } from "./CrossFlicking";

export * from "./CrossFlicking";

export * from "./core";
export * from "./camera";
export * from "./control";
export * from "./renderer";
export * from "./const/external";
export * from "./cfc";
export * from "./utils";

export * from "./type/event";
export * from "./type/external";
export type { FlickingOptions, FlickingEvents, CrossFlickingOptions };

export default Flicking;

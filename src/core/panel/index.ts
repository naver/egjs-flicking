/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel, { PanelOptions } from "./Panel";
import ExternalPanel, { ExternalPanelOptions } from "./ExternalPanel";
import VirtualPanel from "./VirtualPanel";
import ElementProvider from "./provider/ElementProvider";
import ExternalElementProvider from "./provider/ExternalElementProvider";

export {
  Panel,
  ExternalPanel,
  VirtualPanel
};

export type {
  PanelOptions,
  ExternalPanelOptions,
  ElementProvider,
  ExternalElementProvider
};

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { prop } from "vue-class-component";
import {
  FlickingOptions,
  Plugin,
  Status
} from "@egjs/flicking";

class FlickingProps {
  viewportTag = prop<string>({ required: false, default: "div" });
  cameraTag = prop<string>({ required: false, default: "div" });
  hideBeforeInit = prop<boolean>({ required: false, default: false });
  firstPanelSize = prop<string>({ required: false, default: null });
  options = prop<Partial<FlickingOptions>>({ required: false, default: {} });
  plugins = prop<Plugin[]>({ required: false, default: [] });
  status = prop<Status>({ required: false, default: null });
}

export default FlickingProps;

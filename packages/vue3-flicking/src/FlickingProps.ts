/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { PropType } from "vue";
import { FlickingOptions, Plugin, Status } from "@egjs/flicking";

export default {
  viewportTag: {
    type: String,
    default: "div",
    required: false
  },
  cameraTag: {
    type: String,
    default: "div",
    required: false
  },
  cameraClass: {
    type: String,
    default: "",
    required: false
  },
  hideBeforeInit: {
    type: Boolean,
    default: false,
    required: false
  },
  firstPanelSize: {
    type: String,
    required: false
  },
  options: {
    type: Object as unknown as () => Partial<FlickingOptions>,
    default: () => ({}),
    required: false
  },
  plugins: {
    type: Array as PropType<Plugin[]>,
    default: () => ([]),
    required: false
  },
  status: {
    type: Object as PropType<Status>,
    required: false
  }
};

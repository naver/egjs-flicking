import { PropType } from "vue";
import { RecordPropsDefinition } from "vue/types/options";
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
    type: Object as PropType<Partial<FlickingOptions>>,
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
} as RecordPropsDefinition<{
  readonly viewportTag: string;
  readonly cameraTag: string;
  readonly cameraClass: string;
  readonly hideBeforeInit: boolean;
  readonly firstPanelSize: string;
  readonly options: Partial<FlickingOptions>;
  readonly plugins: Plugin[];
  readonly status: Status;
}>;


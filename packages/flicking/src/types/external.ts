import { MOVE_TYPE } from "../constants/values";
import { FreeControlOptions, SnapControlOptions, StrictControlOptions } from "../control";
import Flicking from "../Flicking";

import { ValueOf } from "./internal";

/**
 * HTML `string` of single/mutiple HTMLElement, or an instance of `HTMLElement`
 */
export type ElementLike = string | HTMLElement;

/**
 * Flicking Plugin
 */
export interface Plugin {
  /** Initialize the plugin */
  init(flicking: Flicking): void;
  /** Destroy plugin and detach all events binded */
  destroy(): void;
  /** Update plugin to match current Flicking's status */
  update(flicking: Flicking): void;
}

/**
 * A JSON-safe structural representation of a panel element, captured by {@link Flicking.getStatus}.
 * @remarks
 * {@link Flicking.setStatus} rebuilds panels from this using DOM APIs (`createElement`/`setAttribute`),
 * never by parsing HTML. This preserves the exact node tree — content that is inert on first render
 * (e.g. an `<img>` that exists only as raw text inside `<style>`) stays inert — so it never revives a
 * mutation-XSS payload, yet survives JSON serialization so panels restore correctly after a
 * reload/navigation.
 */
export interface SerializedNode {
  /** Element tag name. Absent for text/comment nodes. */
  tag?: string;
  /** Element namespace URI. Present only for non-HTML elements (e.g. SVG/MathML). */
  ns?: string;
  /** Element attributes as `[name, value]`, or `[name, value, namespaceURI]` for namespaced ones. */
  attrs?: Array<[string, string] | [string, string, string]>;
  /** Child nodes. */
  children?: SerializedNode[];
  /** Text node data. */
  text?: string;
  /** Comment node data. */
  comment?: string;
}

/**
 * Flicking Status returned by {@link Flicking.getStatus}
 */
export interface Status {
  /** An index of the active panel */
  index?: number;
  /** A info to restore camera {@link Camera.position | position} */
  position?: {
    /** An index of the panel camera is located at */
    panel: number;
    /** A progress of the camera position inside the panel */
    progressInPanel: number;
  };
  /** An offset to visible panel's original index. This value is available only when `visiblePanelsOnly` is `true` */
  visibleOffset?: number;
  /** A data array of panels */
  panels: Array<{
    /** An index of the panel */
    index: number;
    /**
     * An `outerHTML` of the panel element.
     * @remarks
     * Informational only. {@link Flicking.setStatus} does **not** parse it to rebuild panels, since an
     * `outerHTML`→`innerHTML` round-trip can revive a mutation-XSS payload that was inert on first
     * render. Panels are rebuilt from {@link node} instead.
     */
    html?: string;
    /**
     * A structural snapshot of the panel element used to rebuild it safely (see {@link SerializedNode}).
     * Present when `includePanelHTML` is `true`; this is what {@link Flicking.setStatus} restores from.
     */
    node?: SerializedNode;
  }>;
}

/* eslint-disable @typescript-eslint/indent */
export type MoveTypeOptions<T extends ValueOf<typeof MOVE_TYPE>> = T extends typeof MOVE_TYPE.SNAP
  ? [T] | [T, Partial<SnapControlOptions>]
  : T extends typeof MOVE_TYPE.FREE_SCROLL
    ? [T] | [T, Partial<FreeControlOptions>]
    : T extends typeof MOVE_TYPE.STRICT
      ? [T] | [T, Partial<StrictControlOptions>]
      : [T];
/* eslint-enable */

/**
 * A current parameters of the Camera for updating {@link AxesController}
 * @readonly
 */
export interface ControlParams {
  /** A moveable range for Camera */
  range: {
    min: number;
    max: number;
  };
  /** Current camera position */
  position: number;
  /** A Boolean indicating whether the {@link Flicking.circular | circular} option is enabled */
  circular: boolean;
}

/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface FlickingPanelProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {}

export default class FlickingPanel extends SvelteComponentTyped<
  FlickingPanelProps,
  {},
  { default: {} }
> {
  /**
   * @default () => { hidden = false; }
   */
  show: () => any;

  /**
   * @default () => { hidden = true; }
   */
  hide: () => any;
}

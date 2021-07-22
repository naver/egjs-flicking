/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import VanillaFlicking, { FlickingEvents, FlickingOptions, Plugin, Status } from "@egjs/flicking";

/* eslint-disable @typescript-eslint/indent, @typescript-eslint/ban-types, @typescript-eslint/no-empty-interface */
export interface FlickingProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  hideBeforeInit?: boolean;
  firstPanelSize?: string;
  options?: Partial<FlickingOptions>;
  plugins?: Plugin[];
  status?: Status;
}

declare class Flicking extends SvelteComponentTyped<
  FlickingProps,
  FlickingEvents,
  { default: {}; viewport: {} }
> {}

interface Flicking extends VanillaFlicking {}

export default Flicking;

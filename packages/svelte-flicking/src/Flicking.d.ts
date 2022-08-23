/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import VanillaFlicking, { FlickingOptions, FlickingEvents, Plugin, Status } from "@egjs/flicking";

interface FlickingProps {
  cameraClass: string;
  hideBeforeInit: boolean;
  firstPanelSize: string;
  plugins: Plugin[];
  status: Status;
  options: Partial<FlickingOptions>;
}

interface SvelteFlickingProps extends Partial<FlickingProps>, svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {}

declare class Flicking extends SvelteComponentTyped<
SvelteFlickingProps,
FlickingEvents,
{ default: {} }
> {}

interface Flicking extends VanillaFlicking {}

export default Flicking;

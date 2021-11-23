/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

declare class FlickingPanel extends SvelteComponentTyped<
svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]>,
{},
{ default: {} }
> {}

export default FlickingPanel;

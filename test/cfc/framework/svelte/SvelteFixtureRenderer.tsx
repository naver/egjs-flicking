import fs from "fs-extra";
import path from "path";
import { Children, ReactElement, isValidElement } from "react";
import { render as renderSvelteComponent } from "@testing-library/svelte";

import DummyFlicking from "../../fixture/DummyFlicking";
import { createSandbox, cleanup, findFlickingJSX, resolveFlickingWhenReady } from "../../common/utils";

let testIndex = 0;

const render = async (el: JSX.Element) => {
  const sandbox = createSandbox("svelte-ui");
  const replaced = parseFlickingJSX(el);
  const flickingJSX = findFlickingJSX(el);
  const tempSvelteFileLocation = path.resolve(__dirname, `./lib/svelte-fixture/${testIndex++}.svelte`);

  const template = `
<script>
import Flicking, {FlickingPanel} from "@egjs/svelte-flicking";
export let options;
export let events;
export let flicking;
</script>
<svelte:options accessors={true} />
${replaced}
`;

  fs.writeFileSync(tempSvelteFileLocation, template);

  const testSvelteComp = await import(tempSvelteFileLocation);

  const { component } = renderSvelteComponent(
    testSvelteComp,
    {
      options: flickingJSX?.props.options ?? {},
      events: flickingJSX?.props.events ?? {}
    },
    { container: sandbox }
  );

  return resolveFlickingWhenReady(component.flicking);
};

const parseFlickingJSX = (el: JSX.Element, isPanel = false): string => {
  const childs = Children.toArray(el.props?.children ?? []) as JSX.Element[];

  if (el.type === DummyFlicking) {
    const replacedChildren = childs.map(child => parseFlickingJSX(child, true)).join("");
    const events = (el as unknown as DummyFlicking).props.events;
    const eventHandlers = Object.keys(events).map(eventName => {
      return `on:${eventName}={events.${eventName}}`;
    });

    return `<Flicking bind:this={flicking} options={options} ${eventHandlers.join(" ")}>${ replacedChildren }</Flicking>`;
  } else if (!isValidElement(el)) {
    return el as unknown as string;
  } else {
    const dom = el as ReactElement;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, children, ...otherProps } = dom.props;
    const attrs = [];
    const replacedChildren = childs.map(child => parseFlickingJSX(child)).join("");

    if (className) {
      attrs.push(`class="${className}"`);
    }

    for (const key in otherProps) {
      attrs.push(`${key}="${otherProps[key]}"`);
    }

    const tag = isPanel ? "FlickingPanel" : dom.type;

    return `<${tag} ${attrs.join(" ")}>${ replacedChildren }</${tag}>`;
  }
};

export {
  render,
  cleanup
};

import fs from "fs-extra";
import path from "path";
import { Children, isValidElement } from "react";
import { render as renderSvelteComponent } from "@testing-library/svelte";

import DummyFlicking from "../../fixture/DummyFlicking";
import DummyFlickingProps from "../../fixture/DummyFlickingProps";
import { createSandbox, cleanup, findFlickingJSX, resolveFlickingWhenReady, flattenAttrs } from "../../common/utils";

let testIndex = 0;

const render = async (el: JSX.Element) => {
  jest.setTimeout(15000);

  const sandbox = createSandbox("svelte-ui");
  const replaced = parseFlickingJSX(el);
  const flickingJSX = findFlickingJSX(el);
  const tempSvelteFileLocation = path.resolve(__dirname, `./lib/svelte-fixture/${testIndex++}.svelte`);

  const template = `
<script>
import Flicking, {FlickingPanel} from "@egjs/svelte-flicking";
export let options;
export let events;
export let plugins;
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
      events: flickingJSX?.props.events ?? {},
      plugins: flickingJSX?.props.plugins ?? []
    },
    { container: sandbox }
  );

  return resolveFlickingWhenReady(component.flicking);
};

const flattenOptions = {
  formatProp: (name: string, val: any) => {
    if (name === "style") {
      return `${name}="${Object.keys(val).map(key => `${key}:${val[key]}`).join(";")}"`;
    } else if (typeof val === "string") {
      return `${name}="${val}"`;
    } else {
      return `${name}={${val}}`;
    }
  }
};

const parseFlickingJSX = (el: JSX.Element, isPanel = false): string => {
  const childs = Children.toArray(el.props?.children ?? []) as JSX.Element[];

  if (el.type === DummyFlicking) {
    const attrs = flattenAttrs(el, flattenOptions);
    const replacedChildren = childs.map(child => parseFlickingJSX(child, true)).join("");
    const events = (el as React.ReactElement<DummyFlickingProps>).props.events;
    const eventHandlers = Object.keys(events).map(eventName => {
      return `on:${eventName}={events.${eventName}}`;
    });

    return `<Flicking bind:this={flicking} options={options} plugins={plugins} ${eventHandlers.join(" ")} ${attrs.join(" ")}>${ replacedChildren }</Flicking>`;
  } else if (!isValidElement(el)) {
    return el as unknown as string;
  } else {
    const attrs = flattenAttrs(el, flattenOptions);
    const replacedChildren = childs.map(child => parseFlickingJSX(child)).join("");

    const tag = isPanel ? "FlickingPanel" : el.type;

    return `<${tag} ${attrs.join(" ")}>${ replacedChildren }</${tag}>`;
  }
};

export {
  render,
  cleanup
};

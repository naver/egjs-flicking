import { cleanup as reactCleanUp } from "@testing-library/react";

import FixtureRenderer from "./fixture/renderer/FixtureRenderer";
import NgxFixtureRenderer from "./fixture/renderer/NgxFixtureRenderer";
import ReactFixtureRenderer from "./fixture/renderer/ReactFixtureRenderer";
import VanillaFixtureRenderer from "./fixture/renderer/VanillaFixtureRenderer";
import VueFixtureRenderer from "./fixture/renderer/VueFixtureRenderer";
import SvelteFixtureRenderer from "./fixture/renderer/SvelteFixtureRenderer";

export const createSandbox = (id: string): HTMLElement => {
  const tmp = document.createElement("div");

  tmp.className = "_tempSandbox_";
  tmp.id = id;

  document.body.appendChild(tmp);

  return tmp;
};

export const cleanup = () => {
  const elements: HTMLElement[] = [].slice.call(document.querySelectorAll("._tempSandbox_"));
  elements.forEach(v => {
    v.parentNode.removeChild(v);
  });
};

export const cfc = {
  it: (title: string, fn?: ({ renderer }: { renderer: FixtureRenderer }) => Promise<void>) => {
    describe(title, () => {
      it("Vanilla", async () => {
        await fn({ renderer: new VanillaFixtureRenderer() });
      });
      it("React", async () => {
        try {
          await fn({ renderer: new ReactFixtureRenderer() });
        } catch (e) {
          throw e;
        } finally {
          reactCleanUp();
        }
      });
      it("Vue@2", async () => {
        await fn({ renderer: new VueFixtureRenderer() });
      });
      it("Angular", async () => {
        await fn({ renderer: new NgxFixtureRenderer() });
      });
      it("Svelte", async () => {
        await fn({ renderer: new SvelteFixtureRenderer() });
      });
    });
  }
};

import path from "path";
import VanillaFlicking from "~/Flicking";

let context = -1;

export const suites = [];

export const cfc = {
  describe: (title: string, fn: () => void) => {
    context++;

    suites.push({
      title,
      cases: []
    });

    fn();
  },
  it: (title: string, fixture: JSX.Element, fn?: ({ flicking }: { flicking: VanillaFlicking }) => Promise<void>) => {
    suites[context].cases.push({
      title,
      fixture,
      fn
    });
  }
};

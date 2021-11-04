// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import "zone.js/testing";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";
import NgxFixtureRenderer from "./NgxFixtureRenderer";

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: true }},
);

(window as any).cfc = {
  it: (title: string, fn?: ({ renderer }: { renderer: NgxFixtureRenderer }) => Promise<void>) => {
    it(title, async () => {
      if (!fn) return;
      await fn({ renderer: new NgxFixtureRenderer() });
      // @ts-ignore
      expect(true).toEqual(true);
    });
  }
};

// Then we find all the tests.
const context = require.context("../../spec/", true, /\.spec\.ts(x?)$/);
// And load the modules.
context.keys().map(context);

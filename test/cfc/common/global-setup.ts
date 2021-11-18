import fs from "fs-extra";
import path from "path";
import { replaceInFile } from "replace-in-file";

export default async () => {
  // copy all srcs into lib/ with own name to prevent node_modules collision
  const frameworkDir = path.resolve(__dirname, "../framework");

  await Promise.all([
    fs.copy(path.resolve(__dirname, "../../../src/"), path.resolve(frameworkDir, "./vanilla/lib/@egjs/flicking")),
    fs.copy(path.resolve(__dirname, "../../../packages/react-flicking/src/react-flicking/"), path.resolve(frameworkDir, "./react/lib/@egjs/react-flicking")),
    fs.copy(path.resolve(__dirname, "../../../packages/preact-flicking/src/preact-flicking/"), path.resolve(frameworkDir, "./preact/lib/@egjs/preact-flicking")),
    fs.copy(path.resolve(__dirname, "../../../packages/vue-flicking/src/"), path.resolve(frameworkDir, "./vue/lib/@egjs/vue-flicking")),
    fs.copy(path.resolve(__dirname, "../../../packages/vue3-flicking/src/"), path.resolve(frameworkDir, "./vue3/lib/@egjs/vue3-flicking")),
    fs.copy(path.resolve(__dirname, "../../../packages/ngx-flicking/projects/ngx-flicking/src/"), path.resolve(frameworkDir, "./angular/lib/@egjs/ngx-flicking")),
    fs.copy(path.resolve(__dirname, "../../../packages/svelte-flicking/src/"), path.resolve(frameworkDir, "./svelte/lib/@egjs/svelte-flicking")).then(() => {
      return replaceInFile({
        files: path.resolve(frameworkDir, "./svelte/lib/@egjs/svelte-flicking/flicking.svelte"),
        from: /import (.+) from "@egjs\/(component|list-differ)"/g,
        to: "import * as $1 from \"@egjs/$2\""
      });
    }),
    fs.mkdir(path.resolve(frameworkDir, "./svelte/lib/svelte-fixture"), { recursive: true })
  ]);
};

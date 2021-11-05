import fs from "fs-extra";
import path from "path";

export default async () => {
  // copy all srcs into lib/ with own name to prevent node_modules collision
  const destDir = path.resolve(__dirname, "./lib");
  await Promise.all([
    fs.copy(path.resolve(__dirname, "../../src/"), path.resolve(destDir, "@egjs/flicking")),
    fs.copy(path.resolve(__dirname, "../../packages/react-flicking/src/react-flicking/"), path.resolve(destDir, "@egjs/react-flicking")),
    fs.copy(path.resolve(__dirname, "../../packages/vue-flicking/src/"), path.resolve(destDir, "@egjs/vue-flicking")),
    fs.copy(path.resolve(__dirname, "../../packages/ngx-flicking/projects/ngx-flicking/src/"), path.resolve(destDir, "@egjs/ngx-flicking")),
    fs.copy(path.resolve(__dirname, "../../packages/svelte-flicking/src/"), path.resolve(destDir, "@egjs/svelte-flicking")),
    fs.mkdir(path.resolve(destDir, "svelte-fixture"), { recursive: true })
  ]);
};

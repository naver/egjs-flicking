const svelte = require("svelte/compiler");
const fs = require("fs-extra");
const path = require("path");

const source = fs.readFileSync(path.resolve(__dirname, "../../../../packages/svelte-flicking/src/flicking.svelte")).toString();

const compiled = svelte.compile(source, {
  customElement: true,
  name: "SvelteFlicking"
});

if (compiled.warnings.length > 0) {
  compiled.warnings.forEach(warning => {
    console.warn("⚠️", warning.message);
  });
}

fs.writeFileSync(path.resolve(__dirname, "../../dist/svelte-flicking.js"), compiled.js.code);

fs.copySync(
  path.resolve(__dirname, "../../../../packages/svelte-flicking/src"),
  path.resolve(__dirname, "../../dist")
)

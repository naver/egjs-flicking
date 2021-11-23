const path = require("path");

const fs = require("fs-extra");
const svelte = require("svelte/compiler");
const { typescript } = require("svelte-preprocess");
const ts = require("typescript");

const tsconfig = require("./tsconfig.json");

const files = fs.readdirSync(path.resolve(__dirname, "./src"), { withFileTypes: true });

const tsFiles = files
  .filter(file => file.isFile() && file.name.endsWith(".ts") && !file.name.endsWith(".d.ts"))
  .map(file => file.name);
const jsFiles = files
  .filter(file => file.isFile() && file.name.endsWith(".js"))
  .map(file => file.name);
const svelteFiles = fs.readdirSync(path.resolve(__dirname, "./src"), { withFileTypes: true })
  .filter(file => file.isFile() && file.name.endsWith(".svelte"))
  .map(file => file.name);

fs.ensureDirSync(path.resolve(__dirname, "./lib"));

tsFiles.forEach(async fileName => {
  const filePath = path.resolve(__dirname, "./src", fileName);
  const file = await fs.readFile(filePath);
  const { outputText } = ts.transpileModule(file.toString(), tsconfig);

  await fs.writeFile(path.resolve(__dirname, "./lib", `${path.basename(fileName, ".ts")}.js`), outputText);
});

jsFiles.forEach(async fileName => {
  await fs.copyFile(path.resolve(__dirname, "./src", fileName), path.resolve(__dirname, "./lib", fileName));
});

svelteFiles.forEach(async fileName => {
  const filePath = path.resolve(__dirname, "./src", fileName);
  const file = await fs.readFile(filePath);

  const { code } = await svelte.preprocess(file.toString(), [
    typescript({
      tsconfigDirectory: __dirname,
      tsconfigFile: "./tsconfig.json",
      handleMixedImports: true
    })
  ], {
    filename: fileName
  });

  await fs.writeFile(path.resolve(__dirname, "./lib", fileName), code.replace("<script lang=\"ts\">", "<script>"));
});

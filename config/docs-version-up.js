/* eslint-disable no-console */
const { spawn } = require("child_process");
const process = require("process");
const path = require("path");

const fs = require("fs-extra");

const package = require("../package.json");

const currentVersion = package.version;

if (!/^\d+\.\d+\.\d+$/.test(currentVersion)) {
  throw new Error(`Current version is not in format of x.x.x, given: ${currentVersion}`);
}

process.chdir(path.resolve(__dirname, "../docs"));

const runVersionUpScript = new Promise((resolve, reject) => {
  const build = spawn("./node_modules/.bin/docusaurus", [
    "docs:version",
    `${currentVersion}`
  ]);

  build.stdout.pipe(process.stdout);
  build.stderr.pipe(process.stderr);

  build.on("error", e => {
    console.log("had error", e);
    reject();
  });

  build.on("exit", () => {
    resolve();
  });
});

runVersionUpScript.then(() => {
  console.log(`Done building version ${currentVersion}, copying i18n files...`);
  const langs = fs.readdirSync("../docs/i18n", { withFileTypes: true })
    .filter(file => file.isDirectory())
    .map(file => file.name);

  langs.forEach(lang => {
    const contents = fs.readdirSync(`../docs/i18n/${lang}`, { withFileTypes: true })
      .filter(file => file.isDirectory())
      .map(file => file.name);

    contents.forEach(contentDir => {
      if (!fs.existsSync(`../docs/i18n/${lang}/${contentDir}/current`)) return;

      fs.ensureDirSync(`../docs/i18n/${lang}/${contentDir}/version-${currentVersion}`);

      fs.copySync(
        `../docs/i18n/${lang}/${contentDir}/current`,
        `../docs/i18n/${lang}/${contentDir}/version-${currentVersion}`
      )
    })

    console.log(`Done building version ${currentVersion} for i18n lang:${lang}`);
  });

  console.log("All Done!");
}).catch(e => {
  console.error(e);
});

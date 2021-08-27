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

const DIR = {
  VERSION_JSON: path.resolve(__dirname, "../docs/versions.json"),
  I18N: (lang, content) => lang
    ? content
      ? path.resolve(__dirname, `../docs/i18n/${lang}/${content}`)
      : path.resolve(__dirname, `../docs/i18n/${lang}`)
    : path.resolve(__dirname, `../docs/i18n`),
  VERSIONED_DOCS: path.resolve(__dirname, "../docs/versioned_docs"),
  VERSIONED_SIDEBARS: path.resolve(__dirname, "../docs/versioned_sidebars")
};

const getDirectories = dir => fs.readdirSync(dir, { withFileTypes: true })
  .filter(file => file.isDirectory())
  .map(file => file.name);

const removeCurrentVersion = () => {
  // Remove current version in versions.json
  const versions = fs.readJSONSync(DIR.VERSION_JSON);
  const filteredVersions = versions.filter(version => version !== currentVersion);
  fs.writeJSONSync(DIR.VERSION_JSON, filteredVersions, { spaces: 2 });

  // Remove current version dirs
  const langs = fs.readdirSync(DIR.I18N(), { withFileTypes: true })
    .filter(file => file.isDirectory())
    .map(file => file.name);
  langs.forEach(lang => {
    const contents = getDirectories(DIR.I18N(lang));

    contents.forEach(contentDir => {
      fs.rmSync(path.resolve(DIR.I18N(lang, contentDir), `version-${currentVersion}`), { recursive: true, force: true });
    });
  });

  // Remove current version in versioned_docs & versioned_sidebars
  fs.rmSync(path.resolve(DIR.VERSIONED_DOCS, `version-${currentVersion}`), { recursive: true, force: true });
  fs.rmSync(path.resolve(DIR.VERSIONED_SIDEBARS, `version-${currentVersion}-sidebars.json`), { force: true });
}

// Run Docusaurus's version up script
console.log("Running Docusaurus's version up script...")
const runVersionUpScript = () => new Promise((resolve, reject) => {
  const versions = fs.readJSONSync(DIR.VERSION_JSON);
  if (versions.includes(currentVersion)) {
    console.log("Current version already exists, removing...")
    removeCurrentVersion();
  }

  process.chdir(path.resolve(__dirname, "../docs"));
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

runVersionUpScript().then(() => {
  // Copy i18n
  console.log(`Done building version ${currentVersion}, copying i18n files...`);
  const langs = fs.readdirSync(DIR.I18N(), { withFileTypes: true })
    .filter(file => file.isDirectory())
    .map(file => file.name);

  langs.forEach(lang => {
    const contents = getDirectories(DIR.I18N(lang));

    contents.forEach(contentDir => {
      if (!fs.existsSync(path.resolve(DIR.I18N(lang, contentDir), "current"))) return;

      fs.ensureDirSync(path.resolve(DIR.I18N(lang, contentDir), `version-${currentVersion}`));

      fs.copySync(
        path.resolve(DIR.I18N(lang, contentDir), "current"),
        path.resolve(DIR.I18N(lang, contentDir), `version-${currentVersion}`)
      );
    });

    console.log(`Done building version ${currentVersion} for i18n lang:${lang}`);
  });

  // Remove old versions with same minor version
  console.log("Removing old versions with the same minor versions...");
  const upToMinorVersion = currentVersion.split(".").slice(0, 2).join(".");
  const versions = fs.readJSONSync(DIR.VERSION_JSON);

  const filteredVersions = versions.filter(version => !version.startsWith(upToMinorVersion) || version === currentVersion);

  console.log("Removed old versions in versions.json");
  fs.writeJSONSync(DIR.VERSION_JSON, filteredVersions, { spaces: 2 });

  const rmOldDirs = baseDir => {
    const oldVersionDirs = getDirectories(baseDir)
      .filter(dir => dir.startsWith("version-"))
      .filter(dir => {
        const version = dir.split("-")[1];
        return version.startsWith(upToMinorVersion) && version !== currentVersion;
      });

    oldVersionDirs.forEach(dir => {
      fs.rmSync(`${baseDir}/${dir}`, { recursive: true, force: true });
    });
  }

  console.log("Removing old i18n directories...");
  langs.forEach(lang => {
    const contents = getDirectories(DIR.I18N(lang));

    contents.forEach(contentDir => {
      rmOldDirs(DIR.I18N(lang, contentDir));
    });
  });

  console.log("Removing old versioned_docs...")
  rmOldDirs(DIR.VERSIONED_DOCS);

  console.log("Removing old versioned_sidebars");
  const oldSidebars = fs.readdirSync(DIR.VERSIONED_SIDEBARS, { withFileTypes: true })
    .filter(file => !file.isDirectory())
    .map(file => file.name)
    .filter(file => file.split("-")[1].startsWith(upToMinorVersion) && file.split("-")[1] !== currentVersion);

  oldSidebars.forEach(file => {
    fs.rmSync(path.resolve(DIR.VERSIONED_SIDEBARS, file));
  });

  console.log("All Done!");
}).catch(e => {
  console.error(e);
  removeCurrentVersion();
});

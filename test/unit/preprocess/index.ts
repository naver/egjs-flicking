/* eslint-disable no-console */
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const tempDirPath = path.resolve(__dirname, "../__karma__preprocess__temp__");

if (!fs.existsSync(tempDirPath)) {
  fs.mkdirSync(tempDirPath);
}

const suitesDirPath = path.resolve(__dirname, "../ui");

const testFiles = fs.readdirSync(suitesDirPath)
  .filter(file => /\.spec\.ts(x?)$/.test(file));

let processed = 0;
void (async () => {
  for (const file of testFiles) {
    processed += 1;
    console.log(chalk.green("- Processing"), file, chalk.dim`(${processed} of ${testFiles.length})`);

    fs.createFileSync(path.resolve(tempDirPath, file));

    await import(path.resolve(suitesDirPath, file));
  }
})();

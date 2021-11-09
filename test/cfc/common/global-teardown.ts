import fs from "fs-extra";
import path from "path";

export default () => {
  // rm lib
  const frameworkDir = path.resolve(__dirname, "../framework");
  const allDirs = fs.readdirSync(frameworkDir, { withFileTypes: true })
    .filter(file => file.isDirectory())
    .map(dir => path.resolve(frameworkDir, `./${dir.name}/lib`));

  allDirs.forEach(dir => {
    // fs.removeSync(dir);
  });
};

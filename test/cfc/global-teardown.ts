import fs from "fs-extra";
import path from "path";

export default () => {
  // rm lib
  fs.removeSync(path.resolve(__dirname, "./lib"));
};

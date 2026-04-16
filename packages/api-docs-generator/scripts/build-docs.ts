import path from "node:path";
import { generateDocs } from "../src/adapters/markdown";

const ROOT = path.resolve(__dirname, "..");

const apiJsonPaths = [
  path.join(ROOT, "api-artifacts/flicking.api.json"),
  path.join(ROOT, "api-artifacts/flicking-plugins.api.json")
];
const outputDir = path.join(ROOT, "docs-output");

generateDocs({ apiJsonPaths, outputDir });

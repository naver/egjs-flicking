/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { spawn } from "child_process";
import path from "path";

import * as fs from "fs-extra";
import jsdocParse from "jsdoc-parse";

import packageInfo from "../package.json";

import Identifier from "./types/Identifier";
import DocumentedClass from "./types/DocumentedClass";
import DocumentedInterface from "./types/DocumentedInterface";
import DocumentedNamespace from "./types/DocumentedNamespace";
import classTemplate from "./template/Class";
import interfaceTemplate from "./template/Interface";
import namespaceTemplate from "./template/Namespace";
import constantTemplate from "./template/Constant";
import sidebarTemplate from "./template/Sidebar";
import { parseLocales } from "./utils";

const jsdoc = spawn("jsdoc", ["-X", "-c", "jsdoc.json"]);
const tmp = fs.createWriteStream("/tmp/doc-ast.json");

const docsRoot = path.resolve(process.cwd(), "./docs");
const docsDir = path.resolve(process.cwd(), "./docs/docs");
const apiDir = path.resolve(process.cwd(), "./docs/docs/api");
const versionDocsDir = path.resolve(process.cwd(), `./docs/versioned_docs/version-${packageInfo.version}`);
const versionSidebarDir = path.resolve(process.cwd(), "./docs/versioned_sidebars");
const localesDir = (locale: string) => path.resolve(process.cwd(), `./docs/i18n/${locale}/docusaurus-plugin-content-docs/current/api`);

const locales = ["ko"];

jsdoc.stdout.pipe(tmp);
jsdoc.stderr.pipe(process.stdout);

jsdoc.on("close", async (code) => {
  if (code !== 0) {
    console.error(`ps process exited with code ${code}`);
  } else {
    const ast = JSON.parse(fs.readFileSync("/tmp/doc-ast.json").toString());
    const templateData = jsdocParse(ast) as Identifier[];

    const classes: {[key: string]: DocumentedClass} = {};
    const interfaces: {[key: string]: DocumentedInterface} = {};
    const namespaces: {[key: string]: DocumentedNamespace} = {};
    const constants: {[key: string]: Identifier} = {};

    const dataMap = new Map<string, Identifier>();

    fs.removeSync(apiDir);
    fs.ensureDirSync(apiDir);
    locales.forEach(locale => {
      fs.ensureDirSync(localesDir(locale));
    });

    templateData.forEach(identifier => {
      dataMap.set(identifier.longname, identifier);

      if (identifier.see) {
        identifier.see = (identifier.see as unknown as string[]).map(val => ({ description: val }));
      }

      Object.keys(identifier).forEach(key => {
        if (typeof identifier[key] === "object" && "description" in identifier[key]) {
          locales.forEach(locale => parseLocales(identifier[key], locale));
        } else if (Array.isArray(identifier[key])) {
          identifier[key].forEach(val => {
            if (typeof val === "object" && "description" in val) {
              locales.forEach(locale => parseLocales(val, locale));
            }
          });
        }
      });
    });

    templateData
      .filter(identifier => !identifier.memberof)
      .forEach(identifier => {
        if (identifier.kind === "class") {
          const classData = identifier as DocumentedClass;
          classData.static = {
            members: [],
            methods: []
          };
          classData.members = [];
          classData.methods = [];
          classData.events = [];

          classes[classData.name] = classData;
        } else if (identifier.kind === "interface") {
          const interfaceData = identifier as DocumentedInterface;

          if (!interfaceData.properties) {
            interfaceData.properties = [];
          }

          interfaces[interfaceData.name] = interfaceData;
        } else if (identifier.kind === "namespace") {
          const namespaceData = identifier as DocumentedNamespace;

          namespaceData.members = [];

          namespaces[identifier.name] = namespaceData;
        } else if (identifier.kind === "constant") {
          constants[identifier.name] = identifier;
        }

        templateData.splice(templateData.findIndex(val => val === identifier), 1);
      });

    templateData.forEach(identifier => {
      if (!identifier.memberof) return;

      if (classes[identifier.memberof]) {
        const classData = classes[identifier.memberof];

        if (identifier.kind === "constructor") {
          classData.constructorData = identifier;
        } else if (identifier.kind === "event") {
          classData.events.push(identifier);
        } else if (identifier.kind === "member") {
          if (identifier.scope === "static") {
            classData.static.members.push(identifier);
          } else {
            classData.members.push(identifier);
          }
        } else if (identifier.kind === "function") {
          if (identifier.scope === "static") {
            classData.static.methods.push(identifier);
          } else {
            classData.methods.push(identifier);
          }
        } else {
          console.error(identifier.kind, identifier.name, "is not included");
        }
      } else if (namespaces[identifier.memberof]) {
        const namespaceData = namespaces[identifier.memberof];

        namespaceData.members.push(identifier);
      }
    });

    Object.keys(classes).forEach(async name => {
      await fs.writeFile(
        path.resolve(apiDir, `${name}.mdx`),
        classTemplate(classes[name], dataMap)
      );

      locales.forEach(async locale => {
        await fs.writeFile(
          path.resolve(localesDir(locale), `${name}.mdx`),
          classTemplate(classes[name], dataMap, locale)
        );
      });
    });

    Object.keys(interfaces).forEach(async name => {
      await fs.writeFile(
        path.resolve(apiDir, `${name}.mdx`),
        interfaceTemplate(interfaces[name], dataMap)
      );

      locales.forEach(async locale => {
        await fs.writeFile(
          path.resolve(localesDir(locale), `${name}.mdx`),
          interfaceTemplate(interfaces[name], dataMap, locale)
        );
      });
    });

    Object.keys(namespaces).forEach(async name => {
      await fs.writeFile(
        path.resolve(apiDir, `${name}.mdx`),
        namespaceTemplate(namespaces[name], dataMap)
      );

      locales.forEach(async locale => {
        await fs.writeFile(
          path.resolve(localesDir(locale), `${name}.mdx`),
          namespaceTemplate(namespaces[name], dataMap, locale)
        );
      });
    });

    Object.keys(constants).forEach(async name => {
      await fs.writeFile(
        path.resolve(apiDir, `${name}.mdx`),
        constantTemplate(constants[name], dataMap)
      );

      locales.forEach(async locale => {
        await fs.writeFile(
          path.resolve(localesDir(locale), `${name}.mdx`),
          constantTemplate(constants[name], dataMap, locale)
        );
      });
    });

    // Copy all docs to versions folder
    await fs.ensureDir(versionDocsDir);
    await fs.copy(docsDir, versionDocsDir, { overwrite: true });

    await fs.writeFile(
      path.resolve(docsRoot, "sidebars-api.js"),
      sidebarTemplate({
        classes: Object.values(classes),
        interfaces: Object.values(interfaces),
        namespaces: Object.values(namespaces),
        constants: Object.values(constants)
      })
    );

    await fs.ensureDir(versionSidebarDir);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sidebarCategories = require(path.resolve(docsRoot, "sidebars.js"));
    Object.keys(sidebarCategories).forEach(category => {
      sidebarCategories[category].forEach(subcategory => {
        subcategory.items = subcategory.items.map(item => `version-${packageInfo.version}/${item}`);
      });
    });

    await fs.writeJSON(path.resolve(versionSidebarDir, `version-${packageInfo.version}-sidebars.json`), sidebarCategories);

    // Add current version to available versions
    const versions: string[] = fs.existsSync(path.resolve(docsRoot, "versions.json"))
      ? await fs.readJSON(path.resolve(docsRoot, "versions.json"))
      : [];
    if (versions.findIndex(version => version === packageInfo.version) < 0) {
      versions.push(packageInfo.version);
      await fs.writeJSON(path.resolve(docsRoot, "versions.json"), versions, { spaces: 2 });
    }
  }
});

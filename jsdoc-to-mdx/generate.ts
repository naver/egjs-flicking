/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { spawn } from "child_process";
import path from "path";

import * as fs from "fs-extra";
import jsdocParse from "jsdoc-parse";

import Identifier from "./types/Identifier";
import DocumentedClass from "./types/DocumentedClass";
import DocumentedInterface from "./types/DocumentedInterface";
import DocumentedNamespace from "./types/DocumentedNamespace";
import classTemplate from "./template/Class";
import interfaceTemplate from "./template/Interface";
import namespaceTemplate from "./template/Namespace";
import constantTemplate from "./template/Constant";
import sidebarTemplate from "./template/Sidebar";

const jsdoc = spawn("jsdoc", ["-X", "-c", "jsdoc.json"]);
const tmp = fs.createWriteStream("/tmp/doc-ast.json");

const docsDir = path.resolve(process.cwd(), "./docs");
const apiDir = path.resolve(process.cwd(), "./docs/docs/api");

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
    templateData.forEach(identifier => {
      dataMap.set(identifier.longname, identifier);
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

    Object.keys(classes).forEach(async className => {
      await fs.writeFile(
        path.resolve(apiDir, `${className}.md`),
        classTemplate(classes[className], dataMap)
      );
    });

    Object.keys(interfaces).forEach(async interfaceName => {
      await fs.writeFile(
        path.resolve(apiDir, `${interfaceName}.md`),
        interfaceTemplate(interfaces[interfaceName], dataMap)
      );
    });

    Object.keys(namespaces).forEach(async nameSpaceName => {
      await fs.writeFile(
        path.resolve(apiDir, `${nameSpaceName}.md`),
        namespaceTemplate(namespaces[nameSpaceName], dataMap)
      );
    });

    Object.keys(constants).forEach(async constantName => {
      await fs.writeFile(
        path.resolve(apiDir, `${constantName}.md`),
        constantTemplate(constants[constantName], dataMap)
      );
    });

    await fs.writeFile(
      path.resolve(docsDir, "sidebars-api.js"),
      sidebarTemplate({
        classes: Object.values(classes),
        interfaces: Object.values(interfaces),
        namespaces: Object.values(namespaces),
        constants: Object.values(constants)
      })
    );
  }
});

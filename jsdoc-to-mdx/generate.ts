/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { spawn } from "child_process";
import path from "path";

import * as fs from "fs-extra";
import jsdocParse from "jsdoc-parse";

import Identifier from "./types/identifier";
import DocumentedClass from "./types/class";
import DocumentedInterface from "./types/interface";
import classTemplate from "./template/Class";

const jsdoc = spawn("jsdoc", ["-X", "-c", "jsdoc.json"]);
const tmp = fs.createWriteStream("/tmp/doc-ast.json");

jsdoc.stdout.pipe(tmp);
jsdoc.stderr.pipe(process.stdout);

jsdoc.on("close", (code) => {
  if (code !== 0) {
    console.error(`ps process exited with code ${code}`);
  } else {
    const ast = JSON.parse(fs.readFileSync("/tmp/doc-ast.json").toString());
    const templateData = jsdocParse(ast) as Identifier[];
    const outputDir = path.resolve(process.cwd(), "./docs/docs/api");

    const classes: {[key: string]: DocumentedClass} = {};
    const interfaces: {[key: string]: DocumentedInterface} = {};

    const dataMap = new Map<string, Identifier>();

    fs.ensureDirSync(outputDir);
    templateData.forEach(identifier => {
      dataMap.set(identifier.longname, identifier);
    });

    templateData
      .filter(identifier => identifier.kind === "interface" || identifier.kind === "class")
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
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    Object.keys(classes).forEach(async className => {
      await fs.writeFile(
        path.resolve(outputDir, `${className}.md`),
        classTemplate(classes[className], dataMap)
      );
    });

    /* reduce templateData to an array of class names */
    // const classNames = templateData.reduce((classNames, identifier) => {
    //   if (identifier.kind === 'class') classNames.push(identifier.name)
    //   return classNames
    // }, []);

    // classNames.forEach(async className => {
    //   if (className !== "Flicking") return;

    //   const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`
    //   console.log(`rendering ${className}`)
    //   const output = await jsdoc2md.render({
    //     data: templateData,
    //     template: template,
    //     helper: path.resolve(__dirname, "helpers/**/*"),
    //     partial: path.resolve(__dirname, "partials/**/*"),
    //     "example-lang": "ts"
    //   });

    //   await fs.writeFile(
    //     path.resolve(outputDir, `${className}.md`),
    //     output.replace(/<br>/g, "<br/>")
    //       .replace(/<ko>/g, "")
    //       .replace(/<\/ko>/g, "")
    //   );
    // });
  }
});

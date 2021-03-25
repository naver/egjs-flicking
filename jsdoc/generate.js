const spawn = require("child_process").spawn;
const path = require("path");

const fs = require("fs-extra");
const jsdoc2md = require("jsdoc-to-markdown");
const jsdocParse = require("jsdoc-parse");

const jsdoc = spawn("jsdoc", ["-X", "-c", "jsdoc.json"]);
const tmp = fs.createWriteStream("/tmp/doc-ast.json");

jsdoc.stdout.pipe(tmp);
jsdoc.stderr.pipe(process.stdout)

jsdoc.on("close", (code) => {
  if (code !== 0) {
    console.error(`ps process exited with code ${code}`);
  } else {
    const ast = JSON.parse(fs.readFileSync("/tmp/doc-ast.json").toString());
    const templateData = jsdocParse(ast);
    const outputDir = path.resolve(process.cwd(), "./docs/docs/api");

    fs.ensureDirSync(outputDir);

    fs.writeJSONSync(
      path.resolve(__dirname, "templateData.json"),
      templateData,
      { spaces: 2 }
    )

    /* reduce templateData to an array of class names */
    const classNames = templateData.reduce((classNames, identifier) => {
      if (identifier.kind === 'class') classNames.push(identifier.name)
      return classNames
    }, []);

    classNames.forEach(async className => {
      if (className !== "Flicking") return;

      const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`
      console.log(`rendering ${className}`)
      const output = await jsdoc2md.render({
        data: templateData,
        template: template,
        helper: path.resolve(__dirname, "helpers/**/*"),
        partial: path.resolve(__dirname, "partials/**/*"),
        "example-lang": "ts"
      });

      await fs.writeFile(
        path.resolve(outputDir, `${className}.md`),
        output.replace(/<br>/g, "<br/>")
          .replace(/<ko>/g, "")
          .replace(/<\/ko>/g, "")
      );
    });
  }
});

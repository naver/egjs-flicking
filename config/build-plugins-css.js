const fs = require("fs");
const path = require("path");

const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const clean = require("postcss-clean");

const cssDir = path.resolve(__dirname, "../packages/flicking-plugins/css");
const distDir = path.resolve(__dirname, "../packages/flicking-plugins/dist");

const files = ["arrow.css", "pagination.css"];

files.forEach(file => {
  const inputPath = path.join(cssDir, file);
  const outputPath = path.join(distDir, file);
  const fileParsed = path.parse(file);
  const outputMinPath = path.join(distDir, `${fileParsed.name}.min${fileParsed.ext}`);

  const css = fs.readFileSync(inputPath, "utf8");

  // Generate regular CSS
  postcss([autoprefixer])
    .process(css, { from: inputPath, to: outputPath })
    .then(result => {
      fs.writeFileSync(outputPath, result.css);
      console.log(`✓ ${file} processed`);
    })
    .catch(err => {
      console.error(`✗ Error processing ${file}:`, err);
    });

  // Generate minified CSS
  postcss([autoprefixer, clean()])
    .process(css, { from: inputPath, to: outputMinPath })
    .then(result => {
      fs.writeFileSync(outputMinPath, result.css);
      console.log(`✓ ${fileParsed.name}.min${fileParsed.ext} processed`);
    })
    .catch(err => {
      console.error(`✗ Error processing ${fileParsed.name}.min${fileParsed.ext}:`, err);
    });
});

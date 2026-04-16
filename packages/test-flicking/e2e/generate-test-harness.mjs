/**
 * generate-test-harness.mjs  (E2E test harness generator)
 *
 * packages/docs/src/demo/ 디렉토리를 스캔하여
 * 프레임워크별(vanilla/react/vue) HTML 엔트리를 .generated/ 에 자동 생성한다.
 *
 * 사용법:
 *   node generate-test-harness.mjs              # 전체 데모 생성
 *   node generate-test-harness.mjs basic/Default # 특정 데모만 생성
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMO_ROOT = path.resolve(__dirname, "../../../packages/docs/src/demo");
const OUTPUT_DIR = path.resolve(__dirname, ".generated");
const CATEGORIES = ["basic", "advanced", "plugins", "reactive"];

// Sandpack의 defaultStyles에 해당하는 기본 패널 CSS
// packages/docs/src/demo/components/demo-defaults.ts에서 추출
const DEFAULT_STYLES = `
.flicking-viewport.vertical {
  display: block;
  width: 100%;
}

.flicking-panel {
  width: 200px;
  height: 150px;
  margin-right: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.panel-1 { background: #3e8ed0; }
.panel-2 { background: #00d1b2; }
.panel-3 { background: #f14668; }
.panel-4 { background: #ffe08a; color: #333; }
.panel-5 { background: #48c78e; }

.demo-container { margin-bottom: 24px; }
.demo-label { font-weight: bold; margin-bottom: 8px; color: #666; }

.button {
  padding: 8px 16px;
  margin: 4px;
  border: 2px solid #3498db;
  background: transparent;
  color: #3498db;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover { background: #3498db; color: white; }
.button.danger { border-color: #e74c3c; color: #e74c3c; }
.button.danger:hover { background: #e74c3c; color: white; }

.controls {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
}
`;

// 디렉토리가 유효한 데모인지 확인 (vanilla.js 존재 여부)
function isValidDemo(demoDir) {
  return fs.existsSync(path.join(demoDir, "vanilla.js"));
}

// HTML 파일에서 <body> 내용을 추출 (head의 link 태그 제외)
function extractBodyContent(htmlPath) {
  if (!fs.existsSync(htmlPath)) return "";
  const html = fs.readFileSync(htmlPath, "utf-8");
  const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
  if (bodyMatch) return bodyMatch[1].trim();
  // <body> 태그가 없는 경우: <head>/<html>/<link>/<script> 태그를 제외한 내용을 반환
  return html
    .replace(/<!\s*DOCTYPE[^>]*>/gi, "")
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<head>[\s\S]*?<\/head>/gi, "")
    .replace(/<link[^>]*>/gi, "")
    .trim();
}

// Flicking 인스턴스 자동 등록 스크립트
const FLICKING_PATCH_SCRIPT = `
<script type="module">
  import Flicking from "@egjs/flicking";
  const _origInit = Flicking.prototype.init;
  Flicking.prototype.init = async function(...args) {
    const result = await _origInit.call(this, ...args);
    window.__flickingInstances = window.__flickingInstances || [];
    window.__flickingInstances.push(this);
    window.dispatchEvent(new CustomEvent("flicking:ready", { detail: this }));
    return result;
  };
</script>`;

function generateVanillaHTML(category, name) {
  const demoPath = `@demo/${category}/${name}`;
  const htmlPath = path.join(DEMO_ROOT, category, name, "index.html");
  const bodyContent = extractBodyContent(htmlPath);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${category}/${name} - Vanilla</title>
  <style>${DEFAULT_STYLES}</style>
</head>
<body>
  ${bodyContent}
  ${FLICKING_PATCH_SCRIPT}
  <script type="module">
    import "${demoPath}/vanilla.js";
  </script>
</body>
</html>`;
}

function generateReactHTML(category, name) {
  const demoPath = `@demo/${category}/${name}`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${category}/${name} - React</title>
  <style>${DEFAULT_STYLES}</style>
</head>
<body>
  <div id="root"></div>
  ${FLICKING_PATCH_SCRIPT}
  <script type="module">
    import React from "react";
    import { createRoot } from "react-dom/client";
    import App from "${demoPath}/react.jsx";
    createRoot(document.getElementById("root")).render(React.createElement(App));
  </script>
</body>
</html>`;
}

function generateVueHTML(category, name) {
  const demoPath = `@demo/${category}/${name}`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${category}/${name} - Vue</title>
  <style>${DEFAULT_STYLES}</style>
</head>
<body>
  <div id="app"></div>
  ${FLICKING_PATCH_SCRIPT}
  <script type="module">
    import "${demoPath}/styles.css";
    import { createApp } from "vue";
    import App from "${demoPath}/vue.vue";
    createApp(App).mount("#app");
  </script>
</body>
</html>`;
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
}

function generateDemo(category, name) {
  const demoDir = path.join(DEMO_ROOT, category, name);
  if (!isValidDemo(demoDir)) return null;

  const generated = [];

  // Vanilla (항상 생성 - vanilla.js는 필수)
  writeFile(path.join(OUTPUT_DIR, "vanilla", category, `${name}.html`), generateVanillaHTML(category, name));
  generated.push(`vanilla/${category}/${name}`);

  // React (react.jsx가 있을 때만)
  if (fs.existsSync(path.join(demoDir, "react.jsx"))) {
    writeFile(path.join(OUTPUT_DIR, "react", category, `${name}.html`), generateReactHTML(category, name));
    generated.push(`react/${category}/${name}`);
  }

  // Vue (vue.vue가 있을 때만)
  if (fs.existsSync(path.join(demoDir, "vue.vue"))) {
    writeFile(path.join(OUTPUT_DIR, "vue", category, `${name}.html`), generateVueHTML(category, name));
    generated.push(`vue/${category}/${name}`);
  }

  return generated;
}

// 메인 실행
function main() {
  const filterArg = process.argv[2]; // e.g., "basic/Default"

  // 기존 .generated/ 초기화
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }

  let totalCount = 0;

  for (const category of CATEGORIES) {
    const categoryDir = path.join(DEMO_ROOT, category);
    if (!fs.existsSync(categoryDir)) continue;

    const demos = fs
      .readdirSync(categoryDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const name of demos) {
      // 필터 적용
      if (filterArg && `${category}/${name}` !== filterArg) continue;

      const generated = generateDemo(category, name);
      if (generated) {
        totalCount += generated.length;
      }
    }
  }

  console.log(`[generate-test-harness] ${totalCount} HTML entries generated in .generated/`);
}

main();

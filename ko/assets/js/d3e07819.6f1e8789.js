"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["2537"],{1378(n,i,e){e.r(i),e.d(i,{metadata:()=>l,default:()=>u,frontMatter:()=>o,contentTitle:()=>a,toc:()=>g,assets:()=>p});var l=JSON.parse('{"id":"demos/plugins/pagination","title":"Pagination","description":"\uD604\uC7AC \uD328\uB110 \uC704\uCE58\uB97C \uD45C\uC2DC\uD558\uB294 \uD398\uC774\uC9C0 \uC778\uB514\uCF00\uC774\uD130(bullet/fraction/scroll)\uB97C \uCD94\uAC00\uD558\uB294 \uD50C\uB7EC\uADF8\uC778","source":"@site/i18n/ko/docusaurus-plugin-content-docs/current/demos/plugins/pagination.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/pagination","permalink":"/egjs-flicking/ko/docs/demos/plugins/pagination","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/pagination.mdx","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"title":"Pagination","id":"pagination","slug":"/demos/plugins/pagination","sidebar_position":6,"description":"\uD604\uC7AC \uD328\uB110 \uC704\uCE58\uB97C \uD45C\uC2DC\uD558\uB294 \uD398\uC774\uC9C0 \uC778\uB514\uCF00\uC774\uD130(bullet/fraction/scroll)\uB97C \uCD94\uAC00\uD558\uB294 \uD50C\uB7EC\uADF8\uC778","keywords":["flicking","plugin","pagination","bullet","fraction","scroll","indicator"]},"sidebar":"demosSidebar","previous":{"title":"Arrow","permalink":"/egjs-flicking/ko/docs/demos/plugins/arrow"},"next":{"title":"Sync","permalink":"/egjs-flicking/ko/docs/demos/plugins/sync"}}'),s=e(65723),t=e(54187),c=e(90761);let r={"@egjs/flicking-plugins":"^4.6.0"},d=()=>(0,s.jsx)(c.A,{react:'import { Pagination } from "@egjs/flicking-plugins";\nimport Flicking, { ViewportSlot } from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/pagination.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Pagination({ type: "bullet" })];\n\nexport default function App() {\n  return (\n    <Flicking circular={true} plugins={plugins}>\n      {COLORS.map((color, i) => (\n        <div className="flicking-panel" key={i} style={{ background: color }}>\n          {i + 1}\n        </div>\n      ))}\n      <ViewportSlot>\n        <div className="flicking-pagination"></div>\n      </ViewportSlot>\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ circular: true }" :plugins="plugins">\n    <div v-for="(color, i) in COLORS" :key="i"\n         class="flicking-panel"\n         :style="{ background: color }">\n      {{ i + 1 }}\n    </div>\n    <template #viewport>\n      <div class="flicking-pagination"></div>\n    </template>\n  </Flicking>\n</template>\n\n<script setup>\nimport { Pagination } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/pagination.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Pagination({ type: "bullet" })];\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport { Pagination } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/pagination.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\n\nconst camera = document.querySelector(".flicking-camera");\nCOLORS.forEach((color, i) => {\n  const panel = document.createElement("div");\n  panel.className = "flicking-panel";\n  panel.style.background = color;\n  panel.textContent = i + 1;\n  camera.appendChild(panel);\n});\n\nconst flicking = new Flicking("#flick", {\n  circular: true\n});\n\nflicking.addPlugins(new Pagination({ type: "bullet" }));\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="app">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera"></div>\n      <div class="flicking-pagination"></div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 50%;\n  height: 200px;\n  margin: 0 5px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  color: white;\n}\n\n.flicking-viewport {\n  padding-bottom: 40px;\n}\n",dependencies:r}),o={title:"Pagination",id:"pagination",slug:"/demos/plugins/pagination",sidebar_position:6,description:"\uD604\uC7AC \uD328\uB110 \uC704\uCE58\uB97C \uD45C\uC2DC\uD558\uB294 \uD398\uC774\uC9C0 \uC778\uB514\uCF00\uC774\uD130(bullet/fraction/scroll)\uB97C \uCD94\uAC00\uD558\uB294 \uD50C\uB7EC\uADF8\uC778",keywords:["flicking","plugin","pagination","bullet","fraction","scroll","indicator"]},a="Pagination",p={},g=[{value:"\uC694\uC57D",id:"\uC694\uC57D",level:2},{value:"\uC8FC\uC694 \uC635\uC158",id:"\uC8FC\uC694-\uC635\uC158",level:3},{value:"\uD544\uC218 CSS",id:"\uD544\uC218-css",level:3},{value:"\uC0C1\uC138 \uC124\uBA85",id:"\uC0C1\uC138-\uC124\uBA85",level:2},{value:"\uD0C0\uC785\uBCC4 \uB3D9\uC791",id:"\uD0C0\uC785\uBCC4-\uB3D9\uC791",level:3},{value:"HTML \uAD6C\uC870",id:"html-\uAD6C\uC870",level:3},{value:"\uD504\uB808\uC784\uC6CC\uD06C\uBCC4 \uC0AC\uC6A9\uBC95",id:"\uD504\uB808\uC784\uC6CC\uD06C\uBCC4-\uC0AC\uC6A9\uBC95",level:3},{value:"\uC8FC\uC758\uC0AC\uD56D",id:"\uC8FC\uC758\uC0AC\uD56D",level:3},{value:"\uAD00\uB828 \uB9C1\uD06C",id:"\uAD00\uB828-\uB9C1\uD06C",level:2},{value:"\uAD00\uB828 \uB370\uBAA8",id:"\uAD00\uB828-\uB370\uBAA8",level:3}];function h(n){let i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"pagination",children:"Pagination"})}),"\n",(0,s.jsx)(i.p,{children:"\uD604\uC7AC \uD328\uB110 \uC704\uCE58\uB97C \uD45C\uC2DC\uD558\uB294 \uD398\uC774\uC9C0 \uC778\uB514\uCF00\uC774\uD130\uB97C \uCD94\uAC00\uD569\uB2C8\uB2E4. bullet, fraction, scroll \uC138 \uAC00\uC9C0 \uD0C0\uC785\uC744 \uC9C0\uC6D0\uD569\uB2C8\uB2E4."}),"\n",(0,s.jsx)(d,{}),"\n",(0,s.jsx)(i.h2,{id:"\uC694\uC57D",children:"\uC694\uC57D"}),"\n",(0,s.jsx)(i.h3,{id:"\uC8FC\uC694-\uC635\uC158",children:"\uC8FC\uC694 \uC635\uC158"}),"\n",(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:"\uC635\uC158"}),(0,s.jsx)(i.th,{children:"\uD0C0\uC785"}),(0,s.jsx)(i.th,{children:"\uAE30\uBCF8\uAC12"}),(0,s.jsx)(i.th,{children:"\uC124\uBA85"})]})}),(0,s.jsxs)(i.tbody,{children:[(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"type"})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:'"bullet" | "fraction" | "scroll"'})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:'"bullet"'})}),(0,s.jsx)(i.td,{children:"\uC778\uB514\uCF00\uC774\uD130 \uD45C\uC2DC \uBC29\uC2DD"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"parentEl"})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"HTMLElement"})}),(0,s.jsx)(i.td,{children:"-"}),(0,s.jsxs)(i.td,{children:["\uC778\uB514\uCF00\uC774\uD130\uC758 \uBD80\uBAA8 \uC694\uC18C. \uAE30\uBCF8\uC801\uC73C\uB85C ",(0,s.jsx)(i.code,{children:".flicking-pagination"})," \uC694\uC18C \uC0AC\uC6A9"]})]})]})]}),"\n",(0,s.jsx)(i.h3,{id:"\uD544\uC218-css",children:"\uD544\uC218 CSS"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-js",children:'import "@egjs/flicking-plugins/dist/pagination.css";\n'})}),"\n",(0,s.jsx)(i.h2,{id:"\uC0C1\uC138-\uC124\uBA85",children:"\uC0C1\uC138 \uC124\uBA85"}),"\n",(0,s.jsx)(i.h3,{id:"\uD0C0\uC785\uBCC4-\uB3D9\uC791",children:"\uD0C0\uC785\uBCC4 \uB3D9\uC791"}),"\n",(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:"\uD0C0\uC785"}),(0,s.jsx)(i.th,{children:"\uC124\uBA85"})]})}),(0,s.jsxs)(i.tbody,{children:[(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"bullet"})}),(0,s.jsx)(i.td,{children:"\uAC01 \uD328\uB110\uC5D0 \uB300\uC751\uD558\uB294 \uC810(dot) \uD45C\uC2DC. \uD074\uB9AD\uC73C\uB85C \uD574\uB2F9 \uD328\uB110\uB85C \uC774\uB3D9"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"fraction"})}),(0,s.jsxs)(i.td,{children:[(0,s.jsx)(i.code,{children:"\uD604\uC7AC/\uC804\uCCB4"})," \uD615\uD0DC\uC758 \uC22B\uC790 \uD45C\uC2DC (\uC608: ",(0,s.jsx)(i.code,{children:"1/5"}),")"]})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"scroll"})}),(0,s.jsx)(i.td,{children:"\uC2A4\uD06C\uB864\uBC14 \uD615\uD0DC\uC758 \uC778\uB514\uCF00\uC774\uD130"})]})]})]}),"\n",(0,s.jsx)(i.h3,{id:"html-\uAD6C\uC870",children:"HTML \uAD6C\uC870"}),"\n",(0,s.jsx)(i.p,{children:"\uD398\uC774\uC9C0\uB124\uC774\uC158 \uC694\uC18C\uB97C \uBDF0\uD3EC\uD2B8 \uB0B4\uBD80\uC5D0 \uBC30\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4."}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-html",children:'<div class="flicking-viewport">\n  <div class="flicking-camera">\n    \x3c!-- \uD328\uB110\uB4E4 --\x3e\n  </div>\n  <div class="flicking-pagination"></div>\n</div>\n'})}),"\n",(0,s.jsx)(i.h3,{id:"\uD504\uB808\uC784\uC6CC\uD06C\uBCC4-\uC0AC\uC6A9\uBC95",children:"\uD504\uB808\uC784\uC6CC\uD06C\uBCC4 \uC0AC\uC6A9\uBC95"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"React"})," \u2014 ",(0,s.jsx)(i.code,{children:"ViewportSlot"}),"\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-jsx",children:'<Flicking plugins={plugins}>\n  {/* \uD328\uB110\uB4E4 */}\n  <ViewportSlot>\n    <div className="flicking-pagination"></div>\n  </ViewportSlot>\n</Flicking>\n'})}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Vue"})," \u2014 ",(0,s.jsx)(i.code,{children:"#viewport"})," \uC2AC\uB86F\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-html",children:'<Flicking :plugins="plugins">\n  \x3c!-- \uD328\uB110\uB4E4 --\x3e\n  <template #viewport>\n    <div class="flicking-pagination"></div>\n  </template>\n</Flicking>\n'})}),"\n",(0,s.jsx)(i.h3,{id:"\uC8FC\uC758\uC0AC\uD56D",children:"\uC8FC\uC758\uC0AC\uD56D"}),"\n",(0,s.jsx)(i.admonition,{title:"\uC8FC\uC758",type:"warning",children:(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["\uBC18\uB4DC\uC2DC ",(0,s.jsx)(i.code,{children:"@egjs/flicking-plugins/dist/pagination.css"}),"\uB97C import\uD574\uC57C \uC778\uB514\uCF00\uC774\uD130\uAC00 \uC62C\uBC14\uB974\uAC8C \uD45C\uC2DC\uB429\uB2C8\uB2E4."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"bullet"})," \uD0C0\uC785\uC5D0\uC11C \uD328\uB110 \uC218\uAC00 \uB9CE\uC73C\uBA74 \uC810\uC774 \uB108\uBB34 \uB9CE\uC544\uC9C8 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC774 \uACBD\uC6B0 ",(0,s.jsx)(i.code,{children:"fraction"}),"\uC774\uB098 ",(0,s.jsx)(i.code,{children:"scroll"})," \uD0C0\uC785\uC744 \uACE0\uB824\uD558\uC138\uC694."]}),"\n"]})}),"\n",(0,s.jsx)(i.h2,{id:"\uAD00\uB828-\uB9C1\uD06C",children:"\uAD00\uB828 \uB9C1\uD06C"}),"\n",(0,s.jsx)(i.h3,{id:"\uAD00\uB828-\uB370\uBAA8",children:"\uAD00\uB828 \uB370\uBAA8"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.a,{href:"./arrow",children:"Arrow"}),": \uD654\uC0B4\uD45C \uB124\uBE44\uAC8C\uC774\uC158"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.a,{href:"../reactive/pagination",children:"Pagination (Reactive API)"}),": Reactive API \uAE30\uBC18 \uCEE4\uC2A4\uD140 \uD398\uC774\uC9C0\uB124\uC774\uC158"]}),"\n"]})]})}function u(n={}){let{wrapper:i}={...(0,t.R)(),...n.components};return i?(0,s.jsx)(i,{...n,children:(0,s.jsx)(h,{...n})}):h(n)}},90761(n,i,e){e.d(i,{A:()=>h});var l=e(65723),s=e(7210),t=e(78863);e(22155);var c=e(19612);let r="^4.11.4",d={react:{"@egjs/react-flicking":r,"@egjs/flicking":r},vue3:{"@egjs/vue3-flicking":r,"@egjs/flicking":r},vanilla:{"@egjs/flicking":r}},o=`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/src/styles.css" />
</head>
<body>
  <div id="app">
    <div id="flick" class="flicking-viewport">
      <div class="flicking-camera"></div>
    </div>
  </div>
</body>
</html>`,a=`import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>);`,p=`
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

.demo-container {
  margin-bottom: 24px;
}

.demo-label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #666;
}

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

.button:hover {
  background: #3498db;
  color: white;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
}
`;function g({code:n,html:i,template:e="react",dependencies:s={},files:t={},css:r=""}){return(0,l.jsx)(c.OZ,{template:"vue3"===e?"vue":"vanilla"===e?"vanilla":"react",files:(()=>{let l=r?`${p}
${r}`:p,s={"/styles.css":{code:l},...t};if("react"===e)return{"/App.tsx":{code:n},"/index.js":{code:a,hidden:!0},...s};if("vue3"===e){let i;return{"/src/App.vue":{code:(i=n.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${l}
</style>`)},...t}}return{"/src/index.js":{code:n},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:l},"/index.html":{code:i||o},...t}})(),customSetup:{dependencies:{...d[e],...s}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===e?["/App.tsx","/styles.css"]:"vue3"===e?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===e?"/App.tsx":"vue3"===e?"/src/App.vue":"/src/index.js"}})}function h({react:n,vue3:i,js:e,jsHtml:c,css:r,dependencies:d}){return(0,l.jsxs)(t.A,{groupId:"framework",defaultValue:"js",children:[(0,l.jsx)(s.A,{value:"js",label:"JavaScript",children:(0,l.jsx)(g,{template:"vanilla",code:e,html:c,css:r,dependencies:d})}),(0,l.jsx)(s.A,{value:"react",label:"React",children:(0,l.jsx)(g,{template:"react",code:n,css:r,dependencies:d})}),(0,l.jsx)(s.A,{value:"vue3",label:"Vue@3",children:(0,l.jsx)(g,{template:"vue3",code:i,css:r,dependencies:d})})]})}}}]);
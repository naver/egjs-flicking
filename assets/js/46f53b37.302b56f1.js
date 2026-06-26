"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4636"],{83690(e,n,i){i.r(n),i.d(n,{metadata:()=>s,default:()=>h,frontMatter:()=>a,contentTitle:()=>d,toc:()=>g,assets:()=>p});var s=JSON.parse('{"id":"demos/plugins/arrow","title":"Arrow","description":"A plugin that adds arrow navigation buttons to move to the previous/next panel","source":"@site/docs/demos/plugins/arrow.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/arrow","permalink":"/egjs-flicking/docs/demos/plugins/arrow","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/arrow.mdx","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"title":"Arrow","id":"arrow","slug":"/demos/plugins/arrow","sidebar_position":5,"description":"A plugin that adds arrow navigation buttons to move to the previous/next panel","keywords":["flicking","plugin","arrow","navigation","prev","next"]},"sidebar":"demosSidebar","previous":{"title":"Perspective","permalink":"/egjs-flicking/docs/demos/plugins/perspective"},"next":{"title":"Pagination","permalink":"/egjs-flicking/docs/demos/plugins/pagination"}}'),r=i(65723),t=i(54187),l=i(90761);let c={"@egjs/flicking-plugins":"^4.6.0"},o=()=>(0,r.jsx)(l.A,{react:'import { Arrow } from "@egjs/flicking-plugins";\nimport Flicking, { ViewportSlot } from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/arrow.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Arrow()];\n\nexport default function App() {\n  return (\n    <Flicking circular={true} plugins={plugins}>\n      {COLORS.map((color, i) => (\n        <div className="flicking-panel" key={i} style={{ background: color }}>\n          {i + 1}\n        </div>\n      ))}\n      <ViewportSlot>\n        <span className="flicking-arrow-prev"></span>\n        <span className="flicking-arrow-next"></span>\n      </ViewportSlot>\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ circular: true }" :plugins="plugins">\n    <div v-for="(color, i) in COLORS" :key="i"\n         class="flicking-panel"\n         :style="{ background: color }">\n      {{ i + 1 }}\n    </div>\n    <template #viewport>\n      <span class="flicking-arrow-prev"></span>\n      <span class="flicking-arrow-next"></span>\n    </template>\n  </Flicking>\n</template>\n\n<script setup>\nimport { Arrow } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/arrow.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Arrow()];\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport { Arrow } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/arrow.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\n\nconst camera = document.querySelector(".flicking-camera");\nCOLORS.forEach((color, i) => {\n  const panel = document.createElement("div");\n  panel.className = "flicking-panel";\n  panel.style.background = color;\n  panel.textContent = i + 1;\n  camera.appendChild(panel);\n});\n\nconst flicking = new Flicking("#flick", {\n  circular: true\n});\n\nflicking.addPlugins(new Arrow());\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="app">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera"></div>\n      <span class="flicking-arrow-prev"></span>\n      <span class="flicking-arrow-next"></span>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 50%;\n  height: 200px;\n  margin: 0 5px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  color: white;\n}\n\n.flicking-viewport {\n  padding: 0 40px;\n}\n",dependencies:c}),a={title:"Arrow",id:"arrow",slug:"/demos/plugins/arrow",sidebar_position:5,description:"A plugin that adds arrow navigation buttons to move to the previous/next panel",keywords:["flicking","plugin","arrow","navigation","prev","next"]},d="Arrow",p={},g=[{value:"Summary",id:"summary",level:2},{value:"Key Options",id:"key-options",level:3},{value:"Required CSS",id:"required-css",level:3},{value:"Details",id:"details",level:2},{value:"How It Works",id:"how-it-works",level:3},{value:"HTML Structure",id:"html-structure",level:3},{value:"Framework-specific Usage",id:"framework-specific-usage",level:3},{value:"Notes",id:"notes",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related Demos",id:"related-demos",level:3}];function u(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"arrow",children:"Arrow"})}),"\n",(0,r.jsx)(n.p,{children:"Adds arrow navigation buttons to move to the previous/next panel."}),"\n",(0,r.jsx)(o,{}),"\n",(0,r.jsx)(n.h2,{id:"summary",children:"Summary"}),"\n",(0,r.jsx)(n.h3,{id:"key-options",children:"Key Options"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Option"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Default"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"parentEl"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"HTMLElement"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Parent element for the arrow buttons. By default, placed inside the viewport"})]})})]}),"\n",(0,r.jsx)(n.h3,{id:"required-css",children:"Required CSS"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'import "@egjs/flicking-plugins/dist/arrow.css";\n'})}),"\n",(0,r.jsx)(n.h2,{id:"details",children:"Details"}),"\n",(0,r.jsx)(n.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,r.jsxs)(n.p,{children:["The Arrow plugin finds elements with the ",(0,r.jsx)(n.code,{children:".flicking-arrow-prev"})," and ",(0,r.jsx)(n.code,{children:".flicking-arrow-next"})," classes and binds click events to move to the previous/next panel."]}),"\n",(0,r.jsx)(n.h3,{id:"html-structure",children:"HTML Structure"}),"\n",(0,r.jsx)(n.p,{children:"Arrow elements must be placed inside the viewport."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-html",children:'<div class="flicking-viewport">\n  <div class="flicking-camera">\n    \x3c!-- Panels --\x3e\n  </div>\n  <span class="flicking-arrow-prev"></span>\n  <span class="flicking-arrow-next"></span>\n</div>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"framework-specific-usage",children:"Framework-specific Usage"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"React"})," \u2014 Use ",(0,r.jsx)(n.code,{children:"ViewportSlot"})," to place arrows inside the viewport:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Flicking plugins={plugins}>\n  {/* Panels */}\n  <ViewportSlot>\n    <span className="flicking-arrow-prev"></span>\n    <span className="flicking-arrow-next"></span>\n  </ViewportSlot>\n</Flicking>\n'})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Vue"})," \u2014 Use the ",(0,r.jsx)(n.code,{children:"#viewport"})," slot:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-html",children:'<Flicking :plugins="plugins">\n  \x3c!-- Panels --\x3e\n  <template #viewport>\n    <span class="flicking-arrow-prev"></span>\n    <span class="flicking-arrow-next"></span>\n  </template>\n</Flicking>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"notes",children:"Notes"}),"\n",(0,r.jsx)(n.admonition,{title:"Caution",type:"warning",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["You must import ",(0,r.jsx)(n.code,{children:"@egjs/flicking-plugins/dist/arrow.css"})," for the arrows to display correctly."]}),"\n",(0,r.jsxs)(n.li,{children:["Arrow elements must be located inside ",(0,r.jsx)(n.code,{children:".flicking-viewport"}),"."]}),"\n"]})}),"\n",(0,r.jsx)(n.h2,{id:"related-links",children:"Related Links"}),"\n",(0,r.jsx)(n.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"./pagination",children:"Pagination"}),": Page indicator"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"../reactive/prev-next",children:"Prev/Next"}),": Custom navigation"]}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},90761(e,n,i){i.d(n,{A:()=>u});var s=i(65723),r=i(7210),t=i(78863);i(22155);var l=i(19612);let c="^4.11.4",o={react:{"@egjs/react-flicking":c,"@egjs/flicking":c},vue3:{"@egjs/vue3-flicking":c,"@egjs/flicking":c},vanilla:{"@egjs/flicking":c}},a=`<!DOCTYPE html>
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
</html>`,d=`import { StrictMode } from "react";
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
`;function g({code:e,html:n,template:i="react",dependencies:r={},files:t={},css:c=""}){return(0,s.jsx)(l.OZ,{template:"vue3"===i?"vue":"vanilla"===i?"vanilla":"react",files:(()=>{let s=c?`${p}
${c}`:p,r={"/styles.css":{code:s},...t};if("react"===i)return{"/App.tsx":{code:e},"/index.js":{code:d,hidden:!0},...r};if("vue3"===i){let n;return{"/src/App.vue":{code:(n=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${n}

<style>
${s}
</style>`)},...t}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:n||a},...t}})(),customSetup:{dependencies:{...o[i],...r}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===i?["/App.tsx","/styles.css"]:"vue3"===i?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===i?"/App.tsx":"vue3"===i?"/src/App.vue":"/src/index.js"}})}function u({react:e,vue3:n,js:i,jsHtml:l,css:c,dependencies:o}){return(0,s.jsxs)(t.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(r.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(g,{template:"vanilla",code:i,html:l,css:c,dependencies:o})}),(0,s.jsx)(r.A,{value:"react",label:"React",children:(0,s.jsx)(g,{template:"react",code:e,css:c,dependencies:o})}),(0,s.jsx)(r.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(g,{template:"vue3",code:n,css:c,dependencies:o})})]})}}}]);
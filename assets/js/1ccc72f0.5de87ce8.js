"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["173"],{31091(e,i,n){n.r(i),n.d(i,{metadata:()=>t,default:()=>u,frontMatter:()=>d,contentTitle:()=>o,toc:()=>g,assets:()=>p});var t=JSON.parse('{"id":"demos/plugins/pagination","title":"Pagination","description":"A plugin that adds page indicators (bullet/fraction/scroll) to show the current panel position","source":"@site/docs/demos/plugins/pagination.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/pagination","permalink":"/egjs-flicking/docs/demos/plugins/pagination","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/pagination.mdx","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"title":"Pagination","id":"pagination","slug":"/demos/plugins/pagination","sidebar_position":6,"description":"A plugin that adds page indicators (bullet/fraction/scroll) to show the current panel position","keywords":["flicking","plugin","pagination","bullet","fraction","scroll","indicator"]},"sidebar":"demosSidebar","previous":{"title":"Arrow","permalink":"/egjs-flicking/docs/demos/plugins/arrow"},"next":{"title":"Sync","permalink":"/egjs-flicking/docs/demos/plugins/sync"}}'),s=n(65723),l=n(54187),c=n(90761);let r={"@egjs/flicking-plugins":"^4.6.0"},a=()=>(0,s.jsx)(c.A,{react:'import { Pagination } from "@egjs/flicking-plugins";\nimport Flicking, { ViewportSlot } from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/pagination.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Pagination({ type: "bullet" })];\n\nexport default function App() {\n  return (\n    <Flicking circular={true} plugins={plugins}>\n      {COLORS.map((color, i) => (\n        <div className="flicking-panel" key={i} style={{ background: color }}>\n          {i + 1}\n        </div>\n      ))}\n      <ViewportSlot>\n        <div className="flicking-pagination"></div>\n      </ViewportSlot>\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ circular: true }" :plugins="plugins">\n    <div v-for="(color, i) in COLORS" :key="i"\n         class="flicking-panel"\n         :style="{ background: color }">\n      {{ i + 1 }}\n    </div>\n    <template #viewport>\n      <div class="flicking-pagination"></div>\n    </template>\n  </Flicking>\n</template>\n\n<script setup>\nimport { Pagination } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/pagination.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Pagination({ type: "bullet" })];\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport { Pagination } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/pagination.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\n\nconst camera = document.querySelector(".flicking-camera");\nCOLORS.forEach((color, i) => {\n  const panel = document.createElement("div");\n  panel.className = "flicking-panel";\n  panel.style.background = color;\n  panel.textContent = i + 1;\n  camera.appendChild(panel);\n});\n\nconst flicking = new Flicking("#flick", {\n  circular: true\n});\n\nflicking.addPlugins(new Pagination({ type: "bullet" }));\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="app">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera"></div>\n      <div class="flicking-pagination"></div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 50%;\n  height: 200px;\n  margin: 0 5px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  color: white;\n}\n\n.flicking-viewport {\n  padding-bottom: 40px;\n}\n",dependencies:r}),d={title:"Pagination",id:"pagination",slug:"/demos/plugins/pagination",sidebar_position:6,description:"A plugin that adds page indicators (bullet/fraction/scroll) to show the current panel position",keywords:["flicking","plugin","pagination","bullet","fraction","scroll","indicator"]},o="Pagination",p={},g=[{value:"Summary",id:"summary",level:2},{value:"Key Options",id:"key-options",level:3},{value:"Required CSS",id:"required-css",level:3},{value:"Details",id:"details",level:2},{value:"Behavior by Type",id:"behavior-by-type",level:3},{value:"HTML Structure",id:"html-structure",level:3},{value:"Framework-specific Usage",id:"framework-specific-usage",level:3},{value:"Notes",id:"notes",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related Demos",id:"related-demos",level:3}];function h(e){let i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"pagination",children:"Pagination"})}),"\n",(0,s.jsx)(i.p,{children:"Adds page indicators to show the current panel position. Supports three types: bullet, fraction, and scroll."}),"\n",(0,s.jsx)(a,{}),"\n",(0,s.jsx)(i.h2,{id:"summary",children:"Summary"}),"\n",(0,s.jsx)(i.h3,{id:"key-options",children:"Key Options"}),"\n",(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:"Option"}),(0,s.jsx)(i.th,{children:"Type"}),(0,s.jsx)(i.th,{children:"Default"}),(0,s.jsx)(i.th,{children:"Description"})]})}),(0,s.jsxs)(i.tbody,{children:[(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"type"})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:'"bullet" | "fraction" | "scroll"'})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:'"bullet"'})}),(0,s.jsx)(i.td,{children:"Indicator display style"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"parentEl"})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"HTMLElement"})}),(0,s.jsx)(i.td,{children:"-"}),(0,s.jsxs)(i.td,{children:["Parent element for the indicator. By default, uses the ",(0,s.jsx)(i.code,{children:".flicking-pagination"})," element"]})]})]})]}),"\n",(0,s.jsx)(i.h3,{id:"required-css",children:"Required CSS"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-js",children:'import "@egjs/flicking-plugins/dist/pagination.css";\n'})}),"\n",(0,s.jsx)(i.h2,{id:"details",children:"Details"}),"\n",(0,s.jsx)(i.h3,{id:"behavior-by-type",children:"Behavior by Type"}),"\n",(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:"Type"}),(0,s.jsx)(i.th,{children:"Description"})]})}),(0,s.jsxs)(i.tbody,{children:[(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"bullet"})}),(0,s.jsx)(i.td,{children:"Displays dots corresponding to each panel. Click to move to that panel"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"fraction"})}),(0,s.jsxs)(i.td,{children:["Displays numbers in ",(0,s.jsx)(i.code,{children:"current/total"})," format (e.g., ",(0,s.jsx)(i.code,{children:"1/5"}),")"]})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"scroll"})}),(0,s.jsx)(i.td,{children:"Displays a scrollbar-style indicator"})]})]})]}),"\n",(0,s.jsx)(i.h3,{id:"html-structure",children:"HTML Structure"}),"\n",(0,s.jsx)(i.p,{children:"The pagination element must be placed inside the viewport."}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-html",children:'<div class="flicking-viewport">\n  <div class="flicking-camera">\n    \x3c!-- Panels --\x3e\n  </div>\n  <div class="flicking-pagination"></div>\n</div>\n'})}),"\n",(0,s.jsx)(i.h3,{id:"framework-specific-usage",children:"Framework-specific Usage"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"React"})," \u2014 Use ",(0,s.jsx)(i.code,{children:"ViewportSlot"}),":"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-jsx",children:'<Flicking plugins={plugins}>\n  {/* Panels */}\n  <ViewportSlot>\n    <div className="flicking-pagination"></div>\n  </ViewportSlot>\n</Flicking>\n'})}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Vue"})," \u2014 Use the ",(0,s.jsx)(i.code,{children:"#viewport"})," slot:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-html",children:'<Flicking :plugins="plugins">\n  \x3c!-- Panels --\x3e\n  <template #viewport>\n    <div class="flicking-pagination"></div>\n  </template>\n</Flicking>\n'})}),"\n",(0,s.jsx)(i.h3,{id:"notes",children:"Notes"}),"\n",(0,s.jsx)(i.admonition,{title:"Caution",type:"warning",children:(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["You must import ",(0,s.jsx)(i.code,{children:"@egjs/flicking-plugins/dist/pagination.css"})," for the indicator to display correctly."]}),"\n",(0,s.jsxs)(i.li,{children:["With the ",(0,s.jsx)(i.code,{children:"bullet"})," type, having too many panels can result in too many dots. In that case, consider using the ",(0,s.jsx)(i.code,{children:"fraction"})," or ",(0,s.jsx)(i.code,{children:"scroll"})," type."]}),"\n"]})}),"\n",(0,s.jsx)(i.h2,{id:"related-links",children:"Related Links"}),"\n",(0,s.jsx)(i.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.a,{href:"./arrow",children:"Arrow"}),": Arrow navigation"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.a,{href:"../reactive/pagination",children:"Pagination (Reactive API)"}),": Custom pagination based on Reactive API"]}),"\n"]})]})}function u(e={}){let{wrapper:i}={...(0,l.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},90761(e,i,n){n.d(i,{A:()=>h});var t=n(65723),s=n(7210),l=n(78863);n(22155);var c=n(19612);let r="^4.11.4",a={react:{"@egjs/react-flicking":r,"@egjs/flicking":r},vue3:{"@egjs/vue3-flicking":r,"@egjs/flicking":r},vanilla:{"@egjs/flicking":r}},d=`<!DOCTYPE html>
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
</html>`,o=`import { StrictMode } from "react";
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
`;function g({code:e,html:i,template:n="react",dependencies:s={},files:l={},css:r=""}){return(0,t.jsx)(c.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let t=r?`${p}
${r}`:p,s={"/styles.css":{code:t},...l};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...s};if("vue3"===n){let i;return{"/src/App.vue":{code:(i=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${t}
</style>`)},...l}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:t},"/index.html":{code:i||d},...l}})(),customSetup:{dependencies:{...a[n],...s}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function h({react:e,vue3:i,js:n,jsHtml:c,css:r,dependencies:a}){return(0,t.jsxs)(l.A,{groupId:"framework",defaultValue:"js",children:[(0,t.jsx)(s.A,{value:"js",label:"JavaScript",children:(0,t.jsx)(g,{template:"vanilla",code:n,html:c,css:r,dependencies:a})}),(0,t.jsx)(s.A,{value:"react",label:"React",children:(0,t.jsx)(g,{template:"react",code:e,css:r,dependencies:a})}),(0,t.jsx)(s.A,{value:"vue3",label:"Vue@3",children:(0,t.jsx)(g,{template:"vue3",code:i,css:r,dependencies:a})})]})}}}]);
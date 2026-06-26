"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["9859"],{97936(e,i,n){n.r(i),n.d(i,{metadata:()=>s,default:()=>u,frontMatter:()=>d,contentTitle:()=>o,toc:()=>g,assets:()=>p});var s=JSON.parse('{"id":"demos/plugins/perspective","title":"Perspective","description":"A plugin that applies 3D perspective rotation effects to panels","source":"@site/docs/demos/plugins/perspective.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/perspective","permalink":"/egjs-flicking/docs/demos/plugins/perspective","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/perspective.mdx","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"title":"Perspective","id":"perspective","slug":"/demos/plugins/perspective","sidebar_position":4,"description":"A plugin that applies 3D perspective rotation effects to panels","keywords":["flicking","plugin","perspective","3D","rotate","transform"]},"sidebar":"demosSidebar","previous":{"title":"Parallax","permalink":"/egjs-flicking/docs/demos/plugins/parallax"},"next":{"title":"Arrow","permalink":"/egjs-flicking/docs/demos/plugins/arrow"}}'),t=n(65723),r=n(54187),l=n(90761);let c={"@egjs/flicking-plugins":"^4.6.0"},a=()=>(0,t.jsx)(l.A,{react:'import { Perspective } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Perspective({ rotate: 1, perspective: 1000 })];\n\nexport default function App() {\n  return (\n    <Flicking circular={true} plugins={plugins} align="center">\n      {COLORS.map((color, i) => (\n        <div className="flicking-panel" key={i} style={{ background: color }}>\n          {i + 1}\n        </div>\n      ))}\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ circular: true, align: \'center\' }" :plugins="plugins">\n    <div v-for="(color, i) in COLORS" :key="i"\n         class="flicking-panel"\n         :style="{ background: color }">\n      {{ i + 1 }}\n    </div>\n  </Flicking>\n</template>\n\n<script setup>\nimport { Perspective } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Perspective({ rotate: 1, perspective: 1000 })];\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport { Perspective } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\n\nconst camera = document.querySelector(".flicking-camera");\nCOLORS.forEach((color, i) => {\n  const panel = document.createElement("div");\n  panel.className = "flicking-panel";\n  panel.style.background = color;\n  panel.textContent = i + 1;\n  camera.appendChild(panel);\n});\n\nconst flicking = new Flicking("#flick", {\n  circular: true,\n  align: "center"\n});\n\nflicking.addPlugins(new Perspective({ rotate: 1, perspective: 1000 }));\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="app">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera"></div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 200px;\n  height: 150px;\n  margin-right: 10px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  color: white;\n}\n",dependencies:c}),d={title:"Perspective",id:"perspective",slug:"/demos/plugins/perspective",sidebar_position:4,description:"A plugin that applies 3D perspective rotation effects to panels",keywords:["flicking","plugin","perspective","3D","rotate","transform"]},o="Perspective",p={},g=[{value:"Summary",id:"summary",level:2},{value:"Key Options",id:"key-options",level:3},{value:"Details",id:"details",level:2},{value:"How It Works",id:"how-it-works",level:3},{value:"Usage",id:"usage",level:3},{value:"Notes",id:"notes",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related Demos",id:"related-demos",level:3}];function h(e){let i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.header,{children:(0,t.jsx)(i.h1,{id:"perspective",children:"Perspective"})}),"\n",(0,t.jsx)(i.p,{children:"Applies 3D perspective rotation and scale transformation effects based on panel position."}),"\n",(0,t.jsx)(a,{}),"\n",(0,t.jsx)(i.h2,{id:"summary",children:"Summary"}),"\n",(0,t.jsx)(i.h3,{id:"key-options",children:"Key Options"}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Option"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Default"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsxs)(i.tbody,{children:[(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"rotate"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"number"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"1"})}),(0,t.jsx)(i.td,{children:"Rotation intensity. Positive values rotate right panels inward, negative values rotate outward"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"scale"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"number"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"2"})}),(0,t.jsx)(i.td,{children:"Scale transformation intensity"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"perspective"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"number"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"1000"})}),(0,t.jsx)(i.td,{children:"CSS perspective value (px). Smaller values produce stronger distortion"})]})]})]}),"\n",(0,t.jsx)(i.h2,{id:"details",children:"Details"}),"\n",(0,t.jsx)(i.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,t.jsxs)(i.p,{children:["The Perspective plugin automatically applies ",(0,t.jsx)(i.code,{children:"rotateY"})," and ",(0,t.jsx)(i.code,{children:"scale"})," transformations based on each panel's visible ratio. Panels closer to the center face forward, while panels farther away appear rotated."]}),"\n",(0,t.jsx)(i.h3,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-js",children:'import { Perspective } from "@egjs/flicking-plugins";\n\n// Basic usage\nflicking.addPlugins(new Perspective({ rotate: 1, perspective: 1000 }));\n\n// Strong distortion\nflicking.addPlugins(new Perspective({ rotate: -1, scale: 2, perspective: 600 }));\n'})}),"\n",(0,t.jsx)(i.h3,{id:"notes",children:"Notes"}),"\n",(0,t.jsx)(i.admonition,{title:"Caution",type:"warning",children:(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["Using with ",(0,t.jsx)(i.code,{children:"circular: true"})," enables a seamless 3D rotation effect."]}),"\n",(0,t.jsx)(i.li,{children:"If there are too few panels, empty spaces may appear during circulation. At least 4-5 panels are recommended."}),"\n"]})}),"\n",(0,t.jsx)(i.h2,{id:"related-links",children:"Related Links"}),"\n",(0,t.jsx)(i.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.a,{href:"../reactive/coverflow",children:"Coverflow"}),": 3D effect based on Reactive API"]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.a,{href:"./parallax",children:"Parallax"}),": Parallax scroll effect"]}),"\n"]})]})}function u(e={}){let{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},90761(e,i,n){n.d(i,{A:()=>h});var s=n(65723),t=n(7210),r=n(78863);n(22155);var l=n(19612);let c="^4.11.4",a={react:{"@egjs/react-flicking":c,"@egjs/flicking":c},vue3:{"@egjs/vue3-flicking":c,"@egjs/flicking":c},vanilla:{"@egjs/flicking":c}},d=`<!DOCTYPE html>
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
`;function g({code:e,html:i,template:n="react",dependencies:t={},files:r={},css:c=""}){return(0,s.jsx)(l.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let s=c?`${p}
${c}`:p,t={"/styles.css":{code:s},...r};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...t};if("vue3"===n){let i;return{"/src/App.vue":{code:(i=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${s}
</style>`)},...r}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:i||d},...r}})(),customSetup:{dependencies:{...a[n],...t}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function h({react:e,vue3:i,js:n,jsHtml:l,css:c,dependencies:a}){return(0,s.jsxs)(r.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(t.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(g,{template:"vanilla",code:n,html:l,css:c,dependencies:a})}),(0,s.jsx)(t.A,{value:"react",label:"React",children:(0,s.jsx)(g,{template:"react",code:e,css:c,dependencies:a})}),(0,s.jsx)(t.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(g,{template:"vue3",code:i,css:c,dependencies:a})})]})}}}]);
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["6812"],{31547(e,i,n){n.r(i),n.d(i,{metadata:()=>l,default:()=>u,frontMatter:()=>r,contentTitle:()=>a,toc:()=>h,assets:()=>o});var l=JSON.parse('{"id":"demos/basic/default","title":"Default","description":"A demo showing the basic usage and required structure of Flicking","source":"@site/docs/demos/basic/default.mdx","sourceDirName":"demos/basic","slug":"/demos/basic/default","permalink":"/egjs-flicking/docs/demos/basic/default","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/basic/default.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"title":"Default","id":"default","slug":"/demos/basic/default","sidebar_position":1,"description":"A demo showing the basic usage and required structure of Flicking","keywords":["flicking","carousel","basic","default","getting started"]},"sidebar":"demosSidebar","next":{"title":"Alignment","permalink":"/egjs-flicking/docs/demos/basic/alignment"}}'),s=n(65723),t=n(54187),d=n(90761);let c=()=>(0,s.jsx)(d.A,{react:'import Flicking from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nexport default function App() {\n  return (\n    <Flicking align="center">\n      <div className="flicking-panel panel-1">1</div>\n      <div className="flicking-panel panel-2">2</div>\n      <div className="flicking-panel panel-3">3</div>\n      <div className="flicking-panel panel-4">4</div>\n      <div className="flicking-panel panel-5">5</div>\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ align: \'center\' }">\n    <div class="flicking-panel panel-1">1</div>\n    <div class="flicking-panel panel-2">2</div>\n    <div class="flicking-panel panel-3">3</div>\n    <div class="flicking-panel panel-4">4</div>\n    <div class="flicking-panel panel-5">5</div>\n  </Flicking>\n</template>\n\n<script setup>\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst _flicking = new Flicking("#flick", {\n  align: "center"\n});\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="flick" class="flicking-viewport">\n    <div class="flicking-camera">\n      <div class="flicking-panel panel-1">1</div>\n      <div class="flicking-panel panel-2">2</div>\n      <div class="flicking-panel panel-3">3</div>\n      <div class="flicking-panel panel-4">4</div>\n      <div class="flicking-panel panel-5">5</div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 100%;\n}\n"}),r={title:"Default",id:"default",slug:"/demos/basic/default",sidebar_position:1,description:"A demo showing the basic usage and required structure of Flicking",keywords:["flicking","carousel","basic","default","getting started"]},a="Default",o={},h=[{value:"Summary",id:"summary",level:2},{value:"Default Option Values",id:"default-option-values",level:3},{value:"Required Elements",id:"required-elements",level:3},{value:"Details",id:"details",level:2},{value:"HTML Structure",id:"html-structure",level:3},{value:"CSS Import",id:"css-import",level:3},{value:"Notes",id:"notes",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related Demos",id:"related-demos",level:3}];function p(e){let i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"default",children:"Default"})}),"\n",(0,s.jsx)(i.p,{children:"The most basic usage of Flicking. You can check the required HTML structure, CSS, and default option values."}),"\n",(0,s.jsx)(c,{}),"\n",(0,s.jsx)(i.h2,{id:"summary",children:"Summary"}),"\n",(0,s.jsx)(i.h3,{id:"default-option-values",children:"Default Option Values"}),"\n",(0,s.jsx)(i.p,{children:"When created without any options, the following defaults are applied:"}),"\n",(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:"Option"}),(0,s.jsx)(i.th,{children:"Default"}),(0,s.jsx)(i.th,{children:"Description"})]})}),(0,s.jsxs)(i.tbody,{children:[(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#align",children:(0,s.jsx)(i.code,{children:"align"})})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:'"center"'})}),(0,s.jsx)(i.td,{children:"Panel alignment position"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#horizontal",children:(0,s.jsx)(i.code,{children:"horizontal"})})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"true"})}),(0,s.jsx)(i.td,{children:"Horizontal movement"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#circular",children:(0,s.jsx)(i.code,{children:"circular"})})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"false"})}),(0,s.jsx)(i.td,{children:"Circular mode disabled"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#bound",children:(0,s.jsx)(i.code,{children:"bound"})})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"false"})}),(0,s.jsx)(i.td,{children:"No boundary restriction"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#duration",children:(0,s.jsx)(i.code,{children:"duration"})})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"500"})}),(0,s.jsx)(i.td,{children:"Animation 500ms"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#movetype",children:(0,s.jsx)(i.code,{children:"moveType"})})}),(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:'"snap"'})}),(0,s.jsx)(i.td,{children:"Snap movement type"})]})]})]}),"\n",(0,s.jsx)(i.h3,{id:"required-elements",children:"Required Elements"}),"\n",(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:"Element"}),(0,s.jsx)(i.th,{children:"Required"}),(0,s.jsx)(i.th,{children:"Description"})]})}),(0,s.jsxs)(i.tbody,{children:[(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:".flicking-viewport"})}),(0,s.jsx)(i.td,{children:"Required"}),(0,s.jsx)(i.td,{children:"The viewport element to which the Flicking instance is attached"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:".flicking-camera"})}),(0,s.jsx)(i.td,{children:"Required"}),(0,s.jsx)(i.td,{children:"The container that holds the panels. The element that actually moves"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:"Panel elements"}),(0,s.jsx)(i.td,{children:"Required"}),(0,s.jsxs)(i.td,{children:["Direct children of ",(0,s.jsx)(i.code,{children:".flicking-camera"})]})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.code,{children:"flicking.css"})}),(0,s.jsx)(i.td,{children:"Required"}),(0,s.jsx)(i.td,{children:"Base stylesheet"})]})]})]}),"\n",(0,s.jsx)(i.h2,{id:"details",children:"Details"}),"\n",(0,s.jsx)(i.h3,{id:"html-structure",children:"HTML Structure"}),"\n",(0,s.jsx)(i.p,{children:"Flicking requires the following structure:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-html",children:'<div class="flicking-viewport">\n  <div class="flicking-camera">\n    <div class="panel">Panel 1</div>\n    <div class="panel">Panel 2</div>\n    <div class="panel">Panel 3</div>\n  </div>\n</div>\n'})}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"flicking-viewport"}),": Defines the visible area. ",(0,s.jsx)(i.code,{children:"overflow: hidden"})," is applied."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"flicking-camera"}),": Wraps the panels and moves during drag/animation."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Panels"}),": Each slide's content. Must be direct children of the camera."]}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"css-import",children:"CSS Import"}),"\n",(0,s.jsx)(i.p,{children:"You must import the Flicking CSS:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-javascript",children:'// JavaScript\nimport "@egjs/flicking/dist/flicking.css";\n\n// React\nimport "@egjs/react-flicking/dist/flicking.css";\n\n// Vue\nimport "@egjs/vue3-flicking/dist/flicking.css";\n'})}),"\n",(0,s.jsx)(i.h3,{id:"notes",children:"Notes"}),"\n",(0,s.jsx)(i.admonition,{title:"Required",type:"warning",children:(0,s.jsxs)(i.p,{children:["If you do not import ",(0,s.jsx)(i.code,{children:"flicking.css"}),", panels will not be positioned correctly. It contains the default styles for the viewport and camera."]})}),"\n",(0,s.jsx)(i.admonition,{title:"Structure caution",type:"warning",children:(0,s.jsxs)(i.p,{children:["Panel elements must be ",(0,s.jsx)(i.strong,{children:"direct children"})," of ",(0,s.jsx)(i.code,{children:".flicking-camera"}),". It will not work if there are other wrapper elements in between."]})}),"\n",(0,s.jsx)(i.h2,{id:"related-links",children:"Related Links"}),"\n",(0,s.jsx)(i.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.a,{href:"./alignment",children:"Alignment"}),": Panel alignment options"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.a,{href:"./circular",children:"Circular"}),": Circular mode"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.a,{href:"./movement-types",children:"Movement Types"}),": Movement types"]}),"\n"]})]})}function u(e={}){let{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},90761(e,i,n){n.d(i,{A:()=>u});var l=n(65723),s=n(7210),t=n(78863);n(22155);var d=n(19612);let c="^4.11.4",r={react:{"@egjs/react-flicking":c,"@egjs/flicking":c},vue3:{"@egjs/vue3-flicking":c,"@egjs/flicking":c},vanilla:{"@egjs/flicking":c}},a=`<!DOCTYPE html>
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
  </StrictMode>);`,h=`
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
`;function p({code:e,html:i,template:n="react",dependencies:s={},files:t={},css:c=""}){return(0,l.jsx)(d.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let l=c?`${h}
${c}`:h,s={"/styles.css":{code:l},...t};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...s};if("vue3"===n){let i;return{"/src/App.vue":{code:(i=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${l}
</style>`)},...t}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:l},"/index.html":{code:i||a},...t}})(),customSetup:{dependencies:{...r[n],...s}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function u({react:e,vue3:i,js:n,jsHtml:d,css:c,dependencies:r}){return(0,l.jsxs)(t.A,{groupId:"framework",defaultValue:"js",children:[(0,l.jsx)(s.A,{value:"js",label:"JavaScript",children:(0,l.jsx)(p,{template:"vanilla",code:n,html:d,css:c,dependencies:r})}),(0,l.jsx)(s.A,{value:"react",label:"React",children:(0,l.jsx)(p,{template:"react",code:e,css:c,dependencies:r})}),(0,l.jsx)(s.A,{value:"vue3",label:"Vue@3",children:(0,l.jsx)(p,{template:"vue3",code:i,css:c,dependencies:r})})]})}}}]);
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4860"],{31521(e,i,n){n.r(i),n.d(i,{metadata:()=>s,default:()=>h,frontMatter:()=>r,contentTitle:()=>o,toc:()=>g,assets:()=>p});var s=JSON.parse('{"id":"demos/plugins/fade","title":"Fade","description":"A plugin that applies fade in/out effects during panel transitions","source":"@site/docs/demos/plugins/fade.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/fade","permalink":"/egjs-flicking/docs/demos/plugins/fade","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/fade.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"title":"Fade","id":"fade","slug":"/demos/plugins/fade","sidebar_position":1,"description":"A plugin that applies fade in/out effects during panel transitions","keywords":["flicking","plugin","fade","transition","opacity"]},"sidebar":"demosSidebar","previous":{"title":"Coverflow","permalink":"/egjs-flicking/docs/demos/reactive/coverflow"},"next":{"title":"AutoPlay","permalink":"/egjs-flicking/docs/demos/plugins/autoplay"}}'),l=n(65723),t=n(54187),a=n(90761);let d={"@egjs/flicking-plugins":"^4.6.0"},c=()=>(0,l.jsx)(a.A,{react:'import { Fade } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst plugins = [new Fade()];\n\nexport default function App() {\n  return (\n    <Flicking circular={true} plugins={plugins} preventDefaultOnDrag={true}>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/fade1/600/300" />\n      </div>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/fade2/600/300" />\n      </div>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/fade3/600/300" />\n      </div>\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ circular: true, preventDefaultOnDrag: true }" :plugins="plugins">\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/fade1/600/300" />\n    </div>\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/fade2/600/300" />\n    </div>\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/fade3/600/300" />\n    </div>\n  </Flicking>\n</template>\n\n<script setup>\nimport { Fade } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst plugins = [new Fade()];\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport { Fade } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst flicking = new Flicking("#flick", {\n  circular: true,\n  preventDefaultOnDrag: true\n});\n\nflicking.addPlugins(new Fade());\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="app">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera">\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/fade1/600/300" />\n        </div>\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/fade2/600/300" />\n        </div>\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/fade3/600/300" />\n        </div>\n      </div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  position: relative;\n  border-radius: 5px;\n  width: 80%;\n  margin-right: 10px;\n  height: 200px;\n  overflow: hidden;\n}\n\n.panel-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n",dependencies:d}),r={title:"Fade",id:"fade",slug:"/demos/plugins/fade",sidebar_position:1,description:"A plugin that applies fade in/out effects during panel transitions",keywords:["flicking","plugin","fade","transition","opacity"]},o="Fade",p={},g=[{value:"Summary",id:"summary",level:2},{value:"Key Options",id:"key-options",level:3},{value:"Details",id:"details",level:2},{value:"How It Works",id:"how-it-works",level:3},{value:"Usage",id:"usage",level:3},{value:"Notes",id:"notes",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related Demos",id:"related-demos",level:3}];function u(e){let i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.header,{children:(0,l.jsx)(i.h1,{id:"fade",children:"Fade"})}),"\n",(0,l.jsx)(i.p,{children:"Applies fade in/out effects by adjusting opacity during panel transitions."}),"\n",(0,l.jsx)(c,{}),"\n",(0,l.jsx)(i.h2,{id:"summary",children:"Summary"}),"\n",(0,l.jsx)(i.h3,{id:"key-options",children:"Key Options"}),"\n",(0,l.jsxs)(i.table,{children:[(0,l.jsx)(i.thead,{children:(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.th,{children:"Option"}),(0,l.jsx)(i.th,{children:"Type"}),(0,l.jsx)(i.th,{children:"Default"}),(0,l.jsx)(i.th,{children:"Description"})]})}),(0,l.jsxs)(i.tbody,{children:[(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"selector"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"string"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:'""'})}),(0,l.jsx)(i.td,{children:"CSS selector for the element to apply the effect to. If empty, the effect is applied to the panel itself"})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"scale"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"number"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"1"})}),(0,l.jsx)(i.td,{children:"Effect intensity multiplier"})]})]})]}),"\n",(0,l.jsx)(i.h2,{id:"details",children:"Details"}),"\n",(0,l.jsx)(i.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,l.jsxs)(i.p,{children:["The Fade plugin automatically adjusts ",(0,l.jsx)(i.code,{children:"opacity"})," based on each panel's visible ratio. The currently visible panel becomes opaque, while panels moving out of view become transparent."]}),"\n",(0,l.jsx)(i.h3,{id:"usage",children:"Usage"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-js",children:'import { Fade } from "@egjs/flicking-plugins";\n\n// Basic usage\nflicking.addPlugins(new Fade());\n\n// Apply to a specific element only\nflicking.addPlugins(new Fade("img"));\n\n// Adjust effect intensity\nflicking.addPlugins(new Fade("", 2));\n'})}),"\n",(0,l.jsx)(i.h3,{id:"notes",children:"Notes"}),"\n",(0,l.jsx)(i.admonition,{title:"Caution",type:"warning",children:(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:["Using with ",(0,l.jsx)(i.code,{children:"circular: true"})," enables a seamless fade effect."]}),"\n",(0,l.jsx)(i.li,{children:"If the panel background is transparent, panels behind may show through. It is recommended to use an opaque background color or image."}),"\n"]})}),"\n",(0,l.jsx)(i.h2,{id:"related-links",children:"Related Links"}),"\n",(0,l.jsx)(i.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.a,{href:"./parallax",children:"Parallax"}),": Parallax scroll effect"]}),"\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.a,{href:"./autoplay",children:"AutoPlay"}),": Use with autoplay"]}),"\n"]})]})}function h(e={}){let{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,l.jsx)(i,{...e,children:(0,l.jsx)(u,{...e})}):u(e)}},90761(e,i,n){n.d(i,{A:()=>u});var s=n(65723),l=n(7210),t=n(78863);n(22155);var a=n(19612);let d="^4.11.4",c={react:{"@egjs/react-flicking":d,"@egjs/flicking":d},vue3:{"@egjs/vue3-flicking":d,"@egjs/flicking":d},vanilla:{"@egjs/flicking":d}},r=`<!DOCTYPE html>
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
`;function g({code:e,html:i,template:n="react",dependencies:l={},files:t={},css:d=""}){return(0,s.jsx)(a.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let s=d?`${p}
${d}`:p,l={"/styles.css":{code:s},...t};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...l};if("vue3"===n){let i;return{"/src/App.vue":{code:(i=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${s}
</style>`)},...t}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:i||r},...t}})(),customSetup:{dependencies:{...c[n],...l}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function u({react:e,vue3:i,js:n,jsHtml:a,css:d,dependencies:c}){return(0,s.jsxs)(t.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(l.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(g,{template:"vanilla",code:n,html:a,css:d,dependencies:c})}),(0,s.jsx)(l.A,{value:"react",label:"React",children:(0,s.jsx)(g,{template:"react",code:e,css:d,dependencies:c})}),(0,s.jsx)(l.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(g,{template:"vue3",code:i,css:d,dependencies:c})})]})}}}]);
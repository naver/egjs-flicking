"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4539"],{87423(e,i,n){n.r(i),n.d(i,{metadata:()=>s,default:()=>g,frontMatter:()=>c,contentTitle:()=>o,toc:()=>u,assets:()=>p});var s=JSON.parse('{"id":"demos/plugins/autoplay","title":"AutoPlay","description":"A plugin that automatically transitions panels at regular intervals","source":"@site/docs/demos/plugins/autoplay.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/autoplay","permalink":"/egjs-flicking/docs/demos/plugins/autoplay","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/autoplay.mdx","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"AutoPlay","id":"autoplay","slug":"/demos/plugins/autoplay","sidebar_position":2,"description":"A plugin that automatically transitions panels at regular intervals","keywords":["flicking","plugin","autoplay","auto","play","timer"]},"sidebar":"demosSidebar","previous":{"title":"Fade","permalink":"/egjs-flicking/docs/demos/plugins/fade"},"next":{"title":"Parallax","permalink":"/egjs-flicking/docs/demos/plugins/parallax"}}'),t=n(65723),l=n(54187),a=n(90761);let r={"@egjs/flicking-plugins":"^4.6.0"},d=()=>(0,t.jsx)(a.A,{react:'import { AutoPlay } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst plugins = [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: true })];\n\nexport default function App() {\n  return (\n    <Flicking circular={true} plugins={plugins} preventDefaultOnDrag={true}>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/auto1/600/300" />\n      </div>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/auto2/600/300" />\n      </div>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/auto3/600/300" />\n      </div>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/auto4/600/300" />\n      </div>\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ circular: true, preventDefaultOnDrag: true }" :plugins="plugins">\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/auto1/600/300" />\n    </div>\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/auto2/600/300" />\n    </div>\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/auto3/600/300" />\n    </div>\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/auto4/600/300" />\n    </div>\n  </Flicking>\n</template>\n\n<script setup>\nimport { AutoPlay } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst plugins = [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: true })];\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport { AutoPlay } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst flicking = new Flicking("#flick", {\n  circular: true,\n  preventDefaultOnDrag: true\n});\n\nflicking.addPlugins(\n  new AutoPlay({\n    duration: 2000,\n    direction: "NEXT",\n    stopOnHover: true\n  })\n);\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="app">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera">\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/auto1/600/300" />\n        </div>\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/auto2/600/300" />\n        </div>\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/auto3/600/300" />\n        </div>\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/auto4/600/300" />\n        </div>\n      </div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  position: relative;\n  border-radius: 5px;\n  width: 80%;\n  margin-right: 10px;\n  height: 200px;\n  overflow: hidden;\n}\n\n.panel-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n",dependencies:r}),c={title:"AutoPlay",id:"autoplay",slug:"/demos/plugins/autoplay",sidebar_position:2,description:"A plugin that automatically transitions panels at regular intervals",keywords:["flicking","plugin","autoplay","auto","play","timer"]},o="AutoPlay",p={},u=[{value:"Summary",id:"summary",level:2},{value:"Key Options",id:"key-options",level:3},{value:"Details",id:"details",level:2},{value:"How It Works",id:"how-it-works",level:3},{value:"Usage",id:"usage",level:3},{value:"Control Methods",id:"control-methods",level:3},{value:"Notes",id:"notes",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related Demos",id:"related-demos",level:3}];function h(e){let i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.header,{children:(0,t.jsx)(i.h1,{id:"autoplay",children:"AutoPlay"})}),"\n",(0,t.jsx)(i.p,{children:"Automatically transitions panels at regular intervals. Supports pause on mouse hover."}),"\n",(0,t.jsx)(d,{}),"\n",(0,t.jsx)(i.h2,{id:"summary",children:"Summary"}),"\n",(0,t.jsx)(i.h3,{id:"key-options",children:"Key Options"}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Option"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Default"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsxs)(i.tbody,{children:[(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"duration"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"number"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"2000"})}),(0,t.jsx)(i.td,{children:"Interval between panel transitions (ms)"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"direction"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:'"NEXT" | "PREV"'})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:'"NEXT"'})}),(0,t.jsx)(i.td,{children:"Direction of automatic transition"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"stopOnHover"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"boolean"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"false"})}),(0,t.jsx)(i.td,{children:"Pause autoplay on mouse hover"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"animationDuration"})}),(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"number"})}),(0,t.jsx)(i.td,{children:"-"}),(0,t.jsx)(i.td,{children:"Duration of the panel transition animation (ms)"})]})]})]}),"\n",(0,t.jsx)(i.h2,{id:"details",children:"Details"}),"\n",(0,t.jsx)(i.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,t.jsxs)(i.p,{children:["The AutoPlay plugin automatically transitions panels in the specified direction at every ",(0,t.jsx)(i.code,{children:"duration"})," interval. When the user drags, autoplay pauses and resumes after the drag ends."]}),"\n",(0,t.jsx)(i.h3,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-js",children:'import { AutoPlay } from "@egjs/flicking-plugins";\n\nflicking.addPlugins(new AutoPlay({\n  duration: 2000,\n  direction: "NEXT",\n  stopOnHover: true\n}));\n'})}),"\n",(0,t.jsx)(i.h3,{id:"control-methods",children:"Control Methods"}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Method"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsxs)(i.tbody,{children:[(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"plugin.stop()"})}),(0,t.jsx)(i.td,{children:"Stop autoplay"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"plugin.play()"})}),(0,t.jsx)(i.td,{children:"Start autoplay"})]})]})]}),"\n",(0,t.jsx)(i.h3,{id:"notes",children:"Notes"}),"\n",(0,t.jsx)(i.admonition,{title:"Caution",type:"warning",children:(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["For seamless autoplay, use it together with the ",(0,t.jsx)(i.code,{children:"circular: true"})," option."]}),"\n",(0,t.jsxs)(i.li,{children:["When ",(0,t.jsx)(i.code,{children:"stopOnHover: true"})," is set, it pauses on touch on mobile devices."]}),"\n"]})}),"\n",(0,t.jsx)(i.h2,{id:"related-links",children:"Related Links"}),"\n",(0,t.jsx)(i.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.a,{href:"./fade",children:"Fade"}),": Use with fade effect"]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.a,{href:"./pagination",children:"Pagination"}),": Use with page indicator"]}),"\n"]})]})}function g(e={}){let{wrapper:i}={...(0,l.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},90761(e,i,n){n.d(i,{A:()=>h});var s=n(65723),t=n(7210),l=n(78863);n(22155);var a=n(19612);let r="^4.11.4",d={react:{"@egjs/react-flicking":r,"@egjs/flicking":r},vue3:{"@egjs/vue3-flicking":r,"@egjs/flicking":r},vanilla:{"@egjs/flicking":r}},c=`<!DOCTYPE html>
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
`;function u({code:e,html:i,template:n="react",dependencies:t={},files:l={},css:r=""}){return(0,s.jsx)(a.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let s=r?`${p}
${r}`:p,t={"/styles.css":{code:s},...l};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...t};if("vue3"===n){let i;return{"/src/App.vue":{code:(i=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${s}
</style>`)},...l}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:i||c},...l}})(),customSetup:{dependencies:{...d[n],...t}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function h({react:e,vue3:i,js:n,jsHtml:a,css:r,dependencies:d}){return(0,s.jsxs)(l.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(t.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(u,{template:"vanilla",code:n,html:a,css:r,dependencies:d})}),(0,s.jsx)(t.A,{value:"react",label:"React",children:(0,s.jsx)(u,{template:"react",code:e,css:r,dependencies:d})}),(0,s.jsx)(t.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(u,{template:"vue3",code:i,css:r,dependencies:d})})]})}}}]);
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4034"],{38126(e,s,n){n.r(s),n.d(s,{metadata:()=>i,default:()=>h,frontMatter:()=>d,contentTitle:()=>o,toc:()=>p,assets:()=>a});var i=JSON.parse('{"id":"demos/reactive/progress-bar","title":"Progress Bar","description":"Display scroll progress using the Reactive API\'s progress property","source":"@site/docs/demos/reactive/progress-bar.mdx","sourceDirName":"demos/reactive","slug":"/demos/reactive/progress-bar","permalink":"/egjs-flicking/docs/demos/reactive/progress-bar","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/reactive/progress-bar.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"title":"Progress Bar","id":"progress-bar","slug":"/demos/reactive/progress-bar","sidebar_position":1,"description":"Display scroll progress using the Reactive API\'s progress property","keywords":["flicking","carousel","progress","reactive","freeScroll","progress bar"]},"sidebar":"demosSidebar","previous":{"title":"Observe Panel Resize","permalink":"/egjs-flicking/docs/demos/advanced/observe-panel-resize"},"next":{"title":"Pagination","permalink":"/egjs-flicking/docs/demos/reactive/pagination"}}'),r=n(65723),t=n(54187),l=n(90761);let c=()=>(0,r.jsx)(l.A,{react:'import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";\nimport React from "react";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];\n\nexport default function App() {\n  const flickingRef = React.useRef(null);\n  const { progress } = useFlickingReactiveAPI(flickingRef);\n\n  return (\n    <div style={{ width: "100%" }}>\n      <Flicking ref={flickingRef} moveType="freeScroll">\n        {[0, 1, 2, 3, 4].map(index => (\n          <div key={index} className="flicking-panel" style={{ backgroundColor: COLORS[index % COLORS.length] }}>\n            {index + 1}\n          </div>\n        ))}\n      </Flicking>\n\n      <div className="progress-container">\n        <div className="progress-track">\n          <div className="progress-bar" style={{ width: `${progress}%` }} />\n        </div>\n        <div className="progress-text">Progress: {progress.toFixed(1)}%</div>\n      </div>\n    </div>\n  );\n}\n',vue3:'<script setup>\nimport Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";\nimport { ref } from "vue";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];\n\nconst flickingRef = ref(null);\nconst { progress } = useFlickingReactiveAPI(flickingRef);\n<\/script>\n\n<template>\n  <div style="width: 100%">\n    <Flicking\n      ref="flickingRef"\n      :options="{ moveType: \'freeScroll\' }"\n    >\n      <div\n        v-for="index in 5"\n        :key="index - 1"\n        class="flicking-panel"\n        :style="{ backgroundColor: COLORS[(index - 1) % COLORS.length] }"\n      >\n        {{ index }}\n      </div>\n    </Flicking>\n\n    <div class="progress-container">\n      <div class="progress-track">\n        <div class="progress-bar" :style="{ width: progress + \'%\' }"></div>\n      </div>\n      <div class="progress-text">\n        Progress: {{ progress.toFixed(1) }}%\n      </div>\n    </div>\n  </div>\n</template>\n',js:'import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst flicking = new Flicking("#flick", {\n  moveType: "freeScroll"\n});\nconst reactiveAPI = connectFlickingReactiveAPI(flicking);\n\nconst progressBar = document.querySelector(".progress-bar");\nconst progressText = document.querySelector(".progress-text");\n\nreactiveAPI.subscribe("progress", value => {\n  progressBar.style.width = `${value}%`;\n  progressText.textContent = `Progress: ${value.toFixed(1)}%`;\n});\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div style="width: 100%">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera">\n        <div class="flicking-panel" style="background: #3498db">1</div>\n        <div class="flicking-panel" style="background: #e74c3c">2</div>\n        <div class="flicking-panel" style="background: #2ecc71">3</div>\n        <div class="flicking-panel" style="background: #9b59b6">4</div>\n        <div class="flicking-panel" style="background: #f39c12">5</div>\n      </div>\n    </div>\n    <div class="progress-container">\n      <div class="progress-track">\n        <div class="progress-bar" style="width: 0%"></div>\n      </div>\n      <div class="progress-text">Progress: 0%</div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 150px;\n  height: 120px;\n  margin-right: 10px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  color: white;\n}\n\n.progress-container {\n  margin-top: 20px;\n  width: 100%;\n}\n\n.progress-track {\n  width: 100%;\n  height: 8px;\n  background: #ecf0f1;\n  border-radius: 4px;\n  overflow: hidden;\n}\n\n.progress-bar {\n  height: 100%;\n  background: linear-gradient(90deg, #3498db, #2ecc71);\n  border-radius: 4px;\n}\n\n.progress-text {\n  text-align: center;\n  margin-top: 10px;\n  font-size: 14px;\n  color: #7f8c8d;\n}\n"}),d={title:"Progress Bar",id:"progress-bar",slug:"/demos/reactive/progress-bar",sidebar_position:1,description:"Display scroll progress using the Reactive API's progress property",keywords:["flicking","carousel","progress","reactive","freeScroll","progress bar"]},o="Progress Bar",a={},p=[{value:"Summary",id:"summary",level:2},{value:"Key API",id:"key-api",level:3},{value:"Behavior",id:"behavior",level:3},{value:"Details",id:"details",level:2},{value:"What is progress?",id:"what-is-progress",level:3},{value:"Related Options",id:"related-options",level:3},{value:"Use Cases",id:"use-cases",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related API",id:"related-api",level:3},{value:"Related Demos",id:"related-demos",level:3}];function g(e){let s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"progress-bar",children:"Progress Bar"})}),"\n",(0,r.jsxs)(s.p,{children:["Use the ",(0,r.jsx)(s.code,{children:"progress"})," property from the Reactive API to display a visual scroll progress indicator that updates in real-time."]}),"\n",(0,r.jsx)(c,{}),"\n",(0,r.jsx)(s.h2,{id:"summary",children:"Summary"}),"\n",(0,r.jsx)(s.h3,{id:"key-api",children:"Key API"}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{children:"Property"}),(0,r.jsx)(s.th,{children:"Type"}),(0,r.jsx)(s.th,{children:"Description"})]})}),(0,r.jsx)(s.tbody,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:(0,r.jsx)(s.a,{href:"../../api/interfaces/FlickingReactiveState#progress",children:(0,r.jsx)(s.code,{children:"progress"})})}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"number"})}),(0,r.jsx)(s.td,{children:"Overall scroll progress percentage (0-100)"})]})})]}),"\n",(0,r.jsx)(s.h3,{id:"behavior",children:"Behavior"}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{children:"Position"}),(0,r.jsx)(s.th,{children:"progress"}),(0,r.jsx)(s.th,{children:"Bar Width"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Start"}),(0,r.jsx)(s.td,{children:"0"}),(0,r.jsx)(s.td,{children:"0%"})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Middle"}),(0,r.jsx)(s.td,{children:"~50"}),(0,r.jsx)(s.td,{children:"~50%"})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"End"}),(0,r.jsx)(s.td,{children:"100"}),(0,r.jsx)(s.td,{children:"100%"})]})]})]}),"\n",(0,r.jsx)(s.h2,{id:"details",children:"Details"}),"\n",(0,r.jsx)(s.h3,{id:"what-is-progress",children:"What is progress?"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"progress"})," represents the current camera position as a percentage of the total scrollable range. Combining it with ",(0,r.jsx)(s.code,{children:'moveType: "freeScroll"'})," allows continuous (non-snapping) progress updates, making it ideal for smooth progress bar animations."]}),"\n",(0,r.jsx)(s.h3,{id:"related-options",children:"Related Options"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:'moveType: "freeScroll"'})}),": Enables continuous progress changes without snapping to panel boundaries."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"bound: true"})}),": Ensures progress reaches exactly 0 at the start and 100 at the end."]}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"use-cases",children:"Use Cases"}),"\n",(0,r.jsx)(s.admonition,{title:"When to use",type:"info",children:(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Image gallery scroll progress"}),"\n",(0,r.jsx)(s.li,{children:"Onboarding step indicator"}),"\n",(0,r.jsx)(s.li,{children:"Content reading progress"}),"\n"]})}),"\n",(0,r.jsx)(s.h2,{id:"related-links",children:"Related Links"}),"\n",(0,r.jsx)(s.h3,{id:"related-api",children:"Related API"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.a,{href:"../../api/interfaces/FlickingReactiveState#progress",children:(0,r.jsx)(s.code,{children:"progress"})}),": Scroll progress percentage"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.a,{href:"../../api/functions/connectFlickingReactiveAPI",children:(0,r.jsx)(s.code,{children:"connectFlickingReactiveAPI"})}),": Connect Flicking to Reactive API"]}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.a,{href:"./pagination",children:"Pagination"}),": Dot pagination navigation"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.a,{href:"./prev-next",children:"Prev / Next"}),": Previous/Next button navigation"]}),"\n"]})]})}function h(e={}){let{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(g,{...e})}):g(e)}},90761(e,s,n){n.d(s,{A:()=>h});var i=n(65723),r=n(7210),t=n(78863);n(22155);var l=n(19612);let c="^4.11.4",d={react:{"@egjs/react-flicking":c,"@egjs/flicking":c},vue3:{"@egjs/vue3-flicking":c,"@egjs/flicking":c},vanilla:{"@egjs/flicking":c}},o=`<!DOCTYPE html>
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
`;function g({code:e,html:s,template:n="react",dependencies:r={},files:t={},css:c=""}){return(0,i.jsx)(l.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let i=c?`${p}
${c}`:p,r={"/styles.css":{code:i},...t};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:a,hidden:!0},...r};if("vue3"===n){let s;return{"/src/App.vue":{code:(s=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${s}

<style>
${i}
</style>`)},...t}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:i},"/index.html":{code:s||o},...t}})(),customSetup:{dependencies:{...d[n],...r}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function h({react:e,vue3:s,js:n,jsHtml:l,css:c,dependencies:d}){return(0,i.jsxs)(t.A,{groupId:"framework",defaultValue:"js",children:[(0,i.jsx)(r.A,{value:"js",label:"JavaScript",children:(0,i.jsx)(g,{template:"vanilla",code:n,html:l,css:c,dependencies:d})}),(0,i.jsx)(r.A,{value:"react",label:"React",children:(0,i.jsx)(g,{template:"react",code:e,css:c,dependencies:d})}),(0,i.jsx)(r.A,{value:"vue3",label:"Vue@3",children:(0,i.jsx)(g,{template:"vue3",code:s,css:c,dependencies:d})})]})}}}]);
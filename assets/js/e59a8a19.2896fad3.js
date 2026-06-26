"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["3133"],{25315(e,n,i){i.r(n),i.d(n,{metadata:()=>t,default:()=>g,frontMatter:()=>r,contentTitle:()=>d,toc:()=>h,assets:()=>o});var t=JSON.parse('{"id":"demos/reactive/pagination","title":"Pagination","description":"Build dot pagination using the Reactive API","source":"@site/docs/demos/reactive/pagination.mdx","sourceDirName":"demos/reactive","slug":"/demos/reactive/pagination","permalink":"/egjs-flicking/docs/demos/reactive/pagination","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/reactive/pagination.mdx","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"Pagination","id":"pagination","slug":"/demos/reactive/pagination","sidebar_position":2,"description":"Build dot pagination using the Reactive API","keywords":["flicking","carousel","pagination","dot","reactive","currentPanelIndex","totalPanelCount"]},"sidebar":"demosSidebar","previous":{"title":"Progress Bar","permalink":"/egjs-flicking/docs/demos/reactive/progress-bar"},"next":{"title":"Prev / Next","permalink":"/egjs-flicking/docs/demos/reactive/prev-next"}}'),l=i(65723),s=i(54187),c=i(90761);let a=()=>(0,l.jsx)(c.A,{react:'import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";\nimport React from "react";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];\n\nexport default function App() {\n  const flickingRef = React.useRef(null);\n  const { currentPanelIndex, totalPanelCount, moveTo } = useFlickingReactiveAPI(flickingRef);\n\n  return (\n    <div>\n      <Flicking ref={flickingRef}>\n        {[0, 1, 2, 3, 4].map(index => (\n          <div key={index} className="flicking-panel" style={{ backgroundColor: COLORS[index % COLORS.length] }}>\n            {index + 1}\n          </div>\n        ))}\n      </Flicking>\n\n      <div className="pagination">\n        {Array.from({ length: totalPanelCount }, (_, i) => (\n          <button\n            key={i}\n            className={`pagination-btn ${currentPanelIndex === i ? "active" : ""}`}\n            onClick={() => moveTo(i)}\n          >\n            {i + 1}\n          </button>\n        ))}\n      </div>\n    </div>\n  );\n}\n',vue3:'<script setup>\nimport Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";\nimport { ref } from "vue";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];\n\nconst flickingRef = ref(null);\nconst { currentPanelIndex, totalPanelCount, moveTo } = useFlickingReactiveAPI(flickingRef);\n<\/script>\n\n<template>\n  <div>\n    <Flicking ref="flickingRef">\n      <div\n        v-for="index in 5"\n        :key="index - 1"\n        class="flicking-panel"\n        :style="{ backgroundColor: COLORS[(index - 1) % COLORS.length] }"\n      >\n        {{ index }}\n      </div>\n    </Flicking>\n\n    <div class="pagination">\n      <button\n        v-for="i in totalPanelCount"\n        :key="i - 1"\n        :class="[\'pagination-btn\', { active: currentPanelIndex === i - 1 }]"\n        @click="moveTo(i - 1)"\n      >\n        {{ i }}\n      </button>\n    </div>\n  </div>\n</template>\n',js:'import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst flicking = new Flicking("#flick");\nconst reactiveAPI = connectFlickingReactiveAPI(flicking);\n\n// Create pagination buttons\nconst pagination = document.querySelector(".pagination");\nconst buttons = [];\n\nfor (let i = 0; i < reactiveAPI.totalPanelCount; i++) {\n  const btn = document.createElement("button");\n  btn.className = `pagination-btn${i === 0 ? " active" : ""}`;\n  btn.textContent = i + 1;\n  btn.addEventListener("click", () => reactiveAPI.moveTo(i));\n  buttons.push(btn);\n  pagination.appendChild(btn);\n}\n\n// Update active button on index change\nreactiveAPI.subscribe("currentPanelIndex", index => {\n  buttons.forEach((btn, i) => {\n    btn.classList.toggle("active", i === index);\n  });\n});\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="flick" class="flicking-viewport">\n    <div class="flicking-camera">\n      <div class="flicking-panel" style="background: #3498db">1</div>\n      <div class="flicking-panel" style="background: #e74c3c">2</div>\n      <div class="flicking-panel" style="background: #2ecc71">3</div>\n      <div class="flicking-panel" style="background: #9b59b6">4</div>\n      <div class="flicking-panel" style="background: #f39c12">5</div>\n    </div>\n  </div>\n  <div class="pagination"></div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 150px;\n  height: 120px;\n  margin-right: 10px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  color: white;\n}\n\n.pagination {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n  margin-top: 16px;\n}\n\n.pagination-btn {\n  width: 36px;\n  height: 36px;\n  border: 2px solid #3498db;\n  background: transparent;\n  color: #3498db;\n  border-radius: 50%;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: bold;\n  transition: all 0.2s;\n}\n\n.pagination-btn:hover {\n  background: #3498db;\n  color: white;\n}\n\n.pagination-btn.active {\n  background: #3498db;\n  color: white;\n}\n"}),r={title:"Pagination",id:"pagination",slug:"/demos/reactive/pagination",sidebar_position:2,description:"Build dot pagination using the Reactive API",keywords:["flicking","carousel","pagination","dot","reactive","currentPanelIndex","totalPanelCount"]},d="Pagination",o={},h=[{value:"Summary",id:"summary",level:2},{value:"Key API",id:"key-api",level:3},{value:"Behavior",id:"behavior",level:3},{value:"Details",id:"details",level:2},{value:"How It Works",id:"how-it-works",level:3},{value:"Related Options",id:"related-options",level:3},{value:"Use Cases",id:"use-cases",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related API",id:"related-api",level:3},{value:"Related Demos",id:"related-demos",level:3}];function p(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"pagination",children:"Pagination"})}),"\n",(0,l.jsxs)(n.p,{children:["Use ",(0,l.jsx)(n.code,{children:"currentPanelIndex"}),", ",(0,l.jsx)(n.code,{children:"totalPanelCount"}),", and ",(0,l.jsx)(n.code,{children:"moveTo"})," from the Reactive API to build a dot pagination UI that stays in sync with the carousel."]}),"\n",(0,l.jsx)(a,{}),"\n",(0,l.jsx)(n.h2,{id:"summary",children:"Summary"}),"\n",(0,l.jsx)(n.h3,{id:"key-api",children:"Key API"}),"\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:"Property / Method"}),(0,l.jsx)(n.th,{children:"Type"}),(0,l.jsx)(n.th,{children:"Description"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#currentpanelindex",children:(0,l.jsx)(n.code,{children:"currentPanelIndex"})})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"number"})}),(0,l.jsx)(n.td,{children:"Currently active panel index"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#totalpanelcount",children:(0,l.jsx)(n.code,{children:"totalPanelCount"})})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"number"})}),(0,l.jsx)(n.td,{children:"Total number of panels"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveMethod#moveto",children:(0,l.jsx)(n.code,{children:"moveTo"})})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"(i: number) => Promise"})}),(0,l.jsx)(n.td,{children:"Move to a specific panel"})]})]})]}),"\n",(0,l.jsx)(n.h3,{id:"behavior",children:"Behavior"}),"\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:"State"}),(0,l.jsx)(n.th,{children:"Dot Style"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"Current panel"}),(0,l.jsx)(n.td,{children:"Active (highlighted)"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"Other panels"}),(0,l.jsx)(n.td,{children:"Default, click to navigate"})]})]})]}),"\n",(0,l.jsx)(n.h2,{id:"details",children:"Details"}),"\n",(0,l.jsx)(n.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Render dot buttons based on ",(0,l.jsx)(n.code,{children:"totalPanelCount"})]}),"\n",(0,l.jsxs)(n.li,{children:["Highlight the dot matching ",(0,l.jsx)(n.code,{children:"currentPanelIndex"})]}),"\n",(0,l.jsxs)(n.li,{children:["On dot click, call ",(0,l.jsx)(n.code,{children:"moveTo(index)"})," to navigate"]}),"\n",(0,l.jsxs)(n.li,{children:["When the user drags to a new panel, ",(0,l.jsx)(n.code,{children:"currentPanelIndex"})," updates automatically and the dots re-sync"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"related-options",children:"Related Options"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:(0,l.jsx)(n.code,{children:'align: "center"'})}),": Center alignment makes pagination feel most intuitive."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:(0,l.jsx)(n.code,{children:"circular: true"})}),": In circular mode, dots cycle seamlessly as the first and last panels connect."]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"use-cases",children:"Use Cases"}),"\n",(0,l.jsx)(n.admonition,{title:"When to use",type:"info",children:(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Banner / hero slider position indicator"}),"\n",(0,l.jsx)(n.li,{children:"Image gallery page indicator"}),"\n",(0,l.jsx)(n.li,{children:"Mobile onboarding step dots"}),"\n"]})}),"\n",(0,l.jsx)(n.h2,{id:"related-links",children:"Related Links"}),"\n",(0,l.jsx)(n.h3,{id:"related-api",children:"Related API"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#currentpanelindex",children:(0,l.jsx)(n.code,{children:"currentPanelIndex"})}),": Active panel index"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveMethod#moveto",children:(0,l.jsx)(n.code,{children:"moveTo"})}),": Navigate to panel"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"./prev-next",children:"Prev / Next"}),": Previous/Next button navigation"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"./progress-bar",children:"Progress Bar"}),": Scroll progress indicator"]}),"\n"]})]})}function g(e={}){let{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}},90761(e,n,i){i.d(n,{A:()=>g});var t=i(65723),l=i(7210),s=i(78863);i(22155);var c=i(19612);let a="^4.11.4",r={react:{"@egjs/react-flicking":a,"@egjs/flicking":a},vue3:{"@egjs/vue3-flicking":a,"@egjs/flicking":a},vanilla:{"@egjs/flicking":a}},d=`<!DOCTYPE html>
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
`;function p({code:e,html:n,template:i="react",dependencies:l={},files:s={},css:a=""}){return(0,t.jsx)(c.OZ,{template:"vue3"===i?"vue":"vanilla"===i?"vanilla":"react",files:(()=>{let t=a?`${h}
${a}`:h,l={"/styles.css":{code:t},...s};if("react"===i)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...l};if("vue3"===i){let n;return{"/src/App.vue":{code:(n=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${n}

<style>
${t}
</style>`)},...s}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:t},"/index.html":{code:n||d},...s}})(),customSetup:{dependencies:{...r[i],...l}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===i?["/App.tsx","/styles.css"]:"vue3"===i?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===i?"/App.tsx":"vue3"===i?"/src/App.vue":"/src/index.js"}})}function g({react:e,vue3:n,js:i,jsHtml:c,css:a,dependencies:r}){return(0,t.jsxs)(s.A,{groupId:"framework",defaultValue:"js",children:[(0,t.jsx)(l.A,{value:"js",label:"JavaScript",children:(0,t.jsx)(p,{template:"vanilla",code:i,html:c,css:a,dependencies:r})}),(0,t.jsx)(l.A,{value:"react",label:"React",children:(0,t.jsx)(p,{template:"react",code:e,css:a,dependencies:r})}),(0,t.jsx)(l.A,{value:"vue3",label:"Vue@3",children:(0,t.jsx)(p,{template:"vue3",code:n,css:a,dependencies:r})})]})}}}]);
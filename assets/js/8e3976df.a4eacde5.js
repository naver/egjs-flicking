"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["7296"],{49929(e,n,i){i.r(n),i.d(n,{metadata:()=>t,default:()=>v,frontMatter:()=>d,contentTitle:()=>a,toc:()=>h,assets:()=>o});var t=JSON.parse('{"id":"demos/reactive/prev-next","title":"Prev / Next","description":"Build previous/next navigation buttons using the Reactive API","source":"@site/docs/demos/reactive/prev-next.mdx","sourceDirName":"demos/reactive","slug":"/demos/reactive/prev-next","permalink":"/egjs-flicking/docs/demos/reactive/prev-next","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/reactive/prev-next.mdx","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"title":"Prev / Next","id":"prev-next","slug":"/demos/reactive/prev-next","sidebar_position":3,"description":"Build previous/next navigation buttons using the Reactive API","keywords":["flicking","carousel","prev","next","navigation","reactive","isReachStart","isReachEnd"]},"sidebar":"demosSidebar","previous":{"title":"Pagination","permalink":"/egjs-flicking/docs/demos/reactive/pagination"},"next":{"title":"Parallax","permalink":"/egjs-flicking/docs/demos/reactive/parallax"}}'),s=i(65723),c=i(54187),l=i(90761);let r=()=>(0,s.jsx)(l.A,{react:'import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";\nimport React from "react";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];\n\nexport default function App() {\n  const flickingRef = React.useRef(null);\n  const { currentPanelIndex, isReachStart, isReachEnd, moveTo } = useFlickingReactiveAPI(flickingRef);\n\n  const handlePrev = () => {\n    if (!isReachStart) {\n      moveTo(currentPanelIndex - 1);\n    }\n  };\n\n  const handleNext = () => {\n    if (!isReachEnd) {\n      moveTo(currentPanelIndex + 1);\n    }\n  };\n\n  return (\n    <div>\n      <Flicking ref={flickingRef}>\n        {[0, 1, 2, 3, 4].map(index => (\n          <div key={index} className="flicking-panel" style={{ backgroundColor: COLORS[index % COLORS.length] }}>\n            {index + 1}\n          </div>\n        ))}\n      </Flicking>\n\n      <div className="controls">\n        <button className="nav-btn" onClick={handlePrev} disabled={isReachStart}>\n          Prev\n        </button>\n        <button className="nav-btn" onClick={handleNext} disabled={isReachEnd}>\n          Next\n        </button>\n      </div>\n    </div>\n  );\n}\n',vue3:'<script setup>\nimport Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";\nimport { ref } from "vue";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];\n\nconst flickingRef = ref(null);\nconst { currentPanelIndex, isReachStart, isReachEnd, moveTo } = useFlickingReactiveAPI(flickingRef);\n\nconst handlePrev = () => {\n  if (!isReachStart.value) {\n    moveTo(currentPanelIndex.value - 1);\n  }\n};\n\nconst handleNext = () => {\n  if (!isReachEnd.value) {\n    moveTo(currentPanelIndex.value + 1);\n  }\n};\n<\/script>\n\n<template>\n  <div>\n    <Flicking ref="flickingRef">\n      <div\n        v-for="index in 5"\n        :key="index - 1"\n        class="flicking-panel"\n        :style="{ backgroundColor: COLORS[(index - 1) % COLORS.length] }"\n      >\n        {{ index }}\n      </div>\n    </Flicking>\n\n    <div class="controls">\n      <button\n        class="nav-btn"\n        :disabled="isReachStart"\n        @click="handlePrev"\n      >\n        Prev\n      </button>\n      <button\n        class="nav-btn"\n        :disabled="isReachEnd"\n        @click="handleNext"\n      >\n        Next\n      </button>\n    </div>\n  </div>\n</template>\n',js:'import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst flicking = new Flicking("#flick");\nconst reactiveAPI = connectFlickingReactiveAPI(flicking);\n\nconst prevBtn = document.querySelector("#prev-btn");\nconst nextBtn = document.querySelector("#next-btn");\n\nprevBtn.addEventListener("click", () => {\n  if (!reactiveAPI.isReachStart) {\n    reactiveAPI.moveTo(flicking.index - 1);\n  }\n});\n\nnextBtn.addEventListener("click", () => {\n  if (!reactiveAPI.isReachEnd) {\n    reactiveAPI.moveTo(flicking.index + 1);\n  }\n});\n\n// Update button state\nreactiveAPI.subscribe("isReachStart", value => {\n  prevBtn.disabled = value;\n});\n\nreactiveAPI.subscribe("isReachEnd", value => {\n  nextBtn.disabled = value;\n});\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="flick" class="flicking-viewport">\n    <div class="flicking-camera">\n      <div class="flicking-panel" style="background: #3498db">1</div>\n      <div class="flicking-panel" style="background: #e74c3c">2</div>\n      <div class="flicking-panel" style="background: #2ecc71">3</div>\n      <div class="flicking-panel" style="background: #9b59b6">4</div>\n      <div class="flicking-panel" style="background: #f39c12">5</div>\n    </div>\n  </div>\n  <div class="controls">\n    <button id="prev-btn" class="nav-btn" disabled>Prev</button>\n    <button id="next-btn" class="nav-btn">Next</button>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 150px;\n  height: 120px;\n  margin-right: 10px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  color: white;\n}\n\n.controls {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 16px;\n}\n\n.nav-btn {\n  padding: 10px 24px;\n  border: none;\n  background: #3498db;\n  color: white;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: bold;\n  transition: all 0.2s;\n}\n\n.nav-btn:hover:not(:disabled) {\n  background: #2980b9;\n}\n\n.nav-btn:disabled {\n  background: #bdc3c7;\n  cursor: not-allowed;\n}\n"}),d={title:"Prev / Next",id:"prev-next",slug:"/demos/reactive/prev-next",sidebar_position:3,description:"Build previous/next navigation buttons using the Reactive API",keywords:["flicking","carousel","prev","next","navigation","reactive","isReachStart","isReachEnd"]},a="Prev / Next",o={},h=[{value:"Summary",id:"summary",level:2},{value:"Key API",id:"key-api",level:3},{value:"Button States",id:"button-states",level:3},{value:"Details",id:"details",level:2},{value:"How It Works",id:"how-it-works",level:3},{value:"Related Options",id:"related-options",level:3},{value:"Use Cases",id:"use-cases",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related API",id:"related-api",level:3},{value:"Related Demos",id:"related-demos",level:3}];function x(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,c.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"prev--next",children:"Prev / Next"})}),"\n",(0,s.jsxs)(n.p,{children:["Use ",(0,s.jsx)(n.code,{children:"isReachStart"}),", ",(0,s.jsx)(n.code,{children:"isReachEnd"}),", and ",(0,s.jsx)(n.code,{children:"moveTo"})," from the Reactive API to build navigation buttons that automatically disable at the carousel boundaries."]}),"\n",(0,s.jsx)(r,{}),"\n",(0,s.jsx)(n.h2,{id:"summary",children:"Summary"}),"\n",(0,s.jsx)(n.h3,{id:"key-api",children:"Key API"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Property / Method"}),(0,s.jsx)(n.th,{children:"Type"}),(0,s.jsx)(n.th,{children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#isreachstart",children:(0,s.jsx)(n.code,{children:"isReachStart"})})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"boolean"})}),(0,s.jsx)(n.td,{children:"Whether the first panel is active"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#isreachend",children:(0,s.jsx)(n.code,{children:"isReachEnd"})})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"boolean"})}),(0,s.jsx)(n.td,{children:"Whether the last panel is active"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#currentpanelindex",children:(0,s.jsx)(n.code,{children:"currentPanelIndex"})})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"number"})}),(0,s.jsx)(n.td,{children:"Currently active panel index"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveMethod#moveto",children:(0,s.jsx)(n.code,{children:"moveTo"})})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"(i: number) => Promise"})}),(0,s.jsx)(n.td,{children:"Move to a specific panel"})]})]})]}),"\n",(0,s.jsx)(n.h3,{id:"button-states",children:"Button States"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Position"}),(0,s.jsx)(n.th,{children:"Prev Button"}),(0,s.jsx)(n.th,{children:"Next Button"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsxs)(n.td,{children:["First panel (",(0,s.jsx)(n.code,{children:"isReachStart"}),")"]}),(0,s.jsx)(n.td,{children:"disabled"}),(0,s.jsx)(n.td,{children:"enabled"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"Middle panel"}),(0,s.jsx)(n.td,{children:"enabled"}),(0,s.jsx)(n.td,{children:"enabled"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsxs)(n.td,{children:["Last panel (",(0,s.jsx)(n.code,{children:"isReachEnd"}),")"]}),(0,s.jsx)(n.td,{children:"enabled"}),(0,s.jsx)(n.td,{children:"disabled"})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"details",children:"Details"}),"\n",(0,s.jsx)(n.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Disable the Prev button when ",(0,s.jsx)(n.code,{children:"isReachStart"})," is ",(0,s.jsx)(n.code,{children:"true"})]}),"\n",(0,s.jsxs)(n.li,{children:["Disable the Next button when ",(0,s.jsx)(n.code,{children:"isReachEnd"})," is ",(0,s.jsx)(n.code,{children:"true"})]}),"\n",(0,s.jsxs)(n.li,{children:["Prev click: ",(0,s.jsx)(n.code,{children:"moveTo(currentPanelIndex - 1)"})]}),"\n",(0,s.jsxs)(n.li,{children:["Next click: ",(0,s.jsx)(n.code,{children:"moveTo(currentPanelIndex + 1)"})]}),"\n",(0,s.jsx)(n.li,{children:"Button states auto-sync when the user drags to a new panel"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"related-options",children:"Related Options"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"circular: true"})}),": In circular mode, ",(0,s.jsx)(n.code,{children:"isReachStart"})," and ",(0,s.jsx)(n.code,{children:"isReachEnd"})," are always ",(0,s.jsx)(n.code,{children:"false"}),", so both buttons remain enabled at all times."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"use-cases",children:"Use Cases"}),"\n",(0,s.jsx)(n.admonition,{title:"When to use",type:"info",children:(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Desktop carousels where drag is less discoverable"}),"\n",(0,s.jsx)(n.li,{children:"Accessibility (a11y) keyboard/button navigation"}),"\n",(0,s.jsx)(n.li,{children:"Touch-disabled environments"}),"\n"]})}),"\n",(0,s.jsx)(n.h2,{id:"related-links",children:"Related Links"}),"\n",(0,s.jsx)(n.h3,{id:"related-api",children:"Related API"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#isreachstart",children:(0,s.jsx)(n.code,{children:"isReachStart"})}),": Start boundary flag"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#isreachend",children:(0,s.jsx)(n.code,{children:"isReachEnd"})}),": End boundary flag"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"./pagination",children:"Pagination"}),": Dot pagination"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"./progress-bar",children:"Progress Bar"}),": Scroll progress indicator"]}),"\n"]})]})}function v(e={}){let{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}},90761(e,n,i){i.d(n,{A:()=>v});var t=i(65723),s=i(7210),c=i(78863);i(22155);var l=i(19612);let r="^4.11.4",d={react:{"@egjs/react-flicking":r,"@egjs/flicking":r},vue3:{"@egjs/vue3-flicking":r,"@egjs/flicking":r},vanilla:{"@egjs/flicking":r}},a=`<!DOCTYPE html>
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
`;function x({code:e,html:n,template:i="react",dependencies:s={},files:c={},css:r=""}){return(0,t.jsx)(l.OZ,{template:"vue3"===i?"vue":"vanilla"===i?"vanilla":"react",files:(()=>{let t=r?`${h}
${r}`:h,s={"/styles.css":{code:t},...c};if("react"===i)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...s};if("vue3"===i){let n;return{"/src/App.vue":{code:(n=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${n}

<style>
${t}
</style>`)},...c}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:t},"/index.html":{code:n||a},...c}})(),customSetup:{dependencies:{...d[i],...s}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===i?["/App.tsx","/styles.css"]:"vue3"===i?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===i?"/App.tsx":"vue3"===i?"/src/App.vue":"/src/index.js"}})}function v({react:e,vue3:n,js:i,jsHtml:l,css:r,dependencies:d}){return(0,t.jsxs)(c.A,{groupId:"framework",defaultValue:"js",children:[(0,t.jsx)(s.A,{value:"js",label:"JavaScript",children:(0,t.jsx)(x,{template:"vanilla",code:i,html:l,css:r,dependencies:d})}),(0,t.jsx)(s.A,{value:"react",label:"React",children:(0,t.jsx)(x,{template:"react",code:e,css:r,dependencies:d})}),(0,t.jsx)(s.A,{value:"vue3",label:"Vue@3",children:(0,t.jsx)(x,{template:"vue3",code:n,css:r,dependencies:d})})]})}}}]);
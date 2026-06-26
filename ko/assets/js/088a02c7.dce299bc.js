"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4343"],{17651(e,n,i){i.r(n),i.d(n,{metadata:()=>s,default:()=>h,frontMatter:()=>d,contentTitle:()=>o,toc:()=>p,assets:()=>a});var s=JSON.parse('{"id":"demos/reactive/progress-bar","title":"Progress Bar","description":"Reactive API\uC758 progress \uC18D\uC131\uC744 \uD65C\uC6A9\uD55C \uC2A4\uD06C\uB864 \uC9C4\uD589\uB960 \uD45C\uC2DC","source":"@site/i18n/ko/docusaurus-plugin-content-docs/current/demos/reactive/progress-bar.mdx","sourceDirName":"demos/reactive","slug":"/demos/reactive/progress-bar","permalink":"/egjs-flicking/ko/docs/demos/reactive/progress-bar","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/reactive/progress-bar.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"title":"Progress Bar","id":"progress-bar","slug":"/demos/reactive/progress-bar","sidebar_position":1,"description":"Reactive API\uC758 progress \uC18D\uC131\uC744 \uD65C\uC6A9\uD55C \uC2A4\uD06C\uB864 \uC9C4\uD589\uB960 \uD45C\uC2DC","keywords":["flicking","carousel","progress","reactive","freeScroll","progress bar","\uC9C4\uD589\uB960","\uD504\uB85C\uADF8\uB808\uC2A4 \uBC14","\uCE90\uB7EC\uC140"]},"sidebar":"demosSidebar","previous":{"title":"Observe Panel Resize","permalink":"/egjs-flicking/ko/docs/demos/advanced/observe-panel-resize"},"next":{"title":"Pagination","permalink":"/egjs-flicking/ko/docs/demos/reactive/pagination"}}'),r=i(65723),c=i(54187),t=i(90761);let l=()=>(0,r.jsx)(t.A,{react:'import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";\nimport React from "react";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];\n\nexport default function App() {\n  const flickingRef = React.useRef(null);\n  const { progress } = useFlickingReactiveAPI(flickingRef);\n\n  return (\n    <div style={{ width: "100%" }}>\n      <Flicking ref={flickingRef} moveType="freeScroll">\n        {[0, 1, 2, 3, 4].map(index => (\n          <div key={index} className="flicking-panel" style={{ backgroundColor: COLORS[index % COLORS.length] }}>\n            {index + 1}\n          </div>\n        ))}\n      </Flicking>\n\n      <div className="progress-container">\n        <div className="progress-track">\n          <div className="progress-bar" style={{ width: `${progress}%` }} />\n        </div>\n        <div className="progress-text">Progress: {progress.toFixed(1)}%</div>\n      </div>\n    </div>\n  );\n}\n',vue3:'<script setup>\nimport Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";\nimport { ref } from "vue";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];\n\nconst flickingRef = ref(null);\nconst { progress } = useFlickingReactiveAPI(flickingRef);\n<\/script>\n\n<template>\n  <div style="width: 100%">\n    <Flicking\n      ref="flickingRef"\n      :options="{ moveType: \'freeScroll\' }"\n    >\n      <div\n        v-for="index in 5"\n        :key="index - 1"\n        class="flicking-panel"\n        :style="{ backgroundColor: COLORS[(index - 1) % COLORS.length] }"\n      >\n        {{ index }}\n      </div>\n    </Flicking>\n\n    <div class="progress-container">\n      <div class="progress-track">\n        <div class="progress-bar" :style="{ width: progress + \'%\' }"></div>\n      </div>\n      <div class="progress-text">\n        Progress: {{ progress.toFixed(1) }}%\n      </div>\n    </div>\n  </div>\n</template>\n',js:'import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst flicking = new Flicking("#flick", {\n  moveType: "freeScroll"\n});\nconst reactiveAPI = connectFlickingReactiveAPI(flicking);\n\nconst progressBar = document.querySelector(".progress-bar");\nconst progressText = document.querySelector(".progress-text");\n\nreactiveAPI.subscribe("progress", value => {\n  progressBar.style.width = `${value}%`;\n  progressText.textContent = `Progress: ${value.toFixed(1)}%`;\n});\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div style="width: 100%">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera">\n        <div class="flicking-panel" style="background: #3498db">1</div>\n        <div class="flicking-panel" style="background: #e74c3c">2</div>\n        <div class="flicking-panel" style="background: #2ecc71">3</div>\n        <div class="flicking-panel" style="background: #9b59b6">4</div>\n        <div class="flicking-panel" style="background: #f39c12">5</div>\n      </div>\n    </div>\n    <div class="progress-container">\n      <div class="progress-track">\n        <div class="progress-bar" style="width: 0%"></div>\n      </div>\n      <div class="progress-text">Progress: 0%</div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 150px;\n  height: 120px;\n  margin-right: 10px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  color: white;\n}\n\n.progress-container {\n  margin-top: 20px;\n  width: 100%;\n}\n\n.progress-track {\n  width: 100%;\n  height: 8px;\n  background: #ecf0f1;\n  border-radius: 4px;\n  overflow: hidden;\n}\n\n.progress-bar {\n  height: 100%;\n  background: linear-gradient(90deg, #3498db, #2ecc71);\n  border-radius: 4px;\n}\n\n.progress-text {\n  text-align: center;\n  margin-top: 10px;\n  font-size: 14px;\n  color: #7f8c8d;\n}\n"}),d={title:"Progress Bar",id:"progress-bar",slug:"/demos/reactive/progress-bar",sidebar_position:1,description:"Reactive API\uC758 progress \uC18D\uC131\uC744 \uD65C\uC6A9\uD55C \uC2A4\uD06C\uB864 \uC9C4\uD589\uB960 \uD45C\uC2DC",keywords:["flicking","carousel","progress","reactive","freeScroll","progress bar","\uC9C4\uD589\uB960","\uD504\uB85C\uADF8\uB808\uC2A4 \uBC14","\uCE90\uB7EC\uC140"]},o="Progress Bar",a={},p=[{value:"\uC694\uC57D",id:"\uC694\uC57D",level:2},{value:"\uC8FC\uC694 API",id:"\uC8FC\uC694-api",level:3},{value:"\uB3D9\uC791",id:"\uB3D9\uC791",level:3},{value:"\uC0C1\uC138 \uC124\uBA85",id:"\uC0C1\uC138-\uC124\uBA85",level:2},{value:"progress\uB780?",id:"progress\uB780",level:3},{value:"\uAD00\uB828 \uC635\uC158",id:"\uAD00\uB828-\uC635\uC158",level:3},{value:"\uC0AC\uC6A9 \uC2DC\uB098\uB9AC\uC624",id:"\uC0AC\uC6A9-\uC2DC\uB098\uB9AC\uC624",level:3},{value:"\uAD00\uB828 \uB9C1\uD06C",id:"\uAD00\uB828-\uB9C1\uD06C",level:2},{value:"\uAD00\uB828 API",id:"\uAD00\uB828-api",level:3},{value:"\uAD00\uB828 \uB370\uBAA8",id:"\uAD00\uB828-\uB370\uBAA8",level:3}];function g(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,c.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"progress-bar",children:"Progress Bar"})}),"\n",(0,r.jsxs)(n.p,{children:["Reactive API\uC758 ",(0,r.jsx)(n.code,{children:"progress"})," \uC18D\uC131\uC744 \uC0AC\uC6A9\uD558\uC5EC \uC2E4\uC2DC\uAC04\uC73C\uB85C \uC5C5\uB370\uC774\uD2B8\uB418\uB294 \uC2DC\uAC01\uC801 \uC2A4\uD06C\uB864 \uC9C4\uD589\uB960 \uD45C\uC2DC\uAE30\uB97C \uAD6C\uD604\uD569\uB2C8\uB2E4."]}),"\n",(0,r.jsx)(l,{}),"\n",(0,r.jsx)(n.h2,{id:"\uC694\uC57D",children:"\uC694\uC57D"}),"\n",(0,r.jsx)(n.h3,{id:"\uC8FC\uC694-api",children:"\uC8FC\uC694 API"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"\uC18D\uC131"}),(0,r.jsx)(n.th,{children:"\uD0C0\uC785"}),(0,r.jsx)(n.th,{children:"\uC124\uBA85"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#progress",children:(0,r.jsx)(n.code,{children:"progress"})})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"number"})}),(0,r.jsx)(n.td,{children:"\uC804\uCCB4 \uC2A4\uD06C\uB864 \uC9C4\uD589\uB960 \uBC31\uBD84\uC728 (0-100)"})]})})]}),"\n",(0,r.jsx)(n.h3,{id:"\uB3D9\uC791",children:"\uB3D9\uC791"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"\uC704\uCE58"}),(0,r.jsx)(n.th,{children:"progress"}),(0,r.jsx)(n.th,{children:"\uBC14 \uB108\uBE44"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"\uC2DC\uC791"}),(0,r.jsx)(n.td,{children:"0"}),(0,r.jsx)(n.td,{children:"0%"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"\uC911\uAC04"}),(0,r.jsx)(n.td,{children:"~50"}),(0,r.jsx)(n.td,{children:"~50%"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"\uB05D"}),(0,r.jsx)(n.td,{children:"100"}),(0,r.jsx)(n.td,{children:"100%"})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"\uC0C1\uC138-\uC124\uBA85",children:"\uC0C1\uC138 \uC124\uBA85"}),"\n",(0,r.jsx)(n.h3,{id:"progress\uB780",children:"progress\uB780?"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"progress"}),"\uB294 \uD604\uC7AC \uCE74\uBA54\uB77C \uC704\uCE58\uB97C \uC804\uCCB4 \uC2A4\uD06C\uB864 \uAC00\uB2A5 \uBC94\uC704\uC758 \uBC31\uBD84\uC728\uB85C \uB098\uD0C0\uB0C5\uB2C8\uB2E4. ",(0,r.jsx)(n.code,{children:'moveType: "freeScroll"'}),"\uACFC \uD568\uAED8 \uC0AC\uC6A9\uD558\uBA74 \uC2A4\uB0C5 \uC5C6\uC774 \uC5F0\uC18D\uC801\uC778 \uC9C4\uD589\uB960 \uC5C5\uB370\uC774\uD2B8\uAC00 \uAC00\uB2A5\uD558\uC5EC \uBD80\uB4DC\uB7EC\uC6B4 \uD504\uB85C\uADF8\uB808\uC2A4 \uBC14 \uC560\uB2C8\uBA54\uC774\uC158\uC5D0 \uC774\uC0C1\uC801\uC785\uB2C8\uB2E4."]}),"\n",(0,r.jsx)(n.h3,{id:"\uAD00\uB828-\uC635\uC158",children:"\uAD00\uB828 \uC635\uC158"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:'moveType: "freeScroll"'})}),": \uD328\uB110 \uACBD\uACC4\uC5D0 \uC2A4\uB0C5\uD558\uC9C0 \uC54A\uACE0 \uC5F0\uC18D\uC801\uC778 \uC9C4\uD589\uB960 \uBCC0\uD654\uB97C \uAC00\uB2A5\uD558\uAC8C \uD569\uB2C8\uB2E4."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"bound: true"})}),": \uC2DC\uC791 \uC9C0\uC810\uC5D0\uC11C \uC815\uD655\uD788 0, \uB05D \uC9C0\uC810\uC5D0\uC11C \uC815\uD655\uD788 100\uC774 \uB418\uB3C4\uB85D \uBCF4\uC7A5\uD569\uB2C8\uB2E4."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"\uC0AC\uC6A9-\uC2DC\uB098\uB9AC\uC624",children:"\uC0AC\uC6A9 \uC2DC\uB098\uB9AC\uC624"}),"\n",(0,r.jsx)(n.admonition,{title:"\uC774\uB7F0 \uACBD\uC6B0\uC5D0 \uC0AC\uC6A9\uD558\uC138\uC694",type:"info",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\uC774\uBBF8\uC9C0 \uAC24\uB7EC\uB9AC \uC2A4\uD06C\uB864 \uC9C4\uD589\uB960"}),"\n",(0,r.jsx)(n.li,{children:"\uC628\uBCF4\uB529 \uB2E8\uACC4 \uD45C\uC2DC\uAE30"}),"\n",(0,r.jsx)(n.li,{children:"\uCF58\uD150\uCE20 \uC77D\uAE30 \uC9C4\uD589\uB960"}),"\n"]})}),"\n",(0,r.jsx)(n.h2,{id:"\uAD00\uB828-\uB9C1\uD06C",children:"\uAD00\uB828 \uB9C1\uD06C"}),"\n",(0,r.jsx)(n.h3,{id:"\uAD00\uB828-api",children:"\uAD00\uB828 API"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#progress",children:(0,r.jsx)(n.code,{children:"progress"})}),": \uC2A4\uD06C\uB864 \uC9C4\uD589\uB960 \uBC31\uBD84\uC728"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"../../api/functions/connectFlickingReactiveAPI",children:(0,r.jsx)(n.code,{children:"connectFlickingReactiveAPI"})}),": Flicking\uC744 Reactive API\uC5D0 \uC5F0\uACB0"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"\uAD00\uB828-\uB370\uBAA8",children:"\uAD00\uB828 \uB370\uBAA8"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"./pagination",children:"Pagination"}),": \uB3C4\uD2B8 \uD398\uC774\uC9C0\uB124\uC774\uC158 \uB124\uBE44\uAC8C\uC774\uC158"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"./prev-next",children:"Prev / Next"}),": \uC774\uC804/\uB2E4\uC74C \uBC84\uD2BC \uB124\uBE44\uAC8C\uC774\uC158"]}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(g,{...e})}):g(e)}},90761(e,n,i){i.d(n,{A:()=>h});var s=i(65723),r=i(7210),c=i(78863);i(22155);var t=i(19612);let l="^4.11.4",d={react:{"@egjs/react-flicking":l,"@egjs/flicking":l},vue3:{"@egjs/vue3-flicking":l,"@egjs/flicking":l},vanilla:{"@egjs/flicking":l}},o=`<!DOCTYPE html>
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
`;function g({code:e,html:n,template:i="react",dependencies:r={},files:c={},css:l=""}){return(0,s.jsx)(t.OZ,{template:"vue3"===i?"vue":"vanilla"===i?"vanilla":"react",files:(()=>{let s=l?`${p}
${l}`:p,r={"/styles.css":{code:s},...c};if("react"===i)return{"/App.tsx":{code:e},"/index.js":{code:a,hidden:!0},...r};if("vue3"===i){let n;return{"/src/App.vue":{code:(n=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${n}

<style>
${s}
</style>`)},...c}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:n||o},...c}})(),customSetup:{dependencies:{...d[i],...r}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===i?["/App.tsx","/styles.css"]:"vue3"===i?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===i?"/App.tsx":"vue3"===i?"/src/App.vue":"/src/index.js"}})}function h({react:e,vue3:n,js:i,jsHtml:t,css:l,dependencies:d}){return(0,s.jsxs)(c.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(r.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(g,{template:"vanilla",code:i,html:t,css:l,dependencies:d})}),(0,s.jsx)(r.A,{value:"react",label:"React",children:(0,s.jsx)(g,{template:"react",code:e,css:l,dependencies:d})}),(0,s.jsx)(r.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(g,{template:"vue3",code:n,css:l,dependencies:d})})]})}}}]);
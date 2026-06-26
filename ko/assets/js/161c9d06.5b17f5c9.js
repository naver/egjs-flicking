"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4392"],{61387(e,n,i){i.r(n),i.d(n,{metadata:()=>s,default:()=>u,frontMatter:()=>o,contentTitle:()=>d,toc:()=>g,assets:()=>p});var s=JSON.parse('{"id":"demos/plugins/arrow","title":"Arrow","description":"\uC774\uC804/\uB2E4\uC74C \uD328\uB110\uB85C \uC774\uB3D9\uD558\uB294 \uD654\uC0B4\uD45C \uB124\uBE44\uAC8C\uC774\uC158 \uBC84\uD2BC\uC744 \uCD94\uAC00\uD558\uB294 \uD50C\uB7EC\uADF8\uC778","source":"@site/i18n/ko/docusaurus-plugin-content-docs/current/demos/plugins/arrow.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/arrow","permalink":"/egjs-flicking/ko/docs/demos/plugins/arrow","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/arrow.mdx","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"title":"Arrow","id":"arrow","slug":"/demos/plugins/arrow","sidebar_position":5,"description":"\uC774\uC804/\uB2E4\uC74C \uD328\uB110\uB85C \uC774\uB3D9\uD558\uB294 \uD654\uC0B4\uD45C \uB124\uBE44\uAC8C\uC774\uC158 \uBC84\uD2BC\uC744 \uCD94\uAC00\uD558\uB294 \uD50C\uB7EC\uADF8\uC778","keywords":["flicking","plugin","arrow","navigation","prev","next"]},"sidebar":"demosSidebar","previous":{"title":"Perspective","permalink":"/egjs-flicking/ko/docs/demos/plugins/perspective"},"next":{"title":"Pagination","permalink":"/egjs-flicking/ko/docs/demos/plugins/pagination"}}'),r=i(65723),l=i(54187),c=i(90761);let t={"@egjs/flicking-plugins":"^4.6.0"},a=()=>(0,r.jsx)(c.A,{react:'import { Arrow } from "@egjs/flicking-plugins";\nimport Flicking, { ViewportSlot } from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/arrow.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Arrow()];\n\nexport default function App() {\n  return (\n    <Flicking circular={true} plugins={plugins}>\n      {COLORS.map((color, i) => (\n        <div className="flicking-panel" key={i} style={{ background: color }}>\n          {i + 1}\n        </div>\n      ))}\n      <ViewportSlot>\n        <span className="flicking-arrow-prev"></span>\n        <span className="flicking-arrow-next"></span>\n      </ViewportSlot>\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ circular: true }" :plugins="plugins">\n    <div v-for="(color, i) in COLORS" :key="i"\n         class="flicking-panel"\n         :style="{ background: color }">\n      {{ i + 1 }}\n    </div>\n    <template #viewport>\n      <span class="flicking-arrow-prev"></span>\n      <span class="flicking-arrow-next"></span>\n    </template>\n  </Flicking>\n</template>\n\n<script setup>\nimport { Arrow } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/arrow.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Arrow()];\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport { Arrow } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "@egjs/flicking-plugins/dist/arrow.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\n\nconst camera = document.querySelector(".flicking-camera");\nCOLORS.forEach((color, i) => {\n  const panel = document.createElement("div");\n  panel.className = "flicking-panel";\n  panel.style.background = color;\n  panel.textContent = i + 1;\n  camera.appendChild(panel);\n});\n\nconst flicking = new Flicking("#flick", {\n  circular: true\n});\n\nflicking.addPlugins(new Arrow());\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="app">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera"></div>\n      <span class="flicking-arrow-prev"></span>\n      <span class="flicking-arrow-next"></span>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 50%;\n  height: 200px;\n  margin: 0 5px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  color: white;\n}\n\n.flicking-viewport {\n  padding: 0 40px;\n}\n",dependencies:t}),o={title:"Arrow",id:"arrow",slug:"/demos/plugins/arrow",sidebar_position:5,description:"\uC774\uC804/\uB2E4\uC74C \uD328\uB110\uB85C \uC774\uB3D9\uD558\uB294 \uD654\uC0B4\uD45C \uB124\uBE44\uAC8C\uC774\uC158 \uBC84\uD2BC\uC744 \uCD94\uAC00\uD558\uB294 \uD50C\uB7EC\uADF8\uC778",keywords:["flicking","plugin","arrow","navigation","prev","next"]},d="Arrow",p={},g=[{value:"\uC694\uC57D",id:"\uC694\uC57D",level:2},{value:"\uC8FC\uC694 \uC635\uC158",id:"\uC8FC\uC694-\uC635\uC158",level:3},{value:"\uD544\uC218 CSS",id:"\uD544\uC218-css",level:3},{value:"\uC0C1\uC138 \uC124\uBA85",id:"\uC0C1\uC138-\uC124\uBA85",level:2},{value:"\uB3D9\uC791 \uC6D0\uB9AC",id:"\uB3D9\uC791-\uC6D0\uB9AC",level:3},{value:"HTML \uAD6C\uC870",id:"html-\uAD6C\uC870",level:3},{value:"\uD504\uB808\uC784\uC6CC\uD06C\uBCC4 \uC0AC\uC6A9\uBC95",id:"\uD504\uB808\uC784\uC6CC\uD06C\uBCC4-\uC0AC\uC6A9\uBC95",level:3},{value:"\uC8FC\uC758\uC0AC\uD56D",id:"\uC8FC\uC758\uC0AC\uD56D",level:3},{value:"\uAD00\uB828 \uB9C1\uD06C",id:"\uAD00\uB828-\uB9C1\uD06C",level:2},{value:"\uAD00\uB828 \uB370\uBAA8",id:"\uAD00\uB828-\uB370\uBAA8",level:3}];function h(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"arrow",children:"Arrow"})}),"\n",(0,r.jsx)(n.p,{children:"\uC774\uC804/\uB2E4\uC74C \uD328\uB110\uB85C \uC774\uB3D9\uD558\uB294 \uD654\uC0B4\uD45C \uB124\uBE44\uAC8C\uC774\uC158 \uBC84\uD2BC\uC744 \uCD94\uAC00\uD569\uB2C8\uB2E4."}),"\n",(0,r.jsx)(a,{}),"\n",(0,r.jsx)(n.h2,{id:"\uC694\uC57D",children:"\uC694\uC57D"}),"\n",(0,r.jsx)(n.h3,{id:"\uC8FC\uC694-\uC635\uC158",children:"\uC8FC\uC694 \uC635\uC158"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"\uC635\uC158"}),(0,r.jsx)(n.th,{children:"\uD0C0\uC785"}),(0,r.jsx)(n.th,{children:"\uAE30\uBCF8\uAC12"}),(0,r.jsx)(n.th,{children:"\uC124\uBA85"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"parentEl"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"HTMLElement"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"\uD654\uC0B4\uD45C \uBC84\uD2BC\uC758 \uBD80\uBAA8 \uC694\uC18C. \uAE30\uBCF8\uC801\uC73C\uB85C \uBDF0\uD3EC\uD2B8 \uB0B4\uBD80\uC5D0 \uBC30\uCE58"})]})})]}),"\n",(0,r.jsx)(n.h3,{id:"\uD544\uC218-css",children:"\uD544\uC218 CSS"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'import "@egjs/flicking-plugins/dist/arrow.css";\n'})}),"\n",(0,r.jsx)(n.h2,{id:"\uC0C1\uC138-\uC124\uBA85",children:"\uC0C1\uC138 \uC124\uBA85"}),"\n",(0,r.jsx)(n.h3,{id:"\uB3D9\uC791-\uC6D0\uB9AC",children:"\uB3D9\uC791 \uC6D0\uB9AC"}),"\n",(0,r.jsxs)(n.p,{children:["Arrow \uD50C\uB7EC\uADF8\uC778\uC740 ",(0,r.jsx)(n.code,{children:".flicking-arrow-prev"}),"\uC640 ",(0,r.jsx)(n.code,{children:".flicking-arrow-next"})," \uD074\uB798\uC2A4\uB97C \uAC00\uC9C4 \uC694\uC18C\uB97C \uCC3E\uC544 \uC774\uC804/\uB2E4\uC74C \uD328\uB110\uB85C \uC774\uB3D9\uD558\uB294 \uD074\uB9AD \uC774\uBCA4\uD2B8\uB97C \uBC14\uC778\uB529\uD569\uB2C8\uB2E4."]}),"\n",(0,r.jsx)(n.h3,{id:"html-\uAD6C\uC870",children:"HTML \uAD6C\uC870"}),"\n",(0,r.jsx)(n.p,{children:"\uD654\uC0B4\uD45C \uC694\uC18C\uB97C \uBDF0\uD3EC\uD2B8 \uB0B4\uBD80\uC5D0 \uBC30\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-html",children:'<div class="flicking-viewport">\n  <div class="flicking-camera">\n    \x3c!-- \uD328\uB110\uB4E4 --\x3e\n  </div>\n  <span class="flicking-arrow-prev"></span>\n  <span class="flicking-arrow-next"></span>\n</div>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"\uD504\uB808\uC784\uC6CC\uD06C\uBCC4-\uC0AC\uC6A9\uBC95",children:"\uD504\uB808\uC784\uC6CC\uD06C\uBCC4 \uC0AC\uC6A9\uBC95"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"React"})," \u2014 ",(0,r.jsx)(n.code,{children:"ViewportSlot"}),"\uC744 \uC0AC\uC6A9\uD558\uC5EC \uBDF0\uD3EC\uD2B8 \uB0B4\uBD80\uC5D0 \uD654\uC0B4\uD45C\uB97C \uBC30\uCE58\uD569\uB2C8\uB2E4:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Flicking plugins={plugins}>\n  {/* \uD328\uB110\uB4E4 */}\n  <ViewportSlot>\n    <span className="flicking-arrow-prev"></span>\n    <span className="flicking-arrow-next"></span>\n  </ViewportSlot>\n</Flicking>\n'})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Vue"})," \u2014 ",(0,r.jsx)(n.code,{children:"#viewport"})," \uC2AC\uB86F\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-html",children:'<Flicking :plugins="plugins">\n  \x3c!-- \uD328\uB110\uB4E4 --\x3e\n  <template #viewport>\n    <span class="flicking-arrow-prev"></span>\n    <span class="flicking-arrow-next"></span>\n  </template>\n</Flicking>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"\uC8FC\uC758\uC0AC\uD56D",children:"\uC8FC\uC758\uC0AC\uD56D"}),"\n",(0,r.jsx)(n.admonition,{title:"\uC8FC\uC758",type:"warning",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\uBC18\uB4DC\uC2DC ",(0,r.jsx)(n.code,{children:"@egjs/flicking-plugins/dist/arrow.css"}),"\uB97C import\uD574\uC57C \uD654\uC0B4\uD45C\uAC00 \uC62C\uBC14\uB974\uAC8C \uD45C\uC2DC\uB429\uB2C8\uB2E4."]}),"\n",(0,r.jsxs)(n.li,{children:["\uD654\uC0B4\uD45C \uC694\uC18C\uB294 ",(0,r.jsx)(n.code,{children:".flicking-viewport"})," \uB0B4\uBD80\uC5D0 \uC704\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4."]}),"\n"]})}),"\n",(0,r.jsx)(n.h2,{id:"\uAD00\uB828-\uB9C1\uD06C",children:"\uAD00\uB828 \uB9C1\uD06C"}),"\n",(0,r.jsx)(n.h3,{id:"\uAD00\uB828-\uB370\uBAA8",children:"\uAD00\uB828 \uB370\uBAA8"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"./pagination",children:"Pagination"}),": \uD398\uC774\uC9C0 \uC778\uB514\uCF00\uC774\uD130"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"../reactive/prev-next",children:"Prev/Next"}),": \uCEE4\uC2A4\uD140 \uB124\uBE44\uAC8C\uC774\uC158"]}),"\n"]})]})}function u(e={}){let{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},90761(e,n,i){i.d(n,{A:()=>h});var s=i(65723),r=i(7210),l=i(78863);i(22155);var c=i(19612);let t="^4.11.4",a={react:{"@egjs/react-flicking":t,"@egjs/flicking":t},vue3:{"@egjs/vue3-flicking":t,"@egjs/flicking":t},vanilla:{"@egjs/flicking":t}},o=`<!DOCTYPE html>
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
`;function g({code:e,html:n,template:i="react",dependencies:r={},files:l={},css:t=""}){return(0,s.jsx)(c.OZ,{template:"vue3"===i?"vue":"vanilla"===i?"vanilla":"react",files:(()=>{let s=t?`${p}
${t}`:p,r={"/styles.css":{code:s},...l};if("react"===i)return{"/App.tsx":{code:e},"/index.js":{code:d,hidden:!0},...r};if("vue3"===i){let n;return{"/src/App.vue":{code:(n=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${n}

<style>
${s}
</style>`)},...l}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:n||o},...l}})(),customSetup:{dependencies:{...a[i],...r}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===i?["/App.tsx","/styles.css"]:"vue3"===i?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===i?"/App.tsx":"vue3"===i?"/src/App.vue":"/src/index.js"}})}function h({react:e,vue3:n,js:i,jsHtml:c,css:t,dependencies:a}){return(0,s.jsxs)(l.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(r.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(g,{template:"vanilla",code:i,html:c,css:t,dependencies:a})}),(0,s.jsx)(r.A,{value:"react",label:"React",children:(0,s.jsx)(g,{template:"react",code:e,css:t,dependencies:a})}),(0,s.jsx)(r.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(g,{template:"vue3",code:n,css:t,dependencies:a})})]})}}}]);
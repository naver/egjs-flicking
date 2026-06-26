"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["7413"],{25537(e,i,n){n.r(i),n.d(i,{metadata:()=>s,default:()=>u,frontMatter:()=>o,contentTitle:()=>a,toc:()=>g,assets:()=>p});var s=JSON.parse('{"id":"demos/plugins/perspective","title":"Perspective","description":"\uD328\uB110\uC5D0 3D \uC6D0\uADFC \uD68C\uC804 \uD6A8\uACFC\uB97C \uC801\uC6A9\uD558\uB294 \uD50C\uB7EC\uADF8\uC778","source":"@site/i18n/ko/docusaurus-plugin-content-docs/current/demos/plugins/perspective.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/perspective","permalink":"/egjs-flicking/ko/docs/demos/plugins/perspective","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/perspective.mdx","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"title":"Perspective","id":"perspective","slug":"/demos/plugins/perspective","sidebar_position":4,"description":"\uD328\uB110\uC5D0 3D \uC6D0\uADFC \uD68C\uC804 \uD6A8\uACFC\uB97C \uC801\uC6A9\uD558\uB294 \uD50C\uB7EC\uADF8\uC778","keywords":["flicking","plugin","perspective","3D","rotate","transform"]},"sidebar":"demosSidebar","previous":{"title":"Parallax","permalink":"/egjs-flicking/ko/docs/demos/plugins/parallax"},"next":{"title":"Arrow","permalink":"/egjs-flicking/ko/docs/demos/plugins/arrow"}}'),c=n(65723),r=n(54187),t=n(90761);let l={"@egjs/flicking-plugins":"^4.6.0"},d=()=>(0,c.jsx)(t.A,{react:'import { Perspective } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Perspective({ rotate: 1, perspective: 1000 })];\n\nexport default function App() {\n  return (\n    <Flicking circular={true} plugins={plugins} align="center">\n      {COLORS.map((color, i) => (\n        <div className="flicking-panel" key={i} style={{ background: color }}>\n          {i + 1}\n        </div>\n      ))}\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ circular: true, align: \'center\' }" :plugins="plugins">\n    <div v-for="(color, i) in COLORS" :key="i"\n         class="flicking-panel"\n         :style="{ background: color }">\n      {{ i + 1 }}\n    </div>\n  </Flicking>\n</template>\n\n<script setup>\nimport { Perspective } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\nconst plugins = [new Perspective({ rotate: 1, perspective: 1000 })];\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport { Perspective } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];\n\nconst camera = document.querySelector(".flicking-camera");\nCOLORS.forEach((color, i) => {\n  const panel = document.createElement("div");\n  panel.className = "flicking-panel";\n  panel.style.background = color;\n  panel.textContent = i + 1;\n  camera.appendChild(panel);\n});\n\nconst flicking = new Flicking("#flick", {\n  circular: true,\n  align: "center"\n});\n\nflicking.addPlugins(new Perspective({ rotate: 1, perspective: 1000 }));\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="app">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera"></div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  width: 200px;\n  height: 150px;\n  margin-right: 10px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  color: white;\n}\n",dependencies:l}),o={title:"Perspective",id:"perspective",slug:"/demos/plugins/perspective",sidebar_position:4,description:"\uD328\uB110\uC5D0 3D \uC6D0\uADFC \uD68C\uC804 \uD6A8\uACFC\uB97C \uC801\uC6A9\uD558\uB294 \uD50C\uB7EC\uADF8\uC778",keywords:["flicking","plugin","perspective","3D","rotate","transform"]},a="Perspective",p={},g=[{value:"\uC694\uC57D",id:"\uC694\uC57D",level:2},{value:"\uC8FC\uC694 \uC635\uC158",id:"\uC8FC\uC694-\uC635\uC158",level:3},{value:"\uC0C1\uC138 \uC124\uBA85",id:"\uC0C1\uC138-\uC124\uBA85",level:2},{value:"\uB3D9\uC791 \uC6D0\uB9AC",id:"\uB3D9\uC791-\uC6D0\uB9AC",level:3},{value:"\uC0AC\uC6A9\uBC95",id:"\uC0AC\uC6A9\uBC95",level:3},{value:"\uC8FC\uC758\uC0AC\uD56D",id:"\uC8FC\uC758\uC0AC\uD56D",level:3},{value:"\uAD00\uB828 \uB9C1\uD06C",id:"\uAD00\uB828-\uB9C1\uD06C",level:2},{value:"\uAD00\uB828 \uB370\uBAA8",id:"\uAD00\uB828-\uB370\uBAA8",level:3}];function h(e){let i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i.header,{children:(0,c.jsx)(i.h1,{id:"perspective",children:"Perspective"})}),"\n",(0,c.jsx)(i.p,{children:"\uD328\uB110\uC758 \uC704\uCE58\uC5D0 \uB530\uB77C 3D \uC6D0\uADFC \uD68C\uC804 \uBC0F \uD06C\uAE30 \uBCC0\uD658 \uD6A8\uACFC\uB97C \uC801\uC6A9\uD569\uB2C8\uB2E4."}),"\n",(0,c.jsx)(d,{}),"\n",(0,c.jsx)(i.h2,{id:"\uC694\uC57D",children:"\uC694\uC57D"}),"\n",(0,c.jsx)(i.h3,{id:"\uC8FC\uC694-\uC635\uC158",children:"\uC8FC\uC694 \uC635\uC158"}),"\n",(0,c.jsxs)(i.table,{children:[(0,c.jsx)(i.thead,{children:(0,c.jsxs)(i.tr,{children:[(0,c.jsx)(i.th,{children:"\uC635\uC158"}),(0,c.jsx)(i.th,{children:"\uD0C0\uC785"}),(0,c.jsx)(i.th,{children:"\uAE30\uBCF8\uAC12"}),(0,c.jsx)(i.th,{children:"\uC124\uBA85"})]})}),(0,c.jsxs)(i.tbody,{children:[(0,c.jsxs)(i.tr,{children:[(0,c.jsx)(i.td,{children:(0,c.jsx)(i.code,{children:"rotate"})}),(0,c.jsx)(i.td,{children:(0,c.jsx)(i.code,{children:"number"})}),(0,c.jsx)(i.td,{children:(0,c.jsx)(i.code,{children:"1"})}),(0,c.jsx)(i.td,{children:"\uD68C\uC804 \uAC15\uB3C4. \uC591\uC218\uBA74 \uC624\uB978\uCABD \uD328\uB110\uC774 \uC548\uCABD\uC73C\uB85C, \uC74C\uC218\uBA74 \uBC14\uAE65\uCABD\uC73C\uB85C \uD68C\uC804"})]}),(0,c.jsxs)(i.tr,{children:[(0,c.jsx)(i.td,{children:(0,c.jsx)(i.code,{children:"scale"})}),(0,c.jsx)(i.td,{children:(0,c.jsx)(i.code,{children:"number"})}),(0,c.jsx)(i.td,{children:(0,c.jsx)(i.code,{children:"2"})}),(0,c.jsx)(i.td,{children:"\uD06C\uAE30 \uBCC0\uD658 \uAC15\uB3C4"})]}),(0,c.jsxs)(i.tr,{children:[(0,c.jsx)(i.td,{children:(0,c.jsx)(i.code,{children:"perspective"})}),(0,c.jsx)(i.td,{children:(0,c.jsx)(i.code,{children:"number"})}),(0,c.jsx)(i.td,{children:(0,c.jsx)(i.code,{children:"1000"})}),(0,c.jsx)(i.td,{children:"CSS perspective \uAC12 (px). \uC791\uC744\uC218\uB85D \uC65C\uACE1\uC774 \uAC15\uD574\uC9D0"})]})]})]}),"\n",(0,c.jsx)(i.h2,{id:"\uC0C1\uC138-\uC124\uBA85",children:"\uC0C1\uC138 \uC124\uBA85"}),"\n",(0,c.jsx)(i.h3,{id:"\uB3D9\uC791-\uC6D0\uB9AC",children:"\uB3D9\uC791 \uC6D0\uB9AC"}),"\n",(0,c.jsxs)(i.p,{children:["Perspective \uD50C\uB7EC\uADF8\uC778\uC740 \uAC01 \uD328\uB110\uC758 \uAC00\uC2DC \uBE44\uC728(visible ratio)\uC744 \uAE30\uBC18\uC73C\uB85C ",(0,c.jsx)(i.code,{children:"rotateY"}),"\uC640 ",(0,c.jsx)(i.code,{children:"scale"})," \uBCC0\uD658\uC744 \uC790\uB3D9 \uC801\uC6A9\uD569\uB2C8\uB2E4. \uC911\uC559\uC5D0 \uAC00\uAE4C\uC6B4 \uD328\uB110\uC740 \uC815\uBA74\uC744, \uBA40\uC5B4\uC9C8\uC218\uB85D \uD68C\uC804\uB41C \uBAA8\uC2B5\uC744 \uBCF4\uC5EC\uC90D\uB2C8\uB2E4."]}),"\n",(0,c.jsx)(i.h3,{id:"\uC0AC\uC6A9\uBC95",children:"\uC0AC\uC6A9\uBC95"}),"\n",(0,c.jsx)(i.pre,{children:(0,c.jsx)(i.code,{className:"language-js",children:'import { Perspective } from "@egjs/flicking-plugins";\n\n// \uAE30\uBCF8 \uC0AC\uC6A9\nflicking.addPlugins(new Perspective({ rotate: 1, perspective: 1000 }));\n\n// \uAC15\uD55C \uC65C\uACE1\nflicking.addPlugins(new Perspective({ rotate: -1, scale: 2, perspective: 600 }));\n'})}),"\n",(0,c.jsx)(i.h3,{id:"\uC8FC\uC758\uC0AC\uD56D",children:"\uC8FC\uC758\uC0AC\uD56D"}),"\n",(0,c.jsx)(i.admonition,{title:"\uC8FC\uC758",type:"warning",children:(0,c.jsxs)(i.ul,{children:["\n",(0,c.jsxs)(i.li,{children:[(0,c.jsx)(i.code,{children:"circular: true"}),"\uC640 \uD568\uAED8 \uC0AC\uC6A9\uD558\uBA74 \uB04A\uAE40 \uC5C6\uB294 3D \uD68C\uC804 \uD6A8\uACFC\uB97C \uAD6C\uD604\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."]}),"\n",(0,c.jsx)(i.li,{children:"\uD328\uB110\uC774 \uB108\uBB34 \uC801\uC73C\uBA74 \uC21C\uD658 \uC2DC \uBE48 \uACF5\uAC04\uC774 \uC0DD\uAE38 \uC218 \uC788\uC73C\uBBC0\uB85C \uCD5C\uC18C 4~5\uAC1C \uC774\uC0C1\uC758 \uD328\uB110\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4."}),"\n"]})}),"\n",(0,c.jsx)(i.h2,{id:"\uAD00\uB828-\uB9C1\uD06C",children:"\uAD00\uB828 \uB9C1\uD06C"}),"\n",(0,c.jsx)(i.h3,{id:"\uAD00\uB828-\uB370\uBAA8",children:"\uAD00\uB828 \uB370\uBAA8"}),"\n",(0,c.jsxs)(i.ul,{children:["\n",(0,c.jsxs)(i.li,{children:[(0,c.jsx)(i.a,{href:"../reactive/coverflow",children:"Coverflow"}),": Reactive API \uAE30\uBC18 3D \uD6A8\uACFC"]}),"\n",(0,c.jsxs)(i.li,{children:[(0,c.jsx)(i.a,{href:"./parallax",children:"Parallax"}),": \uC2DC\uCC28 \uC2A4\uD06C\uB864 \uD6A8\uACFC"]}),"\n"]})]})}function u(e={}){let{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,c.jsx)(i,{...e,children:(0,c.jsx)(h,{...e})}):h(e)}},90761(e,i,n){n.d(i,{A:()=>h});var s=n(65723),c=n(7210),r=n(78863);n(22155);var t=n(19612);let l="^4.11.4",d={react:{"@egjs/react-flicking":l,"@egjs/flicking":l},vue3:{"@egjs/vue3-flicking":l,"@egjs/flicking":l},vanilla:{"@egjs/flicking":l}},o=`<!DOCTYPE html>
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
`;function g({code:e,html:i,template:n="react",dependencies:c={},files:r={},css:l=""}){return(0,s.jsx)(t.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let s=l?`${p}
${l}`:p,c={"/styles.css":{code:s},...r};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:a,hidden:!0},...c};if("vue3"===n){let i;return{"/src/App.vue":{code:(i=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${s}
</style>`)},...r}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:i||o},...r}})(),customSetup:{dependencies:{...d[n],...c}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function h({react:e,vue3:i,js:n,jsHtml:t,css:l,dependencies:d}){return(0,s.jsxs)(r.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(c.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(g,{template:"vanilla",code:n,html:t,css:l,dependencies:d})}),(0,s.jsx)(c.A,{value:"react",label:"React",children:(0,s.jsx)(g,{template:"react",code:e,css:l,dependencies:d})}),(0,s.jsx)(c.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(g,{template:"vue3",code:i,css:l,dependencies:d})})]})}}}]);
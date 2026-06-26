"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["6818"],{58902(e,i,n){n.r(i),n.d(i,{metadata:()=>s,default:()=>u,frontMatter:()=>a,contentTitle:()=>o,toc:()=>g,assets:()=>p});var s=JSON.parse('{"id":"demos/plugins/fade","title":"Fade","description":"\uD328\uB110 \uC804\uD658 \uC2DC \uD398\uC774\uB4DC \uC778/\uC544\uC6C3 \uD6A8\uACFC\uB97C \uC801\uC6A9\uD558\uB294 \uD50C\uB7EC\uADF8\uC778","source":"@site/i18n/ko/docusaurus-plugin-content-docs/current/demos/plugins/fade.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/fade","permalink":"/egjs-flicking/ko/docs/demos/plugins/fade","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/fade.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"title":"Fade","id":"fade","slug":"/demos/plugins/fade","sidebar_position":1,"description":"\uD328\uB110 \uC804\uD658 \uC2DC \uD398\uC774\uB4DC \uC778/\uC544\uC6C3 \uD6A8\uACFC\uB97C \uC801\uC6A9\uD558\uB294 \uD50C\uB7EC\uADF8\uC778","keywords":["flicking","plugin","fade","transition","opacity"]},"sidebar":"demosSidebar","previous":{"title":"Coverflow","permalink":"/egjs-flicking/ko/docs/demos/reactive/coverflow"},"next":{"title":"AutoPlay","permalink":"/egjs-flicking/ko/docs/demos/plugins/autoplay"}}'),l=n(65723),d=n(54187),t=n(90761);let c={"@egjs/flicking-plugins":"^4.6.0"},r=()=>(0,l.jsx)(t.A,{react:'import { Fade } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst plugins = [new Fade()];\n\nexport default function App() {\n  return (\n    <Flicking circular={true} plugins={plugins} preventDefaultOnDrag={true}>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/fade1/600/300" />\n      </div>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/fade2/600/300" />\n      </div>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/fade3/600/300" />\n      </div>\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ circular: true, preventDefaultOnDrag: true }" :plugins="plugins">\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/fade1/600/300" />\n    </div>\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/fade2/600/300" />\n    </div>\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/fade3/600/300" />\n    </div>\n  </Flicking>\n</template>\n\n<script setup>\nimport { Fade } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst plugins = [new Fade()];\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport { Fade } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst flicking = new Flicking("#flick", {\n  circular: true,\n  preventDefaultOnDrag: true\n});\n\nflicking.addPlugins(new Fade());\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="app">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera">\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/fade1/600/300" />\n        </div>\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/fade2/600/300" />\n        </div>\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/fade3/600/300" />\n        </div>\n      </div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  position: relative;\n  border-radius: 5px;\n  width: 80%;\n  margin-right: 10px;\n  height: 200px;\n  overflow: hidden;\n}\n\n.panel-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n",dependencies:c}),a={title:"Fade",id:"fade",slug:"/demos/plugins/fade",sidebar_position:1,description:"\uD328\uB110 \uC804\uD658 \uC2DC \uD398\uC774\uB4DC \uC778/\uC544\uC6C3 \uD6A8\uACFC\uB97C \uC801\uC6A9\uD558\uB294 \uD50C\uB7EC\uADF8\uC778",keywords:["flicking","plugin","fade","transition","opacity"]},o="Fade",p={},g=[{value:"\uC694\uC57D",id:"\uC694\uC57D",level:2},{value:"\uC8FC\uC694 \uC635\uC158",id:"\uC8FC\uC694-\uC635\uC158",level:3},{value:"\uC0C1\uC138 \uC124\uBA85",id:"\uC0C1\uC138-\uC124\uBA85",level:2},{value:"\uB3D9\uC791 \uC6D0\uB9AC",id:"\uB3D9\uC791-\uC6D0\uB9AC",level:3},{value:"\uC0AC\uC6A9\uBC95",id:"\uC0AC\uC6A9\uBC95",level:3},{value:"\uC8FC\uC758\uC0AC\uD56D",id:"\uC8FC\uC758\uC0AC\uD56D",level:3},{value:"\uAD00\uB828 \uB9C1\uD06C",id:"\uAD00\uB828-\uB9C1\uD06C",level:2},{value:"\uAD00\uB828 \uB370\uBAA8",id:"\uAD00\uB828-\uB370\uBAA8",level:3}];function h(e){let i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.header,{children:(0,l.jsx)(i.h1,{id:"fade",children:"Fade"})}),"\n",(0,l.jsx)(i.p,{children:"\uD328\uB110 \uC804\uD658 \uC2DC \uD22C\uBA85\uB3C4\uB97C \uC870\uC808\uD558\uC5EC \uD398\uC774\uB4DC \uC778/\uC544\uC6C3 \uD6A8\uACFC\uB97C \uC801\uC6A9\uD569\uB2C8\uB2E4."}),"\n",(0,l.jsx)(r,{}),"\n",(0,l.jsx)(i.h2,{id:"\uC694\uC57D",children:"\uC694\uC57D"}),"\n",(0,l.jsx)(i.h3,{id:"\uC8FC\uC694-\uC635\uC158",children:"\uC8FC\uC694 \uC635\uC158"}),"\n",(0,l.jsxs)(i.table,{children:[(0,l.jsx)(i.thead,{children:(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.th,{children:"\uC635\uC158"}),(0,l.jsx)(i.th,{children:"\uD0C0\uC785"}),(0,l.jsx)(i.th,{children:"\uAE30\uBCF8\uAC12"}),(0,l.jsx)(i.th,{children:"\uC124\uBA85"})]})}),(0,l.jsxs)(i.tbody,{children:[(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"selector"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"string"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:'""'})}),(0,l.jsx)(i.td,{children:"\uD6A8\uACFC\uB97C \uC801\uC6A9\uD560 \uC694\uC18C\uC758 CSS \uC120\uD0DD\uC790. \uBE48 \uBB38\uC790\uC5F4\uC774\uBA74 \uD328\uB110 \uC790\uCCB4\uC5D0 \uC801\uC6A9"})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"scale"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"number"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"1"})}),(0,l.jsx)(i.td,{children:"\uD6A8\uACFC \uAC15\uB3C4 \uBC30\uC728"})]})]})]}),"\n",(0,l.jsx)(i.h2,{id:"\uC0C1\uC138-\uC124\uBA85",children:"\uC0C1\uC138 \uC124\uBA85"}),"\n",(0,l.jsx)(i.h3,{id:"\uB3D9\uC791-\uC6D0\uB9AC",children:"\uB3D9\uC791 \uC6D0\uB9AC"}),"\n",(0,l.jsxs)(i.p,{children:["Fade \uD50C\uB7EC\uADF8\uC778\uC740 \uAC01 \uD328\uB110\uC758 \uAC00\uC2DC \uBE44\uC728(visible ratio)\uC5D0 \uB530\uB77C ",(0,l.jsx)(i.code,{children:"opacity"}),"\uB97C \uC790\uB3D9\uC73C\uB85C \uC870\uC808\uD569\uB2C8\uB2E4. \uD604\uC7AC \uBCF4\uC774\uB294 \uD328\uB110\uC740 \uBD88\uD22C\uBA85\uD558\uAC8C, \uBC97\uC5B4\uB098\uB294 \uD328\uB110\uC740 \uD22C\uBA85\uD558\uAC8C \uCC98\uB9AC\uB429\uB2C8\uB2E4."]}),"\n",(0,l.jsx)(i.h3,{id:"\uC0AC\uC6A9\uBC95",children:"\uC0AC\uC6A9\uBC95"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-js",children:'import { Fade } from "@egjs/flicking-plugins";\n\n// \uAE30\uBCF8 \uC0AC\uC6A9\nflicking.addPlugins(new Fade());\n\n// \uD2B9\uC815 \uC694\uC18C\uC5D0\uB9CC \uC801\uC6A9\nflicking.addPlugins(new Fade("img"));\n\n// \uD6A8\uACFC \uAC15\uB3C4 \uC870\uC808\nflicking.addPlugins(new Fade("", 2));\n'})}),"\n",(0,l.jsx)(i.h3,{id:"\uC8FC\uC758\uC0AC\uD56D",children:"\uC8FC\uC758\uC0AC\uD56D"}),"\n",(0,l.jsx)(i.admonition,{title:"\uC8FC\uC758",type:"warning",children:(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.code,{children:"circular: true"}),"\uC640 \uD568\uAED8 \uC0AC\uC6A9\uD558\uBA74 \uB04A\uAE40 \uC5C6\uB294 \uD398\uC774\uB4DC \uD6A8\uACFC\uB97C \uAD6C\uD604\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."]}),"\n",(0,l.jsx)(i.li,{children:"\uD328\uB110 \uBC30\uACBD\uC774 \uD22C\uBA85\uD55C \uACBD\uC6B0 \uB4A4\uCABD \uD328\uB110\uC774 \uBE44\uCE60 \uC218 \uC788\uC73C\uBBC0\uB85C, \uBD88\uD22C\uBA85\uD55C \uBC30\uACBD\uC0C9\uC774\uB098 \uC774\uBBF8\uC9C0\uB97C \uC0AC\uC6A9\uD558\uB294 \uAC83\uC774 \uC88B\uC2B5\uB2C8\uB2E4."}),"\n"]})}),"\n",(0,l.jsx)(i.h2,{id:"\uAD00\uB828-\uB9C1\uD06C",children:"\uAD00\uB828 \uB9C1\uD06C"}),"\n",(0,l.jsx)(i.h3,{id:"\uAD00\uB828-\uB370\uBAA8",children:"\uAD00\uB828 \uB370\uBAA8"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.a,{href:"./parallax",children:"Parallax"}),": \uC2DC\uCC28 \uC2A4\uD06C\uB864 \uD6A8\uACFC"]}),"\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.a,{href:"./autoplay",children:"AutoPlay"}),": \uC790\uB3D9 \uC7AC\uC0DD\uACFC \uD568\uAED8 \uC0AC\uC6A9"]}),"\n"]})]})}function u(e={}){let{wrapper:i}={...(0,d.R)(),...e.components};return i?(0,l.jsx)(i,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}},90761(e,i,n){n.d(i,{A:()=>h});var s=n(65723),l=n(7210),d=n(78863);n(22155);var t=n(19612);let c="^4.11.4",r={react:{"@egjs/react-flicking":c,"@egjs/flicking":c},vue3:{"@egjs/vue3-flicking":c,"@egjs/flicking":c},vanilla:{"@egjs/flicking":c}},a=`<!DOCTYPE html>
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
`;function g({code:e,html:i,template:n="react",dependencies:l={},files:d={},css:c=""}){return(0,s.jsx)(t.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let s=c?`${p}
${c}`:p,l={"/styles.css":{code:s},...d};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...l};if("vue3"===n){let i;return{"/src/App.vue":{code:(i=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${s}
</style>`)},...d}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:i||a},...d}})(),customSetup:{dependencies:{...r[n],...l}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function h({react:e,vue3:i,js:n,jsHtml:t,css:c,dependencies:r}){return(0,s.jsxs)(d.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(l.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(g,{template:"vanilla",code:n,html:t,css:c,dependencies:r})}),(0,s.jsx)(l.A,{value:"react",label:"React",children:(0,s.jsx)(g,{template:"react",code:e,css:c,dependencies:r})}),(0,s.jsx)(l.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(g,{template:"vue3",code:i,css:c,dependencies:r})})]})}}}]);
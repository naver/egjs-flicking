"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["2491"],{12511(e,i,n){n.r(i),n.d(i,{metadata:()=>s,default:()=>g,frontMatter:()=>a,contentTitle:()=>o,toc:()=>u,assets:()=>p});var s=JSON.parse('{"id":"demos/plugins/autoplay","title":"AutoPlay","description":"\uC77C\uC815 \uAC04\uACA9\uC73C\uB85C \uC790\uB3D9\uC73C\uB85C \uD328\uB110\uC744 \uC804\uD658\uD558\uB294 \uD50C\uB7EC\uADF8\uC778","source":"@site/i18n/ko/docusaurus-plugin-content-docs/current/demos/plugins/autoplay.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/autoplay","permalink":"/egjs-flicking/ko/docs/demos/plugins/autoplay","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/autoplay.mdx","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"AutoPlay","id":"autoplay","slug":"/demos/plugins/autoplay","sidebar_position":2,"description":"\uC77C\uC815 \uAC04\uACA9\uC73C\uB85C \uC790\uB3D9\uC73C\uB85C \uD328\uB110\uC744 \uC804\uD658\uD558\uB294 \uD50C\uB7EC\uADF8\uC778","keywords":["flicking","plugin","autoplay","auto","play","timer"]},"sidebar":"demosSidebar","previous":{"title":"Fade","permalink":"/egjs-flicking/ko/docs/demos/plugins/fade"},"next":{"title":"Parallax","permalink":"/egjs-flicking/ko/docs/demos/plugins/parallax"}}'),l=n(65723),t=n(54187),d=n(90761);let c={"@egjs/flicking-plugins":"^4.6.0"},r=()=>(0,l.jsx)(d.A,{react:'import { AutoPlay } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst plugins = [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: true })];\n\nexport default function App() {\n  return (\n    <Flicking circular={true} plugins={plugins} preventDefaultOnDrag={true}>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/auto1/600/300" />\n      </div>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/auto2/600/300" />\n      </div>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/auto3/600/300" />\n      </div>\n      <div className="flicking-panel">\n        <img className="panel-image" src="https://picsum.photos/seed/auto4/600/300" />\n      </div>\n    </Flicking>\n  );\n}\n',vue3:'<template>\n  <Flicking :options="{ circular: true, preventDefaultOnDrag: true }" :plugins="plugins">\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/auto1/600/300" />\n    </div>\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/auto2/600/300" />\n    </div>\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/auto3/600/300" />\n    </div>\n    <div class="flicking-panel">\n      <img class="panel-image" src="https://picsum.photos/seed/auto4/600/300" />\n    </div>\n  </Flicking>\n</template>\n\n<script setup>\nimport { AutoPlay } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst plugins = [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: true })];\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport { AutoPlay } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst flicking = new Flicking("#flick", {\n  circular: true,\n  preventDefaultOnDrag: true\n});\n\nflicking.addPlugins(\n  new AutoPlay({\n    duration: 2000,\n    direction: "NEXT",\n    stopOnHover: true\n  })\n);\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="app">\n    <div id="flick" class="flicking-viewport">\n      <div class="flicking-camera">\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/auto1/600/300" />\n        </div>\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/auto2/600/300" />\n        </div>\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/auto3/600/300" />\n        </div>\n        <div class="flicking-panel">\n          <img class="panel-image" src="https://picsum.photos/seed/auto4/600/300" />\n        </div>\n      </div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-panel {\n  position: relative;\n  border-radius: 5px;\n  width: 80%;\n  margin-right: 10px;\n  height: 200px;\n  overflow: hidden;\n}\n\n.panel-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n",dependencies:c}),a={title:"AutoPlay",id:"autoplay",slug:"/demos/plugins/autoplay",sidebar_position:2,description:"\uC77C\uC815 \uAC04\uACA9\uC73C\uB85C \uC790\uB3D9\uC73C\uB85C \uD328\uB110\uC744 \uC804\uD658\uD558\uB294 \uD50C\uB7EC\uADF8\uC778",keywords:["flicking","plugin","autoplay","auto","play","timer"]},o="AutoPlay",p={},u=[{value:"\uC694\uC57D",id:"\uC694\uC57D",level:2},{value:"\uC8FC\uC694 \uC635\uC158",id:"\uC8FC\uC694-\uC635\uC158",level:3},{value:"\uC0C1\uC138 \uC124\uBA85",id:"\uC0C1\uC138-\uC124\uBA85",level:2},{value:"\uB3D9\uC791 \uC6D0\uB9AC",id:"\uB3D9\uC791-\uC6D0\uB9AC",level:3},{value:"\uC0AC\uC6A9\uBC95",id:"\uC0AC\uC6A9\uBC95",level:3},{value:"\uC81C\uC5B4 \uBA54\uC11C\uB4DC",id:"\uC81C\uC5B4-\uBA54\uC11C\uB4DC",level:3},{value:"\uC8FC\uC758\uC0AC\uD56D",id:"\uC8FC\uC758\uC0AC\uD56D",level:3},{value:"\uAD00\uB828 \uB9C1\uD06C",id:"\uAD00\uB828-\uB9C1\uD06C",level:2},{value:"\uAD00\uB828 \uB370\uBAA8",id:"\uAD00\uB828-\uB370\uBAA8",level:3}];function h(e){let i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.header,{children:(0,l.jsx)(i.h1,{id:"autoplay",children:"AutoPlay"})}),"\n",(0,l.jsx)(i.p,{children:"\uC77C\uC815 \uAC04\uACA9\uC73C\uB85C \uD328\uB110\uC744 \uC790\uB3D9 \uC804\uD658\uD569\uB2C8\uB2E4. \uB9C8\uC6B0\uC2A4 \uD638\uBC84 \uC2DC \uC77C\uC2DC \uC815\uC9C0 \uAE30\uB2A5\uC744 \uC9C0\uC6D0\uD569\uB2C8\uB2E4."}),"\n",(0,l.jsx)(r,{}),"\n",(0,l.jsx)(i.h2,{id:"\uC694\uC57D",children:"\uC694\uC57D"}),"\n",(0,l.jsx)(i.h3,{id:"\uC8FC\uC694-\uC635\uC158",children:"\uC8FC\uC694 \uC635\uC158"}),"\n",(0,l.jsxs)(i.table,{children:[(0,l.jsx)(i.thead,{children:(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.th,{children:"\uC635\uC158"}),(0,l.jsx)(i.th,{children:"\uD0C0\uC785"}),(0,l.jsx)(i.th,{children:"\uAE30\uBCF8\uAC12"}),(0,l.jsx)(i.th,{children:"\uC124\uBA85"})]})}),(0,l.jsxs)(i.tbody,{children:[(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"duration"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"number"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"2000"})}),(0,l.jsx)(i.td,{children:"\uD328\uB110 \uC804\uD658 \uAC04\uACA9 (ms)"})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"direction"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:'"NEXT" | "PREV"'})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:'"NEXT"'})}),(0,l.jsx)(i.td,{children:"\uC790\uB3D9 \uC804\uD658 \uBC29\uD5A5"})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"stopOnHover"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"boolean"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"false"})}),(0,l.jsx)(i.td,{children:"\uB9C8\uC6B0\uC2A4 \uD638\uBC84 \uC2DC \uC790\uB3D9 \uC7AC\uC0DD \uC77C\uC2DC \uC815\uC9C0"})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"animationDuration"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"number"})}),(0,l.jsx)(i.td,{children:"-"}),(0,l.jsx)(i.td,{children:"\uD328\uB110 \uC804\uD658 \uC560\uB2C8\uBA54\uC774\uC158 \uC2DC\uAC04 (ms)"})]})]})]}),"\n",(0,l.jsx)(i.h2,{id:"\uC0C1\uC138-\uC124\uBA85",children:"\uC0C1\uC138 \uC124\uBA85"}),"\n",(0,l.jsx)(i.h3,{id:"\uB3D9\uC791-\uC6D0\uB9AC",children:"\uB3D9\uC791 \uC6D0\uB9AC"}),"\n",(0,l.jsxs)(i.p,{children:["AutoPlay \uD50C\uB7EC\uADF8\uC778\uC740 \uC124\uC815\uB41C ",(0,l.jsx)(i.code,{children:"duration"})," \uAC04\uACA9\uB9C8\uB2E4 \uC9C0\uC815\uB41C \uBC29\uD5A5\uC73C\uB85C \uD328\uB110\uC744 \uC790\uB3D9 \uC804\uD658\uD569\uB2C8\uB2E4. \uC0AC\uC6A9\uC790\uAC00 \uB4DC\uB798\uADF8\uD558\uBA74 \uC790\uB3D9 \uC7AC\uC0DD\uC774 \uC77C\uC2DC \uC911\uB2E8\uB418\uACE0, \uB4DC\uB798\uADF8 \uC885\uB8CC \uD6C4 \uB2E4\uC2DC \uC2DC\uC791\uB429\uB2C8\uB2E4."]}),"\n",(0,l.jsx)(i.h3,{id:"\uC0AC\uC6A9\uBC95",children:"\uC0AC\uC6A9\uBC95"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-js",children:'import { AutoPlay } from "@egjs/flicking-plugins";\n\nflicking.addPlugins(new AutoPlay({\n  duration: 2000,\n  direction: "NEXT",\n  stopOnHover: true\n}));\n'})}),"\n",(0,l.jsx)(i.h3,{id:"\uC81C\uC5B4-\uBA54\uC11C\uB4DC",children:"\uC81C\uC5B4 \uBA54\uC11C\uB4DC"}),"\n",(0,l.jsxs)(i.table,{children:[(0,l.jsx)(i.thead,{children:(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.th,{children:"\uBA54\uC11C\uB4DC"}),(0,l.jsx)(i.th,{children:"\uC124\uBA85"})]})}),(0,l.jsxs)(i.tbody,{children:[(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"plugin.stop()"})}),(0,l.jsx)(i.td,{children:"\uC790\uB3D9 \uC7AC\uC0DD \uC911\uC9C0"})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"plugin.play()"})}),(0,l.jsx)(i.td,{children:"\uC790\uB3D9 \uC7AC\uC0DD \uC2DC\uC791"})]})]})]}),"\n",(0,l.jsx)(i.h3,{id:"\uC8FC\uC758\uC0AC\uD56D",children:"\uC8FC\uC758\uC0AC\uD56D"}),"\n",(0,l.jsx)(i.admonition,{title:"\uC8FC\uC758",type:"warning",children:(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:["\uB04A\uAE40 \uC5C6\uB294 \uC790\uB3D9 \uC7AC\uC0DD\uC744 \uC704\uD574 ",(0,l.jsx)(i.code,{children:"circular: true"})," \uC635\uC158\uACFC \uD568\uAED8 \uC0AC\uC6A9\uD558\uC138\uC694."]}),"\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.code,{children:"stopOnHover: true"}),"\uB97C \uC124\uC815\uD558\uBA74 \uBAA8\uBC14\uC77C\uC5D0\uC11C\uB294 \uD130\uCE58 \uC2DC \uC77C\uC2DC \uC815\uC9C0\uB429\uB2C8\uB2E4."]}),"\n"]})}),"\n",(0,l.jsx)(i.h2,{id:"\uAD00\uB828-\uB9C1\uD06C",children:"\uAD00\uB828 \uB9C1\uD06C"}),"\n",(0,l.jsx)(i.h3,{id:"\uAD00\uB828-\uB370\uBAA8",children:"\uAD00\uB828 \uB370\uBAA8"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.a,{href:"./fade",children:"Fade"}),": \uD398\uC774\uB4DC \uD6A8\uACFC\uC640 \uD568\uAED8 \uC0AC\uC6A9"]}),"\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.a,{href:"./pagination",children:"Pagination"}),": \uD398\uC774\uC9C0 \uC778\uB514\uCF00\uC774\uD130\uC640 \uD568\uAED8 \uC0AC\uC6A9"]}),"\n"]})]})}function g(e={}){let{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,l.jsx)(i,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}},90761(e,i,n){n.d(i,{A:()=>h});var s=n(65723),l=n(7210),t=n(78863);n(22155);var d=n(19612);let c="^4.11.4",r={react:{"@egjs/react-flicking":c,"@egjs/flicking":c},vue3:{"@egjs/vue3-flicking":c,"@egjs/flicking":c},vanilla:{"@egjs/flicking":c}},a=`<!DOCTYPE html>
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
`;function u({code:e,html:i,template:n="react",dependencies:l={},files:t={},css:c=""}){return(0,s.jsx)(d.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let s=c?`${p}
${c}`:p,l={"/styles.css":{code:s},...t};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...l};if("vue3"===n){let i;return{"/src/App.vue":{code:(i=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${s}
</style>`)},...t}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:i||a},...t}})(),customSetup:{dependencies:{...r[n],...l}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function h({react:e,vue3:i,js:n,jsHtml:d,css:c,dependencies:r}){return(0,s.jsxs)(t.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(l.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(u,{template:"vanilla",code:n,html:d,css:c,dependencies:r})}),(0,s.jsx)(l.A,{value:"react",label:"React",children:(0,s.jsx)(u,{template:"react",code:e,css:c,dependencies:r})}),(0,s.jsx)(l.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(u,{template:"vue3",code:i,css:c,dependencies:r})})]})}}}]);
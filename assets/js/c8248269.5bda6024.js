"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["5186"],{14317(e,i,n){n.r(i),n.d(i,{metadata:()=>t,default:()=>v,frontMatter:()=>c,contentTitle:()=>r,toc:()=>p,assets:()=>o});var t=JSON.parse('{"id":"demos/basic/adaptive","title":"Adaptive","description":"Automatically adjusts viewport height to match the active panel\'s height using the adaptive option","source":"@site/docs/demos/basic/adaptive.mdx","sourceDirName":"demos/basic","slug":"/demos/basic/adaptive","permalink":"/egjs-flicking/docs/demos/basic/adaptive","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/basic/adaptive.mdx","tags":[],"version":"current","sidebarPosition":16,"frontMatter":{"title":"Adaptive","id":"adaptive","slug":"/demos/basic/adaptive","sidebar_position":16,"description":"Automatically adjusts viewport height to match the active panel\'s height using the adaptive option","keywords":["flicking","carousel","adaptive","height","responsive"]},"sidebar":"demosSidebar","previous":{"title":"Auto Init","permalink":"/egjs-flicking/docs/demos/basic/auto-init"},"next":{"title":"Nested","permalink":"/egjs-flicking/docs/demos/basic/nested"}}'),a=n(65723),l=n(54187),s=n(90761);let d=()=>(0,a.jsx)(s.A,{react:'import Flicking from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nexport default function App() {\n  return (\n    <div>\n      {/* adaptive: false (default) */}\n      <div className="demo-container">\n        <div className="demo-label">adaptive: false (default, fixed height)</div>\n        <Flicking adaptive={false} align="center">\n          <div className="flicking-panel panel-1">Height 80px</div>\n          <div className="flicking-panel panel-2">Height 150px</div>\n          <div className="flicking-panel panel-3">Height 100px</div>\n          <div className="flicking-panel panel-4">Height 200px</div>\n          <div className="flicking-panel panel-5">Height 120px</div>\n        </Flicking>\n      </div>\n\n      {/* adaptive: true */}\n      <div className="demo-container">\n        <div className="demo-label">adaptive: true (viewport adjusts to panel height)</div>\n        <Flicking adaptive={true} align="center">\n          <div className="flicking-panel panel-1">Height 80px</div>\n          <div className="flicking-panel panel-2">Height 150px</div>\n          <div className="flicking-panel panel-3">Height 100px</div>\n          <div className="flicking-panel panel-4">Height 200px</div>\n          <div className="flicking-panel panel-5">Height 120px</div>\n        </Flicking>\n      </div>\n    </div>\n  );\n}\n',vue3:'<template>\n  <div>\n    \x3c!-- adaptive: false (default) --\x3e\n    <div class="demo-container">\n      <div class="demo-label">adaptive: false (default, fixed height)</div>\n      <Flicking :options="{ adaptive: false, align: \'center\' }">\n        <div class="flicking-panel panel-1">Height 80px</div>\n        <div class="flicking-panel panel-2">Height 150px</div>\n        <div class="flicking-panel panel-3">Height 100px</div>\n        <div class="flicking-panel panel-4">Height 200px</div>\n        <div class="flicking-panel panel-5">Height 120px</div>\n      </Flicking>\n    </div>\n\n    \x3c!-- adaptive: true --\x3e\n    <div class="demo-container">\n      <div class="demo-label">adaptive: true (viewport adjusts to panel height)</div>\n      <Flicking :options="{ adaptive: true, align: \'center\' }">\n        <div class="flicking-panel panel-1">Height 80px</div>\n        <div class="flicking-panel panel-2">Height 150px</div>\n        <div class="flicking-panel panel-3">Height 100px</div>\n        <div class="flicking-panel panel-4">Height 200px</div>\n        <div class="flicking-panel panel-5">Height 120px</div>\n      </Flicking>\n    </div>\n  </div>\n</template>\n\n<script setup>\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\n// adaptive: false (default)\nnew Flicking("#flick-fixed", {\n  adaptive: false,\n  align: "center"\n});\n\n// adaptive: true\nnew Flicking("#flick-adaptive", {\n  adaptive: true,\n  align: "center"\n});\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  \x3c!-- adaptive: false (default) --\x3e\n  <div class="demo-container">\n    <div class="demo-label">adaptive: false (default, fixed height)</div>\n    <div id="flick-fixed" class="flicking-viewport">\n      <div class="flicking-camera">\n        <div class="flicking-panel panel-1">Height 80px</div>\n        <div class="flicking-panel panel-2">Height 150px</div>\n        <div class="flicking-panel panel-3">Height 100px</div>\n        <div class="flicking-panel panel-4">Height 200px</div>\n        <div class="flicking-panel panel-5">Height 120px</div>\n      </div>\n    </div>\n  </div>\n\n  \x3c!-- adaptive: true --\x3e\n  <div class="demo-container">\n    <div class="demo-label">adaptive: true (viewport adjusts to panel height)</div>\n    <div id="flick-adaptive" class="flicking-viewport">\n      <div class="flicking-camera">\n        <div class="flicking-panel panel-1">Height 80px</div>\n        <div class="flicking-panel panel-2">Height 150px</div>\n        <div class="flicking-panel panel-3">Height 100px</div>\n        <div class="flicking-panel panel-4">Height 200px</div>\n        <div class="flicking-panel panel-5">Height 120px</div>\n      </div>\n    </div>\n  </div>\n\n</body>\n</html>\n',css:".flicking-viewport {\n  border: 2px solid #ddd;\n  transition: height 0.3s;\n}\n.flicking-panel {\n  width: 80%;\n}\n/* each panel has a different height */\n.panel-1 {\n  background: #3e8ed0;\n  height: 80px;\n}\n.panel-2 {\n  background: #00d1b2;\n  height: 150px;\n}\n.panel-3 {\n  background: #f14668;\n  height: 100px;\n}\n.panel-4 {\n  background: #ffe08a;\n  color: #333;\n  height: 200px;\n}\n.panel-5 {\n  background: #48c78e;\n  height: 120px;\n}\n"}),c={title:"Adaptive",id:"adaptive",slug:"/demos/basic/adaptive",sidebar_position:16,description:"Automatically adjusts viewport height to match the active panel's height using the adaptive option",keywords:["flicking","carousel","adaptive","height","responsive"]},r="Adaptive",o={},p=[{value:"Summary",id:"summary",level:2},{value:"Key Options",id:"key-options",level:3},{value:"Comparison by Value",id:"comparison-by-value",level:3},{value:"Details",id:"details",level:2},{value:"How Adaptive Works",id:"how-adaptive-works",level:3},{value:"Related Options",id:"related-options",level:3},{value:"Use Cases",id:"use-cases",level:3},{value:"Notes",id:"notes",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related Options",id:"related-options-1",level:3},{value:"Related Demos",id:"related-demos",level:3}];function h(e){let i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.header,{children:(0,a.jsx)(i.h1,{id:"adaptive",children:"Adaptive"})}),"\n",(0,a.jsxs)(i.p,{children:["The ",(0,a.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#adaptive",children:(0,a.jsx)(i.code,{children:"adaptive"})})," option automatically adjusts the viewport height to match the active panel's height after a panel transition. This is useful for carousels with content of varying heights."]}),"\n",(0,a.jsx)(d,{}),"\n",(0,a.jsx)(i.h2,{id:"summary",children:"Summary"}),"\n",(0,a.jsx)(i.h3,{id:"key-options",children:"Key Options"}),"\n",(0,a.jsxs)(i.table,{children:[(0,a.jsx)(i.thead,{children:(0,a.jsxs)(i.tr,{children:[(0,a.jsx)(i.th,{children:"Option"}),(0,a.jsx)(i.th,{children:"Type"}),(0,a.jsx)(i.th,{children:"Default"}),(0,a.jsx)(i.th,{children:"Description"})]})}),(0,a.jsx)(i.tbody,{children:(0,a.jsxs)(i.tr,{children:[(0,a.jsx)(i.td,{children:(0,a.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#adaptive",children:(0,a.jsx)(i.code,{children:"adaptive"})})}),(0,a.jsx)(i.td,{children:(0,a.jsx)(i.code,{children:"boolean"})}),(0,a.jsx)(i.td,{children:(0,a.jsx)(i.code,{children:"false"})}),(0,a.jsx)(i.td,{children:"Automatically adjust viewport height to match the active panel"})]})})]}),"\n",(0,a.jsx)(i.h3,{id:"comparison-by-value",children:"Comparison by Value"}),"\n",(0,a.jsxs)(i.table,{children:[(0,a.jsx)(i.thead,{children:(0,a.jsxs)(i.tr,{children:[(0,a.jsx)(i.th,{children:"Value"}),(0,a.jsx)(i.th,{children:"Behavior"}),(0,a.jsx)(i.th,{children:"Suitable For"})]})}),(0,a.jsxs)(i.tbody,{children:[(0,a.jsxs)(i.tr,{children:[(0,a.jsx)(i.td,{children:(0,a.jsx)(i.code,{children:"false"})}),(0,a.jsx)(i.td,{children:"Viewport height stays fixed (default)"}),(0,a.jsx)(i.td,{children:"Panels with the same height, fixed layouts"})]}),(0,a.jsxs)(i.tr,{children:[(0,a.jsx)(i.td,{children:(0,a.jsx)(i.code,{children:"true"})}),(0,a.jsx)(i.td,{children:"Viewport height adjusts to match the active panel"}),(0,a.jsx)(i.td,{children:"Cards with varying heights, variable content"})]})]})]}),"\n",(0,a.jsx)(i.h2,{id:"details",children:"Details"}),"\n",(0,a.jsx)(i.h3,{id:"how-adaptive-works",children:"How Adaptive Works"}),"\n",(0,a.jsxs)(i.p,{children:["When ",(0,a.jsx)(i.code,{children:"adaptive: true"}),", the viewport height is updated to match the current active panel's height each time a panel transition occurs."]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-css",children:"/* CSS for smooth height transitions */\n.flicking-viewport {\n  transition: height 0.3s;\n}\n"})}),"\n",(0,a.jsx)(i.h3,{id:"related-options",children:"Related Options"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Relationship with horizontal"}),": ",(0,a.jsx)(i.code,{children:"adaptive"})," only works with ",(0,a.jsx)(i.code,{children:"horizontal: true"})," (horizontal mode). It has no effect in vertical mode."]}),"\n"]}),"\n",(0,a.jsx)(i.h3,{id:"use-cases",children:"Use Cases"}),"\n",(0,a.jsx)(i.admonition,{title:"When to use?",type:"info",children:(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"adaptive: false"}),": Image galleries, cards of the same size"]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"adaptive: true"}),": Text cards of varying lengths, product descriptions, FAQ accordion style"]}),"\n"]})}),"\n",(0,a.jsx)(i.h3,{id:"notes",children:"Notes"}),"\n",(0,a.jsx)(i.admonition,{title:"Horizontal mode only",type:"warning",children:(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.code,{children:"adaptive"})," only works when ",(0,a.jsx)(i.code,{children:"horizontal: true"}),". It has no effect when ",(0,a.jsx)(i.code,{children:"horizontal: false"})," (vertical mode)."]})}),"\n",(0,a.jsx)(i.admonition,{title:"Layout shift",type:"warning",children:(0,a.jsx)(i.p,{children:"If heights vary significantly, layout shift may occur as content below gets pushed. It is recommended to handle this smoothly with CSS transitions or set a minimum height."})}),"\n",(0,a.jsx)(i.h2,{id:"related-links",children:"Related Links"}),"\n",(0,a.jsx)(i.h3,{id:"related-options-1",children:"Related Options"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#horizontal",children:(0,a.jsx)(i.code,{children:"horizontal"})}),": Horizontal/vertical direction (adaptive is horizontal only)"]}),"\n"]}),"\n",(0,a.jsx)(i.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.a,{href:"./vertical",children:"Vertical"}),": Vertical mode (adaptive not supported)"]}),"\n"]})]})}function v(e={}){let{wrapper:i}={...(0,l.R)(),...e.components};return i?(0,a.jsx)(i,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},90761(e,i,n){n.d(i,{A:()=>v});var t=n(65723),a=n(7210),l=n(78863);n(22155);var s=n(19612);let d="^4.11.4",c={react:{"@egjs/react-flicking":d,"@egjs/flicking":d},vue3:{"@egjs/vue3-flicking":d,"@egjs/flicking":d},vanilla:{"@egjs/flicking":d}},r=`<!DOCTYPE html>
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
`;function h({code:e,html:i,template:n="react",dependencies:a={},files:l={},css:d=""}){return(0,t.jsx)(s.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let t=d?`${p}
${d}`:p,a={"/styles.css":{code:t},...l};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...a};if("vue3"===n){let i;return{"/src/App.vue":{code:(i=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${t}
</style>`)},...l}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:t},"/index.html":{code:i||r},...l}})(),customSetup:{dependencies:{...c[n],...a}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function v({react:e,vue3:i,js:n,jsHtml:s,css:d,dependencies:c}){return(0,t.jsxs)(l.A,{groupId:"framework",defaultValue:"js",children:[(0,t.jsx)(a.A,{value:"js",label:"JavaScript",children:(0,t.jsx)(h,{template:"vanilla",code:n,html:s,css:d,dependencies:c})}),(0,t.jsx)(a.A,{value:"react",label:"React",children:(0,t.jsx)(h,{template:"react",code:e,css:d,dependencies:c})}),(0,t.jsx)(a.A,{value:"vue3",label:"Vue@3",children:(0,t.jsx)(h,{template:"vue3",code:i,css:d,dependencies:c})})]})}}}]);
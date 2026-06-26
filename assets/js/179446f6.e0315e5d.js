"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["8807"],{88889(e,i,n){n.r(i),n.d(i,{metadata:()=>s,default:()=>x,frontMatter:()=>a,contentTitle:()=>c,toc:()=>h,assets:()=>o});var s=JSON.parse('{"id":"demos/advanced/fractional-size","title":"Fractional Size","description":"Prevent 1px misalignment errors in panels with fractional sizes using the useFractionalSize option","source":"@site/docs/demos/advanced/fractional-size.mdx","sourceDirName":"demos/advanced","slug":"/demos/advanced/fractional-size","permalink":"/egjs-flicking/docs/demos/advanced/fractional-size","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/advanced/fractional-size.mdx","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"title":"Fractional Size","id":"fractional-size","slug":"/demos/advanced/fractional-size","sidebar_position":3,"description":"Prevent 1px misalignment errors in panels with fractional sizes using the useFractionalSize option","keywords":["flicking","carousel","useFractionalSize","subpixel","precision","fractional","accuracy","error"]},"sidebar":"demosSidebar","previous":{"title":"Render Only Visible","permalink":"/egjs-flicking/docs/demos/advanced/render-only-visible"},"next":{"title":"Infinite Scroll","permalink":"/egjs-flicking/docs/demos/advanced/infinite-scroll"}}'),l=n(65723),t=n(54187),r=n(90761);let d=()=>(0,l.jsx)(r.A,{react:'import Flicking from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst COLORS = ["#3e8ed0", "#00d1b2", "#48c78e", "#f14668", "#ffe08a"];\n\nexport default function App() {\n  return (\n    <div>\n      <div className="demo-container">\n        <div className="demo-label">useFractionalSize: false (default)</div>\n        <Flicking useFractionalSize={false} defaultIndex={2} style={{ width: "200px" }}>\n          {COLORS.map((color, i) => (\n            <div key={i} className="flicking-panel" style={{ width: "199.5px", height: "200px", background: color }}>\n              {i + 1}\n            </div>\n          ))}\n        </Flicking>\n      </div>\n\n      <div className="demo-container">\n        <div className="demo-label">useFractionalSize: true</div>\n        <Flicking useFractionalSize={true} defaultIndex={2} style={{ width: "200px" }}>\n          {COLORS.map((color, i) => (\n            <div key={i} className="flicking-panel" style={{ width: "199.5px", height: "200px", background: color }}>\n              {i + 1}\n            </div>\n          ))}\n        </Flicking>\n      </div>\n    </div>\n  );\n}\n',vue3:'<template>\n  <div>\n    <div class="demo-container">\n      <div class="demo-label">useFractionalSize: false (default)</div>\n      <Flicking :options="{ useFractionalSize: false, defaultIndex: 2 }" :style="{ width: \'200px\' }">\n        <div\n          v-for="(color, i) in colors"\n          :key="\'false-\' + i"\n          class="flicking-panel"\n          :style="{ width: \'199.5px\', height: \'200px\', background: color }"\n        >\n          {{ i + 1 }}\n        </div>\n      </Flicking>\n    </div>\n\n    <div class="demo-container">\n      <div class="demo-label">useFractionalSize: true</div>\n      <Flicking :options="{ useFractionalSize: true, defaultIndex: 2 }" :style="{ width: \'200px\' }">\n        <div\n          v-for="(color, i) in colors"\n          :key="\'true-\' + i"\n          class="flicking-panel"\n          :style="{ width: \'199.5px\', height: \'200px\', background: color }"\n        >\n          {{ i + 1 }}\n        </div>\n      </Flicking>\n    </div>\n  </div>\n</template>\n\n<script setup>\nimport Flicking from "@egjs/vue3-flicking";\nimport { ref } from "vue";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst colors = ref(["#3e8ed0", "#00d1b2", "#48c78e", "#f14668", "#ffe08a"]);\n<\/script>\n',js:'import Flicking from "@egjs/flicking";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nnew Flicking("#flick-false", {\n  defaultIndex: 2,\n  useFractionalSize: false\n});\n\nnew Flicking("#flick-true", {\n  defaultIndex: 2,\n  useFractionalSize: true\n});\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div class="demo-container">\n    <div class="demo-label">useFractionalSize: false (default)</div>\n    <div id="flick-false" class="flicking-viewport" style="width: 200px">\n      <div class="flicking-camera">\n        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #3e8ed0">1</div>\n        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #00d1b2">2</div>\n        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #48c78e">3</div>\n        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #f14668">4</div>\n        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #ffe08a">5</div>\n      </div>\n    </div>\n  </div>\n\n  <div class="demo-container">\n    <div class="demo-label">useFractionalSize: true</div>\n    <div id="flick-true" class="flicking-viewport" style="width: 200px">\n      <div class="flicking-camera">\n        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #3e8ed0">1</div>\n        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #00d1b2">2</div>\n        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #48c78e">3</div>\n        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #f14668">4</div>\n        <div class="flicking-panel" style="width: 199.5px; height: 200px; background: #ffe08a">5</div>\n      </div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-viewport {\n  margin: 0 auto 8px;\n}\n\n.flicking-panel {\n  margin-right: 0;\n  border-radius: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  font-weight: bold;\n  color: white;\n}\n\n.demo-container {\n  margin-bottom: 24px;\n}\n\n.demo-label {\n  font-weight: bold;\n  margin-bottom: 8px;\n}\n"}),a={title:"Fractional Size",id:"fractional-size",slug:"/demos/advanced/fractional-size",sidebar_position:3,description:"Prevent 1px misalignment errors in panels with fractional sizes using the useFractionalSize option",keywords:["flicking","carousel","useFractionalSize","subpixel","precision","fractional","accuracy","error"]},c="Fractional Size",o={},h=[{value:"Summary",id:"summary",level:2},{value:"Key Options",id:"key-options",level:3},{value:"Mode Comparison",id:"mode-comparison",level:3},{value:"Details",id:"details",level:2},{value:"The 1px Misalignment Problem",id:"the-1px-misalignment-problem",level:3},{value:"How It Works",id:"how-it-works",level:3},{value:"Use Cases",id:"use-cases",level:3},{value:"Notes",id:"notes",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related Options",id:"related-options",level:3}];function p(e){let i={a:"a",admonition:"admonition",br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.header,{children:(0,l.jsx)(i.h1,{id:"fractional-size",children:"Fractional Size"})}),"\n",(0,l.jsxs)(i.p,{children:["Use the ",(0,l.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#usefractionalsize",children:(0,l.jsx)(i.code,{children:"useFractionalSize"})})," option to prevent 1px misalignment errors in panels with fractional sizes."]}),"\n",(0,l.jsx)(d,{}),"\n",(0,l.jsx)(i.h2,{id:"summary",children:"Summary"}),"\n",(0,l.jsx)(i.h3,{id:"key-options",children:"Key Options"}),"\n",(0,l.jsxs)(i.table,{children:[(0,l.jsx)(i.thead,{children:(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.th,{children:"Option"}),(0,l.jsx)(i.th,{children:"Type"}),(0,l.jsx)(i.th,{children:"Default"}),(0,l.jsx)(i.th,{children:"Description"})]})}),(0,l.jsx)(i.tbody,{children:(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#usefractionalsize",children:(0,l.jsx)(i.code,{children:"useFractionalSize"})})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"boolean"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"false"})}),(0,l.jsx)(i.td,{children:"Calculate sizes with fractional precision"})]})})]}),"\n",(0,l.jsx)(i.h3,{id:"mode-comparison",children:"Mode Comparison"}),"\n",(0,l.jsxs)(i.table,{children:[(0,l.jsx)(i.thead,{children:(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.th,{children:"Setting"}),(0,l.jsx)(i.th,{children:"Size Measurement Method"}),(0,l.jsx)(i.th,{children:"Precision"}),(0,l.jsx)(i.th,{children:"Performance"})]})}),(0,l.jsxs)(i.tbody,{children:[(0,l.jsxs)(i.tr,{children:[(0,l.jsxs)(i.td,{children:[(0,l.jsx)(i.code,{children:"false"})," (default)"]}),(0,l.jsxs)(i.td,{children:[(0,l.jsx)(i.code,{children:"offsetWidth"})," / ",(0,l.jsx)(i.code,{children:"clientWidth"})]}),(0,l.jsx)(i.td,{children:"Integer (rounded)"}),(0,l.jsx)(i.td,{children:"Fast"})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"true"})}),(0,l.jsx)(i.td,{children:(0,l.jsx)(i.code,{children:"parseFloat(computedStyle.width)"})}),(0,l.jsx)(i.td,{children:"Fractional"}),(0,l.jsx)(i.td,{children:"Slightly slower"})]})]})]}),"\n",(0,l.jsx)(i.h2,{id:"details",children:"Details"}),"\n",(0,l.jsx)(i.h3,{id:"the-1px-misalignment-problem",children:"The 1px Misalignment Problem"}),"\n",(0,l.jsxs)(i.p,{children:["When panel width is fractional (e.g., ",(0,l.jsx)(i.code,{children:"199.5px"})," in a ",(0,l.jsx)(i.code,{children:"200px"})," viewport), ",(0,l.jsx)(i.code,{children:"offsetWidth"})," rounds it to ",(0,l.jsx)(i.code,{children:"200px"}),".",(0,l.jsx)(i.br,{}),"\n","Flicking uses that rounded value for snap position calculations, so panels gradually drift from their actual CSS position."]}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{children:"Viewport: 200px, Panel: 199.5px, defaultIndex: 2\n\noffsetWidth (integer):\n  Panel size = 200px (rounded from 199.5)\n  Panel 2 position = 2 \xd7 200 = 400px   \u2190 1px off from actual 399px\n\ncomputedStyle (fractional):\n  Panel size = 199.5px (precise)\n  Panel 2 position = 2 \xd7 199.5 = 399px \u2190 correct\n"})}),"\n",(0,l.jsx)(i.p,{children:"The error grows with index: panel 4 is off by 2px, panel 6 by 3px, and so on."}),"\n",(0,l.jsx)(i.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-javascript",children:"// false (default): uses offsetWidth (integer)\nconst width = panel.offsetWidth; // 200 (rounded from 199.5)\n\n// true: uses parseFloat(computedStyle.width) (fractional)\nconst width = parseFloat(getComputedStyle(panel).width); // 199.5 (precise)\n"})}),"\n",(0,l.jsxs)(i.p,{children:["Setting ",(0,l.jsx)(i.code,{children:"useFractionalSize: true"})," makes Flicking internally calculate sizes with fractional precision."]}),"\n",(0,l.jsx)(i.h3,{id:"use-cases",children:"Use Cases"}),"\n",(0,l.jsxs)(i.admonition,{title:"When should you use useFractionalSize?",type:"info",children:[(0,l.jsx)(i.p,{children:(0,l.jsx)(i.strong,{children:"Recommended:"})}),(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"When panel width is set in % units (33.33%, 16.66%, etc.)"}),"\n",(0,l.jsx)(i.li,{children:"When panel alignment is slightly off"}),"\n",(0,l.jsx)(i.li,{children:"When precise rendering is needed on high-resolution displays"}),"\n"]}),(0,l.jsx)(i.p,{children:(0,l.jsx)(i.strong,{children:"Not necessary:"})}),(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"When panel width is an integer px (200px, 300px, etc.)"}),"\n",(0,l.jsx)(i.li,{children:"When minor alignment errors are not a concern"}),"\n",(0,l.jsx)(i.li,{children:"When performance is a priority"}),"\n"]})]}),"\n",(0,l.jsx)(i.h3,{id:"notes",children:"Notes"}),"\n",(0,l.jsx)(i.admonition,{title:"Performance Consideration",type:"warning",children:(0,l.jsxs)(i.p,{children:[(0,l.jsx)(i.code,{children:"parseFloat(computedStyle.width)"})," is slightly slower than ",(0,l.jsx)(i.code,{children:"offsetWidth"}),". Consider the performance impact when there are many panels or frequent resizes occur."]})}),"\n",(0,l.jsx)(i.h2,{id:"related-links",children:"Related Links"}),"\n",(0,l.jsx)(i.h3,{id:"related-options",children:"Related Options"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#autoresize",children:(0,l.jsx)(i.code,{children:"autoResize"})}),": Auto resize"]}),"\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.a,{href:"../../api/interfaces/FlickingOptions#useresizeobserver",children:(0,l.jsx)(i.code,{children:"useResizeObserver"})}),": Whether to use ResizeObserver"]}),"\n"]})]})}function x(e={}){let{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,l.jsx)(i,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}},90761(e,i,n){n.d(i,{A:()=>x});var s=n(65723),l=n(7210),t=n(78863);n(22155);var r=n(19612);let d="^4.11.4",a={react:{"@egjs/react-flicking":d,"@egjs/flicking":d},vue3:{"@egjs/vue3-flicking":d,"@egjs/flicking":d},vanilla:{"@egjs/flicking":d}},c=`<!DOCTYPE html>
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
`;function p({code:e,html:i,template:n="react",dependencies:l={},files:t={},css:d=""}){return(0,s.jsx)(r.OZ,{template:"vue3"===n?"vue":"vanilla"===n?"vanilla":"react",files:(()=>{let s=d?`${h}
${d}`:h,l={"/styles.css":{code:s},...t};if("react"===n)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...l};if("vue3"===n){let i;return{"/src/App.vue":{code:(i=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${i}

<style>
${s}
</style>`)},...t}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:i||c},...t}})(),customSetup:{dependencies:{...a[n],...l}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===n?["/App.tsx","/styles.css"]:"vue3"===n?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===n?"/App.tsx":"vue3"===n?"/src/App.vue":"/src/index.js"}})}function x({react:e,vue3:i,js:n,jsHtml:r,css:d,dependencies:a}){return(0,s.jsxs)(t.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(l.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(p,{template:"vanilla",code:n,html:r,css:d,dependencies:a})}),(0,s.jsx)(l.A,{value:"react",label:"React",children:(0,s.jsx)(p,{template:"react",code:e,css:d,dependencies:a})}),(0,s.jsx)(l.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(p,{template:"vue3",code:i,css:d,dependencies:a})})]})}}}]);
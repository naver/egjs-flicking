"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["3404"],{37113(e,n,s){s.r(n),s.d(n,{metadata:()=>l,default:()=>g,frontMatter:()=>d,contentTitle:()=>o,toc:()=>h,assets:()=>p});var l=JSON.parse('{"id":"demos/plugins/parallax","title":"Parallax","description":"A plugin that applies parallax scroll effects to elements inside panels","source":"@site/docs/demos/plugins/parallax.mdx","sourceDirName":"demos/plugins","slug":"/demos/plugins/parallax","permalink":"/egjs-flicking/docs/demos/plugins/parallax","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/plugins/parallax.mdx","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"title":"Parallax","id":"parallax","slug":"/demos/plugins/parallax","sidebar_position":3,"description":"A plugin that applies parallax scroll effects to elements inside panels","keywords":["flicking","plugin","parallax","scroll","effect"]},"sidebar":"demosSidebar","previous":{"title":"AutoPlay","permalink":"/egjs-flicking/docs/demos/plugins/autoplay"},"next":{"title":"Perspective","permalink":"/egjs-flicking/docs/demos/plugins/perspective"}}'),a=s(65723),t=s(54187),i=s(90761);let r={"@egjs/flicking-plugins":"^4.6.0"},c=()=>(0,a.jsx)(i.A,{react:'import { Parallax } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/react-flicking";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst plugins = [\n  new Parallax(".bar-0", 2),\n  new Parallax(".bar-1", 2),\n  new Parallax(".bar-2", 2),\n  new Parallax(".bar-3", 2),\n  new Parallax(".bar-4", 2)\n];\n\nexport default function App() {\n  return (\n    <Flicking plugins={plugins}>\n      {[0, 1, 2, 3, 4].map(i => (\n        <div className="skeleton-panel" key={i}>\n          <span className="skeleton-bar bar-0" />\n          <span className="skeleton-bar bar-1" />\n          <span className="skeleton-bar bar-2" />\n          <span className="skeleton-bar bar-3" />\n          <span className="skeleton-bar bar-4" />\n        </div>\n      ))}\n    </Flicking>\n  );\n}\n',vue3:'<script setup>\nimport { Parallax } from "@egjs/flicking-plugins";\nimport Flicking from "@egjs/vue3-flicking";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst plugins = [\n  new Parallax(".bar-0", 2),\n  new Parallax(".bar-1", 2),\n  new Parallax(".bar-2", 2),\n  new Parallax(".bar-3", 2),\n  new Parallax(".bar-4", 2)\n];\n<\/script>\n\n<template>\n  <Flicking :plugins="plugins">\n    <div v-for="i in 5" :key="i" class="skeleton-panel">\n      <span class="skeleton-bar bar-0" />\n      <span class="skeleton-bar bar-1" />\n      <span class="skeleton-bar bar-2" />\n      <span class="skeleton-bar bar-3" />\n      <span class="skeleton-bar bar-4" />\n    </div>\n  </Flicking>\n</template>\n',js:'import Flicking from "@egjs/flicking";\nimport { Parallax } from "@egjs/flicking-plugins";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst flicking = new Flicking("#flick");\n\nflicking.addPlugins(\n  new Parallax(".bar-0", 2),\n  new Parallax(".bar-1", 2),\n  new Parallax(".bar-2", 2),\n  new Parallax(".bar-3", 2),\n  new Parallax(".bar-4", 2)\n);\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="flick" class="flicking-viewport">\n    <div class="flicking-camera">\n      <div class="skeleton-panel">\n        <span class="skeleton-bar bar-0"></span>\n        <span class="skeleton-bar bar-1"></span>\n        <span class="skeleton-bar bar-2"></span>\n        <span class="skeleton-bar bar-3"></span>\n        <span class="skeleton-bar bar-4"></span>\n      </div>\n      <div class="skeleton-panel">\n        <span class="skeleton-bar bar-0"></span>\n        <span class="skeleton-bar bar-1"></span>\n        <span class="skeleton-bar bar-2"></span>\n        <span class="skeleton-bar bar-3"></span>\n        <span class="skeleton-bar bar-4"></span>\n      </div>\n      <div class="skeleton-panel">\n        <span class="skeleton-bar bar-0"></span>\n        <span class="skeleton-bar bar-1"></span>\n        <span class="skeleton-bar bar-2"></span>\n        <span class="skeleton-bar bar-3"></span>\n        <span class="skeleton-bar bar-4"></span>\n      </div>\n      <div class="skeleton-panel">\n        <span class="skeleton-bar bar-0"></span>\n        <span class="skeleton-bar bar-1"></span>\n        <span class="skeleton-bar bar-2"></span>\n        <span class="skeleton-bar bar-3"></span>\n        <span class="skeleton-bar bar-4"></span>\n      </div>\n      <div class="skeleton-panel">\n        <span class="skeleton-bar bar-0"></span>\n        <span class="skeleton-bar bar-1"></span>\n        <span class="skeleton-bar bar-2"></span>\n        <span class="skeleton-bar bar-3"></span>\n        <span class="skeleton-bar bar-4"></span>\n      </div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".skeleton-panel {\n  width: 280px;\n  height: 180px;\n  margin-right: 10px;\n  border-radius: 12px;\n  background: #3498db;\n  position: relative;\n  overflow: hidden;\n}\n\n.skeleton-bar {\n  position: absolute;\n  left: 50%;\n  height: 12px;\n  background: rgba(255, 255, 255, 0.8);\n  border-radius: 6px;\n}\n\n.bar-0 {\n  top: 44px;\n  width: 240px;\n}\n.bar-1 {\n  top: 64px;\n  width: 95px;\n}\n.bar-2 {\n  top: 84px;\n  width: 190px;\n}\n.bar-3 {\n  top: 104px;\n  width: 140px;\n}\n.bar-4 {\n  top: 124px;\n  width: 190px;\n}\n",dependencies:r}),d={title:"Parallax",id:"parallax",slug:"/demos/plugins/parallax",sidebar_position:3,description:"A plugin that applies parallax scroll effects to elements inside panels",keywords:["flicking","plugin","parallax","scroll","effect"]},o="Parallax",p={},h=[{value:"Summary",id:"summary",level:2},{value:"Key Options",id:"key-options",level:3},{value:"Movement Formula",id:"movement-formula",level:3},{value:"Details",id:"details",level:2},{value:"How It Works",id:"how-it-works",level:3},{value:"Usage",id:"usage",level:3},{value:"CSS Setup",id:"css-setup",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related Demos",id:"related-demos",level:3}];function x(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"parallax",children:"Parallax"})}),"\n",(0,a.jsxs)(n.p,{children:["Applies parallax scroll effects to elements inside panels. Horizontally translates the target element based on the panel's ",(0,a.jsx)(n.code,{children:"outsetProgress"})," to create a sense of depth."]}),"\n",(0,a.jsx)(c,{}),"\n",(0,a.jsx)(n.h2,{id:"summary",children:"Summary"}),"\n",(0,a.jsx)(n.h3,{id:"key-options",children:"Key Options"}),"\n",(0,a.jsxs)(n.table,{children:[(0,a.jsx)(n.thead,{children:(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.th,{children:"Option"}),(0,a.jsx)(n.th,{children:"Type"}),(0,a.jsx)(n.th,{children:"Default"}),(0,a.jsx)(n.th,{children:"Description"})]})}),(0,a.jsxs)(n.tbody,{children:[(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"selector"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"string"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:'""'})}),(0,a.jsxs)(n.td,{children:["CSS selector for the element to apply the effect to (uses ",(0,a.jsx)(n.code,{children:"querySelector"}),")"]})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"scale"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"number"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"1"})}),(0,a.jsx)(n.td,{children:"Parallax movement intensity multiplier"})]})]})]}),"\n",(0,a.jsx)(n.h3,{id:"movement-formula",children:"Movement Formula"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"position = ((parentWidth - elemWidth) / 2) * outsetProgress * scale\ntransform: translate(-50%) translate(${position}px)\n"})}),"\n",(0,a.jsxs)(n.table,{children:[(0,a.jsx)(n.thead,{children:(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.th,{children:"Condition"}),(0,a.jsx)(n.th,{children:"Movement Direction"}),(0,a.jsx)(n.th,{children:"Description"})]})}),(0,a.jsxs)(n.tbody,{children:[(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:"Element > Parent"}),(0,a.jsx)(n.td,{children:"Opposite to scroll"}),(0,a.jsx)(n.td,{children:"Content moves slower than the panel (image parallax)"})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:"Element < Parent"}),(0,a.jsx)(n.td,{children:"Same as scroll"}),(0,a.jsx)(n.td,{children:"Content moves faster than the panel (depth effect)"})]})]})]}),"\n",(0,a.jsx)(n.h2,{id:"details",children:"Details"}),"\n",(0,a.jsx)(n.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,a.jsxs)(n.p,{children:["The plugin applies ",(0,a.jsx)(n.code,{children:"translate(-50%) translate(${position}px)"})," to the target element. Since ",(0,a.jsx)(n.code,{children:"translate(-50%)"})," is always included, the target element must be positioned with ",(0,a.jsx)(n.code,{children:"position: absolute; left: 50%"})," for proper centering."]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:(0,a.jsx)(n.code,{children:"parentWidth - elemWidth"})}),": The width difference between parent and element determines the movement range"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:(0,a.jsx)(n.code,{children:"outsetProgress"})}),": How far the panel has moved from its aligned position (center = 0, left exit = -1, right exit = 1)"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:(0,a.jsx)(n.code,{children:"scale"})}),": Amplifies the movement amount"]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"usage",children:"Usage"}),"\n",(0,a.jsxs)(n.p,{children:["Uses ",(0,a.jsx)(n.code,{children:"querySelector"})," to target ",(0,a.jsx)(n.strong,{children:"only the first matching element per panel"}),". To apply different parallax effects to multiple elements, ",(0,a.jsx)(n.strong,{children:"use separate instances"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'import { Parallax } from "@egjs/flicking-plugins";\n\n// Single target: parallax effect on images inside panels\nflicking.addPlugins(new Parallax("img"));\n\n// Multiple targets: individual control with unique selectors per element\nflicking.addPlugins(\n  new Parallax(".bar-0", 2),\n  new Parallax(".bar-1", 2),\n  new Parallax(".bar-2", 2)\n);\n'})}),"\n",(0,a.jsx)(n.h3,{id:"css-setup",children:"CSS Setup"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-css",children:"/* Panel: overflow: hidden + position: relative required */\n.flicking-panel {\n  position: relative;\n  overflow: hidden;\n}\n\n/* Target element: position: absolute + left: 50% required */\n/* translate(-50%) is always applied, so this combination ensures center alignment */\n.parallax-target {\n  position: absolute;\n  left: 50%;\n}\n"})}),"\n",(0,a.jsx)(n.admonition,{title:"Caution",type:"warning",children:(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Without ",(0,a.jsx)(n.code,{children:"position: absolute; left: 50%"})," on the target element, ",(0,a.jsx)(n.code,{children:"translate(-50%)"})," will break the layout."]}),"\n",(0,a.jsx)(n.li,{children:"If the element width equals the parent width, the movement amount becomes 0 and no effect is visible."}),"\n",(0,a.jsxs)(n.li,{children:["If ",(0,a.jsx)(n.code,{children:"selector"})," is left as an empty string, the effect is applied to the panel itself."]}),"\n"]})}),"\n",(0,a.jsx)(n.h2,{id:"related-links",children:"Related Links"}),"\n",(0,a.jsx)(n.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"../reactive/parallax",children:"Parallax (Reactive API)"}),": Parallax using ",(0,a.jsx)(n.code,{children:"indexProgress"})," (includes opacity effect)"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"./fade",children:"Fade"}),": Fade effect"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"./perspective",children:"Perspective"}),": 3D perspective effect"]}),"\n"]})]})}function g(e={}){let{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(x,{...e})}):x(e)}},90761(e,n,s){s.d(n,{A:()=>x});var l=s(65723),a=s(7210),t=s(78863);s(22155);var i=s(19612);let r="^4.11.4",c={react:{"@egjs/react-flicking":r,"@egjs/flicking":r},vue3:{"@egjs/vue3-flicking":r,"@egjs/flicking":r},vanilla:{"@egjs/flicking":r}},d=`<!DOCTYPE html>
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
`;function h({code:e,html:n,template:s="react",dependencies:a={},files:t={},css:r=""}){return(0,l.jsx)(i.OZ,{template:"vue3"===s?"vue":"vanilla"===s?"vanilla":"react",files:(()=>{let l=r?`${p}
${r}`:p,a={"/styles.css":{code:l},...t};if("react"===s)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...a};if("vue3"===s){let n;return{"/src/App.vue":{code:(n=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${n}

<style>
${l}
</style>`)},...t}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:l},"/index.html":{code:n||d},...t}})(),customSetup:{dependencies:{...c[s],...a}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===s?["/App.tsx","/styles.css"]:"vue3"===s?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===s?"/App.tsx":"vue3"===s?"/src/App.vue":"/src/index.js"}})}function x({react:e,vue3:n,js:s,jsHtml:i,css:r,dependencies:c}){return(0,l.jsxs)(t.A,{groupId:"framework",defaultValue:"js",children:[(0,l.jsx)(a.A,{value:"js",label:"JavaScript",children:(0,l.jsx)(h,{template:"vanilla",code:s,html:i,css:r,dependencies:c})}),(0,l.jsx)(a.A,{value:"react",label:"React",children:(0,l.jsx)(h,{template:"react",code:e,css:r,dependencies:c})}),(0,l.jsx)(a.A,{value:"vue3",label:"Vue@3",children:(0,l.jsx)(h,{template:"vue3",code:n,css:r,dependencies:c})})]})}}}]);
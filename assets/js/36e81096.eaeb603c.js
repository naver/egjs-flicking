"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["2382"],{12132(e,n,s){s.r(n),s.d(n,{metadata:()=>a,default:()=>x,frontMatter:()=>c,contentTitle:()=>o,toc:()=>p,assets:()=>d});var a=JSON.parse('{"id":"demos/reactive/parallax","title":"Parallax","description":"Create a parallax scrolling effect using the Reactive API\'s indexProgress","source":"@site/docs/demos/reactive/parallax.mdx","sourceDirName":"demos/reactive","slug":"/demos/reactive/parallax","permalink":"/egjs-flicking/docs/demos/reactive/parallax","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/reactive/parallax.mdx","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"title":"Parallax","id":"parallax","slug":"/demos/reactive/parallax","sidebar_position":4,"description":"Create a parallax scrolling effect using the Reactive API\'s indexProgress","keywords":["flicking","carousel","parallax","reactive","indexProgress","transform"]},"sidebar":"demosSidebar","previous":{"title":"Prev / Next","permalink":"/egjs-flicking/docs/demos/reactive/prev-next"},"next":{"title":"Coverflow","permalink":"/egjs-flicking/docs/demos/reactive/coverflow"}}'),i=s(65723),l=s(54187),r=s(90761);let t=()=>(0,i.jsx)(r.A,{react:'import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";\nimport React from "react";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst OFFSETS = [180, 160, 140, 120, 100];\nconst SIZES = ["size4", "size1", "size3", "size2", "size3"];\n\nexport default function App() {\n  const flickingRef = React.useRef(null);\n  const { indexProgress } = useFlickingReactiveAPI(flickingRef);\n\n  return (\n    <Flicking ref={flickingRef}>\n      {[0, 1, 2, 3, 4].map(panelIndex => {\n        const childProgress = panelIndex - indexProgress;\n        const opacity = Math.min(Math.max(1 - Math.abs(childProgress), 0), 1);\n\n        return (\n          <div key={panelIndex} className="skeleton-panel">\n            {SIZES.map((size, i) => (\n              <span\n                key={i}\n                className={`skeleton-bar skeleton-bar-${size}`}\n                style={{\n                  transform: `translateX(${childProgress * OFFSETS[i]}px)`,\n                  opacity\n                }}\n              />\n            ))}\n          </div>\n        );\n      })}\n    </Flicking>\n  );\n}\n',vue3:'<script setup>\nimport Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";\nimport { ref } from "vue";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst OFFSETS = [180, 160, 140, 120, 100];\nconst SIZES = ["size4", "size1", "size3", "size2", "size3"];\n\nconst flickingRef = ref(null);\nconst { indexProgress } = useFlickingReactiveAPI(flickingRef);\n\nconst getBarStyle = (panelIndex, barIndex) => {\n  const childProgress = panelIndex - indexProgress.value;\n  const opacity = Math.min(Math.max(1 - Math.abs(childProgress), 0), 1);\n  return {\n    transform: `translateX(${childProgress * OFFSETS[barIndex]}px)`,\n    opacity\n  };\n};\n<\/script>\n\n<template>\n  <Flicking ref="flickingRef">\n    <div v-for="panelIndex in 5" :key="panelIndex - 1" class="skeleton-panel">\n      <span\n        v-for="(size, i) in SIZES"\n        :key="i"\n        :class="\'skeleton-bar skeleton-bar-\' + size"\n        :style="getBarStyle(panelIndex - 1, i)"\n      />\n    </div>\n  </Flicking>\n</template>\n',js:'import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst OFFSETS = [180, 160, 140, 120, 100];\n\nconst flicking = new Flicking("#flick");\nconst reactiveAPI = connectFlickingReactiveAPI(flicking);\n\nconst panels = document.querySelectorAll(".skeleton-panel");\n\nconst update = value => {\n  panels.forEach((panel, index) => {\n    const childProgress = index - value;\n    const opacity = Math.min(Math.max(1 - Math.abs(childProgress), 0), 1);\n\n    const bars = panel.querySelectorAll(".skeleton-bar");\n    bars.forEach((bar, i) => {\n      bar.style.transform = `translateX(${childProgress * OFFSETS[i]}px)`;\n      bar.style.opacity = opacity;\n    });\n  });\n};\n\n// Apply initial state and subscribe to changes\nupdate(reactiveAPI.indexProgress);\nreactiveAPI.subscribe("indexProgress", update);\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="flick" class="flicking-viewport">\n    <div class="flicking-camera">\n      <div class="skeleton-panel">\n        <span class="skeleton-bar skeleton-bar-size4"></span>\n        <span class="skeleton-bar skeleton-bar-size1"></span>\n        <span class="skeleton-bar skeleton-bar-size3"></span>\n        <span class="skeleton-bar skeleton-bar-size2"></span>\n        <span class="skeleton-bar skeleton-bar-size3"></span>\n      </div>\n      <div class="skeleton-panel">\n        <span class="skeleton-bar skeleton-bar-size4"></span>\n        <span class="skeleton-bar skeleton-bar-size1"></span>\n        <span class="skeleton-bar skeleton-bar-size3"></span>\n        <span class="skeleton-bar skeleton-bar-size2"></span>\n        <span class="skeleton-bar skeleton-bar-size3"></span>\n      </div>\n      <div class="skeleton-panel">\n        <span class="skeleton-bar skeleton-bar-size4"></span>\n        <span class="skeleton-bar skeleton-bar-size1"></span>\n        <span class="skeleton-bar skeleton-bar-size3"></span>\n        <span class="skeleton-bar skeleton-bar-size2"></span>\n        <span class="skeleton-bar skeleton-bar-size3"></span>\n      </div>\n      <div class="skeleton-panel">\n        <span class="skeleton-bar skeleton-bar-size4"></span>\n        <span class="skeleton-bar skeleton-bar-size1"></span>\n        <span class="skeleton-bar skeleton-bar-size3"></span>\n        <span class="skeleton-bar skeleton-bar-size2"></span>\n        <span class="skeleton-bar skeleton-bar-size3"></span>\n      </div>\n      <div class="skeleton-panel">\n        <span class="skeleton-bar skeleton-bar-size4"></span>\n        <span class="skeleton-bar skeleton-bar-size1"></span>\n        <span class="skeleton-bar skeleton-bar-size3"></span>\n        <span class="skeleton-bar skeleton-bar-size2"></span>\n        <span class="skeleton-bar skeleton-bar-size3"></span>\n      </div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".skeleton-panel {\n  width: 280px;\n  height: 180px;\n  margin-right: 10px;\n  border-radius: 12px;\n  background: #3498db;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 20px;\n  gap: 8px;\n  overflow: hidden;\n}\n\n.skeleton-bar {\n  height: 12px;\n  background: rgba(255, 255, 255, 0.8);\n  border-radius: 6px;\n}\n\n.skeleton-bar-size1 {\n  width: 40%;\n}\n.skeleton-bar-size2 {\n  width: 60%;\n}\n.skeleton-bar-size3 {\n  width: 80%;\n}\n.skeleton-bar-size4 {\n  width: 100%;\n}\n"}),c={title:"Parallax",id:"parallax",slug:"/demos/reactive/parallax",sidebar_position:4,description:"Create a parallax scrolling effect using the Reactive API's indexProgress",keywords:["flicking","carousel","parallax","reactive","indexProgress","transform"]},o="Parallax",d={},p=[{value:"Summary",id:"summary",level:2},{value:"Key API",id:"key-api",level:3},{value:"Effect Mapping",id:"effect-mapping",level:3},{value:"Details",id:"details",level:2},{value:"How It Works",id:"how-it-works",level:3},{value:"Related Options",id:"related-options",level:3},{value:"Use Cases",id:"use-cases",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related API",id:"related-api",level:3},{value:"Related Demos",id:"related-demos",level:3}];function h(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"parallax",children:"Parallax"})}),"\n",(0,i.jsxs)(n.p,{children:["Use ",(0,i.jsx)(n.code,{children:"indexProgress"})," from the Reactive API to create a parallax effect where inner elements move at different speeds based on the panel's distance from the camera center."]}),"\n",(0,i.jsx)(t,{}),"\n",(0,i.jsx)(n.h2,{id:"summary",children:"Summary"}),"\n",(0,i.jsx)(n.h3,{id:"key-api",children:"Key API"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Property"}),(0,i.jsx)(n.th,{children:"Type"}),(0,i.jsx)(n.th,{children:"Description"})]})}),(0,i.jsx)(n.tbody,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#indexprogress",children:(0,i.jsx)(n.code,{children:"indexProgress"})})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"number"})}),(0,i.jsx)(n.td,{children:"Camera position as a fractional panel index"})]})})]}),"\n",(0,i.jsx)(n.h3,{id:"effect-mapping",children:"Effect Mapping"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Panel Position"}),(0,i.jsx)(n.th,{children:"translateX"}),(0,i.jsx)(n.th,{children:"Opacity"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Current (childProgress = 0)"}),(0,i.jsx)(n.td,{children:"0px"}),(0,i.jsx)(n.td,{children:"1.0"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Adjacent (childProgress = \xb11)"}),(0,i.jsx)(n.td,{children:"\xb1offset"}),(0,i.jsx)(n.td,{children:"0.0"})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"details",children:"Details"}),"\n",(0,i.jsx)(n.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,i.jsxs)(n.p,{children:["Each panel contains skeleton bar elements. The ",(0,i.jsx)(n.code,{children:"childProgress"})," for each panel is calculated as ",(0,i.jsx)(n.code,{children:"panelIndex - indexProgress"}),". This value drives two visual effects:"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Horizontal offset"}),": Each bar translates by ",(0,i.jsx)(n.code,{children:"childProgress * offset"}),", where different bars have different offset values (100-180px), creating a layered depth effect."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Opacity"}),": Fades from 1 (current panel) to 0 (adjacent panels) based on ",(0,i.jsx)(n.code,{children:"|childProgress|"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:'The varying offsets per bar create the signature parallax look: elements closer to the "camera" appear to move faster than those further away.'}),"\n",(0,i.jsx)(n.h3,{id:"related-options",children:"Related Options"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'moveType: "freeScroll"'})}),": Produces smoother continuous parallax as the user scrolls freely."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["Default ",(0,i.jsx)(n.code,{children:"moveType"})," (snap)"]}),": Parallax still works but snaps between discrete panel positions."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"use-cases",children:"Use Cases"}),"\n",(0,i.jsx)(n.admonition,{title:"When to use",type:"info",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Card-based content with layered elements"}),"\n",(0,i.jsx)(n.li,{children:"Storytelling / editorial carousels"}),"\n",(0,i.jsx)(n.li,{children:"Product showcase with depth effect"}),"\n"]})}),"\n",(0,i.jsx)(n.h2,{id:"related-links",children:"Related Links"}),"\n",(0,i.jsx)(n.h3,{id:"related-api",children:"Related API"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#indexprogress",children:(0,i.jsx)(n.code,{children:"indexProgress"})}),": Fractional panel index progress"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"./coverflow",children:"Coverflow"}),": 3D rotation effect using indexProgress"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"./progress-bar",children:"Progress Bar"}),": Scroll progress indicator"]}),"\n"]})]})}function x(e={}){let{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},90761(e,n,s){s.d(n,{A:()=>x});var a=s(65723),i=s(7210),l=s(78863);s(22155);var r=s(19612);let t="^4.11.4",c={react:{"@egjs/react-flicking":t,"@egjs/flicking":t},vue3:{"@egjs/vue3-flicking":t,"@egjs/flicking":t},vanilla:{"@egjs/flicking":t}},o=`<!DOCTYPE html>
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
`;function h({code:e,html:n,template:s="react",dependencies:i={},files:l={},css:t=""}){return(0,a.jsx)(r.OZ,{template:"vue3"===s?"vue":"vanilla"===s?"vanilla":"react",files:(()=>{let a=t?`${p}
${t}`:p,i={"/styles.css":{code:a},...l};if("react"===s)return{"/App.tsx":{code:e},"/index.js":{code:d,hidden:!0},...i};if("vue3"===s){let n;return{"/src/App.vue":{code:(n=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${n}

<style>
${a}
</style>`)},...l}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:a},"/index.html":{code:n||o},...l}})(),customSetup:{dependencies:{...c[s],...i}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===s?["/App.tsx","/styles.css"]:"vue3"===s?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===s?"/App.tsx":"vue3"===s?"/src/App.vue":"/src/index.js"}})}function x({react:e,vue3:n,js:s,jsHtml:r,css:t,dependencies:c}){return(0,a.jsxs)(l.A,{groupId:"framework",defaultValue:"js",children:[(0,a.jsx)(i.A,{value:"js",label:"JavaScript",children:(0,a.jsx)(h,{template:"vanilla",code:s,html:r,css:t,dependencies:c})}),(0,a.jsx)(i.A,{value:"react",label:"React",children:(0,a.jsx)(h,{template:"react",code:e,css:t,dependencies:c})}),(0,a.jsx)(i.A,{value:"vue3",label:"Vue@3",children:(0,a.jsx)(h,{template:"vue3",code:n,css:t,dependencies:c})})]})}}}]);
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["1197"],{91660(e,n,i){i.r(n),i.d(n,{metadata:()=>s,default:()=>p,frontMatter:()=>d,contentTitle:()=>a,toc:()=>h,assets:()=>o});var s=JSON.parse('{"id":"demos/reactive/coverflow","title":"Coverflow","description":"Create a 3D coverflow effect using the Reactive API\'s indexProgress","source":"@site/docs/demos/reactive/coverflow.mdx","sourceDirName":"demos/reactive","slug":"/demos/reactive/coverflow","permalink":"/egjs-flicking/docs/demos/reactive/coverflow","draft":false,"unlisted":false,"editUrl":"https://github.com/naver/egjs-flicking/edit/master/docs/docs/demos/reactive/coverflow.mdx","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"title":"Coverflow","id":"coverflow","slug":"/demos/reactive/coverflow","sidebar_position":5,"description":"Create a 3D coverflow effect using the Reactive API\'s indexProgress","keywords":["flicking","carousel","coverflow","3D","reactive","indexProgress","transform","rotateY"]},"sidebar":"demosSidebar","previous":{"title":"Parallax","permalink":"/egjs-flicking/docs/demos/reactive/parallax"},"next":{"title":"Fade","permalink":"/egjs-flicking/docs/demos/plugins/fade"}}'),r=i(65723),t=i(54187),l=i(90761);let c=()=>(0,r.jsx)(l.A,{react:'import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";\nimport React from "react";\nimport "@egjs/react-flicking/dist/flicking.css";\nimport "./styles.css";\n\nconst COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];\nconst LENGTH = 5;\n\nexport default function App() {\n  const flickingRef = React.useRef(null);\n  const { indexProgress } = useFlickingReactiveAPI(flickingRef);\n\n  return (\n    <Flicking ref={flickingRef} circular={true} align="center" className="flicking-coverflow">\n      {[0, 1, 2, 3, 4].map(index => {\n        const childProgress = ((index - indexProgress + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;\n        const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);\n\n        return (\n          <div\n            key={index}\n            className="flicking-panel"\n            style={{\n              backgroundColor: COLORS[index % COLORS.length],\n              transformOrigin: `${50 - childProgress * 50}% 50%`,\n              transform: `rotateY(${-childProgress * 50}deg) scale(${scale})`\n            }}\n          >\n            {index + 1}\n          </div>\n        );\n      })}\n    </Flicking>\n  );\n}\n',vue3:'<script setup>\nimport Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";\nimport { ref } from "vue";\nimport "@egjs/vue3-flicking/dist/flicking.css";\n\nconst COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];\nconst LENGTH = 5;\n\nconst flickingRef = ref(null);\nconst { indexProgress } = useFlickingReactiveAPI(flickingRef);\n\nconst getStyle = index => {\n  const childProgress = ((index - indexProgress.value + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;\n  const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);\n\n  return {\n    backgroundColor: COLORS[index % COLORS.length],\n    transformOrigin: `${50 - childProgress * 50}% 50%`,\n    transform: `rotateY(${-childProgress * 50}deg) scale(${scale})`\n  };\n};\n<\/script>\n\n<template>\n  <Flicking\n    ref="flickingRef"\n    :options="{ circular: true, align: \'center\' }"\n    class="flicking-coverflow"\n  >\n    <div\n      v-for="index in 5"\n      :key="index - 1"\n      class="flicking-panel"\n      :style="getStyle(index - 1)"\n    >\n      {{ index }}\n    </div>\n  </Flicking>\n</template>\n',js:'import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";\nimport "@egjs/flicking/dist/flicking.css";\nimport "./styles.css";\n\n// Capture panel references BEFORE Flicking init (circular mode may modify DOM)\nconst panels = document.querySelectorAll(".flicking-panel");\nconst LENGTH = 5;\n\nconst flicking = new Flicking("#flick", {\n  circular: true,\n  align: "center"\n});\nconst reactiveAPI = connectFlickingReactiveAPI(flicking);\n\nconst update = value => {\n  panels.forEach((panel, index) => {\n    const childProgress = ((index - value + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;\n    const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);\n\n    panel.style.transformOrigin = `${50 - childProgress * 50}% 50%`;\n    panel.style.transform = `rotateY(${-childProgress * 50}deg) scale(${scale})`;\n  });\n};\n\n// Apply initial state and subscribe to changes\nupdate(reactiveAPI.indexProgress);\nreactiveAPI.subscribe("indexProgress", update);\n',jsHtml:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="/styles.css" />\n</head>\n<body>\n  <div id="flick" class="flicking-viewport flicking-coverflow">\n    <div class="flicking-camera">\n      <div class="flicking-panel" style="background: #3498db">1</div>\n      <div class="flicking-panel" style="background: #e74c3c">2</div>\n      <div class="flicking-panel" style="background: #2ecc71">3</div>\n      <div class="flicking-panel" style="background: #9b59b6">4</div>\n      <div class="flicking-panel" style="background: #f39c12">5</div>\n    </div>\n  </div>\n</body>\n</html>\n',css:".flicking-coverflow {\n  perspective: 800px;\n}\n\n.flicking-coverflow .flicking-camera {\n  transform-style: preserve-3d;\n}\n\n.flicking-panel {\n  width: 150px;\n  height: 200px;\n  margin: 0 10px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n  font-weight: bold;\n  color: white;\n  backface-visibility: hidden;\n}\n"}),d={title:"Coverflow",id:"coverflow",slug:"/demos/reactive/coverflow",sidebar_position:5,description:"Create a 3D coverflow effect using the Reactive API's indexProgress",keywords:["flicking","carousel","coverflow","3D","reactive","indexProgress","transform","rotateY"]},a="Coverflow",o={},h=[{value:"Summary",id:"summary",level:2},{value:"Key API",id:"key-api",level:3},{value:"Effect Mapping",id:"effect-mapping",level:3},{value:"Details",id:"details",level:2},{value:"What is indexProgress?",id:"what-is-indexprogress",level:3},{value:"How It Works",id:"how-it-works",level:3},{value:"Related Options",id:"related-options",level:3},{value:"Use Cases",id:"use-cases",level:3},{value:"Important Notes",id:"important-notes",level:3},{value:"Related Links",id:"related-links",level:2},{value:"Related API",id:"related-api",level:3},{value:"Related Demos",id:"related-demos",level:3}];function g(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"coverflow",children:"Coverflow"})}),"\n",(0,r.jsxs)(n.p,{children:["Use ",(0,r.jsx)(n.code,{children:"indexProgress"})," from the Reactive API to apply 3D rotation and scaling effects that create an album-art style coverflow interface."]}),"\n",(0,r.jsx)(c,{}),"\n",(0,r.jsx)(n.h2,{id:"summary",children:"Summary"}),"\n",(0,r.jsx)(n.h3,{id:"key-api",children:"Key API"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Property"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#indexprogress",children:(0,r.jsx)(n.code,{children:"indexProgress"})})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"number"})}),(0,r.jsx)(n.td,{children:"Camera position as a fractional panel index"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.a,{href:"../../api/types/FlickingReactiveObject",children:(0,r.jsx)(n.code,{children:"useFlickingReactiveAPI"})})}),(0,r.jsx)(n.td,{children:"Hook (React)"}),(0,r.jsx)(n.td,{children:"Subscribe to reactive state in React"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.a,{href:"../../api/functions/connectFlickingReactiveAPI",children:(0,r.jsx)(n.code,{children:"connectFlickingReactiveAPI"})})}),(0,r.jsx)(n.td,{children:"Function (Vanilla)"}),(0,r.jsx)(n.td,{children:"Subscribe to reactive state in Vanilla JS"})]})]})]}),"\n",(0,r.jsx)(n.h3,{id:"effect-mapping",children:"Effect Mapping"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Panel Position"}),(0,r.jsx)(n.th,{children:"rotateY"}),(0,r.jsx)(n.th,{children:"scale"}),(0,r.jsx)(n.th,{children:"transformOrigin"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Current (childProgress ~ 0)"}),(0,r.jsx)(n.td,{children:"0deg"}),(0,r.jsx)(n.td,{children:"0.9"}),(0,r.jsx)(n.td,{children:"50% 50%"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Adjacent (childProgress ~ +/-1)"}),(0,r.jsx)(n.td,{children:"-/+50deg"}),(0,r.jsx)(n.td,{children:"0.7"}),(0,r.jsx)(n.td,{children:"shifted toward center"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Far (childProgress ~ +/-2)"}),(0,r.jsx)(n.td,{children:"-/+100deg"}),(0,r.jsx)(n.td,{children:"0.5"}),(0,r.jsx)(n.td,{children:"shifted toward center"})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"details",children:"Details"}),"\n",(0,r.jsx)(n.h3,{id:"what-is-indexprogress",children:"What is indexProgress?"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"indexProgress"})," represents the current camera position as a fractional panel index. For example, ",(0,r.jsx)(n.code,{children:"2.5"})," means the camera is exactly halfway between panel 2 and panel 3. It updates in real-time during drag, enabling smooth visual transitions."]}),"\n",(0,r.jsx)(n.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,r.jsxs)(n.p,{children:["For circular mode, each panel's ",(0,r.jsx)(n.code,{children:"childProgress"})," is calculated with wrapping:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const childProgress = (index - indexProgress + length * 1.5) % length - length * 0.5;\n"})}),"\n",(0,r.jsx)(n.p,{children:"This value drives three CSS transform properties:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"rotateY"})}),": Panels rotate around the Y-axis, angling away from center"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"scale"})}),": Panels shrink as they move further from center"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"transformOrigin"})}),": Shifts to create a natural perspective pivot point"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"related-options",children:"Related Options"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"circular: true"})}),": Essential for seamless coverflow looping without dead ends."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:'align: "center"'})}),": Places the active panel at the visual center of the coverflow."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"use-cases",children:"Use Cases"}),"\n",(0,r.jsx)(n.admonition,{title:"When to use",type:"info",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Album / portfolio gallery"}),"\n",(0,r.jsx)(n.li,{children:"Product showcase"}),"\n",(0,r.jsx)(n.li,{children:"Media player UI"}),"\n"]})}),"\n",(0,r.jsx)(n.h3,{id:"important-notes",children:"Important Notes"}),"\n",(0,r.jsx)(n.admonition,{title:"Note",type:"warning",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Set CSS ",(0,r.jsx)(n.code,{children:"perspective"})," on the viewport and ",(0,r.jsx)(n.code,{children:"transform-style: preserve-3d"})," on the camera for 3D effects to render."]}),"\n",(0,r.jsx)(n.li,{children:"Use at least 5 panels to avoid gaps when using circular mode."}),"\n"]})}),"\n",(0,r.jsx)(n.h2,{id:"related-links",children:"Related Links"}),"\n",(0,r.jsx)(n.h3,{id:"related-api",children:"Related API"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"../../api/interfaces/FlickingReactiveState#indexprogress",children:(0,r.jsx)(n.code,{children:"indexProgress"})}),": Fractional panel index progress"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"../../api/functions/connectFlickingReactiveAPI",children:(0,r.jsx)(n.code,{children:"connectFlickingReactiveAPI"})}),": Connect Flicking to Reactive API"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"related-demos",children:"Related Demos"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"./parallax",children:"Parallax"}),": Parallax scrolling effect using indexProgress"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"./progress-bar",children:"Progress Bar"}),": Scroll progress indicator"]}),"\n"]})]})}function p(e={}){let{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(g,{...e})}):g(e)}},90761(e,n,i){i.d(n,{A:()=>p});var s=i(65723),r=i(7210),t=i(78863);i(22155);var l=i(19612);let c="^4.11.4",d={react:{"@egjs/react-flicking":c,"@egjs/flicking":c},vue3:{"@egjs/vue3-flicking":c,"@egjs/flicking":c},vanilla:{"@egjs/flicking":c}},a=`<!DOCTYPE html>
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
`;function g({code:e,html:n,template:i="react",dependencies:r={},files:t={},css:c=""}){return(0,s.jsx)(l.OZ,{template:"vue3"===i?"vue":"vanilla"===i?"vanilla":"react",files:(()=>{let s=c?`${h}
${c}`:h,r={"/styles.css":{code:s},...t};if("react"===i)return{"/App.tsx":{code:e},"/index.js":{code:o,hidden:!0},...r};if("vue3"===i){let n;return{"/src/App.vue":{code:(n=e.replace(/\n*<style>[\s\S]*?<\/style>/,""),`${n}

<style>
${s}
</style>`)},...t}}return{"/src/index.js":{code:e},"/index.js":{code:'import "./src/index.js";',hidden:!0},"/src/styles.css":{code:s},"/index.html":{code:n||a},...t}})(),customSetup:{dependencies:{...d[i],...r}},options:{showLineNumbers:!0,editorHeight:400,externalResources:[],visibleFiles:"react"===i?["/App.tsx","/styles.css"]:"vue3"===i?["/src/App.vue"]:["/src/index.js","/index.html","/src/styles.css"],activeFile:"react"===i?"/App.tsx":"vue3"===i?"/src/App.vue":"/src/index.js"}})}function p({react:e,vue3:n,js:i,jsHtml:l,css:c,dependencies:d}){return(0,s.jsxs)(t.A,{groupId:"framework",defaultValue:"js",children:[(0,s.jsx)(r.A,{value:"js",label:"JavaScript",children:(0,s.jsx)(g,{template:"vanilla",code:i,html:l,css:c,dependencies:d})}),(0,s.jsx)(r.A,{value:"react",label:"React",children:(0,s.jsx)(g,{template:"react",code:e,css:c,dependencies:d})}),(0,s.jsx)(r.A,{value:"vue3",label:"Vue@3",children:(0,s.jsx)(g,{template:"vue3",code:n,css:c,dependencies:d})})]})}}}]);
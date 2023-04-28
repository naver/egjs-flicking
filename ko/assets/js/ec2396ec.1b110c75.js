"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[68816],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>y});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var a=n.createContext({}),p=function(e){var t=n.useContext(a),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(a.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(r),f=o,y=u["".concat(a,".").concat(f)]||u[f]||d[f]||i;return r?n.createElement(y,l(l({ref:t},c),{},{components:r})):n.createElement(y,l({ref:t},c))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,l=new Array(i);l[0]=f;var s={};for(var a in t)hasOwnProperty.call(t,a)&&(s[a]=t[a]);s.originalType=e,s[u]="string"==typeof e?e:o,l[1]=s;for(var p=2;p<i;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},73071:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>a,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=r(87462),o=(r(67294),r(3905));const i={title:"Polyfills",id:"polyfills",slug:"/polyfills",custom_edit_url:null,sidebar_position:6},l=void 0,s={unversionedId:"tutorials/polyfills",id:"version-4.6.3/tutorials/polyfills",title:"Polyfills",description:"Flicking is based on es5 and additionally needs es6 Promise to work properly.",source:"@site/versioned_docs/version-4.6.3/tutorials/polyfills.mdx",sourceDirName:"tutorials",slug:"/polyfills",permalink:"/egjs-flicking/ko/docs/4.6.3/polyfills",draft:!1,editUrl:null,tags:[],version:"4.6.3",sidebarPosition:6,frontMatter:{title:"Polyfills",id:"polyfills",slug:"/polyfills",custom_edit_url:null,sidebar_position:6},sidebar:"docs",previous:{title:"Handling errors",permalink:"/egjs-flicking/ko/docs/4.6.3/error-handling"},next:{title:"Server Side Rendering (SSR)",permalink:"/egjs-flicking/ko/docs/4.6.3/ssr"}},a={},p=[],c={toc:p},u="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Flicking is based on es5 and additionally needs es6 Promise to work properly.",(0,o.kt)("br",{parentName:"p"}),"\n","es5 is basically supported on IE9+ (",(0,o.kt)("a",{parentName:"p",href:"http://kangax.github.io/compat-table/es5/"},"Source"),")",(0,o.kt)("br",{parentName:"p"}),"\n","So, only es6 Promise is needed to run Flicking on the older browsers."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/es6-promise/dist/es6-promise.auto.js"><\/script>\n')),(0,o.kt)("p",null,"Adding the above script will make Flicking run on the older browsers."))}d.isMDXComponent=!0}}]);
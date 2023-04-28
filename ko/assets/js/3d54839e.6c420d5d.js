"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[90147],{3905:(t,e,r)=>{r.d(e,{Zo:()=>d,kt:()=>g});var n=r(67294);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function p(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},l=Object.keys(t);for(n=0;n<l.length;n++)r=l[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)r=l[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}var o=n.createContext({}),c=function(t){var e=n.useContext(o),r=e;return t&&(r="function"==typeof t?t(e):i(i({},e),t)),r},d=function(t){var e=c(t.components);return n.createElement(o.Provider,{value:e},t.children)},m="mdxType",s={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},k=n.forwardRef((function(t,e){var r=t.components,a=t.mdxType,l=t.originalType,o=t.parentName,d=p(t,["components","mdxType","originalType","parentName"]),m=c(r),k=a,g=m["".concat(o,".").concat(k)]||m[k]||s[k]||l;return r?n.createElement(g,i(i({ref:e},d),{},{components:r})):n.createElement(g,i({ref:e},d))}));function g(t,e){var r=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var l=r.length,i=new Array(l);i[0]=k;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=t,p[m]="string"==typeof t?t:a,i[1]=p;for(var c=2;c<l;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}k.displayName="MDXCreateElement"},2639:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>o,contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>p,toc:()=>c});var n=r(87462),a=(r(67294),r(3905));const l={custom_edit_url:null},i=void 0,p={unversionedId:"api/Viewport",id:"version-4.6.3/api/Viewport",title:"Viewport",description:"\ubdf0\ud3ec\ud2b8 \ud06c\uae30 \uc815\ubcf4\ub97c \ub2f4\ub2f9\ud558\ub294 \ucef4\ud3ec\ub10c\ud2b8",source:"@site/i18n/ko/docusaurus-plugin-content-docs/version-4.6.3/api/Viewport.mdx",sourceDirName:"api",slug:"/api/Viewport",permalink:"/egjs-flicking/ko/docs/4.6.3/api/Viewport",draft:!1,editUrl:null,tags:[],version:"4.6.3",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"FlickingError",permalink:"/egjs-flicking/ko/docs/4.6.3/api/FlickingError"},next:{title:"Panel",permalink:"/egjs-flicking/ko/docs/4.6.3/api/Panel"}},o={},c=[{value:"Constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"element",id:"element",level:3},{value:"width",id:"width",level:3},{value:"height",id:"height",level:3},{value:"padding",id:"padding",level:3},{value:"Methods",id:"methods",level:2},{value:"setSize",id:"setSize",level:3},{value:"resize",id:"resize",level:3}],d={toc:c},m="wrapper";function s(t){let{components:e,...r}=t;return(0,a.kt)(m,(0,n.Z)({},d,r,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"class Viewport\n")),(0,a.kt)("p",null,"\ubdf0\ud3ec\ud2b8 \ud06c\uae30 \uc815\ubcf4\ub97c \ub2f4\ub2f9\ud558\ub294 \ucef4\ud3ec\ub10c\ud2b8"),(0,a.kt)("div",{className:"container"},(0,a.kt)("div",{className:"row mb-2"},(0,a.kt)("div",{className:"col col--6"},(0,a.kt)("strong",null,"Properties")),(0,a.kt)("div",{className:"col col--6"},(0,a.kt)("strong",null,"Methods"))),(0,a.kt)("div",{className:"row"},(0,a.kt)("div",{className:"col col--6"},(0,a.kt)("a",{href:"#element"},"element"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#width"},"width"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#height"},"height"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#padding"},"padding")),(0,a.kt)("div",{className:"col col--6"},(0,a.kt)("a",{href:"#setSize"},"setSize"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#resize"},"resize")))),(0,a.kt)("h2",{id:"constructor"},"Constructor"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"new Viewport(el)\n")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"el"),(0,a.kt)("td",{parentName:"tr",align:"center"},"HTMLElement"),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},"\ubdf0\ud3ec\ud2b8 \uc5d8\ub9ac\uba3c\ud2b8")))),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"element"},"element"),(0,a.kt)("div",{className:"bulma-tags"},(0,a.kt)("span",{className:"bulma-tag is-warning"},"readonly")),(0,a.kt)("p",null,"\ubdf0\ud3ec\ud2b8(root) \uc5d8\ub9ac\uba3c\ud2b8"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": HTMLElement"),(0,a.kt)("h3",{id:"width"},"width"),(0,a.kt)("div",{className:"bulma-tags"},(0,a.kt)("span",{className:"bulma-tag is-warning"},"readonly")),(0,a.kt)("p",null,"\ubdf0\ud3ec\ud2b8 \ub108\ube44"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": number"),(0,a.kt)("h3",{id:"height"},"height"),(0,a.kt)("div",{className:"bulma-tags"},(0,a.kt)("span",{className:"bulma-tag is-warning"},"readonly")),(0,a.kt)("p",null,"\ubdf0\ud3ec\ud2b8 \ub192\uc774"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": number"),(0,a.kt)("h3",{id:"padding"},"padding"),(0,a.kt)("div",{className:"bulma-tags"},(0,a.kt)("span",{className:"bulma-tag is-warning"},"readonly")),(0,a.kt)("p",null,"\ubdf0\ud3ec\ud2b8 CSS padding \uac12"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": object"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"left"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number"),(0,a.kt)("td",{parentName:"tr",align:"center"},"CSS ",(0,a.kt)("inlineCode",{parentName:"td"},"padding-left"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"right"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number"),(0,a.kt)("td",{parentName:"tr",align:"center"},"CSS ",(0,a.kt)("inlineCode",{parentName:"td"},"padding-right"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"top"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number"),(0,a.kt)("td",{parentName:"tr",align:"center"},"CSS ",(0,a.kt)("inlineCode",{parentName:"td"},"padding-top"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"bottom"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number"),(0,a.kt)("td",{parentName:"tr",align:"center"},"CSS ",(0,a.kt)("inlineCode",{parentName:"td"},"padding-bottom"))))),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("h3",{id:"setSize"},"setSize"),(0,a.kt)("div",{className:"bulma-tags"}),(0,a.kt)("p",null,"\ubdf0\ud3ec\ud2b8 \ud06c\uae30\ub97c \ubcc0\uacbd\ud569\ub2c8\ub2e4.",(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("inlineCode",{parentName:"p"},".flicking-viewport")," \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \ud574\ub2f9 \ud06c\uae30\uc758 CSS width/height\ub97c \uc801\uc6a9\ud569\ub2c8\ub2e4"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"size"),(0,a.kt)("td",{parentName:"tr",align:"center"},"object"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},"\uc0c8 \ubdf0\ud3ec\ud2b8 \ud06c\uae30")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"size.width"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number ","|"," string"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},"CSS \ubb38\uc790\uc5f4 \ub610\ub294 \uc22b\uc790(px)")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"size.height"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number ","|"," string"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},"CSS \ubb38\uc790\uc5f4 \ub610\ub294 \uc22b\uc790(px)")))),(0,a.kt)("h3",{id:"resize"},"resize"),(0,a.kt)("div",{className:"bulma-tags"}),(0,a.kt)("p",null,"\ud604\uc7ac \ubdf0\ud3ec\ud2b8 \uc5d8\ub9ac\uba3c\ud2b8\uc758 \ud06c\uae30\ub85c \ub108\ube44/\ub192\uc774\ub97c \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4"))}s.isMDXComponent=!0}}]);
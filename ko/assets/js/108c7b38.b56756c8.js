(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{100:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return b})),r.d(t,"metadata",(function(){return i})),r.d(t,"toc",(function(){return o})),r.d(t,"default",(function(){return p}));var n=r(3),a=r(8),c=(r(0),r(401)),b={custom_edit_url:null},i={unversionedId:"api/EVENTS",id:"version-4.1.0/api/EVENTS",isDocsHomePage:!1,title:"EVENTS",description:"`ts",source:"@site/i18n/ko/docusaurus-plugin-content-docs/version-4.1.0/api/EVENTS.mdx",sourceDirName:"api",slug:"/api/EVENTS",permalink:"/egjs-flicking/ko/docs/4.1.0/api/EVENTS",editUrl:null,version:"4.1.0",frontMatter:{custom_edit_url:null},sidebar:"version-4.1.0/api",previous:{title:"ERROR_CODE",permalink:"/egjs-flicking/ko/docs/4.1.0/api/ERROR_CODE"},next:{title:"ALIGN",permalink:"/egjs-flicking/ko/docs/4.1.0/api/ALIGN"}},o=[{value:"EVENTS",id:"EVENTS",children:[]}],l={toc:o};function p(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-ts"},"const EVENTS\n")),Object(c.b)("h3",{id:"EVENTS"},"EVENTS"),Object(c.b)("div",{className:"bulma-tags"}),Object(c.b)("p",null,Object(c.b)("a",{parentName:"p",href:"Flicking"},"Flicking"),"\uc758 \uc774\ubca4\ud2b8 \uc774\ub984 \ubb38\uc790\uc5f4\ub4e4\uc744 \ub2f4\uc740 \uac1d\uccb4"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Type"),": object"),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:"center"},"PROPERTY"),Object(c.b)("th",{parentName:"tr",align:"center"},"TYPE"),Object(c.b)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"HOLD_START"),Object(c.b)("td",{parentName:"tr",align:"center"},'"holdStart"'),Object(c.b)("td",{parentName:"tr",align:"center"},"holdStart \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"HOLD_END"),Object(c.b)("td",{parentName:"tr",align:"center"},'"holdEnd"'),Object(c.b)("td",{parentName:"tr",align:"center"},"holdEnd \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"MOVE_START"),Object(c.b)("td",{parentName:"tr",align:"center"},'"moveStart"'),Object(c.b)("td",{parentName:"tr",align:"center"},"moveStart \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"MOVE"),Object(c.b)("td",{parentName:"tr",align:"center"},'"move"'),Object(c.b)("td",{parentName:"tr",align:"center"},"move \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"MOVE_END"),Object(c.b)("td",{parentName:"tr",align:"center"},'"moveEnd"'),Object(c.b)("td",{parentName:"tr",align:"center"},"moveEnd \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"WILL_CHANGE"),Object(c.b)("td",{parentName:"tr",align:"center"},'"willChange"'),Object(c.b)("td",{parentName:"tr",align:"center"},"willChange \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"CHANGED"),Object(c.b)("td",{parentName:"tr",align:"center"},'"changed"'),Object(c.b)("td",{parentName:"tr",align:"center"},"changed \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"WILL_RESTORE"),Object(c.b)("td",{parentName:"tr",align:"center"},'"willRestore"'),Object(c.b)("td",{parentName:"tr",align:"center"},"willRestore \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"RESTORED"),Object(c.b)("td",{parentName:"tr",align:"center"},'"restored"'),Object(c.b)("td",{parentName:"tr",align:"center"},"restored \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"SELECT"),Object(c.b)("td",{parentName:"tr",align:"center"},'"select"'),Object(c.b)("td",{parentName:"tr",align:"center"},"select \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"NEED_PANEL"),Object(c.b)("td",{parentName:"tr",align:"center"},'"needPanel"'),Object(c.b)("td",{parentName:"tr",align:"center"},"needPanel \uc774\ubca4\ud2b8")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:"center"},"PANEL_CHANGE"),Object(c.b)("td",{parentName:"tr",align:"center"},'"panelChange"'),Object(c.b)("td",{parentName:"tr",align:"center"},"panelChange \uc774\ubca4\ud2b8")))),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-ts"},'import { EVENTS } from "@egjs/flicking";\nEVENTS.MOVE_START; // "moveStart"\n')))}p.isMDXComponent=!0},401:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return j}));var n=r(0),a=r.n(n);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},d=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},O=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,c=e.originalType,b=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),d=p(r),O=n,j=d["".concat(b,".").concat(O)]||d[O]||m[O]||c;return r?a.a.createElement(j,i(i({ref:t},l),{},{components:r})):a.a.createElement(j,i({ref:t},l))}));function j(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=r.length,b=new Array(c);b[0]=O;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:n,b[1]=i;for(var l=2;l<c;l++)b[l]=r[l];return a.a.createElement.apply(null,b)}return a.a.createElement.apply(null,r)}O.displayName="MDXCreateElement"}}]);
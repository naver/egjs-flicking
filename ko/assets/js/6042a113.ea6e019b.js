"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1074],{3905:function(e,r,n){n.d(r,{Zo:function(){return p},kt:function(){return f}});var t=n(67294);function o(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function i(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?i(Object(n),!0).forEach((function(r){o(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function c(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var a=t.createContext({}),s=function(e){var r=t.useContext(a),n=r;return e&&(n="function"==typeof e?e(r):l(l({},r),e)),n},p=function(e){var r=s(e.components);return t.createElement(a.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},d=t.forwardRef((function(e,r){var n=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=s(n),f=o,g=d["".concat(a,".").concat(f)]||d[f]||u[f]||i;return n?t.createElement(g,l(l({ref:r},p),{},{components:n})):t.createElement(g,l({ref:r},p))}));function f(e,r){var n=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=n.length,l=new Array(i);l[0]=d;var c={};for(var a in r)hasOwnProperty.call(r,a)&&(c[a]=r[a]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var s=2;s<i;s++)l[s]=n[s];return t.createElement.apply(null,l)}return t.createElement.apply(null,n)}d.displayName="MDXCreateElement"},98723:function(e,r,n){n.r(r),n.d(r,{assets:function(){return d},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return f}});var t=n(87462),o=n(63366),i=(n(67294),n(3905)),l=n(39960),c=n(44996),a=["components"],s={title:"Handling errors",id:"error-handling",slug:"/error-handling",custom_edit_url:null},p=void 0,u={unversionedId:"error-handling",id:"version-4.5.1/error-handling",title:"Handling errors",description:"All known Flicking errors are thrown as FlickingError with a code property set as listed on the ERROR_CODE.",source:"@site/versioned_docs/version-4.5.1/error-handling.mdx",sourceDirName:".",slug:"/error-handling",permalink:"/egjs-flicking/ko/docs/4.5.1/error-handling",editUrl:null,tags:[],version:"4.5.1",frontMatter:{title:"Handling errors",id:"error-handling",slug:"/error-handling",custom_edit_url:null},sidebar:"docs",previous:{title:"Listening to Events",permalink:"/egjs-flicking/ko/docs/4.5.1/listening-to-events"},next:{title:"Polyfills",permalink:"/egjs-flicking/ko/docs/4.5.1/polyfills"}},d={},f=[],g={toc:f};function m(e){var r=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,t.Z)({},g,n,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"All known Flicking errors are thrown as ",(0,i.kt)(l.Z,{to:(0,c.Z)("docs/api/FlickingError"),mdxType:"Link"},"FlickingError")," with a `code` property set as listed on the ",(0,i.kt)(l.Z,{to:(0,c.Z)("docs/api/ERROR_CODE"),mdxType:"Link"},"ERROR_CODE"),"."),(0,i.kt)("p",null,"A common use-case for this is when you're calling a ",(0,i.kt)(l.Z,{to:(0,c.Z)("docs/api/Flicking#prev"),mdxType:"Link"},"prev")," / ",(0,i.kt)(l.Z,{to:(0,c.Z)("docs/api/Flicking#next"),mdxType:"Link"},"next")," / ",(0,i.kt)(l.Z,{to:(0,c.Z)("docs/api/Flicking#moveTo"),mdxType:"Link"},"moveTo")," of Flicking which can throw an error when Flicking's already animating."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { FlickingError, ERROR_CODE } from "@egjs/flicking";\n\ntry {\n  await flicking.next();\n} catch (err) {\n  if (err instanceof FlickingError) {\n    if (err.code === ERROR_CODE.ANIMATION_ALREADY_PLAYING) {\n      console.error("Animation is already playing!");\n    } else if (err.code === ERROR_CODE.ANIMATION_INTERRUPTED) {\n      console.error("Animation is interrupted by user.");\n    }\n  }\n}\n')),(0,i.kt)("p",null,"See all possible error codes at ",(0,i.kt)(l.Z,{to:(0,c.Z)("docs/api/ERROR_CODE"),mdxType:"Link"},"ERROR_CODE"),"."))}m.isMDXComponent=!0}}]);
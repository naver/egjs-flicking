(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{132:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return l})),a.d(t,"toc",(function(){return i})),a.d(t,"default",(function(){return o}));var n=a(3),r=a(8),b=(a(0),a(348)),c={custom_edit_url:null},l={unversionedId:"api/SnapControl",id:"version-4.0.0/api/SnapControl",isDocsHomePage:!1,title:"SnapControl",description:"`ts",source:"@site/versioned_docs/version-4.0.0/api/SnapControl.mdx",sourceDirName:"api",slug:"/api/SnapControl",permalink:"/egjs-flicking/docs/4.0.0/api/SnapControl",editUrl:null,version:"4.0.0",frontMatter:{custom_edit_url:null},sidebar:"version-4.0.0/api",previous:{title:"FreeControl",permalink:"/egjs-flicking/docs/4.0.0/api/FreeControl"},next:{title:"AnimatingState",permalink:"/egjs-flicking/docs/4.0.0/api/AnimatingState"}},i=[{value:"Properties",id:"properties",children:[{value:"controller",id:"controller",children:[]},{value:"activeIndex",id:"activeIndex",children:[]},{value:"activePanel",id:"activePanel",children:[]},{value:"animating",id:"animating",children:[]},{value:"holding",id:"holding",children:[]}]},{value:"Methods",id:"methods",children:[{value:"moveToPosition",id:"moveToPosition",children:[]},{value:"init",id:"init",children:[]},{value:"destroy",id:"destroy",children:[]},{value:"enable",id:"enable",children:[]},{value:"disable",id:"disable",children:[]},{value:"updatePosition",id:"updatePosition",children:[]},{value:"updateInput",id:"updateInput",children:[]},{value:"resetActive",id:"resetActive",children:[]},{value:"moveToPanel",id:"moveToPanel",children:[]}]}],p={toc:i};function o(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(b.b)("wrapper",Object(n.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-ts"},"class SnapControl extends Control\n")),Object(b.b)("p",null,"A ",Object(b.b)("a",{parentName:"p",href:"Control"},"Control")," that uses a release momentum to choose destination panel"),Object(b.b)("div",{className:"container"},Object(b.b)("div",{className:"row mb-2"},Object(b.b)("div",{className:"col col--6"},Object(b.b)("strong",null,"Properties")),Object(b.b)("div",{className:"col col--6"},Object(b.b)("strong",null,"Methods"))),Object(b.b)("div",{className:"row"},Object(b.b)("div",{className:"col col--6"},Object(b.b)("a",{href:"#controller"},"controller"),Object(b.b)("br",null),Object(b.b)("a",{href:"#activeIndex"},"activeIndex"),Object(b.b)("br",null),Object(b.b)("a",{href:"#activePanel"},"activePanel"),Object(b.b)("br",null),Object(b.b)("a",{href:"#animating"},"animating"),Object(b.b)("br",null),Object(b.b)("a",{href:"#holding"},"holding")),Object(b.b)("div",{className:"col col--6"},Object(b.b)("a",{href:"#moveToPosition"},"moveToPosition"),Object(b.b)("br",null),Object(b.b)("a",{href:"#init"},"init"),Object(b.b)("br",null),Object(b.b)("a",{href:"#destroy"},"destroy"),Object(b.b)("br",null),Object(b.b)("a",{href:"#enable"},"enable"),Object(b.b)("br",null),Object(b.b)("a",{href:"#disable"},"disable"),Object(b.b)("br",null),Object(b.b)("a",{href:"#updatePosition"},"updatePosition"),Object(b.b)("br",null),Object(b.b)("a",{href:"#updateInput"},"updateInput"),Object(b.b)("br",null),Object(b.b)("a",{href:"#resetActive"},"resetActive"),Object(b.b)("br",null),Object(b.b)("a",{href:"#moveToPanel"},"moveToPanel")))),Object(b.b)("h2",{id:"properties"},"Properties"),Object(b.b)("h3",{id:"controller"},"controller"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-warning"},"readonly"),Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"A controller that handles the ",Object(b.b)("a",{parentName:"p",href:"https://naver#github#io/egjs-axes/"},"@egjs/axes")," events"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Type"),": ",Object(b.b)("a",{parentName:"p",href:"AxesController"},"AxesController")),Object(b.b)("h3",{id:"activeIndex"},"activeIndex"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-warning"},"readonly"),Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"Index number of the ",Object(b.b)("a",{parentName:"p",href:"Flicking#currentPanel"},"currentPanel")),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Type"),": number"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Default"),": 0"),Object(b.b)("h3",{id:"activePanel"},"activePanel"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-warning"},"readonly"),Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"An active panel"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Type"),": ",Object(b.b)("a",{parentName:"p",href:"Panel"},"Panel")," ","|"," null"),Object(b.b)("h3",{id:"animating"},"animating"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-warning"},"readonly"),Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"Whether Flicking's animating"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Type"),": boolean"),Object(b.b)("h3",{id:"holding"},"holding"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-warning"},"readonly"),Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"Whether user is clicking or touching"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Type"),": boolean"),Object(b.b)("h2",{id:"methods"},"Methods"),Object(b.b)("h3",{id:"moveToPosition"},"moveToPosition"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-success"},"async")),Object(b.b)("p",null,"Move ",Object(b.b)("a",{parentName:"p",href:"Camera"},"Camera")," to the given position"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns"),": Promise","<","void",">"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"A Promise which will be resolved after reaching the target position")),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Emits"),": ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-moveStart"},"Flicking#event:moveStart"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-move"},"Flicking#event:move"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-moveEnd"},"Flicking#event:moveEnd"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-willChange"},"Flicking#event:willChange"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-changed"},"Flicking#event:changed"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-willRestore"},"Flicking#event:willRestore"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-restored"},"Flicking#event:restored"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-needPanel"},"Flicking#event:needPanel"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-visibleChange"},"Flicking#event:visibleChange"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-reachEdge"},"Flicking#event:reachEdge")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"center"},"PARAMETER"),Object(b.b)("th",{parentName:"tr",align:"center"},"TYPE"),Object(b.b)("th",{parentName:"tr",align:"center"},"OPTIONAL"),Object(b.b)("th",{parentName:"tr",align:"center"},"DEFAULT"),Object(b.b)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"center"},"position"),Object(b.b)("td",{parentName:"tr",align:"center"},"number"),Object(b.b)("td",{parentName:"tr",align:"center"},"no"),Object(b.b)("td",{parentName:"tr",align:"center"}),Object(b.b)("td",{parentName:"tr",align:"center"},"The target position to move")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"center"},"duration"),Object(b.b)("td",{parentName:"tr",align:"center"},"number"),Object(b.b)("td",{parentName:"tr",align:"center"},"no"),Object(b.b)("td",{parentName:"tr",align:"center"}),Object(b.b)("td",{parentName:"tr",align:"center"},"Duration of the panel movement animation (unit: ms).")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"center"},"axesEvent"),Object(b.b)("td",{parentName:"tr",align:"center"},"object"),Object(b.b)("td",{parentName:"tr",align:"center"},"yes"),Object(b.b)("td",{parentName:"tr",align:"center"}),Object(b.b)("td",{parentName:"tr",align:"center"},Object(b.b)("a",{parentName:"td",href:"https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-release"},"release")," event of ",Object(b.b)("a",{parentName:"td",href:"https://naver#github#io/egjs-axes/"},"Axes"))))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Throws"),": ",Object(b.b)("a",{parentName:"p",href:"FlickingError"},"FlickingError")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"code"),Object(b.b)("th",{parentName:"tr",align:null},"condition"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"ERROR_CODE"},"POSITION_NOT_REACHABLE")),Object(b.b)("td",{parentName:"tr",align:null},"When the given panel is already removed or not in the Camera's ",Object(b.b)("a",{parentName:"td",href:"Camera#range"},"range"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"ERROR_CODE"},"NOT_ATTACHED_TO_FLICKING")),Object(b.b)("td",{parentName:"tr",align:null},"When ",Object(b.b)("a",{parentName:"td",href:"Control#init"},"init")," is not called before")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"ERROR_CODE"},"ANIMATION_INTERRUPTED")),Object(b.b)("td",{parentName:"tr",align:null},"When the animation is interrupted by user input")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"ERROR_CODE"},"STOP_CALLED_BY_USER")),Object(b.b)("td",{parentName:"tr",align:null},"When the animation is interrupted by user input")))),Object(b.b)("h3",{id:"init"},"init"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"Initialize Control"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns"),": this"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"center"},"PARAMETER"),Object(b.b)("th",{parentName:"tr",align:"center"},"TYPE"),Object(b.b)("th",{parentName:"tr",align:"center"},"OPTIONAL"),Object(b.b)("th",{parentName:"tr",align:"center"},"DEFAULT"),Object(b.b)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"center"},"flicking"),Object(b.b)("td",{parentName:"tr",align:"center"},Object(b.b)("a",{parentName:"td",href:"Flicking"},"Flicking")),Object(b.b)("td",{parentName:"tr",align:"center"},"no"),Object(b.b)("td",{parentName:"tr",align:"center"}),Object(b.b)("td",{parentName:"tr",align:"center"},"An instance of ",Object(b.b)("a",{parentName:"td",href:"Flicking"},"Flicking"))))),Object(b.b)("h3",{id:"destroy"},"destroy"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"Destroy Control and return to initial state"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns"),": void"),Object(b.b)("h3",{id:"enable"},"enable"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"Enable input from the user (mouse/touch)"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns"),": this"),Object(b.b)("h3",{id:"disable"},"disable"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"Disable input from the user (mouse/touch)"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns"),": this"),Object(b.b)("h3",{id:"updatePosition"},"updatePosition"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited"),Object(b.b)("span",{className:"bulma-tag is-success"},"async")),Object(b.b)("p",null,"Update position after resizing"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns"),": Promise","<","void",">"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"center"},"PARAMETER"),Object(b.b)("th",{parentName:"tr",align:"center"},"TYPE"),Object(b.b)("th",{parentName:"tr",align:"center"},"OPTIONAL"),Object(b.b)("th",{parentName:"tr",align:"center"},"DEFAULT"),Object(b.b)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"center"},"progressInPanel"),Object(b.b)("td",{parentName:"tr",align:"center"},"number"),Object(b.b)("td",{parentName:"tr",align:"center"},"no"),Object(b.b)("td",{parentName:"tr",align:"center"}),Object(b.b)("td",{parentName:"tr",align:"center"},"Previous camera's progress in active panel before resize")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Throws"),": ",Object(b.b)("a",{parentName:"p",href:"FlickingError"},"FlickingError")),Object(b.b)("p",null,Object(b.b)("a",{parentName:"p",href:"ERROR_CODE"},"NOT_ATTACHED_TO_FLICKING")," When ",Object(b.b)("a",{parentName:"p",href:"Camera#init"},"init")," is not called before"),Object(b.b)("h3",{id:"updateInput"},"updateInput"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"Update ",Object(b.b)("a",{parentName:"p",href:"Control#controller"},"controller"),"'s state"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns"),": this"),Object(b.b)("h3",{id:"resetActive"},"resetActive"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited")),Object(b.b)("p",null,"Reset ",Object(b.b)("a",{parentName:"p",href:"Control#activePanel"},"activePanel")," and ",Object(b.b)("a",{parentName:"p",href:"Control#activeAnchor"},"activeAnchor")," to ",Object(b.b)("inlineCode",{parentName:"p"},"null")),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns"),": this"),Object(b.b)("h3",{id:"moveToPanel"},"moveToPanel"),Object(b.b)("div",{className:"bulma-tags"},Object(b.b)("span",{className:"bulma-tag is-danger"},"inherited"),Object(b.b)("span",{className:"bulma-tag is-success"},"async")),Object(b.b)("p",null,"Move ",Object(b.b)("a",{parentName:"p",href:"Camera"},"Camera")," to the given panel"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns"),": Promise","<","void",">"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"A Promise which will be resolved after reaching the target panel")),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Emits"),": ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-moveStart"},"Flicking#event:moveStart"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-move"},"Flicking#event:move"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-moveEnd"},"Flicking#event:moveEnd"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-willChange"},"Flicking#event:willChange"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-changed"},"Flicking#event:changed"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-willRestore"},"Flicking#event:willRestore"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-restored"},"Flicking#event:restored"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-needPanel"},"Flicking#event:needPanel"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-visibleChange"},"Flicking#event:visibleChange"),", ",Object(b.b)("a",{parentName:"p",href:"Flicking#event-reachEdge"},"Flicking#event:reachEdge")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"center"},"PARAMETER"),Object(b.b)("th",{parentName:"tr",align:"center"},"TYPE"),Object(b.b)("th",{parentName:"tr",align:"center"},"OPTIONAL"),Object(b.b)("th",{parentName:"tr",align:"center"},"DEFAULT"),Object(b.b)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"center"},"panel"),Object(b.b)("td",{parentName:"tr",align:"center"},Object(b.b)("a",{parentName:"td",href:"Panel"},"Panel")),Object(b.b)("td",{parentName:"tr",align:"center"},"no"),Object(b.b)("td",{parentName:"tr",align:"center"}),Object(b.b)("td",{parentName:"tr",align:"center"},"The target panel to move")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"center"},"options"),Object(b.b)("td",{parentName:"tr",align:"center"},"object"),Object(b.b)("td",{parentName:"tr",align:"center"},"no"),Object(b.b)("td",{parentName:"tr",align:"center"}),Object(b.b)("td",{parentName:"tr",align:"center"},"An options object")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"center"},"duration"),Object(b.b)("td",{parentName:"tr",align:"center"},"number"),Object(b.b)("td",{parentName:"tr",align:"center"},"no"),Object(b.b)("td",{parentName:"tr",align:"center"}),Object(b.b)("td",{parentName:"tr",align:"center"},"Duration of the animation (unit: ms)")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"center"},"axesEvent"),Object(b.b)("td",{parentName:"tr",align:"center"},"object"),Object(b.b)("td",{parentName:"tr",align:"center"},"yes"),Object(b.b)("td",{parentName:"tr",align:"center"}),Object(b.b)("td",{parentName:"tr",align:"center"},Object(b.b)("a",{parentName:"td",href:"https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-release"},"release")," event of ",Object(b.b)("a",{parentName:"td",href:"https://naver#github#io/egjs-axes/"},"Axes"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"center"},"direction"),Object(b.b)("td",{parentName:"tr",align:"center"},Object(b.b)("a",{parentName:"td",href:"DIRECTION"},"DIRECTION")),Object(b.b)("td",{parentName:"tr",align:"center"},"yes"),Object(b.b)("td",{parentName:"tr",align:"center"},"DIRECTION.NONE"),Object(b.b)("td",{parentName:"tr",align:"center"},"Direction to move, only available in the ",Object(b.b)("a",{parentName:"td",href:"Flicking#circular"},"circular")," mode")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Throws"),": ",Object(b.b)("a",{parentName:"p",href:"FlickingError"},"FlickingError")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"code"),Object(b.b)("th",{parentName:"tr",align:null},"condition"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"ERROR_CODE"},"POSITION_NOT_REACHABLE")),Object(b.b)("td",{parentName:"tr",align:null},"When the given panel is already removed or not in the Camera's ",Object(b.b)("a",{parentName:"td",href:"Camera#range"},"range"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"ERROR_CODE"},"NOT_ATTACHED_TO_FLICKING")),Object(b.b)("td",{parentName:"tr",align:null},"When ",Object(b.b)("a",{parentName:"td",href:"Control#init"},"init")," is not called before")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"ERROR_CODE"},"ANIMATION_INTERRUPTED")),Object(b.b)("td",{parentName:"tr",align:null},"When the animation is interrupted by user input")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"ERROR_CODE"},"STOP_CALLED_BY_USER")),Object(b.b)("td",{parentName:"tr",align:null},"When the animation is interrupted by user input")))))}o.isMDXComponent=!0},348:function(e,t,a){"use strict";a.d(t,"a",(function(){return O})),a.d(t,"b",(function(){return j}));var n=a(0),r=a.n(n);function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){b(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},b=Object.keys(e);for(n=0;n<b.length;n++)a=b[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(n=0;n<b.length;n++)a=b[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=r.a.createContext({}),o=function(e){var t=r.a.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},O=function(e){var t=o(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},s=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,b=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),O=o(a),s=n,j=O["".concat(c,".").concat(s)]||O[s]||m[s]||b;return a?r.a.createElement(j,l(l({ref:t},p),{},{components:a})):r.a.createElement(j,l({ref:t},p))}));function j(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var b=a.length,c=new Array(b);c[0]=s;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,c[1]=l;for(var p=2;p<b;p++)c[p]=a[p];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,a)}s.displayName="MDXCreateElement"}}]);
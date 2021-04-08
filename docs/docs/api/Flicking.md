<a name="Flicking"></a>

## Flicking

**Kind**: global class
**Extends**: [Component](#Component)  
**Emits**: [ready](#Flicking+event_ready), [beforeResize](#Flicking+event_beforeResize), [afterResize](#Flicking+event_afterResize), [holdStart](#Flicking+event_holdStart), [holdEnd](#Flicking+event_holdEnd), [moveStart](#Flicking+event_moveStart), [move](#Flicking+event_move), [moveEnd](#Flicking+event_moveEnd), [willChange](#Flicking+event_willChange), [changed](#Flicking+event_changed), [willRestore](#Flicking+event_willRestore), [restored](#Flicking+event_restored), [select](#Flicking+event_select), [needPanel](#Flicking+event_needPanel), [visibleChange](#Flicking+event_visibleChange), [reachEdge](#Flicking+event_reachEdge)  
**Requires**: `{@link https://github.com/naver/egjs-component\|@egjs/component}`, `{@link https://github.com/naver/egjs-axes\|@egjs/axes}`  

* [Flicking](#Flicking) ⇐ [Component](#Component)
    * [new Flicking(root, [options])](#new_Flicking_new)
    * _instance_
        * [control](#Flicking+control) ⇒
        * [camera](#Flicking+camera) ⇒
        * [renderer](#Flicking+renderer) ⇒
        * [viewport](#Flicking+viewport) ⇒
        * [initialized](#Flicking+initialized) ⇒
        * [circularEnabled](#Flicking+circularEnabled) ⇒
        * [index](#Flicking+index) ⇒
        * [element](#Flicking+element) ⇒
        * [currentPanel](#Flicking+currentPanel) ⇒
        * [panels](#Flicking+panels) ⇒
        * [panelCount](#Flicking+panelCount) ⇒
        * [visiblePanels](#Flicking+visiblePanels) ⇒
        * [animating](#Flicking+animating) ⇒
        * [holding](#Flicking+holding) ⇒
        * [align](#Flicking+align) ⇒
        * [defaultIndex](#Flicking+defaultIndex) ⇒
        * [horizontal](#Flicking+horizontal) ⇒
        * [circular](#Flicking+circular) ⇒
        * [bound](#Flicking+bound) ⇒
        * [adaptive](#Flicking+adaptive) ⇒
        * [needPanelThreshold](#Flicking+needPanelThreshold) ⇒
        * [deceleration](#Flicking+deceleration) ⇒
        * [easing](#Flicking+easing) ⇒
        * [duration](#Flicking+duration) ⇒
        * [inputType](#Flicking+inputType) ⇒
        * [moveType](#Flicking+moveType) ⇒
        * [threshold](#Flicking+threshold) ⇒
        * [interruptable](#Flicking+interruptable) ⇒
        * [bounce](#Flicking+bounce) ⇒
        * [iOSEdgeSwipeThreshold](#Flicking+iOSEdgeSwipeThreshold) ⇒
        * [preventClickOnDrag](#Flicking+preventClickOnDrag) ⇒
        * [renderOnlyVisible](#Flicking+renderOnlyVisible) ⇒
        * [autoInit](#Flicking+autoInit) ⇒
        * [autoResize](#Flicking+autoResize) ⇒
        * [renderExternal](#Flicking+renderExternal) ⇒
        * [useOrderManipulator](#Flicking+useOrderManipulator) ⇒
        * [init()](#Flicking+init) ⇒ `this`
        * [destroy()](#Flicking+destroy) ⇒ `void`
        * [prev([duration])](#Flicking+prev) ⇒ `Promise&lt;void&gt;`
        * [next([duration])](#Flicking+next) ⇒ `Promise&lt;void&gt;`
        * [moveTo(index, [duration], [direction])](#Flicking+moveTo) ⇒ `Promise&lt;void&gt;`
        * [getPanel(index)](#Flicking+getPanel) ⇒ [Panel](#Panel) \| `null`
        * [enableInput()](#Flicking+enableInput) ⇒ `this`
        * [disableInput()](#Flicking+disableInput) ⇒ `this`
        * [getStatus()](#Flicking+getStatus) ⇒
        * [setStatus(status)](#Flicking+setStatus) ⇒ `void`
        * [addPlugins(plugins)](#Flicking+addPlugins) ⇒ `this`
        * [removePlugins(plugins)](#Flicking+removePlugins) ⇒ `this`
        * [resize()](#Flicking+resize) ⇒ `this`
        * [append(element)](#Flicking+append) ⇒ [Array&lt;Panel&gt;](#Panel)
        * [prepend(element)](#Flicking+prepend) ⇒ [Array&lt;Panel&gt;](#Panel)
        * [insert(index, element)](#Flicking+insert) ⇒ [Array&lt;Panel&gt;](#Panel)
        * [remove(index, [deleteCount])](#Flicking+remove) ⇒ `$ts:Panel[]&lt;file&gt;/home/wn/egjs-flicking/src/Flicking.ts&lt;/file&gt;`
        * [trigger(event, ...params)](#Component+trigger) ⇒ `$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;`
        * [once(eventName, [handlerToAttach])](#Component+once) ⇒ `$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;`
        * [hasOn(eventName)](#Component+hasOn) ⇒ `boolean`
        * [on(eventName, [handlerToAttach])](#Component+on) ⇒ `$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;`
        * [off([eventName], [handlerToDetach])](#Component+off) ⇒ `$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;`
        * ["ready"](#Flicking+event_ready) ⇒
        * ["beforeResize"](#Flicking+event_beforeResize) ⇒
        * ["afterResize"](#Flicking+event_afterResize) ⇒
        * ["holdStart"](#Flicking+event_holdStart) ⇒
        * ["holdEnd"](#Flicking+event_holdEnd) ⇒
        * ["moveStart"](#Flicking+event_moveStart) ⇒
        * ["move"](#Flicking+event_move) ⇒
        * ["moveEnd"](#Flicking+event_moveEnd) ⇒
        * ["willChange"](#Flicking+event_willChange) ⇒
        * ["changed"](#Flicking+event_changed) ⇒
        * ["willRestore"](#Flicking+event_willRestore) ⇒
        * ["restored"](#Flicking+event_restored) ⇒
        * ["select"](#Flicking+event_select) ⇒
        * ["needPanel"](#Flicking+event_needPanel) ⇒
        * ["visibleChange"](#Flicking+event_visibleChange) ⇒
        * ["reachEdge"](#Flicking+event_reachEdge) ⇒
    * _static_
        * [VERSION](#Flicking.VERSION) ⇒
        * [ElementLike](#Flicking.ElementLike) ⇒

##  Constructor
<a name="new_Flicking_new"></a>

### new Flicking
`new Flicking(root, [options])`<br/>
**Throws**:

- [FlickingError](#FlickingError) |code|condition|
|---|---|
|[WRONG_TYPE](#Constants.ERROR_CODE)|When the root is not either string or HTMLElement|
|[ELEMENT_NOT_FOUND](#Constants.ERROR_CODE)|When the element with given CSS selector does not exist|


|code|조건|
|---|---|
|[WRONG_TYPE](#Constants.ERROR_CODE)|루트 엘리먼트가 string이나 HTMLElement가 아닐 경우|
|[ELEMENT_NOT_FOUND](#Constants.ERROR_CODE)|주어진 CSS selector로 엘리먼트를 찾지 못했을 경우|




| Param | Type | Default | Description |
| --- | --- | --- | --- |
| root | `$ts:HTMLElement \| string&lt;file&gt;/home/wn/egjs-flicking/src/Flicking.ts&lt;/file&gt;` | 
 | A root HTMLElement to initialize Flicking on it. When it's a typeof `string`, it should be a css selector string Flicking을 초기화할 HTMLElement로, `string` 타입으로 지정시 css 선택자 문자열을 지정해야 합니다. |
| [options] | `object` | `{}`
 | An options object for Flicking.Flicking에 적용할 옵션 오브젝트 |

**Example**  
```ts
import Flicking from "@egjs/flicking";

// Creating new instance of Flicking with HTMLElement
const flicking = new Flicking(document.querySelector(".flicking-viewport"), { circular: true });

// Creating new instance of Flicking with CSS selector
const flicking2 = new Flicking(".flicking-viewport", { circular: true });
```
##  Properties
<a name="Flicking+control"></a>

### control

[Control](#Control) instance of the Flicking

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `SnapControl`
  
**Read only**: true  
**Id**: Flicking.control  
**See**

- Control
- SnapControl
- FreeControl

<a name="Flicking+camera"></a>

### camera

[Camera](#Camera) instance of the Flicking

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `LinearCamera`
  
**Read only**: true  
**See**

- Camera
- LinearCamera
- BoundCamera
- CircularCamera

<a name="Flicking+renderer"></a>

### renderer

[Renderer](#Renderer) instance of the Flicking

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `RawRenderer`
  
**Read only**: true  
**See**

- Renderer
- RawRenderer
- VisibleRenderer

<a name="Flicking+viewport"></a>

### viewport

A component that manages viewport size

**Kind**: instance property of [Flicking](#Flicking)
**Read only**: true  
**See**: Viewport  
<a name="Flicking+initialized"></a>

### initialized

Whether Flicking's [init()](#Flicking+init) is called.
This is `true` when [init()](#Flicking+init) is called, and is `false` after calling [destroy()](#Flicking+destroy).

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `false`
  
**Read only**: true  
<a name="Flicking+circularEnabled"></a>

### circularEnabled

Whether the `circular` option is enabled.
The [circular](#Flicking+circular) option can't be enabled when sum of the panel sizes are too small.

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `false`
  
**Read only**: true  
<a name="Flicking+index"></a>

### index

Index number of the [currentPanel](#Flicking+currentPanel)

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `0`
  
**Read only**: true  
<a name="Flicking+element"></a>

### element

The root(`.flicking-viewport`) element

**Kind**: instance property of [Flicking](#Flicking)
**Read only**: true  
<a name="Flicking+currentPanel"></a>

### currentPanel

Currently active panel

**Kind**: instance property of [Flicking](#Flicking)
**Read only**: true  
**See**: Panel  
<a name="Flicking+panels"></a>

### panels

Array of panels

**Kind**: instance property of [Flicking](#Flicking)
**Read only**: true  
**See**: Panel  
<a name="Flicking+panelCount"></a>

### panelCount

Count of panels

**Kind**: instance property of [Flicking](#Flicking)
**Read only**: true  
<a name="Flicking+visiblePanels"></a>

### visiblePanels

Array of panels that is visible at the current position

**Kind**: instance property of [Flicking](#Flicking)
**Read only**: true  
**See**: Panel  
<a name="Flicking+animating"></a>

### animating

Whether Flicking's animating

**Kind**: instance property of [Flicking](#Flicking)
**Read only**: true  
<a name="Flicking+holding"></a>

### holding

Whether user is clicking or touching

**Kind**: instance property of [Flicking](#Flicking)
**Read only**: true  
<a name="Flicking+align"></a>

### align

Align position of the panels within viewport. You can set different values each for the panel and camera

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `&quot;center&quot;`
  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| panel | [ALIGN](#Constants.ALIGN) \| `string` \| `number` | 개개의 [Panel](#Panel)에 적용할 값 |
| camera | [ALIGN](#Constants.ALIGN) \| `string` \| `number` | [Camera](#Camera)에 적용할 값 |

**Example**  
```ts
const possibleOptions = [
  // Literal strings
  "prev", "center", "next",
  // % values, applied to both panel & camera
  "0%", "25%", "42%",
  // px values, arithmetic calculation with (+/-) is also allowed.
  "0px", "100px", "50% - 25px",
  // numbers, same to number + px ("0px", "100px")
  0, 100, 1000,
  // Setting a different value for panel & camera
  { panel: "10%", camera: "25%" }
];

possibleOptions.forEach(align => {
  new Flicking("#el", { align });
});
```
<a name="Flicking+defaultIndex"></a>

### defaultIndex

Index of the panel to move when Flicking's [init()](#Flicking+init) is called. A zero-based integer

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `0`
  
<a name="Flicking+horizontal"></a>

### horizontal

Direction of panel movement (true: horizontal, false: vertical)

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `true`
  
<a name="Flicking+circular"></a>

### circular

Enables circular(continuous loop) mode, which connects first/last panel for continuous scrolling.

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `false`
  
<a name="Flicking+bound"></a>

### bound

Prevent the view(camera element) from going out of the first/last panel, so it won't show empty spaces before/after the first/last panel
Only can be enabled when `circular=false`

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `false`
  
<a name="Flicking+adaptive"></a>

### adaptive

Update height of the viewport element after movement same to the height of the panel below. This can be only enabled when `horizontal=true`

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `false`
  
<a name="Flicking+needPanelThreshold"></a>

### needPanelThreshold

A Threshold from viewport edge before triggering `needPanel` event

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `0`
  
<a name="Flicking+deceleration"></a>

### deceleration

Deceleration value for panel movement animation which is triggered by user input. A higher value means a shorter animation time

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `0.0075`
  
<a name="Flicking+easing"></a>

### easing

An easing function applied to the panel movement animation. Default value is `easeOutCubic`

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `x &#x3D;&gt; 1 - Math.pow(1 - x, 3)`
  
**See**: Easing Functions Cheat Sheet [http://easings.net/](http://easings.net/) 이징 함수 Cheat Sheet [http://easings.net/](http://easings.net/)  
<a name="Flicking+duration"></a>

### duration

Default duration of the animation (ms)

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `500`
  
<a name="Flicking+inputType"></a>

### inputType

Types of input devices to enable

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `[&quot;touch&quot;, &quot;mouse&quot;]`
  
**See**: [Possible values (PanInputOption#inputType)](https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption)
[가능한 값들 (PanInputOption#inputType)](https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption)  
<a name="Flicking+moveType"></a>

### moveType

Movement style by user input. This will change instance type of [control](#Flicking+control)

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `&quot;\&quot;snap\&quot;&quot;`
  
**See**: [MOVE_TYPE](#Constants.MOVE_TYPE)  
**Example**  
```ts
import Flicking, { MOVE_TYPE } from "@egjs/flicking";

const flicking = new Flicking({
  moveType: MOVE_TYPE.FREE_SCROLL
});
```
<a name="Flicking+threshold"></a>

### threshold

Movement threshold to change panel (unit: px). It should be dragged above the threshold to change the current panel.

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `40`
  
<a name="Flicking+interruptable"></a>

### interruptable

Set animation to be interruptable by click/touch.

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `true`
  
<a name="Flicking+bounce"></a>

### bounce

The size value of the bounce area. Only can be enabled when `circular=false`.
You can set different bounce value for prev/next direction by using array.
`number` for px value, and `string` for px, and % value relative to viewport size.
You have to call [updateInput](#Control+updateInput) after changing this to take effect.

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `&quot;\&quot;20%\&quot;&quot;`
  
**Example**  
```ts
const possibleOptions = [
  // % values, relative to viewport element(".flicking-viewport")'s size
  "0%", "25%", "42%",
  // px values, arithmetic calculation with (+/-) is also allowed.
  "0px", "100px", "50% - 25px",
  // numbers, same to number + px ("0px", "100px")
  0, 100, 1000
];
**Example**  
```ts
const flicking = new Flicking("#el", { bounce: "20%" });

flicking.bounce = "100%";
flicking.control.updateInput(); // Call this to update!
```
<a name="Flicking+iOSEdgeSwipeThreshold"></a>

### iOSEdgeSwipeThreshold

Size of the area from the right edge in iOS safari (in px) which enables swipe-back or swipe-forward

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `30`
  
<a name="Flicking+preventClickOnDrag"></a>

### preventClickOnDrag

Automatically prevent `click` event if the user has dragged at least a single pixel on the viewport element

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `true`
  
<a name="Flicking+renderOnlyVisible"></a>

### renderOnlyVisible

Whether to render visible panels only. This can dramatically increase performance when there're many panels.
This will set [renderer](#Flicking+renderer)'s type to [VisibleRenderer](#VisibleRenderer)

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `false`
  
<a name="Flicking+autoInit"></a>

### autoInit

Call [init()](#Flicking+init) automatically when creating Flicking's instance

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `true`
  
**Read only**: true  
<a name="Flicking+autoResize"></a>

### autoResize

Attach Flicking's [resize](#Flicking+resize) method to window's resize event.
Flicking will automatically call [resize](#Flicking+resize) window size and orientation change.

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `true`
  
<a name="Flicking+renderExternal"></a>

### renderExternal

This is an option for the frameworks(React, Vue, Angular, ...). Don't set it as it's automatically managed by Flicking.

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `false`
  
**Read only**: true  
**Internal**:   
<a name="Flicking+useOrderManipulator"></a>

### useOrderManipulator

Use [OrderManipulator](#OrderManipulator) for the element order managing in [Renderer](#Renderer).
Instead of isnerting/removing element to change order, this will use CSS [order](https://developer.mozilla.org/en-US/docs/Web/CSS/order).
⚠️ Enabling this option will decrease browser coverage to IE11+

**Kind**: instance property of [Flicking](#Flicking)
**Default**: `false`
  
<a name="Flicking.VERSION"></a>

### VERSION

Version info string

**Kind**: static property of [Flicking](#Flicking)
**Example**  
```ts
Flicking.VERSION;  // ex) 4.0.0
```
##  Methods
<a name="Flicking+init"></a>

### init
`init()`<br/>
Initialize Flicking and move to the default index
This is automatically called on Flicking's constructor when `autoInit` is true(default)

**Kind**: instance method of [Flicking](#Flicking)
**Emits**: [ready](#Flicking+event_ready)  
<a name="Flicking+destroy"></a>

### destroy
`destroy()`<br/>
Destroy Flicking and remove all event handlers

**Kind**: instance method of [Flicking](#Flicking)
<a name="Flicking+prev"></a>

### prev
`prev([duration])`<br/>
Move to the previous panel (current index - 1)

**Kind**: instance method of [Flicking](#Flicking)
**Returns**: `Promise&lt;void&gt;` - A Promise which will be resolved after reaching the previous panel이전 패널 도달시에 resolve되는 Promise  
**Throws**:

- [FlickingError](#FlickingError) |code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](#Constants.ERROR_CODE)|When the previous panel does not exist|
|[ANIMATION_ALREADY_PLAYING](#Constants.ERROR_CODE)|When the animation is already playing|
|[ANIMATION_INTERRUPTED](#Constants.ERROR_CODE)|When the animation is interrupted by user input|
|[STOP_CALLED_BY_USER](#Constants.ERROR_CODE)|When the any of the event's `stop()` is called|


|code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](#Constants.ERROR_CODE)|이전 패널이 존재하지 않을 경우|
|[ANIMATION_ALREADY_PLAYING](#Constants.ERROR_CODE)|애니메이션이 이미 진행중인 경우|
|[ANIMATION_INTERRUPTED](#Constants.ERROR_CODE)|사용자 입력에 의해 애니메이션이 중단된 경우|
|[STOP_CALLED_BY_USER](#Constants.ERROR_CODE)|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|


**Emits**: [moveStart](#Flicking+event_moveStart), [move](#Flicking+event_move), [moveEnd](#Flicking+event_moveEnd), [willChange](#Flicking+event_willChange), [changed](#Flicking+event_changed), [willRestore](#Flicking+event_willRestore), [restored](#Flicking+event_restored), [needPanel](#Flicking+event_needPanel), [visibleChange](#Flicking+event_visibleChange), [reachEdge](#Flicking+event_reachEdge)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [duration] | `number` | `{@link Flicking#duration options.duration}`
 | Duration of the panel movement animation (unit: ms)패널 이동 애니메이션 진행 시간 (단위: ms) |

<a name="Flicking+next"></a>

### next
`next([duration])`<br/>
Move to the next panel (current index + 1)

**Kind**: instance method of [Flicking](#Flicking)
**Returns**: `Promise&lt;void&gt;` - A Promise which will be resolved after reaching the next panel다음 패널 도달시에 resolve되는 Promise  
**Throws**:

- [FlickingError](#FlickingError) |code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](#Constants.ERROR_CODE)|When the next panel does not exist|
|[ANIMATION_ALREADY_PLAYING](#Constants.ERROR_CODE)|When the animation is already playing|
|[ANIMATION_INTERRUPTED](#Constants.ERROR_CODE)|When the animation is interrupted by user input|
|[STOP_CALLED_BY_USER](#Constants.ERROR_CODE)|When the any of the event's `stop()` is called|


|code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](#Constants.ERROR_CODE)|다음 패널이 존재하지 않을 경우|
|[ANIMATION_ALREADY_PLAYING](#Constants.ERROR_CODE)|애니메이션이 이미 진행중인 경우|
|[ANIMATION_INTERRUPTED](#Constants.ERROR_CODE)|사용자 입력에 의해 애니메이션이 중단된 경우|
|[STOP_CALLED_BY_USER](#Constants.ERROR_CODE)|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|



**Emits**: [moveStart](#Flicking+event_moveStart), [move](#Flicking+event_move), [moveEnd](#Flicking+event_moveEnd), [willChange](#Flicking+event_willChange), [changed](#Flicking+event_changed), [willRestore](#Flicking+event_willRestore), [restored](#Flicking+event_restored), [needPanel](#Flicking+event_needPanel), [visibleChange](#Flicking+event_visibleChange), [reachEdge](#Flicking+event_reachEdge)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [duration] | `number` | `{@link Flicking#duration options.duration}`
 | Duration of the panel movement animation (unit: ms).패널 이동 애니메이션 진행 시간 (단위: ms) |

<a name="Flicking+moveTo"></a>

### moveTo
`moveTo(index, [duration], [direction])`<br/>
Move to the panel with given index

**Kind**: instance method of [Flicking](#Flicking)
**Returns**: `Promise&lt;void&gt;` - A Promise which will be resolved after reaching the target panel해당 패널 도달시에 resolve되는 Promise  
**Throws**:

- [FlickingError](#FlickingError) |code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](#Constants.ERROR_CODE)|When the root is not either string or HTMLElement|
|[ANIMATION_ALREADY_PLAYING](#Constants.ERROR_CODE)|When the animation is already playing|
|[ANIMATION_INTERRUPTED](#Constants.ERROR_CODE)|When the animation is interrupted by user input|
|[STOP_CALLED_BY_USER](#Constants.ERROR_CODE)|When the any of the event's `stop()` is called|


|code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](#Constants.ERROR_CODE)|해당 인덱스를 가진 패널이 존재하지 않을 경우|
|[ANIMATION_ALREADY_PLAYING](#Constants.ERROR_CODE)|애니메이션이 이미 진행중인 경우|
|[ANIMATION_INTERRUPTED](#Constants.ERROR_CODE)|사용자 입력에 의해 애니메이션이 중단된 경우|
|[STOP_CALLED_BY_USER](#Constants.ERROR_CODE)|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|



**Emits**: [moveStart](#Flicking+event_moveStart), [move](#Flicking+event_move), [moveEnd](#Flicking+event_moveEnd), [willChange](#Flicking+event_willChange), [changed](#Flicking+event_changed), [willRestore](#Flicking+event_willRestore), [restored](#Flicking+event_restored), [needPanel](#Flicking+event_needPanel), [visibleChange](#Flicking+event_visibleChange), [reachEdge](#Flicking+event_reachEdge)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | `number` | 
 | The index of the panel to move이동할 패널의 인덱스 |
| [duration] | `number` | `{@link Flicking#duration options.duration}`
 | Duration of the animation (unit: ms)애니메이션 진행 시간 (단위: ms) |
| [direction] | `Constants#DIRECTION` | `DIRECTION.NONE`
 | Direction to move, only available in the [circular](#Flicking+circular) mode이동할 방향. [circular](#Flicking+circular) 옵션 활성화시에만 사용 가능합니다 |

<a name="Flicking+getPanel"></a>

### getPanel
`getPanel(index)`<br/>
Return the [Panel](#Panel) at the given index. `null` if it doesn't exists.

**Kind**: instance method of [Flicking](#Flicking)
**Returns**: [Panel](#Panel) \| `null` - Panel at the given index주어진 인덱스에 해당하는 패널  
**See**: Panel  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | `$ts:number&lt;file&gt;/home/wn/egjs-flicking/src/Flicking.ts&lt;/file&gt;` | ``
 |  |

**Example**  
```ts
const panel = flicking.getPanel(0);
// Which is a shorthand to...
const samePanel = flicking.panels[0];
```
<a name="Flicking+enableInput"></a>

### enableInput
`enableInput()`<br/>
Enable input from the user (mouse/touch)

**Kind**: instance method of [Flicking](#Flicking)
<a name="Flicking+disableInput"></a>

### disableInput
`disableInput()`<br/>
Disable input from the user (mouse/touch)

**Kind**: instance method of [Flicking](#Flicking)
<a name="Flicking+getStatus"></a>

### getStatus
`getStatus()`<br/>
Get current flicking status. You can restore current state by giving returned value to [setStatus()](#Flicking+setStatus)

**Kind**: instance method of [Flicking](#Flicking)
**Returns**: An object with current status value information.현재 상태값 정보를 가진 객체.  
<a name="Flicking+setStatus"></a>

### setStatus
`setStatus(status)`<br/>
Restore to the state of the `status`

**Kind**: instance method of [Flicking](#Flicking)

| Param | Type | Description |
| --- | --- | --- |
| status | `` | Status value to be restored. You can specify the return value of the [getStatus()](#Flicking+getStatus) method복원할 상태 값. [getStatus()](#Flicking+getStatus)메서드의 반환값을 지정하면 됩니다 |

<a name="Flicking+addPlugins"></a>

### addPlugins
`addPlugins(plugins)`<br/>
Add plugins that can have different effects on Flicking

**Kind**: instance method of [Flicking](#Flicking)

| Param | Type | Description |
| --- | --- | --- |
| plugins | `$ts:Plugin \| Plugin[]&lt;file&gt;/home/wn/egjs-flicking/src/Flicking.ts&lt;/file&gt;` | The plugin(s) to add추가할 플러그인(들) |

<a name="Flicking+removePlugins"></a>

### removePlugins
`removePlugins(plugins)`<br/>
Remove plugins from Flicking.

**Kind**: instance method of [Flicking](#Flicking)

| Param | Type | Description |
| --- | --- | --- |
| plugins | `$ts:Plugin \| Plugin[]&lt;file&gt;/home/wn/egjs-flicking/src/Flicking.ts&lt;/file&gt;` | The plugin(s) to remove.제거 플러그인(들). |

<a name="Flicking+resize"></a>

### resize
`resize()`<br/>
Update viewport/panel sizes

**Kind**: instance method of [Flicking](#Flicking)
**Emits**: [beforeResize](#Flicking+event_beforeResize), [afterResize](#Flicking+event_afterResize)  
<a name="Flicking+append"></a>

### append
`append(element)`<br/>
Add new panels after the last panel

**Kind**: instance method of [Flicking](#Flicking)
**Returns**: [Array&lt;Panel&gt;](#Panel) - An array of appended panels추가된 패널들의 배열  
**Throws**:

- [FlickingError](#FlickingError) [ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK](#Constants.ERROR_CODE) if called on frameworks (React, Angular, Vue...)

**See**

- Panel
- Flicking.ElementLike


| Param | Type | Description |
| --- | --- | --- |
| element | [ElementLike](#Flicking.ElementLike) \| [Array.&lt;ElementLike&gt;](#Flicking.ElementLike) | A new HTMLElement, a outerHTML of element, or an array of both 새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열 |

**Example**  
```ts
const flicking = new Flicking("#flick");
// These are possible parameters
flicking.append(document.createElement("div"));
flicking.append("\<div\>Panel\</div\>");
flicking.append(["\<div\>Panel\</div\>", document.createElement("div")]);
// Even this is possible
flicking.append("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
```
<a name="Flicking+prepend"></a>

### prepend
`prepend(element)`<br/>
Add new panels before the first panel
This will increase index of panels after by the number of panels added

**Kind**: instance method of [Flicking](#Flicking)
**Returns**: [Array&lt;Panel&gt;](#Panel) - An array of prepended panels추가된 패널들의 배열  
**Throws**:

- [FlickingError](#FlickingError) [ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK](#Constants.ERROR_CODE) if called on frameworks (React, Angular, Vue...)

**See**

- Panel
- Flicking.ElementLike


| Param | Type | Description |
| --- | --- | --- |
| element | [ElementLike](#Flicking.ElementLike) \| [Array.&lt;ElementLike&gt;](#Flicking.ElementLike) | A new HTMLElement, a outerHTML of element, or an array of both 새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열 |

**Example**  
```ts
const flicking = new eg.Flicking("#flick");
flicking.prepend(document.createElement("div"));
flicking.prepend("\<div\>Panel\</div\>");
flicking.prepend(["\<div\>Panel\</div\>", document.createElement("div")]);
// Even this is possible
flicking.prepend("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
```
<a name="Flicking+insert"></a>

### insert
`insert(index, element)`<br/>
Insert new panels at given index
This will increase index of panels after by the number of panels added

**Kind**: instance method of [Flicking](#Flicking)
**Returns**: [Array&lt;Panel&gt;](#Panel) - An array of prepended panels추가된 패널들의 배열  
**Throws**:

- [FlickingError](#FlickingError) [ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK](#Constants.ERROR_CODE) if called on frameworks (React, Angular, Vue...)


| Param | Type | Description |
| --- | --- | --- |
| index | `number` | Index to insert new panels at새로 패널들을 추가할 인덱스 |
| element | [ElementLike](#Flicking.ElementLike) \| [Array.&lt;ElementLike&gt;](#Flicking.ElementLike) | A new HTMLElement, a outerHTML of element, or an array of both 새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열 |

**Example**  
```ts
const flicking = new eg.Flicking("#flick");
flicking.insert(0, document.createElement("div"));
flicking.insert(2, "\<div\>Panel\</div\>");
flicking.insert(1, ["\<div\>Panel\</div\>", document.createElement("div")]);
// Even this is possible
flicking.insert(3, "\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
```
<a name="Flicking+remove"></a>

### remove
`remove(index, [deleteCount])`<br/>
Remove the panel at the given index
This will decrease index of panels after by the number of panels removed

**Kind**: instance method of [Flicking](#Flicking)
**Returns**: `$ts:Panel[]&lt;file&gt;/home/wn/egjs-flicking/src/Flicking.ts&lt;/file&gt;` - An array of removed panels제거된 패널들의 배열  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | `number` | 
 | Index of panel to remove제거할 패널의 인덱스 |
| [deleteCount] | `number` | `1`
 | Number of panels to remove from index`index` 이후로 제거할 패널의 개수 |

<a name="Component+trigger"></a>

### trigger
`trigger(event, ...params)`<br/>
Trigger a custom event.

**Kind**: instance method of [Flicking](#Flicking)
**Overrides**: [trigger](#Component+trigger)  
**Returns**: `$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;` - An instance of the component itself컴포넌트 자신의 인스턴스  

| Param | Type | Description |
| --- | --- | --- |
| event | `string` \| `ComponentEvent` | The name of the custom event to be triggered or an instance of the ComponentEvent발생할 커스텀 이벤트의 이름 또는 ComponentEvent의 인스턴스 |
| ...params | `Array&lt;any&gt;` \| `$ts:...` | Event data to be sent when triggering a custom event 커스텀 이벤트가 발생할 때 전달할 데이터 |

**Example**  
```ts
import Component, { ComponentEvent } from "@egjs/component";

class Some extends Component<{
  beforeHi: ComponentEvent<{ foo: number; bar: string }>;
  hi: { foo: { a: number; b: boolean } };
  someEvent: (foo: number, bar: string) => void;
  someOtherEvent: void; // When there's no event argument
}> {
  some(){
    if(this.trigger("beforeHi")){ // When event call to stop return false.
      this.trigger("hi");// fire hi event.
    }
  }
}

const some = new Some();
some.on("beforeHi", e => {
  if(condition){
    e.stop(); // When event call to stop, `hi` event not call.
  }
  // `currentTarget` is component instance.
  console.log(some === e.currentTarget); // true

  typeof e.foo; // number
  typeof e.bar; // string
});
some.on("hi", e => {
  typeof e.foo.b; // boolean
});
// If you want to more know event design. You can see article.
// https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
```
<a name="Component+once"></a>

### once
`once(eventName, [handlerToAttach])`<br/>
Executed event just one time.

**Kind**: instance method of [Flicking](#Flicking)
**Overrides**: [once](#Component+once)  
**Returns**: `$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;` - An instance of the component itself컴포넌트 자신의 인스턴스  

| Param | Type | Description |
| --- | --- | --- |
| eventName | `string` \| `$ts:...` | The name of the event to be attached or an event name - event handler mapped object.등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트 |
| [handlerToAttach] | `function` \| `$ts:...` | The handler function of the event to be attached 등록할 이벤트의 핸들러 함수 |

**Example**  
```ts
import Component, { ComponentEvent } from "@egjs/component";

class Some extends Component<{
  hi: ComponentEvent;
}> {
  hi() {
    alert("hi");
  }
  thing() {
    this.once("hi", this.hi);
  }
}

var some = new Some();
some.thing();
some.trigger(new ComponentEvent("hi"));
// fire alert("hi");
some.trigger(new ComponentEvent("hi"));
// Nothing happens
```
<a name="Component+hasOn"></a>

### hasOn
`hasOn(eventName)`<br/>
Checks whether an event has been attached to a component.

**Kind**: instance method of [Flicking](#Flicking)
**Overrides**: [hasOn](#Component+hasOn)  
**Returns**: `boolean` - Indicates whether the event is attached. 이벤트 등록 여부  

| Param | Type | Description |
| --- | --- | --- |
| eventName | `string` | The name of the event to be attached 등록 여부를 확인할 이벤트의 이름 |

**Example**  
```ts
import Component from "@egjs/component";

class Some extends Component<{
  hi: void;
}> {
  some() {
    this.hasOn("hi");// check hi event.
  }
}
```
<a name="Component+on"></a>

### on
`on(eventName, [handlerToAttach])`<br/>
Attaches an event to a component.

**Kind**: instance method of [Flicking](#Flicking)
**Overrides**: [on](#Component+on)  
**Returns**: `$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;` - An instance of a component itself컴포넌트 자신의 인스턴스  

| Param | Type | Description |
| --- | --- | --- |
| eventName | `string` \| `$ts:...` | The name of the event to be attached or an event name - event handler mapped object.등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트 |
| [handlerToAttach] | `function` \| `$ts:...` | The handler function of the event to be attached 등록할 이벤트의 핸들러 함수 |

**Example**  
```ts
import Component, { ComponentEvent } from "@egjs/component";

class Some extends Component<{
  hi: void;
}> {
  hi() {
    console.log("hi");
  }
  some() {
    this.on("hi",this.hi); //attach event
  }
}
```
<a name="Component+off"></a>

### off
`off([eventName], [handlerToDetach])`<br/>
Detaches an event from the component.<br/>If the `eventName` is not given this will detach all event handlers attached.<br/>If the `handlerToDetach` is not given, this will detach all event handlers for `eventName`.

**Kind**: instance method of [Flicking](#Flicking)
**Overrides**: [off](#Component+off)  
**Returns**: `$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;` - An instance of a component itself 컴포넌트 자신의 인스턴스  

| Param | Type | Description |
| --- | --- | --- |
| [eventName] | `string` \| `$ts:...` | The name of the event to be detached 해제할 이벤트의 이름 |
| [handlerToDetach] | `function` \| `$ts:...` | The handler function of the event to be detached 해제할 이벤트의 핸들러 함수 |

**Example**  
```ts
import Component, { ComponentEvent } from "@egjs/component";

class Some extends Component<{
  hi: void;
}> {
  hi() {
    console.log("hi");
  }
  some() {
    this.off("hi",this.hi); //detach event
  }
}
```
##  Events
<a name="Flicking+event_ready"></a>

### ready

Event that fires when Flicking's [init()](#Flicking+init) is called

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |

<a name="Flicking+event_beforeResize"></a>

### beforeResize

Event that fires when Flicking's [resize()](#Flicking+resize) is called, before updating the sizes of panels and viewport.
You can update the sizes of panels and viewport with this event, and it'll be applied after [resize()](#Flicking+resize) is finished.

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| width | `number` | Previous width of the viewport기존 뷰포트 너비 |
| height | `number` | Previous height of the viewport기존 뷰포트 높이 |
| element | `HTMLElement` | The viewport element뷰포트 엘리먼트 |

<a name="Flicking+event_afterResize"></a>

### afterResize

Event that fires when Flicking's [resize()](#Flicking+resize) is called, after updating the sizes of panels and viewport.

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| width | `number` | New width of the viewport업데이트된 뷰포트 너비 |
| height | `number` | New height of the viewport업데이트된 뷰포트 높이 |
| prev | `object` | Previous size of the viewport기존 뷰포트 크기 |
| [prev.width] | `number` | Previous width of the viewport기존 뷰포트 너비 |
| [prev.height] | `number` | Previous height of the viewport기존 뷰포트 높이 |
| sizeChanged | `boolean` | A Boolean value indicating whether the width/height of the viewport element is changed뷰포트 너비/크기가 변경되었는지 여부를 나타내는 값 |
| element | `HTMLElement` | The viewport element뷰포트 엘리먼트 |

<a name="Flicking+event_holdStart"></a>

### holdStart

Event that fires when user started dragging.

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| stop | `function` | Stop the event action and prevent user from dragging이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다. |
| axesEvent | `object` | [hold](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold) event of [Axes](https://naver.github.io/egjs-axes/) [Axes](https://naver.github.io/egjs-axes/)의 [hold](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold) 이벤트 |

<a name="Flicking+event_holdEnd"></a>

### holdEnd

Event that fires when user stopped dragging.

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| axesEvent | `object` | [release](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release) event of [Axes](https://naver.github.io/egjs-axes/) [Axes](https://naver.github.io/egjs-axes/)의 [release](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release) 이벤트 |

<a name="Flicking+event_moveStart"></a>

### moveStart

Event that fires once before first [move](#Flicking+event_move) event

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| stop | `function` | Stop the event action and prevent user from dragging이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다. |
| isTrusted | `boolean` | Boolean that indicates whether the event was generated by a user action이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값 |
| holding | `boolean` | Boolean that indicates whether the user is dragging the viewport element사용자가 현재 viewport 엘리먼트를 드래그하고있는지를 나타내는 값 |
| direction | [DIRECTION](#Constants.DIRECTION) | Moving direction relative to previous position of the camera이전 카메라 위치 대비 이동 방향 |
| axesEvent | `object` | [change](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change) event of [Axes](https://naver.github.io/egjs-axes/) [Axes](https://naver.github.io/egjs-axes/)의 [change](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change) 이벤트 |

<a name="Flicking+event_move"></a>

### move

Event that fires for every movement

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| stop | `function` | Stop the event action and prevent user from dragging이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다. |
| isTrusted | `boolean` | Boolean that indicates whether the event was generated by a user action이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값 |
| holding | `boolean` | Boolean that indicates whether the user is dragging the viewport element사용자가 현재 viewport 엘리먼트를 드래그하고있는지를 나타내는 값 |
| direction | [DIRECTION](#Constants.DIRECTION) | Moving direction relative to previous position of the camera이전 카메라 위치 대비 이동 방향 |
| axesEvent | `object` | [change](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change) event of [Axes](https://naver.github.io/egjs-axes/) [Axes](https://naver.github.io/egjs-axes/)의 [change](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change) 이벤트 |

<a name="Flicking+event_moveEnd"></a>

### moveEnd

Event that fires when the movement is finished by user input release or animation end.

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| isTrusted | `boolean` | Boolean that indicates whether the event was generated by a user action이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값 |
| holding | `boolean` | Boolean that indicates whether the user is dragging the viewport element사용자가 현재 viewport 엘리먼트를 드래그하고있는지를 나타내는 값 |
| direction | [DIRECTION](#Constants.DIRECTION) | Moving direction relative to previous position of the camera이전 카메라 위치 대비 이동 방향 |
| axesEvent | `object` | [finish](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish) event of [Axes](https://naver.github.io/egjs-axes/) [Axes](https://naver.github.io/egjs-axes/)의 [finish](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish) 이벤트 |

<a name="Flicking+event_willChange"></a>

### willChange

Event that fires when Flicking's active index will be changed. Index will be changed at the [changed](#Flicking+event_changed) event.
It can be triggered when user finished input, or flicking start to move by method.
Calling `stop()` in event will prevent index change and camera movement.

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| stop | `function` | Stop the event action and prevent user from dragging이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다. |
| index | `number` | New active index변경할 인덱스 |
| panel | [Panel](#Panel) | New active panel인덱스 변경 이후 활성화된 패널로 설정할 패널 |
| isTrusted | `boolean` | Boolean that indicates whether the event was generated by a user action이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값 |
| direction | [DIRECTION](#Constants.DIRECTION) | Moving direction from the active panel to the target panel현재 활성화된 패널로부터 이동하고자 하는 패널의 방향 |

<a name="Flicking+event_changed"></a>

### changed

Event that fires when Flicking's index is changed.

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| index | `number` | New index새 인덱스 |
| panel | [Panel](#Panel) | New active panel새로 선택된 패널 |
| prevIndex | `number` | Previous index이전 인덱스 |
| prevPanel | [Panel](#Panel) \| `null` | Previous active panel이전 패널 |
| isTrusted | `boolean` | Boolean that indicates whether the event was generated by a user action이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값 |
| direction | [DIRECTION](#Constants.DIRECTION) | Moving direction from the active panel to the target panel현재 활성화된 패널로부터 이동하고자 하는 패널의 방향 |

<a name="Flicking+event_willRestore"></a>

### willRestore

Event fires when user drag amount not reached [threshold](#Flicking+threshold) and is returning to [currentPanel](#Flicking+currentPanel)

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| stop | `function` | Stop the event action and prevent user from dragging이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다 |
| index | `number` | Index of the panel to restore복귀하고자 하는 패널의 인덱스 |
| panel | [Panel](#Panel) | Panel to restore복귀하고자 하는 패널 |
| isTrusted | `boolean` | Boolean that indicates whether the event was generated by a user action이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값 |
| direction | [DIRECTION](#Constants.DIRECTION) | Moving direction relative to previous position of the camera이전 카메라 위치 대비 이동 방향 |

<a name="Flicking+event_restored"></a>

### restored

Event that fires when Flicking has returned to [currentPanel](#Flicking+currentPanel)

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| isTrusted | `boolean` | Boolean that indicates whether the event was generated by a user action이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값 |

<a name="Flicking+event_select"></a>

### select

Event that fires when panel is statically click / touched

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| index | `number` | Selected panel's index선택된 패널의 인덱스 |
| panel | [Panel](#Panel) | Selected panel선택된 패널 |
| direction | [DIRECTION](#Constants.DIRECTION) | Direction from current camera position to the selected panel's position현재 카메라 위치 대비 선택된 패널의 위치 |

<a name="Flicking+event_needPanel"></a>

### needPanel

Event that fires when an empty panel area is visible at the edge of viewport
You can set its threshold with [needPanelThreshold](#Flicking+needPanelThreshold)

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| direction | [DIRECTION](#Constants.DIRECTION) | Direction where new panel is needed. `DIRECTION.PREV` means panels should be [prepend](#Flicking+prepend)ed and `DIRECTION.NEXT` means panels should be [append](#Flicking+append)ed 패널이 필요한 방향. `DIRECTION.PREV`의 경우 패널이 [prepend](#Flicking+prepend)되어야 함을 의미하고, `DIRECTION.NEXT`는 패널이 [append](#Flicking+append)되어야 함을 의미한다 |

<a name="Flicking+event_visibleChange"></a>

### visibleChange

Event that fires when visible panel inside the viewport changes

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| added | [Array&lt;Panel&gt;](#Panel) | Panels that added from previous visible panels새로 보이는 패널의 배열 |
| removed | [Array&lt;Panel&gt;](#Panel) | Panels that removed from previous visible panels보이지 않게 된 패널의 배열 |
| visiblePanels | [Array&lt;Panel&gt;](#Panel) | Current visible panels현재 보이는 패널의 배열 |

<a name="Flicking+event_reachEdge"></a>

### reachEdge

Event that fires when camera reaches the maximum/minimum range

**Kind**: event emitted by [Flicking](#Flicking)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| currentTaget | [Flicking](#Flicking) | An Flicking instance that triggered this event이 이벤트를 트리거한 Flicking의 인스턴스 |
| eventType | `string` | Name of the event이벤트명 |
| direction | [DIRECTION](#Constants.DIRECTION) | Direction indicates whether the camera's position is at the maximum range([DIRECTION.NEXT](#Constants.DIRECTION)) or minimum range([DIRECTION.PREV](#Constants.DIRECTION)) 카메라의 위치가 이동 가능한 범위의 최대점([DIRECTION.NEXT](#Constants.DIRECTION)) 혹은 최소점([DIRECTION.PREV](#Constants.DIRECTION))에 도달했는지를 나타내는 값 |


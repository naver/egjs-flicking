import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



```ts
class Flicking extends Component
```


<div className="container">
    <div className="row mb-2"><div className="col col--4"><strong>Properties</strong></div><div className="col col--4"><strong>Methods</strong></div><div className="col col--4"><strong>Events</strong></div></div>
    <div className="row"><div className="col col--4"><a href="#VERSION">VERSION</a><span className="bulma-tag is-info ml-2">static</span><br/><a href="#control">control</a><br/><a href="#camera">camera</a><br/><a href="#renderer">renderer</a><br/><a href="#viewport">viewport</a><br/><a href="#initialized">initialized</a><br/><a href="#circularEnabled">circularEnabled</a><br/><a href="#index">index</a><br/><a href="#element">element</a><br/><a href="#currentPanel">currentPanel</a><br/><a href="#panels">panels</a><br/><a href="#panelCount">panelCount</a><br/><a href="#visiblePanels">visiblePanels</a><br/><a href="#animating">animating</a><br/><a href="#holding">holding</a><br/><a href="#align">align</a><br/><a href="#defaultIndex">defaultIndex</a><br/><a href="#horizontal">horizontal</a><br/><a href="#circular">circular</a><br/><a href="#bound">bound</a><br/><a href="#adaptive">adaptive</a><br/><a href="#needPanelThreshold">needPanelThreshold</a><br/><a href="#deceleration">deceleration</a><br/><a href="#easing">easing</a><br/><a href="#duration">duration</a><br/><a href="#inputType">inputType</a><br/><a href="#moveType">moveType</a><br/><a href="#threshold">threshold</a><br/><a href="#interruptable">interruptable</a><br/><a href="#bounce">bounce</a><br/><a href="#iOSEdgeSwipeThreshold">iOSEdgeSwipeThreshold</a><br/><a href="#preventClickOnDrag">preventClickOnDrag</a><br/><a href="#renderOnlyVisible">renderOnlyVisible</a><br/><a href="#autoInit">autoInit</a><br/><a href="#autoResize">autoResize</a><br/><a href="#renderExternal">renderExternal</a><br/><a href="#useOrderManipulator">useOrderManipulator</a></div><div className="col col--4"><a href="#test">test</a><span className="bulma-tag is-info ml-2">static</span><br/><a href="#init">init</a><br/><a href="#destroy">destroy</a><br/><a href="#prev">prev</a><br/><a href="#next">next</a><br/><a href="#moveTo">moveTo</a><br/><a href="#getPanel">getPanel</a><br/><a href="#enableInput">enableInput</a><br/><a href="#disableInput">disableInput</a><br/><a href="#getStatus">getStatus</a><br/><a href="#setStatus">setStatus</a><br/><a href="#addPlugins">addPlugins</a><br/><a href="#removePlugins">removePlugins</a><br/><a href="#resize">resize</a><br/><a href="#append">append</a><br/><a href="#prepend">prepend</a><br/><a href="#insert">insert</a><br/><a href="#remove">remove</a><br/><a href="#trigger">trigger</a><br/><a href="#once">once</a><br/><a href="#hasOn">hasOn</a><br/><a href="#on">on</a><br/><a href="#off">off</a></div><div className="col col--4"><a href="#event-ready">ready</a><br/><a href="#event-beforeResize">beforeResize</a><br/><a href="#event-afterResize">afterResize</a><br/><a href="#event-holdStart">holdStart</a><br/><a href="#event-holdEnd">holdEnd</a><br/><a href="#event-moveStart">moveStart</a><br/><a href="#event-move">move</a><br/><a href="#event-moveEnd">moveEnd</a><br/><a href="#event-willChange">willChange</a><br/><a href="#event-changed">changed</a><br/><a href="#event-willRestore">willRestore</a><br/><a href="#event-restored">restored</a><br/><a href="#event-select">select</a><br/><a href="#event-needPanel">needPanel</a><br/><a href="#event-visibleChange">visibleChange</a><br/><a href="#event-reachEdge">reachEdge</a></div></div>
  </div>

## Constructor
```ts
new Flicking(root, options)
```
|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|root|HTMLElement \| string|no||A root HTMLElement to initialize Flicking on it. When it's a typeof `string`, it should be a css selector string
<ko>Flicking을 초기화할 HTMLElement로, `string` 타입으로 지정시 css 선택자 문자열을 지정해야 합니다.</ko>|
|options|object|yes|{}|An options object for Flicking.<ko>Flicking에 적용할 옵션 오브젝트</ko>|


## Properties
### VERSION {#VERSION}
<div className="bulma-tags">
<span className="bulma-tag is-info">static</span>
<span className="bulma-tag is-warning">readonly</span>


</div>

Version info string

**Type**: string












```ts
Flicking.VERSION;  // ex) 4.0.0
```



### control {#control}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

[Control](Control) instance of the Flicking

**Type**: [Control](Control)

**Default**: [SnapControl](SnapControl)









**See**:
- [Control](Control)
- [SnapControl](SnapControl)
- [FreeControl](FreeControl)




### camera {#camera}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

[Camera](Camera) instance of the Flicking

**Type**: [Camera](Camera)

**Default**: [LinearCamera](LinearCamera)









**See**:
- [Camera](Camera)
- [LinearCamera](LinearCamera)
- [BoundCamera](BoundCamera)
- [CircularCamera](CircularCamera)




### renderer {#renderer}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

[Renderer](Renderer) instance of the Flicking

**Type**: [Renderer](Renderer)

**Default**: [RawRenderer](RawRenderer)









**See**:
- [Renderer](Renderer)
- [RawRenderer](RawRenderer)
- [VisibleRenderer](VisibleRenderer)




### viewport {#viewport}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

A component that manages viewport size

**Type**: [Viewport](Viewport)











**See**:
- [Viewport](Viewport)




### initialized {#initialized}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Whether Flicking's [init()](Flicking#init) is called.
This is `true` when [init()](Flicking#init) is called, and is `false` after calling [destroy()](Flicking#destroy).

**Type**: boolean

**Default**: false














### circularEnabled {#circularEnabled}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Whether the `circular` option is enabled.
The [circular](Flicking#circular) option can't be enabled when sum of the panel sizes are too small.

**Type**: boolean

**Default**: false














### index {#index}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Index number of the [currentPanel](Flicking#currentPanel)

**Type**: number

**Default**: 0














### element {#element}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

The root(`.flicking-viewport`) element

**Type**: HTMLElement
















### currentPanel {#currentPanel}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Currently active panel

**Type**: [Panel](Panel)











**See**:
- [Panel](Panel)




### panels {#panels}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Array of panels

**Type**: Array&lt;[Panel](Panel)&gt;











**See**:
- [Panel](Panel)




### panelCount {#panelCount}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Count of panels

**Type**: number
















### visiblePanels {#visiblePanels}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Array of panels that is visible at the current position

**Type**: Array&lt;[Panel](Panel)&gt;











**See**:
- [Panel](Panel)




### animating {#animating}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Whether Flicking's animating

**Type**: boolean
















### holding {#holding}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Whether user is clicking or touching

**Type**: boolean
















### align {#align}
<div className="bulma-tags">




</div>

Align position of the panels within viewport. You can set different values each for the panel and camera

**Type**: [Constants.ALIGN](Constants:ALIGN) \| string \| number \| Object

**Default**: "center"






|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|panel|[Constants.ALIGN](Constants:ALIGN) \| string \| number|The align value for each [Panel](Panel)s<ko>개개의 [Panel](Panel)에 적용할 값</ko>|
|camera|[Constants.ALIGN](Constants:ALIGN) \| string \| number|The align value for [Camera](Camera)<ko>[Camera](Camera)에 적용할 값</ko>|



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



### defaultIndex {#defaultIndex}
<div className="bulma-tags">




</div>

Index of the panel to move when Flicking's [init()](Flicking#init) is called. A zero-based integer

**Type**: number

**Default**: 0














### horizontal {#horizontal}
<div className="bulma-tags">




</div>

Direction of panel movement (true: horizontal, false: vertical)

**Type**: boolean

**Default**: true














### circular {#circular}
<div className="bulma-tags">




</div>

Enables circular(continuous loop) mode, which connects first/last panel for continuous scrolling.

**Type**: boolean

**Default**: false














### bound {#bound}
<div className="bulma-tags">




</div>

Prevent the view(camera element) from going out of the first/last panel, so it won't show empty spaces before/after the first/last panel
Only can be enabled when `circular=false`

**Type**: boolean

**Default**: false














### adaptive {#adaptive}
<div className="bulma-tags">




</div>

Update height of the viewport element after movement same to the height of the panel below. This can be only enabled when `horizontal=true`

**Type**: boolean

**Default**: false














### needPanelThreshold {#needPanelThreshold}
<div className="bulma-tags">




</div>

A Threshold from viewport edge before triggering `needPanel` event

**Type**: number

**Default**: 0














### deceleration {#deceleration}
<div className="bulma-tags">




</div>

Deceleration value for panel movement animation which is triggered by user input. A higher value means a shorter animation time

**Type**: number

**Default**: 0.0075














### easing {#easing}
<div className="bulma-tags">




</div>

An easing function applied to the panel movement animation. Default value is `easeOutCubic`

**Type**: function

**Default**: x =&gt; 1 - Math.pow(1 - x, 3)









**See**:
- Easing Functions Cheat Sheet [http://easings.net/](http://easings#net/) &lt;ko&gt;이징 함수 Cheat Sheet [http://easings.net/](http://easings#net/)&lt;/ko&gt;




### duration {#duration}
<div className="bulma-tags">




</div>

Default duration of the animation (ms)

**Type**: number

**Default**: 500














### inputType {#inputType}
<div className="bulma-tags">




</div>

Types of input devices to enable

**Type**: Array&lt;string&gt;

**Default**: ["touch", "mouse"]









**See**:
- [Possible values (PanInputOption#inputType)](https://naver#github#io/egjs-axes/release/latest/doc/global#html#PanInputOption)
&lt;ko&gt;[가능한 값들 (PanInputOption#inputType)](https://naver#github#io/egjs-axes/release/latest/doc/global#html#PanInputOption)&lt;/ko&gt;




### moveType {#moveType}
<div className="bulma-tags">




</div>

Movement style by user input. This will change instance type of [Flicking#control](Flicking#control)

**Type**: string

**Default**: "snap"









**See**:
- [Constants.MOVE_TYPE](Constants#MOVE_TYPE)
```ts
import Flicking, { MOVE_TYPE } from "@egjs/flicking";

const flicking = new Flicking({
  moveType: MOVE_TYPE.FREE_SCROLL
});
```



### threshold {#threshold}
<div className="bulma-tags">




</div>

Movement threshold to change panel (unit: px). It should be dragged above the threshold to change the current panel.

**Type**: number

**Default**: 40














### interruptable {#interruptable}
<div className="bulma-tags">




</div>

Set animation to be interruptable by click/touch.

**Type**: boolean

**Default**: true














### bounce {#bounce}
<div className="bulma-tags">




</div>

The size value of the bounce area. Only can be enabled when `circular=false`.
You can set different bounce value for prev/next direction by using array.
`number` for px value, and `string` for px, and % value relative to viewport size.
You have to call [Control#updateInput](Control#updateInput) after changing this to take effect.

**Type**: string \| number \| Array&lt;(string\|number)&gt;

**Default**: "20%"










```ts
const possibleOptions = [
  // % values, relative to viewport element(".flicking-viewport")'s size
  "0%", "25%", "42%",
  // px values, arithmetic calculation with (+/-) is also allowed.
  "0px", "100px", "50% - 25px",
  // numbers, same to number + px ("0px", "100px")
  0, 100, 1000
];
```

```ts
const flicking = new Flicking("#el", { bounce: "20%" });

flicking.bounce = "100%";
flicking.control.updateInput(); // Call this to update!
```



### iOSEdgeSwipeThreshold {#iOSEdgeSwipeThreshold}
<div className="bulma-tags">




</div>

Size of the area from the right edge in iOS safari (in px) which enables swipe-back or swipe-forward

**Type**: number

**Default**: 30














### preventClickOnDrag {#preventClickOnDrag}
<div className="bulma-tags">




</div>

Automatically prevent `click` event if the user has dragged at least a single pixel on the viewport element

**Type**: boolean

**Default**: true














### renderOnlyVisible {#renderOnlyVisible}
<div className="bulma-tags">




</div>

Whether to render visible panels only. This can dramatically increase performance when there're many panels.
This will set [renderer](Flicking#renderer)'s type to [VisibleRenderer](VisibleRenderer)

**Type**: boolean

**Default**: false














### autoInit {#autoInit}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Call [init()](Flicking#init) automatically when creating Flicking's instance

**Type**: boolean

**Default**: true














### autoResize {#autoResize}
<div className="bulma-tags">




</div>

Attach Flicking's [resize](Flicking#resize) method to window's resize event.
Flicking will automatically call [resize](Flicking#resize) window size and orientation change.

**Type**: boolean

**Default**: true














### renderExternal {#renderExternal}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

This is an option for the frameworks(React, Vue, Angular, ...). Don't set it as it's automatically managed by Flicking.

**Type**: boolean

**Default**: false












<div className="notification is-warning my-2">⚠️ This member is for <strong>internal</strong> use only.</div>

### useOrderManipulator {#useOrderManipulator}
<div className="bulma-tags">




</div>

Use [OrderManipulator](OrderManipulator) for the element order managing in [Renderer](Renderer).
Instead of inserting/removing element to change order, this will use CSS [order](https://developer#mozilla#org/en-US/docs/Web/CSS/order).
⚠️ Enabling this option will decrease browser coverage to IE11+

**Type**: boolean

**Default**: false














## Methods
### test {#test}
<div className="bulma-tags">
<span className="bulma-tag is-info">static</span>



</div>

A Static test methods





**Returns**: boolean
- A boolean<ko>불린 값</ko>












### init {#init}
<div className="bulma-tags">




</div>

Initialize Flicking and move to the default index
This is automatically called on Flicking's constructor when `autoInit` is true(default)





**Returns**: this


**Emits**: [Flicking#event:ready](Flicking#event-ready)










### destroy {#destroy}
<div className="bulma-tags">




</div>

Destroy Flicking and remove all event handlers





**Returns**: void













### prev {#prev}
<div className="bulma-tags">



<span className="bulma-tag is-success">async</span>
</div>

Move to the previous panel (current index - 1)





**Returns**: Promise&lt;void&gt;
- A Promise which will be resolved after reaching the previous panel<ko>이전 패널 도달시에 resolve되는 Promise</ko>

**Emits**: [Flicking#event:moveStart](Flicking#event-moveStart), [Flicking#event:move](Flicking#event-move), [Flicking#event:moveEnd](Flicking#event-moveEnd), [Flicking#event:willChange](Flicking#event-willChange), [Flicking#event:changed](Flicking#event-changed), [Flicking#event:willRestore](Flicking#event-willRestore), [Flicking#event:restored](Flicking#event-restored), [Flicking#event:needPanel](Flicking#event-needPanel), [Flicking#event:visibleChange](Flicking#event-visibleChange), [Flicking#event:reachEdge](Flicking#event-reachEdge)

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|duration|number|yes|[options.duration](Flicking#duration)|Duration of the panel movement animation (unit: ms)<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>|


**Throws**: [FlickingError](FlickingError)

|code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](Constants#ERROR_CODE)|When the previous panel does not exist|
|[ANIMATION_ALREADY_PLAYING](Constants#ERROR_CODE)|When the animation is already playing|
|[ANIMATION_INTERRUPTED](Constants#ERROR_CODE)|When the animation is interrupted by user input|
|[STOP_CALLED_BY_USER](Constants#ERROR_CODE)|When the any of the event's `stop()` is called|
<ko>

|code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](Constants#ERROR_CODE)|이전 패널이 존재하지 않을 경우|
|[ANIMATION_ALREADY_PLAYING](Constants#ERROR_CODE)|애니메이션이 이미 진행중인 경우|
|[ANIMATION_INTERRUPTED](Constants#ERROR_CODE)|사용자 입력에 의해 애니메이션이 중단된 경우|
|[STOP_CALLED_BY_USER](Constants#ERROR_CODE)|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
</ko>





### next {#next}
<div className="bulma-tags">



<span className="bulma-tag is-success">async</span>
</div>

Move to the next panel (current index + 1)





**Returns**: Promise&lt;void&gt;
- A Promise which will be resolved after reaching the next panel<ko>다음 패널 도달시에 resolve되는 Promise</ko>

**Emits**: [Flicking#event:moveStart](Flicking#event-moveStart), [Flicking#event:move](Flicking#event-move), [Flicking#event:moveEnd](Flicking#event-moveEnd), [Flicking#event:willChange](Flicking#event-willChange), [Flicking#event:changed](Flicking#event-changed), [Flicking#event:willRestore](Flicking#event-willRestore), [Flicking#event:restored](Flicking#event-restored), [Flicking#event:needPanel](Flicking#event-needPanel), [Flicking#event:visibleChange](Flicking#event-visibleChange), [Flicking#event:reachEdge](Flicking#event-reachEdge)

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|duration|number|yes|[options.duration](Flicking#duration)|Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>|


**Throws**: [FlickingError](FlickingError)

|code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](Constants#ERROR_CODE)|When the next panel does not exist|
|[ANIMATION_ALREADY_PLAYING](Constants#ERROR_CODE)|When the animation is already playing|
|[ANIMATION_INTERRUPTED](Constants#ERROR_CODE)|When the animation is interrupted by user input|
|[STOP_CALLED_BY_USER](Constants#ERROR_CODE)|When the any of the event's `stop()` is called|
<ko>

|code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](Constants#ERROR_CODE)|다음 패널이 존재하지 않을 경우|
|[ANIMATION_ALREADY_PLAYING](Constants#ERROR_CODE)|애니메이션이 이미 진행중인 경우|
|[ANIMATION_INTERRUPTED](Constants#ERROR_CODE)|사용자 입력에 의해 애니메이션이 중단된 경우|
|[STOP_CALLED_BY_USER](Constants#ERROR_CODE)|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|

</ko>





### moveTo {#moveTo}
<div className="bulma-tags">



<span className="bulma-tag is-success">async</span>
</div>

Move to the panel with given index





**Returns**: Promise&lt;void&gt;
- A Promise which will be resolved after reaching the target panel<ko>해당 패널 도달시에 resolve되는 Promise</ko>

**Emits**: [Flicking#event:moveStart](Flicking#event-moveStart), [Flicking#event:move](Flicking#event-move), [Flicking#event:moveEnd](Flicking#event-moveEnd), [Flicking#event:willChange](Flicking#event-willChange), [Flicking#event:changed](Flicking#event-changed), [Flicking#event:willRestore](Flicking#event-willRestore), [Flicking#event:restored](Flicking#event-restored), [Flicking#event:needPanel](Flicking#event-needPanel), [Flicking#event:visibleChange](Flicking#event-visibleChange), [Flicking#event:reachEdge](Flicking#event-reachEdge)

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|index|number|no||The index of the panel to move<ko>이동할 패널의 인덱스</ko>|
|duration|number|yes|[options.duration](Flicking#duration)|Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|yes|DIRECTION.NONE|Direction to move, only available in the [circular](Flicking#circular) mode<ko>이동할 방향. [circular](Flicking#circular) 옵션 활성화시에만 사용 가능합니다</ko>|


**Throws**: [FlickingError](FlickingError)

|code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](Constants#ERROR_CODE)|When the root is not either string or HTMLElement|
|[ANIMATION_ALREADY_PLAYING](Constants#ERROR_CODE)|When the animation is already playing|
|[ANIMATION_INTERRUPTED](Constants#ERROR_CODE)|When the animation is interrupted by user input|
|[STOP_CALLED_BY_USER](Constants#ERROR_CODE)|When the any of the event's `stop()` is called|
<ko>

|code|condition|
|---|---|
|[INDEX_OUT_OF_RANGE](Constants#ERROR_CODE)|해당 인덱스를 가진 패널이 존재하지 않을 경우|
|[ANIMATION_ALREADY_PLAYING](Constants#ERROR_CODE)|애니메이션이 이미 진행중인 경우|
|[ANIMATION_INTERRUPTED](Constants#ERROR_CODE)|사용자 입력에 의해 애니메이션이 중단된 경우|
|[STOP_CALLED_BY_USER](Constants#ERROR_CODE)|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|

</ko>





### getPanel {#getPanel}
<div className="bulma-tags">




</div>

Return the [Panel](Panel) at the given index. `null` if it doesn't exists.





**Returns**: [Panel](Panel) \| null
- Panel at the given index<ko>주어진 인덱스에 해당하는 패널</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|index|number|no|||



**See**:
- [Panel](Panel)
```ts
const panel = flicking.getPanel(0);
// Which is a shorthand to...
const samePanel = flicking.panels[0];
```



### enableInput {#enableInput}
<div className="bulma-tags">




</div>

Enable input from the user (mouse/touch)





**Returns**: this













### disableInput {#disableInput}
<div className="bulma-tags">




</div>

Disable input from the user (mouse/touch)





**Returns**: this













### getStatus {#getStatus}
<div className="bulma-tags">




</div>

Get current flicking status. You can restore current state by giving returned value to [setStatus()](Flicking#setStatus)





**Returns**: 
- An object with current status value information.<ko>현재 상태값 정보를 가진 객체.</ko>












### setStatus {#setStatus}
<div className="bulma-tags">




</div>

Restore to the state of the `status`





**Returns**: void




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|status||no||Status value to be restored. You can specify the return value of the [getStatus()](Flicking#getStatus) method<ko>복원할 상태 값. [getStatus()](Flicking#getStatus)메서드의 반환값을 지정하면 됩니다</ko>|








### addPlugins {#addPlugins}
<div className="bulma-tags">




</div>

Add plugins that can have different effects on Flicking





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|plugins|Plugin \| Plugin[]|no||The plugin(s) to add<ko>추가할 플러그인(들)</ko>|








### removePlugins {#removePlugins}
<div className="bulma-tags">




</div>

Remove plugins from Flicking.





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|plugins|Plugin \| Plugin[]|no||The plugin(s) to remove.<ko>제거 플러그인(들).</ko>|








### resize {#resize}
<div className="bulma-tags">




</div>

Update viewport/panel sizes





**Returns**: this


**Emits**: [Flicking#event:beforeResize](Flicking#event-beforeResize), [Flicking#event:afterResize](Flicking#event-afterResize)










### append {#append}
<div className="bulma-tags">




</div>

Add new panels after the last panel





**Returns**: Array&lt;[Panel](Panel)&gt;
- An array of appended panels<ko>추가된 패널들의 배열</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|element|[ElementLike](ElementLike) \| Array&lt;[ElementLike](ElementLike)&gt;|no||A new HTMLElement, a outerHTML of element, or an array of both
<ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>|


**Throws**: [FlickingError](FlickingError)

[ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK](Constants#ERROR_CODE) if called on frameworks (React, Angular, Vue...)
**See**:
- [Panel](Panel)
- [ElementLike](ElementLike)
```ts
const flicking = new Flicking("#flick");
// These are possible parameters
flicking.append(document.createElement("div"));
flicking.append("\<div\>Panel\</div\>");
flicking.append(["\<div\>Panel\</div\>", document.createElement("div")]);
// Even this is possible
flicking.append("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
```



### prepend {#prepend}
<div className="bulma-tags">




</div>

Add new panels before the first panel
This will increase index of panels after by the number of panels added





**Returns**: Array&lt;[Panel](Panel)&gt;
- An array of prepended panels<ko>추가된 패널들의 배열</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|element|[ElementLike](ElementLike) \| Array&lt;[ElementLike](ElementLike)&gt;|no||A new HTMLElement, a outerHTML of element, or an array of both
<ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>|


**Throws**: [FlickingError](FlickingError)

[ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK](Constants#ERROR_CODE) if called on frameworks (React, Angular, Vue...)
**See**:
- [Panel](Panel)
- [ElementLike](ElementLike)
```ts
const flicking = new eg.Flicking("#flick");
flicking.prepend(document.createElement("div"));
flicking.prepend("\<div\>Panel\</div\>");
flicking.prepend(["\<div\>Panel\</div\>", document.createElement("div")]);
// Even this is possible
flicking.prepend("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
```



### insert {#insert}
<div className="bulma-tags">




</div>

Insert new panels at given index
This will increase index of panels after by the number of panels added





**Returns**: Array&lt;[Panel](Panel)&gt;
- An array of prepended panels<ko>추가된 패널들의 배열</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|index|number|no||Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>|
|element|[ElementLike](ElementLike) \| Array&lt;[ElementLike](ElementLike)&gt;|no||A new HTMLElement, a outerHTML of element, or an array of both
<ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>|


**Throws**: [FlickingError](FlickingError)

[ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK](Constants#ERROR_CODE) if called on frameworks (React, Angular, Vue...)

```ts
const flicking = new eg.Flicking("#flick");
flicking.insert(0, document.createElement("div"));
flicking.insert(2, "\<div\>Panel\</div\>");
flicking.insert(1, ["\<div\>Panel\</div\>", document.createElement("div")]);
// Even this is possible
flicking.insert(3, "\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
```



### remove {#remove}
<div className="bulma-tags">




</div>

Remove the panel at the given index
This will decrease index of panels after by the number of panels removed





**Returns**: Array&lt;[Panel](Panel)&gt;
- An array of removed panels<ko>제거된 패널들의 배열</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|index|number|no||Index of panel to remove<ko>제거할 패널의 인덱스</ko>|
|deleteCount|number|yes|1|Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>|








### trigger {#trigger}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Trigger a custom event.





**Returns**: this
- An instance of the component itself<ko>컴포넌트 자신의 인스턴스</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|event|string \| ComponentEvent|no||The name of the custom event to be triggered or an instance of the ComponentEvent<ko>발생할 커스텀 이벤트의 이름 또는 ComponentEvent의 인스턴스</ko>|
|params|Array&lt;any&gt; \| $ts:...|no||Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>|




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



### once {#once}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Executed event just one time.





**Returns**: this
- An instance of the component itself<ko>컴포넌트 자신의 인스턴스</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|eventName|string \| $ts:...|no||The name of the event to be attached or an event name - event handler mapped object.<ko>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</ko>|
|handlerToAttach|function \| $ts:...|yes||The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>|




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



### hasOn {#hasOn}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Checks whether an event has been attached to a component.





**Returns**: boolean
- Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|eventName|string|no||The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>|




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



### on {#on}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Attaches an event to a component.





**Returns**: this
- An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|eventName|string \| $ts:...|no||The name of the event to be attached or an event name - event handler mapped object.<ko>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</ko>|
|handlerToAttach|function \| $ts:...|yes||The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>|




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



### off {#off}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Detaches an event from the component.<br/>If the `eventName` is not given this will detach all event handlers attached.<br/>If the `handlerToDetach` is not given, this will detach all event handlers for `eventName`.





**Returns**: this
- An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|eventName|string \| $ts:...|yes||The name of the event to be detached <ko>해제할 이벤트의 이름</ko>|
|handlerToDetach|function \| $ts:...|yes||The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>|




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



## Events
### ready {#event-ready}
<div className="bulma-tags">




</div>

Event that fires when Flicking's [init()](Flicking#init) is called

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|







### beforeResize {#event-beforeResize}
<div className="bulma-tags">




</div>

Event that fires when Flicking's [resize()](Flicking#resize) is called, before updating the sizes of panels and viewport.
You can update the sizes of panels and viewport with this event, and it'll be applied after [resize()](Flicking#resize) is finished.

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|width|number|Previous width of the viewport<ko>기존 뷰포트 너비</ko>|
|height|number|Previous height of the viewport<ko>기존 뷰포트 높이</ko>|
|element|HTMLElement|The viewport element<ko>뷰포트 엘리먼트</ko>|







### afterResize {#event-afterResize}
<div className="bulma-tags">




</div>

Event that fires when Flicking's [resize()](Flicking#resize) is called, after updating the sizes of panels and viewport.

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|width|number|New width of the viewport<ko>업데이트된 뷰포트 너비</ko>|
|height|number|New height of the viewport<ko>업데이트된 뷰포트 높이</ko>|
|prev|object|Previous size of the viewport<ko>기존 뷰포트 크기</ko>|
|prev.width|number|Previous width of the viewport<ko>기존 뷰포트 너비</ko>|
|prev.height|number|Previous height of the viewport<ko>기존 뷰포트 높이</ko>|
|sizeChanged|boolean|A Boolean value indicating whether the width/height of the viewport element is changed<ko>뷰포트 너비/크기가 변경되었는지 여부를 나타내는 값</ko>|
|element|HTMLElement|The viewport element<ko>뷰포트 엘리먼트</ko>|







### holdStart {#event-holdStart}
<div className="bulma-tags">




</div>

Event that fires when user started dragging.

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|stop|function|Stop the event action and prevent user from dragging<ko>이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다.</ko>|
|axesEvent|object|[hold](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-hold) event of [Axes](https://naver#github#io/egjs-axes/)
<ko>[Axes](https://naver#github#io/egjs-axes/)의 [hold](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-hold) 이벤트</ko>|







### holdEnd {#event-holdEnd}
<div className="bulma-tags">




</div>

Event that fires when user stopped dragging.

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|axesEvent|object|[release](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-release) event of [Axes](https://naver#github#io/egjs-axes/)
<ko>[Axes](https://naver#github#io/egjs-axes/)의 [release](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-release) 이벤트</ko>|







### moveStart {#event-moveStart}
<div className="bulma-tags">




</div>

Event that fires once before first [move](Flicking#event-move) event

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|stop|function|Stop the event action and prevent user from dragging<ko>이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다.</ko>|
|isTrusted|boolean|Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>|
|holding|boolean|Boolean that indicates whether the user is dragging the viewport element<ko>사용자가 현재 viewport 엘리먼트를 드래그하고있는지를 나타내는 값</ko>|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|Moving direction relative to previous position of the camera<ko>이전 카메라 위치 대비 이동 방향</ko>|
|axesEvent|object|[change](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-change) event of [Axes](https://naver#github#io/egjs-axes/)
<ko>[Axes](https://naver#github#io/egjs-axes/)의 [change](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-change) 이벤트</ko>|







### move {#event-move}
<div className="bulma-tags">




</div>

Event that fires for every movement

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|stop|function|Stop the event action and prevent user from dragging<ko>이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다.</ko>|
|isTrusted|boolean|Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>|
|holding|boolean|Boolean that indicates whether the user is dragging the viewport element<ko>사용자가 현재 viewport 엘리먼트를 드래그하고있는지를 나타내는 값</ko>|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|Moving direction relative to previous position of the camera<ko>이전 카메라 위치 대비 이동 방향</ko>|
|axesEvent|object|[change](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-change) event of [Axes](https://naver#github#io/egjs-axes/)
<ko>[Axes](https://naver#github#io/egjs-axes/)의 [change](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-change) 이벤트</ko>|







### moveEnd {#event-moveEnd}
<div className="bulma-tags">




</div>

Event that fires when the movement is finished by user input release or animation end.

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|isTrusted|boolean|Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>|
|holding|boolean|Boolean that indicates whether the user is dragging the viewport element<ko>사용자가 현재 viewport 엘리먼트를 드래그하고있는지를 나타내는 값</ko>|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|Moving direction relative to previous position of the camera<ko>이전 카메라 위치 대비 이동 방향</ko>|
|axesEvent|object|[finish](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-finish) event of [Axes](https://naver#github#io/egjs-axes/)
<ko>[Axes](https://naver#github#io/egjs-axes/)의 [finish](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-finish) 이벤트</ko>|







### willChange {#event-willChange}
<div className="bulma-tags">




</div>

Event that fires when Flicking's active index will be changed. Index will be changed at the [changed](Flicking#event-changed) event.
It can be triggered when user finished input, or flicking start to move by method.
Calling `stop()` in event will prevent index change and camera movement.

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|stop|function|Stop the event action and prevent user from dragging<ko>이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다.</ko>|
|index|number|New active index<ko>변경할 인덱스</ko>|
|panel|[Panel](Panel)|New active panel<ko>인덱스 변경 이후 활성화된 패널로 설정할 패널</ko>|
|isTrusted|boolean|Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|Moving direction from the active panel to the target panel<ko>현재 활성화된 패널로부터 이동하고자 하는 패널의 방향</ko>|







### changed {#event-changed}
<div className="bulma-tags">




</div>

Event that fires when Flicking's index is changed.

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|index|number|New index<ko>새 인덱스</ko>|
|panel|[Panel](Panel)|New active panel<ko>새로 선택된 패널</ko>|
|prevIndex|number|Previous index<ko>이전 인덱스</ko>|
|prevPanel|[Panel](Panel) \| null|Previous active panel<ko>이전 패널</ko>|
|isTrusted|boolean|Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|Moving direction from the active panel to the target panel<ko>현재 활성화된 패널로부터 이동하고자 하는 패널의 방향</ko>|







### willRestore {#event-willRestore}
<div className="bulma-tags">




</div>

Event fires when user drag amount not reached [threshold](Flicking#threshold) and is returning to [currentPanel](Flicking#currentPanel)

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|stop|function|Stop the event action and prevent user from dragging<ko>이벤트 동작을 멈추고, 사용자가 드래그하지 못하도록 막습니다</ko>|
|index|number|Index of the panel to restore<ko>복귀하고자 하는 패널의 인덱스</ko>|
|panel|[Panel](Panel)|Panel to restore<ko>복귀하고자 하는 패널</ko>|
|isTrusted|boolean|Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|Moving direction relative to previous position of the camera<ko>이전 카메라 위치 대비 이동 방향</ko>|







### restored {#event-restored}
<div className="bulma-tags">




</div>

Event that fires when Flicking has returned to [currentPanel](Flicking#currentPanel)

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|isTrusted|boolean|Boolean that indicates whether the event was generated by a user action<ko>이벤트가 사용자 입력에 의하여 발생되었는지를 나타내는 값</ko>|







### select {#event-select}
<div className="bulma-tags">




</div>

Event that fires when panel is statically click / touched

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|index|number|Selected panel's index<ko>선택된 패널의 인덱스</ko>|
|panel|[Panel](Panel)|Selected panel<ko>선택된 패널</ko>|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|Direction from current camera position to the selected panel's position<ko>현재 카메라 위치 대비 선택된 패널의 위치</ko>|







### needPanel {#event-needPanel}
<div className="bulma-tags">




</div>

Event that fires when an empty panel area is visible at the edge of viewport
You can set its threshold with [needPanelThreshold](Flicking#needPanelThreshold)

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|Direction where new panel is needed.
`DIRECTION.PREV` means panels should be [prepend](Flicking#prepend)ed and `DIRECTION.NEXT` means panels should be [append](Flicking#append)ed
<ko>패널이 필요한 방향.
`DIRECTION.PREV`의 경우 패널이 [prepend](Flicking#prepend)되어야 함을 의미하고, `DIRECTION.NEXT`는 패널이 [append](Flicking#append)되어야 함을 의미한다</ko>|







### visibleChange {#event-visibleChange}
<div className="bulma-tags">




</div>

Event that fires when visible panel inside the viewport changes

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|added|Array&lt;[Panel](Panel)&gt;|Panels that added from previous visible panels<ko>새로 보이는 패널의 배열</ko>|
|removed|Array&lt;[Panel](Panel)&gt;|Panels that removed from previous visible panels<ko>보이지 않게 된 패널의 배열</ko>|
|visiblePanels|Array&lt;[Panel](Panel)&gt;|Current visible panels<ko>현재 보이는 패널의 배열</ko>|







### reachEdge {#event-reachEdge}
<div className="bulma-tags">




</div>

Event that fires when camera reaches the maximum/minimum range

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|currentTarget|[Flicking](Flicking)|An Flicking instance that triggered this event<ko>이 이벤트를 트리거한 Flicking의 인스턴스</ko>|
|eventType|string|Name of the event<ko>이벤트명</ko>|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|Direction indicates whether the camera's position is at the maximum range([DIRECTION.NEXT](Constants#DIRECTION)) or minimum range([DIRECTION.PREV](Constants#DIRECTION))
<ko>카메라의 위치가 이동 가능한 범위의 최대점([DIRECTION.NEXT](Constants#DIRECTION)) 혹은 최소점([DIRECTION.PREV](Constants#DIRECTION))에 도달했는지를 나타내는 값</ko>|








import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



```ts
class Control 
```
A component that manages inputs and animation of Flicking

<div className="container">
    <div className="row mb-2"><div className="col col--6"><strong>Properties</strong></div><div className="col col--6"><strong>Methods</strong></div></div>
    <div className="row"><div className="col col--6"><a href="#controller">controller</a><br/><a href="#activeIndex">activeIndex</a><br/><a href="#activePanel">activePanel</a><br/><a href="#animating">animating</a><br/><a href="#holding">holding</a></div><div className="col col--6"><a href="#moveToPosition">moveToPosition</a><br/><a href="#init">init</a><br/><a href="#destroy">destroy</a><br/><a href="#enable">enable</a><br/><a href="#disable">disable</a><br/><a href="#updateInput">updateInput</a><br/><a href="#resetActivePanel">resetActivePanel</a><br/><a href="#moveToPanel">moveToPanel</a></div></div>
  </div>



## Properties

### controller {#controller}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

A controller that handles the [@egjs/axes](https://naver#github#io/egjs-axes/) events

**Type**: [AxesController](AxesController)
















### activeIndex {#activeIndex}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Index number of the [currentPanel](Flicking#currentPanel)

**Type**: number

**Default**: 0














### activePanel {#activePanel}
<div className="bulma-tags">

<span className="bulma-tag is-warning">readonly</span>


</div>

Currently active panel

**Type**: [Panel](Panel)











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
















## Methods

### moveToPosition {#moveToPosition}
<div className="bulma-tags">




</div>

Move [Camera](Camera) to the given position





**Returns**: Promise&lt;void&gt;
- A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>

**Emits**: [Flicking#event:moveStart](Flicking#event-moveStart), [Flicking#event:move](Flicking#event-move), [Flicking#event:moveEnd](Flicking#event-moveEnd), [Flicking#event:willChange](Flicking#event-willChange), [Flicking#event:changed](Flicking#event-changed), [Flicking#event:willRestore](Flicking#event-willRestore), [Flicking#event:restored](Flicking#event-restored), [Flicking#event:needPanel](Flicking#event-needPanel), [Flicking#event:visibleChange](Flicking#event-visibleChange), [Flicking#event:reachEdge](Flicking#event-reachEdge)

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|position|number|no||The target position to move<ko>이동할 좌표</ko>|
|duration|number|no||Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>|
|axesEvent|object|yes||[release](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-release) event of [Axes](https://naver#github#io/egjs-axes/)
<ko>[Axes](https://naver#github#io/egjs-axes/)의 [release](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-release) 이벤트</ko>|


**Throws**: [FlickingError](FlickingError)

|code|condition|
|---|---|
|[POSITION_NOT_REACHABLE](Constants#ERROR_CODE)|When the given panel is already removed or not in the Camera's [range](Camera#range)|
|[NOT_ATTACHED_TO_FLICKING](Constants#ERROR_CODE)|When [init](Control#init) is not called before|
|[ANIMATION_INTERRUPTED](Constants#ERROR_CODE)|When the animation is interrupted by user input|
|[STOP_CALLED_BY_USER](Constants#ERROR_CODE)|When the animation is interrupted by user input|
<ko>

|code|condition|
|---|---|
|[POSITION_NOT_REACHABLE](Constants#ERROR_CODE)|주어진 패널이 제거되었거나, Camera의 [range](Camera#range) 밖에 있을 경우|
|[NOT_ATTACHED_TO_FLICKING](Constants#ERROR_CODE)|[init](Control#init)이 이전에 호출되지 않은 경우|
|[ANIMATION_INTERRUPTED](Constants#ERROR_CODE)|사용자 입력에 의해 애니메이션이 중단된 경우|
|[STOP_CALLED_BY_USER](Constants#ERROR_CODE)|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|

</ko>





### init {#init}
<div className="bulma-tags">




</div>

Initialize Control





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|flicking|[Flicking](Flicking)|no||An instance of [Flicking](Flicking)<ko>Flicking의 인스턴스</ko>|








### destroy {#destroy}
<div className="bulma-tags">




</div>

Destroy Control and return to initial state





**Returns**: void













### enable {#enable}
<div className="bulma-tags">




</div>

Enable input from the user (mouse/touch)





**Returns**: this













### disable {#disable}
<div className="bulma-tags">




</div>

Disable input from the user (mouse/touch)





**Returns**: this













### updateInput {#updateInput}
<div className="bulma-tags">




</div>

Update [controller](Control#controller)'s state





**Returns**: this













### resetActivePanel {#resetActivePanel}
<div className="bulma-tags">




</div>

Reset [activePanel](Control#activePanel) to `null`





**Returns**: this













### moveToPanel {#moveToPanel}
<div className="bulma-tags">



<span className="bulma-tag is-success">async</span>
</div>

Move [Camera](Camera) to the given panel





**Returns**: Promise&lt;void&gt;
- A Promise which will be resolved after reaching the target panel<ko>해당 패널 도달시에 resolve되는 Promise</ko>

**Emits**: [Flicking#event:moveStart](Flicking#event-moveStart), [Flicking#event:move](Flicking#event-move), [Flicking#event:moveEnd](Flicking#event-moveEnd), [Flicking#event:willChange](Flicking#event-willChange), [Flicking#event:changed](Flicking#event-changed), [Flicking#event:willRestore](Flicking#event-willRestore), [Flicking#event:restored](Flicking#event-restored), [Flicking#event:needPanel](Flicking#event-needPanel), [Flicking#event:visibleChange](Flicking#event-visibleChange), [Flicking#event:reachEdge](Flicking#event-reachEdge)

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panel|[Panel](Panel)|no||The target panel to move<ko>이동할 패널</ko>|
|options|object|no||An options object<ko>옵션 오브젝트</ko>|
|duration|number|no||Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>|
|axesEvent|object|yes||[release](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-release) event of [Axes](https://naver#github#io/egjs-axes/)|
|direction|[Constants.DIRECTION](Constants:DIRECTION)|yes|DIRECTION.NONE|Direction to move, only available in the [circular](Flicking#circular) mode<ko>이동할 방향. [circular](Flicking#circular) 옵션 활성화시에만 사용 가능합니다</ko>
<ko>[Axes](https://naver#github#io/egjs-axes/)의 [release](https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#event-release) 이벤트</ko>|


**Throws**: [FlickingError](FlickingError)

|code|condition|
|---|---|
|[POSITION_NOT_REACHABLE](Constants#ERROR_CODE)|When the given panel is already removed or not in the Camera's [range](Camera#range)|
|[NOT_ATTACHED_TO_FLICKING](Constants#ERROR_CODE)|When [init](Control#init) is not called before|
|[ANIMATION_INTERRUPTED](Constants#ERROR_CODE)|When the animation is interrupted by user input|
|[STOP_CALLED_BY_USER](Constants#ERROR_CODE)|When the animation is interrupted by user input|
<ko>

|code|condition|
|---|---|
|[POSITION_NOT_REACHABLE](Constants#ERROR_CODE)|주어진 패널이 제거되었거나, Camera의 [range](Camera#range) 밖에 있을 경우|
|[NOT_ATTACHED_TO_FLICKING](Constants#ERROR_CODE)|[init](Control#init)이 이전에 호출되지 않은 경우|
|[ANIMATION_INTERRUPTED](Constants#ERROR_CODE)|사용자 입력에 의해 애니메이션이 중단된 경우|
|[STOP_CALLED_BY_USER](Constants#ERROR_CODE)|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|

</ko>







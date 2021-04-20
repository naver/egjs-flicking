import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```ts
class AxesController 
```
A controller that handles the [@egjs/axes](https://naver.github.io/egjs-axes/) events

<div className="container">
    <div className="row mb-2"><div className="col col--6"><strong>Properties</strong></div><div className="col col--6"><strong>Methods</strong></div></div>
    <div className="row"><div className="col col--6"><a href="#axes">axes</a><br/><a href="#state">state</a><br/><a href="#animatingContext">animatingContext</a><br/><a href="#enabled">enabled</a><br/><a href="#position">position</a></div><div className="col col--6"><a href="#init">init</a><br/><a href="#destroy">destroy</a><br/><a href="#enable">enable</a><br/><a href="#disable">disable</a><br/><a href="#update">update</a><br/><a href="#animateTo">animateTo</a></div></div>
  </div>



## Properties

### axes {#axes}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

An [Axes](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html) instance

**Type**: Axes






**See**:
- https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html




### state {#state}
<div className="bulma-tags">




</div>

A activated [State](State) that shows the current status of the user input or the animation

**Type**: [State](State)











### animatingContext {#animatingContext}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

A context of the current animation playing

**Type**: object











### enabled {#enabled}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

A Boolean indicating whether the user input is enabled

**Type**: boolean











### position {#position}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Current position value in [Axes](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html) instance

**Type**: number











## Methods

### init {#init}
<div className="bulma-tags">




</div>

Initialize AxesController



**Returns**: this


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|flicking|[Flicking](Flicking)|no||An instance of Flicking|







### destroy {#destroy}
<div className="bulma-tags">




</div>

Destroy AxesController and return to initial state



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










### update {#update}
<div className="bulma-tags">




</div>

Update [@egjs/axes](https://naver.github.io/egjs-axes/)'s state



**Returns**: this




**Throws**: [FlickingError](FlickingError)

[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE) When [init](AxesController#init) is not called before
<ko>[init](AxesController#init)이 이전에 호출되지 않은 경우</ko>





### animateTo {#animateTo}
<div className="bulma-tags">




</div>

Run Axes's [setTo](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo) using the given position



**Returns**: Promise&lt;void&gt;
- A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|position|number|no||A position to move<ko>이동할 좌표</ko>|
|duration|number|no||Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>|
|axesEvent|number|yes||If provided, it'll use its [setTo](setTo) method instead|

**Throws**: [FlickingError](FlickingError)

|code|condition|
|---|---|
|[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE)|When [init](Control#init) is not called before|
|[ANIMATION_INTERRUPTED](Constants.ERROR_CODE)|When the animation is interrupted by user input|
<ko>

|code|condition|
|---|---|
|[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE)|[init](Control#init)이 이전에 호출되지 않은 경우|
|[ANIMATION_INTERRUPTED](Constants.ERROR_CODE)|사용자 입력에 의해 애니메이션이 중단된 경우|

</ko>







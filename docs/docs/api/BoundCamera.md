import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```ts
class BoundCamera extends Camera
```
A [Camera](Camera) that set range not to go out of the first/last panel, so it won't show empty spaces before/after the first/last panel

<div className="container">
    <div className="row mb-2"><div className="col col--6"><strong>Properties</strong></div><div className="col col--6"><strong>Methods</strong></div></div>
    <div className="row"><div className="col col--6"><a href="#element">element</a><br/><a href="#position">position</a><br/><a href="#alignPosition">alignPosition</a><br/><a href="#offset">offset</a><br/><a href="#range">range</a><br/><a href="#rangeDiff">rangeDiff</a><br/><a href="#visiblePanels">visiblePanels</a><br/><a href="#visibleRange">visibleRange</a><br/><a href="#anchorPoints">anchorPoints</a><br/><a href="#controlParams">controlParams</a><br/><a href="#atEdge">atEdge</a><br/><a href="#size">size</a><br/><a href="#align">align</a></div><div className="col col--6"><a href="#updateRange">updateRange</a><br/><a href="#init">init</a><br/><a href="#destroy">destroy</a><br/><a href="#lookAt">lookAt</a><br/><a href="#getPrevAnchor">getPrevAnchor</a><br/><a href="#getNextAnchor">getNextAnchor</a><br/><a href="#findAnchorIncludePosition">findAnchorIncludePosition</a><br/><a href="#findNearestAnchor">findNearestAnchor</a><br/><a href="#clampToReachablePosition">clampToReachablePosition</a><br/><a href="#canReach">canReach</a><br/><a href="#canSee">canSee</a><br/><a href="#updateAlignPos">updateAlignPos</a><br/><a href="#updateAnchors">updateAnchors</a><br/><a href="#updatePosition">updatePosition</a><br/><a href="#resetNeedPanelHistory">resetNeedPanelHistory</a></div></div>
  </div>



## Properties

### element {#element}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

The camera(`.flicking-camera`) element

**Type**: HTMLElement











### position {#position}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

Current position of the camera

**Type**: number











### alignPosition {#alignPosition}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

Align position inside the viewport where [Panel](Panel)'s [alignPosition](Panel#alignPosition) should be located at

**Type**: number











### offset {#offset}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Position offset, used for the [renderOnlyVisible](Flicking#renderOnlyVisible) option

**Type**: number
**Default**: 0










### range {#range}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

A range that Camera's [position](Camera#position) can reach

**Type**: object











### rangeDiff {#rangeDiff}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

A difference between Camera's minimum and maximum position that can reach

**Type**: number











### visiblePanels {#visiblePanels}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

An array of visible panels from the current position

**Type**: Array&lt;[Panel](Panel)&gt;











### visibleRange {#visibleRange}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

A range of the visible area from the current position

**Type**: object











### anchorPoints {#anchorPoints}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

An array of [AnchorPoint](AnchorPoint)s that Camera can be stopped at

**Type**: Array&lt;[AnchorPoint](AnchorPoint)&gt;











### controlParams {#controlParams}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

A current parameters of the Camera for updating [AxesController](AxesController)

**Type**: object











### atEdge {#atEdge}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

A Boolean value indicating whether Camera's over the minimum or maximum position reachable

**Type**: boolean











### size {#size}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

Return the size of the viewport

**Type**: number











### align {#align}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

A value indicating where the [alignPosition](Camera#alignPosition) should be located at inside the viewport element

**Type**: [Constants.ALIGN](Constants.ALIGN) \| string \| number











## Methods

### updateRange {#updateRange}
<div className="bulma-tags">




</div>

Update [range](Camera#range) of Camera



**Returns**: this




**Throws**: [FlickingError](FlickingError)

[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE) When [init](Camera#init) is not called before
<ko>[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE) [init](Camera#init)이 이전에 호출되지 않은 경우</ko>





### init {#init}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Initialize Camera



**Returns**: this


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|flicking|[Flicking](Flicking)|no||An instance of [Flicking](Flicking)<ko>Flicking의 인스턴스</ko>|

**Throws**: [FlickingError](FlickingError)

[VAL_MUST_NOT_NULL](Constants.ERROR_CODE) If the camera element(`.flicking-camera`) does not exist inside viewport element
<ko>[VAL_MUST_NOT_NULL](Constants.ERROR_CODE) 뷰포트 엘리먼트 내부에 카메라 엘리먼트(`.flicking-camera`)가 존재하지 않을 경우</ko>





### destroy {#destroy}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Destroy Camera and return to initial state



**Returns**: void










### lookAt {#lookAt}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Move to the given position and apply CSS transform



**Returns**: this


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|pos|number|no||A new position<ko>움직일 위치</ko>|

**Throws**: [FlickingError](FlickingError)

[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE) When [init](Camera#init) is not called before
<ko>[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE) [init](Camera#init)이 이전에 호출되지 않은 경우</ko>





### getPrevAnchor {#getPrevAnchor}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Return a previous [AnchorPoint](AnchorPoint) of given [AnchorPoint](AnchorPoint)
If it does not exist, return `null` instead



**Returns**: [AnchorPoint](AnchorPoint) \| null
- The previous {@link AnchorPoint}<ko>이전 {@link AnchorPoint}</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|anchor|[AnchorPoint](AnchorPoint)|no||A reference [AnchorPoint](AnchorPoint)<ko>기준 [AnchorPoint](AnchorPoint)</ko>|







### getNextAnchor {#getNextAnchor}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Return a next [AnchorPoint](AnchorPoint) of given [AnchorPoint](AnchorPoint)
If it does not exist, return `null` instead



**Returns**: [AnchorPoint](AnchorPoint) \| null
- The next {@link AnchorPoint}<ko>다음 {@link AnchorPoint}</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|anchor|[AnchorPoint](AnchorPoint)|no||A reference [AnchorPoint](AnchorPoint)<ko>기준 [AnchorPoint](AnchorPoint)</ko>|







### findAnchorIncludePosition {#findAnchorIncludePosition}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Return [AnchorPoint](AnchorPoint) that includes given position
If there's no [AnchorPoint](AnchorPoint) that includes the given position, return `null` instead



**Returns**: [AnchorPoint](AnchorPoint) \| null
- The {@link AnchorPoint} that includes the given position<ko>해당 좌표를 포함하는 {@link AnchorPoint}</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|position|number|no||A position to check<ko>확인할 좌표</ko>|







### findNearestAnchor {#findNearestAnchor}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Return [AnchorPoint](AnchorPoint) nearest to given position
If there're no [AnchorPoint](AnchorPoint)s, return `null` instead



**Returns**: [AnchorPoint](AnchorPoint) \| null
- The {@link AnchorPoint} nearest to the given position<ko>해당 좌표에 가장 인접한 {@link AnchorPoint}</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|position|number|no||A position to check<ko>확인할 좌표</ko>|







### clampToReachablePosition {#clampToReachablePosition}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Clamp the given position between camera's range



**Returns**: number
- A clamped position<ko>범위 제한된 좌표</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|position|number|no||A position to clamp<ko>범위를 제한할 좌표</ko>|







### canReach {#canReach}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Check whether the given panel is inside of the Camera's range



**Returns**: boolean
- Whether the panel's inside Camera's range<ko>도달 가능한 범위 내에 해당 패널이 존재하는지 여부</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panel|[Panel](Panel)|no||An instance of [Panel](Panel) to check<ko>확인할 [Panel](Panel)의 인스턴스</ko>|







### canSee {#canSee}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Check whether the given panel element is visible at the current position



**Returns**: boolean
- Whether the panel element is visible at the current position<ko>현재 위치에서 해당 패널 엘리먼트가 보이는지 여부</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panel|[Panel](Panel)|no||An instance of [Panel](Panel) to check<ko>확인할 [Panel](Panel)의 인스턴스</ko>|







### updateAlignPos {#updateAlignPos}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Update Camera's [alignPosition](Camera#alignPosition)



**Returns**: this










### updateAnchors {#updateAnchors}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Update Camera's [anchorPoints](Camera#anchorPoints)



**Returns**: this




**Throws**: [FlickingError](FlickingError)

[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE) When [init](Camera#init) is not called before
<ko>[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE) [init](Camera#init)이 이전에 호출되지 않은 경우</ko>





### updatePosition {#updatePosition}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Update position after resizing



**Returns**: this




**Throws**: [FlickingError](FlickingError)

[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE) When [init](Camera#init) is not called before
<ko>[NOT_ATTACHED_TO_FLICKING](Constants.ERROR_CODE) [init](Camera#init)이 이전에 호출되지 않은 경우</ko>





### resetNeedPanelHistory {#resetNeedPanelHistory}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Reset the history of [needPanel](Flicking#event-needPanel) events so it can be triggered again



**Returns**: this












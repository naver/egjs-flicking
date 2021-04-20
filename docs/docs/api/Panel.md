import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```ts
class Panel 
```
An slide data component that holds information of a single HTMLElement

<div className="container">
    <div className="row mb-2"><div className="col col--6"><strong>Properties</strong></div><div className="col col--6"><strong>Methods</strong></div></div>
    <div className="row"><div className="col col--6"><a href="#element">element</a><br/><a href="#index">index</a><br/><a href="#position">position</a><br/><a href="#size">size</a><br/><a href="#sizeIncludingMargin">sizeIncludingMargin</a><br/><a href="#height">height</a><br/><a href="#margin">margin</a><br/><a href="#alignPosition">alignPosition</a><br/><a href="#offset">offset</a><br/><a href="#removed">removed</a><br/><a href="#range">range</a><br/><a href="#align">align</a></div><div className="col col--6"><a href="#resize">resize</a><br/><a href="#contains">contains</a><br/><a href="#destroy">destroy</a><br/><a href="#includePosition">includePosition</a><br/><a href="#includeRange">includeRange</a><br/><a href="#focus">focus</a><br/><a href="#prev">prev</a><br/><a href="#next">next</a><br/><a href="#increaseIndex">increaseIndex</a><br/><a href="#decreaseIndex">decreaseIndex</a><br/><a href="#increasePosition">increasePosition</a><br/><a href="#decreasePosition">decreasePosition</a><br/><a href="#increaseOffset">increaseOffset</a><br/><a href="#decreaseOffset">decreaseOffset</a><br/><a href="#resetOffset">resetOffset</a></div></div>
  </div>

## Constructor
```ts
new Panel(options, options.el, options.index, options.align, options.flicking)
```
|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|options|object|no||An options object<ko>옵션 오브젝트</ko>|
|options.el|HTMLElement|yes||A `HTMLElement` panel's referencing<ko>패널이 참조하는 `HTMLElement`</ko>|
|options.index|number|yes||An initial index of the panel<ko>패널의 초기 인덱스</ko>|
|options.align|[Constants.ALIGN](Constants.ALIGN) \| string \| number|yes||An initial [align](Flicking#align) value of the panel<ko>패널의 초기 [align](Flicking#align)값</ko>|
|options.flicking|[Flicking](Flicking)|yes||A Flicking instance panel's referencing<ko>패널이 참조하는 [Flicking](Flicking) 인스턴스</ko>|


## Properties

### element {#element}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

`HTMLElement` that panel's referencing

**Type**: HTMLElement











### index {#index}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Index of the panel

**Type**: number











### position {#position}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Position of the panel, including [alignPosition](Panel#alignPosition)

**Type**: number











### size {#size}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Cached size of the panel element
This is equal to [element](Panel#element)'s `offsetWidth` if [horizontal](Flicking#horizontal) is `true`, and `offsetHeight` else

**Type**: number











### sizeIncludingMargin {#sizeIncludingMargin}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Panel's size including CSS `margin`
This value includes [element](Panel#element)'s margin left/right if [horizontal](Flicking#horizontal) is `true`, and margin top/bottom else

**Type**: number











### height {#height}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Height of the panel element

**Type**: number











### margin {#margin}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Cached CSS `margin` value of the panel element

**Type**: object











### alignPosition {#alignPosition}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Align position inside the panel where [Camera](Camera)'s [alignPosition](Camera#alignPosition) inside viewport should be located at

**Type**: number











### offset {#offset}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Panel's position offset which is changed after panel element's order changes if [circular](Flicking#circular) is enabled

**Type**: number
**Default**: 0










### removed {#removed}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

A value indicating whether the panel's [remove](Flicking#remove)d

**Type**: boolean











### range {#range}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Panel element's range of the bounding box

**Type**: object











### align {#align}
<div className="bulma-tags">




</div>

A value indicating where the [alignPosition](Panel#alignPosition) should be located at inside the panel element

**Type**: [Constants.ALIGN](Constants.ALIGN) \| string \| number











## Methods

### resize {#resize}
<div className="bulma-tags">




</div>

Update size of the panel



**Returns**: this










### contains {#contains}
<div className="bulma-tags">




</div>

Check whether the given element is inside of this panel's [element](Panel#element)



**Returns**: boolean
- A Boolean value indicating the element is inside of this panel {@link Panel#element element}<ko>패널의 {@link Panel#element element}내에 해당 엘리먼트 포함 여부</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|element|HTMLElement|no||The HTMLElement to check<ko>확인하고자 하는 HTMLElement</ko>|







### destroy {#destroy}
<div className="bulma-tags">




</div>

Reset internal state and set [removed](Panel#removed) to `true`



**Returns**: void










### includePosition {#includePosition}
<div className="bulma-tags">




</div>

Check whether the given position is inside of this panel's [range](Panel#range)



**Returns**: boolean
- A Boolean value indicating whether the given position is included in the panel range<ko>해당 좌표가 패널 영역 내에 속해있는지 여부</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|pos|number|no||A position to check<ko>확인하고자 하는 좌표</ko>|
|includeMargin|boolean|yes|false|Include [margin](margin) to the range<ko>패널 영역에 [margin](margin)값을 포함시킵니다</ko>|







### includeRange {#includeRange}
<div className="bulma-tags">




</div>

Check whether the given range is fully included in this panel's area



**Returns**: boolean
- A Boolean value indicating whether the given range is fully included in the panel range<ko>해당 범위가 패널 영역 내에 완전히 속해있는지 여부</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|min|number|no||Minimum value of the range to check<ko>확인하고자 하는 최소 범위</ko>|
|max|number|no||Maximum value of the range to check<ko>확인하고자 하는 최대 범위</ko>|
|includeMargin|boolean|yes|false|Include [margin](margin) to the range<ko>패널 영역에 [margin](margin)값을 포함시킵니다</ko>|







### focus {#focus}
<div className="bulma-tags">




</div>

Move [Camera](Camera) to this panel



**Returns**: Promise&lt;void&gt;
- A Promise which will be resolved after reaching the panel<ko>패널 도달시에 resolve되는 Promise</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|duration|number|yes||Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>|







### prev {#prev}
<div className="bulma-tags">




</div>

Get previous(`index - 1`) panel. When the previous panel does not exist, this will return `null` instead
If the [circular](Flicking#circularEnabled) is enabled, this will return the last panel if called from the first panel



**Returns**: [Panel](Panel) \| null
- The previous panel<ko>이전 패널</ko>









### next {#next}
<div className="bulma-tags">




</div>

Get next(`index + 1`) panel. When the next panel does not exist, this will return `null` instead
If the [circular](Flicking#circularEnabled) is enabled, this will return the first panel if called from the last panel



**Returns**: [Panel](Panel) \| null
- The previous panel<ko>다음 패널</ko>









### increaseIndex {#increaseIndex}
<div className="bulma-tags">




</div>

Increase panel's index by the given value



**Returns**: this


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|val|number|no||An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>|





<div className="notification is-warning mt-2">⚠️ This function is for <strong>internal</strong> use only.</div>

### decreaseIndex {#decreaseIndex}
<div className="bulma-tags">




</div>

Decrease panel's index by the given value



**Returns**: this


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|val|number|no||An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>|





<div className="notification is-warning mt-2">⚠️ This function is for <strong>internal</strong> use only.</div>

### increasePosition {#increasePosition}
<div className="bulma-tags">




</div>

Increase panel's position by the given value



**Returns**: this


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|val|number|no||An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>|





<div className="notification is-warning mt-2">⚠️ This function is for <strong>internal</strong> use only.</div>

### decreasePosition {#decreasePosition}
<div className="bulma-tags">




</div>

Decrease panel's position by the given value



**Returns**: this


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|val|number|no||An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>|





<div className="notification is-warning mt-2">⚠️ This function is for <strong>internal</strong> use only.</div>

### increaseOffset {#increaseOffset}
<div className="bulma-tags">




</div>

Increase panel's offset by the given value



**Returns**: this


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|val|number|no||An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>|





<div className="notification is-warning mt-2">⚠️ This function is for <strong>internal</strong> use only.</div>

### decreaseOffset {#decreaseOffset}
<div className="bulma-tags">




</div>

Decrease panel's offset by the given value



**Returns**: this


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|val|number|no||An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>|





<div className="notification is-warning mt-2">⚠️ This function is for <strong>internal</strong> use only.</div>

### resetOffset {#resetOffset}
<div className="bulma-tags">




</div>

Reset panel's offset to 0



**Returns**: this








<div className="notification is-warning mt-2">⚠️ This function is for <strong>internal</strong> use only.</div>



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```ts
class RawRenderer extends Renderer
```
A [Renderer](Renderer) that always renders all panel elements inside the camera element

<div className="container">
    <div className="row mb-2"><div className="col col--6"><strong>Properties</strong></div><div className="col col--6"><strong>Methods</strong></div></div>
    <div className="row"><div className="col col--6"><a href="#panels">panels</a><br/><a href="#panelCount">panelCount</a><br/><a href="#elementManipulator">elementManipulator</a><br/><a href="#align">align</a></div><div className="col col--6"><a href="#render">render</a><br/><a href="#init">init</a><br/><a href="#destroy">destroy</a><br/><a href="#getPanel">getPanel</a><br/><a href="#insert">insert</a><br/><a href="#remove">remove</a><br/><a href="#updatePanelSize">updatePanelSize</a></div></div>
  </div>



## Properties

### panels {#panels}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

Array of panels

**Type**: Array&lt;[Panel](Panel)&gt;






**See**:
- [Panel](Panel)




### panelCount {#panelCount}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

Count of panels

**Type**: number











### elementManipulator {#elementManipulator}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>
<span className="bulma-tag is-danger">inherited</span>

</div>

An instance of the [OffsetManipulator](OffsetManipulator) that Renderer's using

**Type**: [OffsetManipulator](OffsetManipulator)











### align {#align}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

A [Panel](Panel)'s [align](Panel#align) value that applied to all panels

**Type**: [Constants.ALIGN](Constants.ALIGN) \| string \| number











## Methods

### render {#render}
<div className="bulma-tags">




</div>

Render panel elements inside the camera element



**Returns**: this










### init {#init}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Initialize Renderer



**Returns**: this


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|flicking|[Flicking](Flicking)|no||An instance of [Flicking](Flicking)<ko>Flicking의 인스턴스</ko>|







### destroy {#destroy}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Destroy Renderer and return to initial state



**Returns**: void










### getPanel {#getPanel}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Return the [Panel](Panel) at the given index. `null` if it doesn't exists.



**Returns**: [Panel](Panel) \| null
- Panel at the given index<ko>주어진 인덱스에 해당하는 패널</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|index|number|no|||


**See**:
- [Panel](Panel)




### insert {#insert}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Insert new panels at given index
This will increase index of panels after by the number of panels added



**Returns**: Array&lt;[Panel](Panel)&gt;
- An array of prepended panels<ko>추가된 패널들의 배열</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|index|number|no||Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>|
|element|Flicking.ElementLike \| Array&lt;Flicking.ElementLike&gt;|no||A new HTMLElement, a outerHTML of element, or an array of both
<ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>|







### remove {#remove}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Remove the panel at the given index
This will decrease index of panels after by the number of panels removed



**Returns**: [Panel](Panel)[]
- An array of removed panels<ko>제거된 패널들의 배열</ko>

|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|index|number|no||Index of panel to remove<ko>제거할 패널의 인덱스</ko>|
|deleteCount|number|yes|1|Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>|







### updatePanelSize {#updatePanelSize}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Update all panel sizes



**Returns**: this












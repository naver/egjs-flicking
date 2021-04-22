import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



```ts
class ElementManipulator extends OffsetManipulator
```
A component that manages element add/remove and element's order change

<div className="container">
    <div className="row mb-2"><div className="col col--6"><strong>Methods</strong></div><div className="col col--6"><strong>Events</strong></div></div>
    <div className="row"><div className="col col--6"><a href="#init">init</a><br/><a href="#destroy">destroy</a><br/><a href="#insertPanelElements">insertPanelElements</a><br/><a href="#movePanelElementsToStart">movePanelElementsToStart</a><br/><a href="#movePanelElementsToEnd">movePanelElementsToEnd</a><br/><a href="#resetPanelElementOrder">resetPanelElementOrder</a><br/><a href="#removePanelElements">removePanelElements</a><br/><a href="#removeAllChildNodes">removeAllChildNodes</a><br/><a href="#removeAllTextNodes">removeAllTextNodes</a></div><div className="col col--6"><a href="#event-orderChanged">orderChanged</a></div></div>
  </div>




## Methods

### init {#init}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Initialize OffsetManipulator





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













### insertPanelElements {#insertPanelElements}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Insert panel elements before nextSibling





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panels|Array&lt;[Panel](Panel)&gt;|no||An array of panels to add<ko>추가할 패널의 배열</ko>|
|nextSibling|[Panel](Panel) \| null|no|||








### movePanelElementsToStart {#movePanelElementsToStart}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Move panel element as the first child of the camera element





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panels|Array&lt;[Panel](Panel)&gt;|no||Panels to move<ko>위치를 변경할 패널들</ko>|
|togglePoints|Array&lt;[TogglePoint](TogglePoint)&gt;|no||An array of the positions that triggered element order change<ko>패널 순서를 변경시킨 좌표 정보들의 배열</ko>|








### movePanelElementsToEnd {#movePanelElementsToEnd}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Move panel element as the last child of the camera element





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panels|Array&lt;[Panel](Panel)&gt;|no||Panels to move<ko>위치를 변경할 패널들</ko>|
|togglePoints|Array&lt;[TogglePoint](TogglePoint)&gt;|no||An array of the positions that triggered element order change<ko>패널 순서를 변경시킨 좌표 정보들의 배열</ko>|








### resetPanelElementOrder {#resetPanelElementOrder}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Reset panel element order by the panel's index





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panels|Array&lt;[Panel](Panel)&gt;|no||Panels to move<ko>위치를 변경할 패널들</ko>|








### removePanelElements {#removePanelElements}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Remove panel elements





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panels|Array&lt;[Panel](Panel)&gt;|no||Panels to remove<ko>삭제할 패널들</ko>|








### removeAllChildNodes {#removeAllChildNodes}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Remove all child nodes inside the given element





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|element|HTMLElement|no||A HTMLElement to remove all child nodes<ko>Child node를 전부 삭제할 HTMLElement</ko>|








### removeAllTextNodes {#removeAllTextNodes}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Remove all text nodes inside the given element





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|element|HTMLElement|no||A HTMLElement to remove all text nodes<ko>Text node를 전부 삭제할 HTMLElement</ko>|








## Events
### orderChanged {#event-orderChanged}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Event that fires when order of the elements is changed

**Type**: void

















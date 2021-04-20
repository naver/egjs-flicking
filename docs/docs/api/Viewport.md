import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```ts
class Viewport 
```
A component that manages viewport size

<div className="container">
    <div className="row mb-2"><div className="col col--6"><strong>Properties</strong></div><div className="col col--6"><strong>Methods</strong></div></div>
    <div className="row"><div className="col col--6"><a href="#element">element</a><br/><a href="#width">width</a><br/><a href="#height">height</a></div><div className="col col--6"><a href="#setSize">setSize</a><br/><a href="#resize">resize</a></div></div>
  </div>

## Constructor
```ts
new Viewport(el)
```
|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|el|HTMLElement|no||A viewport element<ko>뷰포트 엘리먼트</ko>|


## Properties

### element {#element}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

A viewport(root) element

**Type**: HTMLElement











### width {#width}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Viewport width

**Type**: number











### height {#height}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Viewport height

**Type**: number











## Methods

### setSize {#setSize}
<div className="bulma-tags">




</div>

Change viewport's size.
This will change the actual size of `.flicking-viewport` element by changing its CSS width/height property





|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|size|object|yes||New viewport size<ko>새 뷰포트 크기</ko>|
|size.width|number \| string|yes||CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>|
|size.height|number \| string|yes||CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>|







### resize {#resize}
<div className="bulma-tags">




</div>

Update width/height to the current viewport element's size















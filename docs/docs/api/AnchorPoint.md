import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```ts
class AnchorPoint 
```
A data component that has actual position where the camera should be stopped at

<div className="container">
    <div className="row mb-2"><div className="col col--12"><strong>Properties</strong></div></div>
    <div className="row"><div className="col col--12"><a href="#index">index</a><br/><a href="#position">position</a><br/><a href="#panel">panel</a></div></div>
  </div>

## Constructor
```ts
new AnchorPoint(options, options.index, options.position, options.panel)
```
|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|options|object|no||An options object<ko>옵션 객체</ko>|
|options.index|number|yes||Index of AnchorPoint<ko>AnchorPoint의 인덱스</ko>|
|options.position|number|yes||Position of AnchorPoint<ko>AnchorPoint의 좌표</ko>|
|options.panel|[Panel](Panel)|yes||A [Panel](Panel) instance AnchorPoint is referencing to<ko>AnchorPoint가 참조하고 있는 [Panel](Panel)</ko>|


## Properties

### index {#index}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Index of AnchorPoint

**Type**: number











### position {#position}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Position of AnchorPoint

**Type**: number











### panel {#panel}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

A [Panel](Panel) instance AnchorPoint is referencing to

**Type**: [Panel](Panel)














import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```ts
class AnimatingState extends State
```
A state that activates when Flicking's animating by user input or method call

<div className="container">
    <div className="row mb-2"><div className="col col--6"><strong>Properties</strong></div><div className="col col--6"><strong>Methods</strong></div></div>
    <div className="row"><div className="col col--6"><a href="#holding">holding</a><br/><a href="#animating">animating</a></div><div className="col col--6"><a href="#onHold">onHold</a><br/><a href="#onChange">onChange</a><br/><a href="#onRelease">onRelease</a><br/><a href="#onAnimationEnd">onAnimationEnd</a><br/><a href="#onFinish">onFinish</a></div></div>
  </div>



## Properties

### holding {#holding}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Whether user is clicking or touching

**Type**: false











### animating {#animating}
<div className="bulma-tags">

<span className="bulma-tag is-info">readonly</span>


</div>

Whether Flicking's animating

**Type**: true











## Methods

### onHold {#onHold}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

An event handler for Axes's [hold](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-hold) event



**Returns**: void


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|ctx|object|yes||Event context<ko>이벤트 콘텍스트</ko>|
|ctx.flicking|[Flicking](Flicking)|yes||An instance of Flicking<ko>Flicking 인스턴스</ko>|
|ctx.axesEvent|object|yes||A [hold](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-hold) event of Axes
<ko>Axes의 [hold](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-hold) 이벤트</ko>|
|ctx.transitTo|function|yes||A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>|







### onChange {#onChange}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

An event handler for Axes's [change](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-change) event



**Returns**: void


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|ctx|object|yes||Event context<ko>이벤트 콘텍스트</ko>|
|ctx.flicking|[Flicking](Flicking)|yes||An instance of Flicking<ko>Flicking 인스턴스</ko>|
|ctx.axesEvent|object|yes||A [change](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-change) event of Axes
<ko>Axes의 [change](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-change) 이벤트</ko>|
|ctx.transitTo|function|yes||A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>|







### onRelease {#onRelease}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

An event handler for Axes's [release](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-release) event



**Returns**: void


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|ctx|object|yes||Event context<ko>이벤트 콘텍스트</ko>|
|ctx.flicking|[Flicking](Flicking)|yes||An instance of Flicking<ko>Flicking 인스턴스</ko>|
|ctx.axesEvent|object|yes||A [release](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-release) event of Axes
<ko>Axes의 [release](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-release) 이벤트</ko>|
|ctx.transitTo|function|yes||A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>|







### onAnimationEnd {#onAnimationEnd}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

An event handler for Axes's [animationEnd](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-animationEnd) event



**Returns**: void


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|ctx|object|yes||Event context<ko>이벤트 콘텍스트</ko>|
|ctx.flicking|[Flicking](Flicking)|yes||An instance of Flicking<ko>Flicking 인스턴스</ko>|
|ctx.axesEvent|object|yes||A [animationEnd](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-animationEnd) event of Axes
<ko>Axes의 [animationEnd](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-animationEnd) 이벤트</ko>|
|ctx.transitTo|function|yes||A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>|







### onFinish {#onFinish}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

An event handler for Axes's [finish](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-finish) event



**Returns**: void


|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|ctx|object|yes||Event context<ko>이벤트 콘텍스트</ko>|
|ctx.flicking|[Flicking](Flicking)|yes||An instance of Flicking<ko>Flicking 인스턴스</ko>|
|ctx.axesEvent|object|yes||A [finish](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-finish) event of Axes<ko>Axes의 [finish](https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event-finish) 이벤트</ko>|
|ctx.transitTo|function|yes||A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>|









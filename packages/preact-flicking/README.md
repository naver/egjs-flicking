# @egjs/preact-flicking [![npm version](https://badge.fury.io/js/%40egjs%2Fpreact-flicking.svg)](https://badge.fury.io/js/%40egjs%2Fpreact-flicking)


A Preact component that can easily use [@egjs/flicking](https://github.com/naver/egjs-flicking)

* [API documentation for **@egjs/flicking**](https://naver.github.io/egjs-flicking/release/latest/doc/)


## Install
```
$ npm install @egjs/preact-flicking --save
```

## How to use
```tsx
import { FlickingEvent, SelectEvent, ChangeEvent, NeedPanelEvent } from "@egjs/flicking";
import Flicking from "@egjs/preact-flicking";
import { Parallax, Fade, AutoPlay } from "@egjs/flicking-plugins";

<Flicking
  tag = "div"
  onNeedPanel = {(e: NeedPanelEvent) => {}}
  onMoveStart = {(e: FlickingEvent) => {}}
  onMove = {(e: FlickingEvent) => {}}
  onMoveEnd = {(e: FlickingEvent) => {}}
  onHoldStart = {(e: FlickingEvent) => {}}
  onHoldEnd = {(e: FlickingEvent) => {}}
  onRestore = {(e: FlickingEvent) => {}}
  onSelect = {(e: SelectEvent) => {}}
  onChange = {(e: ChangeEvent) => {}}
  classPrefix = "eg-flick"
  deceleration = {0.0075}
  horizontal = {true}
  circular = {false}
  infinite = {false}
  infiniteThreshold = {0}
  lastIndex = {Infinity}
  threshold = {40}
  duration = {100}
  panelEffect = {x => 1 - Math.pow(1 - x, 3)}
  defaultIndex = {0}
  inputType = {["touch", "mouse"]}
  thresholdAngle = {45}
  bounce = {10}
  autoResize = {false}
  adaptive = {false}
  zIndex = {2000}
  bound = {false}
  overflow = {false}
  hanger = {"50%"}
  anchor = {"50%"}
  gap = {0}
  moveType = {{type: "snap", count: 1}}
>
  <div>panel 0</div>
  <div>panel 1</div>
  <div>panel 2</div>
</Flicking>
```


## More examples
* [Infinite Flicking](https://github.com/naver/egjs-flicking/tree/master/packages/preact-flicking/src/demo/features/InfiniteFlicking.tsx)
* [Progress](https://github.com/naver/egjs-flicking/tree/master/packages/preact-flicking/src/demo/features/Progress.tsx)
* [Snap](https://github.com/naver/egjs-flicking/tree/master/packages/preact-flicking/src/demo/features/Snap.tsx)
* [Variable Size](https://github.com/naver/egjs-flicking/tree/master/packages/preact-flicking/src/demo/features/VariableSize.tsx)
* [Flexible Align](https://github.com/naver/egjs-flicking/tree/master/packages/preact-flicking/src/demo/features/Align.tsx)
* [Bound](https://github.com/naver/egjs-flicking/tree/master/packages/preact-flicking/src/demo/features/Bound.tsx)
* [Gap](https://github.com/naver/egjs-flicking/tree/master/packages/preact-flicking/src/demo/features/Gap.tsx)
* [Use Parallax Plugin](https://github.com/naver/egjs-flicking/tree/master/packages/preact-flicking/src/demo/plugins/Parallax.tsx)
* [Use Fade Plugin](https://github.com/naver/egjs-flicking/tree/master/packages/preact-flicking/src/demo/plugins/Fade.tsx)
* [Use AutoPlay Plugin](https://github.com/naver/egjs-flicking/tree/master/packages/preact-flicking/src/demo/plugins/AutoPlay.tsx)

## Development

### `npm start`

Runs the app in the development mode.<br>
Open **./demo/index.html** to view it in the browser.

If you fix it, it will build automatically. Then reload the page.

## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-flicking/issues) page on GitHub.


## License
react-infinitegrid is released under the [MIT license](https://github.com/naver/egjs-flicking/blob/master/LICENSE).


```
Copyright (c) 2015-present NAVER Corp.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

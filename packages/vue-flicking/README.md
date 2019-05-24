# @egjs/vue-flicking [![version](https://img.shields.io/npm/v/@egjs/vue-flicking.svg?style=flat)](https://www.npmjs.com/package/@egjs/vue-flicking)
> 🎠 A module used to implement flicking interactions. With this module, you can make flicking gestures, which are ways to navigate left and right to move between panels arranged side by side.

Vue wrapper of [@egjs/flicking](https://github.com/naver/egjs-flicking)

## Install
```sh
npm install --save @egjs/vue-flicking
```

## ❗Changes from @egjs/flicking
- All `camelCased` event names became **`kebab-case`**
  - e.g., `moveEnd` => **`move-end`**
- You can't use methods that manipulates DOM directly
  - e.g., `append()`, `remove()`, ...

## Quick Start
### Global registration
```js
import VueFlicking from "@egjs/vue-flicking";
Vue.use(VueFlicking);
```

### Local registration
```js
import { Flicking } from "@egjs/vue-flicking";

export default {
  components: {
    Flicking: Flicking,
  }
}
```

### Usage
```vue
<template>
  <flicking
    :options="{ gap: 10, moveType='freeScroll' }"
    :tag="'div'"
    :plugins="plugins"
    @need-panel="e => {
      // DO SOMETHING
    }"
    @move-end="e => {
      // DO SOMETHING
    }"
  >
    <div>CONTENTS OF PANEL 0</div>
    <div>CONTENTS OF PANEL 1</div>
    <div>CONTENTS OF PANEL 2</div>
  </flicking>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import { Fade, AutoPlay } from "@egjs/flicking-plugins";

@Component({})
export default class AutoPlayDemo extends Vue {
  plugins = [new Fade(), new AutoPlay(2000, "NEXT")];
}
</script>
```

### SSR(Server Side Rendering)
Check [GUIDE_SSR.md](./GUIDE_SSR.md)

## More Examples
See `demo/` for more implementation examples.

## Local development
### Project setup
```
npm install
```

### Compiles and hot-reloads demo
```sh
npm run start
# or
npm run demo
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Bug Report

If you find a bug, please report to us opening a new [Issues](https://github.com/naver/egjs-flicking/issues) on GitHub.

## License
egjs-flicking is released under the [MIT license](http://naver.github.io/egjs/license.txt).

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

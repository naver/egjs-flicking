<h1 align=center>
  <img src="https://dummyimage.com/1000x400/ffffff/000000&text=Flicking" alt="Flicking Image" /><br/>
  @egjs/vue-flicking
</h1>

<p align=center>
  <a href="https://www.npmjs.com/package/@egjs/vue-flicking" target="_blank">
    <img src="https://img.shields.io/npm/v/@egjs/vue-flicking.svg?style=flat-square&color=42b883&label=version&logo=NPM">
  </a>
  <a href="https://www.npmjs.com/package/@egjs/vue-flicking" target="_blank">
    <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@egjs/vue-flicking.svg?style=flat-square&label=%F0%9F%92%BE%20gzipped&color=007acc">
  </a>
  <a href="https://github.com/naver/egjs-flicking/graphs/commit-activity">
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/naver/egjs-flicking.svg?style=flat-square&label=%E2%AC%86%20commits&color=08CE5D">
  </a>
  <a href="https://www.npmjs.com/package/@egjs/vue-flicking" target="_blank">
    <img src="https://img.shields.io/npm/dm/@egjs/vue-flicking.svg?style=flat-square&label=%E2%AC%87%20downloads&color=08CE5D" alt="npm downloads per month">
  </a>
  <a href="https://github.com/naver/egjs-flicking/graphs/contributors" target="_blank">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/naver/egjs-flicking.svg?label=%F0%9F%91%A5%20contributors&style=flat-square&color=08CE5D"></a>
  <a href="https://github.com/naver/egjs-flicking/blob/master/LICENSE" target="_blank">
    <img alt="GitHub" src="https://img.shields.io/github/license/naver/egjs-flicking.svg?style=flat-square&label=%F0%9F%93%9C%20license&color=08CE5D">
  </a>
</p>

<p align=center>
  <img width="15" src="https://kr.vuejs.org/images/logo.png" alt="Vue.js" /> Vue wrapper of <a href="https://github.com/naver/egjs-flicking">@egjs/flicking</a>
</p>

<p align=center>
  <a href="https://naver.github.io/egjs-flicking/">Demo</a> / <a href="https://naver.github.io/egjs-flicking/release/latest/doc/index.html">Documentation</a> / <a href="https://naver.github.io/egjs/" />Other components</a>
</p>

## ⚙️ Installation
```sh
npm install --save @egjs/vue-flicking
```

## ❗ Changes from [@egjs/flicking](https://github.com/naver/egjs-flicking)
- All `camelCased` event names became **`kebab-case`**
  - e.g., `moveEnd` => **`move-end`**
- You can't use methods that manipulates DOM directly
  - e.g., `append()`, `remove()`, ...

## 🏃 Quick Start
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
      // ADD PANELS
    }"
    @move-end="e => {
      // HANDLE INDEX CHANGE
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
export default class DemoClass extends Vue {
  plugins = [new Fade(), new AutoPlay(2000, "NEXT")];
}
</script>
```

## 🔍 SSR(Server Side Rendering) Guide
Check [GUIDE_SSR.md](https://github.com/naver/egjs-flicking/blob/master/packages/vue-flicking/GUIDE_SSR.md)

## 📦 Packages
You can use all plugins just like native @egjs/flicking.

Check [**@egjs/flicking-plugins**](https://github.com/naver/egjs-flicking-plugins) for readymade effects we're providing.

## 📖 More Examples
See `demo/` for more implementation examples.

## 🙌 Contributing
See [CONTRIBUTING.md]((https://github.com/naver/egjs-flicking/blob/master/packages/vue-flicking/CONTRIBUTING.md))

## 📝 Feedback
Please file an [Issue](https://github.com/naver/egjs-flicking/issues) with label "Vue".

## 📜 License
@egjs/flicking is released under the [MIT license](http://naver.github.io/egjs/license.txt).

## Global Registration
### SSR
```js
if (process.browser) {
  const VueFlicking = require("@egjs/vue-flicking");
  Vue.use(VueFlicking);
}
```

### <img height="20" src="../../demo/images/nuxt.svg" alt="Nuxt" /> Nuxt.js
```js
// Suppose this file is /plugins/install
import Vue from "vue";
import VueFlicking from "@egjs/vue-flicking";

Vue.use(VueFlicking);
```

Then, in nuxt.config.js
```js
// ❗ CAUTION: No "ssr: false" or "mode: 'client'" is needed
plugins: ['~/plugins/install'],
build: {
  loaders: {
    vue: {
      compilerOptions: {
        // This option is highly recommended
        preserveWhitespace: false
      }
    }
  }
},
```

## 📖 More Examples for <img height="20" src="../../demo/images/nuxt.svg" alt="Nuxt" /> Nuxt.js
See our code sandbox [examples](https://codesandbox.io/s/egjsvue-flicking-nuxt-examples-p72nw).

## Local development
### Project setup
```
npm install
```

### Compiles and hot-reloads demo
```sh
npm run dev
```

### Lints and fixes files
```
npm run lint
```

We suppose you're using [nuxt.js](https://nuxtjs.org/)

## Global Registration
### SSR
```js
if (process.browser) {
  const VueFlicking = require("@egjs/vue-flicking");
  Vue.use(VueFlicking);
}
```

### Nuxt.js
```js
// Suppose this file is /plugins/install
import Vue from "vue";
import VueFlicking from "@egjs/vue-flicking";

Vue.use(VueFlicking);
```

Then, in nuxt.config.js
```js
// CAUTION: No "ssr: false" or "mode: 'client'" is needed
plugins: ['~/plugins/install'],
```

## More Examples
See `demo/ssr/` for more implementation examples.

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

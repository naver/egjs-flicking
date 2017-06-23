### Browser support
IE 10+ (possibly 9 also), latest of Chrome/FF/Safari, iOS 7+ and Android 2.3+ (except 3.x)

### Quick steps to use:


#### Set up your HTML

``` html
<!-- wrapper -->
<div id="wrapper">
  <!-- panels -->
  <div>
    <p>panel 0</p>
  </div>
  <div>
    <p>panel 1</p>
  </div>
  <div>
    <p>panel 2</p>
  </div>
</div>
```

#### Load files or import library


##### ES5
``` html
{% for dist in site.data.egjs.dist %}
<script src="//{{ site.data.egjs.github.user }}.github.io/{{ site.data.egjs.github.repo }}/{{ dist }}"></script>
{% endfor %}
```

##### ES6+
```js
import Flicking from "@egjs/flicking";
```

### Initialize

```javascript
// creating instance
new eg.Flicking("#wrapper");
```

### Horizontal direction

#### Non-Circular

{% include_relative assets/html/horizontal.html %}

```js
// creating instance
new eg.Flicking("#wrapper");
```


#### Circular

{% include_relative assets/html/horizontal_circular.html %}

```js
// creating instance
new eg.Flicking("#wrapper", {
  duration: 300,
  circular: true,
  defaultIndex: 1
});
```

#### Preview & circular

{% include_relative assets/html/horizontal_preview.html %}

```js
// creating instance
new eg.Flicking("#wrapper", {
  duration: 300,
  circular: true,
  previewPadding: [50, 50],
  defaultIndex: 3
});
```

### Vertical direction

#### Non-Circular

{% include_relative assets/html/vertical.html %}

```js
// creating instance
new eg.Flicking("#wrapper", {
  horizontal: false
});
```


#### Circular

{% include_relative assets/html/vertical_circular.html %}

```js
// creating instance
new eg.Flicking("#wrapper", {
  horizontal: false,
  circular: true,
  duration: 300,
  defaultIndex: 1,
});
```

#### Preview & circular

{% include_relative assets/html/vertical_preview.html %}

```js
// creating instance
new eg.Flicking("#wrapper", {
  horizontal: false,
  circular: true,
  previewPadding: [20, 10],
  duration: 300,
  defaultIndex: 3
});
```


### Custom events

{% include_relative assets/html/customevent.html %}

```js
new eg.Flicking("#wrapper", {
  duration: 300,
  circular: true,
  threshold: 70
}).on({
  beforeFlickStart: handler,
  flick: handler,
  flickEnd: handler,
  beforeRestore: handler,
  restore: handler
});

function handler(e) {
  document.getElementById("log").innerHTML = e.eventType +" event fired.";
}
```


### Infinite Flicking

{% include_relative assets/html/infinite.html %}


```js
var instance = new eg.Flicking("#wrapper", {
	duration : 200,
	hwAccelerable : true,
	threshold : 70,
	circular: true
}).on("flickEnd", function(e) {
	var direction = e.direction;
	if (direction === MC.DIRECTION_LEFT) {
		df.appendChild(this.getNextElement().firstChild);
		this.getNextElement().appendChild(df.firstChild);
	} else if(direction === MC.DIRECTION_RIGHT) {
		df.insertBefore(this.getPrevElement().firstChild, df.firstChild);
		this.getPrevElement().appendChild(df.lastChild);
	}
});

// Prepare 9999 panels data
var df = document.createDocumentFragment();
for(var i = 0; i <9999; i++) {
	df.appendChild($("<p>panel "+ i +"</p>")[0]);
}

// Show initial panel data
instance.getElement().appendChild(df.firstChild);
instance.getPrevElement().appendChild(df.lastChild);
instance.getNextElement().appendChild(df.firstChild);
```

### Plugins

#### OpacityEffect

{% include_relative assets/html/plugin-OpacityEffect.html %}

```js
var instance = new eg.Flicking("#wrapper", {
	circular: true,
	prefix: "plugin"
}).plugin([
    new eg.Flicking.plugin.OpacityEffect(".text")
]);
```

#### ParallaxEffect

{% include_relative assets/html/plugin-ParallaxEffect.html %}

```js
var instance = new eg.Flicking("#wrapper", {
	circular: true,
	prefix: "plugin"
}).plugin([
    new eg.Flicking.plugin.ParallaxEffect("p")
]);
```

#### Combined plugins

{% include_relative assets/html/plugin-all.html %}

```js
var instance = new eg.Flicking("#wrapper", {
	circular: true,
    prefix: "plugin"
}).plugin([
    new eg.Flicking.plugin.OpacityEffect(".text"),
    new eg.Flicking.plugin.ParallaxEffect("p")
]);
```
var parallaxEffect = new eg.Flicking("#ParallaxEffect", {
	circular: true,
	prefix: "plugin"
}).plugin([
	new eg.Flicking.plugin.ParallaxEffect("p")
]);

var plugin = new eg.Flicking("#plugin", {
	circular: true,
	prefix: "plugin"
}).plugin([
	new eg.Flicking.plugin.OpacityEffect(".text"),
	new eg.Flicking.plugin.ParallaxEffect("p")
]);

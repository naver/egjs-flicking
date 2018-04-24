var opacityEffect = new eg.Flicking("#OpacityEffect", {
	circular: true,
	prefix: "plugin"
}).plugin([
	new eg.Flicking.plugin.OpacityEffect(".text")
]);

const flicking = new Flicking("#flicking");

const plugin = new Flicking.Plugins.AutoPlay({ duration: 2000 });
flicking.addPlugins(plugin);

new Array(6).fill(0).map((_, idx) => {
  document.querySelector(`#btn-${idx}`).addEventListener("click", () => {
    flicking.moveTo(idx);
  });
});

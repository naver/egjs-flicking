import Flicking from "@dev/flicking";
import { Arrow, AutoPlay, Pagination } from "@dev/plugins";

const panelStyle =
  "min-width: 200px; height: 160px; margin: 0 5px; background: #e0e7ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;";

export function createApp(container) {
  container.innerHTML = `
    <h1>Plugins Basic Sample</h1>

    <h3>Arrow</h3>
    <div id="arrow" class="flicking-viewport" style="max-width: 600px;">
      <div class="flicking-camera">
        <div style="${panelStyle}">1</div>
        <div style="${panelStyle}">2</div>
        <div style="${panelStyle}">3</div>
        <div style="${panelStyle}">4</div>
        <div style="${panelStyle}">5</div>
      </div>
      <span class="flicking-arrow-prev"></span>
      <span class="flicking-arrow-next"></span>
    </div>

    <h3 style="margin-top: 32px;">AutoPlay + Pagination</h3>
    <div id="autoplay" class="flicking-viewport" style="max-width: 600px;">
      <div class="flicking-camera">
        <div style="${panelStyle}">1</div>
        <div style="${panelStyle}">2</div>
        <div style="${panelStyle}">3</div>
        <div style="${panelStyle}">4</div>
        <div style="${panelStyle}">5</div>
      </div>
      <div class="flicking-pagination"></div>
    </div>
  `;

  const arrowFlicking = new Flicking("#arrow", { circular: true });
  arrowFlicking.addPlugins(new Arrow());

  const autoplayFlicking = new Flicking("#autoplay", { circular: true });
  autoplayFlicking.addPlugins(new AutoPlay(), new Pagination({ type: "bullet" }));
}

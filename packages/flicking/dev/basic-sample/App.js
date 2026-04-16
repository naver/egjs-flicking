import Flicking from "@dev/flicking";

export function createApp(container) {
  container.innerHTML = `
    <h1>Basic Sample</h1>
    <div id="flicking" class="flicking-viewport" style="max-width: 600px;">
      <div class="flicking-camera">
        <div class="panel" style="min-width: 200px; height: 200px; margin: 0 5px; background: #e0e7ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">1</div>
        <div class="panel" style="min-width: 200px; height: 200px; margin: 0 5px; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">2</div>
        <div class="panel" style="min-width: 200px; height: 200px; margin: 0 5px; background: #e0e7ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">3</div>
        <div class="panel" style="min-width: 200px; height: 200px; margin: 0 5px; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">4</div>
        <div class="panel" style="min-width: 200px; height: 200px; margin: 0 5px; background: #e0e7ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">5</div>
      </div>
    </div>
    <div style="margin-top: 12px;">
      <button id="btn-prev">Prev</button>
      <button id="btn-next">Next</button>
    </div>
  `;

  const flicking = new Flicking("#flicking", {
    align: "prev",
    circular: true
  });

  document.getElementById("btn-prev").addEventListener("click", () => flicking.prev());
  document.getElementById("btn-next").addEventListener("click", () => flicking.next());
}

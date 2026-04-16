/**
 * 이슈 재현 템플릿
 *
 * 이 파일을 덮어써서 이슈를 재현하세요.
 */
import Flicking from "@dev/flicking";

export function createApp(container) {
  container.innerHTML = `
    <h2>Scratch</h2>
    <div id="flicking" class="flicking-viewport" style="max-width: 600px;">
      <div class="flicking-camera">
        <div style="min-width: 200px; height: 200px; margin: 0 5px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">1</div>
        <div style="min-width: 200px; height: 200px; margin: 0 5px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">2</div>
        <div style="min-width: 200px; height: 200px; margin: 0 5px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">3</div>
      </div>
    </div>
  `;

  new Flicking("#flicking", {
    align: "prev",
    circular: true
  });
}

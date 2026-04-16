import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("plugins/fade");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "plugins", "Fade");
      await waitForFlickingReady(page);
    });

    test("3개 패널 렌더링", async ({ page }) => {
      const panels = page.locator(".flicking-panel");
      await expect(panels).toHaveCount(3);
    });

    test("드래그 후 이전 패널의 opacity가 감소", async ({ page }) => {
      // 드래그로 다음 패널로 이동
      await dragLeft(page);

      // 이동 후 첫 번째 패널(이제 비활성)의 opacity 확인
      const opacity = await page
        .locator(".flicking-panel")
        .first()
        .evaluate(el => Number(getComputedStyle(el).opacity));
      // Fade 플러그인이 비활성 패널의 opacity를 줄임
      expect(opacity).toBeLessThan(1);
    });
  });
}

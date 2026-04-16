import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("plugins/autoplay");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "plugins", "Autoplay");
      await waitForFlickingReady(page);
    });

    test("4개 패널 렌더링", async ({ page }) => {
      const panels = page.locator(".flicking-panel");
      await expect(panels).toHaveCount(4);
    });

    test("2초 후 자동으로 다음 패널로 이동", async ({ page }) => {
      const before = await getFlickingState(page);
      expect(before.currentIndex).toBe(0);

      // AutoPlay duration: 2000ms + animation time
      await page.waitForTimeout(3000);

      const after = await getFlickingState(page);
      expect(after.currentIndex).toBeGreaterThan(0);
    });
  });
}

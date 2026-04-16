import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("plugins/parallax");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "plugins", "Parallax");
      await waitForFlickingReady(page);
    });

    test("5개 패널 및 bar 요소 렌더링", async ({ page }) => {
      const panels = page.locator(".skeleton-panel");
      await expect(panels).toHaveCount(5);

      const bars = page.locator(".skeleton-bar");
      await expect(bars).toHaveCount(25); // 5 bars × 5 panels
    });

    test("드래그 시 bar의 transform 변화", async ({ page }) => {
      const transformBefore = await page
        .locator(".bar-0")
        .first()
        .evaluate(el => el.style.transform);

      await dragLeft(page);

      const transformAfter = await page
        .locator(".bar-0")
        .first()
        .evaluate(el => el.style.transform);

      expect(transformAfter).not.toBe(transformBefore);
    });
  });
}

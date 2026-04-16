import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("plugins/perspective");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "plugins", "Perspective");
      await waitForFlickingReady(page);
    });

    test("5개 패널 렌더링", async ({ page }) => {
      const panels = page.locator(".flicking-panel");
      await expect(panels).toHaveCount(5);
    });

    test("패널에 3D transform 적용", async ({ page }) => {
      const transform = await page
        .locator(".flicking-panel")
        .first()
        .evaluate(el => el.style.transform);
      expect(transform).toBeTruthy();
    });

    test("드래그 후 transform 변화", async ({ page }) => {
      const before = await page
        .locator(".flicking-panel")
        .first()
        .evaluate(el => el.style.transform);

      await dragLeft(page);

      const after = await page
        .locator(".flicking-panel")
        .first()
        .evaluate(el => el.style.transform);
      expect(after).not.toBe(before);
    });
  });
}

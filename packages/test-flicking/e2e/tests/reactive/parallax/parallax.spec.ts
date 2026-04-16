import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("reactive/parallax");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "reactive", "Parallax");
      await waitForFlickingReady(page);
    });

    test("5개 skeleton 패널 + 25개 bar 요소 렌더링", async ({ page }) => {
      const panels = page.locator(".skeleton-panel");
      await expect(panels).toHaveCount(5);

      const bars = page.locator(".skeleton-bar");
      await expect(bars).toHaveCount(25);
    });

    test("bar 요소에 translateX transform 적용", async ({ page }) => {
      const transform = await page
        .locator(".skeleton-bar")
        .first()
        .evaluate(el => el.style.transform);
      expect(transform).toBeTruthy();
      expect(transform).toContain("translateX");
    });

    test("드래그 후 bar transform 값 변화", async ({ page }) => {
      const transformBefore = await page
        .locator(".skeleton-bar")
        .first()
        .evaluate(el => el.style.transform);

      await dragLeft(page);

      const transformAfter = await page
        .locator(".skeleton-bar")
        .first()
        .evaluate(el => el.style.transform);
      expect(transformAfter).not.toBe(transformBefore);
    });
  });
}

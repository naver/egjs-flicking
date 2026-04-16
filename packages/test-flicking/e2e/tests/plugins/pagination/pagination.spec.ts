import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("plugins/pagination");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "plugins", "Pagination");
      await waitForFlickingReady(page);
    });

    test("5개 패널 렌더링", async ({ page }) => {
      const panels = page.locator(".flicking-panel");
      await expect(panels).toHaveCount(5);
    });

    test("pagination bullet 렌더링", async ({ page }) => {
      const bullets = page.locator(".flicking-pagination-bullet");
      await expect(bullets).toHaveCount(5);
    });

    test("bullet 클릭으로 패널 이동", async ({ page }) => {
      // 3번째 bullet 클릭 (index 2)
      const bullet = page.locator(".flicking-pagination-bullet").nth(2);
      await bullet.click();
      await waitForAnimationEnd(page);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(2);
    });
  });
}

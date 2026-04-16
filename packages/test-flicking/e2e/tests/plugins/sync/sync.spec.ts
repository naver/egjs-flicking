import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("plugins/sync");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "plugins", "Sync");
      await waitForFlickingReady(page);
    });

    test("메인 + 썸네일 2개 인스턴스 렌더링", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(2);
    });

    test("메인에 6개 패널, 썸네일에 6개 패널", async ({ page }) => {
      const mainPanels = page.locator(".main-panel");
      await expect(mainPanels).toHaveCount(6);

      const thumbPanels = page.locator(".thumb-panel");
      await expect(thumbPanels).toHaveCount(6);
    });

    test("초기 상태에서 첫 번째 썸네일이 active", async ({ page }) => {
      const activeThumb = page.locator(".thumb-panel.active");
      await expect(activeThumb).toHaveCount(1);

      const firstThumb = page.locator(".thumb-panel").first();
      await expect(firstThumb).toHaveClass(/active/);
    });

    test("메인 드래그 시 썸네일 active 변경", async ({ page }) => {
      await dragLeft(page, { nth: 0, instanceIndex: 0 });

      const mainState = await getFlickingState(page, 0);
      expect(mainState.currentIndex).toBeGreaterThan(0);

      // 해당 인덱스의 썸네일이 active
      const activeThumb = page.locator(".thumb-panel.active");
      await expect(activeThumb).toHaveCount(1);
    });
  });
}

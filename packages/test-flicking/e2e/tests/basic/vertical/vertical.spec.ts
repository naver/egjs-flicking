import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/vertical");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Vertical");
      await waitForFlickingReady(page);
    });

    test("2개 인스턴스 렌더링 및 horizontal 옵션 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(2);

      const horizontals = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.horizontal);
      });
      expect(horizontals).toEqual([true, false]);
    });

    test("수직 인스턴스에서 수직 드래그로 패널 이동", async ({ page }) => {
      const viewport = page.locator(".flicking-viewport").nth(1);
      const box = await viewport.boundingBox();

      // 수직 드래그 (위로)
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await page.mouse.down();
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2 - 200, { steps: 10 });
      await page.mouse.up();
      await waitForAnimationEnd(page, 1);

      const state = await getFlickingState(page, 1);
      expect(state.currentIndex).toBeGreaterThan(0);
    });
  });
}

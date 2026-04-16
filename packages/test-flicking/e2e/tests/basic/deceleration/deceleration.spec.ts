import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/deceleration");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Deceleration");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 렌더링 및 deceleration 옵션 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(3);

      const decels = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.deceleration);
      });
      expect(decels).toEqual([0.001, 0.0075, 0.05]);
    });

    test("각 인스턴스에서 드래그로 패널 이동", async ({ page }) => {
      for (let i = 0; i < 3; i++) {
        await dragLeft(page, { nth: i, instanceIndex: i });
        const state = await getFlickingState(page, i);
        expect(state.currentIndex).toBeGreaterThan(0);
      }
    });
  });
}

import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/panels-per-view");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "PanelsPerView");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 렌더링 및 panelsPerView 옵션 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(3);

      const ppvs = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.panelsPerView);
      });
      expect(ppvs).toEqual([-1, 3, 1]);
    });

    test("panelsPerView:3에서 패널 너비가 뷰포트의 약 1/3", async ({ page }) => {
      const ratio = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[1]; // panelsPerView: 3
        const viewportWidth = flicking.element.offsetWidth;
        const panelWidth = flicking.panels[0].element.offsetWidth;
        return panelWidth / viewportWidth;
      });
      // 약 33%에 가까운지 확인 (마진 고려하여 넓은 범위)
      expect(ratio).toBeGreaterThan(0.25);
      expect(ratio).toBeLessThan(0.4);
    });
  });
}

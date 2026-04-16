import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/virtual-scroll");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "VirtualScroll");
      await waitForFlickingReady(page);
    });

    test("virtual 인스턴스의 DOM 요소 수가 전체보다 훨씬 적음", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      const virtualDomCount = await viewports.nth(0).locator(".flicking-panel").count();
      const normalDomCount = await viewports.nth(1).locator(".flicking-panel").count();

      // virtual: panelsPerView + 1 정도
      expect(virtualDomCount).toBeLessThan(20);
      // normal: 100개 전부 DOM
      expect(normalDomCount).toBe(100);
    });

    test("virtual 인스턴스의 전체 패널 수는 1000개", async ({ page }) => {
      const panelCount = await page.evaluate(() => {
        return (window as any).__flickingInstances[0].panelCount;
      });
      expect(panelCount).toBe(1000);
    });

    test("virtual 인스턴스에서 드래그 후에도 DOM 수 적게 유지", async ({ page }) => {
      await dragLeft(page, { nth: 0, instanceIndex: 0 });
      await page.waitForTimeout(200);

      const viewports = page.locator(".flicking-viewport");
      const virtualDomCount = await viewports.nth(0).locator(".flicking-panel").count();
      expect(virtualDomCount).toBeLessThan(20);
    });

    test("virtual 인스턴스에서 API 이동 후 DOM 수 적게 유지", async ({ page }) => {
      // 500번째 패널로 점프
      await page.evaluate(async () => {
        const flicking = (window as any).__flickingInstances[0];
        await flicking.moveTo(500, 0);
      });
      await page.waitForTimeout(200);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(500);

      const viewports = page.locator(".flicking-viewport");
      const virtualDomCount = await viewports.nth(0).locator(".flicking-panel").count();
      expect(virtualDomCount).toBeLessThan(20);
    });

    test("옵션 확인 (align:prev, panelsPerView:3)", async ({ page }) => {
      const options = await page.evaluate(() => {
        const f = (window as any).__flickingInstances[0];
        return { align: f.align, panelsPerView: f.panelsPerView };
      });
      expect(options.align).toBe("prev");
      expect(options.panelsPerView).toBe(3);
    });
  });
}

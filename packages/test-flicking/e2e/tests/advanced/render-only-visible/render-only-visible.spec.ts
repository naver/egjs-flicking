import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/render-only-visible");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "RenderOnlyVisible");
      await waitForFlickingReady(page);
    });

    test("renderOnlyVisible 옵션 확인 (true/false)", async ({ page }) => {
      const options = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.renderOnlyVisible);
      });
      expect(options).toEqual([true, false]);
    });

    test("renderOnlyVisible:true는 DOM 패널이 전체보다 적음", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      const visibleViewport = viewports.nth(0);
      const normalViewport = viewports.nth(1);

      const visibleDomCount = await visibleViewport.locator(".flicking-panel").count();
      const normalDomCount = await normalViewport.locator(".flicking-panel").count();

      // renderOnlyVisible:true는 보이는 패널만 DOM에 존재
      expect(visibleDomCount).toBeLessThan(normalDomCount);
      // normal은 20개 전부 DOM에 있음
      expect(normalDomCount).toBe(20);
    });

    test("DOM 카운터가 올바른 수를 표시", async ({ page }) => {
      const domCounters = page.locator(".dom-counter strong");
      const visibleCount = parseInt((await domCounters.nth(0).textContent()) || "0", 10);
      const normalCount = parseInt((await domCounters.nth(1).textContent()) || "0", 10);

      expect(visibleCount).toBeLessThan(normalCount);
      expect(normalCount).toBe(20);
    });

    test("드래그 후에도 renderOnlyVisible 인스턴스의 DOM 수가 적게 유지", async ({ page }) => {
      await dragLeft(page, { nth: 0, instanceIndex: 0 });
      await page.waitForTimeout(200);

      const viewports = page.locator(".flicking-viewport");
      const visibleDomCount = await viewports.nth(0).locator(".flicking-panel").count();
      // 드래그 후에도 여전히 전체(20)보다 적음
      expect(visibleDomCount).toBeLessThan(20);
    });
  });
}

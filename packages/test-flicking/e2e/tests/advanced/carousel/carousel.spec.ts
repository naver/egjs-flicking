import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/carousel");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "Carousel");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 × 8개 패널 렌더링", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(3);

      for (let i = 0; i < 3; i++) {
        const state = await getFlickingState(page, i);
        expect(state.panelCount).toBe(8);
      }
    });

    test("옵션 값 확인 (circular, panelsPerView, align, bound)", async ({ page }) => {
      const options = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => ({
          circular: f.circular,
          panelsPerView: f.panelsPerView,
          align: f.align,
          bound: f.bound
        }));
      });
      expect(options[0]).toEqual({ circular: true, panelsPerView: 3, align: "prev", bound: false });
      expect(options[1]).toEqual({ circular: true, panelsPerView: 1, align: "center", bound: false });
      expect(options[2]).toEqual({ circular: false, panelsPerView: 3, align: "prev", bound: true });
    });

    test("circular 인스턴스에서 드래그 이동", async ({ page }) => {
      await dragLeft(page, { nth: 0, instanceIndex: 0 });
      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBeGreaterThan(0);
    });

    test("circular 인스턴스 - 마지막에서 첫 패널로 순환", async ({ page }) => {
      const result = await page.evaluate(async () => {
        const flicking = (window as any).__flickingInstances[0];
        await flicking.moveTo(7, 0); // 마지막 패널
        const atLast = flicking.index;
        await flicking.moveTo(0, 300, 1); // 순환
        return { atLast, afterWrap: flicking.index };
      });
      expect(result.atLast).toBe(7);
      expect(result.afterWrap).toBe(0);
    });

    test("bound 인스턴스에서 드래그 이동", async ({ page }) => {
      await dragLeft(page, { nth: 2, instanceIndex: 2 });
      const state = await getFlickingState(page, 2);
      expect(state.currentIndex).toBeGreaterThan(0);
    });
  });
}

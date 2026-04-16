import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/easing");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Easing");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 렌더링 및 easing 함수 설정 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(3);

      const easingResults = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => ({
          hasEasing: typeof f.easing === "function",
          midValue: f.easing(0.5)
        }));
      });
      for (const r of easingResults) {
        expect(r.hasEasing).toBe(true);
      }
      // linear: 0.5, easeOutCubic: 0.875, easeInOutQuad: 0.5
      expect(easingResults[0].midValue).toBeCloseTo(0.5, 2);
      expect(easingResults[1].midValue).toBeGreaterThan(0.5);
    });

    test("각 인스턴스에서 드래그로 패널 이동", async ({ page }) => {
      // 모든 easing 인스턴스에서 드래그가 정상 동작하는지 확인
      for (let i = 0; i < 3; i++) {
        await dragLeft(page, { nth: i, instanceIndex: i });
        const state = await getFlickingState(page, i);
        expect(state.currentIndex).toBeGreaterThan(0);
      }
    });
  });
}

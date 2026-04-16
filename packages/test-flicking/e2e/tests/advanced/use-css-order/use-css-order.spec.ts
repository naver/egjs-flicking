import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/use-css-order");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "UseCSSOrder");
      await waitForFlickingReady(page);
    });

    test("useCSSOrder 옵션 확인 (false/true)", async ({ page }) => {
      const options = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => ({
          circular: f.circular,
          align: f.align,
          useCSSOrder: f.useCSSOrder
        }));
      });
      expect(options[0]).toEqual({ circular: true, align: "center", useCSSOrder: false });
      expect(options[1]).toEqual({ circular: true, align: "center", useCSSOrder: true });
    });

    test("Next 버튼으로 패널 이동", async ({ page }) => {
      const nextBtn = page.locator(".controls button", { hasText: "Next" }).first();
      await nextBtn.click();
      await waitForAnimationEnd(page, 0);

      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBe(1);
    });

    test("Prev 버튼으로 circular 역방향 이동", async ({ page }) => {
      // circular이므로 첫 패널에서 Prev → 마지막 패널로 이동
      const prevBtn = page.locator(".controls button", { hasText: "Prev" }).first();
      await prevBtn.click();
      await waitForAnimationEnd(page, 0);

      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBe(state.panelCount - 1);
    });

    test("useCSSOrder:true 인스턴스에서 Next 이동 시 CSS order 속성 변경", async ({ page }) => {
      // useCSSOrder:true 인스턴스(index 1)의 Next 버튼 클릭
      const nextBtn = page.locator(".controls button", { hasText: "Next" }).nth(1);
      await nextBtn.click();
      await waitForAnimationEnd(page, 1);

      // useCSSOrder:true일 때 패널에 CSS order 속성이 적용됨
      const hasOrder = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[1];
        const panels = flicking.panels;
        return panels.some((p: any) => p.element.style.order !== "");
      });
      expect(hasOrder).toBe(true);
    });
  });
}

import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/bound");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Bound");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 렌더링 및 bound 옵션 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(3);

      const bounds = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.bound);
      });
      expect(bounds).toEqual([false, true, true]);
    });

    test("bound:true 인스턴스에서 드래그 동작", async ({ page }) => {
      // bound:true 인스턴스(index 1)에서 드래그
      await dragLeft(page, { nth: 1, instanceIndex: 1 });
      const state = await getFlickingState(page, 1);
      expect(state.currentIndex).toBeGreaterThan(0);
    });

    test("bounce 옵션 설정 확인", async ({ page }) => {
      // 세 번째 인스턴스: bound:true + bounce:"50%"
      const bounce = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[2];
        return flicking.bounce;
      });
      expect(bounce).toBeTruthy();
    });
  });
}

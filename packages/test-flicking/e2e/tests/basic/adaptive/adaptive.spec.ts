import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/adaptive");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Adaptive");
      await waitForFlickingReady(page);
    });

    test("2개 인스턴스 렌더링 및 adaptive 옵션 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(2);

      const adaptives = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.adaptive);
      });
      expect(adaptives).toEqual([false, true]);
    });

    test("adaptive:true에서 패널 이동 시 뷰포트 높이 변화", async ({ page }) => {
      // adaptive:true 인스턴스(index 1)의 초기 높이
      const heightBefore = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[1];
        return flicking.element.offsetHeight;
      });

      // API로 다른 높이의 패널(index 3: 200px)로 확실히 이동
      await page.evaluate(async () => {
        const flicking = (window as any).__flickingInstances[1];
        await flicking.moveTo(3, 300);
      });
      await waitForAnimationEnd(page, 1);
      // adaptive 높이 변경이 DOM에 반영되기까지 대기
      await page.waitForTimeout(200);

      const heightAfter = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[1];
        return flicking.element.offsetHeight;
      });

      expect(heightAfter).not.toBe(heightBefore);
    });
  });
}

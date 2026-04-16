import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/auto-resize");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "AutoResize");
      await waitForFlickingReady(page);
    });

    test("2개 viewport + 슬라이더 렌더링", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(2);

      const slider = page.locator("input[type='range']");
      const count = await slider.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test("useResizeObserver 옵션 확인", async ({ page }) => {
      const options = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => ({
          autoResize: f.autoResize,
          useResizeObserver: f.useResizeObserver
        }));
      });
      expect(options[0].useResizeObserver).toBe(true);
      expect(options[1].useResizeObserver).toBe(false);
    });

    test("슬라이더로 너비 변경 시 Flicking 크기 반영", async ({ page }) => {
      // 초기 뷰포트 너비
      const widthBefore = await page.evaluate(() => {
        return (window as any).__flickingInstances[0].element.offsetWidth;
      });

      // 슬라이더를 50%로 변경
      const slider = page.locator("input[type='range']");
      await slider.fill("50");
      await slider.dispatchEvent("input");
      await page.waitForTimeout(500);

      // autoResize:true (ResizeObserver) 인스턴스의 너비 변경 확인
      const widthAfter = await page.evaluate(() => {
        return (window as any).__flickingInstances[0].element.offsetWidth;
      });
      expect(widthAfter).toBeLessThan(widthBefore);
    });
  });
}

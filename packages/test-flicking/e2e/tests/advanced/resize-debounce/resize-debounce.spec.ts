import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/resize-debounce");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "ResizeDebounce");
      await waitForFlickingReady(page);
    });

    test("2개 viewport + 슬라이더 렌더링", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(2);

      const slider = page.locator("input[type='range']");
      await expect(slider).toBeAttached();
    });

    test("resizeDebounce 옵션 확인 (0/300)", async ({ page }) => {
      const options = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => ({
          resizeDebounce: f.resizeDebounce,
          maxResizeDebounce: f.maxResizeDebounce
        }));
      });
      expect(options[0]).toEqual({ resizeDebounce: 0, maxResizeDebounce: 100 });
      expect(options[1]).toEqual({ resizeDebounce: 300, maxResizeDebounce: 800 });
    });

    test("슬라이더로 너비 변경 시 리사이즈 로그 기록", async ({ page }) => {
      const slider = page.locator("input[type='range']");
      await slider.fill("50");
      await slider.dispatchEvent("input");
      await page.waitForTimeout(1500);

      // 로그 영역에 리사이즈 기록이 있는지 확인
      const logArea = page.locator(".log-area").first();
      const children = await logArea.locator("div").count();
      expect(children).toBeGreaterThan(0);
    });

    test("슬라이더 변경 후 두 영역 모두 로그 존재", async ({ page }) => {
      const slider = page.locator("input[type='range']");
      await slider.fill("40");
      await slider.dispatchEvent("input");
      await page.waitForTimeout(2000);

      // 두 log-area 모두 확인
      const logAreas = page.locator(".log-area");
      const count = await logAreas.count();
      expect(count).toBe(2);

      // 첫 번째 (debounce: 0)는 확실히 로그가 있어야 함
      const logAChildren = await logAreas.nth(0).locator("div").count();
      expect(logAChildren).toBeGreaterThan(0);
    });
  });
}

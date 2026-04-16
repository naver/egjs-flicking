import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/lazy-load");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "LazyLoad");
      await waitForFlickingReady(page);
    });

    test("100개 패널 등록", async ({ page }) => {
      const state = await getFlickingState(page);
      expect(state.panelCount).toBe(100);
    });

    test("renderOnlyVisible:true 설정 확인", async ({ page }) => {
      const option = await page.evaluate(() => {
        return (window as any).__flickingInstances[0].renderOnlyVisible;
      });
      expect(option).toBe(true);
    });

    test("info-bar에 로드된 이미지 수 표시", async ({ page }) => {
      const infoBar = page.locator(".info-bar, .panel-info, [class*='info']");
      const text = await infoBar.first().textContent();
      // "Images loaded: X / 100" 형식
      expect(text).toMatch(/\d+\s*\/\s*100/);
    });

    test("드래그 후 추가 이미지 로드", async ({ page }) => {
      // 초기 로드 수
      const beforeText = await page.locator(".info-bar, .panel-info, [class*='info']").first().textContent();
      const beforeMatch = beforeText?.match(/(\d+)\s*\/\s*100/);
      const beforeCount = parseInt(beforeMatch?.[1] || "0", 10);

      // 여러 번 드래그하여 새 패널 보이게 함
      for (let i = 0; i < 3; i++) {
        await dragLeft(page);
      }
      await page.waitForTimeout(500);

      const afterText = await page.locator(".info-bar, .panel-info, [class*='info']").first().textContent();
      const afterMatch = afterText?.match(/(\d+)\s*\/\s*100/);
      const afterCount = parseInt(afterMatch?.[1] || "0", 10);

      expect(afterCount).toBeGreaterThan(beforeCount);
    });
  });
}

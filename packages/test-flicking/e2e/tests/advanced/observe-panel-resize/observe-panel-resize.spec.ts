import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/observe-panel-resize");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "ObservePanelResize");
      await waitForFlickingReady(page);
    });

    test("2개 viewport + Expand 버튼 렌더링", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(2);

      const expandBtn = page.locator("button", { hasText: /Expand/ });
      const count = await expandBtn.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test("observePanelResize 옵션 확인 (false/true)", async ({ page }) => {
      const options = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.observePanelResize);
      });
      expect(options).toEqual([false, true]);
    });

    test("Expand 클릭 시 버튼 텍스트가 Shrink로 변경", async ({ page }) => {
      const expandBtn = page.locator("button", { hasText: /Expand/ }).first();
      await expandBtn.click();
      await page.waitForTimeout(300);

      // 클릭한 버튼이 Shrink로 변경됨
      const shrinkBtn = page.locator("button", { hasText: /Shrink/ });
      const count = await shrinkBtn.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test("observePanelResize:true에서 패널 크기 변경 후 레이아웃 재계산", async ({ page }) => {
      // 두 번째 인스턴스(observePanelResize:true)의 첫 패널 너비 기록
      const widthBefore = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[1];
        return flicking.panels[0].size;
      });

      // 두 번째 인스턴스의 Expand 버튼 클릭
      const viewport2 = page.locator(".flicking-viewport").nth(1);
      const expandBtn = viewport2.locator("button", { hasText: /Expand/ }).first();
      await expandBtn.click();
      await page.waitForTimeout(500);

      // observePanelResize:true이므로 패널 크기가 업데이트됨
      const widthAfter = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[1];
        return flicking.panels[0].size;
      });
      expect(widthAfter).not.toBe(widthBefore);
    });
  });
}

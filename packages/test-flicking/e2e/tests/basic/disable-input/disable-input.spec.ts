import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/disable-input");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "DisableInput");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 렌더링", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(3);
    });

    test("disableOnInit:false 인스턴스에서 드래그 가능", async ({ page }) => {
      await dragLeft(page, { nth: 0, instanceIndex: 0 });
      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBeGreaterThan(0);
    });

    test("disableOnInit:true 인스턴스에서 드래그 불가", async ({ page }) => {
      await dragLeft(page, { nth: 1, instanceIndex: 1 });
      const state = await getFlickingState(page, 1);
      expect(state.currentIndex).toBe(0);
    });

    test("토글 버튼으로 입력 활성화/비활성화 전환", async ({ page }) => {
      // 세 번째 인스턴스는 토글 버튼이 있음
      // 초기 상태: 드래그 가능 (disableOnInit:false)
      await dragLeft(page, { nth: 2, instanceIndex: 2 });
      const before = await getFlickingState(page, 2);
      expect(before.currentIndex).toBeGreaterThan(0);

      // 토글 버튼 클릭하여 비활성화
      const toggleBtn = page.locator("button", { hasText: /disable|toggle/i });
      await toggleBtn.click();
      await page.waitForTimeout(200);

      // API로 원래 위치로 복귀
      await page.evaluate(async () => {
        const flicking = (window as any).__flickingInstances[2];
        await flicking.moveTo(0, 0);
      });

      // 비활성화 후 드래그 불가
      await dragLeft(page, { nth: 2, instanceIndex: 2 });
      const after = await getFlickingState(page, 2);
      expect(after.currentIndex).toBe(0);
    });
  });
}

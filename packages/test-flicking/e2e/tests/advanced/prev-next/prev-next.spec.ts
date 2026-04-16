import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/prev-next");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "PrevNext");
      await waitForFlickingReady(page);
    });

    test("초기 상태: Prev disabled, Next enabled", async ({ page }) => {
      const prevBtn = page.locator("button", { hasText: /Prev/ });
      const nextBtn = page.locator("button", { hasText: /Next/ });

      await expect(prevBtn).toBeDisabled();
      await expect(nextBtn).toBeEnabled();
    });

    test("Next 클릭으로 다음 패널 이동 + Prev 활성화", async ({ page }) => {
      const nextBtn = page.locator("button", { hasText: /Next/ });
      await nextBtn.click();
      await waitForAnimationEnd(page);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(1);

      // 이동 후 Prev 버튼 활성화됨
      const prevBtn = page.locator("button", { hasText: /Prev/ });
      await expect(prevBtn).toBeEnabled();
    });

    test("Prev 클릭으로 이전 패널 복귀", async ({ page }) => {
      const nextBtn = page.locator("button", { hasText: /Next/ });
      const prevBtn = page.locator("button", { hasText: /Prev/ });

      // 먼저 Next로 이동
      await nextBtn.click();
      await waitForAnimationEnd(page);

      // Prev로 복귀
      await prevBtn.click();
      await waitForAnimationEnd(page);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(0);
      await expect(prevBtn).toBeDisabled();
    });

    test("마지막 패널에서 Next disabled", async ({ page }) => {
      // API로 마지막 패널로 이동
      await page.evaluate(async () => {
        const flicking = (window as any).__flickingInstances[0];
        await flicking.moveTo(flicking.panelCount - 1, 0);
      });
      await page.waitForTimeout(200);

      const nextBtn = page.locator("button", { hasText: /Next/ });
      await expect(nextBtn).toBeDisabled();
    });

    test("nav-info에 현재 위치 표시", async ({ page }) => {
      // "1 / 5" 같은 형식의 정보 표시 확인
      const navInfo = page.locator(".nav-info");
      const text = await navInfo.textContent();
      expect(text).toMatch(/1\s*\/\s*5/);
    });
  });
}

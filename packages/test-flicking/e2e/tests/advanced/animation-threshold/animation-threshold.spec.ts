import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/animation-threshold");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "AnimationThreshold");
      await waitForFlickingReady(page);
    });

    test("2개 viewport + Prev/Next 버튼 렌더링", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(2);

      const nextButtons = page.locator("button", { hasText: "Next" });
      const count = await nextButtons.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test("animationThreshold 옵션 확인", async ({ page }) => {
      const thresholds = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.animationThreshold);
      });
      expect(thresholds[0]).toBe(0.5);
      expect(thresholds[1]).toBe(300);
    });

    test("Next 버튼 클릭으로 다음 패널 이동", async ({ page }) => {
      const nextBtn = page.locator("button", { hasText: "Next" }).first();
      await nextBtn.click();
      await waitForAnimationEnd(page, 0);

      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBe(1);
    });

    test("Next 클릭 시 이벤트 로그 기록", async ({ page }) => {
      const nextBtn = page.locator("button", { hasText: "Next" }).first();
      await nextBtn.click();
      await waitForAnimationEnd(page, 0);

      const eventLog = page.locator(".event-log").first();
      const text = await eventLog.textContent();
      // willChange 또는 moveEnd 이벤트가 로그에 기록됨
      expect(text?.length).toBeGreaterThan(0);
    });

    test("animationThreshold:300 - 짧은 드래그는 즉시 이동 (애니메이션 없음)", async ({ page }) => {
      // 두 번째 인스턴스(threshold:300)에서 짧은 드래그
      const viewport = page.locator(".flicking-viewport").nth(1);
      const box = await viewport.boundingBox();

      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await page.mouse.down();
      // 100px 이동 → threshold(300) 미만 → 애니메이션 없이 즉시 이동
      await page.mouse.move(box!.x + box!.width / 2 - 100, box!.y + box!.height / 2, { steps: 5 });
      await page.mouse.up();

      // 즉시 완료 (animating이 false)
      await page.waitForTimeout(100);
      const state = await getFlickingState(page, 1);
      expect(state.animating).toBe(false);
    });
  });
}

import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/duration");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Duration");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 렌더링 및 duration 옵션 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(3);

      const durations = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.duration);
      });
      expect(durations).toEqual([100, 500, 1500]);
    });

    test("duration:100(짧음)에서 드래그로 패널 이동", async ({ page }) => {
      await dragLeft(page, { nth: 0, instanceIndex: 0 });
      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBeGreaterThan(0);
      expect(state.animating).toBe(false);
    });

    test("duration:1500(긺)은 느리게 이동", async ({ page }) => {
      await dragLeft(page, { nth: 2, instanceIndex: 2, waitAnimation: false });

      // 200ms 시점에서 아직 애니메이션 중
      await page.waitForTimeout(200);
      const mid = await getFlickingState(page, 2);
      expect(mid.animating).toBe(true);

      // 최종 완료 대기
      await waitForAnimationEnd(page, 2);
      const final = await getFlickingState(page, 2);
      expect(final.currentIndex).toBeGreaterThan(0);
    });
  });
}

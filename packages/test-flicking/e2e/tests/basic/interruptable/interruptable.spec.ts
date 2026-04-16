import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { dragRight } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/interruptable");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Interruptable");
      await waitForFlickingReady(page);
    });

    test("2개 인스턴스 렌더링 및 interruptable 옵션 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(2);

      const options = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => ({
          interruptable: f.interruptable,
          duration: f.duration
        }));
      });
      expect(options[0].interruptable).toBe(true);
      expect(options[1].interruptable).toBe(false);
      expect(options[0].duration).toBe(2000);
    });

    test("Next 버튼 클릭 시 다음 패널로 이동", async ({ page }) => {
      const btn = page.locator("button").first();
      await btn.click();
      await waitForAnimationEnd(page, 0);

      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBe(1);
    });

    test("interruptable:true - 애니메이션 중 드래그로 중단 가능", async ({ page }) => {
      // Next 버튼으로 2초 애니메이션 시작
      const btn = page.locator("button").first();
      await btn.click();

      // 애니메이션 진행 중 확인
      await page.waitForTimeout(200);
      const animating = await page.evaluate(() => {
        return (window as any).__flickingInstances[0].animating;
      });
      expect(animating).toBe(true);

      // 드래그로 애니메이션 중단 (반대 방향으로)
      await dragRight(page, { nth: 0, instanceIndex: 0 });

      // 드래그가 개입하여 인덱스가 0으로 복귀할 수 있음
      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBe(0);
    });

    test("interruptable:false - 애니메이션 중 드래그 무시", async ({ page }) => {
      // 두 번째 인스턴스의 Next 버튼 클릭
      const buttons = page.locator("button");
      const secondBtn = buttons.nth(1);
      await secondBtn.click();

      // 애니메이션 진행 중에 드래그 시도
      await page.waitForTimeout(200);
      await dragRight(page, { nth: 1, instanceIndex: 1, waitAnimation: false });

      // 애니메이션이 끝날 때까지 대기
      await waitForAnimationEnd(page, 1);

      // interruptable:false이므로 드래그가 무시되고 Next 이동 완료
      const state = await getFlickingState(page, 1);
      expect(state.currentIndex).toBe(1);
    });
  });
}

import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/circular");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Circular");
      await waitForFlickingReady(page);
    });

    // focus: 두 개의 Flicking 인스턴스가 렌더링됨
    test("두 인스턴스 렌더링", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(2);
    });

    // focus: circular 인스턴스의 circular 모드 활성화 확인 + 드래그로 이동
    test("circular 인스턴스 - circularEnabled 및 드래그 이동", async ({ page }) => {
      const state = await page.evaluate(() => {
        const instances = (window as any).__flickingInstances;
        return {
          nonCircular: instances[0].circularEnabled,
          circular: instances[1].circularEnabled
        };
      });
      expect(state.nonCircular).toBe(false);
      expect(state.circular).toBe(true);

      // 드래그로 이동 (패널 60% 폭이라 2칸 이동할 수도 있음)
      await dragLeft(page, { nth: 1, instanceIndex: 1 });
      const afterDrag = await getFlickingState(page, 1);
      expect(afterDrag.currentIndex).toBeGreaterThan(0);
    });

    // focus: circular 인스턴스 - 마지막 패널에서 다음으로 이동하면 첫 패널로 순환
    test("circular 인스턴스 - 마지막에서 처음으로 순환 (API)", async ({ page }) => {
      // moveTo로 마지막 패널 이동 + 순환 이동
      const result = await page.evaluate(async () => {
        const flicking = (window as any).__flickingInstances[1];
        // 마지막 패널로 이동
        await flicking.moveTo(4, 0);
        const atLast = flicking.index;
        // DIRECTION.NEXT(1)으로 moveTo 호출하여 순환
        await flicking.moveTo(0, 300, 1);
        return { atLast, afterWrap: flicking.index };
      });
      expect(result.atLast).toBe(4);
      expect(result.afterWrap).toBe(0);
    });

    // focus: circular 인스턴스 - 첫 패널에서 역방향으로 마지막 패널 이동
    test("circular 인스턴스 - 처음에서 마지막으로 역순환 (API)", async ({ page }) => {
      const result = await page.evaluate(async () => {
        const flicking = (window as any).__flickingInstances[1];
        const atFirst = flicking.index;
        // DIRECTION.PREV(-1)으로 moveTo 호출하여 역순환
        await flicking.moveTo(4, 300, -1);
        return { atFirst, afterWrap: flicking.index };
      });
      expect(result.atFirst).toBe(0);
      expect(result.afterWrap).toBe(4);
    });
  });
}

import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft, dragRight } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/default");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Default");
      await waitForFlickingReady(page);
    });

    // focus: 5개 패널이 정상 렌더링됨
    test("5개 패널 렌더링", async ({ page }) => {
      const panels = page.locator(".flicking-panel");
      await expect(panels).toHaveCount(5);
    });

    // focus: 좌측 드래그로 다음 패널(index 1)로 이동
    test("좌측 드래그로 다음 패널 이동", async ({ page }) => {
      await dragLeft(page);
      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(1);
    });

    // focus: 우측 드래그로 이전 패널로 복귀
    test("우측 드래그로 이전 패널 복귀", async ({ page }) => {
      // 먼저 다음 패널로 이동
      await dragLeft(page);
      const afterDrag = await getFlickingState(page);
      expect(afterDrag.currentIndex).toBe(1);

      // 다시 이전으로 복귀
      await dragRight(page);
      const afterReturn = await getFlickingState(page);
      expect(afterReturn.currentIndex).toBe(0);
    });
  });
}

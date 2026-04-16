import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("reactive/coverflow");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "reactive", "Coverflow");
      await waitForFlickingReady(page);
    });

    // focus: 5개 패널 렌더링 + CSS transform 적용
    test("패널 렌더링 및 transform 적용", async ({ page }) => {
      const panels = page.locator(".flicking-panel");
      await expect(panels).toHaveCount(5);

      // 각 패널에 transform 스타일이 적용되어 있는지 확인
      const firstPanelTransform = await panels.first().evaluate(el => el.style.transform);
      expect(firstPanelTransform).toBeTruthy();
      expect(firstPanelTransform).toContain("rotateY");
    });

    // focus: 드래그 후 transform 값 변경
    test("드래그 후 transform 동적 변경", async ({ page }) => {
      const panels = page.locator(".flicking-panel");

      // 드래그 전 첫 패널의 transform 기록
      const beforeTransform = await panels.first().evaluate(el => el.style.transform);

      // 드래그로 패널 이동
      await dragLeft(page);

      // 드래그 후 transform이 변경되었는지 확인
      const afterTransform = await panels.first().evaluate(el => el.style.transform);

      expect(afterTransform).not.toBe(beforeTransform);
    });

    // focus: circular 옵션 설정 및 연속 탐색
    test("circular 모드 동작", async ({ page }) => {
      const state = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[0];
        return {
          circular: flicking.circular,
          align: flicking.align
        };
      });
      // 옵션이 올바르게 설정됨
      expect(state.circular).toBe(true);
      expect(state.align).toBe("center");

      // 드래그로 패널 이동 후 transform이 계속 업데이트됨
      const panelsBefore = await page
        .locator(".flicking-panel")
        .first()
        .evaluate(el => el.style.transform);
      await dragLeft(page);
      const panelsAfter = await page
        .locator(".flicking-panel")
        .first()
        .evaluate(el => el.style.transform);
      expect(panelsAfter).not.toBe(panelsBefore);
    });
  });
}

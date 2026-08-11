import { expect, type Page, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/use-percentage-pos");

/**
 * 활성 패널 중심과 뷰포트 중심의 거리(px)를 반환한다.
 * align: "center" 기준으로 정렬이 맞으면 0에 가깝다.
 */
const getActivePanelOffset = (page: Page, instanceIndex: number) => {
  return page.evaluate(idx => {
    const flicking = (window as any).__flickingInstances[idx];
    const viewportRect = flicking.element.getBoundingClientRect();
    const panelRect = flicking.currentPanel.element.getBoundingClientRect();

    return panelRect.left + panelRect.width / 2 - (viewportRect.left + viewportRect.width / 2);
  }, instanceIndex);
};

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "UsePercentagePos");
      await waitForFlickingReady(page);
    });

    test("2개 viewport + 컨트롤 렌더링", async ({ page }) => {
      await expect(page.locator(".flicking-viewport")).toHaveCount(2);
      await expect(page.getByRole("button", { name: "Toggle width" })).toBeAttached();
      await expect(page.getByRole("button", { name: "Call resize()" })).toBeAttached();
      await expect(page.locator(".transform-bar")).toHaveCount(2);
    });

    test("usePercentagePos 옵션 확인 (false/true)", async ({ page }) => {
      const options = await page.evaluate(() =>
        (window as any).__flickingInstances.map((f: any) => f.usePercentagePos)
      );
      expect(options).toEqual([false, true]);
    });

    test("false는 px 단위, true는 % 단위 transform 적용", async ({ page }) => {
      const transforms = await page.evaluate(() =>
        (window as any).__flickingInstances.map((f: any) => f.camera.element.style.transform)
      );
      expect(transforms[0]).toMatch(/translate\(-?[\d.]+px\)/);
      expect(transforms[1]).toMatch(/translate\(-?[\d.]+%\)/);
    });

    test("너비 축소 시 % 데모만 정렬 유지, resize() 후 px 데모 복구", async ({ page }) => {
      // 초기 상태: 둘 다 활성 패널이 중앙 정렬
      await expect.poll(async () => Math.abs(await getActivePanelOffset(page, 0))).toBeLessThan(2);
      await expect.poll(async () => Math.abs(await getActivePanelOffset(page, 1))).toBeLessThan(2);

      // 컨테이너 너비 100% → 60% (autoResize: false이므로 resize 미반영 상태)
      await page.getByRole("button", { name: "Toggle width" }).click();

      // px 데모는 어긋나고, % 데모는 정렬 유지
      await expect.poll(async () => Math.abs(await getActivePanelOffset(page, 0))).toBeGreaterThan(20);
      await expect.poll(async () => Math.abs(await getActivePanelOffset(page, 1))).toBeLessThan(2);

      // resize() 호출 후 둘 다 정렬 복구
      await page.getByRole("button", { name: "Call resize()" }).click();

      await expect.poll(async () => Math.abs(await getActivePanelOffset(page, 0))).toBeLessThan(2);
      await expect.poll(async () => Math.abs(await getActivePanelOffset(page, 1))).toBeLessThan(2);
    });
  });
}

import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/prevent-click");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "PreventClick");
      await waitForFlickingReady(page);
    });

    test("2개 인스턴스 렌더링 및 옵션 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(2);

      const options = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.preventClickOnDrag);
      });
      expect(options).toEqual([true, false]);
    });

    test("순수 클릭 시 두 인스턴스 모두 카운트 증가", async ({ page }) => {
      // 첫 번째 인스턴스의 패널 클릭
      const panel1 = page.locator(".flicking-viewport").first().locator(".flicking-panel").first();
      await panel1.click();
      await page.waitForTimeout(100);
      const count1 = page.locator(".click-count").first();
      await expect(count1).toContainText("1");

      // 두 번째 인스턴스의 패널 클릭
      const panel2 = page.locator(".flicking-viewport").nth(1).locator(".flicking-panel").first();
      await panel2.click();
      await page.waitForTimeout(100);
      const count2 = page.locator(".click-count").nth(1);
      await expect(count2).toContainText("1");
    });

    test("preventClickOnDrag:true - 드래그 후 클릭 이벤트 차단", async ({ page }) => {
      const viewport = page.locator(".flicking-viewport").first();
      const box = await viewport.boundingBox();

      // 드래그 후 마우스 업 (짧은 드래그로 패널 이동은 안 되지만 클릭은 방지됨)
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await page.mouse.down();
      await page.mouse.move(box!.x + box!.width / 2 - 100, box!.y + box!.height / 2, { steps: 5 });
      await page.mouse.up();
      await waitForAnimationEnd(page, 0);
      await page.waitForTimeout(100);

      // preventClickOnDrag:true이므로 드래그 후 클릭 카운트 0 유지
      const count1 = page.locator(".click-count").first();
      await expect(count1).toContainText("0");
    });

    test("preventClickOnDrag:false - 드래그 후에도 클릭 이벤트 발생", async ({ page }) => {
      const viewport = page.locator(".flicking-viewport").nth(1);
      const box = await viewport.boundingBox();

      // 드래그 동작 수행
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await page.mouse.down();
      await page.mouse.move(box!.x + box!.width / 2 - 100, box!.y + box!.height / 2, { steps: 5 });
      await page.mouse.up();
      await waitForAnimationEnd(page, 1);
      await page.waitForTimeout(100);

      // preventClickOnDrag:false이므로 드래그 후 클릭 이벤트 발생
      const count2 = page.locator(".click-count").nth(1);
      const text = await count2.textContent();
      const clickCount = parseInt(text?.match(/\d+/)?.[0] || "0", 10);
      expect(clickCount).toBeGreaterThan(0);
    });
  });
}

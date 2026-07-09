import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/cross-flicking");

// 모든 side Flicking(수직)까지 등록될 때까지 대기
async function waitForAllInstances(page: import("@playwright/test").Page, count: number) {
  await page.waitForFunction(expected => (window as any).__flickingInstances?.length >= expected, count, {
    timeout: 10000
  });
}

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "CrossFlicking");
      await waitForFlickingReady(page);
      await waitForAllInstances(page, 5);
    });

    test("CrossFlicking 메인(수평) + 수직 side 인스턴스 존재", async ({ page }) => {
      const result = await page.evaluate(() => {
        const instances = (window as any).__flickingInstances;
        const main = instances.find((f: any) => f.constructor?.name === "CrossFlicking");
        const verticals = instances.filter((f: any) => f.horizontal === false);
        return {
          hasMain: !!main,
          mainHorizontal: main?.horizontal,
          mainPanelCount: main?.panelCount,
          verticalCount: verticals.length,
          totalInstances: instances.length
        };
      });
      // 메인 CrossFlicking은 수평(카테고리 전환)이며 그룹 4개를 패널로 가진다
      expect(result.hasMain).toBe(true);
      expect(result.mainHorizontal).toBe(true);
      expect(result.mainPanelCount).toBe(4);
      // 각 그룹마다 수직 side Flicking이 생성된다
      expect(result.verticalCount).toBe(4);
      expect(result.totalInstances).toBe(5);
    });

    test("메인/side 옵션 확인 (align, bound)", async ({ page }) => {
      const options = await page.evaluate(() => {
        const instances = (window as any).__flickingInstances;
        const main = instances.find((f: any) => f.constructor?.name === "CrossFlicking");
        const side = instances.find((f: any) => f.horizontal === false);
        return {
          main: { align: main.align, bound: main.bound },
          side: { horizontal: side.horizontal, bound: side.bound }
        };
      });
      expect(options.main).toEqual({ align: "prev", bound: true });
      expect(options.side.horizontal).toBe(false);
      expect(options.side.bound).toBe(true);
    });

    test("수평 드래그로 카테고리(그룹) 전환", async ({ page }) => {
      const mainIndex = await page.evaluate(() => {
        const instances = (window as any).__flickingInstances;
        return instances.findIndex((f: any) => f.constructor?.name === "CrossFlicking");
      });

      await dragLeft(page, { nth: 0, instanceIndex: mainIndex });

      const afterIndex = await page.evaluate(idx => (window as any).__flickingInstances[idx].index, mainIndex);
      expect(afterIndex).toBeGreaterThan(0);
    });

    test("수직 side Flicking에서 API로 아이템 이동", async ({ page }) => {
      const result = await page.evaluate(async () => {
        const instances = (window as any).__flickingInstances;
        const sideIdx = instances.findIndex((f: any) => f.horizontal === false);
        const side = instances[sideIdx];
        const before = side.index;
        await side.moveTo(side.index + 1, 300);
        return { before, after: side.index };
      });
      expect(result.after).toBe(result.before + 1);
    });
  });
}

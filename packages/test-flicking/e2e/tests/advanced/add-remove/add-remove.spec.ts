import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/add-remove");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "AddRemove");
      await waitForFlickingReady(page);
    });

    // focus: 초기 5개 패널이 렌더링됨
    test("초기 패널 렌더링", async ({ page }) => {
      const state = await getFlickingState(page);
      expect(state.panelCount).toBe(5);
    });

    // focus: Append 버튼 클릭 시 패널 추가
    test("Append로 패널 추가", async ({ page }) => {
      const appendBtn = page.locator("button", { hasText: "Append" });
      await appendBtn.click();

      // 패널 추가 후 DOM 업데이트 대기
      await page.waitForTimeout(300);

      const state = await getFlickingState(page);
      expect(state.panelCount).toBe(6);
    });

    // focus: Prepend 버튼 클릭 시 패널이 앞에 추가됨
    test("Prepend로 패널 앞에 추가", async ({ page }) => {
      const prependBtn = page.locator("button", { hasText: "Prepend" });
      await prependBtn.click();

      await page.waitForTimeout(300);

      const state = await getFlickingState(page);
      expect(state.panelCount).toBe(6);
    });

    // focus: Remove 버튼 클릭 시 패널 삭제
    test("Remove로 패널 삭제", async ({ page }) => {
      const removeLastBtn = page.locator("button", { hasText: "Remove Last" });
      await removeLastBtn.click();

      await page.waitForTimeout(300);

      const state = await getFlickingState(page);
      expect(state.panelCount).toBe(4);
    });

    // focus: 패널이 1개일 때 Remove 비동작
    test("패널 1개일 때 Remove 비동작", async ({ page }) => {
      // 4번 삭제하여 패널 1개로 만듦
      const removeLastBtn = page.locator("button", { hasText: "Remove Last" });
      for (let i = 0; i < 4; i++) {
        await removeLastBtn.click();
        await page.waitForTimeout(200);
      }

      const beforeState = await getFlickingState(page);
      expect(beforeState.panelCount).toBe(1);

      // 한 번 더 삭제 시도 → 패널 수 유지
      await removeLastBtn.click();
      await page.waitForTimeout(200);

      const afterState = await getFlickingState(page);
      expect(afterState.panelCount).toBe(1);
    });
  });
}

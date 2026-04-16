import type { Page } from "@playwright/test";

/**
 * 데모 페이지로 이동
 */
export async function navigateToDemo(page: Page, framework: string, category: string, name: string) {
  await page.goto(`/${framework}/${category}/${name}.html`);
}

/**
 * Flicking 초기화 완료 대기
 * - DOM에 패널이 렌더링될 때까지 대기
 * - Flicking init 완료 이벤트 대기
 */
export async function waitForFlickingReady(page: Page, timeout = 10000) {
  // 1) flicking-camera에 자식이 렌더링될 때까지 대기
  await page.waitForSelector(".flicking-viewport .flicking-camera > *", { timeout });

  // 2) Flicking 인스턴스가 등록될 때까지 대기 (generate-test-harness의 패치에 의해)
  await page.waitForFunction(() => (window as any).__flickingInstances?.length > 0, { timeout });
}

/**
 * 특정 인덱스의 Flicking 인스턴스 상태 조회
 */
export async function getFlickingState(page: Page, instanceIndex = 0) {
  return page.evaluate(idx => {
    const instances = (window as any).__flickingInstances;
    if (!instances || !instances[idx]) {
      throw new Error(`Flicking instance [${idx}] not found`);
    }
    const flicking = instances[idx];
    return {
      currentIndex: flicking.index as number,
      panelCount: flicking.panelCount as number,
      animating: flicking.animating as boolean,
      initialized: flicking.initialized as boolean
    };
  }, instanceIndex);
}

/**
 * Flicking 인스턴스의 애니메이션 완료 대기
 */
export async function waitForAnimationEnd(page: Page, instanceIndex = 0, timeout = 5000) {
  await page.waitForFunction(
    idx => {
      const instances = (window as any).__flickingInstances;
      return instances?.[idx] && !instances[idx].animating;
    },
    instanceIndex,
    { timeout }
  );
}

import Flicking from "~/Flicking";
import { connectFlickingReactiveAPI } from "~/reactive";
import El from "../helper/El";
import { cleanup, createFlicking, createSandbox, tick } from "../helper/test-util";

describe("Reactive API", () => {
  let container: HTMLElement;
  let flicking: Flicking;
  let reactiveApi: ReturnType<typeof connectFlickingReactiveAPI>;

  beforeEach(async () => {
    container = createSandbox("reactive-test");
    flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
    reactiveApi = connectFlickingReactiveAPI(flicking);
  });

  afterEach(async () => {
    cleanup();
    await reactiveApi.unsubscribe();
  });

  describe("Initial State", () => {
    it("should initialize with correct values", () => {
      expect(reactiveApi.isReachStart).toBe(true);
      expect(reactiveApi.isReachEnd).toBe(false);
      expect(reactiveApi.totalPanelCount).toBe(3);
      expect(reactiveApi.currentPanelIndex).toBe(0);
      expect(reactiveApi.progress).toBe(0);
    });
  });

  describe("State Updates", () => {
    it("should update state when moving to next panel", async () => {
      const promise = flicking.next();
      tick(1000);
      await promise;

      expect(reactiveApi.isReachStart).toBe(false);
      expect(reactiveApi.isReachEnd).toBe(false);
      expect(reactiveApi.currentPanelIndex).toBe(1);
      expect(reactiveApi.progress).toBe(50);
    });

    it("should update state when moving to last panel", async () => {
      const promise = flicking.moveTo(2);
      tick(1000);
      await promise;

      expect(reactiveApi.isReachStart).toBe(false);
      expect(reactiveApi.isReachEnd).toBe(true);
      expect(reactiveApi.currentPanelIndex).toBe(2);
      expect(reactiveApi.progress).toBe(100);
    });

    it("should update state when adding panels", async () => {
      await flicking.append("<div class='flicking-panel'>4</div>");

      expect(reactiveApi.totalPanelCount).toBe(4);
      expect(reactiveApi.isReachEnd).toBe(false);
    });

    it("should update state when removing panels", async () => {
      await flicking.remove(1);

      expect(reactiveApi.totalPanelCount).toBe(2);
      expect(reactiveApi.isReachEnd).toBe(false);
    });
  });

  describe("moveTo Method", () => {
    it("should move to specified index when moveTo is called", async () => {
      const promise = reactiveApi.moveTo(1);
      tick(1000);
      await promise;

      expect(reactiveApi.currentPanelIndex).toBe(1);
      expect(reactiveApi.progress).toBe(50);
    });
  });
});

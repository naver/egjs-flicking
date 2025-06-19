import { expect } from "chai";
import Flicking from "~/Flicking";
import { connectFlickingReactiveAPI, FlickingReactiveObject } from "~/reactive";
import {
  cleanup,
  createFlicking,
  createSandbox,
  tick
} from "../helper/test-util";
import El from "../helper/El";

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
      expect(reactiveApi.isReachStart).to.be.true;
      expect(reactiveApi.isReachEnd).to.be.false;
      expect(reactiveApi.totalPanelCount).to.equal(3);
      expect(reactiveApi.currentPanelIndex).to.equal(0);
      expect(reactiveApi.progress).to.equal(0);
    });
  });

  describe("State Updates", () => {
    it("should update state when moving to next panel", async () => {
      const promise = flicking.next();
      tick(1000);
      await promise;

      expect(reactiveApi.isReachStart).to.be.false;
      expect(reactiveApi.isReachEnd).to.be.false;
      expect(reactiveApi.currentPanelIndex).to.equal(1);
      expect(reactiveApi.progress).to.equal(50);
    });

    it("should update state when moving to last panel", async () => {
      const promise = flicking.moveTo(2);
      tick(1000);
      await promise;

      expect(reactiveApi.isReachStart).to.be.false;
      expect(reactiveApi.isReachEnd).to.be.true;
      expect(reactiveApi.currentPanelIndex).to.equal(2);
      expect(reactiveApi.progress).to.equal(100);
    });

    it("should update state when adding panels", async () => {
      await flicking.append("<div class='flicking-panel'>4</div>");

      expect(reactiveApi.totalPanelCount).to.equal(4);
      expect(reactiveApi.isReachEnd).to.be.false;
    });

    it("should update state when removing panels", async () => {
      await flicking.remove(1);

      expect(reactiveApi.totalPanelCount).to.equal(2);
      expect(reactiveApi.isReachEnd).to.be.false;
    });
  });

  describe("moveTo Method", () => {
    it("should move to specified index when moveTo is called", async () => {
      const promise = reactiveApi.moveTo(1);
      tick(1000);
      await promise;

      expect(reactiveApi.currentPanelIndex).to.equal(1);
      expect(reactiveApi.progress).to.equal(50);
    });
  });
});

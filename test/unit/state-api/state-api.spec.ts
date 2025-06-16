import { expect } from "chai";
import Flicking from "~/Flicking";
import { connectFlickingStateApi } from "~/state-api";
import { cleanup, createFlicking, createSandbox, tick } from "../helper/test-util";
import El from "../helper/El";

describe("State API", () => {
  let container: HTMLElement;
  let flicking: Flicking;
  let stateApi: ReturnType<typeof connectFlickingStateApi>;

  beforeEach(async () => {
    container = createSandbox("state-api-test");
    flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
    stateApi = connectFlickingStateApi(flicking);
  });

  afterEach(async () => {
    cleanup();
    await stateApi.unsubscribe();
  });

  describe("Initial State", () => {
    it("should initialize with correct values", () => {
      expect(stateApi.isReachStart).to.be.true;
      expect(stateApi.isReachEnd).to.be.false;
      expect(stateApi.totalPanelCount).to.equal(3);
      expect(stateApi.currentPanelIndex).to.equal(0);
      expect(stateApi.indexProgress).to.equal(0);
      expect(stateApi.scrollProgress).to.equal(0);
    });
  });

  describe("State Updates", () => {
    it("should update state when moving to next panel", async () => {
      const promise =  flicking.next();
      tick(1000);
      await promise;

      expect(stateApi.isReachStart).to.be.false;
      expect(stateApi.isReachEnd).to.be.false;
      expect(stateApi.currentPanelIndex).to.equal(1);
      expect(stateApi.indexProgress).to.equal(50);
      expect(stateApi.scrollProgress).to.equal(50);
    });

    it("should update state when moving to last panel", async () => {
      const promise = flicking.moveTo(2);
      tick(1000);
      await promise;

      expect(stateApi.isReachStart).to.be.false;
      expect(stateApi.isReachEnd).to.be.true;
      expect(stateApi.currentPanelIndex).to.equal(2);
      expect(stateApi.indexProgress).to.equal(100);
    });

    it("should update state when adding panels", async () => {
      await flicking.append("<div class='flicking-panel'>4</div>");

      expect(stateApi.totalPanelCount).to.equal(4);
      expect(stateApi.isReachEnd).to.be.false;
    });

    it("should update state when removing panels", async () => {
      await flicking.remove(1);

      expect(stateApi.totalPanelCount).to.equal(2);
      expect(stateApi.isReachEnd).to.be.false;
    });
  });

  describe("moveTo Method", () => {
    it("should move to specified index when moveTo is called", async () => {
      const promise = stateApi.moveTo(1);
      tick(1000);
      await promise;

      expect(stateApi.currentPanelIndex).to.equal(1);
      expect(stateApi.indexProgress).to.equal(50);
    });
  });
});

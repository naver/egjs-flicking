import { expect } from "chai";
import Flicking from "../../../src/Flicking";
import { connectFlickingStateApi } from "../../../src/state-api";

describe("State API", () => {
  let flicking: Flicking;
  let stateApi: ReturnType<typeof connectFlickingStateApi>;

  beforeEach(() => {
    const el = document.createElement("div");
    el.innerHTML = `
      <div class="flicking-viewport">
        <div class="flicking-camera">
          <div class="flicking-panel">1</div>
          <div class="flicking-panel">2</div>
          <div class="flicking-panel">3</div>
        </div>
      </div>
    `;
    document.body.appendChild(el);

    flicking = new Flicking(".flicking-viewport");
    stateApi = connectFlickingStateApi(flicking);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    flicking.destroy();
  });

  it("should initialize with correct values", () => {
    expect(stateApi.isReachStart).to.be.true;
    expect(stateApi.isReachEnd).to.be.false;
    expect(stateApi.totalPanelCount).to.equal(3);
    expect(stateApi.currentPanelIndex).to.equal(0);
    expect(stateApi.progress).to.equal(0);
  });

  it("should update state when moving to next panel", async () => {
    await flicking.next();

    expect(stateApi.isReachStart).to.be.false;
    expect(stateApi.isReachEnd).to.be.false;
    expect(stateApi.currentPanelIndex).to.equal(1);
    expect(stateApi.progress).to.equal(50);
  });

  it("should update state when moving to last panel", async () => {
    await flicking.moveTo(2);

    expect(stateApi.isReachStart).to.be.false;
    expect(stateApi.isReachEnd).to.be.true;
    expect(stateApi.currentPanelIndex).to.equal(2);
    expect(stateApi.progress).to.equal(100);
  });

  it("should update state when adding panels", () => {
    flicking.append("<div class='flicking-panel'>4</div>");

    expect(stateApi.totalPanelCount).to.equal(4);
    expect(stateApi.isReachEnd).to.be.false;
  });

  it("should update state when removing panels", () => {
    flicking.remove(2);

    expect(stateApi.totalPanelCount).to.equal(2);
    expect(stateApi.isReachEnd).to.be.true;
  });

  it("should move to specified index when moveTo is called", async () => {
    await stateApi.moveTo(1);

    expect(stateApi.currentPanelIndex).to.equal(1);
    expect(stateApi.progress).to.equal(50);
  });
});

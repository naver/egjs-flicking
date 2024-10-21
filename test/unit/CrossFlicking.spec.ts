import FlickingError from "~/core/FlickingError";
import Viewport from "~/core/Viewport";
import Flicking from "~/Flicking";
import { SnapControl, FreeControl, StrictControl } from "~/control";
import { BoundCameraMode, CircularCameraMode, LinearCameraMode } from "~/camera";
import VirtualManager from "~/core/VirtualManager";
import * as ERROR from "~/const/error";
import { ALIGN, DIRECTION, EVENTS, MOVE_TYPE } from "~/const/external";
import { Plugin } from "~/type/external";
import { AfterResizeEvent, BeforeResizeEvent } from "~/type/event";

import El from "./helper/El";
import { cleanup, createCrossFlicking, createFlicking, range, simulate, tick, waitEvent, waitTime } from "./helper/test-util";

describe.only("CrossFlicking", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Initializing with correct structure", () => {
    it("can be created", async () => {
      const err = await createCrossFlicking(El.DEFAULT_CROSS).then(() => null).catch(e => e);
      expect(err).to.be.null;
    });
  });

  describe("Properties", () => {
  });

  describe("Options", () => {
    // describe("preserveIndex", () => {
    //   it("is true by default", async () => {
    //     const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

    //     expect(flicking.preserveIndex).to.equal(true);
    //   });
    // });
  });

  describe("Events", () => {
  });

  describe("Methods", () => {
    describe("init", () => {
    });

    describe("destroy", () => {
    });
  });

  describe("Key Features", () => {
    it("should change index of main flicking from index of side flicking", async () => {
      const flicking = await createCrossFlicking(El.DEFAULT_CROSS);
      void flicking.sideFlicking[0].moveTo(5, 0);
      tick(100);

      expect(flicking.index).to.equal(1);
      expect(flicking.sideFlicking[0].index).to.equal(2);
      expect(flicking.sideFlicking[1].index).to.equal(5);
    });
  });

  describe("Control", () => {

  });
});

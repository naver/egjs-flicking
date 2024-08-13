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
    it("should return viewport element", async () => {
      const flicking = await createCrossFlicking(El.DEFAULT_CROSS);
      void flicking.verticalFlicking[0].moveTo(5, 0);
      console.log(flicking.index)
      console.log(flicking.verticalFlicking[0].index)
      console.log(flicking.verticalFlicking[1].index)
      expect(flicking.element).to.be.an.instanceOf(HTMLElement);
      expect(flicking.element).to.equal(flicking.viewport.element);
    });
  });

  describe("Control", () => {

  });
});

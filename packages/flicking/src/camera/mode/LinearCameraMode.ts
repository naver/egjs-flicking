/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import CameraMode from "./CameraMode";

class LinearCameraMode extends CameraMode {
  public checkAvailability(): boolean {
    // It's always available
    return true;
  }

  public getRange(): { min: number; max: number } {
    const renderer = this._flicking.renderer;

    const firstPanel = renderer.getPanel(0);
    const lastPanel = renderer.getPanel(renderer.panelCount - 1);

    return { min: firstPanel?.position ?? 0, max: lastPanel?.position ?? 0 };
  }
}

export default LinearCameraMode;

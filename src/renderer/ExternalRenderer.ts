/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import FlickingError from "../core/FlickingError";
import Panel from "../core/Panel/Panel";
import * as ERROR from "../const/error";
import { ElementLike } from "../type/external";

import Renderer from "./Renderer";

class ExternalRenderer extends Renderer {
  public async render() {

  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async forceRenderAllPanels() {

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public insert(index: number, element: ElementLike | ElementLike[]): Panel[] {
    throw new FlickingError(ERROR.MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, ERROR.CODE.NOT_ALLOWED_IN_FRAMEWORK);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public remove(index: number, deleteCount: number): Panel[] {
    throw new FlickingError(ERROR.MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, ERROR.CODE.NOT_ALLOWED_IN_FRAMEWORK);
  }

  protected _collectPanels(): this {
    return this;
  }
}

export default ExternalRenderer;

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
class FlickingError extends Error {
  public constructor(
    public message: string,
    public code: number) {
    super(message);
    Object.setPrototypeOf(this, FlickingError.prototype);
    this.name = "FlickingError";
  }
}

export default FlickingError;

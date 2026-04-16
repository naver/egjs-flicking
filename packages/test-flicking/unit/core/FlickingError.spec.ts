import FlickingError from "~/error/FlickingError";

describe("FlickingError", () => {
  it("is catchable", () => {
    // Given
    const err = new FlickingError("I'M AN ERROR", 0);
    try {
      // When
      throw err;
    } catch (catchedErr) {
      // Then
      expect(catchedErr).toBe(err);
      return;
    }
  });

  it("is instance of FlickingError", () => {
    // Given & When
    const err = new FlickingError("Test Message", 0);

    // Then
    expect(err).toBeInstanceOf(FlickingError);
  });

  it("has a code in it", () => {
    // Given
    const randomCode = Math.floor(Math.random() * 10000);

    // When
    const err = new FlickingError("Random Msg", randomCode);

    // Then
    expect(err.code).toBeDefined();
    expect(typeof err.code).toBe("number");
    expect(err.code).toBe(randomCode);
  });

  it("has a message in it", () => {
    // Given
    const randomMessage = Math.floor(Math.random() * 10000).toString();

    // When
    const err = new FlickingError(randomMessage, 0);

    // Then
    expect(err.message).toBeDefined();
    expect(typeof err.message).toBe("string");
    expect(err.message).toBe(randomMessage);
  });

  it("has a stack in it", () => {
    // Given & When
    const err = new FlickingError("", 0);

    // Then
    expect(err.stack).toBeDefined();
    expect(err.stack).not.toBe("");
  });
});

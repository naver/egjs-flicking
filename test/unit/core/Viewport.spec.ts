import Viewport from "~/core/Viewport";
import El from "../helper/El";
import { cleanup, createSandbox } from "../helper/test-util";

describe("Viewport", () => {
  describe("Properties", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = createSandbox("viewport-test");
    });

    afterEach(() => {
      cleanup();
    });

    it("should have property element same to the given element", () => {
      const expected = new El("some-random-string").el;
      const viewport = new Viewport(expected);
      expect(viewport.element).equals(expected);
    });

    it("should have width/height in it", () => {
      const viewport = new Viewport(document.createElement("div"));

      expect(viewport.width).to.be.exist;
      expect(viewport.height).to.be.exist;
    });

    it("has size 0 until updating it", () => {
      const viewportEl = El.viewport()
        .appendTo(container)
        .setHeight(300)
        .el;

      const viewport = new Viewport(viewportEl);

      expect(viewportEl.clientWidth).not.to.equal(0);
      expect(viewportEl.clientHeight).not.to.equal(0);
      expect(viewport.width).to.equal(0);
      expect(viewport.height).to.equal(0);
    });

    it("should set size equal to the given element after update", () => {
      const expected = {
        width: 12347,
        height: 54987
      };
      const viewportEl = El.viewport()
        .appendTo(container)
        .setWidth(expected.width)
        .setHeight(expected.height)
        .el;

      const viewport = new Viewport(viewportEl);
      viewport.resize();

      expect(viewport.width).to.equal(expected.width);
      expect(viewport.height).to.equal(expected.height);
    });

    it("can set its size equal to the given arguments", () => {
      const previous = { width: 100, height: 100 };
      const expected = { width: 200, height: 400 };

      const viewportEl = El.viewport()
        .appendTo(container)
        .setWidth(previous.width)
        .setHeight(previous.height)
        .el;

      const viewport = new Viewport(viewportEl);
      viewport.resize();
      viewport.setSize(expected);

      expect(viewport.width).deep.equals(expected.width);
      expect(viewport.height).deep.equals(expected.height);
    });
  });
});

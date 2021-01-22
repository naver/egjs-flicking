import {
  checkExistence,
  clamp,
  getElement,
  merge,
  range
} from "~/utils";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";

import { cleanup, createSandbox, NullClass } from "./helper/test-util";

describe("Util Functions", () => {
  describe("getElement", () => {
    let wrapper: HTMLElement;

    beforeEach(() => {
      wrapper = createSandbox("#wrapper");
    });

    afterEach(() => {
      cleanup();
    });

    it("should search from the document with selector if the parent element is not given", () => {
      const findingEl = document.createElement("div");
      findingEl.id = "target";

      document.body.appendChild(findingEl);

      try {
        expect(() => getElement("#target")).not.to.throw();
        expect(getElement("#target")).to.equal(findingEl);
      } catch (e) {
        expect(true).to.be.false; // Shouldn't reach here
      } finally {
        findingEl.remove();
      }
    });

    it("should search with the selector from the parent element if parent element is given", () => {
      const findingEl = document.createElement("div");
      const fakeEl = document.createElement("div");
      findingEl.className = "target";
      fakeEl.className = "target";

      document.body.insertBefore(fakeEl, wrapper);
      wrapper.appendChild(findingEl);

      try {
        expect(() => getElement(".target")).not.to.throw();
        expect(getElement(".target", wrapper)).to.equal(findingEl);
      } catch (e) {
        expect(true).to.be.false; // Shouldn't reach here
      } finally {
        fakeEl.remove();
        findingEl.remove();
      }
    });

    it("will return element itself if HTMLelemnt is given", () => {
      const testingEl = document.createElement("div");
      wrapper.appendChild(testingEl);
      expect(() => getElement(testingEl)).not.to.throw();
      expect(getElement(testingEl)).to.equal(testingEl);
    });

    it("will throw ConveyerError if element with given selector not found", () => {
      expect(() => getElement("#el-that-definitely-not-exist"))
        .to.throw(FlickingError)
        .with.property("code", ERROR.CODE.ELEMENT_NOT_FOUND);
    });

    it("will throw ConveyerError if element with given selector not found inside given parent", () => {
      const targetEl = document.createElement("div");
      targetEl.id = "target";
      document.body.appendChild(targetEl);

      expect(() => getElement("#target", wrapper))
        .to.throw(FlickingError)
        .with.property("code", ERROR.CODE.ELEMENT_NOT_FOUND);
    });

    it("will throw ConveyerError if given parameter is neither string nor HTMLElement", () => {
      const prohibited = [
        document.createTextNode("some_text"),
        null,
        undefined,
        1203498,
        { a: 1, b: 2},
        () => "string"
      ];

      prohibited.forEach(val => {
        expect(() => getElement(val as any))
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.WRONG_TYPE);
      });
    });
  });

  describe("checkExistence", () => {
    it("won't throw when value is not nullish", () => {
      // tslint:disable-next-line
      const testVals = [0, 123, "", "asdf", {}, { a: 1 }, [], [0, 1], new NullClass(), () => {}, () => 0];

      testVals.forEach(val => {
        expect(() => checkExistence(val, "ERROR_MSG")).not.to.throw();
      });
    });

    it("should throw ConveyorError when value is nullish", () => {
      const testVals = [null, undefined];

      testVals.forEach(val => {
        expect(() => checkExistence(val, "ERROR_MSG"))
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.VAL_MUST_NOT_NULL);
      });
    });
  });

  describe("range", () => {
    it("should return 0 to n - 1", () => {
      expect(range(5)).deep.equals([0, 1, 2, 3, 4]);
      expect(range(100).every((val, idx) => val === idx)).to.be.true;
    });

    it("should return an empty array if end value is not given", () => {
      // @ts-ignore
      expect(range()).to.deep.equal([]);
    });

    it("should return an empty array if end value is less than 1", () => {
      expect(range(0)).to.deep.equal([]);
      expect(range(-1)).to.deep.equal([]);
      expect(range(-100)).to.deep.equal([]);
    });
  });

  describe("clamp", () => {
    it("should clamp value to maximum value", () => {
      expect(clamp(5, 0, 3)).to.equal(3);
      expect(clamp(2, -2, 1)).to.equal(1);
      expect(clamp(100, -7, -3)).to.equal(-3);
    });

    it("should clamp value to minimum value", () => {
      expect(clamp(-1, 0, 3)).to.equal(0);
      expect(clamp(4, 5, 8)).to.equal(5);
      expect(clamp(-100, -2, 1)).to.equal(-2);
    });

    it("should return origin value if it's between min and max", () => {
      expect(clamp(50, 0, 100)).to.equal(50);
      expect(clamp(0.5, 0, 1)).to.equal(0.5);
      expect(clamp(-1, -2, 0)).to.equal(-1);
      expect(clamp(-3, -4, -2)).to.equal(-3);
    });
  });

  describe("merge", () => {
    it("should return same reference of the given object", () => {
      const obj = {};
      const merged = merge(obj, { a: 1 });

      expect(merged).equals(obj);
    });

    it("should return merged object with both properties in target & source", () => {
      const obj = { b: "asdf" };
      const merged = merge(obj, { a: 1 });

      expect(merged.a).to.equal(1);
      expect(merged.b).to.equal("asdf");
    });

    it("should overwrite property if it was present on the target", () => {
      const obj = { a: 5 };
      const merged = merge(obj, { a: 1 });

      expect(merged.a).to.equal(1);
    });
  });
});

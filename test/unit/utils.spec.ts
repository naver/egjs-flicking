import {
  checkExistence,
  clamp,
  getElement,
  merge,
  getFlickingAttached,
  toArray,
  parseAlign,
  parseArithmeticExpression,
  parseBounce,
  parseCSSSizeValue,
  getDirection,
  parseElement,
  getMinusCompensatedIndex,
  includes
} from "~/utils";
import Flicking from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";
import { ALIGN, DIRECTION } from "~/const/external";

import El from "./helper/El";
import { cleanup, createFlicking, createSandbox, NullClass, range } from "./helper/test-util";

describe("Util Functions", () => {
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

    it("will throw FlickingError if element with given selector not found", () => {
      expect(() => getElement("#el-that-definitely-not-exist"))
        .to.throw(FlickingError)
        .with.property("code", ERROR.CODE.ELEMENT_NOT_FOUND);
    });

    it("will throw FlickingError if element with given selector not found inside given parent", () => {
      const targetEl = document.createElement("div");
      targetEl.id = "target";
      document.body.appendChild(targetEl);

      expect(() => getElement("#target", wrapper))
        .to.throw(FlickingError)
        .with.property("code", ERROR.CODE.ELEMENT_NOT_FOUND);
    });

    it("will throw FlickingError with code 'WRONG_TYPE' if given parameter is neither string nor HTMLElement", () => {
      const wrongValues = [
        document.createTextNode("some_text"),
        null,
        undefined,
        1203498,
        { a: 1, b: 2},
        () => "string"
      ];

      wrongValues.forEach(val => {
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

    it("should throw FlickingError with code 'VAL_MUST_NOT_NULL' when value is nullish", () => {
      const testVals = [null, undefined];

      testVals.forEach(val => {
        expect(() => checkExistence(val, "ERROR_MSG"))
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.VAL_MUST_NOT_NULL);
      });
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

  describe("getFlickingAttached", () => {
    it("should not throw when its internal field '_flicking' is not null", async () => {
      class ClassThatHasFlickingInIt {
        private _flicking: Flicking;

        public async init(): Promise<this> {
          this._flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          return this;
        }

        public test() {
          const flicking = getFlickingAttached(this._flicking, "TEST_CLASS");
        }
      }

      expect(async () => (await (new ClassThatHasFlickingInIt()).init()).test()).not.to.throw();
    });

    it("should throw FlickingError with code 'NOT_ATTACHED_TO_FLICKING' when its internal field '_flicking' is null", () => {
      class ClassThatHasFlickingAsNull {
        private _flicking: Flicking | null = null;

        public test() {
          const flicking = getFlickingAttached(this._flicking, "TEST_CLASS");
        }
      }

      expect(() => new ClassThatHasFlickingAsNull().test())
        .to.throw(FlickingError)
        .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
    });
  });

  describe("toArray", () => {
    let wrapper: HTMLElement;

    beforeEach(() => {
      wrapper = createSandbox("wrapper");
    });

    afterEach(() => {
      cleanup();
    });

    it("create the HTMLElement array when a HTMLCollection is given", () => {
      range(10).forEach(() => {
        wrapper.appendChild(document.createElement("div"));
      });

      const childElements = toArray(wrapper.children);

      expect(childElements.length).to.equal(10);
      expect(childElements).to.be.an.instanceOf(Array);
      expect(childElements[0]).to.be.an.instanceOf(HTMLElement);
    });
  });

  describe("parseAlign", () => {
    it(`should return 0 for ${ALIGN.PREV}`, () => {
      expect(parseAlign(ALIGN.PREV, 100)).to.equal(0);
    });

    it(`should return half of the size for ${ALIGN.CENTER}`, () => {
      expect(parseAlign(ALIGN.CENTER, 100)).to.equal(50);
    });

    it(`should return size for ${ALIGN.NEXT}`, () => {
      expect(parseAlign(ALIGN.NEXT, 100)).to.equal(100);
    });

    it("should return same number when given value is number", () => {
      expect(parseAlign(24, 100)).to.equal(24);
    });

    it("should evaluate the value when given value is string", () => {
      // More cases will be tested on test codes of parseArithmeticExpression
      expect(parseAlign("32px + 50%", 100)).to.equal(82);
    });

    it("should throw FlickingError with code 'WRONG_OPTION' when given value is string with wrong format", () => {
      expect(() => parseAlign("SOME_FAILING_STRING", 100)).to.throw(FlickingError).with.property("code", ERROR.CODE.WRONG_OPTION);
      expect(() => parseAlign("", 100)).to.throw(FlickingError).with.property("code", ERROR.CODE.WRONG_OPTION);
    });
  });

  describe("parseBounce", () => {
    it("should return [val, val] when given val is number", () => {
      expect(parseBounce(1, 100)).to.deep.equal([1, 1]);
    });

    it("should evaluate the value when given value is string", () => {
      expect(parseBounce("32%", 100)).to.deep.equal([32, 32]);
    });

    it("should return number array itself when given value is number array", () => {
      expect(parseBounce([10, 20], 100)).to.deep.equal([10, 20]);
    });

    it("should evaluate each string when given value is string array", () => {
      expect(parseBounce(["4px", "70%"], 50)).to.deep.equal([4, 35]);
    });

    it("can accept array with number and string mixed", () => {
      expect(parseBounce([16, "40%"], 70)).to.deep.equal([16, 28]);
    });
  });

  describe("parseArithmeticExpression", () => {
    it("can handle single number string", () => {
      expect(parseArithmeticExpression("14", 100)).to.equal(14);
    });

    it("can handle single number-px", () => {
      expect(parseArithmeticExpression("80px", 100)).to.equal(80);
    });

    it("can handle single number-%", () => {
      expect(parseArithmeticExpression("50%", 50)).to.equal(25);
    });

    it("can handle multiple number strings", () => {
      expect(parseArithmeticExpression("14 + 32 - 20", 100)).to.equal(26);
    });

    it("can handle multiple numbers, combined in each format", () => {
      expect(parseArithmeticExpression("40% - 12px+73", 100)).to.equal(101);
    });
  });

  describe("parseCSSSizeValue", () => {
    it("should return itself when given value is a string", () => {
      expect(parseCSSSizeValue("")).to.equal("");
      expect(parseCSSSizeValue("24px")).to.equal("24px");
      expect(parseCSSSizeValue("SOME_NON_CSS_VALUE")).to.equal("SOME_NON_CSS_VALUE"); // Even this is correct behavior
    });

    it("should return '{number}px' when given value is a number", () => {
      expect(parseCSSSizeValue(0)).to.equal("0px");
      expect(parseCSSSizeValue(24)).to.equal("24px");
      expect(parseCSSSizeValue(-100)).to.equal("-100px");
    });
  });

  describe("getDirection", () => {
    it(`should retrun ${DIRECTION.NONE} when start equals end`, () => {
      expect(getDirection(0, 0)).to.equal(DIRECTION.NONE);
      expect(getDirection(100, 100)).to.equal(DIRECTION.NONE);
      expect(getDirection(-1, -1)).to.equal(DIRECTION.NONE);
      expect(getDirection(-0, 0)).to.equal(DIRECTION.NONE);
    });

    it(`should retrun ${DIRECTION.NEXT} when end is bigger than start`, () => {
      expect(getDirection(0, 0.1)).to.equal(DIRECTION.NEXT);
      expect(getDirection(100, 500)).to.equal(DIRECTION.NEXT);
      expect(getDirection(-1, 0)).to.equal(DIRECTION.NEXT);
      expect(getDirection(-100, 100)).to.equal(DIRECTION.NEXT);
    });

    it(`should retrun ${DIRECTION.PREV} when end is smaller than start`, () => {
      expect(getDirection(0.1, 0)).to.equal(DIRECTION.PREV);
      expect(getDirection(500, 100)).to.equal(DIRECTION.PREV);
      expect(getDirection(0, -1)).to.equal(DIRECTION.PREV);
      expect(getDirection(100, -100)).to.equal(DIRECTION.PREV);
    });
  });

  describe("parseElement", () => {
    it("should return an array with given element if a single HTMLElement is given", () => {
      const element = document.createElement("div");

      expect(parseElement(element)).to.be.an.instanceOf(Array);
      expect(parseElement(element).length).to.equal(1);
      expect(parseElement(element)[0]).to.equal(element);
    });

    it("should return the same elements if an array of HTMLElement is given", () => {
      const elements = range(10).map(() => document.createElement("div"));

      expect(parseElement(elements)).to.deep.equal(elements);
    });

    it("can accept a HTML string includes a single element and return an array of that single HTMLElment", () => {
      const parsed = parseElement("<div class=\"flicking-panel\">Panel</div>");

      expect(parsed).to.be.an.instanceOf(Array);
      expect(parsed.length).to.equal(1);
      expect(parsed[0]).to.be.an.instanceOf(HTMLElement);
      expect(parsed[0].classList.contains("flicking-panel")).to.be.true;
      expect(parsed[0].innerHTML).to.equal("Panel");
    });

    it("can accept a HTML string includes a multiple elements and return an array of that HTMLElments", () => {
      const parsed = parseElement("<div>Panel 0</div><div>Panel 1</div><div>Panel 2</div>");

      expect(parsed).to.be.an.instanceOf(Array);
      expect(parsed.length).to.equal(3);
      expect(parsed.every(el => el instanceof HTMLElement)).to.be.true;
      expect(parsed[0].innerHTML).to.equal("Panel 0");
      expect(parsed[1].innerHTML).to.equal("Panel 1");
      expect(parsed[2].innerHTML).to.equal("Panel 2");
    });

    it("can ignore Text Nodes", () => {
      const parsed = parseElement(`
        <div>Panel 0</div>
        <div>Panel 1</div>
        <div>Panel 2</div>
      `);

      expect(parsed).to.be.an.instanceOf(Array);
      expect(parsed.length).to.equal(3);
    });

    it("can accept an mixed array of string-HTMLElement", () => {
      const elements = ["<div>Panel</div>", document.createElement("div")];

      expect(parseElement(elements)).to.be.an.instanceOf(Array);
      expect(parseElement(elements).length).to.equal(2);
      expect(parseElement(elements)[0]).to.be.an.instanceOf(HTMLElement);
      expect(parseElement(elements)[1]).to.be.an.instanceOf(HTMLElement);
    });

    it("should return an empty array if non-HTML string is given", () => {
      expect(parseElement("")).to.deep.equal([]);
      expect(parseElement("123412341")).to.deep.equal([]);
      expect(parseElement("<div<<div<")).to.deep.equal([]);
      expect(parseElement("")).to.deep.equal([]);
    });

    it("should throw FlickingError with code 'WRONG_TYPE' if given parameter is neither string nor HTMLElement", () => {
      const wrongValues = [
        document.createTextNode("some_text"),
        null,
        undefined,
        1203498,
        { a: 1, b: 2},
        () => "string"
      ];

      wrongValues.forEach(val => {
        expect(() => parseElement(val as any))
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.WRONG_TYPE);
      });
    });
  });

  describe("getCirculatedIndex", () => {
    it("should return same number if that number is between 0 and max", () => {
      expect(getMinusCompensatedIndex(0, 1)).to.equal(0);
      expect(getMinusCompensatedIndex(1, 1)).to.equal(1);
      expect(getMinusCompensatedIndex(5, 10)).to.equal(5);
    });

    it("should return clamped number if that number is bigger than max", () => {
      expect(getMinusCompensatedIndex(3, 1)).to.equal(1);
      expect(getMinusCompensatedIndex(1, 0)).to.equal(0);
      expect(getMinusCompensatedIndex(10, 5)).to.equal(5);
    });

    it("should return 'max - abs(val)' if given number is negative and abs(val) <= max", () => {
      expect(getMinusCompensatedIndex(-1, 1)).to.equal(0);
      expect(getMinusCompensatedIndex(-1, 5)).to.equal(4);
      expect(getMinusCompensatedIndex(-2, 5)).to.equal(3);
      expect(getMinusCompensatedIndex(-3, 5)).to.equal(2);
      expect(getMinusCompensatedIndex(-4, 5)).to.equal(1);
      expect(getMinusCompensatedIndex(-5, 5)).to.equal(0);
    });

    it("should return clamp(max - abs(val), 0, max) if given number is negative and abs(val) > max", () => {
      expect(getMinusCompensatedIndex(-5, 1)).to.equal(0);
      expect(getMinusCompensatedIndex(-6, 5)).to.equal(0);
      expect(getMinusCompensatedIndex(-999, 5)).to.equal(0);
    });
  });

  describe("includes", () => {
    it("should return true if the checking literal value is included in the given array", () => {
      expect(includes([0, 1, 2], 0)).to.be.true;
      expect(includes([0, 1, 2], 1)).to.be.true;
      expect(includes([0, 1, 2], 2)).to.be.true;
      expect(includes(["a", "b", "c"], "b")).to.be.true;
      expect(includes(["a", "b", "c"], "c")).to.be.true;
      expect(includes([undefined, null], null)).to.be.true;
      expect(includes([undefined, null], undefined)).to.be.true;
    });

    it("should return false if the checking literal value is not included in the given array", () => {
      expect(includes([0, 1, 2], 4)).to.be.false;
      expect(includes([0, 1, 2], 10)).to.be.false;
      expect(includes([0, 1, 2], -1)).to.be.false;
      expect(includes([1, 2], 0)).to.be.false;
      expect(includes([0, 1, 2], null)).to.be.false;
      expect(includes([0, 1, 2], undefined)).to.be.false;
      expect(includes([0, 1, 2], {} as any)).to.be.false;
      expect(includes([0, 1, 2], [] as any)).to.be.false;
      expect(includes(["a", "b", "c"], "")).to.be.false;
      expect(includes(["a", "b", "c"], "d")).to.be.false;
      expect(includes(["a", "b", "c"], undefined)).to.be.false;
      expect(includes(["a", "b", "c"], null)).to.be.false;
      expect(includes(["a", "b", "c"], {} as any)).to.be.false;
      expect(includes(["a", "b", "c"], [] as any)).to.be.false;
      expect(includes([undefined, null], 0)).to.be.false;
      expect(includes([undefined, null], "")).to.be.false;
      expect(includes([undefined, null], {})).to.be.false;
      expect(includes([undefined, null], [])).to.be.false;
    });

    it("should return true if the exact same class instance / array / object / function is included in the array", () => {
      class IncludesTestClass {
        public constructor(public foo: number, public bar: string) {}
      }

      const instance = new IncludesTestClass(0, "");
      const array = [0, 1, 2, "1", "2", "3"];
      const object = { a: 1, b: "2" };
      const func = (a: number) => true;

      expect(includes([instance, array, object, func], instance)).to.be.true;
      expect(includes([instance, array, object, func], array)).to.be.true;
      expect(includes([instance, array, object, func], object)).to.be.true;
      expect(includes([instance, array, object, func], func)).to.be.true;
    });

    it("should return false if the class instance / array / object / function with the same value but not the same reference is included in the array", () => {
      class IncludesTestClass {
        public constructor(public foo: number, public bar: string) {}
      }

      const instance = new IncludesTestClass(0, "");
      const array = [0, 1, 2, "1", "2", "3"];
      const object = { a: 1, b: "2" };
      const func = (a: number) => true;

      expect(includes([instance, array, object, func], new IncludesTestClass(0, ""))).to.be.false;
      expect(includes([instance, array, object, func], [0, 1, 2, "1", "2", "3"])).to.be.false;
      expect(includes([instance, array, object, func], { a: 1, b: "2" })).to.be.false;
      expect(includes([instance, array, object, func], (a: number) => true)).to.be.false;
    });
  });
});

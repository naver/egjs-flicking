/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/*eslint-disable */
import tutils from "./assets/utils";
import OpacityEffect from "../../src/plugin/effects/OpacityEffect";
import Axes from "@egjs/axes";

describe("Methods call", function() {
	describe("getIndex()", function() {
		tutils.hooks.run();

		// Given
		let defaultIndex = 3;
		const inst = tutils.create("#mflick3", {
			circular : true,
			defaultIndex : defaultIndex
		});

		// Then
		it("Get current logical panel number", () => {
			expect(defaultIndex).to.equal(inst.getIndex());
		});

		it("Physical and logical panel number are different", () => {
			expect(inst.getIndex(true)).not.to.equal(inst.getIndex());
		});

		it("Get current panel using physical panel number", () => {
			expect(inst._conf.panel.$list[inst.getIndex(true)]).to.deep.equal(inst.getElement());
		});
	});

	describe("getElement()", function() {
		tutils.hooks.run();

		const inst = tutils.create("#mflick2", {
			circular : true
		});

		it("The element was invoked correctly?", () => {
			expect(inst.getElement()).to.be.ok;
		});

		it("Invoked element is placed in right position?", () => {
			const element = inst.getElement();
			const value = (inst._getBasePositionIndex() * 100) +"%";

			expect( tutils.$getTransformValue(element).match(RegExp(value)) + "").to.deep.equal(value);
		});
	});

	describe("getNextElement()", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick2", {
			circular : true
		});

		// Then
		it("The element was invoked correctly?", () => {
			expect(inst.getNextElement()).to.be.ok;
		});
		it("Invoked element is placed next to the current element?", () => {
			const currentTransform =  tutils.$getTransformValue(inst.getElement(), true);
			const nextTransform =  tutils.$getTransformValue(inst.getNextElement(), true);

			expect(currentTransform < nextTransform).to.be.ok;
		});
	});

	describe("getNextIndex()", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick3", {
			circular : true
		});

		let index = inst.getNextIndex();

		// Then
		it("Returned number?", () => {
			expect(typeof index).to.equal("number");
		});

		it("Is the next index of current?", () => {
			expect(index).to.equal(inst.getIndex() + 1);
		});

		// Then
		it("Next index of last, should be '0'", () => {
			inst.moveTo(inst._conf.panel.count - 1,0);  // move to last
			index = inst.getNextIndex();

			expect(index).equal(0);
		});

		// Then
		it("Next physical index of last, should be great than 0", () => {
			index = inst.getNextIndex(true);

			expect(index > 0).to.be.ok;
		});
	});

	describe("getPrevElement()", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick2", {
			circular : true
		});

		// Then
		it("The element was invoked correctly?", () => {
			expect(inst.getPrevElement()).to.be.ok;
		});

		it("Invoked element is placed previous to the current element?", () => {
			const currentTransform =  tutils.$getTransformValue(inst.getElement(), true);
			const prevTransform =  tutils.$getTransformValue(inst.getPrevElement(), true);

			expect(currentTransform > prevTransform).to.be.ok;
		});
	});

	describe("getPrevIndex()", function() {
		tutils.hooks.run();

		const inst = tutils.create("#mflick3", {
			circular : true
		});

		let index = inst.getPrevIndex();

		it("Returned number?", () => {
			expect(typeof index).to.equal("number");
		});

		it("Previous index of first, should be "+ (inst._conf.panel.count - 1), () => {
			expect(index).to.equal(inst._conf.panel.count - 1);
		});

		it("Is the previous index of current?", () => {
			inst.moveTo(2,0);  // move to second
			index = inst.getPrevIndex();

			expect(index).to.equal(inst.getIndex() - 1);
		});

		it("Previous physical index, should be less than logical index", () => {
			inst.moveTo(0,0);  // move to the first
			index = inst.getPrevIndex(true);

			expect(inst.getPrevIndex() > index).to.be.ok;
		});
	});

	describe("getAllElements()", function() {
		tutils.hooks.run();

		it("Returned all panel elements?", () => {
			const inst = tutils.create("#mflick2", {
				circular : true
			});

			const elements = inst.getAllElements();

			expect(elements.length).to.equal(inst.$container.children.length);
		});
	});

	describe("isPlaying()", function() {
		tutils.hooks.run();

		const inst = tutils.create("#mflick3");

		// Then
		it("Must return 'false' when not animating", () => {
			expect(inst.isPlaying()).to.be.false;
		});

		it("During the animation must return 'true'", done => {
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: -100,
				deltaY: 0,
				duration: 1000
			}, () => {
				expect(inst.isPlaying()).to.be.true;
				done();
			});
		});
	});

	describe("next()", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick2-1", {
			circular : true
		});

		let nextElement = inst.getNextElement();

		// When
		inst.next(0);
		let element = inst.getElement();
		let value = `${inst._getBasePositionIndex() * 100}%`;

		// Then
		it("Moved to next panel correctly?", () => {
			expect(tutils.$getTransformValue(element).match(RegExp(value)) + "").to.equal(value);
		});
		it("The next element is what expected?", () => {
			expect(element[0]).to.equal(nextElement[0]);
		});
	});
	describe("prev() / next() with previewPadding", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick2-1", {
			circular : true,
			previewPadding: [40, 40],
		});

		const container = inst.getElement().parentElement;

		// Then
		it("children's length is double when children's length is 3 and previewPadding is not zero", () => {
			expect(container.children.length).to.be.equals(6);
		})
		it("prev()", () => {
			// When
			// 1 -> 3
			inst.prev(0);
			// direction is from left to right.
			const direction1 = inst._conf.touch.direction;
			// 3 -> 2
			inst.prev(0);
			// direction is from left to right.
			const direction2 = inst._conf.touch.direction;
			// Then
			expect(direction1).to.be.equals(Axes.DIRECTION_RIGHT);
			expect(direction2).to.be.equals(Axes.DIRECTION_RIGHT);
		});
		it("next()", () => {
			// When
			// 2 -> 3
			inst.next(0);
			// direction is from right to left
			const direction1 = inst._conf.touch.direction;
			// 3 -> 1
			inst.next(0);
			// direction is from right to left
			const direction2 = inst._conf.touch.direction;

			// Then
			expect(direction1).to.be.equals(Axes.DIRECTION_LEFT);
			expect(direction2).to.be.equals(Axes.DIRECTION_LEFT);
		});
	});
	describe("prev()", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick2-1", {
			circular : true
		});

		let prevElement = inst.getPrevElement();

		// When
		inst.prev(0);
		let element = inst.getElement();
		let value = (inst._getBasePositionIndex() * 100) +"%";

		// Then
		it("Moved to previous panel correctly?", () => {
			expect(tutils.$getTransformValue(element).match(RegExp(value)) + "").to.equal(value);
		});

		it("The previous element is what expected?", () => {
			expect(element.innerHTML).to.equal(prevElement.innerHTML);
		});
	});

	describe("prev() / next() - Animation", function() {
		tutils.hooks.run();

		// Given
		const resultMove = [];
		const resultElement = [];

		let handler = function(e) {
			let element = this.getElement();
			let value = (this._getBasePositionIndex() * 100) + "%";

			let html = element.innerHTML;
			let targetHtml = (nextElement.length ? nextElement : prevElement).shift().innerHTML;

			resultMove.push((tutils.$getTransformValue(element).match(RegExp(value)) + "") === value);
			resultElement.push(html === targetHtml);
		};

		const inst = [
				tutils.create("#mflick1", { circular : true }, { flickEnd: handler }),
				tutils.create("#mflick2", { circular : true }, { flickEnd: handler }),
				tutils.create("#mflick2-1", { circular : true }, { flickEnd: handler }),
				tutils.create("#mflick3-1", { circular : true }, { flickEnd: handler })
			];

		const nextElement = [ inst[0].getNextElement(), inst[1].getNextElement() ];
		const prevElement = [ inst[2].getPrevElement(), inst[3].getPrevElement() ];

		it("Panel moved correctly?", done => {
			inst[0].next();
			inst[1].next(100);

			setTimeout(() => {
				expect(resultMove.indexOf(false) === -1).to.be.true;
				expect(resultElement.indexOf(false) === -1).to.be.true;
				done();
			}, 200)
		});

		it("The previous/next element is what expected?", done => {
			inst[2].prev();
			inst[3].prev(300);

			setTimeout(() => {
				expect(resultMove.indexOf(false) === -1).to.be.true;
				expect(resultElement.indexOf(false) === -1).to.be.true;
				done();
			}, 400)
		});
	});

	describe("enableInput() / disableInput()", function() {
		tutils.hooks.run();

		it("Input action should be disabled.", () => {
			let isEventFired = false;

			const inst = tutils.create("#mflick1", null, {
				flick: () => isEventFired = true
			});

			inst.disableInput();

			tutils.simulator(inst.$wrapper, {
				deltaX: -70
			}, () => {
				expect(isEventFired).to.be.false;
			});
		});

		it("Input action should be enabled.", () => {
			let isEventFired = false;

			const inst = tutils.create("#mflick2", null, {
				flick: () => isEventFired = true
			});

			inst.disableInput();
			inst.enableInput();

			tutils.simulator(inst.$wrapper, {
				deltaX: -70
			}, () => {
				expect(isEventFired).to.be.true;
			});
		});
	});

	describe("getStatus()", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick2", {
			circular : true
		});

		// Then
		it("The method was invoked correctly?", () => {
			const status = inst.getStatus();

			expect(status.panel && status.$list).to.be.ok;
		});

		it("Returned stringified value?", () => {
			const status = inst.getStatus(true);

			expect(typeof status).to.be.equal("string");
		});
	});

	describe("setStatus()", function() {
		tutils.hooks.run();

		const inst = tutils.create("#mflick2", {
			circular : true
		});

		inst.next(0);
		const status = inst.getStatus(true);
		const panel = inst.getElement();
		const currPanel = {
			style: panel.style.cssText,
			className: panel.className,
			html: panel.innerHTML
		};

		it("Has been set status value correctly?", () => {
			inst.next(0);
			inst.setStatus(status);

			expect(currPanel.className).to.be.equal(inst.getElement().className);
			expect(currPanel.html).to.be.equal(inst.getElement().innerHTML);
		});

		it("Panel content is same as expected?", () => {
			const el = inst.getElement();

			expect(el.innerHTML).to.be.equal(currPanel.html);
		});

		it("Panel moved correctly after '.setStatus()' call?", () => {
			inst.moveTo(2,0);

			expect(inst.getElement().innerHTML.indexOf("Layer 2") > -1).to.be.ok;
		});
	});


	describe("plugin()", function() {
		tutils.hooks.run();

		const inst = tutils.create("#mflick2", {
			circular : true
		}).plugin([
			new OpacityEffect("p")
		]);

		it("Plugin has been registered?", () => {
			expect(inst.plugins.length === 1).to.be.ok;
			expect(inst.plugins[0] instanceof OpacityEffect).to.be.ok;
		});
	});

	describe("destroy()", function() {
		tutils.hooks.run();

		// Given
		let isEventFired = false;

		const $el = tutils.createFixture("#mflick1");
		const $container = $el.querySelector(".eg-flick-container");
		const $panel = [].slice.call(($container ? $container : $el).children);

		const origPanelStyle = {
			wrapper: {
				className: $el.getAttribute("class") || "",
				style: $el.getAttribute("style") || ""
			},
			container: {
				className: ($container && $container.getAttribute("class")) || "",
				style: ($container && $container.getAttribute("style")) || ""
			},
			list: $panel.map(v => {
				return {
					className: v.getAttribute("class") || "",
					style: v.getAttribute("style") || ""
				};
			})
		};

		const inst = tutils.create($el, {
			defaultIndex: 2,
			circular: true
		}, () => isEventFired = true);

		const containerClassName = inst.$container.getAttribute("class");

		// When
		inst.destroy();

		it("Check if instance was destroyed.", done => {
			tutils.simulator($el, {
				deltaX: -70
			}, () => {
				expect(isEventFired).to.be.false;  // Input action should be disabled
				expect($el.getAttribute("class") || "").to.equal(origPanelStyle.wrapper.className);  // Wrapper element class has been restored?
				expect($el.getAttribute("style") || "").to.equal(origPanelStyle.wrapper.style);  // Wrapper element style has been restored?

				if ($container) {
					// container element has been restored?
					expect($container.getAttribute("class")).to.equal(origPanelStyle.container.className);
					expect($container.getAttribute("style")).to.equal(origPanelStyle.container.style);
				} else {
					expect($el.querySelector(`.${containerClassName}`)).to.be.null; // Container element was removed?
				}

				$panel.forEach((v, i) => {
					expect(v.getAttribute("class") || "").to.equal(origPanelStyle.list[i].className);  // Panel element class has been restored?
					expect(v.getAttribute("style") || "").to.equal(origPanelStyle.list[i].style);  // Panel element style has been restored?
				});

				// check for the resources release
				for(var x in inst) {
					expect(inst[x]).to.be.null; // is released?
				}

				done();
			});
		});

		// Given
		const $el2 = tutils.createFixture("#mflick2");
		const panelCount = $el2.children.length;

		const inst2 = tutils.create($el2, {
			previewPadding: 10,
			circular: true
		});

		// When
		inst2.destroy();

		// Then
		it("Removed cloned panel elements?", () => {
			expect(panelCount).to.equal($el2.children.length);
		});

		it("Check for inputType unique key", () => {
			let has = false;

			for (let x in $el2) {
				if (!/event(Fired|Direction)/.test(x) && $el2.hasOwnProperty(x)) {
					has = true;
					break;
				}
			}

			expect(has).to.be.false;
		});
	});

	describe("rebuild()", function() {
		tutils.hooks.run();

		it("Should rebuild panels after panel update", () => {
			// Given
			const inst = tutils.create("#mflick1", {
				circular : true,
				previewPadding: [30, 50]
			});

			const container = inst.$wrapper.children[0];

			// When
			container.innerHTML = `
			<div style="background-color:#CC66CC">
				<p>Layer 0</p>
			</div>
			<div style="background-color:#66cccc">
				<p>Layer 1</p>
			</div>
			<div style="background-color:#ffc000">
				<p>Layer 2</p>
			</div>
			<div style="background-color:green">
				<p>Layer 3</p>
			</div>
			<div style="background-color:maroon">
				<p>Layer 4</p>
			</div>
			`;

			inst.rebuild({defaultIndex: 2});

			// Then
			expect(container.children.length).to.equal(10);
			expect(container.querySelectorAll(".eg-flick-clone").length).to.equal(5);
			expect(inst.getIndex()).to.equal(2);

			inst.destroy();
		});
	});
});

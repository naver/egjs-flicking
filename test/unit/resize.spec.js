/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/*eslint-disable */
import {utils} from "../../src/utils";
import tutils from "./assets/utils";

describe("resize() method", function() {
	describe("Check for panel resize", function() {
		tutils.hooks.run();

		// Given
		it("Panel size", () => {
			const $el = tutils.createFixture("#mflick1");
			const width = utils.css($el, "width", true);

			const inst = tutils.create($el, {
				defaultIndex: 2
			});

			let panel = inst._conf.panel;
			let oldCoordMax = inst._axesInst.axis.flick.range[1];

			// When
			$el.style.width = `${width + 50}px`;

			// The panel width is less than the current wrapper size
			expect(panel.size < utils.css($el, "width", true)).to.be.true;

			// When
			inst.resize();
			const maxPosX = panel.size * ( panel.count - 1 );

			// Current container element is in right position?
			expect(+tutils.$getTransformValue(inst.$container, true)).to.equal(maxPosX);

			// Max coord value has been set correctly?
			expect(maxPosX).to.deep.equal(inst._axesInst.axis.flick.range[1]);

			// The panel width should be same as current wrapper element
			expect(panel.size).to.deep.equal(utils.css($el, "width", true));

			// The panel container width should be same as current panel element width
			expect(utils.css(inst.$container, "width", true)).to.deep.equal(panel.size);

			// Should be updated Axes' 'max' options value
			expect(oldCoordMax).to.not.deep.equal(inst._axesInst.axis.flick.range[1]);
		});
	});

	describe("When change padding option", function() {
		tutils.hooks.run();

		let padding;

		var setCondition = function (inst, val) {
			inst.options.previewPadding = val;
			inst.resize();

			padding = inst.$wrapper.style.padding.split(" ").map(v => parseInt(v));

			// get current padding value
			if (padding.length === 1) {
				padding = [padding[0],padding[0]];
			} else if (inst.options.horizontal) {
				padding = padding.length === 2 ?
					[padding[1], padding[1]] : [padding[3], padding[1]];
			} else {
				padding = padding.length === 2 ?
					[padding[0], padding[0]] : [padding[0], padding[2]];
			}
		};

		let runTest = function (inst, val, horizontal) {
			expect(padding).to.deep.equal(val);  // Padding value changed?

			let panel = inst._conf.panel;
			let panelSize, top;
			const max = inst._axesInst.axis.flick.range[1];
			const coord = inst._axesInst.get().flick;

			if (horizontal) {
				panelSize = utils.css(panel.$list[0], "width", true);
			} else {
				panelSize = utils.css(panel.$list[0], "height", true);
				top = parseInt(utils.css(inst.$container, "top", true));
			}

			// Max coord value has been set correctly?
			expect(max).to.equal(panel.size * (panel.count - 1));

			// The panel width should be same as current wrapper element
			expect(panelSize).to.equal(panel.size);

			// Current Axes's value has been set correctly?
			expect(coord).to.equal(panel.size * panel.index);

			// Container's top value has been set correctly?
			top && expect(val[0]).to.equal(top);
		};

		it("Padding #1", () => {
			const inst = tutils.create("#mflick1", {
				circular: true,
				previewPadding: [10, 10]
			});

			setCondition(inst, [20, 20]);
			runTest(inst, [20, 20], true);

			setCondition(inst, [20,30]);
			runTest(inst, [20,30], true);

			setCondition(inst, [0,20]);
			runTest(inst, [0,20], true);

			setCondition(inst, [0,0]);
			runTest(inst, [0,0], true);
		});

        it("Padding #2", () => {
			const inst = tutils.create("#mflick2", {
					circular: true,
					previewPadding: [10, 10],
					horizontal: false
				});

			setCondition(inst, [20,20]);
			runTest(inst, [20,20]);

			setCondition(inst, [10,20]);
			runTest(inst, [10,20]);
		 });
	});

	describe("Calling .resize() during panel moves", function(assert) {
		// Given
		const inst = tutils.create("#mflick1", {
			circular: true
		});

		// When
		inst.next();

		expect(inst.resize()).to.not.throw;
	});
});

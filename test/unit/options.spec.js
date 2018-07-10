/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/*eslint-disable */
import {utils} from "../../src/utils";
import tutils from "./assets/utils";

describe("Setting options", function() {
	describe("circular", function() {
		tutils.hooks.run();

		it("Is not circular?", () => {
			const inst = tutils.create("#mflick1");
			inst.moveTo(inst._conf.panel.origCount - 1,0);

			expect(inst.getElement().nextElementSibling).to.be.equal(null);
		});

		it("Is circular?", () => {
			const inst = tutils.create("#mflick2", { circular : true });
			inst.moveTo(inst._conf.panel.origCount - 1,0);

			expect(inst.getNextElement()).to.be.ok;
		});

		it("When panel elements are not enough, should be added cloned elements", () => {
			const inst = tutils.create("#mflick2-1", { circular : true });
			expect(inst._conf.panel.count > inst._conf.panel.origCount).to.be.ok;
		});

		it("Is circular?", () => {
			const inst = tutils.create("#mflick3", { circular : true, horizontal : false });
			inst.moveTo(inst._conf.panel.origCount - 1,0);

			expect(inst.getNextElement()).to.be.ok;
		});
	});

	describe("previewPadding - horizontal", function() {
		tutils.hooks.run();

		// Given
		let inst = tutils.create("#mflick3", {
			circular : true,
			previewPadding : [ 50, 70 ]
		});

		let padding = inst.options.previewPadding;
		let right = utils.css(inst.$wrapper, "padding-right", true);
		let left = utils.css(inst.$wrapper, "padding-left", true);
		let wrapperWidth = utils.css(inst.$wrapper, "width", true);
		let panelWidth = utils.css(inst.$container.children[0], "width", true);

		// Then
		it("Preview padding value applied correctly?", () => {
			expect(left === padding[0] && right === padding[1]).to.be.ok;
		});

		it("Each panel's width should be same as wrapper element's width", () => {
			expect(wrapperWidth).to.be.equal(panelWidth + right + left);
		});
	});

	describe("previewPadding - vertical", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick3", {
			circular : true,
			horizontal : false,
			previewPadding : [ 15, 10 ]
		});

		const padding = inst.options.previewPadding;
		const paddingTop = utils.css(inst.$wrapper, "padding-top", true);
		const paddingBottom = utils.css(inst.$wrapper, "padding-bottom", true);
		const wrapperHeight = utils.css(inst.$wrapper, "height", true);
		const panelHeight = utils.css(inst.$container.children[0], "height", true);

		// Then
		it("Preview padding value applied correctly?", () => {
			expect(paddingTop === padding[0] && paddingBottom === padding[1]).to.be.true;
		});

		it("Each panel's height should be same as wrapper element's height", () => {
			expect(wrapperHeight).to.be.equal(panelHeight + paddingTop + paddingBottom);
		});
	});

	describe("previewPadding - with different unit value", function() {
		tutils.hooks.run();

		// Given
		let inst = tutils.create("#mflick3", {
			circular : true,
			previewPadding : [ "10%", "70px" ]
		});

		let padding = inst.options.previewPadding;
		let right = inst.$wrapper.style.paddingRight;
		let left = inst.$wrapper.style.paddingLeft;

		// Then
		it("Preview padding value with '%' and 'px', applied correctly?", () => {
			expect(left === padding[0] && right === padding[1]).to.be.ok;
		});

		// Given
		inst = tutils.create("#mflick1", {
			circular : true,
			previewPadding : "20%"
		});

		padding = inst.options.previewPadding;
		right = inst.$wrapper.style.paddingRight;
		left = inst.$wrapper.style.paddingLeft;

		// Then
		it("Preview padding value applied as single '%' value", () => {
			expect(left === padding[0] && right === padding[1]).to.be.ok;
		});
	});

	describe("bounce", function() {
		tutils.hooks.run();

		it("Bounce value set correctly?", () => {
			const bounce = 50;
			const inst = tutils.create("#mflick3", { bounce : bounce });

			expect(inst.options.bounce).to.deep.equal([bounce, bounce]);
		});

		it("Bounce value set correctly?", () => {
			const bounce = [ 15, 20 ];
			const inst = tutils.create("#mflick3-1", { bounce : bounce });

			expect(inst.options.bounce).to.deep.equal(bounce);
		});
	});

	describe("bounce - left/up", function() {
		tutils.hooks.run();

		// Given
		let bounce = [ 50, 70 ];
		let depaPos;

		// When
		it("Left bounce distance is correct?", done => {
			const inst = tutils.create("#mflick1", { bounce : bounce }, {
				beforeRestore: e => {
					depaPos = e.depaPos
				}
			});

			tutils.simulator(inst.$wrapper, {
					pos: [0, 0],
					deltaX: 250,
					deltaY: 0
				}, () => {
					expect(depaPos).to.equal(-bounce[0]);
					done();
				});
			});

		// When
		it("Up bounce distance is correct?", done => {
			const inst = tutils.create("#mflick2", {
				bounce : bounce,
				horizontal: false
			}, {
				beforeRestore: e => depaPos = e.depaPos
			});

			tutils.simulator(inst.$wrapper, {
					pos: [0, 0],
					deltaX: 0,
					deltaY: 250
				}, () => {
					expect(depaPos).to.equal(-bounce[0]);
					done();
				});
		});
	});

	describe("bounce - right/down", function() {
		tutils.hooks.run();

		// Given
		let bounce = [ 50, 70 ];
		let depaPos, depaPos2;

		const inst1 = tutils.create("#mflick1", {
				bounce : bounce,
				defaultIndex: 2
			}, {
				beforeRestore: e => depaPos = e.depaPos
			});

		const inst2 = tutils.create("#mflick2", {
				bounce : bounce,
				defaultIndex: 2,
				horizontal: false
			}, {
				beforeRestore: e => depaPos2 = e.depaPos
			});

		const max1 = inst1._axesInst.axis.flick.range[1];

		it("Right bounce distance is correct?", done => {
			// When
			tutils.simulator(inst1.$wrapper, {
				pos: [0, 0],
				deltaX: -250,
				deltaY: 0
			}, () => {
				// Then
				expect(depaPos === max1 + bounce[1]).to.be.ok;
				done();
			});
		});

		const max2 = inst2._axesInst.axis.flick.range[1];

		it("Down bounce distance is correct?", done => {
			// When
			tutils.simulator(inst2.$wrapper, {
					pos: [100, 50],
					deltaX: 0,
					deltaY: -250
				}, () => {
					// Then
					expect(depaPos2 === max2 + bounce[1]).to.be.ok;
					done();
				});
		});
	});

	 describe("threshold #1 - (horizontal) when moved more than threshold pixels", function() {
		 tutils.hooks.run();

		 // Given
		 let changedPanelNo = 0;

		 const inst = tutils.create("#mflick2", {
				 circular : true,
				 threshold : 80
			}, {
				flickEnd: e => {
					changedPanelNo = e.no;
				}
		    });

		 let panelNo = inst._conf.panel.no;

		it("Moved to next panel?", done => {
			// When
			tutils.simulator(inst.$wrapper, {
				 pos: [0, 0],
				 deltaX: -100,
				 deltaY: 0
			}, () => {
				// Then
				setTimeout(() => {
					expect(panelNo + 1).to.equal(changedPanelNo);
					done();
				}, 500);
			});
		});
	 });

	describe("threshold #2 - (vertical) when moved more than threshold pixels", function() {
		tutils.hooks.run();

		// Given
		let changedPanelNo = 0;
		const inst = tutils.create("#mflick2", {
				circular : true,
				horizontal : false,
				threshold : 20
			}, {
				flickEnd : e => changedPanelNo = e.no
			});

		let panelNo = inst._conf.panel.no;

		it("Moved to next panel?", done => {
			// When
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: 0,
				deltaY: -100
			}, () => {
				// Then
				setTimeout(() => {
					expect(panelNo + 1).to.deep.equal(changedPanelNo);
					done();
				}, 500);
			});
		});
	});

	describe("threshold #3 - (horizontal) when moved less than threshold pixels", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick2", {
				circular : true,
				threshold : 80
			}, {
				flickEnd: e => panelNo = e.no
			});

		let panelNo = inst._conf.panel.no;

		it("Not moved to next panel?", done => {
			// When
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: -70,
				deltaY: 0
			}, () => {
				// Then
				expect(inst._conf.panel.no).to.deep.equal(panelNo);
				done();
			});
		});
	});

	describe("threshold #4 - (vertical) when moved less than threshold pixels", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick2", {
					circular : true,
					horizontal : false,
					threshold : 20
				}, {
				flickEnd: e =>panelNo = e.no
			});

		let panelNo = inst._conf.panel.no;

		it("Not moved to next panel?", done => {
			// When
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: 0,
				deltaY: -10
			}, () => {
				// Then
				expect(inst._conf.panel.no).to.deep.equal(panelNo);
				done();
			});
		});
	});

	describe("defaultIndex", function() {
		tutils.hooks.run();

		// Given
		const defaultIndex = 3;
		const inst = tutils.create("#mflick3", {
			circular : true,
			defaultIndex : defaultIndex
		});

		// Then
		it("The initial panel number should be "+ defaultIndex, () => {
			expect(inst._conf.panel.no).to.equal(defaultIndex);
		});
	});

	describe("hwAccelerable", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick3", {
				hwAccelerable: true,
				defaultIndex: 1
			});

		const container = inst.$container;
		const panel = inst._conf.panel.$list[0];

		[container, panel].forEach(v => {
			// Then
			it("HW Acceleration css property is present in the element?", () => {
				const prop = v.style.willChange === "transform";
				const transform = tutils.$getTransformValue(v).indexOf("3d") >= 0;

				expect(prop || transform).to.be.true;
			});
		});
	});

	describe("adaptiveHeight", function() {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick4", {
				adaptiveHeight: true,
				circular: true
			});

		// Then
		let runTest = () => {
			for (let i = 0; i < inst._conf.panel.count; i++) {
				let panelHeight = utils.css(inst.getElement(), "height", true);

				// PhantomJS env can't get computed value properly. If so, just skip
				if (!panelHeight) {
					continue;
				}

				// Should update wrapper's height according to each panel's height
				expect(panelHeight).to.be.equal(utils.css(inst.$wrapper, "height", true));

				inst.next(0);

				// Should cache each panel's height to first element
			    expect(panelHeight).to.be.equal(
			        Number(inst.getPrevElement().children[0].getAttribute("data-height"))
			    );
			}

			// When
			inst.moveTo(0, 0);

			// The container's height should be updated
			let containerHeight = utils.css(inst.$container, "height", true);

			if (!isNaN(containerHeight)) {
				const panel = inst.getElement().children[0];

				expect(utils.css(inst.$container, "height", true)).to.be.equal(
					Number(panel.getAttribute('data-height'))
				);

				let paddingMargin = 0;

				["Top", "Bottom"].forEach(dir => {
					["margin", "padding"].forEach(v => {
						paddingMargin += utils.css(panel, `${v}${dir}`, true);
					});
				});

				expect(containerHeight).to.be.equal(utils.css(panel, "height", true) + paddingMargin);
			}
		};

		it("Check for height update", () => {
			runTest();
		});

		it("Rotate case", () => {
			inst.$wrapper.setAttribute("style", "font-size:52px");

			inst.resize();
			runTest();
		});
	});

	describe("thresholdAngle", function() {
		tutils.hooks.run();

		let changedPanelNo = 0;
		const inst = tutils.create("#mflick3", {
			circular: true,
			threshold: 30,
			thresholdAngle: 15
		}, {
			flickEnd: e => {
				changedPanelNo = e.no;
			}
		});

		it("Panel should not be changed.", done => {
			// When
			tutils.simulator(inst.$wrapper, {
				pos: [100, 0],
				deltaX: -100,
				deltaY: 30,
				duration: 300
			}, () => {
				setTimeout(() => {
					expect(changedPanelNo).to.equal(0);
					done();
				}, 300);
			});
		});

		it("Panel should be changed.", done => {
			// When
			tutils.simulator(inst.$wrapper, {
				pos: [100, 0],
				deltaX: -100,
				deltaY: 10,
				duration: 300
			}, () => {
				setTimeout(() => {
					expect(changedPanelNo).to.equal(1);
					done();
				}, 300);
			});
		});
	});

	describe("zIndex", () => {
		tutils.hooks.run();

		// Given
		const zIndex = 100;
		const inst = tutils.create("#mflick3", {
			zIndex
		});

		// Then
		it(`The z-index for container should be ${zIndex}`, () => {
			expect(+inst.options.zIndex).to.be.equal(zIndex);
			expect(+inst.$container.style.zIndex).to.be.equal(zIndex);
		});
	});


	describe("useTranslate", () => {
		tutils.hooks.run();

		// Given
		const inst = tutils.create("#mflick1", {
			circular: true,
			useTranslate: false
		});
		const panelSize = inst._conf.panel.size;

		inst.$wrapper.style.width = "68.321%";
		inst.resize();

		it("check for panel width set to float number", () => {
			const width = panelSize * parseFloat(inst.$wrapper.style.width) / 100;
			const size = inst._conf.panel.size;

			expect(width).to.be.closeTo(size, 0.5);
			expect(size % 1 === 0).to.be.false;  // is float number?
		});

		// Then
		it("Panel move method should be based on top/left", () => {
			const panelSize = inst._conf.panel.size;
			const checkPanelLeft = $list => {
				$list.forEach((v, i) => {
					expect(parseFloat(v.style.left)).to.be.closeTo(panelSize * i, 0.5);
				});
			}

			expect(inst.$container.style.left).to.not.be.equal("0px");

			checkPanelLeft(inst._conf.panel.$list);
			inst.next(0);
			checkPanelLeft(inst._conf.panel.$list);
		});
	});
});

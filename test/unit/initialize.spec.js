/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/*eslint-disable */
import {utils} from "../../src/utils";
import tutils from "./assets/utils";

describe("Initialization", function() {
	describe("Check for the initialization", function() {
		tutils.hooks.run();

		// Then
		it("Then panel container was added and the width is same as wrapper element.", () => {
			const inst = tutils.create("#mflick1");

			expect(utils.css(inst.$container, "width", true))
				.to.deep.equal(utils.css(inst.$container.parentNode, "width", true));

			// The panel should maintain same width as wrapper element
			expect(inst._conf.panel.size)
				.to.equal(utils.outerWidth(inst._conf.panel.$list[0]));
		});

		it("Then panel container was added and the height is same as wrapper element.", () => {
			const inst = tutils.create("#mflick2", {horizontal: false});

			expect(utils.css(inst.$container, "height", true))
				.to.deep.equal(utils.css(inst.$container.parentNode, "height", true));

			// The panel should maintain same height as wrapper element
			expect(inst._conf.panel.size)
				.to.equal(utils.outerHeight(inst._conf.panel.$list[0]));
		});

		it("The given DOM is used as container element?", () => {
			// https://github.com/naver/egjs/issues/216
			const $wrapper = tutils.createFixture("#mflick1-1");
			const $container = $wrapper.querySelector(":first-child");
			$container.setAttribute("id", "container");

			const inst = tutils.create($wrapper);


			expect($container.getAttribute("id"))
				.to.equal(inst.$container.getAttribute("id"));

			// Then panel container was added and the width is same as wrapper element
			expect(utils.css(inst.$container, "width", true))
				.to.deep.equal(utils.css(inst.$container.parentNode, "width", true));
		});
	});
});

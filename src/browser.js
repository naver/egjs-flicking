/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable no-new-func, no-nested-ternary */

let win;

if (typeof window === "undefined") {
	// window is undefined in node.js
	win = {
		document: {},
		navigator: {
			userAgent: ""
		}
	};
} else {
	win = window;
}
/* eslint-enable no-new-func, no-nested-ternary */

const document = win.document;

export {
	win as window,
	document
};

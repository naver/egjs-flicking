// doc, global import
import {window as global, document as doc} from "./browser";

// define custom events name
const EVENTS = {
	beforeFlickStart: "beforeFlickStart",
	beforeRestore: "beforeRestore",
	flick: "flick",
	flickEnd: "flickEnd",
	restore: "restore"
};

// check for css transform support
const SUPPORT_TRANSFORM = (() => {
	const style = doc.documentElement.style;

	return "transform" in style || "webkitTransform" in style;
})();

// check for will-change support
const SUPPORT_WILLCHANGE = global.CSS && global.CSS.supports &&
	global.CSS.supports("will-change", "transform");

// check for Android 2.x
const IS_ANDROID2 = /Android 2\./.test(navigator.userAgent);

// data-height attribute's name for adaptiveHeight option
const DATA_HEIGHT = "data-height";

export {
	EVENTS,
	SUPPORT_TRANSFORM,
	SUPPORT_WILLCHANGE,
	IS_ANDROID2,
	DATA_HEIGHT
};

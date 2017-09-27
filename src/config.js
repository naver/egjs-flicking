/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
// internal config values
const CONFIG = {
	panel: {
		$list: null,        // panel list
		index: 0,			// dom index used among process
		no: 0,				// panel no used among process
		currIndex: 0,       // current physical dom index
		currNo: 0,          // current logical panel number
		size: 0,			// panel size
		count: 0,			// total physical panel count
		origCount: 0,		// total count of given original panels
		changed: false,		// if panel changed
		animating: false,	// current animating status boolean
		minCount: 3         // minimum panel count
	},
	touch: {
		holdPos: 0,         // hold x,y coordinate
		destPos: 0,	        // destination x,y coordinate
		distance: 0,		// touch distance pixel of start to end touch
		direction: null,	// touch direction
		lastPos: 0,			// to determine move on holding
		holding: false,
		isTrusted: false    // if event was instantiated by user's action explicitly
	},
	customEvent: {          // for custom events value
		flick: true,
		restore: false,
		restoreCall: false
	},
	dirData: [],			// direction constant value according horizontal or vertical
	indexToMove: 0,
	$dummyAnchor: null      // For buggy link highlighting on Android 2.x
};


// default options
const OPTIONS = {
	hwAccelerable: true,    // ns.isHWAccelerable(),  // check weather hw acceleration is available
	prefix: "eg-flick",     // prefix value of class name
	deceleration: 0.0006,   // deceleration value
	horizontal: true,       // move direction (true == horizontal, false == vertical)
	circular: false,        // circular mode. In this mode at least 3 panels are required.
	previewPadding: null,   // preview padding value in left(up) to right(down) order. In this mode at least 5 panels are required.
	bounce: null,           // bounce value in left(up) to right(down) order. Works only in non-circular mode.
	threshold: 40,          // the distance pixel threshold value for change panel
	duration: 100,          // duration ms for animation
	panelEffect: x => 1 - Math.pow(1 - x, 3),  // easing function for panel change animation
	defaultIndex: 0,        // initial panel index to be shown
	inputType: [            // input type
		"touch", "mouse"
	],
	thresholdAngle: 45,     // the threshold value that determines whether user action is horizontal or vertical (0~90)
	adaptiveHeight: false   // Set container's height be adaptive according panel's height
};

export {
	CONFIG,
	OPTIONS
};

var count = 1;

function handler(e) {
	var log = document.getElementById("log");

	if(handler.end) {
		log.innerHTML = "";
		count = 1;
	}

	log.innerHTML = (count++) +": <span class=red>"+ e.eventType +"</span> event fired.<br>"+ log.innerHTML;
	handler.end = /^(flickEnd|restore)$/.test(e.eventType);
}

var f4 = new eg.Flicking("#mflick4", {
	circular: true,
	duration: 300,
	threshold: 70
}).on({
	beforeFlickStart: handler,
	flick: handler,
	flickEnd: handler,
	beforeRestore: handler,
	restore: handler
});


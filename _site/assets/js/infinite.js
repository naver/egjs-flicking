var f5 = new eg.Flicking("#mflick5", {
	duration : 200,
	hwAccelerable : true,
	threshold : 70,
	circular: true
}).on({
	flickEnd: function(e) {
		var direction = e.direction;
		if (direction === 2) {
			df.appendChild(this.getNextElement().firstChild);
			this.getNextElement().appendChild(df.firstChild);
		} else if(direction === 4) {
			df.insertBefore(this.getPrevElement().firstChild, df.firstChild);
			this.getPrevElement().appendChild(df.lastChild);
		}
	}
});

var df = document.createDocumentFragment();
for(var i = 0; i <9999; i++) {
	df.appendChild($("<p>panel "+ i +"</p>")[0]);
}

f5.getElement().appendChild(df.firstChild);
f5.getPrevElement().appendChild(df.lastChild);
f5.getNextElement().appendChild(df.firstChild);
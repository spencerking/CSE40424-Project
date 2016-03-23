function gestures(hammertime, rightHammer, leftHammer) {

	hammertime.on('tap', function(ev) {
		console.log('tap');
	});
	hammertime.on('swipe', function(ev) {
		console.log('swipe');
	});
	hammertime.on('swipeleft', function(ev) {
		console.log('swipeleft');
		document.getElementById('test').style.backgroundColor = "red";
	});
	hammertime.on('swiperight', function(ev) {
		console.log('swiperight');
		document.getElementById('test').style.backgroundColor = "green";
	});
	hammertime.on('doubletap', function(ev) {
		console.log('doubletap');
	});
	hammertime.on('press', function(ev) {
		console.log('press');
	});

	// hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

	rightHammer.on('swipeleft', function(ev) {
		console.log('advance page');
		document.getElementById('ipad_background').style.backgroundColor = "red";
	});

	leftHammer.on('swiperight', function(ev) {
		console.log('move back page');
		document.getElementById('ipad_background').style.backgroundColor = "green";
	});

}
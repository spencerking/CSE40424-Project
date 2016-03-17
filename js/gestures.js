function gestures(hammertime) {

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
		console.log('press');
	});
	hammertime.on('doubletap', function(ev) {
		console.log('doubletap');
	});

	// hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

}
function gestures(rightHammer, leftHammer, bookHammer) {

	// Old test code, kept for now for basic examples
	// hammertime.on('tap', function(ev) {
	// 	console.log('tap');
	// });
	// hammertime.on('swipe', function(ev) {
	// 	console.log('swipe');
	// });
	// hammertime.on('swipeleft', function(ev) {
	// 	console.log('swipeleft');
	// 	document.getElementById('test').style.backgroundColor = "red";
	// });
	// hammertime.on('swiperight', function(ev) {
	// 	console.log('swiperight');
	// 	document.getElementById('test').style.backgroundColor = "green";
	// });
	// hammertime.on('doubletap', function(ev) {
	// 	console.log('doubletap');
	// });
	// hammertime.on('press', function(ev) {
	// 	console.log('press');
	// });

	// hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

	rightHammer.on('swipeleft', function(ev) {
		console.log('advance page');
		document.getElementById('ipad_background').style.backgroundColor = "red";
	});

	leftHammer.on('swiperight', function(ev) {
		console.log('move back page');
		document.getElementById('ipad_background').style.backgroundColor = "green";
	});

	bookHammer.on('tap', function(ev) {
		console.log('open Book');
		document.getElementById('main_page').style.visibility = "hidden";
		// document.getElementById('book_page').style.visibility = "visible";
		document.getElementById('bookmarks_bar').style.visibility = "visible";
		document.getElementById('right_bar').style.visibility = "visible";
		document.getElementById('left_bar').style.visibility = "visible";
		document.getElementById('book_title').style.display = "block";
	});
}
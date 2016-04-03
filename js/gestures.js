function gestures() {

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

	var myOptions = null;

	// swipe to advance to the net page
	var rightHammer = new Hammer(document.getElementById('right_bar'), myOptions);
	rightHammer.on('swipeleft', function(ev) { advance_page(); });

	// swipe to go back a page
	var leftHammer = new Hammer(document.getElementById('left_bar'), myOptions);
	leftHammer.on('swiperight', function(ev) { back_a_page(); });

	// books opening from homepage
	var bookElements = document.getElementsByClassName('book_img'); // Might not need to worry about generalizing this for the prototype
	var book0Hammer = new Hammer(bookElements[0], myOptions);
	var book1Hammer = new Hammer(bookElements[1], myOptions);
	var book2Hammer = new Hammer(bookElements[2], myOptions);
	book0Hammer.on('tap', function(ev) { open_book(); });
	book1Hammer.on('tap', function(ev) { open_book(); });
	book2Hammer.on('tap', function(ev) { open_book(); });
	
	// return to home page
	var homeHammer = new Hammer(document.getElementById('home_button'), myOptions);
	homeHammer.on('tap', function(ev) { go_to_home(); });
	
	// expand bookmarks_bar on swiping updateCommands
	var bookmarksHammer = new Hammer(document.getElementById('bookmarks_bar'), myOptions);
	bookmarksHammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	bookmarksHammer.on('swipeup', function(ev) { expand_bookmarks_bar(); });
	bookmarksHammer.on('swipedown', function(ev) { contract_bookmarks_bar(); });
}

function advance_page() {
	console.log('advance page');
	document.getElementById('book_page').style.backgroundColor = "red";
}

function back_a_page() {
	console.log('move back page');
	document.getElementById('book_page').style.backgroundColor = "green";	
}

function open_book() {
	console.log('open Book');
	document.getElementById('main_page').style.visibility = "hidden";
	document.getElementById('book_page').style.visibility = "visible";
	document.getElementById('right_bar').style.visibility = "visible";
	document.getElementById('left_bar').style.visibility = "visible";
	document.getElementById('bookmarks_bar').style.visibility = "visible";
	document.getElementById('header_title').innerHTML = "Sample Book";
}

function go_to_home() {
	console.log('return to home page')
	// basically just undo everything that open_book does 
	// NOTE: later will probably have to add more to remove settings if open, etc
	document.getElementById('main_page').style.visibility = "visible";
	document.getElementById('book_page').style.visibility = "hidden";
	document.getElementById('bookmarks_bar').style.visibility = "hidden";
	document.getElementById('right_bar').style.visibility = "hidden";
	document.getElementById('left_bar').style.visibility = "hidden";
	document.getElementById('header_title').innerHTML = "e(njoyable)Textbooks";
}

var bookmark_bar_expanded = 0;

function expand_bookmarks_bar() {
	if (bookmark_bar_expanded == 0) {
		console.log('expanding bookmarks bar upward');
		var bar = document.getElementById('bookmarks_bar').get
		$('#bookmarks_bar').animate({height: '+=10%'}, 300);
		bookmark_bar_expanded = 1;
	}
}

function contract_bookmarks_bar() {
	if (bookmark_bar_expanded == 1) {
		console.log('contracting bookmarks bar back to small size');
		$('#bookmarks_bar').animate({height: '-=10%'}, 300);
		bookmark_bar_expanded = 0;
	}
}
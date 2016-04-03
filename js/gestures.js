var curr_page = 1;
var max_pages = 4;

// http://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
function makeArrayOf(value, length) {
  var arr = [], i = length;
  while (i--) {
    arr[i] = value;
  }
  return arr;
}

var bookmarks_arr = makeArrayOf(0, max_pages); // [0, 0, 0, 0]


function gestures() {

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

	// tap the bookmark icon
	var markHammer = new Hammer(document.getElementById('bookmark'), myOptions);
	markHammer.on('tap', function(ev) {toggle_mark(); });
	
	// tap the highlight icon
	var highlightHammer = new Hammer(document.getElementById('highlighter'), myOptions);
	highlightHammer.on('tap', function(ev) {toggle_highlight(); });

	// tap a bookmark preview
	//getElementsByClass doesn't agree with Hammer.js
	var markPreview1Hammer = new Hammer(document.getElementById('bookmark1'), myOptions);
	markPreview1Hammer.on('tap', function(ev) {tap_bookmark_preview(1); });
	var markPreview2Hammer = new Hammer(document.getElementById('bookmark2'), myOptions);
	markPreview2Hammer.on('tap', function(ev) {tap_bookmark_preview(2); });
	var markPreview3Hammer = new Hammer(document.getElementById('bookmark3'), myOptions);
	markPreview3Hammer.on('tap', function(ev) {tap_bookmark_preview(3); });
	var markPreview4Hammer = new Hammer(document.getElementById('bookmark4'), myOptions);
	markPreview4Hammer.on('tap', function(ev) {tap_bookmark_preview(4); });
}

function advance_page() {
	console.log('advance page');
	if (curr_page+1 > max_pages) {
		console.log('page cannot be greater than max');
	}
	else {
		curr_page++;
		document.getElementById('page_number').innerHTML = curr_page;
		if (bookmarks_arr[curr_page-1] == 1) {
			bookmark_on(1);
		} else {
			bookmark_on(0);
		}
		console.log('curr_page is ' + curr_page);
	}
}

function back_a_page() {
	console.log('move back page');
	
	if (curr_page-1 < 1) {
		console.log('page must be above 1');
	}
	else {
		curr_page--;
		document.getElementById('page_number').innerHTML = curr_page;
		if (bookmarks_arr[curr_page-1] == 1) {
			bookmark_on(1);
		} else {
			bookmark_on(0);
		}
		console.log('curr_page is ' + curr_page);
	}	
}

function open_book() {
	console.log('open Book');
	if (bookmarks_arr[curr_page-1] == 1) {
		bookmark_on(1);
	} else {
		bookmark_on(0);
	}
	document.getElementById('main_page').style.visibility = "hidden";
	document.getElementById('book_page').style.visibility = "visible";
	document.getElementById('right_bar').style.visibility = "visible";
	document.getElementById('left_bar').style.visibility = "visible";
	document.getElementById('bookmarks_bar').style.opacity = "1";
	document.getElementById('header_title').innerHTML = "Sample Book";
	document.getElementById('page_number').innerHTML = curr_page;
}

function go_to_home() {
	console.log('return to home page')
	// basically just undo everything that open_book does 
	// NOTE: later will probably have to add more to remove settings if open, etc
	document.getElementById('main_page').style.visibility = "visible";
	document.getElementById('book_page').style.visibility = "hidden";
	document.getElementById('bookmarks_bar').style.opacity = "0";
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
		expand_bookmark_previews();
		bookmark_bar_expanded = 1;
	}
}

function expand_bookmark_previews() {
	console.log('expand previews');
	var i = 0;
	while (i < max_pages) {
		if (bookmarks_arr[i] == 1) {
			var j = i + 1;
			var str = 'bookmark' + j;
			document.getElementById(str).style.width = "50px";
		}
		i++;
	}
}

function contract_bookmarks_bar() {
	if (bookmark_bar_expanded == 1) {
		console.log('contracting bookmarks bar back to small size');
		$('#bookmarks_bar').animate({height: '-=10%'}, 300);
		bookmark_bar_expanded = 0;
	}
}

function contract_bookmark_previews() {
	console.log('contract previews');
	var i = 0;
	while (i < max_pages) {
		if (bookmarks_arr[i] == 1) {
			var j = i + 1;
			var str = 'bookmark' + j;
			document.getElementById(str).style.width = "20px";
		}
		i++;
	}
}

function toggle_mark() {
	contract_bookmarks_bar();
	if (bookmarks_arr[curr_page-1] == 0) {
		console.log('marking a page');
		bookmarks_arr[curr_page-1] = 1;
		bookmark_on(1);
	}
	else if (bookmarks_arr[curr_page-1] == 1) {
		console.log('unmarking a page');
		bookmarks_arr[curr_page-1] = 0;
		bookmark_on(0);
	}
}


// changes css to turn bookmark on if yes == 1 or off if yes == 0
function bookmark_on(yes) {
	if (yes) {
		document.getElementById('bookmark').src = 'images/bookmark_full.png';
		var str = "bookmark" + curr_page;
		document.getElementById(str).style.visibility = "visible";
	}
	else {
		document.getElementById('bookmark').src = 'images/bookmark.png';
		var str = "bookmark" + curr_page;
		document.getElementById(str).style.visibility = "hidden";
	}
}

var highlight_on = 0;
function toggle_highlight() {
	if (highlight_on == 0) {
		console.log('turning on highligher tool');
		highlight_on = 1;
		document.getElementById('highlighter').src = 'images/activated_notes.png';
	} else {
		console.log('turning off highlighter tool');
		highlight_on = 0;
		document.getElementById('highlighter').src = 'images/notes.png';
	}
	
}

function tap_bookmark_preview(page_num) {
	console.log('preview tapped');
	contract_bookmarks_bar();
	bookmarks_arr[curr_page-1] = 1;
	bookmark_on(1);
	curr_page = page_num;
	document.getElementById('page_number').innerHTML = curr_page;
}
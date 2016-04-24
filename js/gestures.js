var curr_page = 1;
var max_pages = 17;

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
	// NOTE: this commented out because the spacing of expanded bookmarks not figured out
	/*var bookmarksHammer = new Hammer(document.getElementById('bookmarks_bar'), myOptions);
	bookmarksHammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	bookmarksHammer.on('swipeup', function(ev) { expand_bookmarks_bar(); });
	bookmarksHammer.on('swipedown', function(ev) { contract_bookmarks_bar(); }); */

	// tap the bookmark icon
	var markHammer = new Hammer(document.getElementById('bookmark'), myOptions);
	markHammer.on('tap', function(ev) { tap_mark(); });
	//markHammer.on('press', function(ev) { hold_mark();});
	
	// tap the highlight icon
	var highlightHammer = new Hammer(document.getElementById('highlighter'), myOptions);
	highlightHammer.on('tap', function(ev) { toggle_highlight(); });

	// tap the settings icons
	var settingsHammer = new Hammer(document.getElementById('settings_button'), myOptions);
	settingsHammer.on('tap', function(ev) { toggle_settings(); });

	// tap the search icon
	var searchHammer = new Hammer(document.getElementById('search'), myOptions);
	searchHammer.on('tap', function(ev) { highlightSearch(); });

	// tap the notes page icon
	var notesHammer = new Hammer(document.getElementById('notebook'), myOptions);
	notesHammer.on('tap', function(ev) { toggle_notebook(); });
	// tap the back button on the notes page
	var backToBookHammer = new Hammer(document.getElementById('back_to_book'), myOptions);
	backToBookHammer.on('tap', function(ev) { toggle_notebook();});
	
	// tap the screenshot icon
	var screenshotHammer = new Hammer(document.getElementById('camera'), myOptions);
	screenshotHammer.on('tap', function(ev) { take_screenshot(); });
	
	// tap a bookmark preview
	//getElementsByClass doesn't agree with Hammer.js
	var markPreview1Hammer = new Hammer(document.getElementById('bookmark1'), myOptions);
	markPreview1Hammer.on('tap', function(ev) { tap_bookmark_preview(1); } );
	var markPreview2Hammer = new Hammer(document.getElementById('bookmark2'), myOptions);
	markPreview2Hammer.on('tap', function(ev) { tap_bookmark_preview(2); } );
	var markPreview3Hammer = new Hammer(document.getElementById('bookmark3'), myOptions);
	markPreview3Hammer.on('tap', function(ev) { tap_bookmark_preview(3); } );
	var markPreview4Hammer = new Hammer(document.getElementById('bookmark4'), myOptions);
	markPreview4Hammer.on('tap', function(ev) { tap_bookmark_preview(4); } );
	var markPreview5Hammer = new Hammer(document.getElementById('bookmark5'), myOptions);
	markPreview5Hammer.on('tap', function(ev) { tap_bookmark_preview(5); } );
	var markPreview6Hammer = new Hammer(document.getElementById('bookmark6'), myOptions);
	markPreview6Hammer.on('tap', function(ev) { tap_bookmark_preview(6); } );
	var markPreview7Hammer = new Hammer(document.getElementById('bookmark7'), myOptions);
	markPreview7Hammer.on('tap', function(ev) { tap_bookmark_preview(7); } );
	var markPreview8Hammer = new Hammer(document.getElementById('bookmark8'), myOptions);
	markPreview8Hammer.on('tap', function(ev) { tap_bookmark_preview(8); } );
	var markPreview9Hammer = new Hammer(document.getElementById('bookmark9'), myOptions);
	markPreview9Hammer.on('tap', function(ev) { tap_bookmark_preview(9); } );
	var markPreview10Hammer = new Hammer(document.getElementById('bookmark10'), myOptions);
	markPreview10Hammer.on('tap', function(ev) { tap_bookmark_preview(10); } );
	var markPreview11Hammer = new Hammer(document.getElementById('bookmark11'), myOptions);
	markPreview11Hammer.on('tap', function(ev) { tap_bookmark_preview(11); } );
	var markPreview12Hammer = new Hammer(document.getElementById('bookmark12'), myOptions);
	markPreview12Hammer.on('tap', function(ev) { tap_bookmark_preview(12); } );
	var markPreview13Hammer = new Hammer(document.getElementById('bookmark13'), myOptions);
	markPreview13Hammer.on('tap', function(ev) { tap_bookmark_preview(13); } );
	var markPreview14Hammer = new Hammer(document.getElementById('bookmark14'), myOptions);
	markPreview14Hammer.on('tap', function(ev) { tap_bookmark_preview(14); } );
	var markPreview15Hammer = new Hammer(document.getElementById('bookmark15'), myOptions);
	markPreview15Hammer.on('tap', function(ev) { tap_bookmark_preview(15); } );
	var markPreview16Hammer = new Hammer(document.getElementById('bookmark16'), myOptions);
	markPreview16Hammer.on('tap', function(ev) { tap_bookmark_preview(16); } );
	var markPreview17Hammer = new Hammer(document.getElementById('bookmark17'), myOptions);
	markPreview17Hammer.on('tap', function(ev) { tap_bookmark_preview(17); } );
	
	var bookContentHammer = new Hammer(document.getElementById('book_content'), myOptions);
	bookContentHammer.on('tap', function(ev) { toggle_icons_bookmarks_visibility(); });

	var progressHammer = new Hammer(document.getElementById('progress_indicator1'), myOptions);
	progressHammer.on('panright', function(ev) { drag_progress_right(); });
	progressHammer.on('panleft', function(ev) { drag_progress_left(); });
	
	$("#book_content").mouseup(function(ev) { highlight_text();});
	
}

function advance_page() {
	console.log('advance page');
	if (curr_page+1 > max_pages) {
		console.log('page cannot be greater than max');
	}
	else {
		curr_page++;
		update_page();
	}
}

function back_a_page() {
	console.log('move back page');
	
	if (curr_page-1 < 1) {
		console.log('page must be above 1');
	}
	else {
		curr_page--;
		update_page();
	}	
}

function update_page() {
	var audio = new Audio('sound/page_turn.wav');
	audio.play();
	
	document.getElementById('page_number').innerHTML = curr_page;
	if (bookmarks_arr[curr_page-1] == 1) {
		bookmark_on(1);
	} else {
		bookmark_on(0);
	}
	// make all pages invisible
	var p_content = document.getElementsByClassName('p_content');
	for (var i=0; i < p_content.length; i++) {
		p_content[i].style.display = "none";
	}
	// make correct page show up
	document.getElementById('p' + curr_page + '_content').style.display = "block";
	
	set_progress_indicator(curr_page);
	console.log('curr_page is ' + curr_page);
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
	document.getElementById('settings_page').style.visibility = "hidden";
	document.getElementById('bookmarks_bar').style.visibility = "visible";
	document.getElementById('bookmarks_bar').style.opacity = "1";
	set_progress_indicator(curr_page);
	document.getElementById('header_title').innerHTML = "Beyond Bedlam";
	document.getElementById('page_number').innerHTML = curr_page;
	if (icons_bookmarks_active == 1) {
		var icons = document.getElementsByClassName('icons');
		for (var i=0; i < icons.length; i++) {
			icons[i].style.visibility = "visible";
		}
		document.getElementById('search_field').style.visibility = "visible";		
	}
}

function set_progress_indicator(curr_page) {
	for (var i = 1; i <= max_pages; i++) {
		var progress_id = 'progress_indicator' + i;
		document.getElementById(progress_id).style.visibility = "hidden";
	}
	var progress_id = 'progress_indicator' + curr_page;
	if (curr_page > max_pages) return;
	document.getElementById(progress_id).style.visibility = "visible";	
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
	document.getElementById('settings_page').style.visibility = "hidden";
	document.getElementById('header_title').innerHTML = "e(njoyable)Textbooks";
	var icons = document.getElementsByClassName('icons');
	for (var i=0; i < icons.length; i++) {
		icons[i].style.visibility = "hidden";
	}
	document.getElementById('search_field').style.visibility = "hidden";
	if (highlight_on) toggle_highlight();
	if (notebook_active) toggle_notebook();
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
			// use y for percentage from left for the bookmark
			var y = i*10+15;
			document.getElementById(str).style.width = "50px";
			document.getElementById(str).style.left = y + '%';
		}
		i++;
	}
}

function contract_bookmarks_bar() {
	if (bookmark_bar_expanded == 1) {
		console.log('contracting bookmarks bar back to small size');
		$('#bookmarks_bar').animate({height: '-=10%'}, 300);
		contract_bookmark_previews();
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
			var y = i*20+10;
			document.getElementById(str).style.width = "20px";
			document.getElementById(str).style.left = y + '%';
		}
		i++;
	}
}

function tap_mark() {
	//contract_bookmarks_bar();
	if (bookmarks_arr[curr_page-1] == 0) {
		console.log('marking a page');
		bookmarks_arr[curr_page-1] = 1;
		bookmark_on(1);
		if (bookmark_bar_expanded == 1){
			expand_bookmark_previews();
		}
	}
	else if (bookmarks_arr[curr_page-1] == 1) {
		console.log('unmarking a page');
		bookmarks_arr[curr_page-1] = 0;
		bookmark_on(0);
	}
}

/*function hold_mark() {
	if (bookmarks_arr[curr_page-1] == 1) {
		console.log('unmarking a page');
		bookmarks_arr[curr_page-1] = 0;
		bookmark_on(0);
	}
}*/


// changes css to turn bookmark on if yes == 1 or off if yes == 0
function bookmark_on(yes) {
	// we could set a flag for which book is open to try and count bookmarks
	// or we could just not worry about it
	if (yes) {
		document.getElementById('bookmark').src = 'images/bookmark_full.png';
		// NOTE TEMPORARY SOLUTION
		if (curr_page > max_pages) return;
		var str = "bookmark" + curr_page;
		document.getElementById(str).style.visibility = "visible";
		//document.getElementById(str).style.display = "inline";
		//document.getElementById(str).style.opacity = 100;
		
	}
	else {
		document.getElementById('bookmark').src = 'images/bookmark.png';
		if (curr_page > max_pages) return;
		var str = "bookmark" + curr_page;
		document.getElementById(str).style.visibility = "hidden";
		//document.getElementById(str).style.display = "none";
		//document.getElementById(str).style.opacity = 0;
	}
}

var highlight_on = 0;
function toggle_highlight() {
	if (highlight_on == 0) {
		console.log('turning on highligher tool');
		//highlight_text();
		highlight_on = 1;
		document.getElementById('highlighter').src = 'images/activated_notes.png';
		
		$("#book_content").css("-webkit-user-select","text");
		//$("#book_content").css("-webkit-user-drag", "auto");
		//$("#book_content").css("-webkit-tap-highlight-color", "yellow");
		
	} else {
		console.log('turning off highlighter tool');
		highlight_on = 0;
		document.getElementById('highlighter').src = 'images/notes.png';
		$("#book_content").css("-webkit-user-select","none");

	}
	
}

function tap_bookmark_preview(page_num) {
	console.log('preview tapped');
	//contract_bookmarks_bar();
	bookmarks_arr[curr_page-1] = 1;
	bookmark_on(1);
	if (bookmark_bar_expanded == 1){
		expand_bookmark_previews();
	}
	curr_page = page_num;
	document.getElementById('page_number').innerHTML = curr_page;
	update_page();
	set_progress_indicator(curr_page);
}

var settings_active = 0;
function toggle_settings() {
	if (settings_active == 0) {
		document.getElementById('settings_page').style.visibility = "visible";
		settings_active = 1;
		if (highlight_on) toggle_highlight();
	}
	else if (settings_active == 1) {
		// return to previous page, either book or home screen
		document.getElementById('settings_page').style.visibility = "hidden";
		settings_active = 0;
	}
}

var notebook_active = 0;
function toggle_notebook() {
	if (notebook_active) {
		document.getElementById('notebook_page').style.visibility = "hidden";
		document.getElementById('back_to_book').style.visibility = "hidden";
		notebook_active = 0;
		console.log('notebook closed');
	}
	else {
		// return to the book
		document.getElementById('notebook_page').style.visibility = "visible";
		document.getElementById('back_to_book').style.visibility = "visible";
		notebook_active = 1;
		console.log('notebook opened');
	}
}

var icons_bookmarks_active = 1;
function toggle_icons_bookmarks_visibility() {
	if (icons_bookmarks_active == 1) {
		// need to turn them off
		console.log('turned off icon and bookmark visibility');
		if (bookmark_bar_expanded == 1) {
			$('#bookmarks_bar').animate({height: '-=15%'}, 300);
		} else {
			$('#bookmarks_bar').animate({height: '-=5%'}, 300);
		}
		var icons = document.getElementsByClassName('icons');
		for (var i=0; i < icons.length; i++) {
			icons[i].style.visibility = "hidden";
		}
		document.getElementById('search_field').style.visibility = "hidden";
		icons_bookmarks_active = 0;
		if(highlight_on) toggle_highlight();
	} else {
		// turn them back on
		console.log('turned on icon and bookmark visibility');
		if (bookmark_bar_expanded == 1) {
			$('#bookmarks_bar').animate({height: '+=15%'}, 300);
		} else {
			$('#bookmarks_bar').animate({height: '+=5%'}, 300);
		}
		var icons = document.getElementsByClassName('icons');
		for (var i=0; i < icons.length; i++) {
			icons[i].style.visibility = "visible";
		}
		document.getElementById('search_field').style.visibility = "visible";
		icons_bookmarks_active = 1;
	}
}

function highlight_text() {
	if (highlight_on) {
		var selection = window.getSelection();
		var range = selection.getRangeAt(0);
		var newNode = document.createElement("span");
		newNode.setAttribute("style", "background-color: yellow;");
		range.surroundContents(newNode);	
	}
}

function drag_progress_right() {
	console.log('drag right');
}

function drag_progress_left() {
	console.log('drag left');
}

// Based on http://jsfiddle.net/FutureWebDev/HfS7e/
function highlightSearch() {
	console.log("search");
    var text = document.getElementById("search_field").value;
    if (text == "class" || text == "id" || text == "p" || text == "div") {
    	console.log("can't search for html tags");
    }
    else {
    	var query = new RegExp("(\\b" + text + "\\b)", "gim");
	    var e = document.getElementById("book_content").innerHTML;
	    var enew = e.replace(/(<span>|<\/span>)/igm, "");
	    document.getElementById("book_content").innerHTML = enew;
	    var newe = enew.replace(query, "<span>$1</span>");
	    document.getElementById("book_content").innerHTML = newe;
    }

}

function take_screenshot() {
	var notebook = document.getElementById("notebook_content");
	notebook.innerHTML += "<br/><img class='screenshot' style='width:200px;border:1px solid;' src='images/bedlam_pg" + curr_page + ".png' />";
	// very messy, but this is the only way I could get the css to be applied correctly
	notebook.innerHTML += "<div contenteditable style='border: none;outline:none;width: 80%;margin-left: 24px;margin-right: 24px;text-align: left;height: auto;padding: 12px;'> </div>";
	toggle_notebook();
}
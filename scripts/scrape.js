function scrape(lvl) {
	var level = "?level=" + lvl,
		setId = "&set_id=" + getRandomInt(1, 9999999999),
		urlSfx = level + setId;
	NProgress.start();
	NProgress.inc();
	$.ajax({
		async: false,
		url: "http://view.websudoku.com/" + urlSfx,
		type: 'get',
		success: function(data) {
			var responseText = data.responseText;
			processResponseMessage(responseText, "cheat", $(".sudoku-numbers"));
			processResponseMessage(responseText, "editmask", $(".sudoku-mask"));
			populateGrid();
			NProgress.done();
			$(".sudoku-grid").addClass(urlSfx);
		}
	});
}

function populateGrid() {
	var mask = $(".sudoku-mask").attr("editmask"),
		numbers = $(".sudoku-numbers").attr("cheat");
	_.each($("td"), function(cell, iteration) {
		if(mask.charAt(iteration) == 0) {
			$(cell).html(numbers.charAt(iteration)).addClass("done")[0].possibleVals = numbers.charAt(iteration);
		} else {
			$(cell).addClass("not-complete")[0].possibleVals = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		}
	});
}

function processResponseMessage(responseText, selector, object) {
	var selectorIdx = responseText.indexOf(selector),
		valueIdx = responseText.indexOf("value", selectorIdx),
		startIdx = responseText.indexOf("\"", valueIdx)+1,
		endIdx = responseText.indexOf("\"", startIdx);
		
	var message = responseText.substring(startIdx, endIdx);
	object.attr(selector, message);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
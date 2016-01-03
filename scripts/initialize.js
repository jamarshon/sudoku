function initializeNumberContainers() {
	var numbers = $("<div/>").addClass("sudoku-numbers").appendTo($(".page-content")),
		mask = $("<div/>").addClass("sudoku-mask").appendTo($(".page-content"));
	
	scrape(getRandomInt(1, 4));
}

function initializeGrid(grid) {
	for(var row = 1; row < 10; row++) {
		var addedRow = $("<tr/>").appendTo(grid);
		for(var col = 1; col < 10; col++) {
			var sec = section(row, col);
			var cell = $("<td/>")
				 .addClass("row-" + row).attr("row", row)
				.addClass("col-" + col).attr("col", col)
				.addClass("sec-" + sec).attr("sec", sec);
			addedRow.append(cell);
		}
	}
}

function initializeCellEvents() {
	$("td").click(function(){ 
		if($(this).hasClass("done")) {
			var num = $(this).html(),
				sameNum = getNumber(num);
			$(".number").removeClass("number");
			$(sameNum).addClass("number");
		}
		$(".clicked").removeClass("clicked");
		getAllRelevantCells($(this)).addClass("clicked");
	}).hover(function(){ 
		$(".hovered").removeClass("hovered");
		getAllRelevantCells($(this)).addClass("hovered");
	});
}

function initializeButtons() {
	var buttonContainer = $("<div/>").addClass("button-container").appendTo($(".page-content"));
	createButton("easy", "Easy");
	createButton("medium", "Medium");
	createButton("hard", "Hard");
	createButton("extreme", "Extreme");
	createButton("basicSolve", "Basic Solve");
	createBarButton();
	initializeButtonEvents();
}


function initializeButtonEvents() {
	$(".easy").click(function(){ createGrid(1); });
	$(".medium").click(function(){ createGrid(2); });
	$(".hard").click(function(){ createGrid(3); });
	$(".extreme").click(function(){ createGrid(4); });
	$(".basicSolve").click(function(){ 
		basicSolve(); 
	});
	$(".bars-button").click(function(){
		var menu = $("#my-menu");
		if(basicSolveFlag) {
			if(menu.hasClass("mm-opened")) {
				menu.data( "mmenu" ).close();
			} else {
				menu.data( "mmenu" ).open();
			}
		} else {
			clickBasicSolveFirstIntro();
		}
	});
}

function initializeMenu() {
	$("#my-menu").mmenu({extensions: ["theme-dark"]});
	$("#naked-pairs").click(function(){ 
		$("#my-menu").data( "mmenu" ).close(); 
		setTimeout(function(){ nakedPairsSolve(); }, 500); 
	});	
}

function createGrid(level) {
	cleanGrid();
	scrape(level);
}

function createButton(selector, str) {
	var button = $("<a/>").addClass("button facebook " + selector);
	button.html(str);
	$(".button-container").append(button);
}

function createBarButton() {
	var barContainer = $("<div/>").addClass("bar-container");
		barsButton = $("<div/>").addClass("bars-button").appendTo($(".page-content")).wrap(barContainer),
		bars = $("<i/>").addClass("fa fa-bars").appendTo(barsButton);
}

function cleanGrid() {
	basicSolveFlag = false;
	_.each($("td"), function(cell) {
		$(cell).html("").removeClass("number clicked hovered done not-complete");
	});
}
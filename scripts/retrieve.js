function getAllRelevantCells(selector) {
	var row = getRow(selector),
		col = getCol(selector),
		sec = getSec(selector);
	return $(row + "," + col +  "," + sec);
}

function getNumber(num) {
	var sameNum = []
	_.each($("td.done"), function(cell) {
		if($(cell).html() == num) { sameNum.push(cell); }
	});
	return sameNum;
}

function getRow(selector) { return getItem("row", selector); }
function getCol(selector) { return getItem("col", selector); }
function getSec(selector) { return getItem("sec", selector); }

function getItem(item, selector) {
	return "." + item + "-" + $(selector).attr(item);
}

function section(row, col) {
	if(row < 4) { 
		if(col < 4) { return 1; }
		else if(col < 7){ return 2; }
		else{ return 3; } 
	} else if(row < 7){ 
		if(col < 4) { return 4; }
		else if(col < 7){ return 5; }
		else{ return 6; } 
	} else { 
		if(col < 4) { return 7; }
		else if(col < 7){ return 8; }
		else{ return 9; } 
	}
}
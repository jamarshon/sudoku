var basicSolveFlag = false;
function createPossibleValString(originalArr) {
	var arr = originalArr.slice(),
		firstThree = arr.splice(0, 3),
		secondThree = arr.splice(3, 3),
		lastThree = arr.splice(7, 3),
		combinedArr = _.zip(firstThree, secondThree, lastThree);
	return _.compact(_.flatten(combinedArr)).join(" ");
}

function basicSolve() {
	if(!basicSolveFlag){ 
		var arrOfCells = basicSolveHelper(true); 
		if(arrOfCells) {
			basicSolveIntro(arrOfCells); 
		}
	} else{ basicSolveHelper(false); }
}

function basicSolveHelper(half) {
	basicSolveFlag = true;
	while(true) {
		var changed = false,
			notComplete = $("td.not-complete");
		
		for(var i = 0, len = notComplete.length; i < len; i++) {
			var cell = notComplete[i],
				relevantCells = getAllRelevantCells(cell),
				possibleVals = cell.possibleVals;
				
			var changers = [];
			_.each(relevantCells, function(relevCell) {
				if($(relevCell).hasClass("done")) {
					var relevCellNum = $(relevCell).html(),
					newPossibleVals = _.filter(possibleVals, function(num){ return num != relevCellNum; });
					if(possibleVals.length > newPossibleVals.length && half) { 
						changers.push(relevCell); 
						changers.push(_.difference(possibleVals, newPossibleVals));
					};
					possibleVals = newPossibleVals;
				}
			});
			if(possibleVals.length == 1) { 
				cell.possibleVals = possibleVals;
				if(half){ changers.push(cell); return changers; }
				$(cell).html(possibleVals).removeClass("not-complete").addClass("done"); 
				changed = true; 
			} else if(!half) {
				cell.possibleVals = possibleVals;
				$(cell).html(createPossibleValString(possibleVals));
			}
		}
		if(half) { return basicSolveHelper(false); } 
		if(!changed) { break; }
	}
}

function nakedPairsSolve() {
	var nakedPairs = _.map($("td.not-complete"), function(cell) {
		if(cell.possibleVals.length == 2) { 
			var pair = _.filter(getAllRelevantCells(cell), function(relevCell){
				posVal = relevCell.possibleVals;
				if(posVal && posVal.length == 2 ){ 
					if(posVal[0] == cell.possibleVals[0] && posVal[1] == cell.possibleVals[1]) {
						return true; 
					}
				}
				return false;
			});
			if(pair && pair.length == 2) {
				return pair;
			}
		}
	});
	nakedPairs = _.compact(nakedPairs);
	if(nakedPairs.length > 0) {
		nakedPairsIntro(nakedPairs);
	}
}

function nakedPairsSolveHelper(nakedPairs) {
	_.each(nakedPairs, function(nakedPair) {
		var nakedPairPosVals = nakedPair[0].possibleVals;
		if($(nakedPair[0]).attr("col") == $(nakedPair[1]).attr("col")){
			var col = _.difference($(getCol(nakedPair[0])), nakedPair);
			removeSimilar(col, nakedPairPosVals);
		}
		if($(nakedPair[0]).attr("row") == $(nakedPair[1]).attr("row")){
			var row = _.difference($(getRow(nakedPair[0])), nakedPair);
			removeSimilar(row, nakedPairPosVals);
		}
		if($(nakedPair[0]).attr("sec") == $(nakedPair[1]).attr("sec")){
			var sec = _.difference($(getSec(nakedPair[0])), nakedPair);
			removeSimilar(sec, nakedPairPosVals);
		}
	});
	checkCells();
}

function removeSimilar(selectedGroup, nakedPairPosVals) {
	_.each(selectedGroup, function(cell){ 
		newPossibleVals = _.difference(cell.possibleVals, nakedPairPosVals);
		cell.possibleVals = newPossibleVals;
		$(cell).html(createPossibleValString(newPossibleVals));
	});
}

function checkCells() {
	while(true) {
		var changed = false;
		_.each($("td.not-complete"), function(cell) {
			if(cell.possibleVals.length == 1) {
				$(cell).html(cell.possibleVals[0]).removeClass("not-complete").addClass("done");
				changed = true; 
			}
		});
		if(!changed) { break; }
	}
}
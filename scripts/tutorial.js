function basicSolveIntro(arr) {
	var stepArr = generateStepArr(arr);
	introJs().setOptions({
		steps: stepArr,
		exitOnOverlayClick: true,
		showStepNumbers: false
	}).oncomplete(function() { basicSolveHelper(false); }).onexit(function() { basicSolveHelper(false); }).start();
}

function generateStepArr(arr) {
	var targetCell = arr.pop(),
		stepArr = [],
		possibleVal = targetCell.possibleVals;
		basicSolveText = {
		  element: '.basicSolve',
		  intro: 'The basic solve method is to find the only number possible for the cell by ' +
			'looking at the row, column and box for that number and eliminating those numbers ' +
			'from the possible values. If only one value is left, that value can be placed inside the box.',
		  position: 'right'
		},
		targetCellText = {
		  element: targetCell,
		  intro: 'This is the cell that we are trying to solve for. It has currently the possible values ' + 
			'of ' + possibleVal.join(" ") + '.',
		  position: 'right'
		};
	$(targetCell).click();
	var sortedArr = sortArr(arr);
	stepArr.push(basicSolveText, targetCellText);
	_.each(sortedArr, function(el, index) {
		if(index % 2 == 0) {
			var numberRemoved = sortedArr[index+1];
			possibleVal = _.filter(possibleVal, function(num){ return num != numberRemoved; });
			var object = {
			  element: el,
			  intro: 'This cell has a ' + numberRemoved + ' so remove that number from the possible values. ' +
				'The target cell has now the possible values of ' + possibleVal.join(" ") + '.',
			  position: 'right'
			};
			stepArr.push(object);
		}
	});
	var secondLastCell = {
		  element: targetCell,
		  intro: 'The target cell is now solvable as by process of elimination only one candidate exists. ' +
			'Therefore, this cell has to be ' + possibleVal[0] + '.',
		  position: 'right'
		},
		lastCell = {
		  element: ".bar-container",
		  intro: "Click here to continue to solve this puzze with more advanced techniques.",
		  position: 'bottom'
		};
	
	stepArr.push(secondLastCell, lastCell);
	return stepArr;
}

function sortArr(arr) {
	var flattenedArr = _.flatten(arr),
		sortedArr = [];
	_.each([1, 2, 3, 4, 5, 6, 7, 8, 9], function(el) {
		var indexOfElement = _.indexOf(flattenedArr, el);
		if(indexOfElement != -1) {
			sortedArr.push(flattenedArr[indexOfElement-1], flattenedArr[indexOfElement]);
		}
	});
	return sortedArr;
}


function clickBasicSolveFirstIntro() {
	var basicSolveButton = [{
	  element: ".basicSolve",
	  intro: "Click here to start with the beginner method before using the more advanced techniques.",
	  position: 'right'
	}];
	introJs().setOptions({
		steps: basicSolveButton,
		exitOnOverlayClick: true,
		showStepNumbers: false
	}).start();
}

function nakedPairsIntro(nakedPairs) {
	var firstElement = {
			element: nakedPairs[0][0],
			intro: "This cell only has two possible numbers.",
			position: 'right' 
		},
		secondElement = {
			element: nakedPairs[0][1],
			intro: "This cell also only has two possible numbers and they are the same as the previous cell." +
				"Since these two cells intersect at a set (either column, row or section), it is possible to remove " +
				"these two numbers from all cell's possible numbers in that specific set.",
			position: 'right' 
		};
	introJs().setOptions({
		steps: [firstElement, secondElement],
		exitOnOverlayClick: true,
		showStepNumbers: false
	}).oncomplete(function() { nakedPairsSolveHelper(nakedPairs); }).onexit(function() { 
		nakedPairsSolveHelper(nakedPairs); 
	}).start();
}

function nakedTriplesIntro(nakedTriples, firstNakedTriple) {
	var firstElement = {
			element: firstNakedTriple[0],
			intro: "This cell only has three possible numbers.",
			position: 'right' 
		},
		secondElement = {
			element: firstNakedTriple[1],
			intro: "This cell only has three possible numbers.",
			position: 'right' 
		},
		thirdElement = {
			element: firstNakedTriple[2],
			intro: "This cell also only has three possible numbers and they are the same as the previous cells." +
				"Since these three cells intersect at a set (either column, row or section), it is possible to remove " +
				"these three numbers from all cell's possible numbers in that specific set.",
			position: 'right' 
		};
	introJs().setOptions({
		steps: [firstElement, secondElement, thirdElement],
		exitOnOverlayClick: true,
		showStepNumbers: false
	}).oncomplete(function() { nakedTriplesSolveHelper(nakedTriples, false); }).onexit(function() { 
		nakedTriplesSolveHelper(nakedTriples, false); 
	}).start();
}	
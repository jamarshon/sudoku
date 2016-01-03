// UA-67748420-1
$(document).ready(function() {
	var grid = $("<table/>").addClass("sudoku-grid centered").appendTo($(".page-content"));
	initializeNumberContainers();
	initializeGrid(grid);
	initializeCellEvents();
	initializeMenu();
	initializeButtons();
});
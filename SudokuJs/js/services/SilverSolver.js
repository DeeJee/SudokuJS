sudokuJs.factory('silverSolver', function (httpLogger, htmlLogger) {
    var calculatePossibilities = function (puzzle) {
        puzzle.rows.forEach(function (row) {
            row.cells.forEach(function (cell) {
                if (!cell.given) {
                    cell.possibilities = calculatePossibilitiesForCell(puzzle, cell.rowIndex, cell.columnIndex);
                }
            });
        });
    }

    var getSiblings = function (puzzle, rowIndex, columnIndex) {
        var siblings = new Collection();

        var cellsInRow = getCellsInRow(puzzle, rowIndex);
        cellsInRow.forEach(function (cell) {
            siblings.add(cell);
        });

        var cellsInColumn = getCellsInColumn(puzzle, columnIndex);
        cellsInColumn.forEach(function (cell) {
            //testen
            if (cell.rowIndex != rowIndex) { //deze zit er al in
                siblings.add(cell);
            }

        });

        var cellsInBlock = getCellsInBlock(puzzle, rowIndex, columnIndex);
        cellsInBlock.forEach(function (cell) {
            if (!(cell.rowIndex == rowIndex && cell.columnIndex == columnIndex)) { //deze zit er al in
                siblings.add(cell);
            }
        });

        return siblings;
    }

    var calculatePossibilitiesForCell = function (puzzle, row, column) {
        var possibilities = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        var valuesInRow = getValuesInRow(puzzle, row);
        valuesInRow.forEach(function (value) {
            possibilities.remove(value);
        });

        var valuesInColumn = getValuesInColumn(puzzle, column);
        valuesInColumn.forEach(function (value) {
            possibilities.remove(value);
        });

        var valuesInBlock = getValuesInBlock(puzzle, row, column);
        valuesInBlock.forEach(function (value) {
            possibilities.remove(value);
        });

        return possibilities;
    }

    var getCellsInRow = function (puzzle, row) {
        var myCollection = new Collection();
        puzzle.rows[row].cells.forEach(function (cell) {
            myCollection.add(cell);
        });

        return myCollection;
    }

    var getValuesInRow = function (puzzle, row) {
        var myCollection = new Collection();
        puzzle.rows[row].cells.forEach(function (cell) {
            if (cell.value != '') {
                myCollection.add(cell.value);
            }
        });

        return myCollection;
    }

    var getCellsInColumn = function (puzzle, column) {
        var myCollection = new Collection();
        //lus door alle rijen
        puzzle.rows.forEach(function (row) {
            var cell = row.cells[column];
            myCollection.add(cell);
        });

        return myCollection;
    }

    var getValuesInColumn = function (puzzle, column) {
        var myCollection = new Collection();
        //lus door alle rijen
        puzzle.rows.forEach(function (row) {
            var cell = row.cells[column];
            if (cell.value != '') {
                myCollection.add(cell.value);
            }
        });

        return myCollection;
    }

    var getCellsInBlock = function (puzzle, row, column) {
        var intRow = parseInt(row / 3)
        var minRow = 3 * intRow;
        var maxRow = 3 * (intRow + 1) - 1;

        var intColumn = parseInt(column / 3)
        var minColumn = 3 * intColumn;
        var maxColumn = 3 * (intColumn + 1) - 1;

        var myCollection = new Collection();
        //lus door alle rijen
        for (var rowIndex = minRow; rowIndex <= maxRow; rowIndex++) {
            for (var columnIndex = minColumn; columnIndex <= maxColumn; columnIndex++) {
                var cell = puzzle.rows[rowIndex].cells[columnIndex];
                myCollection.add(cell);
            }
        }

        return myCollection;
    }

    var getValuesInBlock = function (puzzle, row, column) {
        var intRow = parseInt(row / 3)
        var minRow = 3 * intRow;
        var maxRow = 3 * (intRow + 1) - 1;

        var intColumn = parseInt(column / 3)
        var minColumn = 3 * intColumn;
        var maxColumn = 3 * (intColumn + 1) - 1;

        var myCollection = new Collection();
        //lus door alle rijen
        for (var rowIndex = minRow; rowIndex <= maxRow; rowIndex++) {
            for (var columnIndex = minColumn; columnIndex <= maxColumn; columnIndex++) {
                var cell = puzzle.rows[rowIndex].cells[columnIndex];
                if (cell.value != '') {
                    myCollection.add(cell.value);
                }
            }
        }

        return myCollection;
    }

    var teller = 0;
    var log = function (text) {
        var paddedText = teller + '|\'' + text + '\'';
        //httpLogger.savePuzzle({ name: paddedText });
        htmlLogger.log(text+'\n');
        //        console.log(paddedText);
        teller++;
    }

    var CellsFilled;
    var Opgelost;
    var solveRecursively = function (puzzle, nesting) {
        var bContinue = true;
        CellsFilled = 0;
        nesting++;

        if (!Opgelost) {
            //lus door elke rij
            var en = new PuzzleEnumerator(puzzle);
            while (en.moveNext() && bContinue) {
                var cell = en.current();

                if (cell.value == '') //als de cel leeg is waarde proberen
                {
                    //var possibilities = calculatePossibilitiesForCell(puzzle, cell.rowIndex, cell.columnIndex);
                    //calculatePossibilities(puzzle);
                    //cell.possibilities.forEach(function (possibility) {
                    //    cell.value = possibility;
                    //    Thread.Sleep(delay);

                    //    solveRecursively(puzzle, nesting);
                    //    if (!Opgelost) {
                    //        cell.value = '';
                    //        Thread.Sleep(delay);

                    //        calculatePossibilities(puzzle);
                    //    }
                    //});

                    //if (cell.value == '') {
                    //        bContinue = false;
                    //}

                    for (var index = 0; index < puzzle.rows[0].cells.length; index++) {   //maak een mogelijkheden object dat de volgende aanlevert
                        var number = index + 1;
                        if (cell.possibilities.contains(number)) {
                            cell.value = number;
                           // log('Row: ' + cell.rowIndex + ', Column: ' +cell.columnIndex + ' value: ' +number);
                            //Thread.Sleep(delay);

                            cell.siblings.forEach(function (cell) {
                                cell.possibilities = calculatePossibilitiesForCell(puzzle, cell.rowIndex, cell.columnIndex);
                            });
                            solveRecursively(puzzle, nesting);
                            //log('Terugkomst uit solverecursively, nesting: ' + nesting);
                            if (!Opgelost) {
                                cell.value = '';
                                //Thread.Sleep(delay);
    
                                cell.siblings.forEach(function (cell) {
                                    cell.possibilities = calculatePossibilitiesForCell(puzzle, cell.rowIndex, cell.columnIndex);
                                });
                            }
                        }//if possibility contains number
                        if (index == puzzle.rows[0].cells.length - 1 && cell.value == '') {//als alle mogelijkheden geprobeerd zijn en de puzzle is niet opgelost
                            bContinue = false;
                        }
                    }//waarde proberen
                }
                else {
                    CellsFilled++;
                    if (CellsFilled == puzzle.rows.length * puzzle.rows[0].cells.length)
                        Opgelost = true;
                }
            }//cell                
        }//opgelost
        return;
    }//solveRecursively

    var toggleSiblings = function (puzzle, cell, onOrOff) {
        var siblings = getSiblings(puzzle, cell.rowIndex, cell.columnIndex);
        siblings.forEach(function (cell) {
            cell.hover = onOrOff;
        });
    }

    var validatePuzzle = function (puzzle) {
        checkRow(puzzle);
        checkColumns(puzzle);
    };

    var checkColumns = function (puzzle) {
        for (var columnIndex = 0; columnIndex < puzzle.rows[0].cells.length; columnIndex++) {
            var unique = new Collection();
            puzzle.rows.forEach(function (row) {
                var cell = row.cells[columnIndex];
                if (unique.contains(cell.value)) {
                    cell.error = true;
                    puzzle.rows.forEach(function (row) {
                        var otherCell = row.cells[columnIndex];
                        if (otherCell.value == cell.value) {
                            otherCell.error = true;
                        }
                    });
                }
                else {
                    unique.add(cell.value);
                }
            });
        }
    }

    var checkRow = function (puzzle) {
        puzzle.rows.forEach(function (row) {
            var unique = new Collection();
            row.cells.forEach(function (cell) {
                if (unique.contains(cell.value)) {
                    cell.error = true;
                    row.cells.forEach(function (othercell) {
                        if (othercell.value == cell.value) {
                            othercell.error = true;
                        }
                    });
                }
                else {
                    unique.add(cell.value);
                }
            });
        });
    }

    return {
        solvePuzzle: function (puzzle) {
            htmlLogger.log('solving');
            var start = new Date();
            for (var rowIndex = 0; rowIndex < puzzle.rows.length; rowIndex++) {
                for (var columnIndex = 0; columnIndex < puzzle.rows[rowIndex].cells.length; columnIndex++) {
                    var cell = puzzle.rows[rowIndex].cells[columnIndex];
                    cell.rowIndex = rowIndex;
                    cell.columnIndex = columnIndex;
                    cell.siblings = getSiblings(puzzle, cell.rowIndex, cell.columnIndex);
                }
            }
            calculatePossibilities(puzzle);
            solveRecursively(puzzle, 0);
            htmlLogger.log('Opgelost in ' + (new Date() - start )+ ' milliseconden');
        },

        showPossibilities: function () {
            calculatePossibilitiesForCell();
        },

        showSiblings: function (puzzle, cell) {
            toggleSiblings(puzzle, cell, true);
        },

        hideSiblings: function (puzzle, cell) {
            toggleSiblings(puzzle, cell, false);
        },

        validatePuzzle: function (puzzle) {
            validatePuzzle(puzzle);
        },

        calculatePossibilities: function (puzzle, cell) {
            return calculatePossibilitiesForCell(puzzle, cell.rowIndex, cell.columnIndex);
        }
    }
});
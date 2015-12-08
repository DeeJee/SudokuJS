sudokuJs.factory('sudokuSolver', function (httpLogger) {
    var PuzzleEnumerator = function (puzzle) {

        this.puzzle = puzzle;
        var rowIndex = 0;
        var columnIndex = -1;

        this.moveNext = function () {
            if (columnIndex < this.puzzle.rows[0].cells.length - 1) {
                columnIndex++;
            }
            else {
                if (rowIndex < this.puzzle.rows.length - 1) {
                    rowIndex++;
                    columnIndex = 0;
                }
                else {
                    return false;
                }
            }

            return true;
        };

        this.current = function () {
            return this.puzzle.rows[rowIndex].cells[columnIndex];
        }
    }

    var calculatePossibilities = function (puzzle, row, column) {
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

    var getValuesInRow = function (puzzle, row) {
        var myCollection = new Collection();
        puzzle.rows[row].cells.forEach(function (cell) {
            if (cell.value != '') {
                myCollection.add(cell.value);
            }
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

    var solve = function (puzzle, rowIndex, columnIndex) {
        var value = puzzle.rows[rowIndex].cells[columnIndex];
        if (value.value === '') {
            var possibilities = calculatePossibilities(puzzle, rowIndex, columnIndex);
            var tryValue = possibilities.get(0);
            if (tryValue) {
                value.value = possibilities.get(0);
            }
            else {
                return false;
            }
        }

        return true;
    }

    var log =function(text){
        httpLogger.log(text);
    }

    var solveRecursively = function (puzzle, enumeratorIn, nesting) {
        log('beginnen met oplossen');
        
        //httpLogger.log('oplossen');
        //var enumerator;
        //if (enumeratorIn) {
        //    enumerator = enumeratorIn;
        //}
        //else {
        //    enumerator = new PuzzleEnumerator(puzzle);
        //}

        var enumerator = new PuzzleEnumerator(puzzle);
        while (enumerator.moveNext()) {
            var cell = enumerator.current();
            if (cell.value === '') {
                //proberen
                var possibilities = calculatePossibilities(puzzle, cell.rowIndex, cell.columnIndex);
                log(nesting + ': (' + cell.rowIndex + ', ' + cell.columnIndex + ') heeft mogelijkheden: ' + possibilities.toString());
                if (possibilities.count > 0) {
                    for (var index = 0; index < possibilities.count; index++) {
                        var value = possibilities.get(index);
                      //  log(nesting + ': (' + cell.rowIndex + ', ' + cell.columnIndex + ') -> ' + value);
                        cell.value = value;

                        //verwijderen
                        if (cell.rowIndex === 2 ) {
                            return true;
                        }


                        if (cell.rowIndex === puzzle.rows.length - 1 && cell.columnIndex === puzzle.rows[0].cells.length - 1) {
                            //alles gevuld: opgelost
                            return true;
                        }
                        //een niveau dieper gaan
                        var opgelost = solveRecursively(puzzle, enumerator, nesting + 1);
                       // log(nesting + ': Terugkomst uit solveRecursively');
                        if (opgelost) {
                            return true;
                        }
                        else {
                            cell.value = '';
                        }
                    }
                }
                else {
                    //log(nesting + ': Geen mogelijkheden voor cel ' + cell.rowIndex + ', ' + cell.columnIndex);
                    return false;
                }
            }
            else {
                log(nesting + ': (' + cell.rowIndex + ', ' + cell.columnIndex + ') == ' + cell.value);
            }
        }
        throw new DOMException('niet op te lossen');
    }

    function sleep(seconds) {
        var e = new Date().getTime() + (seconds * 1000);
        while (new Date().getTime() <= e) { }
    }

    return {
        solvePuzzle: function (puzzle) {
            httpLogger.log('solving');
            for (var rowIndex = 0; rowIndex < puzzle.rows.length; rowIndex++) {
                for (var columnIndex = 0; columnIndex < puzzle.rows[rowIndex].cells.length; columnIndex++) {
                    var cell = puzzle.rows[rowIndex].cells[columnIndex];
                    cell.rowIndex = rowIndex;
                    cell.columnIndex = columnIndex;
                }
            }

            solveRecursively(puzzle, null, 0);

            //var enumerator = new PuzzleEnumerator(puzzle);
            //while (enumerator.moveNext()) {
            //    var cell = enumerator.current();
            //    cell.value = 9;
            //    console.log('(' + cell.rowIndex + ', ' + cell.columnIndex + ')');
            //    $rootScope.$apply;
            //    sleep(1);
            //}



        },

        showPossibilities: function () {
            calculatePossibilities();
        }
    };
});
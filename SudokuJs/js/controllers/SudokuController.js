'use strict';

sudokuJs.controller('SudokuController', function SudokuController($scope, sudokuLoader, silverSolver, sudokuSolver, sudokuSolver2Phase, ngDialog, httpLogger, $timeout) {
    this.sudokuLoader = sudokuLoader;
    $scope.test = 'test';

    sudokuLoader.getPuzzle('easy').$promise
        .then(function (puzzle) {
            $scope.puzzle = puzzle;

            for (var rowIndex = 0; rowIndex < puzzle.rows.length; rowIndex++) {
                for (var columnIndex = 0; columnIndex < puzzle.rows[rowIndex].cells.length; columnIndex++) {
                    var cell = puzzle.rows[rowIndex].cells[columnIndex];
                    cell.rowIndex = rowIndex;
                    cell.columnIndex = columnIndex;
                    if (cell.value === '') {
                        cell.title = silverSolver.calculatePossibilities(puzzle, cell).toString();
                    }
                    else {
                        cell.given = true;
                    }
                }
            }

            console.log('Puzzle loaded: ');
            console.log(puzzle)
        })
        .catch(function (response) { console.log(response); });

    $scope.solveSudoku = function () {
        for (var rowIndex = 0; rowIndex < $scope.puzzle.rows.length; rowIndex++) {
            for (var columnIndex = 0; columnIndex < $scope.puzzle.rows[rowIndex].cells.length; columnIndex++) {
                var cell = $scope.puzzle.rows[rowIndex].cells[columnIndex];
                cell.rowIndex = rowIndex;
                cell.columnIndex = columnIndex;
            }
        }

        silverSolver.solvePuzzle($scope.puzzle);
    };

    $scope.showPossibilities = function () {
        sudokuSolver.showPossibilities();
    };

    $scope.newSudoku = function () {
        console.log('new sudoku');
        $scope.puzzle.rows.forEach(function (row) {
            row.cells.forEach(function (cell) {
                cell.value = '';
                delete cell.given;
                delete cell.title;
            });
        });
        $scope.puzzle.name = '';
    };

    $scope.openSudokuDialog = function () {
        ngDialog.open({ template: 'openDialog', controller: 'SudokuController' });
    };

    $scope.openSudoku = function () {
        ngDialog.close({ template: 'saveDialog' });
        var name = $scope.puzzleToLoad;
        sudokuLoader.getPuzzle(name).$promise
        .then(function (puzzle) {
            $scope.puzzle = puzzle;
            console.log('Puzzle loaded: '); console.log(puzzle)
        })
        .catch(function (response) { console.log(response); });
    };

    $scope.saveSudokuDialog = function () {
        ngDialog.open({ template: 'saveDialog', controller: 'SudokuController' });
    };

    $scope.saveSudoku = function (name) {
        ngDialog.close({ template: 'saveDialog' });
        $scope.puzzle.name = name;
        sudokuLoader.savePuzzle($scope.puzzle).$promise
        .then(function (event) { console.log('success', event) })
               .catch(function (event) { console.log('failure', event) });
    };

    $scope.showSiblings = function (scope) {
        silverSolver.showSiblings($scope.puzzle, scope.cell);
    };

    $scope.hideSiblings = function (scope) {
        silverSolver.hideSiblings($scope.puzzle, scope.cell);
    };

    $scope.validateSudoku = function () {
        silverSolver.validatePuzzle($scope.puzzle);
    }

    var teller = 0;
    var log = function (text) {
        var paddedText = teller + '|\'' + text + '\'';
        httpLogger.savePuzzle({ name: paddedText });
        //        console.log(paddedText);
        teller++;
    }
});
'use strict';

sudokuJs.controller('LoadSudokuController',
    function LoadSudokuController($scope, sudokuLoader, ngDialog) {
        $scope.fileName = '';

        $scope.openSudoku = function (name) {
            ngDialog.close({ template: 'saveDialog' });
            sudokuLoader.getPuzzle(name).$promise
            .then(function (puzzle) { $scope.puzzle = puzzle; console.log('Puzzle loaded: '); console.log(puzzle) })
            .catch(function (response) { console.log(response); });
        };

    });
sudokuJs.factory('sudokuLoader', function ($resource, $http) {
    var resource = $resource('puzzles/puzzle/:name', { name: '@name' });
    return {
        getPuzzle: function (name) {
            return resource.get({ name: name });
        },

        savePuzzle: function (puzzle) {
            console.log('Saving puzzle: ')

            puzzle.rows.forEach(function (row) {
                row.cells.forEach(function (cell) {
                    delete cell.rowIndex;
                    delete cell.columnIndex;
                    delete cell.title;
                    delete cell.given;
                });
            });
            console.log(puzzle);
            return resource.save(puzzle);
        }
    };
});
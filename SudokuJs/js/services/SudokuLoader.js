sudokuJs.factory('sudokuLoader', function ($resource, $http) {
    var resource = $resource('puzzles/puzzle/:name', { name: '@name' });
    return {
        getPuzzle: function (name) {
            return resource.get({ name: name });
        },
        savePuzzle: function (puzzle) {
            console.log('Saving puzzle: ')
            console.log(puzzle);
            return resource.save(puzzle);
        }
    };
});
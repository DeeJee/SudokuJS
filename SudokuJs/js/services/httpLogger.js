sudokuJs.factory('httpLogger', function ($resource, $http) {
    var resource = $resource('puzzles/log/:name', { name: '@name' });
    return {
        log: function (name) {
            //return resource.get({ name: name });
            name = '"' + name + '"';
            $http({
                method: 'GET',
                url: 'puzzles/log/' + name
            }).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        },
        savePuzzle: function (puzzle) {
            console.log('httpLogger.savePuzzle(' + puzzle + ')')
            console.log(puzzle);
            return resource.save({ id:'aap', text:puzzle});
        }
    };
});
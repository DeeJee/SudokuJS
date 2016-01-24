sudokuJs.factory('htmlLogger', function ($resource, $http) {
    var logger = document.getElementById('console');
    return {
        log: function (text) {
            logger.innerHTML += text + '\n';
        },
    };
});
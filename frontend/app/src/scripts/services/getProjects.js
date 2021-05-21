app.factory('getProjects', function($http) {
    var getData = function() {
        return $http({
            method:"GET", 
            url:"http://localhost:3333/projects",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result) {
            return result.data;
        });
    };

    return { getData: getData };
});
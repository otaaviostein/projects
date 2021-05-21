app.factory('getActivities', function($http) {
    var getData = function(id) {
        return $http({
            method:"GET", 
            url:"http://localhost:3333/activities?id="+id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result) {
            console.log(result.data);
            return result.data;
        });
    };

    return { getData: getData };
});
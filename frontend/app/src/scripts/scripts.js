var app = angular.module('baseApp', ['chart.js']);

app.controller('mainController', [
    "$scope",
	"$http",
    "getProjects",
    "getActivities",
    function(
        $scope,
        $http,
        getProjects,
        getActivities
    ) {

        $scope.project_names = [];
        $scope.project_percentages = [];
        $scope.activity_dates = [];

        $scope.projects_json = [];
        $scope.activities_json = [];

        $scope.selected = 0;
        
        $scope.active = 0;
        $scope.loadingProjects = false;
        $scope.loadingActivity = false;
        $scope.showActivity = false;


        $scope.deleteProjectModal = function(projectId) {
            $scope.projectId = projectId;
            $("#delete-project-modal").modal("show");
        };

        $scope.deleteProject = function(projectId, e) {
            
            e.preventDefault();

            $http({
                method: "DELETE",
                url: "http://localhost:3333/projects/"+projectId,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(result) {
                $("#delete-project-modal").modal("hide");
                $scope.getProjects();
            });
            return false;
        };

        $scope.finishActivity = function(activityId) {
            
            $http({
                method: "PUT",
                url: "http://localhost:3333/activities/"+activityId,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(result) {
                $scope.getProjects();
            });
            return false;
        };

        $scope.addProjectsModal = function() {
            $("#add-project-modal").modal("show");
        };

        $scope.addProject = function(e) {
            const projectName = $scope.projectName;
            const projectStartDate = new Date($scope.projectStartDate).toJSON().slice(0, 10);
            const projectEndDate = new Date($scope.projectEndDate).toJSON().slice(0, 10);

            e.preventDefault();

            obj = {
                projectName,
                projectStartDate,
                projectEndDate
            };
            $http({
                method: "POST",
                url: "http://localhost:3333/projects",
                data: obj,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(result) {
                if(result.status == 201) {
                    $("#add-project-modal").modal("hide");
                    $scope.getProjects();
                }
            });
            
            $scope.projectName = "";
            $scope.projectStartDate = "";
            $scope.projectEndDate = "";
            return false;
        };

        $scope.addActivitiesModal = function(activityProjectId) {
            console.log(activityProjectId);
            $scope.activityProjectId = activityProjectId;
            $("#add-activity-modal").modal("show");
        };

        $scope.addActivity = function(e) {
            const activityName = $scope.activityName;
            const activityStartDate = new Date($scope.activityStartDate).toJSON().slice(0, 10);
            const activityEndDate = new Date($scope.activityEndDate).toJSON().slice(0, 10);
            const activityProjectId = $scope.activityProjectId;
            
            e.preventDefault();

            obj = {
                activityProjectId,
                activityName,
                activityStartDate,
                activityEndDate,
                activity_finished: false
            };
            $http({
                method: "POST",
                url: "http://localhost:3333/activities",
                data: obj,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(result) {
                $("#add-activity-modal").modal("hide");
                $scope.getProjects();
                
            });
            
            $scope.activityName = "";
            $scope.activityStartDate = "";
            $scope.activityEndDate = "";
            return false;
        };

        $scope.numberOfPagesProject = function() {
            return Math.ceil($scope.projects_json.length/$scope.pageSizeProject);                
        }
        $scope.numberOfPagesActivity = function() {
            return Math.ceil($scope.activities_json.length/$scope.pageSizeActivity);                
        }
        
        $scope.getProjects = function() {
            $scope.loadingProjects = true;

            var projects = getProjects.getData();
            projects.then(function(result) {

                $scope.projects_json = result;
                if($scope.projects_json.length != 0) {
                    $scope.getActivities($scope.projects_json[0].projectId);
                    $scope.projectId, $scope.selected = $scope.projects_json[0].projectId;
                }
                
                angular.forEach(
                    $scope.projects_json, function(itm) {
                        
                    }
                );
                $scope.loadingProjects = false;
            });
        };
        $scope.getProjects();

        $scope.getActivities = function(id) {
            $scope.activity_dates = [];
            $scope.loadingActivity = true;
            $scope.showActivity = true;
            $scope.projectId= id;
            $scope.selected = id;

            var activity = getActivities.getData(id);
            activity.then(function(result) {
                $scope.currentPageActivity = 0;
                $scope.pageSizeActivity = 10;
                $scope.activities_json = result;
                $scope.loadingActivity = false;
                console.log($scope.activities_json);
                angular.forEach(
                    $scope.activities_json, function(itm) {
                        $scope.activity_dates.push(new Date(itm.activityEndDate).toJSON().slice(0, 10));
                        
                    }
                );
                
                $scope.activity_dates.sort(function compare(a, b) {
                    var dateA = new Date(a);
                    var dateB = new Date(b);
                    return dateB - dateA;
                });
                  
            });
        }
        $scope.labels = $scope.project_names;
        $scope.data = $scope.project_percentages;

    }
]);

app.filter('startFromProject', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});


app.filter('startFromActivity', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});
'use strict';

angular.module('mean.sprints').controller('SprintsController', ['$scope', '$stateParams', '$location', 'Global', 'Sprints', 'Issues', 'Timelogs',
    function ($scope, $stateParams, $location, Global, Sprints, Issues, Timelogs) {

    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.sprint = {};
    $scope.sprints = [];

    //---------------------------------
    //Functions
    //---------------------------------
    $scope.edit = function(sprint){
        $scope.sprint = sprint;
    }

    $scope.create = function() {
        var sprint = new Sprints({
            name: this.name,
            project: this.project,
            startDate: this.startDate,
            stopDate: this.stopDate
        });
        sprint.$save(function(response) {
            $scope.sprints.push(sprint);
        });

        this.name = '';
        this.project = null;
        this.startDate = null;
        this.stopDate = null;
    };

    $scope.remove = function(sprint) {
        if(confirm("Are you sure you want to delete?")){
            if (sprint) {
                sprint.$remove();

                for (var i in $scope.sprints) {
                    if ($scope.sprints[i] === sprint) {
                        $scope.sprints.splice(i, 1);
                    }
                }
            }
            else {
                $scope.sprint.$remove();
                $location.path('sprints');
            }
        }
    };

    $scope.update = function() {
        var sprint = $scope.sprint;
        // if (!sprint.updated) {
        //     sprint.updated = [];
        // }
        // sprint.updated.push(new Date().getTime());

        sprint.$update();
        
    };

    $scope.refresh - function(){
        $location.path('sprints');
    };

    $scope.find = function() {
        Sprints.query(function(sprints) {
            $scope.sprints = sprints;
        });
    };

    $scope.findOne = function() {
        Sprints.get({
            sprintId: $stateParams.sprintId
        }, function(sprint) {
            $scope.sprint = sprint;
            $scope.initBudget(sprint);
        });
    };

    $scope.findByProject = function(projectId) {
        Sprints.getByProject({'projectId': projectId}, function(sprints){
            $scope.sprints = sprints;
        });
    };

    $scope.initBudget = function(sprint){
        sprint.actual = 0;
        sprint.estimate = 0;
        sprint.budget = 0;

        Issues.getBySprint({'sprintId': $stateParams.sprintId}, function(issues) {
            for(var x=0; x < issues.length; x++) { 
             var issue = issues[x]
             sprint.estimate += issue.estimate;
             Timelogs.getByIssue({'issueId': issue._id}, function(timelogs){
                for(var i=0; i < timelogs.length; i++) { 
                    sprint.actual  += parseFloat(diff(
                        timelogs[i].startTime,
                        timelogs[i].stopTime
                        ));
                }
            });
         }
     });
    }

    $scope.getBudget = function(){
        return ($scope.sprint.actual / $scope.sprint.estimate * 100).toFixed(2);
    }
    //---------------------------------
    //Listeners
    //---------------------------------
}]);
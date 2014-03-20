'use strict';

angular.module('mean.sprints').controller('SprintsController', ['$scope', '$stateParams', '$location', 'Global', 'Sprints', function ($scope, $stateParams, $location, Global, Sprints) {
    
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

        sprint.$update(function() {
            //$location.path('sprints/' + sprint._id);
        });
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
        });
    };

    //---------------------------------
    //Listeners
    //---------------------------------
}]);
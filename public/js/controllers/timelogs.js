'use strict';

angular.module('mean.timelogs').controller('TimelogsController', ['$scope', '$stateParams', '$location', 'Global', 'Timelogs', function ($scope, $stateParams, $location, Global, Timelogs) {
    $scope.global = Global;

    $scope.create = function() {
        var timelog = new Timelogs({
            startTime: this.startTime,
            stopTime: this.stopTime,
            description: this.description,
            issue: this.issue
        });
        timelog.$save(function(response) {
            $scope.timelogs.push(timelog);
        });

        this.startTime = null;
        this.stopTime = null;
        this.description = '';
        this.issue = null;
    };

    $scope.remove = function(timelog) {
        if (timelog) {
            timelog.$remove();

            for (var i in $scope.timelogs) {
                if ($scope.timelogs[i] === timelog) {
                    $scope.timelogs.splice(i, 1);
                }
            }
        }
        else {
            $scope.timelog.$remove();
            $location.path('timelogs');
        }
    };

    $scope.update = function() {
        var timelog = $scope.timelog;
        if (!timelog.updated) {
            timelog.updated = [];
        }
        timelog.updated.push(new Date().getTime());

        timelog.$update(function() {
            $location.path('timelogs/' + timelog._id);
        });
    };

    $scope.find = function() {
        Timelogs.query(function(timelogs) {
            $scope.timelogs = timelogs;
        });
    };

    $scope.findOne = function() {
        Timelogs.get({
            timelogId: $stateParams.timelogId
        }, function(timelog) {
            $scope.timelog = timelog;
        });
    };
}]);
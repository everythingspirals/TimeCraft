'use strict';

angular.module('mean.timelogs').controller('TimelogsController', 
    ['$scope', '$stateParams', '$location', '$timeout', '$aside', 'Global', 'Timelogs', 'Rates', '$log',
    function ($scope, $stateParams, $location, $timeout, $aside, Global, Timelogs, Rates, $log) {

    //---------------------------------
    //Variables
    //---------------------------------

    //timelog
    $scope.global = Global;
    $scope.timelog = {};
    $scope.timelogs = [];

    //---------------------------------
    //Timelog Functions
    //---------------------------------
    $scope.edit= function(timelog){
        $scope.timelog = timelog
    };

    $scope.create = function() {
        var startTime = moment(this.startTime);
        var stopTime = moment(this.stopTime);
        var today = moment($scope.date);

        //set startTime date to today
        stopTime.year(today.year());
        stopTime.month(today.month());
        stopTime.date(today.date());

        //set stopTime date to today
        startTime.year(today.year());
        startTime.month(today.month());
        startTime.date(today.date());

        var timelog = new Timelogs({
            startTime: startTime.format(),
            stopTime: stopTime.format(),
            description: this.description,
            issue: this.issue
        });
        
        timelog.$save(function(timelog) {
            $scope.getByUser();
        });

        this.startTime = null;
        this.stopTime = null;
        this.description = '';
        this.issue = null;
    };

    $scope.remove = function(timelog) {
        if(confirm("Are you sure you want to delete?")){
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
        }
    };

    $scope.update = function() {
        var timelog = $scope.timelog;
        // if (!timelog.updated) {
        //     timelog.updated = [];
        // }
        // timelog.updated.push(new Date().getTime());
        timelog.$update(function(timelog) {
            $scope.getByUser();
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

    $scope.getByDay = function() {
        var startOfDay = moment($stateParams.date).startOf('day').toISOString();
        var endOfDay = moment($stateParams.date).endOf('day').toISOString();

        Timelogs.getByDay({'startOfDay': startOfDay, 'endOfDay': endOfDay}, function(timelogs){
            $scope.timelogs = timelogs;
        });
    };

    $scope.getByIssue = function() {
        Timelogs.getByIssue({'issueId': $stateParams.issueId}, function(timelogs){
            $scope.timelogs = timelogs;
        });
    };

    $scope.getByUser = function() {
        var startOfDay = moment($scope.date).startOf($scope.view.type.replace("s","")).toISOString();
        var endOfDay = moment($scope.date).endOf($scope.view.type.replace("s","")).toISOString();
        Timelogs.getByUser({'startOfDay': startOfDay, 'endOfDay': endOfDay, 'userId': Global.user._id}, function(timelogs){
            $scope.timelogs = timelogs;
            $scope.getEvents(timelogs);
        });
    };
    //---------------------------------
    //Rate/Time Functions
    //---------------------------------

    $scope.hours = function(timelog){
        timelog.hours = diff(timelog.startTime, timelog.stopTime);
    }
    
    $scope.hoursByIssue = function(timelog){
        timelog.issueHours = 0;
        angular.forEach($scope.timelogs, function(t){
            if(timelog.issue.name === t.issue.name){
                timelog.issueHours += diff(t.startTime, t.stopTime);
            }
        });
        $scope.totalHours += timelog.issueHours;
    }


    $scope.rate = function(timelog){
        timelog.rate = 0;
        Rates.current({
            clientId: timelog.issue.project.client,
            'userId': Global.user._id
        }, function(rates) {
            timelog.rate += timelog.issueHours * rates[0].amount;
            $scope.totalRate += timelog.rate;
        });
    };
   
}]);
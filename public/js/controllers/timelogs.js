'use strict';

angular.module('mean.timelogs').controller('TimelogsController', ['$scope', '$stateParams', '$location', 'Global', 'Timelogs', function ($scope, $stateParams, $location, Global, Timelogs) {
    
    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.timelogs = [];
    $scope.date = $stateParams.date;

    //---------------------------------
    //Functions
    //---------------------------------
     $scope.diff = function(start,stop){
        stop = moment(stop);
        start = moment(start);
        if (stop < start){
            stop = stop.add('days',1);
        }
        return stop.diff(start,'hours');
    };
    
    $scope.create = function() {
        var startTime = moment(this.startTime);
        var stopTime = moment(this.stopTime);
        
        //set startTime date to today
        stopTime.year(moment().year());
        stopTime.month(moment().month());
        stopTime.date(moment().date());

        //set stopTime date to today
        startTime.year(moment().year());
        startTime.month(moment().month());
        startTime.date(moment().date());

        var timelog = new Timelogs({
            startTime: startTime.format(),
            stopTime: stopTime.format(),
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

    //---------------------------------
    //Listeners
    //---------------------------------
    $scope.$watch('date',function(){
        if($scope.date != $stateParams.date){
            $location.path( '#!/day/' + moment($scope.date).format('L') );
        }
    });
}]);
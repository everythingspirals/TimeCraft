'use strict';

angular.module('mean.timelogs').controller('TimelogsController', 
    ['$scope', '$stateParams', '$location', '$timeout', 'Global', 'Timelogs', 
    function ($scope, $stateParams, $location, $timeout, Global, Timelogs) {

    //---------------------------------
    //Variables
    //---------------------------------

    //timelog
    $scope.global = Global;
    $scope.timelog = {};
    $scope.timelogs = [];
    $scope.date = $stateParams.date;


    //calendar

    $scope.events = [];

    $scope.views = [
    {
        id:0,
        title:"Day View",
        type:"days",
        value:"agendaDay"
    },
    {
        id:1,
        title:"Week View",
        type:"weeks",
        value:"agendaWeek"
    },
    {
        id:2,
        title:"Month View",
        type:"month",
        value:"month"
    },
    {
        id:3,
        title:"List View",
        type:"days",
        value:"basicDay"
    }
    ]

    $scope.view = $scope.views[$stateParams.view]
    
    $scope.config = {
     calendar:{
        defaultView: $scope.view.value, 
        allDaySlot:false, 
        firstHour:0, 
        header:[],
        year:moment($scope.date).year(),
        month:moment($scope.date).month(),
        date:moment($scope.date).date(),
        viewRender : function(){
            $(window).scrollTop(0);
        }
    }

};

    //---------------------------------
    //Timelog Functions
    //---------------------------------
    $scope.diff = function(start,stop){
        return diff(start,stop);
    };
    

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
            // $scope.timelogs.push(timelog);
            $timeout(function(){
                $location.path('timelogs/day/' + timelog.startTime + "/" + $scope.view.id)
            },500);
        });

        // this.startTime = null;
        // this.stopTime = null;
        // this.description = '';
        // this.issue = null;
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
            $location.path('timelogs/day/' + timelog.startTime);
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
        var startOfDay = moment($stateParams.date).startOf('day').toISOString();
        var endOfDay = moment($stateParams.date).endOf('day').toISOString();

        Timelogs.getByUser({'startOfDay': startOfDay, 'endOfDay': endOfDay, 'userId': Global.user._id}, function(timelogs){
            $scope.timelogs = timelogs;
            angular.forEach(timelogs,function(timelog){
               $scope.events.push({
                   title:timelog.issue.name,
                   start:new Date(timelog.startTime),
                   end: new Date(timelog.stopTime),
                   allDay: false
               });
           });
        });
    };

    //---------------------------------
    //Calendar Functions
    //---------------------------------
    $scope.changeDate = function(dir){
        $scope.date = moment($scope.date).add($scope.view.type,dir).format();
    }

    $scope.prev = function(){
      $scope.changeDate(-1);
  }

  $scope.next = function(){
    $scope.changeDate(+1);
}

// $scope.eventsF = function (start, end, callback) {
//    //$scope.date = moment(start).format();
//    Timelogs.getByUser({'startOfDay': moment(start).format(), 'endOfDay': moment(end).format(), 'userId': Global.user._id}, function(timelogs){
//     $scope.timelogs = timelogs;
//     var events = [];
//     angular.forEach(timelogs,function(timelog){
//        events.push({
//         title:timelog.issue.name,
//         start:new Date(timelog.startTime),
//         end: new Date(timelog.stopTime),
//         allDay: false
//     });

//    });
//     callback(events);
// });

//};
    //---------------------------------
    //Main
    //---------------------------------
    $scope.eventSources = [$scope.events];

    //---------------------------------
    //Listeners
    //---------------------------------
    $scope.$watch('date',function(){
     if($scope.date != $stateParams.date){
          $location.path('timelogs/day/' + $scope.date + "/" + $scope.view.id)
      }
    });

       $scope.$watch('events.length',function(){
        $scope.eventSources = [$scope.events];
    });

            $scope.$watch('view.value',function(){
                $location.path('timelogs/day/' + $scope.date + "/" + $scope.view.id)
            });



        }]);
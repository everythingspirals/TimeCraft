'use strict';

angular.module('mean.timelogs').controller('TimelogsController', 
    ['$scope', '$stateParams', '$location', '$timeout', '$aside', 'Global', 'Timelogs', 'Rates', 'Issues', '$log',
    function ($scope, $stateParams, $location, $timeout, $aside, Global, Timelogs, Rates, Issues, $log) {

    //---------------------------------
    //Variables
    //---------------------------------

    //global
    $scope.global = Global;

    //timelog
    $scope.global = Global;
    $scope.timelog = {};
    $scope.timelogs = [];
    $scope.totalHours = 0;
    $scope.totalRate = 0;

    $scope.startTime = {
        hh:moment().format("hh"),
        mm:moment().format("mm"),
        tt:moment().format("A")
    };

    $scope.stopTime = {
       hh:moment().format("hh"),
        mm:moment().format("mm"),
        tt:moment().format("A")
    };
    //views
    $scope.views = [
    {
        id:0,
        title:"List View",
        type:"days",
        value:"basicDay"
    },
    {
        id:1,
        title:"Day View",
        type:"days",
        value:"agendaDay"
    },
    {
        id:2,
        title:"Week View",
        type:"weeks",
        value:"agendaWeek"
    },
    {
        id:3,
        title:"Month View",
        type:"month",
        value:"month"
    }
    ];

    $scope.view = $scope.views[$stateParams.view]
    
    //date
    $scope.date = $stateParams.date;
    $scope.startDate = moment($scope.date).startOf($scope.view.type.replace("s",""));
    $scope.endDate = moment($scope.date).endOf($scope.view.type.replace("s",""));

    //calendar
    $scope.events = [];
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
            },
            eventClick: function(event, jsEvent, view) {
                $scope.edit(event.data.timelog)
                $aside({scope: $scope, template: '/views/timelogs/edit.html'});
            }
        }
    };

    //issues
    $scope.issues = [];

    //---------------------------------
    //Calendar Functions
    //---------------------------------
    $scope.getEvents = function(timelogs){
              //remove current events
            angular.forEach($scope.events,function(value, key){
                $scope.events.splice(key, 1);
            });
            
            //refetch from db
            angular.forEach(timelogs,function(timelog){

             $scope.events.push({
                 title:timelog.issue.name,
                 start:new Date(timelog.startTime),
                 end: new Date(timelog.stopTime),
                 data:{
                    timelog:timelog
                },
                allDay: false

            });
         });
    }

    $scope.changeDate = function(dir){
        $scope.date = moment($scope.date).add($scope.view.type,dir).format();
    }

    $scope.prev = function(){
        $scope.changeDate(-1);
    }

    $scope.next = function(){
        $scope.changeDate(+1);
    }

    //---------------------------------
    //Timelog Functions
    //---------------------------------
    $scope.edit= function(timelog){
        var startTime = $scope.timelog.startTime;
        var stopTime = $scope.timelog.stopTime;

        $scope.timelog.startTime = {
            hh:moment(startTime).format("hh"),
            mm:moment(startTime).format("mm"),
            tt:moment(startTime).format("A")
        };
        
        $scope.timelog.stopTime = {
            hh:moment(stopTime).format("hh"),
            mm:moment(stopTime).format("mm"),
            tt:moment(stopTime).format("A")
        };
        
        $scope.timelog = timelog
    };

    $scope.create = function() {
        var startTime = moment();
        var stopTime = moment();
        var today = moment($scope.date);
        var stopHours = ($scope.stopTime.tt == "AM" ? $scope.stopTime.hh : parseInt($scope.stopTime.hh) + 12);
        var startHours = ($scope.startTime.tt == "AM" ? $scope.startTime.hh : parseInt($scope.startTime.hh) + 12);

        //set startTime date to today
        stopTime.year(today.year());
        stopTime.month(today.month());
        stopTime.date(today.date());
        stopTime.hour(stopHours);
        stopTime.minute($scope.stopTime.mm);

        //set stopTime date to today
        startTime.year(today.year());
        startTime.month(today.month());
        startTime.date(today.date());
        startTime.hour(startHours);
        startTime.minute($scope.startTime.mm);

        var timelog = {
            startTime: startTime.format(),
            stopTime: stopTime.format(),
            description: this.description,
            issue: this.issue
        };
        
        Timelogs.save(timelog, function(timelog) {
            $scope.timelogs.push(timelog);
            $scope.getByRange($scope.startDate, $scope.endDate);
        });

    $scope.startTime = {
        hh:moment().format("hh"),
        mm:moment().format("mm"),
        tt:moment().format("A")
    };
    $scope.stopTime = {
        hh:moment().format("hh"),
        mm:moment().format("mm"),
        tt:moment().format("A")
    };
        this.description = '';
        this.issue = null;
    };

    $scope.remove = function(timelog) {
        if(confirm("Are you sure you want to delete?")){
            if (timelog) {
                Timelogs.remove(timelog);

                for (var i in $scope.timelogs) {
                    if ($scope.timelogs[i] === timelog) {
                        $scope.timelogs.splice(i, 1);
                    }
                }
            }
            else {
                Timelogs.remove(timelog);
                $location.path('timelogs');
            }
        }
    };

    $scope.update = function() {

        var stopHours = ($scope.stopTime.tt == "AM" ? $scope.stopTime.hh : parseInt($scope.stopTime.hh) + 12);
        var startHours = ($scope.startTime.tt == "AM" ? $scope.startTime.hh : parseInt($scope.startTime.hh) + 12);
        //startTime
        $scope.timelog.startTime.hour(startHours);
        $scope.timelog.startTime.minute($scope.timelog.startTime.mm);
        //stopTime
        $scope.timelog.stopTime.hour(stopHours);
        $scope.timelog.stopTime.minute($scope.timelog.stopTime.mm);

        Timelogs.update($scope.timelog, function(timelog) {
            $scope.timelog = timelog;
            $scope.getByRange($scope.startDate, $scope.endDate);
        });
    };

    $scope.find = function() {
        Timelogs.get(function(timelogs) {
          $scope.timelogs = timelogs;
      });
    };

    $scope.findOne = function() {
        Timelogs.getById($stateParams.timelogId,
        function(timelog) {
            $scope.timelog = timelog;
        });
    };

    $scope.getByRange = function(startDate,endDate) {
        Timelogs.getByRange(
            Global.user._id,
            startDate, 
            endDate, 
            function(timelogs){
                $scope.timelogs = timelogs;
            });
    };

   
    //---------------------------------
    //Rate/Time Functions
    //---------------------------------

    $scope.hours = function(timelog){
        timelog.hours = Timelogs.hours(timelog);
        $scope.totalHours += timelog.hours;
    }
    
    $scope.hoursByIssue = function(timelog){
        timelog.issueHours = Timelogs.hoursByIssue(timelog, $scope.timelogs);
    }


    $scope.rate = function(timelog){
        Timelogs.rate(timelog, function(rate){
            timelog.rate = rate;
             $scope.totalRate += timelog.rate;
        });
    };

    //---------------------------------
    //Issues Functions
    //---------------------------------
    $scope.getIssuesByUser = function() {
        Issues.getByUser(Global.user._id, 
        function(issues) {
            $scope.issues = issues;
        });
    };


    //---------------------------------
    //Main
    //---------------------------------
    $scope.eventSources = [$scope.events];

    //---------------------------------
    //Listeners
    //---------------------------------
    $scope.$watch('date',function(){
     if($scope.date != $stateParams.date){
        $location.path('timelogs/date/' + new Date($scope.date) + "/" + $scope.view.id)

    }
});

    $scope.$watch('view.value',function(){
        //console.log("view changed");
        //$location.path('timelogs/date/' + new Date($scope.date) + "/" + $scope.view.id)
         //$scope.timelogsCalendar.fullCalendar('changeView', $scope.view.value);
     });



}]);
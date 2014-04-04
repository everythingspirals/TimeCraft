'use strict';

angular.module('mean.timelogs').controller('TimelogsViewController', 
    ['$scope', '$stateParams', '$location', '$timeout', '$aside', 'Global', 'Timelogs', 'Rates', '$log',
    function ($scope, $stateParams, $location, $timeout, $aside, Global, Timelogs, Rates, $log) {

    //---------------------------------
    //Variables
    //---------------------------------

    //timelog
    $scope.global = Global;

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
        console.log("view changed");
        $location.path('timelogs/date/' + new Date($scope.date) + "/" + $scope.view.id)
         //$scope.timelogsCalendar.fullCalendar('changeView', $scope.view.value);
     });



}]);
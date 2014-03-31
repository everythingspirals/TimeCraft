'use strict';

angular.module('mean.sprints').controller('SprintsController', ['$scope', '$stateParams', '$location', 'Global', 'Sprints', 'Issues', 'Timelogs',
    function ($scope, $stateParams, $location, Global, Sprints, Issues, Timelogs) {

    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.sprint = {};
    $scope.sprints = [];

 //calendar

 if(!!$stateParams.view){

  $scope.date = $stateParams.date;

  $scope.events = [];

  $scope.views = [
  {
    id:0,
    title:"Week View",
    type:"weeks",
    value:"basicWeek"
},
{
    id:1,
    title:"Month View",
    type:"month",
    value:"month"
},
{
    id:2,
    title:"List View",
    type:"days",
    value:"basicDay"
}
];

$scope.view = $scope.views[$stateParams.view];

$scope.config = {
 calendar:{
    defaultView: $scope.view.value, 
    header:[],
    year:moment($scope.date).year(),
    month:moment($scope.date).month(),
    date:moment($scope.date).date(),
    viewRender : function(){
        $(window).scrollTop(0);
    },
    eventClick: function(event, jsEvent, view) {
        $scope.edit(event.data.timelog)
        $aside({scope: $scope, template: '/views/issues/edit.html'});
    }
}
};
}
    //---------------------------------
    //Issue Functions
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
            $scope.find();
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

        sprint.$update().then(function(response){
            $scope.find();
        });

    };

    $scope.find = function() {
        Sprints.query(function(sprints) {
            $scope.sprints = sprints;

            if(!!$stateParams.view){
            //remove current events
            angular.forEach($scope.events,function(value, key){
                $scope.events.splice(key, 1);
            });
            
            //refetch from db
            angular.forEach(sprints,function(sprint){
               $scope.events.push({
                   title:sprint.name,
                   start:new Date(sprint.startDate),
                   end: new Date(sprint.stopDate),
                   data:{
                    sprint:sprint
                }
            });
           });
        }
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

    //---------------------------------
    //Main
    //---------------------------------
    $scope.eventSources = [$scope.events];
    //---------------------------------
    //Listeners
    //---------------------------------
    $scope.$watch('date',function(){
     if($scope.date != $stateParams.date){
      $location.path('sprints/date/' + new Date($scope.date) + "/" + $scope.view.id)
  }
});

    $scope.$watch('view.value',function(){
        $location.path('sprints/date/' + new Date($scope.date) + "/" + $scope.view.id)
    });
}]);
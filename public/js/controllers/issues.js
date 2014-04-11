'use strict';

angular.module('mean.issues').controller(
    'IssuesController', 
    ['$scope', 
    '$stateParams', 
    '$location', 
    'Global', 
    'Issues',
    'Timelogs', 
    'Status',
    '$log',
    function ($scope, $stateParams, $location, Global, Issues, Timelogs, Status, $log) {
    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.issue = {
        name:null,
        story:null,
        estimate:null,
        assignedTo:null,
        status:null,
        project:null,
        sprint:null
    };
    $scope.timelogs = [];
    $scope.totalHours = 0;
    $scope.issues = [];
    $scope.views = [{
        id:0,
        title:"List View"
    },
    {
        id:1,
        title:"Workflow View"
    }];
    $scope.view = $scope.views[0];
    //---------------------------------
    //Functions
    //---------------------------------
    $scope.edit = function(issue){
        $scope.issue = issue;
    }

    $scope.create = function() {
        var issue = {
            name: this.name,
            story: this.story,
            estimate: this.estimate,
            assignedTo: this.assignedTo,
            status: this.status,
            project: this.project,
            sprint: this.sprint
        };

        Issues.save(issue, function(issue) {
            $scope.issue = issue;
            $scope.getByRelated();
        });
        
        this.name = '';
        this.story = '';
        this.estimate = 0;
        this.project = null;
        this.sprint = null;
        this.status = null;
        this.assignedTo = null;
    };

    $scope.remove = function(issue) {
        if(confirm("Are you sure you want to delete?")){
            if (issue) {
                Issues.remove(issue);

                for (var i in $scope.issues) {
                    if ($scope.issues[i] === issue) {
                        $scope.issues.splice(i, 1);
                    }
                }
            }
            else {
                $scope.issue.$remove();
                $location.path('issues');
            }
        }
    };

    $scope.update = function() {
        var issue = $scope.issue;
        
        //status
        issue.status = (!!issue.status ? issue.status._id : null);
        //issue
        issue.sprint = (!!issue.sprint ? issue.sprint._id : null);
        //project
        issue.project = (!!issue.project ? issue.project._id : null);
        //createdBy
        issue.createdBy = (!!issue.createdBy ? issue.createdBy._id : null);
        //assignedto
        //issue.assignedTo = (!!issue.assignedTo ? issue.assignedTo._id : null);

        Issues.update(issue, function(response){
            $scope.getByRelated();
        });
    };

    $scope.find = function() {
        Issues.get(function(issues) {
            $scope.issues = issues;
        });
    };

    $scope.getByUser = function() {
        Issues.getByUser(Global.user._id, 
        function(issues) {
            $scope.issues = issues;
        });
    };

    $scope.getTimelogs = function(){
        Timelogs.getByIssue($stateParams.issueId, 
            function(timelogs){
                $scope.timelogs = timelogs;
            }); 
    }

    $scope.hours = function(timelog){
        timelog.hours = Timelogs.hours(timelog);
    }

    $scope.getByRelated = function() {
        Issues.getByRelated(Global.user._id, 
        function(issues) {
            $scope.issues = issues;
        });
    };

    $scope.findBySprint = function() {
        Issues.getBySprint($stateParams.sprintId, 
        function(issues) {
            $scope.issues = issues;
        });
    };

    $scope.findOne = function() {
        Issues.getById($stateParams.issueId,
        function(issue) {
            $scope.issue = issue;
        });
    };

    $scope.getBudget = function(issue){
        Timelogs.getByIssue(issue._id, 
            function(timelogs){
                issue.actual = 0;
                angular.forEach(timelogs, function(timelog){
                    issue.actual += Timelogs.hours(timelog);
             });
             issue.budget = Issues.getBudget(issue.estimate, issue.actual);
        }); 
       
    }
}]);
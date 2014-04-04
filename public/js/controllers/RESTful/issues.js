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
    $scope.issues = [];
    $scope.progress = 0;
    Status.query(function(stati){
        $scope.status = stati[0]._id;            
    });
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
        var issue = new Issues({
            name: this.name,
            story: this.story,
            estimate: this.estimate,
            assignedTo: this.assignedTo,
            status: this.status,
            project: this.project,
            sprint: this.sprint
        });
        issue.$save(function(response) {
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
                issue.$remove();

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
        issue.assignedTo = (!!issue.assignedTo ? issue.assignedTo._id : null);

        issue.$update().then(function(response){
                $scope.getByRelated();
            });
         };

         $scope.find = function() {
            Issues.query(function(issues) {
                $scope.issues = issues;
            });
        };

        $scope.getByUser = function() {
            Issues.getByUser({'userId': Global.user._id}, function(issues) {
                $scope.issues = issues;
            });
        };

        $scope.getByRelated = function() {
            Issues.getByRelated({'userId': Global.user._id}, function(issues) {
                $scope.issues = issues;
            });
        };

        $scope.getByStatus = function(statusId) {
            Issues.getByStatus({'userId': Global.user._id, 'statusId': statusId}, function(issues) {
                $scope.issues = issues;
            });
        };

        $scope.findBySprint = function() {
            Issues.getBySprint({'sprintId': $stateParams.sprintId}, function(issues) {
                $scope.issues = issues;
            });
        };

        $scope.findOne = function() {
            Issues.get({
                issueId: $stateParams.issueId
            }, function(issue) {
                $scope.issue = issue;
                $scope.getBudget(issue);
            });
        };

        $scope.getBudget = function(issue){
            issue.actual = 0;
            issue.budget = 0;
            Timelogs.getByIssue({'issueId': issue._id}, function(timelogs){
                console.log(timelogs.length);
                for(var x=0; x < timelogs.length; x++) { 
                    issue.actual += parseFloat(diff(
                        timelogs[x].startTime,
                        timelogs[x].stopTime
                        ));
                }
                issue.budget =  (issue.actual / issue.estimate * 100).toFixed(2);
            });
        }
    }]);
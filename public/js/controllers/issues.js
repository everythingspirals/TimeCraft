'use strict';

angular.module('mean.issues').controller('IssuesController', ['$scope', '$stateParams', '$location', 'Global', 'Issues', function ($scope, $stateParams, $location, Global, Issues) {
    $scope.global = Global;

    $scope.create = function() {
        var issue = new Issues({
            name: this.name,
            story: this.story,
            estimate: this.estimate,
            assignedTo: this.assignedTo
        });
        issue.$save(function(response) {
            $scope.issues.push(issue);
        });
            this.name = '';
            this.story = '';
            this.estimate = 0;
            this.assignedTo = null;
    };

    $scope.remove = function(issue) {
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
    };

    $scope.update = function() {
        var issue = $scope.issue;
        // if (!issue.updated) {
        //     issue.updated = [];
        // }
        // issue.updated.push(new Date().getTime());

        issue.$update(function() {
            $location.path('issues/' + issue._id);
        });
    };

    $scope.find = function() {
        Issues.query(function(issues) {
            $scope.issues = issues;
        });
    };

    $scope.findOne = function() {
        Issues.get({
            issueId: $stateParams.issueId
        }, function(issue) {
            $scope.issue = issue;
        });
    };
}]);
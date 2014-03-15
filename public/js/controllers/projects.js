'use strict';

angular.module('mean.projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Global', 'Projects', function ($scope, $stateParams, $location, Global, Projects) {
    
    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.projects = [];

    //---------------------------------
    //Functions
    //---------------------------------
    $scope.edit = function(project){
        $scope.project = project;
    }

    $scope.create = function() {
        var project = new Projects({
            name: this.name,
            url: this.url,
            status: this.status,
            client: this.client
        });
        project.$save(function(response) {
            $scope.projects.push(project);
        });

        this.name = '';
        this.url = '';
        this.status = null;
        this.client = null;
    };

    $scope.remove = function(project) {
        if (project) {
            project.$remove();

            for (var i in $scope.projects) {
                if ($scope.projects[i] === project) {
                    $scope.projects.splice(i, 1);
                }
            }
        }
        else {
            $scope.project.$remove();
            $location.path('projects');
        }
    };

    $scope.update = function() {
        var project = $scope.project;
        // if (!project.updated) {
        //     project.updated = [];
        // }
        // project.updated.push(new Date().getTime());

        project.$update(function() {
        });
    };

    $scope.find = function() {
        Projects.query(function(projects) {
            $scope.projects = projects;
        });
    };

    $scope.findOne = function() {
        Projects.get({
            projectId: $stateParams.projectId
        }, function(project) {
            $scope.project = project;
        });
    };

    //---------------------------------
    //Listeners
    //---------------------------------
}]);
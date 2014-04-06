'use strict';

angular.module('mean.projects').controller('ProjectsController', 
    ['$scope', '$stateParams', '$location', 'Global', 'Projects', function ($scope, $stateParams, $location, Global, Projects) {
    
    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.project = {};
    $scope.projects = [];

    //---------------------------------
    //Functions
    //---------------------------------
    $scope.edit = function(project){
        $scope.project = project;
    }

    $scope.create = function() {
        var project = {
            name: this.name,
            url: this.url,
            status: this.status,
            client: this.client
        };
        Projects.save(project, function(project) {
            $scope.projects.push(project);
            $scope.find();
        });
        this.name = '';
        this.url = '';
        this.status = null;
        this.client = null;
    };

    $scope.remove = function(project) {
        if(confirm("Are you sure you want to delete?")){
            if (project) {
                Projects.remove(project);

                for (var i in $scope.projects) {
                    if ($scope.projects[i] === project) {
                        $scope.projects.splice(i, 1);
                    }
                }
            }
            else {
                Projects.remove(project);
                $location.path('projects');
            }
        }
    };

    $scope.update = function() {
    $scope.project.client = $scope.project.client._id;
     Projects.update($scope.project, function(project) {
            $scope.project = project;
            $scope.find();
        });
    };

    $scope.find = function() {
        Projects.get(function(projects) {
          $scope.projects = projects;
      });
    };

    $scope.findOne = function() {
        Projects.getById($stateParams.projectId,
        function(project) {
            $scope.project = project;
        });
    };

    //---------------------------------
    //Listeners
    //---------------------------------
}]);
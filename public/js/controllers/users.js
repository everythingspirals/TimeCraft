'use strict';

angular.module('mean.users').controller('UsersController', ['$scope', '$stateParams', '$location', 'Global', 'Users', function ($scope, $stateParams, $location, Global, Users) {
    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.user = {};
    $scope.users = [];

    //---------------------------------
    //Functions
    //---------------------------------

    $scope.find = function() {
        Users.query(function(users) {
            $scope.users = users;
        });
    };

}]);
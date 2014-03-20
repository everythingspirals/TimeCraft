'use strict';

angular.module('mean.system')

.controller('FooterController', ['$scope', 'Global', 'socket', function ($scope, Global, socket) {
    $scope.global = Global;

    $scope.chatToggle = false;
}]);
'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.today = moment().format('L');
    $scope.menu = [];
    
    $scope.isCollapsed = false;
}]);
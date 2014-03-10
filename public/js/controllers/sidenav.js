'use strict';

angular.module('mean.system').controller('SidenavController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.today = moment().format();
}]);
'use strict';

angular.module('mean.system')

.controller('HeaderController', ['$scope', 'Global', 'socket', function ($scope, Global, socket) {
    $scope.global = Global;
    $scope.today = moment().format('L');
    $scope.menu = [];
    
    socket.on('send:time', function (data) {
      $scope.time = moment(data.time).format('MMMM Do YYYY, h:mm:ss a');
    });

    $scope.isCollapsed = false;
}]);
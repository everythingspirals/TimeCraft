'use strict';

angular.module('mean.system')

.controller('HeaderController', ['$scope', '$rootScope', 'Global', 'socket', function ($scope, $rootScope, Global, socket) {
	$scope.global = Global;
	$scope.today = moment().format('L');
	$scope.navToggle = false;
	$scope.menu = [];

	socket.on('send:time', function (data) {
		$scope.time = moment(data.time).format('MMMM Do YYYY, h:mm:ss a');
	});

	$scope.isCollapsed = false;

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 
			$scope.navToggle = false;
		});
}]);
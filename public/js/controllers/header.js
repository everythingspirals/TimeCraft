'use strict';

angular.module('mean.system')

.controller('HeaderController', ['$scope', '$rootScope', '$location', 'Global', 'socket', 
	function ($scope, $rootScope, $location, Global, socket) {
	
	$scope.global = Global;
	$scope.today = moment().format('MM-DD-YYYY');
	$scope.navToggle = true;
	$scope.page = 	{
		title:"Home",
		icon:"home",
		href:""
	};
	$scope.menuItems = [
	{
		title:"Home",
		icon:"home",
		href:""
	},
	{
		title:"Timelogs",
		icon:"sun-o",
		href:"timelogs/date/" + $scope.today + "/0"
	},
	{
		title:"Sprints",
		icon:"rocket",
		href:"sprints/date/" + $scope.today + "/0"
	},
	{
		title:"Clients",
		icon:"users",
		href:"clients"
	},
	{
		title:"Projects",
		icon:"crop",
		href:"projects"
	},
	{
		title:"Issues",
		icon:"list",
		href:"issues"
	},
	{
		title:"Pay Period",
		icon:"calendar",
		href:"period"
	},
	{
		title:"Paychecks",
		icon:"money",
		href:"paychecks"
	},
	{
		title:"Documentation",
		icon:"file-text-o",
		href:"documentation"
	}
	];

	socket.on('send:time', function (data) {
		$scope.time = moment(data.time).format('MMMM Do YYYY, h:mm:ss a');
	});

	$scope.setPage = function(item){
		$scope.page = item;
	}

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 
			//$scope.navToggle = false;
		});


}]);
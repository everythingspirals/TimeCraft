'use strict';

angular.module('mean.system')

.controller('HeaderController', ['$scope', '$rootScope', '$location', 'Global', 'socket', 
	function ($scope, $rootScope, $location, Global, socket) {

		//Variables
		$scope.global = Global;

		$scope.today = moment().format('MM-DD-YYYY');

		$scope.layout = "condensed"

		$scope.navToggle = true;
		
		$scope.settingsToggle = false;
		
		//Arrays
		$scope.menus = [
			"nav",
			"settings"
		];

		$scope.settingsItems = [
		{
			title:"Status",
			icon:"sort-amount-asc",
			href:"status"
		},
		{
			title:"Rates",
			icon:"dollar",
			href:"rates"
		},
		{
			title:"UI",
			icon:"desktop",
			href:"ui"
		}];

		$scope.navItems = [
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

		$scope.page = $scope.navItems[0];
		
		$scope.menu = $scope.menus[0];

	

		//Functions
		$scope.setPage = function(item){
			$scope.page = item;
		}

		//Listeners
		socket.on('send:time', function (data) {
			$scope.time = moment(data.time).format('MMMM Do YYYY, h:mm:ss a');
		});

		$rootScope.$on('$stateChangeStart', 
			function(event, toState, toParams, fromState, fromParams){ 
			//$scope.navToggle = false;
		});


	}]);
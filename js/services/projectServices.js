angular.module('projectServices', ['ngResource'])
	.factory('Project', function ($resource) {
	    return $resource('http://timecraftapi.azurewebsites.net/api/project');
	})
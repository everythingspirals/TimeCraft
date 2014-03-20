'use strict';

//Timelogs service used for timelogs REST endpoint
angular.module('mean.timelogs').factory('Timelogs', ['$resource', function($resource) {
	return $resource('timelogs/:method', 
			{	timelogId: '@_id'	}, 
			{	update: 	{	method: 'PUT'	}},
			{	getByDay: 	{	method: 'GET', params: { method: 'day' }, isArray: true	}},
			{	getByIssue:	{	method: 'GET', params: { method: 'issue' }, isArray: true	}}
		);
}]);
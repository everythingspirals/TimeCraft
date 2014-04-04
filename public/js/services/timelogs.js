'use strict'; 

//Timelogs service used for timelogs REST endpoint 
angular.module('mean.timelogs').factory('Timelogs', ['$resource', function($resource) { 
	return $resource('timelogs/:timelogId/:method',  
		{     timelogId: '@_id'     },  
		{      
			update:      {     method: 'PUT'     }, 
			getByIssue:     {     method: 'GET', params: { method: 'byIssue' }, isArray: true }, 
			getByRange:  {   method: 'GET', params: { method: 'byRange'}, isArray: true } 
		} 
		); 
}]);
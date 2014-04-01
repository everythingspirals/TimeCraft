'use strict';

//Issues service used for issues REST endpoint
angular.module('mean.issues').factory('Issues', ['$resource', function($resource) {
	return $resource('issues/:issueId/:method', 
		{	issueId: '@_id'    },
		{        
			update: 	{    method: 'PUT'   },
			getByUser:  {	 method: 'GET', params: {method:'user'}, isArray: true},
			getByRelated:  {	method: 'GET', params: {method:'related'}, isArray: true},
			getBySprint:  {	 method: 'GET', params: {method:'sprint'}, isArray: true},
			getByStatus:  {	 method: 'GET', params: {method:'status'}, isArray: true}
		}
	);
}]);
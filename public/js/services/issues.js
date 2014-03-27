'use strict';

//Issues service used for issues REST endpoint
angular.module('mean.issues').factory('Issues', ['$resource', function($resource) {
	return $resource('issues/:issueId/:method', 
		{	issueId: '@_id'    },
		{        
			update: 	{    method: 'PUT'   },
			getByUser:  {	 method: 'GET', params: {method:'getByUser'}, isArray: true}
		}
	);
}]);
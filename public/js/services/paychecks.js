'use strict';

//Paychecks service used for paychecks REST endpoint
angular.module('mean.paychecks').factory('Paychecks', ['$resource', function($resource) {
	return $resource('paychecks/:paycheckId/:method', 
			{	paycheckId: '@_id'	}, 
			{	
				update: 		{	method: 'PUT'	},
				findByRange: 	{	method: 'GET', params: { method: 'findByRange' }, isArray: true	},
			}
		);
}]);
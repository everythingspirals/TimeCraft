'use strict';

//Rates service used for rates REST endpoint
angular.module('mean.rates').factory('Rates', ['$resource', function($resource) {
	return $resource('rates/:rateId/:method', 
			{	rateId: '@_id'	}, 
			{	
				update: 	{	method: 'PUT'	},
				current: 	{	method: 'GET', params: { method: 'current' }, isArray: true	},
				client:		{	method: 'GET', params: { method: 'client' }, isArray: true },
			}
		);
}]);
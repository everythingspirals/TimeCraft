'use strict';

//Rates service used for rates REST endpoint
angular.module('mean.rates')
.service('Rates', ['$resource', function($resource) {
	var resource = $resource('rates/:rateId/:method', 
		{	rateId: '@_id'	}, 
		{	
			update: 	{	method: 'PUT'	},
			current: 	{	method: 'GET', params: { method: 'current' }, isArray: true	},
			client:		{	method: 'GET', params: { method: 'client' }, isArray: true },
			byUser:     {	method: 'GET', params: { method: 'user' }, isArray: true }
		}
		);
	return {
		get: function(callback){
			resource.query(function(rates){
				if (typeof (callback) == 'function') {
					callback(rates);
				}
			})
		},
		getById: function(id, callback){
			resource.get({id:id}, function(rate){
				if (typeof (callback) == 'function') {
					callback(rate);
				}
			})
		},
		getByUser: function(userId, callback){
			resource.byUser({userId:userId}, function(rates){
				if (typeof (callback) == 'function') {
					callback(rates);
				}
			})
		},
		getByClient: function(clientId, userId, callback){
			resource.client({
				clientId: clientId,
				userId: userId
			}, function(rate) {
				if (typeof (callback) == 'function') {
					callback(rate);
				}
			});

		},
		update: function(rate, callback){
			resource.update({id:rate._id}, rate, function(rate){
				if (typeof (callback) == 'function') {
					callback(rate);
				}
			});
		},
		save: function(rate, callback){
			resource.save(rate, function(rate){
				if (typeof (callback) == 'function') {
					callback(rate);
				}
			});
		},
		remove: function(rate, callback){
			resource.remove(rate, function(rate){
				if (typeof (callback) == 'function') {
					callback(rate);
				}
			});
		}

	}
}]);
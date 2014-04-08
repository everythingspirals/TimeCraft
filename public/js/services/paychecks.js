'use strict';

//Paychecks service used for paychecks REST endpoint
angular.module('mean.paychecks')
.service('Paychecks', ['$resource', 'Rates', 'Timelogs' function($resource, Rates, Timelogs) {
	var resource = $resource('paychecks/:paycheckId/:method',
	{
		paycheckId: '@_id'
	},
	{
		update: 		{	method: 'PUT'	},
		findByRange: 	{	method: 'GET', params: { method: 'findByRange' }, isArray: true	},
	});

	return {
		get: function(){
			resource.query(function(paychecks){
				if (typeof (callback) == 'function'){
					callback(paychecks);
				}
			})
		},
		getById: function(id){
			resource.get({id:id}, function(paycheck){
				if (typeof (callback) == 'function'){
					callback(paychecks);
				}
			})
		},
		getByRange: function(userId, startDate, endDate, callback){
			resource.findByRange(
			{
				'startDate': moment(startDate).toISOString(),
				'endDate': moment(endDate).toISOString(),
				'userId': userId
			}, function(paychecks){
				if (typeof (callback) == 'function'){
					callback(paychecks);
				}
			})
		}.
		update: function(paycheck, callback){
			resource.update({id:paycheck._id}, paycheck, function(paycheck){
				if (typeof (callback) == 'function'){
					callback(paycheck);
				}
			})
		},
		save: function(paycheck, callback){
			resource.save(paycheck, function(paycheck){
				if (typeof (callback) == 'function'){
					callback(paycheck);
				}
			})
		},
		remove: function(paycheck, callback){
			resource.remove({id:paycheck._id}, paycheck, function(paycheck){
				if (typeof (callback) == 'function'){
					callback(paycheck);
				}
			})
		},
		loggedHours: function(timelogs){
			var loggedHours = 0;
			angular.forEach(timelogs, function(t){
				loggedHours += diff(t.startTime, t.stopTime);
			});
			return loggedHours;
		}

	}
}]);
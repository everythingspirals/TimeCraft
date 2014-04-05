'use strict'; 

//Timelogs service used for timelogs REST endpoint 
angular.module('mean.timelogs')
.service('Timelogs', ['$resource', 'Rates', function($resource, Rates) { 
	
	var resource = $resource('timelogs/:timelogId/:method',  
	{
		timelogId: '@_id'
	},  
	{      
		update: {method: 'PUT' }, 
		getByIssue: {method: 'GET', params: { method: 'byissue' }, isArray: true}, 
		getByRange:  {method: 'GET', params: { method: 'byrange'}, isArray: true} 
	} 
	);

	return  {
		//---------------------------------
	    //Timelog Functions
	    //---------------------------------
	    get: function(){
	    	resource.query(function(timelogs){
	    		if (typeof (callback) == 'function') {
	    			callback(timelogs);
	    		}
	    	})
	    },
	    getById: function(id){
	    	resource.get({id:id}, function(timelog){
	    		if (typeof (callback) == 'function') {
	    			callback(timelog);
	    		}
	    	})
	    },
	    getByRange: function(userId, startDate, endDate, callback){
	    	resource.getByRange(
	    	{
	    		'startDate': moment(startDate).toISOString(), 
	    		'endDate': moment(endDate).toISOString(), 
	    		'userId': userId}, 
	    		function(timelogs){
	    			if (typeof (callback) == 'function') {
	    				callback(timelogs);
	    			}
	    		});
	    },
	    getByIssue: function() {
	    	resource.getByIssue({'issueId': $stateParams.issueId}, function(timelogs){
	    		if (typeof (callback) == 'function') {
	    			callback(timelogs);
	    		}
	    	});
	    },
	    update: function(timelog, callback){
	    	resource.update(timelog, function(){
	    		if (typeof (callback) == 'function') {
	    			callback(timelog);
	    		}
	    	});
	    },
	    save: function(timelog, callback){
	    	resource.save(timelog, function(){
	    		if (typeof (callback) == 'function') {
	    			callback(timelog);
	    		}
	    	});
	    },
	    remove: function(timelog, callback){
	    	resource.remove(timelog, function(){
	    		if (typeof (callback) == 'function') {
	    			callback(timelog);
	    		}
	    	});
	    },
		//---------------------------------
	    //Rate/Time Functions
	    //---------------------------------
	    hours : function(timelog){
	    	return diff(timelog.startTime, timelog.stopTime);
	    },
	    hoursByIssue : function(timelog,timelogs){
	    	var issueHours = 0;
	    	angular.forEach(timelogs, function(t){
	    		if(timelog.issue.name === t.issue.name){
	    			issueHours += diff(t.startTime, t.stopTime);
	    		}
	    	});
	    	return issueHours;
	    },
	    rate : function(timelog, callback){
	    	Rates.current({
	    		clientId: timelog.issue.project.client,
	    		'userId': timelog.user._id
	    	}, function(rates) {
	    		var rate = timelog.issueHours * rates[0].amount;
	    		if (typeof (callback) == 'function') {
	    			callback(rate);
	    		}
	    	});
	    }
	}
}]);
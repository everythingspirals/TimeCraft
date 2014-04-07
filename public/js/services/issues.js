'use strict';

//Issues service used for issues REST endpoint
angular.module('mean.issues')
.service('Issues', ['$resource', function($resource) {
	var resource = $resource('issues/:issueId/:method',  
		{	issueId: '@_id'    },
		{        
			update: 	{    method: 'PUT'   },
			getByUser:  {	 method: 'GET', params: {method:'user'}, isArray: true},
			getByRelated:  {	method: 'GET', params: {method:'related'}, isArray: true},
			getBySprint:  {	 method: 'GET', params: {method:'sprint'}, isArray: true},
			getByStatus:  {	 method: 'GET', params: {method:'status'}, isArray: true}
		}
		);

	return  {
		//---------------------------------
	    //Issue Functions
	    //---------------------------------
	    get: function(callback){
	    	resource.query(function(issues){
	    		if (typeof (callback) == 'function') {
	    			callback(issues);
	    		}
	    	})
	    },
	    getById: function(id, callback){
	    	resource.get({id:id}, function(issue){
	    		if (typeof (callback) == 'function') {
	    			callback(issue);
	    		}
	    	})
	    },
	    getByUser: function(userId, callback){
	    	resource.getByUser(
	    		{userId: userId}, 
	    		function(issues) {
	    			if (typeof (callback) == 'function') {
	    				callback(issues);
	    			}
	    		});
	    },
	    getByRelated: function(userId, callback){
	    	resource.getByUser(
	    	{
	    		userId: userId,
	    		createdBy: userId
	    	}, 
	    	function(issues) {
	    		if (typeof (callback) == 'function') {
	    			callback(issues);
	    		}
	    	});
	    },
	    getBySprint: function(sprintId, callback){
	    	resource.getBySprint(
	    	{
	    		sprintId: sprintId
	    	}, 
	    	function(issues) {
	    		if (typeof (callback) == 'function') {
	    			callback(issue);
	    		}
	    	});
	    },
	    update: function(issue, callback){
	    	resource.update({id:issue._id}, issue, function(issue){
	    		if (typeof (callback) == 'function') {
	    			callback(issue);
	    		}
	    	});
	    },
	    save: function(issue, callback){
	    	resource.save(issue, function(issue){
	    		if (typeof (callback) == 'function') {
	    			callback(issue);
	    		}
	    	});
	    },
	    remove: function(issue, callback){
	    	resource.remove(issue, function(issue){
	    		if (typeof (callback) == 'function') {
	    			callback(issue);
	    		}
	    	});
	    },
		//---------------------------------
	    //Budget
	    //---------------------------------
	    getBudget : function(estimate, actual){
	    	return (actual / estimate * 100).toFixed(2);
	    }
	}
}]);


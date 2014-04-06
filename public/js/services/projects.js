'use strict'; 

//Projects service used for projects REST endpoint 
angular.module('mean.projects')
.service('Projects', ['$resource', function($resource) { 
	
	var resource = $resource('projects/:projectId/:method',  
	{
		projectId: '@_id'
	},  
	{      
		update: {method: 'PUT' }
	} 
	);

	return  {
		//---------------------------------
	    //Project Functions
	    //---------------------------------
	    get: function(callback){
	    	resource.query(function(projects){
	    		if (typeof (callback) == 'function') {
	    			callback(projects);
	    		}
	    	})
	    },
	    getById: function(id, callback){
	    	resource.get({id:id}, function(project){
	    		if (typeof (callback) == 'function') {
	    			callback(project);
	    		}
	    	})
	    },
	    update: function(project, callback){
	    	resource.update({id:project._id}, project, function(project){
	    		if (typeof (callback) == 'function') {
	    			callback(project);
	    		}
	    	});
	    },
	    save: function(project, callback){
	    	resource.save(project, function(project){
	    		if (typeof (callback) == 'function') {
	    			callback(project);
	    		}
	    	});
	    },
	    remove: function(project, callback){
	    	resource.remove(project, function(project){
	    		if (typeof (callback) == 'function') {
	    			callback(project);
	    		}
	    	});
	    },

	}
}]);
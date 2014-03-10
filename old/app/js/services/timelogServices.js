angular.module('timelogServices', ['ngResource'])
    .service('Timelog', function ($resource) {
    	
    	//variables
    	var resource = $resource(
    		'http://timecraftapi.azurewebsites.net/api/timelog/:method',{ id: "@id" },
            { getbydate: { method: "GET", params: { method: "getbydate" }, isArray:true } }
    	);
    	
    	var timelog = {
	        Issue:null,
	        TimeIn:null,
	        TimeOut:null,
	        Description:null,
	        PublicUserID: null
    	};  
    	
    	var timelogs = [];
    	
    	//functions
    	return {
	        getTimelogs: function () {
	            return timelogs;
	        },
	        setTimelogs : function (array) {
	            timelogs = array;
	        },
	        getTimelog: function (){
	        	return timelog;
	        },
	        setTimelog: function (obj){
	        	timelog = obj;
	        },
	        query: function(params, callback){
	            resource.getbydate(params, function (result) {
	                timelogs = result;
	                callback();
	            })
	        },
	        save: function () {
                resource.save(timelog)
                timelogs.push(timelog);
	        }
	    }
    });

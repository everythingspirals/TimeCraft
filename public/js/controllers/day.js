'use strict';

angular.module('mean.system').controller('DayController',
	['$scope', '$stateParams', '$location', 'Global',
	function ($scope, $stateParams, $location, Global) {
     //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.date = $stateParams.date;
    $scope.timelogs = [];
    
    //---------------------------------
    //Functions
    //---------------------------------
     $scope.diff = function(timein,timeout){
        timein = moment(timein);
        timeout = moment(timeout);
        if (timeout < timein){
            timeout.add('days',1);
        }
        return timeout.diff(timein,'hours');
    };
    
    //---------------------------------
    //Listeners
    //---------------------------------
    $scope.$watch('date',function(){
        //$location.path( "day/" + moment($scope.date).format('MM-DD-YYYY') );
    });
}]);
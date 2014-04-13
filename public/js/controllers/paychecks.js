'use strict';

angular.module('mean.paychecks').controller('PaychecksController', 
    ['$scope', '$stateParams', '$location', 'Global', 'Paychecks', '$log', function ($scope, $stateParams, $location, Global, Paychecks, $log) {

    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.paycheck = {};
    $scope.paychecks = [];
    $scope.timelogs = [];

    // $scope.startDate = moment();
    // $scope.endDate = moment();

    //---------------------------------
    //Functions
    //---------------------------------
    $scope.edit = function(paycheck){
        $scope.paycheck = paycheck;
    };

    $scope.create = function() {
        var openDate = moment(this.startDate);
        var closeDate = moment(this.startDate);

        openDate.set('hour', 0);
        openDate.set('minute', 0);
        openDate.set('second', 0);

        closeDate.set('hour', 23);
        closeDate.set('minute', 59);
        closeDate.set('second', 59);

        var paycheck = {
            startDate: openDate.format(),
            endDate: closeDate.format()
        };


        Paychecks.save(paycheck, function(paycheck) {
            $scope.paychecks.push(paycheck);
        });
    };

    $scope.remove = function(paycheck) {
        if(confirm("Are you sure you want to delete?")){
            if (paycheck) {
                Paychecks.remove(paycheck);

                $log.info(paycheck);

                for (var i in $scope.paychecks) {
                    if ($scope.paychecks[i] === paycheck) {
                        $scope.paychecks.splice(i, 1);
                    }
                }
            }
            else {
                Paychecks.remove(paycheck);
                $location.path('paychecks');
            }
        }
    };

    $scope.update = function() {
        var paycheck = $scope.paycheck;
        // if (!paycheck.updated) {
        //     paycheck.updated = [];
        // }
        // paycheck.updated.push(new Date().getTime());

        paycheck.$update(function() {
            //$location.path('paychecks/' + paycheck._id);
        });
    };

    $scope.find = function() {
     Paychecks.get(function(paychecks) {
      $scope.paychecks = paychecks;
  });
 };

 $scope.findOne = function() {
    Paychecks.getById({ paycheckId: $stateParams.paycheckId }, 
        function(paycheck) {
            $scope.paycheck = paycheck;
        });
};

$scope.getByRange = function(startDate, endDate){
    $scope.totalHours = 0;
    $scope.totalRate = 0;
    $scope.timelogs = [];

    Paychecks.getByRange(
        Global.user._id,
        startDate,
        endDate,
        function(paychecks){
            $scope.paychecks = paychecks;
        });
};

$scope.loggedHours = function(timelog){
    paycheck.loggedHours = Paychecks.loggedHours(timelog, $scope.paychecks);
}

    //---------------------------------
    //Listeners
    //---------------------------------
    // $scope.$watch('startDate',function(){
    //    $log.info($scope.startDate);
    // });
}]);
'use strict';

angular.module('mean.paychecks').controller('PaychecksController', 
    ['$scope', '$stateParams', '$location', 'Global', 'Paychecks', function ($scope, $stateParams, $location, Global, Paychecks) {
    
    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.paycheck = {};
    $scope.paychecks = [];

    //---------------------------------
    //Functions
    //---------------------------------
    $scope.edit = function(paycheck){
        $scope.paycheck = paycheck;
    }

    $scope.create = function() {
        var paycheck = new Paychecks({
            // amount: this.amount,
            // startDate: this.startDate,
            // client: this.client
        });
        paycheck.$save(function(response) {
            $scope.paychecks.push(paycheck);
        });
    };

    $scope.remove = function(paycheck) {
        if(confirm("Are you sure you want to delete?")){
            if (paycheck) {
                paycheck.$remove();

                for (var i in $scope.paychecks) {
                    if ($scope.paychecks[i] === paycheck) {
                        $scope.paychecks.splice(i, 1);
                    }
                }
            }
            else {
                $scope.paycheck.$remove();
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
        Paychecks.query({'userId': Global.user._id},
            function(paychecks) {
            $scope.paychecks = paychecks;
        });
    };

    $scope.findOne = function() {
        Paychecks.get({
            paycheckId: $stateParams.paycheckId
        }, function(paycheck) {
            $scope.paycheck = paycheck;
        });
    };

    $scope.getByRange = function(startDate, endDate){
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
}]);
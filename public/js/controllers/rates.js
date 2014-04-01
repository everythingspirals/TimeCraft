'use strict';

angular.module('mean.rates').controller('RatesController', 
    ['$scope', '$stateParams', '$location', 'Global', 'Rates', function ($scope, $stateParams, $location, Global, Rates) {
    
    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.rate = {};
    $scope.rates = [];

    //---------------------------------
    //Functions
    //---------------------------------
    $scope.edit = function(rate){
        $scope.rate = rate;
    }

    $scope.create = function() {
        var rate = new Rates({
            amount: this.amount,
            startDate: this.startDate,
            client: this.client
        });
        rate.$save(function(response) {
            $scope.rates.push(rate);
        });
    };

    $scope.remove = function(rate) {
        if(confirm("Are you sure you want to delete?")){
            if (rate) {
                rate.$remove();

                for (var i in $scope.rates) {
                    if ($scope.rates[i] === rate) {
                        $scope.rates.splice(i, 1);
                    }
                }
            }
            else {
                $scope.rate.$remove();
                $location.path('rates');
            }
        }
    };

    $scope.update = function() {
        var rate = $scope.rate;
        // if (!rate.updated) {
        //     rate.updated = [];
        // }
        // rate.updated.push(new Date().getTime());

        rate.$update(function() {
            //$location.path('rates/' + rate._id);
        });
    };

    $scope.find = function() {
        Rates.query(function(rates) {
            $scope.rates = rates;
        });
    };

    $scope.findOne = function() {
        Rates.get({
            rateId: $stateParams.rateId
        }, function(rate) {
            $scope.rate = rate;
        });
    };

    $scope.client = function() {
        Rates.client({
            clientId: $stateParams.clientId
        }, function(rate) {
            $scope.rate = rate;
        });
    };

    $scope.current = function() {
        Rates.current({
            clientId: $stateParams.clientId
        }, function(rates) {
            $scope.rate = rates[0];
        });
    };

    //---------------------------------
    //Listeners
    //---------------------------------
}]);
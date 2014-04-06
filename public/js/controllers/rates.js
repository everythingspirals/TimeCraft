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
        var rate = {
            amount: this.amount,
            startDate: this.startDate,
            client: this.client
        };
        Rates.save(rate, function(rate) {
            $scope.rates.push(rate);
        });
    };

    $scope.remove = function(rate) {
        if(confirm("Are you sure you want to delete?")){
            if (rate) {
                Rates.remove(rate);

                for (var i in $scope.rates) {
                    if ($scope.rates[i] === rate) {
                        $scope.rates.splice(i, 1);
                    }
                }
            }
            else {
                Rates.remove(rate);
                $location.path('rates');
            }
        }
    };

    $scope.update = function() {
     Rates.update($scope.rate, function(rate) {
            $scope.rate = rate;
            $scope.getByRange($scope.startDate, $scope.endDate);
        });
    };

    $scope.find = function() {
        Rates.get(function(rates) {
          $scope.rates = rates;
      });
    };

    $scope.findOne = function() {
        Rates.getById($stateParams.rateId,
        function(rate) {
            $scope.rate = rate;
        });
    };

    $scope.findByUser = function() {
        Rates.getByUser(Global.user._id,
        function(rates) {
            $scope.rates = rates;
        });
    };

    $scope.client = function(client) {
        Rates.rate(client, function(rate){
            $scope.rate = rate;
        })
    };

    $scope.current = function() {
        Rates.current({
            clientId: $stateParams.clientId,
            'userId': Global.user._id
        }, function(rates) {
            $scope.rate = rates[0];
        });
    };

    //---------------------------------
    //Listeners
    //---------------------------------
}]);
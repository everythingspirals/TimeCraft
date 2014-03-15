'use strict';

angular.module('mean.clients').controller('ClientsController', ['$scope', '$stateParams', '$location', 'Global', 'Clients', function ($scope, $stateParams, $location, Global, Clients) {
    
    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.clients = [];

    //---------------------------------
    //Functions
    //---------------------------------
    $scope.create = function() {
        var client = new Clients({
            name: this.name,
        });
        client.$save(function(response) {
            $scope.clients.push(client);
        });

        this.name = '';
    };

    $scope.remove = function(client) {
        if (client) {
            client.$remove();

            for (var i in $scope.clients) {
                if ($scope.clients[i] === client) {
                    $scope.clients.splice(i, 1);
                }
            }
        }
        else {
            $scope.client.$remove();
            $location.path('clients');
        }
    };

    $scope.update = function() {
        var client = $scope.client;
        // if (!client.updated) {
        //     client.updated = [];
        // }
        // client.updated.push(new Date().getTime());

        client.$update(function() {
            $location.path('clients/' + client._id);
        });
    };

    $scope.find = function() {
        Clients.query(function(clients) {
            $scope.clients = clients;
        });
    };

    $scope.findOne = function() {
        Clients.get({
            clientId: $stateParams.clientId
        }, function(client) {
            $scope.client = client;
        });
    };

    //---------------------------------
    //Listeners
    //---------------------------------
}]);
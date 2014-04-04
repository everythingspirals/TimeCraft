'use strict';

angular.module('mean.status').controller('StatusController', ['$scope', '$stateParams', '$location', 'Global', 'Status', 
    function ($scope, $stateParams, $location, Global, Status) {
    
    //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    
    $scope.status = {
        name:'',
        type:''
    };

    $scope.stati = [];

    //---------------------------------
    //Functions
    //---------------------------------
    $scope.edit = function(status){
        $scope.status = status;
    }

    $scope.create = function() {
        var status = new Status({
            name: this.name,
            type: this.type
        });
        status.$save(function(response) {
            $scope.stati.push(status);
        });

        this.name = '';
        this.type = '';
    };

    $scope.remove = function(status) {
        if(confirm("Are you sure you want to delete?")){
            if (status) {
                status.$remove();

                for (var i in $scope.stati) {
                    if ($scope.stati[i] === status) {
                        $scope.stati.splice(i, 1);
                    }
                }
            }
            else {
                $scope.status.$remove();
                $location.path('status');
            }
        }
    };

    $scope.update = function() {
        var status = $scope.status;
        // if (!status.updated) {
        //     status.updated = [];
        // }
        // status.updated.push(new Date().getTime());

        status.$update(function() {
            //$location.path('stati/' + status._id);
        });
    };

    $scope.find = function() {
        Status.query(function(stati) {
            $scope.stati = stati;
        });
    };

    $scope.findOne = function() {
        Status.get({
            statusId: $stateParams.statusId
        }, function(status) {
            $scope.status = status;
        });
    };

    //---------------------------------
    //Listeners
    //---------------------------------
}]);
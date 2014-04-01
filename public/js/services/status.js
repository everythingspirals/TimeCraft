'use strict';

//Statuss service used for statuss REST endpoint
angular.module('mean.status').factory('Status', ['$resource', function($resource) {
    return $resource('status/:statusId', {
        statusId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
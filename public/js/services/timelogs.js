'use strict';

//Timelogs service used for timelogs REST endpoint
angular.module('mean.timelogs').factory('Timelogs', ['$resource', function($resource) {
    return $resource('timelogs/:timelogId', {
        timelogId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
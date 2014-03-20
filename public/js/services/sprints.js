'use strict';

//Sprints service used for sprints REST endpoint
angular.module('mean.sprints').factory('Sprints', ['$resource', function($resource) {
    return $resource('sprints/:sprintId', {
        sprintId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
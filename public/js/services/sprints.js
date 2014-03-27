'use strict';

//Sprints service used for sprints REST endpoint
angular.module('mean.sprints').factory('Sprints', ['$resource', function($resource) {
    return $resource('sprints/:sprintId/:method', {
        sprintId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        getByProject:	{	method: 'GET', params: { method: 'project' }, isArray: true	}
    });
}]);
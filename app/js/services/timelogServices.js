angular.module('timelogServices', ['ngResource'])
    .factory('Timelog', function ($resource) {
        var resource = $resource('http://timecraftapi.azurewebsites.net/api/timelog/:method',
            { id: "@id" },
            { getbydate: { method: "GET", params: { method: "getbydate" } } });
    });
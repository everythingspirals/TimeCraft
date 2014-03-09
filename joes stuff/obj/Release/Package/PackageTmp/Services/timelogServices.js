angular.module('timelogServices', ['ngResource'])
    .factory('Timelog', function ($resource) {
        var resource = $resource('http://timecraftapi.azurewebsites.net/api/timelog/:method',
            { id: "@id" },
            { getbydate: { method: "GET", params: { method: "getbydate" } } });

        var timeLogs = {};
        return {
            getTimelogs: function (params, callback) {
                return resource.getbydate(params, function (cb) {
                    if (typeof (callback) == 'function') {
                        callback();
                    }
                });
            },
            save: function (params, callback) {
                return resource.save(params, function (cb) {
                    if (typeof (callback) == 'function') {
                        callback();
                    }
                });
            }
        }
    });
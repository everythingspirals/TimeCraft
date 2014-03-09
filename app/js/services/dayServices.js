angular.module('dayServices', ['ngResource', 'ngCookies'])
    .factory('Day', function ($cookieStore, $resource, $location) {

        var resource = $resource('http://timecraftapi.azurewebsites.net/api/timelog/:method',
            { id: "@id" },
            { getbydate: { method: "GET", params: { method: "getbydate" }, isArray:true } });

        var timeLogs = {};
        
        return {
            getTimelogs: function (params, callback) {
                return resource.getbydate(params, function (cb) {
                    if (typeof (callback) == 'function') {
                        callback();
                    }
                });
            }
        }
    });
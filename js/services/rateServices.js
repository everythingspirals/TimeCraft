angular.module('rateServices', ['ngResource'])
    .factory('Rate', function ($resource) {

        var resource = $resource('http://timecraftapi.azurewebsites.net/api/rate/:method',
            { id: "@id" },
            { getRate: { method: "GET", params: { method: "getRate" } } });

        return {
            getRate: function (params, callback) {
                return resource.getRate(params, function (cb) {
                    if (typeof (callback) == 'function') {
                        callback();
                    }
                });
            }
        }
    });
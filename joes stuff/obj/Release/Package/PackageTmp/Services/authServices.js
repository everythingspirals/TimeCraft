angular.module('authServices', ['ngResource', 'ngCookies'])
    .factory('Auth', function ($cookieStore, $resource, $location) {

        var resource = $resource('http://timecraftapi.azurewebsites.net/api/publicuser/:method',
            { id: "@id" },
            { login: { method: "GET", params: { method: "login" } } });

        var _user = {};

        return {
            setCookie: function () {
                $cookieStore.put('session', _user);
            },
            getCookie: function () {
                return $cookieStore.get('session');
            },
            getUser: function (params, callback) {
                resource.login(params, function (cb) {
                    _user = cb;
                    if (typeof (callback) == 'function') {
                        callback();
                    }
                });
            }
        }
    });




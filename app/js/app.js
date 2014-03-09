var app = angular.module('app',
    [
        //Core
        'ngRoute',
        'ngCookies',

        //Services
        'authServices',
        'dayServices',
        'miscServices',
        'projectServices',
        'rateServices',
        'timelogServices',

        //Directives
        'miscDirectives',

        //Plugins
        'ui.bootstrap'
    ]);
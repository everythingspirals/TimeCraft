var app = angular.module('app',
    [
        //Core
        'ngAnimate',
        'ngCookies',
        'ngRoute',
      
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
        'mgcrea.ngStrap'
    ]);
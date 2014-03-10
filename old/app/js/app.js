var app = angular.module('app',
    [
        //Core
        'ngAnimate',
        'ngCookies',
        'ngRoute',
      
        //Services
        'authServices',
        'miscServices',
        'projectServices',
        'rateServices',
        'timelogServices',

        //Directives
        'miscDirectives',

        //Plugins
        'mgcrea.ngStrap',
    ]);
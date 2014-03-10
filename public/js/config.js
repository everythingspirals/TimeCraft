'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
    .state('create timelog', {
        url: '/timelogs/create',
        templateUrl: 'views/timelogs/create.html'
    })
      .state('edit timelog', {
        url: '/timelogs/:timelogId/edit',
        templateUrl: 'views/timelogs/edit.html'
    })
      .state('timelog by date', {
        url: '/timelogs/:date',
        templateUrl: 'views/timelogs/list.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);

'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

     $stateProvider
    
    //Issues
    .state('create issue', {
        url: '/issues/create',
        templateUrl: 'views/issues/create.html'
    })
      .state('edit issue', {
        url: '/issues/:issueId/edit',
        templateUrl: 'views/issues/edit.html'
    })
      .state('issue by date', {
        url: '/issues',
        templateUrl: 'views/issues/list.html'
    })
    
    //Timelogs
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

    //Projects
    .state('create project', {
        url: '/projects/create',
        templateUrl: 'views/projects/create.html'
    })
      .state('edit project', {
        url: '/projects/:projectId/edit',
        templateUrl: 'views/projects/edit.html'
    })
      .state('project by date', {
        url: '/projects',
        templateUrl: 'views/projects/list.html'
    })

    //Clients
    .state('create client', {
        url: '/clients/create',
        templateUrl: 'views/clients/create.html'
    })
      .state('edit client', {
        url: '/clients/:clientId/edit',
        templateUrl: 'views/clients/edit.html'
    })
      .state('client by date', {
        url: '/clients',
        templateUrl: 'views/clients/list.html'
    })
    
    //Default
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

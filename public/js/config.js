'use strict';

//Setting up route
angular.module('mean')
.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider) {
    
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

     $stateProvider
    
    //Issues
    .state('view issue', {
        url: '/issues/:issueId',
        templateUrl: 'views/issues/view.html'
    })
    .state('create issue', {
        url: '/issues/create',
        templateUrl: 'views/issues/create.html'
    })
    .state('edit issue', {
        url: '/issues/:issueId/edit',
        templateUrl: 'views/issues/edit.html'
    })
    .state('issue list', {
        url: '/issues',
        templateUrl: 'views/issues/list.html'
    })

    //Sprints
    .state('view sprint', {
        url: '/sprints/:sprintId',
        templateUrl: 'views/sprints/view.html'
    })
    .state('create sprint', {
        url: '/sprints/create',
        templateUrl: 'views/sprints/create.html'
    })
    .state('edit sprint', {
        url: '/sprints/:sprintId/edit',
        templateUrl: 'views/sprints/edit.html'
    })
    .state('sprint list', {
        url: '/sprints/date/:date/:view',
        templateUrl: 'views/sprints/list.html'
    })


    //Timelogs
    .state('view timelog', {
        url: '/timelogs/:timelogId',
        templateUrl: 'views/timelogs/view.html'
    })
    .state('create timelog', {
        url: '/timelogs/create',
        templateUrl: 'views/timelogs/create.html'
    })
      .state('edit timelog', {
        url: '/timelogs/:timelogId/edit',
        templateUrl: 'views/timelogs/edit.html'
    })
      .state('timelogs by date', {
        url: '/timelogs/date/:date/:view',
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
    

          //Blog
      .state('blog', {
        url: '/blog',
        templateUrl: 'views/blog.html'
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

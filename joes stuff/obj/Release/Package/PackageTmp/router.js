app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        //Route Configuration
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html'
            })
            .when('/home', {
                templateUrl: 'views/home.html'
            })
            .when('/day/:date', {
                templateUrl: 'views/day.html'
            })
            .when('/timelog/create/:date', {
                templateUrl: 'views/timelog-create.html'
            })
}]);
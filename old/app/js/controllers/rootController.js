function rootController($scope, $rootScope, $location, Auth) {
    $scope.$on('$routeChangeStart', function (event, current, previous) {
        $rootScope.session = Auth.getCookie('session');
        if (!$rootScope.session) {
            $location.path('/');
        }

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } today = mm + '-' + dd + '-' + yyyy;

        $rootScope.today = {};
        $rootScope.today.day = dd;
        $rootScope.today.month = mm;
        $rootScope.today.year = yyyy;
        $rootScope.today.date = today;
    });
}
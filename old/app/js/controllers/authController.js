function authController($scope, Auth, $cookieStore, $location) {
    $scope.result = {};

    $scope.Login = function () {
        Auth.getUser({ UserName: $scope.userName, Password: $scope.password }, function () {
            Auth.setCookie();
            $location.path('/home');
        });
    }
}
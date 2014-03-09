function dayController($scope, $rootScope, Auth, Day, $route, $location) {
    $scope.$on('$routeChangeSuccess', function (event, current, previous) {

        //if we landed on this page with route params
        if ($route.current.params.date) {
            //retrieve and parse the date from the route params
            var date = $route.current.params.date;
        } else {
            //else, set the date to today's date
            var date = $rootScope.today.date;
        }

        var dateArray = date.split('-');
        var month = dateArray[0];
        var day = dateArray[1];
        var year = dateArray[2];
      
        $scope.pickerDate = {};

        //set the datepicker
        $scope.pickerDate = date;

        //retrieve the date's timelogs
        $scope.timelogs = Day.getTimelogs({ Day: day, Month: month, Year: year, PublicUserID: $rootScope.session.PublicUserID });

    });
}
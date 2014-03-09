function timelogController($scope, $rootScope, $route, $location, Timelog, Rate, Project) {
    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
        //if we landed on this page with route params
        if ($route.current.params.date) {
            //retrieve and parse the date from the route params
            var date = $route.current.params.date;
        } else {
            //else, set the date to today's date
            var date = $rootScope.today.date;
        }

        $scope.timelog = {};

        //parse the date
        var dateArray = date.split('-');
        var month = dateArray[0];
        var day = dateArray[1];
        var year = dateArray[2];

        $scope.date = {};

        //set the datepicker
        $scope.date = date;

        

        //get rate
        var rate = Rate.getRate({ Received: date, PublicUserID: $rootScope.session.PublicUserID });

        //get projects
        $scope.projects = Project.query();

        var timeIn = '';
        var timeOut = '';

        $scope.$watch('In', function () {
            $scope.hours = calculateHours();
            $scope.amount = $scope.hours * rate.Rate;
            timeIn = $scope.In;
            console.log(timeIn);
        });

        $scope.$watch('Out', function () {
            $scope.hours = calculateHours();
            $scope.amount = $scope.hours * rate.Rate;
            timeOut = $scope.Out;
            console.log(timeOut);
        });

        $scope.Create = function () {
            //tInObj = new Date($scope.timelog.TimeIn);
            //tOutObj = new Date($scope.timelog.TimeOut);         
            $scope.timelog.TimeLogID = 0;
            $scope.timelog.PublicUserID = $rootScope.session.PublicUserID;
            $scope.timelog.TimeIn = timeIn;
            $scope.timelog.TimeOut = timeOut;
            $scope.timelog.Day = day;
            $scope.timelog.Month = month;
            $scope.timelog.Year = year;
            $scope.timelog.Logged = false;
            Timelog.save($scope.timelog, function (data) {
                $location.path('/day/' + $route.current.params.date);
            })
        }
    });

    function calculateHours() {

        tInObj = new Date($scope.In);
        tOutObj = new Date($scope.Out);

        tIn = tInObj.getTime();
        tOut = tOutObj.getTime();

        ms = tOut - tIn;
        h = (ms / 3600000).toFixed(2);

        return h;
    }
}
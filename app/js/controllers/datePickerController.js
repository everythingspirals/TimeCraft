var datepickerController = function ($scope, $location) {
    //$scope.today = function () {
    //    $scope.pickerDate = new Date();
    //};
    //$scope.today();

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
        $scope.showWeeks = !$scope.showWeeks;
    };

    $scope.clear = function () {
        $scope.pickerDate = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = ($scope.minDate) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 0
    };

    $scope.$watch('pickerDate', function () {
        var date = new Date($scope.pickerDate);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        $location.path('/day/' + month + '-' + day + '-' + year);
    })

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate', 'MM-dd-yyyy'];
    $scope.format = $scope.formats[3];
};
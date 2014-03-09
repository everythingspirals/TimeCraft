function dayController($scope, $route, $rootScope, $location, Auth, Timelog) {

    //---------------------------------
    //Variables
    //---------------------------------
    $scope.timelog = {};

    $scope.timelogs = [];
    
    $scope.date;
  
    //---------------------------------
    //Functions
    //---------------------------------
    $scope.edit = function(timelog){
        $scope.timelog = timelog;
    }
     $scope.diff = function(timein,timeout){ 
        console.log(timein)
        timein = moment(timein); 
        timeout = moment(timeout) 
        if (timeout < timein){ 
            timeout.add('days',1) 
        }
        return timeout.diff(timein,'hours') 
    }
    $scope.create = function(){
        
        //crap-------------------------------
        var date = $route.current.params.date;
        var dateArray = date.split('-');
        var month = dateArray[0];
        var day = dateArray[1];
        var year = dateArray[2];
        $scope.timelog.Day = day;
        $scope.timelog.Month = month;
        $scope.timelog.Year = year;
        $scope.timelog.IssueNumber = 1;
        //-----------------------------

        $scope.timelog.PublicUserID = $rootScope.session.PublicUserID;
        Timelog.setTimelog($scope.timelog)
        Timelog.save();

    }
    $scope.save = function(){
        Timelog.setTimelog($scope.timelog)
        Timelog.save();
        $scope.timelogs = Timelog.getTimelogs();
    }
    //---------------------------------
    //Listeners
    //---------------------------------
    $scope.$watch('date',function(){
        $location.path( "day/" + moment($scope.date).format('MM-DD-YYYY') );
    });

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {

        var date = $route.current.params.date;
       
        $scope.date = date;

        //retrieve the date's timelogs
        var dateArray = date.split('-');
        var month = dateArray[0];
        var day = dateArray[1];
        var year = dateArray[2];
        Timelog.query({ Day: day, Month: month, Year: year, PublicUserID: $rootScope.session.PublicUserID }, 
            function(result){
                $scope.timelogs = Timelog.getTimelogs();
            }
        );
    });
}
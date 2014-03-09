function projectController($scope, Project) {
    $scope.projects = Project.query();
}
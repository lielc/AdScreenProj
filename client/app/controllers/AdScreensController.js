app.controller('AdScreensController',['$scope','AdScreenService', function ($scope, AdScreenService) {
    init();

    function init() {
      AdScreenService.getAdScreens().then(function (results){
            $scope.adScreens = results.messages;
        });
    };
}]);

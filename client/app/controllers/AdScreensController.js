app.controller('AdScreensController', function ($scope, AdScreenService) {
    init();

    function init() {
        $scope.adScreens = AdScreenService.getAdScreens();
    };
});

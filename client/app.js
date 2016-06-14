var app = angular.module('AdScreenManager', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/AdScreensManager',
            {
                controller: 'AdScreensController',
                templateUrl: 'app/partials/AdScreensPartial.html'
            })
        .when('/ScreenEdit',
            {
                controller: 'ScreenEditController',
                templateUrl: 'app/partials/ScreenEditPartial.html'
            })
        .otherwise({ redirectTo: '/AdScreensManager' });
});

define([], function() {
    var MainAppModule = angular.module('MainAppModule', ['ngRoute']);

    angular.module('MainAppModule').config(routeConfig);
    routeConfig.$inject = ['$routeProvider', '$controllerProvider', '$provide', '$compileProvider'];

    function routeConfig($routeProvider, $controllerProvider, $provide, $compileProvider) {

        angular.module('MainAppModule').register = {
            controller: $controllerProvider.register,
            factory: $provide.factory,
            service: $provide.service,
            directive: $compileProvider.directive

        };

        function resolveController(names) {
            return {
                sharedObj: function() {
                    return 'sharedObj';
                },
                load: ['$q', '$rootScope', function($q, $rootScope) {
                    var defer = $q.defer();
                    require(names, function() {
                        defer.resolve();
                        $rootScope.$apply();
                    });
                    return defer.promise;
                }]
            }
        }

        $routeProvider
            .when("/dashboard", {
                templateUrl: "view/dashboard/dashboard.html",
                controller: "DashboardController as dbCtrl",
                resolve: resolveController(["../view/dashboard/dashboard-controller"])
            })
            .when("/visjs", {
                templateUrl: "view/visjs/visjs.html",
                controller: "VisjsController as vsCtrl",
                resolve: resolveController(["../view/visjs/visjs-controller"])
            })
            .otherwise({
                redirectTo: '/dashboard'
            });
    } //routeConfig

    return MainAppModule;
});

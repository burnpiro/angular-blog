'use strict';

angular.module('app', [
    'ui.router',
    'ngAnimate',
    'restangular',
    'ngMaterial',

    //components
    'app.home',
    'app.menu',
    'app.grid',
    'app.article',
    'app.login',
    'app.admin',

    //services
    'app.services'
])
    .config(function(RestangularProvider, $windowProvider) {
        RestangularProvider.setBaseUrl(config.host);
        var interceptor = authInterceptor($windowProvider.$get());
        RestangularProvider.addFullRequestInterceptor(interceptor.request);
    })
    //.config(["$locationProvider", function($locationProvider) {
    //    $locationProvider.html5Mode(true);
    //}])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-green')
            .accentPalette('orange');
    })
    .config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /
    //$urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            views: {
                "" :{
                    templateUrl: "components/home/home.html",
                    controller: 'HomeController',
                    controllerAs: 'home'
                },
                "bottomMenu": {
                    templateUrl: "components/menu/menu.html"
                }
            }
        })
    });

function authInterceptor($window) {
    return {
        request: function(element, operation, route, url, headers, params, httpConfig) {
            if ($window.localStorage.token) {
                headers.Authorization = 'Bearer ' + $window.localStorage.token;
            }
            return {
                element: element,
                headers: headers,
                params: params,
                httpConfig: httpConfig
            };
        }
    }
}
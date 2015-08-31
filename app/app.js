'use strict';

angular.module('app', [
    'ui.router',
    'ngAnimate',
    'restangular',
    'ngMaterial',
    'toastr',

    //components
    'app.home',
    'app.menu',
    'app.grid',
    'app.article',
    'app.login',
    'app.admin',
    'app.about',
    'app.contact',

    //services
    'app.services'
])
    .config(function(RestangularProvider, $windowProvider) {
        RestangularProvider.setBaseUrl(config.host);
        var interceptor = authInterceptor($windowProvider.$get());
        RestangularProvider.addFullRequestInterceptor(interceptor.request);
    })
    .config(["$locationProvider", function($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-green')
            .accentPalette('orange');
    })
    .config(function($stateProvider, $urlRouterProvider){

     //For any unmatched url, send to /
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            views: {
                "" :{
                    templateUrl: "components/home/home.html",
                    controller: 'HomeController',
                    controllerAs: 'home',
                    resolve: {
                        posts: ['PostService',
                            function(PostService) {
                                return PostService.getRecentPosts();
                            }]
                    }
                },
                "bottomMenu": {
                    templateUrl: "components/menu/menu.html"
                }
            }
        })
        .state('about', {
            url: "/about",
            views: {
                "" :{
                    templateUrl: "components/about/about.html",
                    controller: 'AboutController',
                    controllerAs: 'about'
                },
                "bottomMenu": {
                    templateUrl: "components/menu/menu.html"
                }
            }
        })
    })
    .config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            timeOut: 1000
        });
    })
    .run(function(Restangular, toastr) {
        Restangular.setErrorInterceptor(
            function(response) {
                var message = response.message;
                if(_.isUndefined(message)){
                    switch(response.status) {
                        case 400:
                            message = 'Bad request';
                            break;
                        case 401:
                            message = 'Unauthorized';
                            break;
                        case 403:
                            message = 'You have no access to this area';
                            break;
                        case 404:
                            message = 'Resource not found';
                            break;
                        case 500:
                            message = 'Internal server error';
                            break;
                    }
                }
                toastr.error(message, 'Error');
                return response;
            }
        )
    })
    .run(function($rootScope, $timeout){
        $rootScope
            .$on('$stateChangeStart',
            function(){
                // we have to remove scroll event because it is used in other places and need to be refreshed
                $(document).off( "scroll" );
                if(!$rootScope.loadingStart) {
                    var loader = $(".loader");
                    if(loader.hasClass('active')) {
                        $(".loader").removeClass("active");
                    }
                    if(!loader.hasClass('active')) {
                        $(".loader").addClass("active");
                    }
                    $rootScope.loadingStart = true;
                    $timeout(function() {
                        $(".loader").removeClass("active");
                    }, 2500);
                }
            });

        $rootScope
            .$on('$stateChangeSuccess',
            function(){
                $rootScope.loadingStart = false;
            });

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
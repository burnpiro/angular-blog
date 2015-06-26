'use strict';

angular.module('app', [
    'ngNewRouter',
    'ngAnimate',
    'restangular',
    'ngMaterial',

    //components
    'app.home',
    'app.menu',
    'app.grid',
    'app.article',
    'app.login',

    //services
    'app.services'
])
    .config(function(RestangularProvider, $windowProvider) {
        RestangularProvider.setBaseUrl(config.host);
        var interceptor = authInterceptor($windowProvider.$get());
        RestangularProvider.addFullRequestInterceptor(interceptor.request);
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-green')
            .accentPalette('orange');
    })
    .controller('AppController', ['$router', AppController])

function AppController($router) {
    $router.config(
        [
            {path: '/', component: 'home' },
            {path: '/category/:categoryId', component: 'grid', as: 'category' },
            {path: '/category', component: 'grid', as: 'categoryTop' },
            {path: '/post/:postId', component: 'article', as: 'post' },
            {path: '/login', component: 'login', as: 'login' }
        ]
    );
}

function authInterceptor($window) {
    //console.log('aaaa');
    return {
        request: function(element, operation, route, url, headers, params, httpConfig) {
            console.log('aaaa');
            if ($window.localStorage.token) {
                headers.Authorization = 'Bearer ' + $window.localStorage.token;
                console.log(headers.Authorization);
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
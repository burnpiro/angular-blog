'use strict';

angular.module('app', [
    'ngNewRouter',
    'ngAnimate',
    'restangular',

    //components
    'app.home',
    'app.menu',
    'app.grid',
    'app.article',
    'app.login',

    //services
    'app.services'
])
    .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl(config.host);
        RestangularProvider.setRequestInterceptor(authInterceptor.request);
    })
    .controller('AppController', ['$router', AppController])
    .factory('authInterceptor', authInterceptor);

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
    return {
        request: function(config) {
            if ($window.localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
            }
            return config;
        }
    }
}
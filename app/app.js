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

    //services
    'app.services'
])
    .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl(config.host);
    })
    .controller('AppController', ['$router', AppController]);

function AppController($router) {
    $router.config(
        [
            {path: '/', component: 'home' },
            {path: '/category/:categoryId', component: 'grid', as: 'category' },
            {path: '/category', component: 'grid', as: 'categoryTop' },
            {path: '/post/:postId', component: 'article', as: 'post' }
        ]
    );
}
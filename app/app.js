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
        RestangularProvider.setBaseUrl('http://localhost:8080');
    })
    .controller('AppController', ['$router', AppController]);

function AppController($router) {
    $router.config(
        [
            {path: '/', component: 'home' },
            {path: '/category/:categoryId', component: 'grid', as: 'category' },
            {path: '/post/:postId', component: 'article', as: 'post' }
        ]
    );
}
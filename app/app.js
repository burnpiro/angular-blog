'use strict';

angular.module('angularBlogApp', [
    'user.home',
    'ngNewRouter'
])
    .controller('AppController', ['$router', AppController]);

function AppController($router) {
    $router.config(
        [
            {path: '/', component: 'home' }
        ]
    );
}
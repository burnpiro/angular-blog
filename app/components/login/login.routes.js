'use strict';

angular.module('app.login', ['ui.router'])
    .config(function($stateProvider){

        $stateProvider
            .state('login', {
                url: "/login",
                onEnter: ['$stateParams', '$state', 'UserService',
                    function($stateParams, $state, UserService) {
                        if(UserService.isUserLoggedIn() && UserService.isAdmin()) {
                            $state.go('admin');
                        }
                    }],
                views: {
                    "" :{
                        templateUrl: "components/login/login.html",
                        controller: 'LoginController',
                        controllerAs: 'login'
                    },
                    "menu": {
                        template: ""
                    }
                }
            })
    });
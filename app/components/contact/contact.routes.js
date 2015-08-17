'use strict';

angular.module('app.contact', ['ui.router'])
    .config(function($stateProvider){

        $stateProvider
            .state('contact', {
                url: "/contact",
                views: {
                    "" :{
                        templateUrl: "components/contact/contact.html",
                        controller: 'ContactController',
                        controllerAs: 'contact'
                    },
                    "bottomMenu": {
                        templateUrl: "components/menu/menu.html"
                    }
                }
            })
    });
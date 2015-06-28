'use strict';

angular.module('app.article', ['ui.router'])
    .config(function($stateProvider){

        $stateProvider
            .state('post', {
                url: "/post/:postId",
                views: {
                    "" :{
                        templateUrl: "components/article/article.html",
                        controller: 'ArticleController',
                        resolve: {
                            post: ['$stateParams', 'PostService',
                                function($stateParams, PostService) {
                                    return PostService.getOneById($stateParams.postId);
                                }]
                        },
                        controllerAs: 'article'
                    },
                    "bottomMenu": {
                        templateUrl: "components/menu/menu.html"
                    }
                }
            })
    });
(function (angular) {
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
                                }],
                            relatedArticles: ['$stateParams', 'PostService',
                                function($stateParams, PostService) {
                                    return PostService.getRelated({post: $stateParams.postId, limit: 5});
                                }]
                        },
                        controllerAs: 'article'
                    },
                    "bottomMenu": {
                        controller: 'MenuController',
                        controllerAs: 'menu',
                        resolve: {
                            categories: ['CategoryService',
                                function(CategoryService) {
                                    return CategoryService.getTopCategories();
                                }]
                        },
                        templateUrl: "components/menu/menu.html"
                    }
                }
            })
    });
})(angular);
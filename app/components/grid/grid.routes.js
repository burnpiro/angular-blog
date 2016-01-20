(function (angular) {
'use strict';

angular.module('app.grid', ['ui.router'])
    .config(function($stateProvider){

        $stateProvider
            .state('categories', {
                url: "/category",
                views: {
                    "" :{
                        templateUrl: "components/grid/grid.html",
                        resolve: {
                            categories: ['CategoryService',
                                function(CategoryService) {
                                    return CategoryService.getTopCategories();
                                }],
                            posts: [function() {
                                    return [];
                                }]
                        },
                        controller: 'GridController',
                        controllerAs: 'grid'
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
            .state('category', {
                url: "/category/:categoryId",
                views: {
                    "" :{
                        templateUrl: "components/grid/grid.html",
                        resolve: {
                            categories: ['$stateParams', 'CategoryService',
                                function($stateParams, CategoryService) {
                                    return CategoryService.getAllByParentId($stateParams.categoryId);
                                }],
                            posts: ['$stateParams', 'PostService',
                                function($stateParams, PostService) {
                                    return PostService.getAllByCategoryId($stateParams.categoryId);
                                }]
                        },
                        controller: 'GridController',
                        controllerAs: 'grid'
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
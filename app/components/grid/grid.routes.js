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
                                function($stateParams, CategoryService, PostService) {
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
                        templateUrl: "components/menu/menu.html"
                    }
                }
            })
    });
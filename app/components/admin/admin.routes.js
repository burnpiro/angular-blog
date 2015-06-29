'use strict';

angular.module('app.admin', ['ui.router', 'aloha-editor'])
    .config(function($stateProvider){

        $stateProvider
            .state('admin', {
                url: "/admin",
                onEnter: ['$stateParams', '$state', 'UserService',
                    function($stateParams, $state, UserService) {
                        if(!UserService.isUserLoggedIn() || !UserService.isAdmin()) {
                            $state.go('login');
                        }
                    }],
                views: {
                    "" :{
                        templateUrl: "components/admin/admin.html",
                        controller: 'AdminController',
                        controllerAs: 'admin'
                    },
                    "topMenu": {
                        templateUrl: ""
                    },
                    "bottomMenu": {
                        templateUrl: ""
                    }
                }
            })
            .state('admin.articles', {
                url: "/posts",
                onEnter: ['$stateParams', '$state', 'UserService',
                    function($stateParams, $state, UserService) {
                        if(!UserService.isUserLoggedIn() || !UserService.isAdmin()) {
                            $state.go('login');
                        }
                    }],
                views: {
                    "adminContent" :{
                        templateUrl: "components/admin-article/admin-article-list.html",
                        resolve: {
                            posts: ['$stateParams', 'PostService',
                                function($stateParams, PostService) {
                                    return PostService.getPosts();
                                }]
                        },
                        controller: 'AdminArticleListController',
                        controllerAs: 'listCtrl'
                    }
                }
            })
            .state('admin.addArticle', {
                url: "/posts/add",
                onEnter: ['$stateParams', '$state', 'UserService',
                    function($stateParams, $state, UserService) {
                        if(!UserService.isUserLoggedIn() || !UserService.isAdmin()) {
                            $state.go('login');
                        }
                    }],
                views: {
                    "adminContent" :{
                        templateUrl: "components/admin-article/admin-article.html",
                        resolve: {
                            post: [function() {
                                return false;
                            }],
                            categories: ['CategoryService',
                                function(CategoryService) {
                                    return CategoryService.getCategories();
                                }]
                        },
                        data: {
                            post: {
                                _category: {},
                                name: '',
                                content: '',
                                icon: 'fa-bicycle',
                                shortText: '',
                                author: 'Kemal Erdem'
                            }
                        },
                        controller: 'AdminArticleController',
                        controllerAs: 'articleCtrl'
                    }
                }
            })
            .state('admin.article', {
                url: "/posts/:postId",
                onEnter: ['$stateParams', '$state', 'UserService',
                    function($stateParams, $state, UserService) {
                        if(!UserService.isUserLoggedIn() || !UserService.isAdmin()) {
                            $state.go('login');
                        }
                    }],
                views: {
                    "adminContent" :{
                        templateUrl: "components/admin-article/admin-article.html",
                        resolve: {
                            post: ['$stateParams', 'PostService',
                                function($stateParams, PostService) {
                                    return PostService.getOneById($stateParams.postId);
                                }],
                            categories: ['CategoryService',
                                function(CategoryService) {
                                    return CategoryService.getCategories();
                                }]
                        },
                        controller: 'AdminArticleController',
                        controllerAs: 'articleCtrl'
                    }
                }
            })
    });
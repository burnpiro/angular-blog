'use strict';

angular.module('app.article', []).
    controller('ArticleController', ['$routeParams', 'PostService', ArticleController]);

function ArticleController($routeParams, PostService) {
    var self = this;
    self.articleData = {};

    PostService.getOneById($routeParams.postId)
        .then(function(response) {
            self.articleData = response.data;
        });
}
'use strict';

angular.module('app.article').
    controller('ArticleController', ['post', ArticleController]);

function ArticleController(post) {
    var self = this;
    self.articleData = post.data;
}
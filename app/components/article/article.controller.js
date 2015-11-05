'use strict';

angular.module('app.article').
    controller('ArticleController', ['post', '$rootScope', ArticleController]);

function ArticleController(post, $rootScope) {
    var self = this;
    self.articleData = post.data;
    $rootScope.prevState = {
        stateName: 'category',
        stateParams: {categoryId: self.articleData._category._id}
    };
}
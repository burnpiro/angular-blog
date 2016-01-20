(function (angular) {
'use strict';

angular.module('app.article').
    controller('ArticleController', ['post', 'relatedArticles', '$rootScope', 'PostService', ArticleController]);

function ArticleController(post, relatedArticles, $rootScope, PostService) {
    var self = this;
    self.articleData = post.data;
    self.relatedArticles = relatedArticles.data;
    $rootScope.prevState = {
        stateName: 'category',
        stateParams: {categoryId: self.articleData._category._id}
    };

}
})(angular);
'use strict';

angular.module('app.article', []).
    controller('ArticleController', ['$routeParams', ArticleController]);

function ArticleController($routeParams) {
    var self = this;
    self.article = {};

    //CategoryService.getAllByParentId($routeParams.categoryId)
    //    .then(function(response) {
    //        self.gridData = response.data;
    //    });
}
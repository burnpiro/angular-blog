'use strict';

angular.module('app.grid', []).
    controller('GridController', ['$routeParams', 'PostService', 'CategoryService',  GridController]);

function GridController($routeParams, PostService, CategoryService) {
    var self = this;
    self.gridData = [];

    CategoryService.getAllByParentId($routeParams.categoryId)
        .then(function(response) {
            self.gridData = self.gridData.concat(response.data);
    });
    PostService.getAllByCategoryId($routeParams.categoryId)
        .then(function(response) {
            self.gridData = self.gridData.concat(response.data);
        });
}
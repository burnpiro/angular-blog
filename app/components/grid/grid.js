'use strict';

angular.module('app.grid', []).
    controller('GridController', ['$routeParams', 'PostService', 'CategoryService',  GridController]);

function GridController($routeParams, PostService, CategoryService) {
    var self = this;
    self.gridData = [];

    if(!_.isEmpty($routeParams.categoryId)) {
        CategoryService.getAllByParentId($routeParams.categoryId)
            .then(function(response) {
                self.gridData = self.gridData.concat(response.data);
            });
        PostService.getAllByCategoryId($routeParams.categoryId)
            .then(function(response) {
                self.gridData = self.gridData.concat(response.data);
            });
    } else {
        CategoryService.getTopCategories()
            .then(function(response) {
                self.gridData = response.data;
            });
    }
}
'use strict';

angular.module('app.services').
    service('CategoryService', ['Restangular', CategoryService]);

function CategoryService(Restangular) {
    this.getCategories = function() {
        return Restangular.one('categories').get();
    };

    this.getTopCategories = function() {
        return Restangular.one('categories').post('search', {parent: ''});
    };

    this.getAllByParentId = function(parent) {
        return Restangular.one('categories').post('search', {parent: parent});
    };
}
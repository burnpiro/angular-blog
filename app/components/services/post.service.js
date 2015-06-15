'use strict';

angular.module('app.services').
    service('PostService', ['Restangular', PostService]);

function PostService(Restangular) {
    this.getPosts = function() {
        return Restangular.one('posts').get();
    };

    this.getOneById = function(id) {
        return Restangular.one('posts', id).get();
    };

    this.getAllByCategoryId = function(category) {
        return Restangular.one('posts').post('search', {_category: category});
    };
}
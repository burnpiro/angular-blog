'use strict';

angular.module('app.services').
    service('PostService', ['Restangular', PostService]);

function PostService(Restangular) {
    this.getPosts = function() {
        return Restangular.one('posts').get();
    };


    this.getAllByCategoryId = function(parent) {
        return Restangular.one('posts').post('search', {_category: parent});
    };
}
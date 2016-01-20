(function (angular) {
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

    this.getAllByName = function(name) {
        return Restangular.one('posts').post('search', {name: name});
    };

    this.searchPosts = function(request) {
        return Restangular.one('posts').post('search', request);
    };

    this.getRelated = function(request) {
        return Restangular.one('posts').post('related', request);
    };

    this.getRecentPosts = function() {
        return Restangular.one('posts').post('search', {limit: 11});
    };

    this.savePost = function(post) {
        var request = {
            author: post.author,
            name: post.name,
            icon: post.icon,
            shortText: post.shortText,
            image: post.image ? post.image : null,
            content: post.content,
            display: post.display,
            tags: post.tags
        };
        if(_.isObject(post._category)) {
            request._category = post._category._id;
        }
        if(!_.isEmpty(post._id)) {
            return Restangular.one('posts', post._id).customPUT(request);
        } else {
            return Restangular.one('posts').post('', request);
        }
    };

    this.deletePost = function(postId) {
        return Restangular.one('posts', postId).remove();
    }
}
})(angular);
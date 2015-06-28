'use strict';

angular.module('app.admin').
    controller('AdminArticleController', ['$window', 'UserService', 'PostService', 'post', AdminArticleController]);

function AdminArticleController($window, UserService, PostService, post) {
    var self = this;
    self.post = post.data;
    console.log(post);
}
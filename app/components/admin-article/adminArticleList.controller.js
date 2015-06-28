'use strict';

angular.module('app.admin').
    controller('AdminArticleListController', ['$window', 'UserService', 'PostService', 'posts', AdminArticleListController]);

function AdminArticleListController($window, UserService, PostService, posts) {
    var self = this;
    self.userData = UserService.getUserData();
    self.posts = posts;
    console.log(self.posts.length);
    var saturation = 600;
    var classes = [
        'bg-color-red-'+saturation, 'bg-color-pink-'+saturation, 'bg-color-purple-'+saturation, 'bg-color-deep-purple-'+saturation, 'bg-color-indigo-'+saturation,
        'bg-color-blue-'+saturation, 'bg-color-light-blue-'+saturation, 'bg-color-cyan-'+saturation, 'bg-color-teal-'+saturation, 'bg-color-green-'+saturation,
        'bg-color-light-green-'+saturation, 'bg-color-lime-'+saturation, 'bg-color-yellow-'+saturation, 'bg-color-amber-'+saturation, 'bg-color-orange-'+saturation,
        'bg-color-deep-orange-'+saturation, 'bg-color-brown-'+saturation
    ];

    _.forEach(self.posts, function(post) {
        post.background = _.sample(classes);
    });
}
(function (angular) {
'use strict';

angular.module('app.home', []).
    controller('HomeController', ['posts', 'FileService', 'PostService', '$rootScope', HomeController]);

function HomeController(posts, FileService, PostService, $rootScope) {
    var self = this;

    self.posts = posts.data;
    self.topPost = self.posts.shift();
    self.getImageLink = FileService.getImageLink;
    self.limit = 6;
    self.offset = 10;
    self.noMoreImages = false;
    self.busy = false;

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

    if(!_.isUndefined(self.topPost)) {
        self.topPost.background = 'bg-color-light-green-600';
    }

    if(self.posts < 9) {
        self.noMoreImages = true;
    }

    self.loadMoreImages = function() {
        if(self.busy || self.noMoreImages === true) {
            return false;
        }
        self.busy = true;
        PostService.searchPosts({ limit: self.limit, offset: self.offset })
            .then(function(response) {
                if( response.data.length < self.limit ) {
                    self.noMoreImages = true;
                }
                self.offset += self.limit;
                _.forEach(response.data, function(image) {
                    self.posts.push(image);
                });
                self.busy = false;
            }, function() {
                self.busy = false;
            })
    };

    $rootScope.prevState = undefined;
}
})(angular);
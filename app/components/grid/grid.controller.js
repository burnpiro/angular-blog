(function (angular) {
'use strict';

angular.module('app.grid').
    controller('GridController', ['categories', 'posts', 'FileService', '$rootScope', '$state', GridController]);

function GridController(categories, posts, FileService, $rootScope, $state) {
    var self = this;
    self.gridData = [];
    self.categoriesData = [];
    self.postsData = [];
    self.getImageLink = FileService.getImageLink;

    if(!_.isEmpty(categories.data)) {
        self.categoriesData = self.categoriesData.concat(categories.data);
    }
    if(!_.isEmpty(posts.data)) {
        self.postsData = self.postsData.concat(posts.data);
    }
    var saturation = 600;
    var classes = [
        'bg-color-red-'+saturation, 'bg-color-pink-'+saturation, 'bg-color-purple-'+saturation, 'bg-color-deep-purple-'+saturation, 'bg-color-indigo-'+saturation,
        'bg-color-blue-'+saturation, 'bg-color-light-blue-'+saturation, 'bg-color-cyan-'+saturation, 'bg-color-teal-'+saturation, 'bg-color-green-'+saturation,
        'bg-color-light-green-'+saturation, 'bg-color-lime-'+saturation, 'bg-color-yellow-'+saturation, 'bg-color-amber-'+saturation, 'bg-color-orange-'+saturation,
        'bg-color-deep-orange-'+saturation, 'bg-color-brown-'+saturation
    ];

    _.forEach(self.categoriesData, function(category) {
        category.background = _.sample(classes);
    });

    if($state.current.name === 'categories') {
        $rootScope.prevState = {
            stateName: 'home'
        };
    } else {
        $rootScope.prevState = {
            stateName: 'categories'
        };
    }
}
})(angular);
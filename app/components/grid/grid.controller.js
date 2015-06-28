'use strict';

angular.module('app.grid').
    controller('GridController', ['categories', 'posts', GridController]);

function GridController(categories, posts) {
    var self = this;
    self.gridData = [];

    if(!_.isEmpty(categories.data)) {
        self.gridData = self.gridData.concat(categories.data);
    }
    if(!_.isEmpty(posts.data)) {
        self.gridData = self.gridData.concat(posts.data);
    }
}
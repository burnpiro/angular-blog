'use strict';

angular.module('app.services').
    service('TagService', ['Restangular', TagService]);

function TagService(Restangular) {
    this.getAll = function() {
        return Restangular.one('tags').get();
    };

    this.createTag = function(tag) {
        return Restangular.one('tags').post('', { name: tag});
    };
}
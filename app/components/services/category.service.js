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

    this.getAllByName = function(name) {
        return Restangular.one('categories').post('search', {name: name});
    };

    this.saveCategory = function(category) {
        var request = {
            name: category.name,
            icon: category.icon,
            parent: category.parent
        };

        if(_.isEmpty(category._id)) {
            request._id = slug(category.name);
        }
        if(!_.isEmpty(category._id)) {
            return Restangular.one('categories', category._id).customPUT(request);
        } else {
            return Restangular.one('categories').post('', request);
        }
    }
}

function slug(input)
{
    return input
        .replace(/^\s\s*/, '') // Trim start
        .replace(/\s\s*$/, '') // Trim end
        .toLowerCase() // Camel case is bad
        .replace(/[^a-z0-9_\-~!\+\s]+/g, '') // Exchange invalid chars
        .replace(/[\s]+/g, '-'); // Swap whitespace for single hyphen
}
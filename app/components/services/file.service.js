'use strict';

angular.module('app.services').
    service('FileService', ['Restangular', FileService]);

function FileService(Restangular) {
    this.getAll = function() {
        return Restangular.one('files').get();
    };

    this.getAllImages = function(size) {
        if(_.isUndefined(size)) {
            size = '1920';
        }
        return Restangular.one('images').one(size).get('');
    };

    this.getOneByName = function(name) {
        return Restangular.one('files').get('', name);
    };

    this.getOneImageByName = function(name, size) {
        return Restangular.one('images').get('', name+'.'+size);
    };

    this.saveFile = function(file) {
        var request = {
            file: file
        };

        return Restangular.one('files')
            .withHttpConfig({transformRequest: angular.identity})
            .customPOST(request);
    };

    this.getImageLink = function(imageName, size) {
        if(_.isUndefined(size)) {
            size = '400';
        }
        return config.host+config.imagePath+'/'+imageName+'/'+size;
    };
}
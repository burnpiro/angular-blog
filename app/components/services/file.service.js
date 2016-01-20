(function (angular) {
'use strict';

angular.module('app.services').
    service('FileService', ['Restangular', FileService]);

function FileService(Restangular) {
    this.getAll = function() {
        return Restangular.one('files').get();
    };

    this.getAllImages = function() {
        var request = {
            limit: 12,
            offset: 0
        };
        return Restangular.one('images').customPOST(request);
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
        if(imageName === null) {
            return '/images/logo1920x1280.png';
        } else {
            return config.host+config.imagePath+'/'+imageName+'/'+size;
        }
    };
}
})(angular);
'use strict';

angular.module('app.services').
    service('FileService', ['Restangular', FileService]);

function FileService(Restangular) {
    this.getAll = function() {
        return Restangular.one('files').get();
    };

    this.getOneByName = function(name) {
        return Restangular.one('files').get('', name);
    };

    this.saveFile = function(file) {
        var request = {
            file: file
        };

        return Restangular.one('files')
            .withHttpConfig({transformRequest: angular.identity})
            .customPOST(request);
    }
}
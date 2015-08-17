'use strict';

angular.module('app.services').
    service('MessageService', ['Restangular', MessageService]);

function MessageService(Restangular) {
    this.getMessages = function() {
        return Restangular.one('messages').get();
    };

    this.sendMessage = function(message) {
        return Restangular.one('messages').post('', message);
    }
}
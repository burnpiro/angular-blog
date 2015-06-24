'use strict';

angular.module('app.services').
    service('UserService', ['Restangular', UserService]);

function UserService(Restangular) {
    this.getOneById = function(id) {
        return Restangular.one('users', id).get();
    };

    this.login = function(login, password) {
        return Restangular.one('login').post('', {userName: login, password: password});
    };
}
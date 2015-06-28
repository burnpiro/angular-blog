'use strict';

angular.module('app.services').
    service('UserService', ['Restangular', '$window', 'jwtHelper', UserService]);

function UserService(Restangular, $window, jwtHelper) {
    this.currUser = {
        scope: '',
        name: '',
        userName: ''
    };
    this.getOneById = function(id) {
        return Restangular.one('users', id).get();
    };

    this.login = function(login, password) {
        return Restangular.one('').post('login', {userName: login, password: password});
    };

    this.isUserLoggedIn = function() {
        return !_.isEmpty($window.localStorage.token);
    };

    this.getUserData = function() {
        if(this.isUserLoggedIn) {
            this.currUser = jwtHelper.decodeToken($window.localStorage.token);
            return this.currUser;
        } else {
            return false;
        }
    };

    this.isAdmin = function() {
        if(this.isUserLoggedIn) {
            if(_.isEmpty(this.currUser.scope)) {
                this.currUser = jwtHelper.decodeToken($window.localStorage.token);
            }
            return this.currUser.scope === 'admin';
        } else {
            return false;
        }
    };

    this.logout = function() {
        delete $window.localStorage.token;
    }
}
'use strict';

angular.module('app.login', ['ngMaterial']).
    controller('LoginController', ['$window', 'UserService', LoginController]);

function LoginController($window, UserService) {
    var self = this;
    self.login;
    self.password;
    self.loginAction = function() {
        UserService.login(self.login, self.password)
            .then(function(response) {
                $window.localStorage.token = response.token;
            }, function(err) {
            });
    }
}